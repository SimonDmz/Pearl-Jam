import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { intervalInDays } from 'common-tools/functions';
import { convertSUStateInToDo } from 'common-tools/functions/convertSUStateInToDo';
import { isSelectable } from 'common-tools/functions/surveyUnitFunctions';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './surveyUnitCard.scss';

const SurveyUnitCard = ({ surveyUnit, className }) => {
  const useStyles = makeStyles(() => ({
    root: {
      padding: 8,
      borderRadius: 15,
      '&:hover': { cursor: 'pointer' },
      paddingTop: 10,
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    justifyStart: {
      justifyContent: 'flex-start',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    content: {
      flex: '1 0 auto',
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },

    icon: {
      verticalAlign: 'bottom',
    },
    active: {
      backgroundColor: 'grey',
      '&:hover': { cursor: 'not-allowed' },
    },
    paddingTop: {
      paddingTop: '10px',
      fontSize: 'xxx-large',
    },
    fixedWidth: {
      width: '120px',
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  const active = isSelectable(surveyUnit);

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
    <Card
      className={`${className} ${classes.root} ${classes.flexColumn} ${
        active ? '' : classes.active
      }`}
      onClick={() => (active ? history.push(`/survey-unit/${id}/details`) : {})}
    >
      <CardContent className={`${classes.content} ${classes.flexRow}`}>
        <Typography component="h5" variant="h5" className={`${visibility} centered`}>
          !
        </Typography>
        <Typography component="h6" variant="h6" noWrap className="name-field centered">
          {campaign.toLowerCase()}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="rounded centered">
          {ssech}
        </Typography>
      </CardContent>
      <CardContent className={`${classes.content} ${classes.flexRow}  ${classes.justifyStart}`}>
        <PersonIcon className={`${classes.icon} ${classes.paddingTop}`} />
        <div className={classes.flexColumn}>
          <Typography component="h6" variant="h6" noWrap>
            {firstName}
          </Typography>
          <Typography component="h6" variant="h6" noWrap>
            {lastName}
          </Typography>
        </div>
      </CardContent>
      <CardContent className={`${classes.content} ${classes.flexRow}`}>
        <Typography variant="subtitle1" color="textSecondary" noWrap className="name-field">
          <LocationOnIcon className={`${classes.icon} negativeLeftMargin`} />
          {`${l6}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <CheckCircleOutlineOutlinedIcon className={`${classes.icon} green`} />
          {lastState}
        </Typography>
      </CardContent>
      <CardContent className={`${classes.content} ${classes.flexRow}`}>
        <Typography variant="subtitle1" color="textSecondary">
          {` # ${id}`}
        </Typography>
        <div className={`${classes.flexRow}`}>
          <ScheduleIcon className={classes.icon} />

          <Typography variant="subtitle1" color="textSecondary">
            {`  ${nbJoursRestant} jours`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyUnitCard;
SurveyUnitCard.propTypes = {
  surveyUnit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.shape({ l6: PropTypes.string.isRequired }).isRequired,
    campaign: PropTypes.string.isRequired,
    states: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired })).isRequired,
    sampleIdentifiers: PropTypes.shape({ ssech: PropTypes.number.isRequired }).isRequired,
    priority: PropTypes.bool.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
};
