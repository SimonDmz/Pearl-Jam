import { Button, DialogActions, DialogTitle, makeStyles, TextField } from '@material-ui/core';
import { getCommentByType } from 'common-tools/functions';
import D from 'i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import SurveyUnitContext from '../UEContext';

const useStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Form = ({ closeModal, previousValue, save }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const [interviewerComment, setInterviewerComment] = useState(previousValue);

  const onChange = event => {
    setInterviewerComment(event.target.value);
  };

  const saveUE = () => {
    const managementCommentValue = getCommentByType('MANAGEMENT', surveyUnit);
    const managementComment = { type: 'MANAGEMENT', value: managementCommentValue };
    const newInterviewerComment = { type: 'INTERVIEWER', value: interviewerComment };

    const newComments = [];
    newComments.push(managementComment);
    newComments.push(newInterviewerComment);
    save({ ...surveyUnit, comments: newComments });
  };

  const classes = useStyles();

  return (
    <div className={classes.column}>
      <DialogTitle id="form-dialog-title">{D.organizationComment}</DialogTitle>
      <TextField
        margin="dense"
        id="comment"
        name="comment"
        type="text"
        rows={10}
        rowsMax={10}
        multiline
        fullWidth
        defaultValue={interviewerComment}
        onChange={onChange}
        variant="outlined"
      />
      <DialogActions>
        <Button type="button" onClick={closeModal}>
          <i className="fa fa-times" aria-hidden="true" />
          &nbsp;
          {D.cancelButton}
        </Button>
        <Button type="button" onClick={saveUE}>
          <i className="fa fa-check" aria-hidden="true" />
          &nbsp;
          {D.saveButton}
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
Form.propTypes = {
  previousValue: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
