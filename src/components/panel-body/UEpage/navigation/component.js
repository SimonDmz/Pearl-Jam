import React from 'react';
import { NavLink } from 'react-router-dom';
import D from 'i18n';

const Navigation = ({ match }) => {
  return (
    <>
      <div className="div-nav-ue">
        <nav className="nav-bar-ue">
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/details`}>
            {D.goToContactDetailsPage}
          </NavLink>
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/spotting`}>
            {D.goToSpottingPage}
          </NavLink>
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/mails`}>
            {D.goToMailsPage}
          </NavLink>
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/contacts`}>
            {D.goToContactPage}
          </NavLink>
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/comments`}>
            {D.goToCommentsPage}
          </NavLink>
          <NavLink activeClassName="active" className="item" exact to={`${match.url}/other`}>
            {D.goToOtherPage}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
