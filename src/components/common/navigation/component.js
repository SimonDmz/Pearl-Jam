import { Card, CardMedia } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { PEARL_USER_KEY } from 'common-tools/constants';
import Synchronize from 'components/common/synchronize';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OnlineStatus from '../online-status';

const Navigation = ({ location }) => {
  const [disabled, setDisable] = useState(location.pathname.startsWith('/queen'));

  useEffect(() => {
    setDisable(location.pathname.startsWith('/queen'));
  }, [location]);

  const getName = () => {
    const interviewerFromLocalStorage = window.localStorage.getItem(PEARL_USER_KEY);
    return interviewerFromLocalStorage
      ? `${JSON.parse(interviewerFromLocalStorage).firstName} ${
          JSON.parse(interviewerFromLocalStorage).lastName
        }`
      : '';
  };

  const useStyles = makeStyles(theme => ({
    appBar: {
      backgroundColor: 'black',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
    },
    card: {
      borderRadius: 0,
    },
    media: {
      height: '3em',
      width: '3em',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      verticalAlign: 'middle',
      [theme.breakpoints.up('sm')]: {
        display: 'inline-block',
      },
    },
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      height: '2em',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '75%',
      },
    },
    searchButton: {
      color: theme.palette.getContrastText(grey[700]),
      backgroundColor: grey[700],
      '&:hover': {
        backgroundColor: grey[800],
      },
      lineHeight: 'unset',
      borderRadius: 0,
    },
    inputRoot: {
      color: 'inherit',
      height: '2em',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `1em`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    notificationsIcon: {
      fontSize: 'xxx-large',
      color: 'white',
    },
    syncIcon: {
      fontSize: 'xxx-large',
      color: '#3f51b5',
      alignSelf: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <>
        <div className={classes.grow}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <NavLink activeClassName="active" exact to="/notifications">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open notifications"
                >
                  <Badge badgeContent={4} color="secondary">
                    <MenuIcon className={classes.notificationsIcon} />
                  </Badge>
                </IconButton>
              </NavLink>
              <NavLink activeClassName="active" exact to="/">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/logo-insee-header.png"
                    title="Insee"
                  />
                </Card>
              </NavLink>

              <div className={classes.grow}>
                <InputBase
                  className={classes.search}
                  placeholder="Nom, prénom, enquête, ..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Button size="large" className={classes.searchButton}>
                  Rechercher
                </Button>
              </div>
              <div className={classes.sectionDesktop}>
                <div className={classes.column}>
                  <OnlineStatus />
                  <Typography className={classes.title} variant="subtitle1" noWrap>
                    {getName()}
                  </Typography>
                </div>
                <Synchronize disabled={disabled} materialClass={classes.syncIcon} />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </>

      {/* <nav className="nav-bar" disabled={disabled}>
        <div className="items">
          <NavigationItem disabled={false} path="/" label={D.goToHomePage} />
          <NavigationItem
            disabled={disabled}
            notif={5}
            path="/notifications"
            label={D.goToNotificationsPage}
          />
          <NavigationItem disabled={disabled} path="/training" label={D.goToTrainingPage} />
        </div>

        <div className="top-right">
          <Synchronize disabled={disabled} />
        </div>
      </nav> */}
    </>
  );
};

export default Navigation;
