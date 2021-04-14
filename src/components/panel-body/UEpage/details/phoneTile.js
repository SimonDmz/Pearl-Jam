import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sortPhoneNumbers } from 'common-tools/functions';
import MaterialIcons from 'common-tools/icons/materialIcons';
import PropTypes from 'prop-types';
import React from 'react';
import PhoneList from './phoneList';

const useStyles = makeStyles(() => ({
  root: {
    padding: 8,
    borderRadius: 15,
    '&:hover': { cursor: 'pointer' },
    border: ' LightGray solid 1px',
    minHeight: 130,
    width: 'max-content',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
  firstLine: {
    alignSelf: 'flex-end',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: { fontWeight: 'bold', marginRight: '0.5em' },
}));

const PhoneTile = ({ phoneNumbers, onClickFunction }) => {
  const classes = useStyles();
  const { fiscalPhoneNumbers, directoryPhoneNumbers, interviewerPhoneNumbers } = sortPhoneNumbers(
    phoneNumbers
  );

  return (
    <Paper className={classes.root} onClick={() => onClickFunction()} variant="outlined">
      <div className={classes.firstLine}>
        <MaterialIcons type="phone" />
      </div>
      <div className={classes.row}>
        <PhoneList numbers={fiscalPhoneNumbers} type="fiscal" />
        <PhoneList numbers={directoryPhoneNumbers} type="directory" />
        <PhoneList numbers={interviewerPhoneNumbers} type="interviewer" />
      </div>
    </Paper>
  );
};

export default PhoneTile;
PhoneTile.propTypes = {
  phoneNumbers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClickFunction: PropTypes.func.isRequired,
};
