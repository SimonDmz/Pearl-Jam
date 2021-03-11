import { Card, CardMedia } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { PEARL_USER_KEY } from 'common-tools/constants';
import Synchronize from 'components/common/synchronize';
import InfoTile from 'components/panel-body/UEpage/infoTile';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import OnlineStatus from '../online-status';
import SearchBar from '../search/component';

const Navigation = ({ location, textSearch, setTextSearch, version }) => {
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
      backgroundColor: theme.palette.primary.main,
      height: '5em',
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
      flex: '1 1 auto',
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      verticalAlign: 'middle',
      [theme.breakpoints.up('sm')]: {
        display: 'inline-block',
      },
      color: 'black',
    },
    search: {
      position: 'relative',
      marginLeft: 0,
      height: '2em',
    },
    searchButton: {
      color: theme.palette.getContrastText(grey[700]),
      backgroundColor: theme.palette.secondary.main,
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
      backgroundColor: theme.palette.primary.main,
      border: 'solid 1px black',
      color: 'black',
      transition: theme.transitions.create('width'),
      marginRight: '1em',
    },
    notificationsIcon: {
      fontSize: 'xxx-large',
      color: theme.palette.secondary.main,
      '&:hover': { color: theme.palette.secondary.dark },
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
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Toolbar className={classes.appBar}>
            <NavLink activeClassName="active" exact to="/notifications">
              <Tooltip title={`Version : ${version}`}>
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
              </Tooltip>
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
              <Route
                exact
                path="/"
                render={routeProps => (
                  <SearchBar
                    {...routeProps}
                    textSearch={textSearch}
                    setTextSearch={setTextSearch}
                  />
                )}
              />
              <Route path="/survey-unit/:id" render={routeProps => <InfoTile {...routeProps} />} />
            </div>
            <div className={classes.column}>
              <OnlineStatus />
              <Typography className={classes.title} variant="subtitle1" noWrap>
                {getName()}
              </Typography>
            </div>
            <Synchronize disabled={disabled} materialClass={classes.syncIcon} />
          </Toolbar>
        </AppBar>
      </>
    </>
  );
};

export default Navigation;
Navigation.propTypes = {
  location: PropTypes.shape({}).isRequired,
  textSearch: PropTypes.string.isRequired,
  setTextSearch: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};
