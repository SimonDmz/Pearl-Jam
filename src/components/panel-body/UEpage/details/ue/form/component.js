import React, { useState } from 'react';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const useField = defaultValue => {
    const [lastName, setLastName] = useState(defaultValue.lastName);
    const [firstName, setFirstName] = useState(defaultValue.firstName);
    const [civility, setCivility] = useState(defaultValue.civility);

    const onChange = event => {
      let key = event.target.name;
      switch (key) {
        case 'lastName':
          setLastName(event.target.value);
          break;
        case 'firstName':
          setFirstName(event.target.value);
          break;
        case 'civility':
          setCivility(event.target.value);
          break;
        default:
          break;
      }
    };
    return {
      lastName,
      firstName,
      civility,
      onChange,
    };
  };

  const ueState = useField(surveyUnit);

  const saveTempUE = () => {
    surveyUnit.lastName = ueState.lastName;
    surveyUnit.firstName = ueState.firstName;
    surveyUnit.civility = ueState.civility;
    saveUE(surveyUnit);
  };

  return (
    <>
      <h3>{`Modification de l'unité enquêtée`}</h3>
      <form onSubmit={saveTempUE}>
        <label htmlFor="civility">
          {`${D.surveyUnitCivility} :`}
          <input
            autoFocus
            type="text"
            id="civility"
            name="civility"
            value={ueState.civility || ''}
            onChange={ueState.onChange}
          />
        </label>
        <label htmlFor="lastName">
          {`${D.surveyUnitLastName} :`}
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={ueState.lastName || ''}
            onChange={ueState.onChange}
          />
        </label>
        <label htmlFor="firstName">
          {`${D.surveyUnitFirstName} :`}
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={ueState.firstName || ''}
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
