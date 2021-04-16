import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialIcons from 'common-tools/icons/materialIcons';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
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
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: { fontWeight: 'bold', marginRight: '0.5em' },
  invisible: { color: theme.palette.primary.main },
}));

const AtomicInfoTile = ({ iconType, data, onClickFunction }) => {
  const classes = useStyles();
  let labels = [];
  const values = data.reduce((arr, { label, value }) => {
    const valid = value !== undefined && value !== '';
    return [
      ...arr,
      <Typography key={label} className={valid ? '' : classes.invisible}>
        {value !== undefined && value !== '' ? value : '-'}
      </Typography>,
    ];
  }, []);

  data.forEach(({ label, value }) => {
    labels = [
      ...labels,
      <Typography key={label} className={classes.label}>
        {label !== undefined ? label : ''}
      </Typography>,
    ];
  });

  return (
    <Paper className={classes.root} onClick={() => onClickFunction()} variant="outlined">
      <div className={classes.firstLine}>
        <MaterialIcons type={iconType} />
      </div>
      <div className={classes.row}>
        <div className={classes.column}>{[...labels]}</div>
        <div className={classes.column}>{[...values]}</div>
      </div>
    </Paper>
  );
};

export default AtomicInfoTile;
AtomicInfoTile.propTypes = {
  iconType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }))
    .isRequired,
  onClickFunction: PropTypes.func.isRequired,
};
