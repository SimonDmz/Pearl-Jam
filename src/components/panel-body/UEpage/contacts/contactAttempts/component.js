import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import D from 'i18n';
import SurveyUnitContext from '../../UEContext';

const ContactAttempts = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);

  const lines = () => {
    const { contactAttempts } = ue;
    if (Array.isArray(contactAttempts) && contactAttempts.length > 0)
      return contactAttempts.map(contAtt => {
        return (
          <div>
            <button type="button">{` 🗑 `}</button>
            <div>{contAtt.type}</div>
            <button type="button">{` ✎ ${D.editButton}`}</button>
          </div>
        );
      });
    return <div>No data to process</div>;
  };
  return (
    <div className="ContactAttempts">
      <h2>{D.contactAttempts}</h2>
      {lines()}

      <button type="button">{` + ${D.addButton}`}</button>
    </div>
  );
};

export default ContactAttempts;
ContactAttempts.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
