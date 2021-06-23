import { useAuth } from 'common-tools/auth/initAuth';
import useServiceWorker from 'common-tools/hooks/useServiceWorker';
import Preloader from 'components/common/loader';
import Notification from 'components/common/Notification';
import Palette from 'components/common/palette';
import Home from 'components/panel-body/home';
import D from 'i18n';
import React from 'react';
import { Route } from 'react-router-dom';

function App() {
  const { authenticated } = useAuth();
  const serviceWorkerInfo = useServiceWorker(authenticated);

  return (
    <>
      <Notification serviceWorkerInfo={serviceWorkerInfo} />
      <div>
        {!authenticated && <Preloader message={D.pleaseWait} />}
        {authenticated && (
          <>
            <Route path="/" render={routeProps => <Home {...routeProps} />} />
            <Route path="/palette" component={Palette} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
