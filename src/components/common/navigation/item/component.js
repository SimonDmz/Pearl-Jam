import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ disabled = false, path, label }) => {
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
      </div>
    </>
  );
};

export default NavigationItem;
