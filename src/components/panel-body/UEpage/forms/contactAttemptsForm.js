import contactAttemptEnum from 'common-tools/enum/ContactAttemptEnum';
import surveyUnitStateEnum from 'common-tools/enum/SUStateEnum';
import { addNewState } from 'common-tools/functions';
import D from 'i18n';
import contactAttemptDBService from 'indexedbb/services/contactAttempt-idb-service';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Form = ({ closeModal, surveyUnit, save }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [contactAttempt, setContactAttempt] = useState();

  const onChange = event => {
    const newStatus = event.target.value;
    const newDate = new Date().getTime();
    setContactAttempt({ ...contactAttempt, status: newStatus, date: newDate });
  };

  useEffect(() => {
    const checkForm = () => {
      const { status } = contactAttempt;
      const isValid = Object.keys(contactAttemptEnum)
        .map(enumKey => {
          return contactAttemptEnum[enumKey].type;
        })
        .includes(status);

      if (isValid !== formIsValid) setFormIsValid(isValid);
    };

    checkForm();
  }, [contactAttempt, formIsValid]);

  const saveUE = async () => {
    const { contactAttempts } = surveyUnit;
    let { id } = contactAttempt;
    const newSu = surveyUnit;

    if (id === undefined) {
      id = await contactAttemptDBService.insert(contactAttempt);
    } else {
      await contactAttemptDBService.update(contactAttempt);
    }

    if (!contactAttempts.includes(id)) {
      contactAttempts.push(id);
      newSu.contactAttempts = contactAttempts;
    }

    // lifeCycle update
    await addNewState(surveyUnit, surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type);

    save(newSu);
  };

  return (
    <div className="form">
      <label htmlFor="contactAttemptResult">
        <p className="title">{D.contactAttempt}</p>
        <select
          type="list"
          id="contactAttemptResult"
          name="contactAttemptResult"
          onChange={onChange}
          defaultValue="placeholder"
          required
        >
          <option disabled hidden value="placeholder">
            {D.chooseAnOption}
          </option>
          <option value={contactAttemptEnum.NO_CONTACT.type}>
            {contactAttemptEnum.NO_CONTACT.value}
          </option>
          <option value={contactAttemptEnum.INTERVIEW_ACCEPTED.type}>
            {contactAttemptEnum.INTERVIEW_ACCEPTED.value}
          </option>
          <option value={contactAttemptEnum.APPOINTMENT_MADE.type}>
            {contactAttemptEnum.APPOINTMENT_MADE.value}
          </option>
          <option value={contactAttemptEnum.REFUSAL.type}>
            {contactAttemptEnum.REFUSAL.value}
          </option>
          <option value={contactAttemptEnum.OCCASIONAL_ABSENCE_OF_INTERVIEWEE.type}>
            {contactAttemptEnum.OCCASIONAL_ABSENCE_OF_INTERVIEWEE.value}
          </option>
          <option value={contactAttemptEnum.INTERVIEW_IMPOSSIBLE.type}>
            {contactAttemptEnum.INTERVIEW_IMPOSSIBLE.value}
          </option>
          <option value={contactAttemptEnum.ALREADY_ANSWERED_IN_ANOTHER_MODE.type}>
            {contactAttemptEnum.ALREADY_ANSWERED_IN_ANOTHER_MODE.value}
          </option>
          <option value={contactAttemptEnum.WISH_TO_ANSWER_IN_ANOTHER_MODE.type}>
            {contactAttemptEnum.WISH_TO_ANSWER_IN_ANOTHER_MODE.value}
          </option>
        </select>
      </label>
      <div className="buttonsGroup">
        <button type="button" onClick={closeModal}>
          {`✗ ${D.cancelButton}`}
        </button>
        <button type="button" onClick={saveUE} disabled={!formIsValid}>
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
  }).isRequired,
  save: PropTypes.func.isRequired,
  // contactAttempt: PropTypes.shape({
  //   date: PropTypes.number.isRequired,
  //   status: PropTypes.string.isRequired,
  //   id: PropTypes.string,
  // }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
Form.defaultProps = {};
