import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import contactAttemptDBService from 'indexedbb/services/contactAttempt-idb-service';
import {
  CONTACT_RELATED_STATES,
  CONTACT_SUCCESS_LIST,
  STATES_ACCEPTING_ANY_NEW_STATE,
  STATES_UPDATING_TO_WFT,
} from 'common-tools/constants';
import surveyUnitStateEnum from 'common-tools/enum/SUStateEnum';

export const getCommentByType = (type, ue) => {
  if (Array.isArray(ue.comments) && ue.comments.length > 0) {
    return ue.comments.find(x => x.type === type).value;
  }
  return '';
};

export const getLastState = ue => {
  if (Array.isArray(ue.states) && ue.states.length === 1) return ue.states[0];
  if (Array.isArray(ue.states) && ue.states.length > 1) {
    return ue.states.reduce((a, b) => (a.date > b.date ? a : b));
  }
  return false;
};

export const isValidForTransmission = ue => {
  const { contactOutcome } = ue;
  return contactOutcome !== null;
};

const getContactAttempts = async surveyUnit => {
  const { contactAttempts } = surveyUnit;
  return contactAttemptDBService.findByIds(contactAttempts);
};

export const deleteContactAttempt = (surveyUnit, contactAttemptId) => {
  const newSu = surveyUnit;
  const { contactAttempts } = newSu;
  const newCA = contactAttempts.filter(ca => ca !== contactAttemptId);
  newSu.contactAttempts = newCA;
  surveyUnitDBService.update(newSu);
  contactAttemptDBService.delete(contactAttemptId);
};

const getContactAttemptNumber = surveyUnit => {
  return surveyUnit.states.filter(
    state => state.type === surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type
  ).length;
};

const lastContactAttemptIsSuccessfull = surveyUnit => {
  const contactAttempts = getContactAttempts(surveyUnit);
  const lastAOCstate = contactAttempts.reduce((a, b) => (a.date > b.date ? a : b));
  return CONTACT_SUCCESS_LIST.includes(lastAOCstate.status);
};

const isContactAttemptOk = surveyUnit => {
  return lastContactAttemptIsSuccessfull(surveyUnit);
};

const addContactState = (surveyUnit, newState) => {
  // this method add AOC or APS state in states if needed => for life cycle consistency
  // rule #1 if you add AOC and AOC is successfull : should add APS then
  // ruel #2 if you add APS : sould add AOC before if there is no AOC in states

  // switch between AOC | APS (from newState.type)
  switch (newState.type) {
    case surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type:
      // add AOC state
      surveyUnit.states.push(newState);
      if (isContactAttemptOk(surveyUnit)) {
        // add APS then
        surveyUnit.states.push({
          date: new Date().getTime(),
          type: surveyUnitStateEnum.APPOINTMENT_MADE.type,
        });
      }
      break;

    case surveyUnitStateEnum.APPOINTMENT_MADE.type:
      if (getContactAttemptNumber(surveyUnit) === 0) {
        // add AOC state with 1 ms earlier date
        surveyUnit.states.push({
          date: newState.date - 1,
          type: surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type,
        });
        // add APS state
        surveyUnit.states.push(newState);
      }
      break;
    default:
      break;
  }

  return surveyUnit;
};

export const addNewState = async (surveyUnit, stateType) => {
  const lastStateType = getLastState(surveyUnit).type;
  const newState = { date: new Date().getTime(), type: stateType };
  let newSu = surveyUnit;

  // case management : lastState * addedState
  switch (lastStateType) {
    // INS then adding AOC or APS should also finally add INS
    case surveyUnitStateEnum.QUESTIONNAIRE_STARTED.type:
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = addContactState(newSu, newState);

        const previousState = { date: new Date().getTime(), type: lastStateType };
        newSu.states.push(previousState);
      } else {
        newSu.states.push(newState);
      }
      break;

    case STATES_ACCEPTING_ANY_NEW_STATE:
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = addContactState(newSu, newState);
      } else {
        newSu.states.push(newState);
      }
      break;
    // WFT/WFS/TBR/FIN/QNA then adding
    case STATES_UPDATING_TO_WFT:
      // TODO : peut-être d'autres états  gérer ici
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = addContactState(newSu, newState);
        newSu.states.push({
          date: new Date().getTime(),
          type: surveyUnitStateEnum.WAITING_FOR_TRANSMISSION.type,
        });
      } else {
        newSu.states.push(newState);
      }
      break;
    default:
      break;
  }

  // old version :to be deleted
  newSu.states.push(newState);
  newSu.lastState = newState;

  // keep function ending : clean
  newSu.selected = false;
  await surveyUnitDBService.addOrUpdate(newSu);
};

export const checkIfContactAttemptCanBeDeleted = surveyUnit => {
  return getContactAttemptNumber(surveyUnit) > 1;
};
