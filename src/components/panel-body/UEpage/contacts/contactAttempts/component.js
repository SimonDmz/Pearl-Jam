import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SurveyUnitContext from '../../UEContext';

const ContactAttempts = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);

  return (
    <div className="ContactAttempts">
      <span>{`Delete contactAttempt with id : ${ue.id}`}</span>
      <span>{ue.ContactOutcome}</span>
    </div>
  );
};

export default ContactAttempts;
ContactAttempts.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
