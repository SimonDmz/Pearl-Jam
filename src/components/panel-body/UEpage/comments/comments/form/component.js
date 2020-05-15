import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCommentByType } from 'common-tools/functions';
import './form.scss';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const [interviewerComment, setInterviewerComment] = useState(
    getCommentByType('interviewerComment', surveyUnit)
  );

  const onChange = event => {
    setInterviewerComment(event.target.value);
  };

  const save = () => {
    const managementCommentValue = getCommentByType('managementComment', surveyUnit);
    const managementComment = { type: 'managementComment', value: managementCommentValue };
    const newInterviewerComment = { type: 'interviewerComment', value: interviewerComment };

    const newComments = [];
    newComments.push(managementComment);
    newComments.push(newInterviewerComment);
    surveyUnit.comments = newComments;
    saveUE(surveyUnit);
  };

  return (
    <div className="form">
      <label htmlFor="comment">
        <p className="title">{D.surveyUnitComment}</p>
        <textarea
          autoFocus
          type="textarea"
          id="comment"
          name="comment"
          rows="10"
          cols="100"
          defaultValue={interviewerComment}
          onChange={onChange}
        />
      </label>
      <div className="buttonsGroup">
        <button type="button" onClick={closeModal}>
          {`✗ ${D.cancelButton}`}
        </button>
        <button type="button" onClick={save}>
          {`✔ ${D.saveButton}`}
        </button>
      </div>
    </div>
  );
};

export default Form;
Form.propTypes = {
  surveyUnit: PropTypes.object,
  saveUE: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
