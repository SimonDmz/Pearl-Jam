import React from 'react';
import listenQueen from 'common-tools/hooks/listenQueen';
import { useHistory } from 'react-router-dom';
import D from 'i18n';

const QueenContainer = () => {
  const history = useHistory();

  listenQueen(history);
  const suId = history.location.pathname.split('/').pop();

  function mockQueen() {
    const queenEvent = new CustomEvent('queen', {
      detail: { returnedCode: 'completed', suId },
    });
    window.dispatchEvent(queenEvent);
  }

  return (
    <div className="queen-app">
      <h2>QueenContainer</h2>
      {/* <queen-app /> */}
      <div>{D.queenMockCompleted}</div>
      <button type="button" onClick={mockQueen}>
        {D.validateButton}
      </button>
    </div>
  );
};

export default QueenContainer;
