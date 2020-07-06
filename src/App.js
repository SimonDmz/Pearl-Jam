import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'components/panel-body/home';
import ChatPage from 'components/panel-body/chat';
import NotificationsPage from 'components/panel-body/notifications';
import TrainingPage from 'components/panel-body/training';
import QueenContainer from 'components/panel-body/queen-container';
import { useQueenFromConfig } from 'common-tools/hooks/useQueenFromConfig';
import { StateProvider } from 'common-tools/store';
import Notification from 'components/common/Notification';

function App() {
  useQueenFromConfig(`${window.location.origin}/configuration.json`);

  return (
    <StateProvider>
      <Notification />
      <div className="pearl-container">
        <Router>
          <Switch>
            <Route path="/queen" component={routeProps => <QueenContainer {...routeProps} />} />
            <Route path="/notifications" component={NotificationsPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/training" component={TrainingPage} />
            <Route path="/" render={routeProps => <Home {...routeProps} />} />
          </Switch>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
