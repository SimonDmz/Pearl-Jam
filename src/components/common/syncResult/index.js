import React from 'react';
import D from 'i18n';
import './result.scss';

const Result = ({ messageResult, close }) => (
  <>
    <div className="sync-container" onClick={close} />

    <div className="sync-result" onClick={() => console.log('')}>
      <h2>{D.syncResult}</h2>
      <p>{messageResult}</p>
      <button type="button" onClick={close} autoFocus>
        {D.closeButton}
      </button>
    </div>
  </>
);

export default Result;
