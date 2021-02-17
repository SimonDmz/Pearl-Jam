import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import SurveyUnitContext from '../UEContext';

const Form = ({ closeModal, save, previousValue }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  const indexedPhoneNumbers = previousValue.map((number, index) => {
    return { value: number, order: index };
  });

  const cleanPhoneNumbers = numbers => numbers.map(({ value }) => value);

  const [phone, setPhone] = useState([...indexedPhoneNumbers]);

  const onChange = event => {
    const key = event.target.name;
    const index = parseInt(key.replace('phone-', ''), 10);
    phone[index] = { ...phone[index], value: event.target.value };
    setPhone(phone.slice());
  };

  const addPhone = () => {
    setPhone([...phone, { value: '', order: phone.length }]);
  };

  const saveUE = () => {
    save({ ...surveyUnit, phoneNumbers: cleanPhoneNumbers(phone) });
  };

  return (
    <>
      <h3>{D.surveyUnitPhoneChange}</h3>
      <form onSubmit={save}>
        {phone &&
          phone.map(phoneNumber => (
            <label htmlFor={`phone-${phoneNumber.order}`} key={phoneNumber.order}>
              <input
                type="tel"
                id={`phone-${phoneNumber.order}`}
                name={`phone-${phoneNumber.order}`}
                value={phoneNumber.value}
                onChange={onChange}
              />
            </label>
          ))}
      </form>

      <button type="button" onClick={addPhone}>
        <i className="fa fa-plus" aria-hidden="true" />
        &nbsp;
        {D.addPhoneNumberButton}
      </button>
      <button type="button" onClick={saveUE}>
        <i className="fa fa-check" aria-hidden="true" />
        &nbsp;
        {D.validateButton}
      </button>
      <button type="button" onClick={closeModal}>
        <i className="fa fa-times" aria-hidden="true" />
        &nbsp;
        {D.cancelButton}
      </button>
    </>
  );
};

export default Form;
Form.propTypes = {
  closeModal: PropTypes.func.isRequired,
  previousValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  save: PropTypes.func.isRequired,
};
