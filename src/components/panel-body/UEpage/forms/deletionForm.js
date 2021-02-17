import D from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';

const DeletionForm = ({ onValidate, onCancel }) => {
  return (
    <form>
      <h1>{D.areYouSure}</h1>
      <div className="buttons">
        <button type="button" className="btn btn-primary btn-block" onClick={onValidate}>
          {D.yesButton}
        </button>
        <button type="button" className="btn btn-primary btn-block" onClick={onCancel}>
          {D.noButton}
        </button>
      </div>
    </form>
  );
};

export default DeletionForm;
DeletionForm.propTypes = {
  onValidate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
