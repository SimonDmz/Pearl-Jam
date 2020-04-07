import React, { useState } from 'react';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const useField = defaultValue => {
    const [email, setEmail] = useState(defaultValue.email);

    const onChange = event => {
      if (event.target.name === 'email') {
        setEmail(event.target.value);
      }
    };
    return {
      email,
      onChange,
    };
  };

  const ueState = useField(surveyUnit);

  const saveTempUE = () => {
    surveyUnit.email = ueState.email;
    saveUE(surveyUnit);
  };

  return (
    <>
      <h3>{`Modification de l'unité enquêtée`}</h3>
      <form onSubmit={saveTempUE}>
        <label htmlFor="email">
          {`${D.surveyUnitEmail} :`}
          <input
            type="text"
            autoFocus
            id="email"
            name="email"
            value={ueState.email || ''}
            onChange={ueState.onChange}
          />
        </label>
      </form>

      <button type="button" onClick={saveTempUE}>
        {D.validateButton}
      </button>
      <button type="button" onClick={closeModal}>
        {D.cancelButton}
      </button>
    </>
  );
};

export default Form;
