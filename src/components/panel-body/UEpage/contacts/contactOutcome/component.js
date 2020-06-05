import React /* , { useContext } */ from 'react';
/* import PropTypes from 'prop-types'; */
import D from 'i18n';
/* import SurveyUnitContext from '../../UEContext'; */

const ContactOutcome = (/* { saveUE } */) => {
  /* const ue = useContext(SurveyUnitContext); */
  const outcome = {
    date: 1590055200000,
    totalNumberOfContactAttempts: 3,
    type: 'INA',
  };
  return (
    <div className="ContactOutcome">
      <h2>{D.contactOutcome}</h2>
      <div>{`${outcome.type} (${outcome.totalNumberOfContactAttempts} attempts)`}</div>
      <button type="button" className="bottom-right">{` ✎ ${D.editButton}`}</button>
    </div>
  );
};

export default ContactOutcome;
/* ContactOutcome.propTypes = {
  saveUE: PropTypes.func.isRequired,
}; */
