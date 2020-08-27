import React, { useEffect, useState } from 'react';
import { addOnlineStatusObserver } from 'common-tools';
import D from 'i18n';
import Online from './online.icon';
import Offline from './offine.icon';

export default ({ width = 18, height = 18 }) => {
  const [init, setInit] = useState(false);
  const [status, setStatus] = useState(navigator.onLine);
  useEffect(() => {
    if (!init) {
      addOnlineStatusObserver(s => {
        setStatus(s);
      });
      setInit(true);
    }
  }, [init]);

  return (
    <div className="connexion">
      {status && (
        <>
          <Online width={width} height={height} />
          <span className="online">{` ${D.connexionOK}`}</span>
        </>
      )}
      {!status && (
        <>
          <Offline width={width} height={height} />
          <span className="offline">{` ${D.connexionKO}`}</span>
        </>
      )}
    </div>
  );
};
