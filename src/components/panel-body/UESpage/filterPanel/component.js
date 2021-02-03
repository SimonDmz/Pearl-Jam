import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Checkbox from '@material-ui/core/Checkbox';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import toDoEnum from 'common-tools/enum/SUToDoEnum';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const FilterPanel = ({
  searchEchoes,
  campaigns,
  sortCriteria,
  setSortCriteria,
  filters,
  setFilters,
}) => {
  const useStyles = makeStyles(() => ({
    drawer: {
      width: 200,
      flexShrink: 0,
    },
    drawerPaper: {
      top: 20,
      position: 'relative',
    },
    drawerContainer: {
      overflow: 'auto',
      height: '750px',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();

  const [sortCriteriaExpanded, setSortCriteriaExpanded] = useState(true);

  const [campaignFilterExpanded, setCampaignFilterExpanded] = useState(true);

  const [priorityFilterExpanded, setPriorityFilterExpanded] = useState(true);

  const [terminatedFilterExpanded, setTerminatedFilterExpanded] = useState(true);

  const [toDoFilterExpanded, setToDoFilterExpanded] = useState(true);

  const setPriority = value => {
    setFilters({ ...filters, priority: value });
  };

  const setSelectedCampaigns = array => {
    setFilters({ ...filters, campaigns: array });
  };

  const setSelectedTodos = array => {
    setFilters({ ...filters, toDos: array });
  };

  const setTerminated = value => {
    if (value) {
      setFilters({ ...filters, terminated: value, toDos: [toDoEnum.TERMINATED.order.toString()] });
    } else {
      setFilters({ ...filters, terminated: value, toDos: [] });
    }
  };

  const { campaigns: selectedCampaigns, toDos: selectedToDos, priority, terminated } = filters;

  const toggleCampaignSelection = value => {
    if (!selectedCampaigns.includes(value)) {
      setSelectedCampaigns([...selectedCampaigns, value]);
    } else {
      setSelectedCampaigns(selectedCampaigns.filter(c => c !== value));
    }
  };

  const toggleToDoSelection = value => {
    if (!selectedToDos.includes(value)) {
      setSelectedTodos([...selectedToDos, value]);
    } else {
      setSelectedTodos(selectedToDos.filter(c => c !== value));
    }
  };

  const handleChange = panel => (event, isExpanded) => {
    switch (panel) {
      case 'sortAccordion':
        setSortCriteriaExpanded(isExpanded);
        break;
      case 'campaignFilterAccordion':
        setCampaignFilterExpanded(isExpanded);
        break;
      case 'priorityFilterAccordion':
        setPriorityFilterExpanded(isExpanded);
        break;
      case 'terminatedFilterAccordion':
        setTerminatedFilterExpanded(isExpanded);
        break;
      case 'toDoFilterAccordion':
        setToDoFilterExpanded(isExpanded);
        break;
      case 'campaignCheckbox':
        toggleCampaignSelection(event.target.name);
        break;
      case 'toDoCheckbox':
        toggleToDoSelection(event.target.name);
        break;
      case 'priority':
        setPriority(event.target.checked);
        break;
      case 'terminated':
        setTerminated(event.target.checked);
        break;

      default:
        break;
    }
  };

  const changeCriteria = event => {
    const {
      target: { value },
    } = event;
    setSortCriteria(value === sortCriteria ? '' : value);
  };

  const toDoEnumValues = Object.values(toDoEnum)
    .reduce((tab, value) => [...tab, value], [])
    .filter(todo => todo.order < 7);

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>{`${searchEchoes[0]} / ${searchEchoes[1]} unités enquêtées`}</div>
        <div className={classes.drawerContainer}>
          <Accordion expanded={sortCriteriaExpanded} onChange={handleChange('sortAccordion')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="sortAccordion-header"
            >
              <Typography className={classes.heading}>Trier par</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-label="sortCriteriaSelect"
                name="sortCriteriaSelect"
                value={sortCriteria}
              >
                <FormControlLabel
                  value="remainingDays"
                  control={<Radio onClick={changeCriteria} />}
                  label="Jours restants"
                />
                <FormControlLabel
                  value="priority"
                  control={<Radio onClick={changeCriteria} />}
                  label="Priorité"
                />
                <FormControlLabel
                  value="campaign"
                  control={<Radio onClick={changeCriteria} />}
                  label="Enquête"
                />
                <FormControlLabel
                  value="sampleIdentifiers"
                  control={<Radio onClick={changeCriteria} />}
                  label="Sous-échantillon"
                />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={campaignFilterExpanded}
            onChange={handleChange('campaignFilterAccordion')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="campaignFilterAccordion-header"
            >
              <Typography className={classes.heading}>Enquêtes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {campaigns.map(campaign => (
                  <FormControlLabel
                    key={campaign}
                    control={
                      <Checkbox
                        checked={selectedCampaigns.includes(campaign)}
                        onChange={handleChange('campaignCheckbox')}
                        name={campaign}
                      />
                    }
                    label={campaign.toLowerCase()}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={priorityFilterExpanded}
            onChange={handleChange('priorityFilterAccordion')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="priorityFilterAccordion-header"
            >
              <Typography className={classes.heading}>Priorité</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <FormControlLabel
                  key={priority}
                  control={
                    <Checkbox
                      checked={priority}
                      onChange={handleChange('priority')}
                      name="priority"
                    />
                  }
                  label="Oui"
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={toDoFilterExpanded} onChange={handleChange('toDoFilterAccordion')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="toDoFilterAccordion-header"
            >
              <Typography className={classes.heading}>À faire</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {toDoEnumValues.map(todo => (
                  <FormControlLabel
                    key={todo.order}
                    control={
                      <Checkbox
                        checked={selectedToDos.includes(todo.order.toString())}
                        onChange={handleChange('toDoCheckbox')}
                        name={todo.order.toString()}
                      />
                    }
                    label={todo.value}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={terminatedFilterExpanded}
            onChange={handleChange('terminatedFilterAccordion')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="priorityFilterAccordion-header"
            >
              <Typography className={classes.heading}>Terminées</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                <FormControlLabel
                  key={terminated}
                  control={
                    <Checkbox
                      checked={terminated}
                      onChange={handleChange('terminated')}
                      name="terminated"
                    />
                  }
                  label="Oui"
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </div>
      </Drawer>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  searchEchoes: PropTypes.arrayOf(PropTypes.number).isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortCriteria: PropTypes.string.isRequired,
  setSortCriteria: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
    toDos: PropTypes.arrayOf(PropTypes.string).isRequired,
    priority: PropTypes.bool.isRequired,
    terminated: PropTypes.bool.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};
