import { makeStyles, Paper, Typography } from '@material-ui/core';
import formEnum from 'common-tools/enum/formEnum';
import D from 'i18n';
import contactAttemptDBService from 'indexedbb/services/contactAttempt-idb-service';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import SurveyUnitContext from '../../UEContext';
import ContactAttemptLine from './contactAttemptLine';

const useStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    marginRight: '1em',
    marginTop: '1em',
    padding: '1em',
    boxShadow: 'unset',
    border: 'LightGray solid 1px',
    borderRadius: '15px',
    minWidth: '300px',
    minHeight: '200px',
  },
}));

const ContactAttempts = ({ selectFormType, setInjectableData }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const [contactAttempts, setcontactAttempts] = useState([]);

  useEffect(() => {
    const getContactAttempts = async ids => {
      if (ids === undefined || ids.length === 0) return [];
      const cat = await contactAttemptDBService.findByIds(ids);
      cat.sort((a, b) => b.date - a.date);
      return cat;
    };

    if (surveyUnit !== undefined) {
      const contactAttemptsId = surveyUnit.contactAttempts;
      getContactAttempts(contactAttemptsId).then(cA => setcontactAttempts(cA));
    }
  }, [surveyUnit]);

  const classes = useStyles();

  return (
    <Paper
      className={classes.column}
      onClick={() => {
        selectFormType(formEnum.CONTACT_ATTEMPT, false);
        setInjectableData({ status: 'NOC', date: new Date().getTime() });
      }}
    >
      <Typography variant="h6">{D.contactAttempts}</Typography>
      {Array.isArray(contactAttempts) &&
        contactAttempts.length > 0 &&
        contactAttempts.map(contAtt => (
          <ContactAttemptLine contactAttempt={contAtt} key={contAtt.id} />
        ))}
    </Paper>
  );
};

export default ContactAttempts;
ContactAttempts.propTypes = {
  selectFormType: PropTypes.func.isRequired,
  setInjectableData: PropTypes.func.isRequired,
};
