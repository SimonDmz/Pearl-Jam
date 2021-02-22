import { useAuth } from 'common-tools/auth/initAuth';
import useServiceWorker from 'common-tools/hooks/useServiceWorker';
import Preloader from 'components/common/loader';
import Notification from 'components/common/Notification';
import ChatPage from 'components/panel-body/chat';
import Home from 'components/panel-body/home';
import NotificationsPage from 'components/panel-body/notifications';
import TrainingPage from 'components/panel-body/training';
import D from 'i18n';
import React from 'react';
import { Route } from 'react-router-dom';

function App() {
  const { authenticated } = useAuth();
  const serviceWorkerInfo = useServiceWorker(authenticated);

  return (
    <>
      <Notification serviceWorkerInfo={serviceWorkerInfo} />
      <div className="pearl-container">
        {!authenticated && <Preloader message={D.pleaseWait} />}
        {authenticated && (
          <>
            <Route path="/notifications" component={NotificationsPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/training" component={TrainingPage} />
            <Route path="/" render={routeProps => <Home {...routeProps} />} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
