import { Backdrop, makeStyles } from '@material-ui/core';
import D from 'i18n';
import imgPreloader from 'img/loader.svg';
import PropTypes from 'prop-types';
import React from 'react';
import './loader.scss';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  img: { marginTop: '10%' },
}));

const Preloader = ({ message }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      {/* <div className="preloader"> */}
      <img src={imgPreloader} alt="waiting..." />
      <h2>{D.pleaseWait}</h2>
      <h3>{message}</h3>
      {/* </div> */}
    </Backdrop>
  );
};

export default Preloader;
Preloader.propTypes = {
  message: PropTypes.string.isRequired,
};
