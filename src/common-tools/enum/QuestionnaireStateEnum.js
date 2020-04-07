import D from 'i18n';

const questionnaireState = {
  COMPLETED: { type: 'COMPLETED', value: `${D.questionnaireStateMessageCompleted}` },
  AT_LEAST_ONE_VARIABLE_ENTERED: {
    type: 'AT_LEAST_ONE_VARIABLE_ENTERED',
    value: `${D.questionnaireStateAtLeastOneVariableEntered}`,
  },
};

export default questionnaireState;
