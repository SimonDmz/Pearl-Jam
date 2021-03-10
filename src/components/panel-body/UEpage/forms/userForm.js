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

  const classes = useStyles();

  return (
    <div className={classes.column}>
      <DialogTitle id="form-dialog-title">{D.surveyUnitNameChange}</DialogTitle>
      <TextField
        margin="dense"
        id="lastName"
        name="lastName"
        label={D.surveyUnitLastName}
        type="text"
        fullWidth
        defaultValue={lastName || ''}
        onChange={onChange}
      />
      <TextField
        margin="dense"
        id="firstName"
        name="firstName"
        label={D.surveyUnitFirstName}
        type="text"
        fullWidth
        defaultValue={firstName || ''}
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
  closeModal: PropTypes.func.isRequired,
  previousValue: PropTypes.shape({
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  save: PropTypes.func.isRequired,
};
