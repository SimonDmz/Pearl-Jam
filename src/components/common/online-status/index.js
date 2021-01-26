import { makeStyles } from '@material-ui/core/styles';
import WifiIcon from '@material-ui/icons/Wifi';
import { addOnlineStatusObserver } from 'common-tools';
import React, { useEffect, useState } from 'react';

export default () => {
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
  const useStyles = makeStyles(() => ({
    grey: {
      color: 'disabled',
      transform: 'rotate(45deg)',
      fontSize: 'xxx-large',
      marginBottom: '-10px',
      alignSelf: 'center',
    },
    green: {
      color: 'green',
      transform: 'rotate(45deg)',
      fontSize: 'xxx-large',
      marginBottom: '-10px',
      alignSelf: 'center',
    },
  }));

  const classes = useStyles();

  return <WifiIcon className={status === true ? classes.green : classes.grey} />;
};
