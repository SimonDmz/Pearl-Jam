import React, { useState } from 'react';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const useField = defaultValue => {
    const [deliveryPoint, setDeliveryPoint] = useState(defaultValue.L1 ? defaultValue.L1 : '');
    const [additionalAddress, setAdditionalAddress] = useState(
      defaultValue.L2 ? defaultValue.L2 : ''
    );
    const [number, setNumber] = useState(defaultValue.L3 ? defaultValue.L3 : '');
    const [streetType, setStreetType] = useState(defaultValue.L4 ? defaultValue.L4 : '');
    const [streetName, setStreetName] = useState(defaultValue.L5 ? defaultValue.L5 : '');
    const [postcode, setpostcode] = useState(defaultValue.L6 ? defaultValue.L6 : '');
    const [city, setCity] = useState(defaultValue.L7 ? defaultValue.L7 : '');

    const onChange = event => {
      const key = event.target.name;
      switch (key) {
        case 'deliveryPoint':
          setDeliveryPoint(event.target.value);
          break;
        case 'additionalAddress':
          setAdditionalAddress(event.target.value);
          break;
        case 'number':
          setNumber(event.target.value);
          break;
        case 'streetType':
          setStreetType(event.target.value);
          break;
        case 'streetName':
          setStreetName(event.target.value);
          break;
        case 'postcode':
          setpostcode(event.target.value);
          break;
        case 'city':
          setCity(event.target.value);
          break;
        default:
          break;
      }
    };
    return {
      address: {
        L1: deliveryPoint,
        L2: additionalAddress,
        L3: number,
        L4: streetType,
        L5: streetName,
        L6: postcode,
        L7: city,
      },

      onChange,
    };
  };

  const addressField = useField(surveyUnit.address ? surveyUnit.address : '');

  const save = () => {
    surveyUnit.address = addressField.address;
    saveUE(surveyUnit);
  };

  return (
    <>
      <h3>{D.surveyUnitChange}</h3>
      <form>
        <label htmlFor="deliveryPoint">
          {`${D.addressDeliveryPoint} :`}
          <input
            autoFocus
            type="text"
            id="deliveryPoint"
            name="deliveryPoint"
            value={addressField.address.L1}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="additionalAddress">
          {`${D.addressAdditionalAddress} :`}
          <input
            type="text"
            id="additionalAddress"
            name="additionalAddress"
            value={addressField.address.L2}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="number">
          {`${D.addressNumber} :`}
          <input
            type="text"
            id="number"
            name="number"
            value={addressField.address.L3}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="streetType">
          {`${D.addressStreetType} :`}
          <input
            type="text"
            id="streetType"
            name="streetType"
            value={addressField.address.L4}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="streetName">
          {`${D.addressStreetName} :`}
          <input
            type="text"
            id="streetName"
            name="streetName"
            value={addressField.address.L5}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="postcode">
          {`${D.addressPostcode} :`}
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={addressField.address.L6}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="city">
          {`${D.addressCity} :`}
          <input
            type="text"
            id="city"
            name="city"
            value={addressField.address.L7}
            onChange={addressField.onChange}
          />
        </label>
      </form>

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
