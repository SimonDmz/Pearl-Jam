import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  applyFilters,
  sortOnColumnCompareFunction,
  updateStateWithDates,
} from 'common-tools/functions';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import React, { useEffect, useState } from 'react';
import FilterPanel from './filterPanel';
import SurveyUnitCard from './material/surveyUnitCard';
import './ues.scss';

const UESPage = ({ textSearch }) => {
  const [surveyUnits, setSurveyUnits] = useState([]);
  const [filteredSurveyUnits, setFilteredSurveyUnits] = useState([]);
  const [searchEchoes, setSearchEchoes] = useState([0, 0]);
  const [campaigns, setCampaigns] = useState([]);
  const [init, setInit] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('remainingDays');
  const [filters, setFilters] = useState({
    search: textSearch,
    campaigns: [],
    toDos: [],
    priority: false,
    terminated: false,
  });

  useEffect(() => {
    if (!init) {
      setInit(true);
      surveyUnitDBService.getAll().then(units => {
        const initializedSU = units.map(su => {
          return { ...su, selected: false };
        });
        setCampaigns([...new Set(units.map(unit => unit.campaign))]);
        setSurveyUnits(initializedSU);
        setSearchEchoes([initializedSU.length, initializedSU.length]);
      });
    }
  }, [init]);

  useEffect(() => {
    surveyUnitDBService.getAll().then(units => {
      const updateNb = units
        .map(su => {
          return updateStateWithDates(su);
        })
        .reduce((a, b) => a + b, 0);
      if (updateNb > 0) setInit(false);
    });
  }, [surveyUnits]);

  useEffect(() => {
    const sortSU = su => {
      return su.sort(sortOnColumnCompareFunction(sortCriteria));
    };

    const filteredSU = applyFilters(surveyUnits, filters);

    const { searchFilteredSU, totalEchoes, matchingEchoes } = filteredSU;
    setFilteredSurveyUnits(sortSU(searchFilteredSU));
    setSearchEchoes([matchingEchoes, totalEchoes]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [filters, sortCriteria, surveyUnits]);

  const isSelectable = su => {
    const { identificationPhaseStartDate, endDate } = su;
    const endTime = new Date(endDate).getTime();
    const identificationPhaseStartTime = new Date(identificationPhaseStartDate).getTime();
    const instantTime = new Date().getTime();
    return endTime > instantTime && instantTime > identificationPhaseStartTime;
  };

  const classes = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      padding: 8,
      '&:last-child': {
        paddingBottom: 8,
      },
    },
    stuck: {
      position: 'sticky',
      top: '0px',
      zIndex: 8,
    },
    paper: {
      height: 140,
      width: 375,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  return (
    <>
      <Grid container spaceing={2} style={{ position: 'sticky', top: '0px' }}>
        <Grid item xs={2}>
          <FilterPanel
            searchEchoes={searchEchoes}
            campaigns={campaigns}
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            filters={filters}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container className={classes.root} spacing={2}>
            {filteredSurveyUnits.map(su => (
              <Grid key={su.id} item className="SUCard">
                <SurveyUnitCard className={classes.paper} surveyUnit={su} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UESPage;
