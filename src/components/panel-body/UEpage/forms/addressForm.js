import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import SurveyUnitContext from '../UEContext';

const Form = ({ closeModal, save, previousValue }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  /** previousValue =[ { label: D.anyOne , value: realValue }, {}, ... ] */
  /** previousData = { D.anyOne: realValue , D.anotherOne: anotherRealValue }  */
  const previousData = previousValue.reduce(
    (obj, { label, value }) => ({ ...obj, [label]: value }),
    {}
  );

  const [deliveryPoint, setDeliveryPoint] = useState(
    previousData[D.addressName] ? previousData[D.addressName] : ''
  );
  const [additionalAddress, setAdditionalAddress] = useState(
    previousData[D.addressAdditionalAddress] ? previousData[D.addressAdditionalAddress] : ''
  );
  const [number, setNumber] = useState(
    previousData[D.addressStreetName] ? previousData[D.addressStreetName] : ''
  );
  const [streetType, setStreetType] = useState(
    previousData[D.addressFullAddress] ? previousData[D.addressFullAddress] : ''
  );
  const [streetName, setStreetName] = useState(
    previousData[D.addressCountry] ? previousData[D.addressCountry] : ''
  );
  const [postcode, setpostcode] = useState(
    previousData[D.addressCity] ? previousData[D.addressCity] : ''
  );
  const [city, setCity] = useState(
    previousData[D.addressCountry] ? previousData[D.addressCountry] : ''
  );

  const buildAddress = () => {
    return {
      l1: deliveryPoint,
      l2: additionalAddress,
      l3: number,
      l4: streetType,
      l5: streetName,
      l6: postcode,
      l7: city,
    };
  };

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

  const saveUE = () => {
    save({ ...surveyUnit, address: buildAddress() });
  };

  return (
    <>
      <h3>{D.surveyUnitAddressChange}</h3>
      <form>
        <label htmlFor="deliveryPoint">
          {`${D.addressName} :`}
          <input
            type="text"
            id="deliveryPoint"
            name="deliveryPoint"
            value={deliveryPoint}
            onChange={onChange}
          />
        </label>
        <div hidden="hidden">
          <label htmlFor="additionalAddress">
            {`${D.addressAdditionalAddress} :`}
            <input
              type="text"
              id="additionalAddress"
              name="additionalAddress"
              value={additionalAddress}
              onChange={onChange}
            />
          </label>
          <label htmlFor="number">
            {`${D.addressNumber} :`}
            <input type="text" id="number" name="number" value={number} onChange={onChange} />
          </label>
        </div>
        <label htmlFor="streetType">
          {`${D.addressFullAddress} :`}
          <input
            type="text"
            id="streetType"
            name="streetType"
            value={streetType}
            onChange={onChange}
          />
        </label>
        <div hidden="hidden">
          <label htmlFor="streetName">
            {`${D.addressStreetName} :`}
            <input
              type="text"
              id="streetName"
              name="streetName"
              value={streetName}
              onChange={onChange}
            />
          </label>
        </div>
        <label htmlFor="postcode">
          {`${D.addressCity} :`}
          <input type="text" id="postcode" name="postcode" value={postcode} onChange={onChange} />
        </label>
        <label htmlFor="city">
          {`${D.addressCountry} :`}
          <input type="text" id="city" name="city" value={city} onChange={onChange} />
        </label>
      </form>

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
  save: PropTypes.func.isRequired,
  previousValue: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
