import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './form.scss';
import D from 'i18n';

const Form = ({ closeModal, surveyUnit, saveUE }) => {
  const [commentInterviewer, setCommentInterviewer] = useState(
    surveyUnit.commentInterviewer ? surveyUnit.commentInterviewer : ''
  );

  const onChange = event => {
    setCommentInterviewer(event.target.value);
  };

  const save = () => {
    surveyUnit.commentInterviewer = commentInterviewer;
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
          defaultValue={commentInterviewer}
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
