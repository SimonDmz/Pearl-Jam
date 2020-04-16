import React, { useState } from 'react';
import listenQueen from 'common-tools/hooks/listenQueen';
import { useHistory } from 'react-router-dom';

const QueenContainer = () => {
  const history = useHistory();

  listenQueen(history);

  return (
    <div className="queen-app">
      <queen-app />
    </div>
  );
};

export default QueenContainer;
