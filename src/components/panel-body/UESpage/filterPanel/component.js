import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';

const FilterPanel = () => {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      padding: 8,
      '&:last-child': {
        paddingBottom: 8,
      },
      borderRadius: 25,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      padding: 8,
      '&:last-child': {
        paddingBottom: 8,
      },
    },
    middleContent: {
      flex: '1 0 auto',
      padding: 8,
      '&:last-child': {
        paddingBottom: 8,
      },
      paddingRight: 0,
      paddingLeft: 0,
    },
    icon: {
      verticalAlign: 'bottom',
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" noWrap className="name-field">
            toto
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            titi
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" noWrap className="name-field">
            <LocationOnIcon className={`${classes.icon} negativeLeftMargin`} />
            tata
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default FilterPanel;
