import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialIcons from 'common-tools/icons/materialIcons';
import PropTypes from 'prop-types';
import React from 'react';

const AtomicInfoTile = ({ iconType, data, onClickFunction }) => {
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
  const classes = useStyles();

  return (
    <Paper className={classes.root} onClick={() => onClickFunction()} variant="outlined">
      <div className={classes.firstLine}>
        <MaterialIcons type={iconType} />
      </div>
      {data.map(({ label, value }) => {
        return (
          <div key={`${label}-${value}`} className={classes.row}>
            {label !== undefined ? <Typography className={classes.label}>{label}</Typography> : ''}
            <Typography>{value}</Typography>
          </div>
        );
      })}
    </Paper>
  );
};

export default AtomicInfoTile;
AtomicInfoTile.propTypes = {
  iconType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string.isRequired })
  ).isRequired,
  onClickFunction: PropTypes.func.isRequired,
};
