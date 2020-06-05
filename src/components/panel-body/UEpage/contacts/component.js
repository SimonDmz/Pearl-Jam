import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContactAttempts from './contactAttempts';
import ContactOutcome from './contactOutcome';
import './contacts.scss';

const Contacts = ({ saveUE }) => {
  const locationUrl = useHistory().location.pathname;
  const save = unite => {
    saveUE(unite, locationUrl);
  };
  return (
    <div className="Contacts">
      <ContactAttempts saveUE={save} />
      <ContactOutcome saveUE={save} />
    </div>
  );
};

export default Contacts;
Contacts.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
