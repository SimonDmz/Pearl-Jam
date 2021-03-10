import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import formEnum from 'common-tools/enum/formEnum';
import PropTypes from 'prop-types';
import React from 'react';

const Letters = ({ selectFormType }) => {
  const useStyles = makeStyles(() => ({
    void: {
      height: '200px',
      width: '200px',
      boxShadow: 'unset',
      borderRadius: '15px',
      border: 'LightGray solid 1px',
    },
  }));

  const classes = useStyles();

  return <Paper onClick={() => selectFormType(formEnum.USER, false)} className={classes.void} />;
};

export default Letters;
Letters.propTypes = { selectFormType: PropTypes.func.isRequired };
