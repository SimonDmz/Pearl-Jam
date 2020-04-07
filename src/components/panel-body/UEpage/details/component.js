import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Address from './address';
import User from './ue';
import Phone from './phone';
import Email from './email';

const UEItem = ({ saveUE }) => {
  const locationUrl = useHistory().location.pathname;

  const save = unite => {
    saveUE(unite, locationUrl);
  };

  return (
    <div className="tab">
      <div className="row">
        <User saveUE={save} />
        <Phone saveUE={save} />
        <Email saveUE={save} />
      </div>
      <Address saveUE={save} />
    </div>
  );
};

export default UEItem;
UEItem.propTypes = {
  saveUE: PropTypes.func.isRequired,
};
