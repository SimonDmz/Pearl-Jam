import React from 'react';
import { Route } from 'react-router-dom';
import UEPage from 'components/panel-body/UEpage';
import UESPage from 'components/panel-body/UESpage';
import Navigation from 'components/common/navigation';

const Home = ({ match }) => {
  return (
    <>
      <Navigation />
      <div className="home">
        <Route
          path={`${match.url}survey-unit/:id`}
          component={routeProps => <UEPage {...routeProps} />}
        />
        <Route exact path={`${match.url}`} component={routeProps => <UESPage {...routeProps} />} />
      </div>
    </>
  );
};

export default Home;
