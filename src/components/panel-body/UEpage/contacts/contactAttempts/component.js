import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import D from 'i18n';
import format from 'date-fns/format';
import SurveyUnitContext from '../../UEContext';

const ContactAttempts = ({ saveUE }) => {
  const ue = useContext(SurveyUnitContext);

  const lines = () => {
    const contactAttempts = [
      {
        date: 1589986800000,
        status: 'BUL',
      },
      {
        date: 1589994000000,
        status: 'BUL',
      },
      {
        date: 1590055200000,
        status: 'COM',
      },
    ];
    if (Array.isArray(contactAttempts) && contactAttempts.length > 0)
      return contactAttempts.map(contAtt => {
        const date = format(new Date(contAtt.date), 'dd/MM/yyyy');
        const hour = format(new Date(contAtt.date), 'H');

        return (
          <div className="line">
            <button type="button">{` 🗑 `}</button>
            <div>{`${date} - ${hour}H - Téléphone - ${contAtt.status}`}</div>
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
