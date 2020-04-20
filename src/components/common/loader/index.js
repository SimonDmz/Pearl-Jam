import React from 'react';
import imgPreloader from 'img/loader.svg';
import D from 'i18n';
import './loader.scss';

const Preloader = ({ message }) => (
  <>
    <div className="preloader">
      <img src={imgPreloader} alt="waiting..." />
      <h2>{D.pleaseWait}</h2>
      <h3>{message}</h3>
    </div>
  </>
);

export default Preloader;
