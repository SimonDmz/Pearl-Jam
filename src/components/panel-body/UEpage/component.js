import suStateEnum from 'common-tools/enum/SUStateEnum';
import { addNewState, getLastState } from 'common-tools/functions';
import D from 'i18n';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Router from './router';
import { SurveyUnitProvider } from './UEContext';

const UEPage = ({ match }) => {
  const [surveyUnit, setSurveyUnit] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    let init = false;
    surveyUnitDBService.getById(match.params.id).then(ue => {
      if (!init) {
        setSurveyUnit(ue);
      }
    });

    return () => {
      init = true;
    };
  }, [match]);

  const redirectTo = url => {
    if (url !== undefined) {
      history.push(url);
    }
  };

  const saveUE = (ue, url) => {
    console.log('root save with ', ue);
    setSurveyUnit(ue);
    surveyUnitDBService.update(ue);
    redirectTo(url);
  };

  useEffect(() => {
    if (surveyUnit !== undefined) {
      const lastState = getLastState(surveyUnit);
      if (lastState.type === suStateEnum.VISIBLE_AND_CLICKABLE.type) {
        addNewState(surveyUnit, suStateEnum.IN_PREPARATION.type);
        history.push(history.location.pathname);
      }
    }
  }, [surveyUnit, history]);

  return (
    <>
      {surveyUnit && (
        <SurveyUnitProvider value={surveyUnit}>
          <Router match={match} saveUE={saveUE} />
        </SurveyUnitProvider>
      )}

      {!surveyUnit && (
        <>
          <button type="button" className="button-back-home" onClick={() => redirectTo('/')}>
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </button>
          <h2>{`${D.surveyUnitNotFound} ${match.params.id}.`}</h2>
        </>
      )}
    </>
  );
};

export default UEPage;
