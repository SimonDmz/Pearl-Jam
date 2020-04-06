import React from 'react';
import { NavLink } from 'react-router-dom';
import Notif from './notif.icon';

const NavigationItem = ({ disabled = false, path, label, notif = 0 }) => {
  const handleCkick = e => {
    if (disabled) {
      console.log('disabled');
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="nav-item">
        <NavLink
          disabled={disabled}
          onClick={e => handleCkick(e)}
          activeClassName="active"
          exact
          to={`${path}`}
        >
          {label}
        </NavLink>
        {notif > 0 && <Notif number={notif} />}
      </div>
    </>
  );
};

export default NavigationItem;
