import React, { useState, useEffect } from 'react';
import suStateEnum from 'common-tools/enum/SUStateEnum';
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

  const addSu = async () => {
    const su = {
      civility: 'Monsieur',
      lastName: 'MANGIN',
      firstName: 'Jean',
      address: {
        deliveryPoint: '',
        additionalAdress: '',
        number: '1',
        streetType: 'Rue',
        streetName: 'Principale',
        postcode: '54000',
        city: 'Maxéville',
      },
      phone: ['06 95 68 45 95', '03 87 73 22 00'],
      sampleId: Math.floor(Math.random() * 100) + 1,
      collectionStartDate: '2021-06-01',
      collectionEndDate: '2021-06-30',
      priority: true,
      state: suStateEnum.NOT_STARTED.type,
      interviewerComment: '',
      managementComment: 'Beware of the dog.',
      questionnaireState: '',
    };
    // update the store
    const newSU = [
      { id: '11', questionnaire: 'simpsons2020x00', ...su },
      { id: '12', questionnaire: 'simpsons2020x00', ...su },
      { id: '21', questionnaire: 'vqs2021x00', ...su },
      { id: '22', questionnaire: 'vqs2021x00', ...su },
    ];
    await Promise.all(
      newSU.map(async unit => {
        await surveyUnitDBService.addOrUpdate(unit);
      })
    );
    // update the state hook
    surveyUnitDBService.getAll().then(units => {
      setSurveyUnits(units);
    });
  };

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
      <button type="button" onClick={addSu}>
        Add new ue
      </button>
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
