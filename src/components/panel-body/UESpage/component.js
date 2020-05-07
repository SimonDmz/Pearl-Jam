import React, { useState, useEffect } from 'react';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import D from 'i18n';
import PageList from './pageList';
import Search from './search';
import './ues.scss';

const UESPage = () => {
  const [surveyUnits, setSurveyUnits] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchEchoes, setSearchEchoes] = useState([0, 0]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
      surveyUnitDBService.getAll().then(units => {
        setSurveyUnits(units);
        setSearchEchoes([units.length, units.length]);
      });
    }
  }, [init, surveyUnits]);

  useEffect(() => {
    const suPromise = surveyUnitDBService.getAll();
    let totalEchoes = 0;
    let matchingEchoes = totalEchoes;

    if (filter === '') {
      suPromise.then(units => {
        setSurveyUnits(units);
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
                .includes(filter);
            return filterCondition;
          });
          matchingEchoes = filteredSU.length;
          setSurveyUnits(filteredSU);
          setSearchEchoes([matchingEchoes, totalEchoes]);
        });
    }
  }, [filter]);

  return (
    <div className="panel-body ues">
      <div className="column">
        <div className="filters">
          <div className="button-ue">
            <button type="button" onClick={() => setFilter('')}>
              {D.showAll}
            </button>
            {filter && <div className="searchedString">{`${D.activeFilter} : ${filter}`}</div>}
            <Search setFilter={setFilter} />
          </div>
        </div>
        <div className="searchResults">{`Résultat : ${searchEchoes[0]} / ${searchEchoes[1]} unités`}</div>
      </div>
      <PageList surveyUnits={surveyUnits} />
      <button
        type="button"
        onClick={() => {
          console.log('transmit');
        }}
      >
        Transmettre
      </button>
    </div>
  );
};

export default UESPage;
