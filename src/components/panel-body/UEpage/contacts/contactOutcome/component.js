import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SurveyUnitContext from '../../UEContext';

const ContactOutcome = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);

  return (
    <div className="ContactOutcome">
      <span>{`Contact outcome of survey-unit with id : ${ue.id}`}</span>
      <span>{ue.ContactOutcome}</span>
    </div>
  );
};

export default ContactOutcome;
ContactOutcome.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
