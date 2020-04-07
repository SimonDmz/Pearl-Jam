import React, { useState, useEffect } from 'react';
import suStateEnum from 'common-tools/enum/SUStateEnum';
import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import PageList from './pageList';

const UESPage = () => {
  const [surveyUnits, setSurveyUnits] = useState([]);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init, surveyUnits]);

  useEffect(() => {
    if (!init) {
      surveyUnitDBService.getAll().then(units => {
        setSurveyUnits(units);
      });
    }
  }, [init, surveyUnits]);

  const addSu = () => {
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
      questionnaire: 'vqs',
      state: suStateEnum.NOT_STARTED.type,
      interviewerComment: '',
      demComment: 'Attention au chien.',
      questionnaireState: '',
    };
    // update the store
    surveyUnitDBService.insert(su);
    // update the state hook
    surveyUnitDBService.getAll().then(units => {
      setSurveyUnits(units);
    });
  };

  return (
    <div className="panel-body ues">
      <PageList surveyUnits={surveyUnits} />
      <button type="button" onClick={addSu}>
        Add new ue
      </button>
    </div>
  );
};

export default UESPage;
