import React, { useState } from 'react';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const useField = defaultValue => {
    const [deliveryPoint, setDeliveryPoint] = useState(
      defaultValue.deliveryPoint ? defaultValue.deliveryPoint : ''
    );
    const [additionalAddress, setAdditionalAddress] = useState(
      defaultValue.additionalAddress ? defaultValue.additionalAddress : ''
    );
    const [number, setNumber] = useState(defaultValue.number ? defaultValue.number : '');
    const [streetType, setStreetType] = useState(
      defaultValue.streetType ? defaultValue.streetType : ''
    );
    const [streetName, setStreetName] = useState(
      defaultValue.streetName ? defaultValue.streetName : ''
    );
    const [postcode, setpostcode] = useState(defaultValue.postcode ? defaultValue.postcode : '');
    const [city, setCity] = useState(defaultValue.city ? defaultValue.city : '');

    const onChange = event => {
      const key = event.target.name;
      switch (key) {
        case 'deliveryPoint':
          setDeliveryPoint(event.target.value);
          break;
        case 'additionalAdress':
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
        deliveryPoint,
        additionalAddress,
        number,
        streetType,
        streetName,
        postcode,
        city,
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
            value={addressField.address.deliveryPoint}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="additionalAddress">
          {`${D.addressAdditionalAddress} :`}
          <input
            type="text"
            id="additionalAddress"
            name="additionalAddress"
            value={addressField.address.additionalAddress}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="number">
          {`${D.addressNumber} :`}
          <input
            type="text"
            id="number"
            name="number"
            value={addressField.address.number}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="streetType">
          {`${D.addressStreetType} :`}
          <input
            type="text"
            id="streetType"
            name="streetType"
            value={addressField.address.streetType}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="streetName">
          {`${D.addressStreetName} :`}
          <input
            type="text"
            id="streetName"
            name="streetName"
            value={addressField.address.streetName}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="postcode">
          {`${D.addressPostcode} :`}
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={addressField.address.postcode}
            onChange={addressField.onChange}
          />
        </label>
        <label htmlFor="city">
          {`${D.addressCity} :`}
          <input
            type="text"
            id="city"
            name="city"
            value={addressField.address.city}
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
