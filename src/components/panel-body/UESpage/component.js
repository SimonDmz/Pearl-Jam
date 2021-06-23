import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getConfiguration } from 'common-tools/api/utils';
import {
  applyFilters,
  sortOnColumnCompareFunction,
  updateStateWithDates,
} from 'common-tools/functions';
import useMessageService from 'common-tools/useMessageService';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FilterPanel from './filterPanel';
import SurveyUnitCard from './material/surveyUnitCard';

const UESPage = ({ textSearch }) => {
  const [surveyUnits, setSurveyUnits] = useState([]);
  const [filteredSurveyUnits, setFilteredSurveyUnits] = useState([]);
  const [searchEchoes, setSearchEchoes] = useState([0, 0]);
  const [campaigns, setCampaigns] = useState([]);
  const [init, setInit] = useState(false);
  const [reset, setReset] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('remainingDays');
  const [filters, setFilters] = useState({
    search: textSearch,
    campaigns: [],
    toDos: [],
    priority: false,
    terminated: false,
  });
  const [messages, setMessages] = useState([]);

  const [pearlApiUrl, setPearlApiUrl] = useState();
  const [authMode, setAuthMode] = useState();
  // const [fetchMessages, setFetchMessages] = useState();

  useEffect(() => {
    const getConf = async () => {
      const { PEARL_API_URL, PEARL_AUTHENTICATION_MODE } = await getConfiguration();
      setPearlApiUrl(PEARL_API_URL);
      setAuthMode(PEARL_AUTHENTICATION_MODE);
      console.log('⚙️Configuration loaded : ', PEARL_API_URL, ' - ', PEARL_AUTHENTICATION_MODE);
    };
    getConf();
  }, []);

  const { fetchMessages } = useMessageService(
    (data => {
      setMessages(data);
    },
    pearlApiUrl,
    authMode)
  );

  useEffect(() => {
    if (!init) {
      setInit(true);
      surveyUnitDBService.getAll().then(units => {
        const initializedSU = units.map(su => ({ ...su, selected: false }));
        setCampaigns([...new Set(units.map(unit => unit.campaign))]);
        setSurveyUnits(initializedSU);
        setSearchEchoes([initializedSU.length, initializedSU.length]);
      });
    }
  }, [init]);

  useEffect(() => {
    setFilters(f => ({ ...f, search: textSearch }));
  }, [textSearch]);

  useEffect(() => {
    surveyUnitDBService.getAll().then(units => {
      const updateNb = units.map(su => updateStateWithDates(su)).reduce((a, b) => a + b, 0);
      if (updateNb > 0) setInit(false);
    });
  }, [surveyUnits]);

  useEffect(() => {
    const sortSU = su => su.sort(sortOnColumnCompareFunction(sortCriteria));
    const filteredSU = applyFilters(surveyUnits, filters);

    const { searchFilteredSU, totalEchoes, matchingEchoes } = filteredSU;
    setFilteredSurveyUnits(sortSU(searchFilteredSU));
    setSearchEchoes([matchingEchoes, totalEchoes]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [textSearch, filters, sortCriteria, surveyUnits]);

  useEffect(() => {
    const fetch = () => {
      fetchMessages(data => {
        setMessages(data);
      });
    };

    if (fetchMessages) fetch();
  }, [fetchMessages]);

  const useStyles = makeStyles(() => ({
    root: {
      height: 'calc(100vh - 5em)',
      scrollbarWidth: 'none',
    },
    grid: {
      height: '100%',
      width: 'calc(100vw - 200px)',
      overflow: 'auto',
      scrollbarWidth: 'none',
      padding: 10,
      '&:last-child': {
        paddingBottom: 0,
      },
      paddingTop: 0,
      alignContent: 'flex-start',
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div>{`Api URL : ${pearlApiUrl}`}</div>
      <div>{`Authentication mode : ${authMode}`}</div>
      <div>{`Messages : ${messages.length}`}</div>
      <button onClick={() => setReset(prv => !prv)}>Click me {reset}</button>
      <Grid container className={classes.root} spacing={0}>
        <FilterPanel
          searchEchoes={searchEchoes}
          campaigns={campaigns}
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
          filters={filters}
          setFilters={setFilters}
        />
        <Grid container className={classes.grid} spacing={4}>
          {filteredSurveyUnits.map(su => (
            <Grid key={su.id} item>
              <SurveyUnitCard surveyUnit={su} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default UESPage;
UESPage.propTypes = {
  textSearch: PropTypes.string.isRequired,
};
