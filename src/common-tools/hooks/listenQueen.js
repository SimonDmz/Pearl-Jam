import { useEffect } from 'react';
import questionnaireEnum from 'common-tools/enum/QuestionnaireStateEnum';
import suStateEnum from 'common-tools/enum/SUStateEnum';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';

const computeSurveyUnitState = suToCompute => {
  const { questionnaireState } = suToCompute;
  switch (questionnaireState) {
    case questionnaireEnum.COMPLETED.type:
      return suStateEnum.WAITING_FOR_VALIDATION.type;

    case questionnaireEnum.STARTED.type:
      return suStateEnum.QUESTIONNAIRE_STARTED.type;
    default:
      break;
  }
  return true;
};

const updateSurveyUnit = (surveyUnitID, queenState) => {
  surveyUnitDBService.get(surveyUnitID).then(su => {
    const newSU = su;
    let newQuestionnaireState = '';
    switch (queenState) {
      case 'COMPLETED':
        newQuestionnaireState = questionnaireEnum.COMPLETED.type;
        break;
      case 'STARTED':
        newQuestionnaireState = questionnaireEnum.STARTED.type;
        break;
      default:
        break;
    }
    newSU.questionnaireState = newQuestionnaireState;
    newSU.state = computeSurveyUnitState(newSU);
    const update = async () => {
      await surveyUnitDBService.update(newSU);
    };
    update();
  });
};

const closeQueen = history => surveyUnitID => {
  history.push(`/survey-unit/${surveyUnitID}/details`);
};

const handleQueenEvent = history => event => {
  const { type, command, ...other } = event.detail;
  if (type === 'QUEEN') {
    switch (command) {
      case 'CLOSE_QUEEN':
        closeQueen(history)(other.surveyUnit);
        break;
      case 'UPDATE_SURVEY_UNIT':
        updateSurveyUnit(other.surveyUnit, other.state);
        window.dispatchEvent(new CustomEvent('pearl-update'));
        break;
      case 'UPDATE_SYNCHRONIZE':
        // NOT here
        break;
      default:
        break;
    }
  }
};

function useQueenListener(history) {
  useEffect(() => {
    window.addEventListener('QUEEN', handleQueenEvent(history));
    return () => {
      window.removeEventListener('QUEEN', handleQueenEvent(history));
    };
  });
}

export default useQueenListener;
