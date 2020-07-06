import React, { useState, useEffect } from 'react';
import imgInsee from 'img/insee.png';
import Synchronize from 'components/common/synchronize';
import D from 'i18n';
import NavigationItem from './item';
import OnlineStatus from '../online-status';

const Navigation = ({ location }) => {
  const [disabled, setDisable] = useState(location.pathname.startsWith('/queen'));

  useEffect(() => {
    setDisable(location.pathname.startsWith('/queen'));
  }, [location]);

  const getName = () => {
    const interviewerFromLocalStorage = localStorage.getItem('pearl-interviewer');
    return interviewerFromLocalStorage ? JSON.parse(interviewerFromLocalStorage).name : '';
  };

  return (
    <>
      <div className="top-info">
        <div className="user-name">{`${D.welcome} ${getName()}`}</div>
        <OnlineStatus />
      </div>
      <nav className="nav-bar" disabled={disabled}>
        <div className="items">
          <img alt="logo Insee" src={imgInsee} className="insee-logo" />
          <NavigationItem disabled={false} path="/" label={D.goToHomePage} />
          <NavigationItem
            disabled={disabled}
            notif={5}
            path="/notifications"
            label={D.goToNotificationsPage}
          />
          <NavigationItem disabled={disabled} path="/chat" label={D.goToChatPage} />
          <NavigationItem disabled={disabled} path="/training" label={D.goToTrainingPage} />
        </div>
        <div className="top-right">
          <Synchronize disabled={disabled} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
