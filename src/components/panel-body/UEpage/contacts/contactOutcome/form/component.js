import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contactOutcomeEnum from 'common-tools/enum/ContactOutcomEnum';
import surveyUnitStateEnum from 'common-tools/enum/SUStateEnum';
import { addNewState } from 'common-tools/functions';
import D from 'i18n';
import './form.scss';

const Form = ({ closeModal, surveyUnit, contactOutcome, saveUE }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formContactAttempt, setFormContactAttempt] = useState(contactOutcome);

  const onChange = event => {
    const newType = event.target.value;
    const newDate = new Date().getTime();
    setFormContactAttempt({ ...formContactAttempt, type: newType, date: newDate });
  };

  const onContactAttemptsCountChange = event => {
    const newTotal = parseInt(event.target.value, 10);
    const newDate = new Date().getTime();
    setFormContactAttempt({
      ...formContactAttempt,
      totalNumberOfContactAttempts: newTotal,
      date: newDate,
    });
  };

  useEffect(() => {
    const checkForm = () => {
      const { type, totalNumberOfContactAttempts } = formContactAttempt;
      const typeIsValid = Object.keys(contactOutcomeEnum)
        .map(enumKey => {
          return contactOutcomeEnum[enumKey].type;
        })
        .includes(type);
      const isValid = typeIsValid && totalNumberOfContactAttempts > 0;

      if (isValid !== formIsValid) setFormIsValid(isValid);
    };

    checkForm();
  }, [formContactAttempt, formIsValid]);

  const save = async () => {
    const newSu = surveyUnit;
    newSu.contactOutcome = formContactAttempt;
    const { type } = formContactAttempt;
    // lifeCycle update
    if (type === contactOutcomeEnum.INTERVIEW_ACCEPTED.type) {
      await addNewState(surveyUnit, surveyUnitStateEnum.APPOINTMENT_MADE.type);
    } else {
      await addNewState(surveyUnit, surveyUnitStateEnum.WAITING_FOR_TRANSMISSION.type);
    }
    console.log('newSu after adding new state : ', newSu);
    saveUE(newSu);
  };

  return (
    <div className="form">
      <label htmlFor="contactAttemptResult">
        <p className="title">{D.contactOutcomeValidation}</p>
        <select
          type="list"
          id="contactOutcomeResult"
          name="contactOutcomeResult"
          onChange={onChange}
          value={formContactAttempt.type !== undefined ? formContactAttempt.type : 'placeholder'}
          required
        >
          <option disabled hidden value="placeholder">
            {D.chooseAnOption}
          </option>

          <option value={contactOutcomeEnum.INTERVIEW_ACCEPTED.type}>
            {contactOutcomeEnum.INTERVIEW_ACCEPTED.value}
          </option>
          <option value={contactOutcomeEnum.IMPOSSIBLE_TO_REACH.type}>
            {contactOutcomeEnum.IMPOSSIBLE_TO_REACH.value}
          </option>
          <option value={contactOutcomeEnum.REFUSAL.type}>
            {contactOutcomeEnum.REFUSAL.value}
          </option>
          <option value={contactOutcomeEnum.INTERVIEW_IMPOSSIBLE.type}>
            {contactOutcomeEnum.INTERVIEW_IMPOSSIBLE.value}
          </option>
          <option value={contactOutcomeEnum.ALREADY_ANSWERED.type}>
            {contactOutcomeEnum.ALREADY_ANSWERED.value}
          </option>
          <option value={contactOutcomeEnum.WISH_ANOTHER_MODE.type}>
            {contactOutcomeEnum.WISH_ANOTHER_MODE.value}
          </option>
          <option value={contactOutcomeEnum.OUT_OF_SCOPE.type}>
            {contactOutcomeEnum.OUT_OF_SCOPE.value}
          </option>
        </select>
      </label>
      <div className="contactAttemptsTotal">
        <p>{D.totalNumberOfContactAttempts}</p>
        <input
          type="number"
          onChange={onContactAttemptsCountChange}
          value={formContactAttempt.totalNumberOfContactAttempts}
          min="0"
        />
      </div>
      <div className="buttonsGroup">
        <button type="button" onClick={closeModal}>
          {`✗ ${D.cancelButton}`}
        </button>
        <button type="button" onClick={save} disabled={!formIsValid}>
          {`✔ ${D.saveButton}`}
        </button>
      </div>
    </div>
  );
};

export default Form;
Form.propTypes = {
  surveyUnit: PropTypes.shape({
    contactAttempts: PropTypes.array,
    id: PropTypes.string,
    campaign: PropTypes.string,
  }).isRequired,
  saveUE: PropTypes.func.isRequired,
  contactOutcome: PropTypes.shape({
    date: PropTypes.number.isRequired,
    type: PropTypes.string,
    totalNumberOfContactAttempts: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
Form.defaultProps = {};
