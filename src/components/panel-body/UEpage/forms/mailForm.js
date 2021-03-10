import { Button, DialogActions, DialogTitle, makeStyles, TextField } from '@material-ui/core';
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

  const classes = useStyles();

  return (
    <div className={classes.column}>
      <DialogTitle id="form-dialog-title">{D.surveyUnitEmailChange}</DialogTitle>
      <TextField
        margin="dense"
        id="email"
        name="email"
        label={D.surveyUnitEmail}
        type="text"
        fullWidth
        defaultValue={email || ''}
        onChange={onChange}
      />
      <DialogActions>
        <Button type="button" onClick={saveUE}>
          <i className="fa fa-check" aria-hidden="true" />
          &nbsp;
          {D.validateButton}
        </Button>
        <Button type="button" onClick={closeModal}>
          <i className="fa fa-times" aria-hidden="true" />
          &nbsp;
          {D.cancelButton}
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
Form.propTypes = {
  save: PropTypes.func.isRequired,
  previousValue: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
