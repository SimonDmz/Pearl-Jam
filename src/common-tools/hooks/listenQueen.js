import { useEffect } from 'react';
import questionnaireEnum from 'common-tools/enum/QuestionnaireStateEnum';
import suStateEnum from 'common-tools/enum/SUStateEnum';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';

const computeSurveyUnitState = suToCompute => {
  const { questionnaireState } = suToCompute;
  switch (questionnaireState) {
    case questionnaireEnum.COMPLETED.type:
      return suStateEnum.WAITING_FOR_VALIDATION.type;

    case questionnaireEnum.AT_LEAST_ONE_VARIABLE_ENTERED.type:
      return suStateEnum.QUESTIONNAIRE_STARTED.type;

    default:
      break;
  }
  return true;
};

const updateUE = (history, queenReturnedCode, suId) => {
  surveyUnitDBService.get(suId).then(su => {
    let newQuestionnaireState = '';
    switch (queenReturnedCode) {
      case 'completed':
        newQuestionnaireState = questionnaireEnum.COMPLETED.type;
        break;
      case 'atLeastOnVariableEntered':
        newQuestionnaireState = questionnaireEnum.AT_LEAST_ONE_VARIABLE_ENTERED.type;
        break;
      default:
        break;
    }
    su.questionnaireState = newQuestionnaireState;
    su.state = computeSurveyUnitState(su);
    surveyUnitDBService.update(su);

    history.push(`/survey-unit/${suId}/details`);
  });
};

function useQueenListener(history) {
  useEffect(() => {
    function handleQueenReturn(e) {
      const queenReturnedCode = e.detail.returnedCode;
      const suIdToUpdate = e.detail.suId;
      updateUE(history, queenReturnedCode, suIdToUpdate);
    }
    window.addEventListener('queen', handleQueenReturn);
    return () => {
      window.removeEventListener('queen', handleQueenReturn);
    };
  });
}

export default useQueenListener;
