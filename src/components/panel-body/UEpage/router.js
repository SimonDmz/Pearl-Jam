import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import D from 'i18n';
import { findSuStateValueByType } from 'common-tools/enum/SUStateEnum';
import Navigation from './navigation';
import Details from './details';
import Comments from './comments';
import SurveyUnitContext from './UEContext';
import './router.scss';

const Router = ({ match, saveUE }) => {
  const ue = useContext(SurveyUnitContext);
  const history = useHistory();

  const openQueen = () => {
    history.push(`/queen/questionnaire/${ue.questionnaire}/survey-unit/${match.params.id}`);
  };

  const save = (unite, url) => {
    saveUE(unite, url);
  };

  return (
    <div className="panel-body ue">
      <div className="ue-info">
        <div className="row">
          <span>{ue.questionnaire ? ue.questionnaire : D.loading}</span>
          <span>{ue.id ? `Echantillon  ${ue.id}` : D.loading}</span>
          <span className="ue-state">
            {ue.state ? findSuStateValueByType(ue.state) : D.loading}
          </span>
        </div>
        <div className="row">
          <span>{ue.lastName ? `${ue.lastName}` : D.loading}</span>
          <span>{ue.lastName ? `${ue.firstName}` : D.loading}</span>
          <span>{ue.address ? ue.address.city : D.loading}</span>
        </div>
        <div className="row">
          <span>Yolo</span>
          <span className="comment ">Planifié le 30/03/2020</span>
        </div>
      </div>

      <div className="button-ue">
        <button type="button" onClick={openQueen}>
          {D.questionnaireButton}
        </button>
        <button type="button">{D.sendButton}</button>
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
