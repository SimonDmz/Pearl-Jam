import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { intervalInDays } from 'common-tools/functions';
import { convertSUStateInToDo } from 'common-tools/functions/convertSUStateInToDo';
import React from 'react';
import './surveyUnitCard.scss';

const SurveyUnitCard = ({ surveyUnit }) => {
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

  const {
    id,
    firstName,
    lastName,
    address: { l6 },
    campaign,
    sampleIdentifiers: { ssech },
    states,
    priority,
  } = surveyUnit;

  const lastState = convertSUStateInToDo(states[states.length - 1].type).value;
  const nbJoursRestant = intervalInDays(surveyUnit);
  const visibility = priority === true ? '' : 'hidden';

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" noWrap className="name-field">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {` # ${id}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" noWrap className="name-field">
            <LocationOnIcon className={`${classes.icon} negativeLeftMargin`} />
            {`${l6}`}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.middleContent}>
          <Typography component="h5" variant="h5" className={`${visibility} centered`}>
            !
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className="rounded centered">
            {ssech}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" noWrap className="name-field centered">
            {campaign}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className="leftPadding">
            <CheckCircleOutlineOutlinedIcon className={`${classes.icon} green`} />
            {lastState}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className="leftPadding">
            <ScheduleIcon className={classes.icon} />
            {`  ${nbJoursRestant} jours`}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default SurveyUnitCard;
