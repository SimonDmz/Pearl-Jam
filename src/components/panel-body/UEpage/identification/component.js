import Orchestrator from 'components/common/orchestrator';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SurveyUnitContext from '../UEContext';
import './identification.scss';
import * as fakeQuestionnaire from './questionnaire.json';

const Identification = ({ saveUE }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const [init, setInit] = useState(false);
  const [questionnaire, setQuestionnaire] = useState(fakeQuestionnaire);
  const [reperageQuestionnaireIsOpen, setReperageQuestionnaireIsOpen] = useState(false);
  const [reperageData, setReperageData] = useState({});

  const paginateComponents = components => {
    return Array.isArray(components)
      ? components.reduce((_, component, index) => [..._, { ...component, page: index + 1 }], [])
      : [];
  };

  useEffect(() => {
    if (!init && questionnaire && surveyUnit) {
      const newQuestionnaire = {
        ...questionnaire,
        components: paginateComponents(questionnaire.components),
      };
      setQuestionnaire(newQuestionnaire);
      const newReperageData = surveyUnit.reperageData;

      setReperageData(newReperageData !== undefined ? newReperageData : {});
      setInit(true);
    }
  }, [init, questionnaire, surveyUnit]);

  const closeOrchestrator = () => {
    setReperageQuestionnaireIsOpen(false);
  };

  const Collect = () => (
    <Orchestrator
      source={questionnaire}
      data={reperageData}
      features={['VTL']}
      close={closeOrchestrator}
      save={saveUE}
      surveyUnit={surveyUnit}
    />
  );

  return (
    <div className="Identification">
      {!reperageQuestionnaireIsOpen && (
        <button type="button" onClick={() => setReperageQuestionnaireIsOpen(true)}>
          <i className="fa fa-search" aria-hidden="true" />
          Repérer
        </button>
      )}
      {reperageQuestionnaireIsOpen && <div className="Contacts">{Collect()}</div>}
    </div>
  );
};

export default Identification;

Identification.propTypes = { saveUE: PropTypes.func.isRequired };
