import D from 'i18n';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ match }) => {
  return (
    <>
      <nav className="nav-bar-ue">
        <NavLink activeClassName="active" className="item" exact to={`${match.url}/details`}>
          {D.goToContactDetailsPage}
        </NavLink>
        <NavLink activeClassName="active" className="item" exact to={`${match.url}/identification`}>
          {D.goToSpottingPage}
        </NavLink>
        <span
          // activeClassName="active"
          disabled="disabled"
          className="item"
          // exact
          to={`${match.url}/mails`}
        >
          {D.goToMailsPage}
        </span>
        <NavLink activeClassName="active" className="item" exact to={`${match.url}/contacts`}>
          {D.goToContactPage}
        </NavLink>
        <NavLink activeClassName="active" className="item" exact to={`${match.url}/comments`}>
          {D.goToCommentsPage}
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
