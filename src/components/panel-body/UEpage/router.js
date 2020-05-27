import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { convertSUStateInToDo, getLastState } from 'common-tools/functions';
import PropTypes from 'prop-types';
import D from 'i18n';
import Navigation from './navigation';
import Details from './details';
import Comments from './comments';
import SurveyUnitContext from './UEContext';
import './router.scss';

const Router = ({ match, saveUE }) => {
  const ue = useContext(SurveyUnitContext);
  const history = useHistory();

  const openQueen = () => {
    history.push(`/queen/questionnaire/${ue.campaign}/survey-unit/${match.params.id}`);
  };

  const save = (unite, url) => {
    saveUE(unite, url);
  };
  const lastState = getLastState(ue);

  return (
    <div className="panel-body ue">
      <div className="ue-info">
        <div className="infos">
          <div className="row">
            <span>{ue.campaign ? ue.campaign : D.loading}</span>
            <span>
              {ue.sampleIdentifiers && ue.sampleIdentifiers.ssech
                ? `${D.suSample}  ${ue.sampleIdentifiers.ssech}`
                : D.loading}
            </span>
            <span>
              {ue.sampleIdentifiers && ue.sampleIdentifiers.numfa
                ? `VOOOOOO${ue.sampleIdentifiers.numfa}`
                : D.loading}
            </span>
          </div>
          <div className="row">
            <span>{ue.lastName ? `${ue.lastName}` : D.loading}</span>
            <span>{ue.firstName ? `${ue.firstName}` : D.loading}</span>
            <span>{ue.geographicalLocation ? ue.geographicalLocation.label : D.loading}</span>
          </div>
          <div className="row">
            <span className="ue-state">
              {ue.states ? convertSUStateInToDo(lastState.type) : D.loading}
            </span>
            <span className="comment ">Planifié le --/--/----</span>
          </div>
        </div>

        <div className="button-ue">
          <button type="button" onClick={openQueen}>
            {D.questionnaireButton}
          </button>
          <button type="button">{D.sendButton}</button>
        </div>
      </div>

      <div className="sub-page">
        <Navigation />
        <Route
          exact
          path={`${match.url}/details`}
          component={routeProps => <Details {...routeProps} saveUE={save} />}
        />
        <Route
          exact
          path={`${match.url}/comments`}
          component={routeProps => <Comments {...routeProps} saveUE={save} />}
        />
        <Route exact path={`${match.url}/`}>
          <Redirect to={`${match.url}/details`} />
        </Route>
      </div>
    </div>
  );
};

export default Router;
Router.propTypes = {
  match: PropTypes.object.isRequired,
  saveUE: PropTypes.func.isRequired,
};
