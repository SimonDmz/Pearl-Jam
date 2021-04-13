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

  const indexedPhoneNumbers = previousValue.map((number, index) => ({
    value: number,
    order: index,
  }));

  const cleanPhoneNumbers = numbers => numbers.map(({ value }) => value);

  const [phone, setPhone] = useState([...indexedPhoneNumbers]);

  const onChange = event => {
    const key = event.target.name;
    const index = parseInt(key.replace('phone-', ''), 10);
    phone[index] = { ...phone[index], value: event.target.value };
    setPhone(phone.slice());
  };

  const addPhone = () => {
    setPhone([...phone, { value: '', order: phone.length }]);
  };

  const saveUE = () => {
    save({ ...surveyUnit, phoneNumbers: cleanPhoneNumbers(phone) });
  };

  const classes = useStyles();

  return (
    <div className={classes.column}>
      <DialogTitle id="form-dialog-title">{D.surveyUnitPhoneChange}</DialogTitle>
      <form onSubmit={save}>
        {phone &&
          phone.map(phoneNumber => (
            <TextField
              margin="dense"
              id={`phone-${phoneNumber.order}`}
              name={`phone-${phoneNumber.order}`}
              label={`#${phoneNumber.order + 1}`}
              InputLabelProps={{ color: 'secondary' }}
              type="text"
              fullWidth
              defaultValue={phoneNumber.value}
              onChange={onChange}
              variant="outlined"
            />
          ))}
      </form>
      <DialogActions>
        <Button type="button" onClick={addPhone}>
          <i className="fa fa-plus" aria-hidden="true" />
          &nbsp;
          {D.addPhoneNumberButton}
        </Button>
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
  previousValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  save: PropTypes.func.isRequired,
};
