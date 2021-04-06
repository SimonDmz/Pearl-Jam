import DateFnsUtils from '@date-io/date-fns';
import { Fab, makeStyles, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import contactAttemptEnum from 'common-tools/enum/ContactAttemptEnum';
import surveyUnitStateEnum from 'common-tools/enum/SUStateEnum';
import { addNewState } from 'common-tools/functions';
import frLocale from 'date-fns/locale/fr';
import D from 'i18n';
import contactAttemptDBService from 'indexedbb/services/contactAttempt-idb-service';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ContactAttemptLine from '../contacts/contactAttempts/contactAttemptLine';
import FormPanel from '../contacts/contactAttempts/formPanel';
import UpDownCounter from '../contacts/contactAttempts/upDownCounter';
import SurveyUnitContext from '../UEContext';

const useStyles = makeStyles(theme => ({
  contactAttempt: {
    textAlign: 'center',
    height: '2em',
    marginBottom: '1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '1em',
    backgroundColor: theme.palette.primary.main,
    marginRight: '1em',
    marginLeft: '1em',
    padding: '1em',
    '&:hover': {
      boxShadow: '0px 0px 0px 1px black',
      cursor: 'pointer',
    },
    whiteSpace: 'nowrap',
  },
  alignEnd: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  selected: { backgroundColor: theme.palette.primary.dark },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 'xxx-large',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: '1.5em',
  },
  xxxLarge: {
    fontSize: 'xxx-large',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  spacing: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

class FrLocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return this.format(date, 'd MMM yyyy', { locale: this.locale });
  }
}

const Form = ({ previousValue, save, deleteAction }) => {
  const surveyUnit = useContext(SurveyUnitContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [contactAttempt, setContactAttempt] = useState(previousValue);
  const [visiblePanel, setVisiblePanel] = useState(undefined);

  const [contactAttempts, setcontactAttempts] = useState([]);
  const [idToDelete, setIdToDelete] = useState(undefined);

  const [selectedDate, handleDateChange] = useState(new Date());

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

  const onChange = newStatus => {
    setContactAttempt({ ...contactAttempt, status: newStatus, date: new Date().getTime() });
  };

  useEffect(() => {
    const checkForm = () => {
      const { status } = contactAttempt;
      const isValid = () =>
        Object.keys(contactAttemptEnum)
          .map(enumKey => contactAttemptEnum[enumKey].type)
          .includes(status);
      if (isValid !== formIsValid) setFormIsValid(isValid);
    };

    if (contactAttempt !== undefined) checkForm();
  }, [contactAttempt, formIsValid]);

  const saveUE = async () => {
    let { id } = contactAttempt;
    const newSu = surveyUnit;
    const { contactAttempts: suContactAttempts } = surveyUnit;

    if (id === undefined) {
      id = await contactAttemptDBService.insert({
        ...contactAttempt,
        date: selectedDate.getTime(),
      });
    } else {
      await contactAttemptDBService.update({ ...contactAttempt, date: selectedDate.getTime() });
    }
    if (!suContactAttempts.includes(id)) {
      suContactAttempts.push(id);
      newSu.contactAttempts = suContactAttempts;
    }

    // lifeCycle update
    await addNewState(surveyUnit, surveyUnitStateEnum.AT_LEAST_ONE_CONTACT.type);
    save(newSu);
  };

  const isSelected = type => contactAttempt && contactAttempt.status === type;

  const selectContactAttemptToDelete = id => {
    setVisiblePanel('DELETION');
    setIdToDelete(id);
  };

  const classes = useStyles();

  const resetForm = value => {
    setVisiblePanel(value);
    setContactAttempt(undefined);
    setFormIsValid(false);
    setIdToDelete(undefined);
  };

  return (
    //* id-trick to allow closing modal if clicking on this transparent div, onClick check the id */
    <div className={classes.spacing} id="dialogRoot">
      <FormPanel title={D.contactAttempts}>
        {Array.isArray(contactAttempts) &&
          contactAttempts.length > 0 &&
          contactAttempts.map(contAtt => {
            const { id } = contAtt;
            const deleteById = () => {
              setContactAttempt(contAtt);
              selectContactAttemptToDelete(id);
            };
            const deleteParams = { deleteIsAvailable: true, deleteFunction: deleteById };
            return (
              <ContactAttemptLine
                contactAttempt={contAtt}
                deleteParams={deleteParams}
                key={id}
                selected={id === idToDelete}
              />
            );
          })}
        <Fab className={classes.alignEnd} aria-label="add" onClick={() => resetForm('EDITION')}>
          <AddIcon fontSize="large" />
        </Fab>
      </FormPanel>
      <FormPanel
        title={D.contactAttempt}
        hidden={visiblePanel !== 'EDITION'}
        backFunction={() => resetForm(undefined)}
      >
        {Object.values(contactAttemptEnum).map(({ value, type }) => (
          <Paper
            key={type}
            name={type}
            value={type}
            className={`${classes.contactAttempt} ${isSelected(type) ? classes.selected : ''}`}
            onClick={() => onChange(type)}
          >
            <Typography>{value}</Typography>
          </Paper>
        ))}
      </FormPanel>

      <FormPanel
        title={D.datePicking}
        hidden={!formIsValid || visiblePanel !== 'EDITION'}
        actionLabel={`✔ ${D.saveButton}`}
        actionFunction={saveUE}
        backFunction={() => resetForm('EDITION')}
      >
        <MuiPickersUtilsProvider utils={FrLocalizedUtils} locale={frLocale}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            variant="static"
            disableToolbar
          />
        </MuiPickersUtilsProvider>
        <div className={classes.row}>
          <UpDownCounter
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            type="hours"
          />
          <Typography className={classes.xxxLarge}>:</Typography>
          <UpDownCounter
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            type="minutes"
          />
        </div>
      </FormPanel>

      <FormPanel
        title={D.contactAttemptDeletion}
        hidden={visiblePanel !== 'DELETION'}
        backFunction={() => resetForm(undefined)}
        actionFunction={() => deleteAction(surveyUnit, idToDelete)}
        actionLabel={D.delete}
      >
        <ContactAttemptLine contactAttempt={contactAttempt} />
      </FormPanel>
    </div>
  );
};

export default Form;
Form.propTypes = {
  save: PropTypes.func.isRequired,
  deleteAction: PropTypes.func,
  previousValue: PropTypes.shape({
    date: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string,
  }),
};
Form.defaultProps = { deleteAction: undefined, previousValue: { date: new Date().getTime() } };
