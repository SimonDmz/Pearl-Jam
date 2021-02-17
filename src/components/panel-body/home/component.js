import Navigation from 'components/common/navigation/component';
import UEPage from 'components/panel-body/UEpage';
import UESPage from 'components/panel-body/UESpage';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { version } from '../../../../package.json';
import './home.scss';

const Home = ({ location, match }) => {
  const [textSearch, setTextSearch] = useState('');

  return (
    <div className="home">
      <Navigation
        location={location}
        textSearch={textSearch}
        setTextSearch={setTextSearch}
        version={version}
      />
      <Route path="/survey-unit/:id" render={routeProps => <UEPage {...routeProps} />} />
      <Route
        exact
        path={`${match.url}`}
        render={routeProps => <UESPage {...routeProps} textSearch={textSearch} />}
      />
    </div>
  );
};

export default Home;
Home.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  location: PropTypes.shape({}).isRequired,
};
