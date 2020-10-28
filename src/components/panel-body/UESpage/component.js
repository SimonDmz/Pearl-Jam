import React, { useState, useEffect } from 'react';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import D from 'i18n';
import Modal from 'react-modal';
import suStateEnum from 'common-tools/enum/SUStateEnum';
import {
  isValidForTransmission,
  addNewState,
  sortOnColumnCompareFunction,
  convertSUStateInToDo,
  getLastState,
  updateStateWithDates,
} from 'common-tools/functions';
import Form from './transmitForm';
import PageList from './pageList';
import Search from './search';
import './ues.scss';

const UESPage = () => {
  const [surveyUnits, setSurveyUnits] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchEchoes, setSearchEchoes] = useState([0, 0]);
  const [init, setInit] = useState(false);
  const [showTransmitSummary, setShowTransmitSummary] = useState(false);
  const [transmitSummary, setTransmitSummary] = useState({ ok: 0, ko: 0 });
  const [columnFilter, setColumnFilter] = useState(undefined);

  useEffect(() => {
    if (!init) {
      setInit(true);
      surveyUnitDBService.getAll().then(units => {
        const initializedSU = units.map(su => {
          return { ...su, selected: false };
        });
        setSurveyUnits(initializedSU);
        setSearchEchoes([initializedSU.length, initializedSU.length]);
      });
    }
  }, [init, surveyUnits]);

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
      return su.sort(sortOnColumnCompareFunction(columnFilter));
    };

    const suPromise = surveyUnitDBService.getAll();
    let totalEchoes = 0;
    let matchingEchoes = totalEchoes;

    if (filter === '') {
      suPromise.then(units => {
        setSurveyUnits(sortSU(units));
        totalEchoes = units.length;
        matchingEchoes = units.length;
        setSearchEchoes([matchingEchoes, totalEchoes]);
      });
    } else {
      suPromise
        .then(us => {
          totalEchoes = us.length;
          return us;
        })
        .then(units => {
          const filteredSU = units.filter(unit => {
            const filterCondition =
              unit.firstName.toLowerCase().includes(filter) ||
              unit.lastName.toLowerCase().includes(filter) ||
              unit.id
                .toString()
                .toLowerCase()
                .includes(filter) ||
              unit.address.l6
                .split(' ')
                .slice(1)
                .toString()
                .toLowerCase()
                .includes(filter) ||
              convertSUStateInToDo(getLastState(unit).type)
                .value.toLowerCase()
                .includes(filter) ||
              unit.campaign.toLowerCase().includes(filter);
            return filterCondition;
          });
          matchingEchoes = filteredSU.length;
          setSurveyUnits(sortSU(filteredSU));
          setSearchEchoes([matchingEchoes, totalEchoes]);
        });
    }
  }, [filter, columnFilter]);

  const isSelectable = su => {
    const { identificationPhaseStartDate, endDate } = su;
    const endTime = new Date(endDate).getTime();
    const identificationPhaseStartTime = new Date(identificationPhaseStartDate).getTime();
    const instantTime = new Date().getTime();
    return endTime > instantTime > identificationPhaseStartTime;
  };

  const sortOnColumn = column => {
    if (columnFilter === undefined || columnFilter.column !== column) {
      setColumnFilter({ column, order: 'ASC' });
    } else if (columnFilter.order === 'ASC') {
      setColumnFilter({ column, order: 'DESC' });
    } else {
      setColumnFilter(undefined);
    }
  };

  const toggleAllSUSelection = newValue => {
    setSurveyUnits(
      surveyUnits.map(su => {
        const selectable = isSelectable(su);
        return { ...su, selected: selectable ? newValue : false };
      })
    );
  };

  const toggleOneSUSelection = (id, newValue) => {
    setSurveyUnits(
      surveyUnits.map(su => {
        if (su.id === id) {
          return { ...su, selected: newValue };
        }
        return su;
      })
    );
  };

  const processSU = async surveyUnitsToProcess => {
    const newType = suStateEnum.WAITING_FOR_SYNCHRONIZATION.type;
    let nbOk = 0;
    let nbKo = 0;

    surveyUnitsToProcess.forEach(su => {
      if (su.valid) {
        addNewState(su, newType);
        nbOk += 1;
      } else {
        nbKo += 1;
      }
    });

    setSurveyUnits(await surveyUnitDBService.getAll());
    setTransmitSummary({ ok: nbOk, ko: nbKo });
  };

  const transmit = async () => {
    const filteredSU = surveyUnits
      .filter(su => su.selected)
      .map(su => {
        return { ...su, valid: isValidForTransmission(su) };
      });
    await processSU(filteredSU);
    setShowTransmitSummary(true);
    setInit(false);
  };

  const closeModal = () => {
    setShowTransmitSummary(false);
  };

  const anySuSelected = surveyUnits.filter(su => su.selected).length > 0 ? '' : '"disabled"';

  const updateFilter = searchedString => {
    toggleAllSUSelection(false);
    setFilter(searchedString);
  };

  const transmitButton = () => {
    return (
      <button type="button" className="transmit" disabled={anySuSelected} onClick={transmit}>
        <i className="fa fa-paper-plane" aria-hidden="true" />
        &nbsp;Transmettre
      </button>
    );
  };

  return (
    <div className="panel-body ues">
      <div className="column">
        <div className="filters">
          <div className="button-ue">
            <button
              id="ShowAll"
              type="button"
              onClick={() => {
                updateFilter('');
                setColumnFilter(undefined);
              }}
            >
              <i className="fa fa-bars" aria-hidden="true" />
              &nbsp;
              {D.showAll}
            </button>
            {filter && <div className="searchedString">{`${D.activeFilter} : ${filter}`}</div>}
            <Search setFilter={updateFilter} />
          </div>
        </div>
        <div className="searchResults">{`Résultat : ${searchEchoes[0]} / ${searchEchoes[1]} unités`}</div>
      </div>
      <PageList
        surveyUnits={surveyUnits}
        toggleAllSUSelection={toggleAllSUSelection}
        toggleOneSUSelection={toggleOneSUSelection}
        transmitButton={transmitButton}
        sortOnColumn={sortOnColumn}
        columnFilter={columnFilter}
      />

      <Modal isOpen={showTransmitSummary} onRequestClose={closeModal} className="modal">
        <Form closeModal={closeModal} summary={transmitSummary} />
      </Modal>
    </div>
  );
};

export default UESPage;
