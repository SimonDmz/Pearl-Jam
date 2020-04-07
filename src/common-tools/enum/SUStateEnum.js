import D from 'i18n';

const surveyUnitState = {
  NOT_STARTED: { type: 'NOT_STARTED', value: `${D.suStateAssignedNotStarted}` },
  IN_PREPARATION: { type: 'IN_PREPARATION', value: `${D.suStateInPreparation}` },
  AT_LEAST_ONE_CONTACT: { type: 'AT_LEAST_ONE_CONTACT', value: `${D.suStateAtLeastOneContact}` },
  APPOINTMENT_MADE: { type: 'APPOINTMENT_MADE', value: `${D.suStateAppointmentMade}` },
  QUESTIONNAIRE_STARTED: {
    type: 'QUESTIONNAIRE_STARTED',
    value: `${D.suStateQuestionnaireStarted}`,
  },
  WAITING_FOR_VALIDATION: {
    type: 'WAITING_FOR_VALIDATION',
    value: `${D.suStateWaitingForValidation}`,
  },
  WAITING_FOR_SYNCHRONIZATION: {
    type: 'WAITING_FOR_SYNCHRONIZATION',
    value: `${D.suStateWaitingForSynchronization}`,
  },
  FINALIZED: { type: 'FINALIZED', value: `${D.suStateFinalized}` },
};

export default surveyUnitState;

export const findSuStateValueByType = type => {
  const retour = Object.keys(surveyUnitState)
    .map(key => surveyUnitState[key])
    .filter(value => value.type === type);
  return retour[0].value;
};
