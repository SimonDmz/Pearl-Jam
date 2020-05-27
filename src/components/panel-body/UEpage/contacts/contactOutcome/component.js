import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import D from 'i18n';
import SurveyUnitContext from '../../UEContext';

const ContactOutcome = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);

  return (
    <div className="ContactOutcome">
      <h2>{D.contactOutcome}</h2>
      <div>{`Contact outcome of survey-unit #${ue.id}`}</div>
      <div>{ue.ContactOutcome}</div>
      <button type="button">{` ✎ ${D.editButton}`}</button>
    </div>
  );
};

export default ContactOutcome;
ContactOutcome.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
