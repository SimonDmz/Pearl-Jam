import * as lunatic from '@inseefr/lunatic';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Orchestrator = ({ source, data, close, surveyUnit, save }) => {
  const preferences = ['COLLECTED'];
  const savingType = 'COLLECTED';
  const management = false;
  const features = ['VTL'];
  const { questionnaire, components, handleChange, bindings } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
    management,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [component, setComponent] = useState(components.find(({ page }) => page === currentPage));
  const [activeSurveyUnit, setActiveSurveyUnit] = useState(surveyUnit);
  const history = useHistory();

  useEffect(() => {
    console.log('data : ', data);
    console.log('questionnaire : ', questionnaire);
  }, [data, questionnaire]);

  useEffect(() => {
    const activeComponent = () => {
      if (currentPage === undefined) return undefined;
      const foundComponent = components.find(({ page }) => page === currentPage);
      return foundComponent;
    };
    setComponent(activeComponent);
  }, [currentPage, components]);

  const id = component !== undefined ? component.id : undefined;
  const componentType = component !== undefined ? component.componentType : undefined;
  const Component = component !== undefined ? lunatic[componentType] : undefined;

  const getNextPage = () => {
    return component !== undefined ? component.page + 1 : 1;
  };

  const saveWithData = async () => {
    const reperageData = lunatic.getState(questionnaire);
    const updatedSurveyUnit = { ...activeSurveyUnit, reperageData };
    console.log('reperageData ', reperageData);

    setActiveSurveyUnit(updatedSurveyUnit);
    await surveyUnitDBService.update(updatedSurveyUnit);
  };

  const validate = () => {
    console.log('validate : su=', activeSurveyUnit);
    save(activeSurveyUnit, history.location.pathname);
  };

  const goNext = async () => {
    await saveWithData();
    const nextPage = getNextPage(/* components)(currentPage */);
    setCurrentPage(nextPage);
  };

  return (
    <div className="container">
      <div className="components">
        {component !== undefined && (
          <div className="lunatic lunatic-component" key={`component-${id}`}>
            <Component
              {...component}
              handleChange={handleChange}
              labelPosition="TOP"
              preferences={preferences}
              management={management}
              features={features}
              bindings={bindings}
              writable
              zIndex={1}
            />
          </div>
        )}
        {component === undefined && <div>Component undefined</div>}
      </div>
      <button type="button" onClick={() => goNext()}>
        <i className="fa fa-arrow-right" aria-hidden="true" />
        Next
      </button>
      <button type="button" onClick={() => close()}>
        <i className="fa fa-times" aria-hidden="true" />
        Exit
      </button>
      <button type="button" onClick={() => validate()}>
        <i className="fa fa-check" aria-hidden="true" />
        Validate
      </button>
    </div>
  );
};

export default Orchestrator;

Orchestrator.propTypes = {
  surveyUnit: PropTypes.objectOf(PropTypes.any).isRequired,
  source: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.any).isRequired,
  }).isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
