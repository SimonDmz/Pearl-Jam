import React, { useState, useEffect, useContext } from 'react';
import imgSync from 'img/sync.png';
import { addOnlineStatusObserver } from 'common-tools/';
import { synchronizeQueen } from 'common-tools/synchronization';
import D from 'i18n';
import { store } from 'common-tools/store';
import Loader from '../loader';

const Synchronize = ({ disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const [init, setInit] = useState(false);
  const [status, setStatus] = useState(navigator.onLine);

  const { dispatch, authInitialized } = useContext(store);

  const handleQueenEvent = event => {
    const { type, command, state } = event.detail;
    if (type === 'QUEEN' && command === 'UPDATE_SYNCHRONIZE') {
      if (state === 'FAILURE') {
        // TODO : message to user
        console.log('Synchronization of queen failed');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!init) {
      addOnlineStatusObserver(s => {
        setStatus(s);
      });
      setInit(true);
    }
  }, [init]);

  useEffect(() => {
    window.addEventListener('QUEEN', handleQueenEvent);
    return () => {
      window.removeEventListener('QUEEN', handleQueenEvent);
    };
  });

  const syncFunction = () => {
    // call common-tools/synchronize function
    setLoading(true);
    synchronizeQueen();
    if (!authInitialized) {
      dispatch({ type: 'initAuth' });
    }
  };

  const syncOnClick = () => {
    if (!loading) {
      syncFunction();
    } else {
      console.log('offline');
    }
  };

  return (
    <>
      {loading && <Loader message={D.synchronizationInProgress} />}

      <div className="sync" disabled={disabled}>
        <img alt="sync-logo" className={loading ? 'rotate' : ''} height="30px" src={imgSync} />
        <button type="button" disabled={disabled} onClick={() => syncOnClick()}>
          {D.synchronizeButton}
        </button>
      </div>
    </>
  );
};

export default Synchronize;
