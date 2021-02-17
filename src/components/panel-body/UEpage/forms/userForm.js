import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import SurveyUnitContext from '../UEContext';

//* save={saveFunction} previousValue={previousValue} closeModal={closeModal} */

const Form = ({ closeModal, previousValue, save }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  const [lastName, setLastName] = useState(previousValue.lastName);
  const [firstName, setFirstName] = useState(previousValue.firstName);

  const onChange = event => {
    const key = event.target.name;
    switch (key) {
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      default:
        break;
    }
  };

  const saveUE = () => {
    save({ ...surveyUnit, lastName, firstName });
  };

  return (
    <>
      <h3>{`${D.surveyUnitNameChange}`}</h3>
      <form>
        <label htmlFor="lastName">
          {`${D.surveyUnitLastName} :`}
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ''}
            onChange={onChange}
          />
        </label>
        <label htmlFor="firstName">
          {`${D.surveyUnitFirstName} :`}
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ''}
            onChange={onChange}
          />
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
  previousValue: PropTypes.shape({
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  save: PropTypes.func.isRequired,
};
