import React, { useState, useEffect, useContext } from 'react';
import imgSync from 'img/sync.png';
import { addOnlineStatusObserver } from 'common-tools/';
import D from 'i18n';
import { store } from 'common-tools/store';

const Synchronize = ({ disabled = false }) => {
  const [sync, setSync] = useState(false);
  const [init, setInit] = useState(false);
  const [status, setStatus] = useState(navigator.onLine);
  const { dispatch, authInitialized } = useContext(store);

  useEffect(() => {
    if (!init) {
      addOnlineStatusObserver(s => {
        setStatus(s);
      });
      setInit(true);
    }
  }, [init]);

  const syncFunction = () => {
    // call common-tools/synchronize function
    setSync(true);
    console.log("Let's go");
    setTimeout(() => setSync(false), 2000);
  };

  const syncOnClick = () => {
    if (!sync) {
      if (status) {
        if (authInitialized) {
          // Token valid;
          syncFunction();
        } else {
          console.log('update token');
          // Token invalid;
          // update token
          dispatch({ type: 'initAuth' });
        }
      } else {
        console.log('offline');
      }
    }
  };

  return (
    <>
      <div className="sync" disabled={disabled}>
        <img alt="sync-logo" className={sync ? 'rotate' : ''} height="30px" src={imgSync} />
        <button type="button" disabled={disabled} onClick={() => syncOnClick()}>
          {D.synchronizeButton}
        </button>
      </div>
    </>
  );
};

export default Synchronize;
