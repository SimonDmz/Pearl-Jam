import D from 'i18n';

const questionnaireState = {
  COMPLETED: { type: 'COMPLETED', value: `${D.questionnaireStateMessageCompleted}` },
  STARTED: {
    type: 'STARTED',
    value: `${D.questionnaireStateAtLeastOneVariableEntered}`,
  },
};

export default questionnaireState;
