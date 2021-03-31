import { makeStyles } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';

const MaterialIcons = ({ type }) => {
  const useStyles = makeStyles(() => ({
    infoIcon: {
      fontSize: 'xx-large',
      color: 'gray',
      marginTop: '-8px',
    },
  }));

  const classes = useStyles();

  const icons = {
    user: <PersonIcon className={classes.infoIcon} />,
    home: <HomeIcon className={classes.infoIcon} />,
    mail: <AlternateEmailIcon className={classes.infoIcon} />,
    phone: <PhoneIcon className={classes.infoIcon} />,
  };

  return icons[type];
};
export default MaterialIcons;
