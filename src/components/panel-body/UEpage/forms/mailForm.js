import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import SurveyUnitContext from '../UEContext';

const Form = ({ closeModal, save, previousValue }) => {
  const surveyUnit = useContext(SurveyUnitContext);

  const [email, setEmail] = useState(previousValue);

  const onChange = event => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
  };

  const saveUE = () => {
    save({ ...surveyUnit, email });
  };

  return (
    <>
      <h3>{`${D.surveyUnitEmailChange}`}</h3>
      <form>
        <label htmlFor="email">
          {`${D.surveyUnitEmail} :`}
          <input type="text" id="email" name="email" value={email || ''} onChange={onChange} />
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
  save: PropTypes.func.isRequired,
  previousValue: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
