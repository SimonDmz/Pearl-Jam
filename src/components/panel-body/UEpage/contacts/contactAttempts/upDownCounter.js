import { IconButton, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '1.5em',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UpDownCounter = ({ selectedDate, handleDateChange, type }) => {
  const classes = useStyles();

  //* keep value in [min-max] range to prevent hour/day leap
  const clean = value => (type === 'hours' ? (value + 24) % 24 : (value + 60) % 60);

  const getData = () => (type === 'hours' ? getHours(selectedDate) : getMinutes(selectedDate));

  const setData = value => {
    const cleanedValue = clean(value);
    return type === 'hours'
      ? setHours(selectedDate, cleanedValue)
      : setMinutes(selectedDate, cleanedValue);
  };

  return (
    <div className={classes.column}>
      <IconButton
        onClick={() => {
          handleDateChange(setData(getData() + 1));
        }}
      >
        <ExpandLessIcon className={classes.icon} />
      </IconButton>
      {getData()
        .toString()
        .padStart(2, '0')}
      <IconButton
        onClick={() => {
          handleDateChange(setData(getData() - 1));
        }}
      >
        <ExpandMoreIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default UpDownCounter;
UpDownCounter.propTypes = {
  selectedDate: PropTypes.shape({}).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
