import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { getPhoneSource } from 'common-tools/functions';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 8,
    '&:hover': { cursor: 'pointer' },
    minHeight: 130,
    width: 'max-content',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
  center: {
    alignSelf: 'center',
    color: theme.palette.text.secondary,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: { marginLeft: '0.5em' },
  favorite: { color: 'gold' },
  invisible: { color: theme.palette.primary.main },
}));

const PhoneList = ({ numbers, type }) => {
  const classes = useStyles();
  console.log('type ', type);
  console.log('numbers ', numbers);
  return (
    <div className={classes.root}>
      <Typography className={classes.center}>{getPhoneSource(type)}</Typography>
      {numbers.map(phoneNumber => {
        const style = phoneNumber.favorite ? classes.favorite : classes.invisible;
        return (
          <div className={classes.row}>
            <StarIcon classes={{ root: style }} />
            <Typography className={classes.label}>{phoneNumber.number}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default PhoneList;
PhoneList.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};
