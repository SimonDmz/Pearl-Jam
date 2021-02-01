import UEPage from 'components/panel-body/UEpage';
import UESPage from 'components/panel-body/UESpage';
import React from 'react';
import { Route } from 'react-router-dom';
import { version } from '../../../../package.json';

const Home = ({ match, textSearch }) => {
  return (
    <div className="home">
      <Route path="/survey-unit/:id" component={routeProps => <UEPage {...routeProps} />} />
      <Route
        exact
        path={`${match.url}`}
        component={routeProps => <UESPage {...routeProps} textSearch={textSearch} />}
      />
      <div>{`Version ${version}`}</div>
    </div>
  );
};

export default Home;
