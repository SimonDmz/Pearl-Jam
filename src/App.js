import { makeStyles } from '@material-ui/core';
import { useAuth } from 'common-tools/auth/initAuth';
import useServiceWorker from 'common-tools/hooks/useServiceWorker';
import Preloader from 'components/common/loader';
import Notification from 'components/common/Notification';
import Palette from 'components/common/palette';
import Home from 'components/panel-body/home';
import TrainingPage from 'components/panel-body/training';
import D from 'i18n';
import React from 'react';
import { Route } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  pearlContainer: {
    height: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

function App() {
  const { authenticated } = useAuth();
  const serviceWorkerInfo = useServiceWorker(authenticated);
  const classes = useStyles();
  return (
    <>
      <Notification serviceWorkerInfo={serviceWorkerInfo} />
      <div className={classes.pearlContainer}>
        {!authenticated && <Preloader message={D.pleaseWait} />}
        {authenticated && (
          <>
            <Route path="/" render={routeProps => <Home {...routeProps} />} />
            <Route path="/training" component={TrainingPage} />
            <Route path="/palette" component={Palette} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
