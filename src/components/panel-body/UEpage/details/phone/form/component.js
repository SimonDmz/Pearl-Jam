import React, { useState } from 'react';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const useField = defaultValue => {
    const [phone, setPhone] = useState([...defaultValue]);

    const onChange = event => {
      let key = event.target.name;
      let index = parseInt(key.replace('phone-', ''));
      phone[index] = event.target.value;
      setPhone(phone.slice());
    };

    const addPhone = () => {
      setPhone([...phone, '']);
    };

    return {
      phone,
      addPhone,
      onChange,
    };
  };

  const phoneField = useField(surveyUnit.phoneNumbers);

  const save = () => {
    surveyUnit.phoneNumbers = phoneField.phone;
    saveUE(surveyUnit);
  };

  return (
    <>
      <h3>{D.surveyUnitChange}</h3>
      <form onSubmit={save}>
        {phoneField.phone &&
          phoneField.phone.map((phoneNumber, index) => (
            <label key={index}>
              {`${D.surveyUnitPhone} :`}
              <input
                autoFocus={index === 0}
                type="tel"
                id={`phone-${index}`}
                name={`phone-${index}`}
                value={phoneNumber}
                onChange={phoneField.onChange}
              />
            </label>
          ))}
      </form>

      <button type="button" onClick={phoneField.addPhone}>
        {D.addPhoneNumberButton}
      </button>
      <button type="button" onClick={save}>
        {D.validateButton}
      </button>
      <button type="button" onClick={closeModal}>
        {D.cancelButton}
      </button>
    </>
  );
};

export default Form;
