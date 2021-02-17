import { CONTACT_RELATED_STATES, CONTACT_SUCCESS_LIST } from 'common-tools/constants';
import surveyUnitStateEnum from 'common-tools/enum/SUStateEnum';
import { convertSUStateInToDo } from 'common-tools/functions/convertSUStateInToDo';
import { formatDistanceStrict } from 'date-fns';
import D from 'i18n';
import contactAttemptDBService from 'indexedbb/services/contactAttempt-idb-service';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';

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

export const intervalInDays = su => {
  const { collectionEndDate } = su;

  const remainingDays = formatDistanceStrict(new Date(), new Date(collectionEndDate), {
    roundingMethod: 'ceil',
    unit: 'day',
  });

  return remainingDays.split(' ')[0];
};

export const isValidForTransmission = ue => {
  /* const { contactOutcome } = ue;
  return contactOutcome !== null; */
  return true;
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

const lastContactAttemptIsSuccessfull = async surveyUnit => {
  const contactAttempts = await getContactAttempts(surveyUnit);
  let lastContactAttempt;
  if (Array.isArray(contactAttempts) && contactAttempts.length > 1) {
    lastContactAttempt = contactAttempts.reduce((a, b) => (a.date > b.date ? a : b));
  } else {
    [lastContactAttempt] = contactAttempts;
  }
  return CONTACT_SUCCESS_LIST.includes(lastContactAttempt.status);
};

const isContactAttemptOk = async surveyUnit => {
  return lastContactAttemptIsSuccessfull(surveyUnit);
};

const addContactState = async (surveyUnit, newState) => {
  switch (newState.type) {
    case surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type:
      surveyUnit.states.push(newState);
      if (await isContactAttemptOk(surveyUnit)) {
        surveyUnit.states.push({
          date: new Date().getTime(),
          type: surveyUnitStateEnum.APPOINTMENT_MADE.type,
        });
      }
      break;

    case surveyUnitStateEnum.APPOINTMENT_MADE.type:
      if (getContactAttemptNumber(surveyUnit) === 0) {
        surveyUnit.states.push({
          date: newState.date - 1,
          type: surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type,
        });
      }
      surveyUnit.states.push(newState);
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
  switch (lastStateType) {
    case surveyUnitStateEnum.QUESTIONNAIRE_STARTED.type:
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = await addContactState(newSu, newState);

        const previousState = { date: new Date().getTime(), type: lastStateType };
        newSu.states.push(previousState);
      } else {
        newSu.states.push(newState);
      }
      break;

    case surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type:
      if (surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type === stateType) {
        if (await isContactAttemptOk(surveyUnit)) {
          surveyUnit.states.push({
            date: new Date().getTime(),
            type: surveyUnitStateEnum.APPOINTMENT_MADE.type,
          });
        }
        break;
      }
      if (surveyUnitStateEnum.APPOINTMENT_MADE.type === stateType) {
        newSu = await addContactState(newSu, newState);
      } else {
        newSu.states.push(newState);
      }
      break;

    case surveyUnitStateEnum.APPOINTMENT_MADE.type:
      if (surveyUnitStateEnum.APPOINTMENT_MADE.type === stateType) {
        break;
      }
      if (surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type === stateType) {
        newSu = await addContactState(newSu, newState);
      } else {
        newSu.states.push(newState);
      }
      break;

    case surveyUnitStateEnum.IN_PREPARATION.type:
    case surveyUnitStateEnum.VISIBLE_NOT_CLICKABLE.type:
    case surveyUnitStateEnum.VISIBLE_AND_CLICKABLE.type:
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = await addContactState(newSu, newState);
      } else {
        newSu.states.push(newState);
      }
      break;

    case surveyUnitStateEnum.WAITING_FOR_TRANSMISSION.type:
    case surveyUnitStateEnum.WAITING_FOR_SYNCHRONIZATION.type:
    case surveyUnitStateEnum.TO_BE_REVIEWED.type:
    case surveyUnitStateEnum.FINALIZED.type:
    case surveyUnitStateEnum.QUESTIONNAIRE_NOT_AVAILABLE.type:
      // TODO : peut-être d'autres états  gérer ici
      if (CONTACT_RELATED_STATES.includes(stateType)) {
        newSu = await addContactState(newSu, newState);
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
  newSu.selected = false;
  await surveyUnitDBService.addOrUpdate(newSu);
};

export const checkIfContactAttemptCanBeDeleted = surveyUnit => {
  return getContactAttemptNumber(surveyUnit) > 1;
};

export const updateStateWithDates = surveyUnit => {
  const lastState = getLastState(surveyUnit).type;
  const currentDate = new Date().getTime();
  const { identificationPhaseStartDate } = surveyUnit;
  let result = 0;
  if (
    lastState === surveyUnitStateEnum.VISIBLE_NOT_CLICKABLE.type &&
    currentDate > identificationPhaseStartDate
  ) {
    result = 1;
    addNewState(surveyUnit, surveyUnitStateEnum.VISIBLE_AND_CLICKABLE.type);
  }

  return result;
};

export const isQuestionnaireAvailable = su => {
  return getLastState(su).type !== 'QNA';
};

export const applyFilters = (surveyUnits, filters) => {
  const {
    search: searchFilter,
    campaigns: campaignFilter,
    toDos: toDoFilter,
    priority: priorityFilter,
  } = filters;

  const filterBySearch = su => {
    if (searchFilter !== '') {
      return (
        su.firstName.toLowerCase().includes(searchFilter) ||
        su.lastName.toLowerCase().includes(searchFilter) ||
        su.id
          .toString()
          .toLowerCase()
          .includes(searchFilter) ||
        su.address.l6
          .split(' ')
          .slice(1)
          .toString()
          .toLowerCase()
          .includes(searchFilter) ||
        convertSUStateInToDo(getLastState(su).type)
          .value.toLowerCase()
          .includes(searchFilter) ||
        su.campaign.toLowerCase().includes(searchFilter)
      );
    }

    return true;
  };

  const filterByCampaign = su => {
    if (campaignFilter.length > 0) {
      return campaignFilter.includes(su.campaign.toString());
    }

    return true;
  };

  const filterByToDo = su => {
    if (toDoFilter.length > 0) {
      return toDoFilter.includes(convertSUStateInToDo(getLastState(su).type).order.toString());
    }
    return true;
  };
  const filterByPriority = su => {
    if (priorityFilter === true) {
      return su.priority;
    }
    return true;
  };

  const filteredSU = surveyUnits
    .filter(unit => filterByPriority(unit))
    .filter(unit => filterByToDo(unit))
    .filter(unit => filterByCampaign(unit));

  const totalEchoes = surveyUnits.length;
  const searchFilteredSU = filteredSU.filter(unit => filterBySearch(unit));
  const matchingEchoes = searchFilteredSU.length;

  return { searchFilteredSU, totalEchoes, matchingEchoes };
};

export const isSelectable = su => {
  const { identificationPhaseStartDate, endDate } = su;
  const endTime = new Date(endDate).getTime();
  const identificationPhaseStartTime = new Date(identificationPhaseStartDate).getTime();
  const instantTime = new Date().getTime();
  return endTime > instantTime && instantTime > identificationPhaseStartTime;
};

export const getAddressData = su => [
  { label: D.addressName, value: su.address.l1 },
  { label: D.addressFullAddress, value: su.address.l4 },
  { label: D.addressCity, value: su.address.l6 },
  { label: D.addressCountry, value: su.address.l7 },
];

export const getUserData = su => [
  { label: D.surveyUnitLastName, value: su.lastName },
  { label: D.surveyUnitFirstName, value: su.firstName },
];

export const getPhoneData = su =>
  su.phoneNumbers.map(phoneNumber => ({ label: undefined, value: phoneNumber }));

export const getMailData = su => [{ label: undefined, value: su.email }];
