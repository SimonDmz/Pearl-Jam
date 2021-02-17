import PropTypes from 'prop-types';
import React from 'react';
import ContactAttempts from './contactAttempts';
import ContactOutcome from './contactOutcome';
import './contacts.scss';

const Contacts = ({ selectFormType }) => {
  return (
    <div className="Contacts">
      <ContactAttempts selectFormType={selectFormType} />
      <ContactOutcome selectFormType={selectFormType} />
    </div>
  );
};

export default Contacts;
Contacts.propTypes = {
  selectFormType: PropTypes.func.isRequired,
};
