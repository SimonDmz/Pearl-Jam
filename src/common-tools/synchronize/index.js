import surveyUnitDBService from 'indexedbb/services/surveyUnit-idb-service';
import * as api from 'common-tools/api';

const synchronizeQueen = () => {
  const data = { type: 'PEARL', command: 'SYNCHRONIZE' };
  const event = new CustomEvent('PEARL', { detail: data });
  window.dispatchEvent(event);
};

const getConfiguration = async () => {
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  const response = await fetch(`${publicUrl.origin}/configuration.json`);
  const configuration = await response.json();
  return configuration;
};

const sendData = async (urlPearlApi, token) => {
  const surveyUnits = await surveyUnitDBService.getAll();
  await Promise.all(
    surveyUnits.map(async surveyUnit => {
      const { id } = surveyUnit;
      console.log('put SU id=', id);
      await api.putDataSurveyUnitById(urlPearlApi, token)(id, surveyUnit);
    })
  );
};

const putSurveyUnitsInDataBase = async su => {
  await surveyUnitDBService.addOrUpdate(su);
};

const clean = async () => {
  await surveyUnitDBService.deleteAll();
};

const validateSU = su => {
  const { states, comments } = su;
  if (Array.isArray(states) && states.length === 0) {
    const instantTime = new Date().getTime();
    su.states.push({ date: instantTime, type: 'NOT_STARTED' });
  }
  if (Array.isArray(comments) && comments.length === 0) {
    const interviewerComment = { type: 'interviewerComment', value: '' };
    const managementComment = { type: 'managementComment', value: '' };
    su.comments.push(interviewerComment);
    su.comments.push(managementComment);
  }
  return su;
};

const synchronizePearl = async () => {
  // (0) : get configuration
  const { urlPearlApi, authenticationMode } = await getConfiguration();
  let token = null;

  // (1) : authentication
  if (authenticationMode === 'keycloak') {
    token = undefined; // TODO get new keycloak token;
  }

  // (2) : send the local data to server
  await sendData(urlPearlApi, token);

  // (3) : clean
  await clean();
  console.log('clean done');
  // (4) : Get the data
  const surveyUnitsResponse = await api.getSurveyUnits(urlPearlApi, token);
  console.log(surveyUnitsResponse, '!');
  const surveyUnits = await surveyUnitsResponse;
  console.log(surveyUnits, '!!');

  await Promise.all(
    surveyUnits.map(async su => {
      const surveyUnitResponse = await api.getSurveyUnitById(urlPearlApi, token)(su.id);
      const surveyUnit = await surveyUnitResponse.data;
      const mergedSurveyUnit = { ...surveyUnit, ...su };
      const validSurveynit = validateSU(mergedSurveyUnit);
      await putSurveyUnitsInDataBase(validSurveynit);
    })
  );
};

export const synchronize = async () => {
  synchronizeQueen();
  synchronizePearl();

  // TODO : pearl synch
};
