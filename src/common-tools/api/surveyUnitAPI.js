import { fakeGetSurveyUnits, fakeGetSurveyUnitById } from '../fake-survey-units/fakeData';

export const getSurveyUnits = (urlPearApi, token) => {
  const data = fakeGetSurveyUnits;
  return new Promise((resolve, reject) => {
    /* Axios.get(`${urlPearApi}/api/survey-unit`, {
          headers: {
              ...getSecureHeader(token),
              Accept: 'application/json;charset=utf-8',
            },
        })
        .then(res => resolve(res))
        .catch(e => reject(new Error(`Failed to fetch survey-units : ${e.message}`))); */
    // get data from fake-data.json
    resolve({ data });
  });
};

export const getSurveyUnitById = (urlPearApi, token) => id => {
  const data = fakeGetSurveyUnitById(id);
  console.log('data ', data);
  return new Promise((resolve, reject) => {
    /* Axios.get(`${urlPearApi}/api/survey-unit/${id}`, {
        headers: {
          ...getSecureHeader(token),
          Accept: 'application/json;charset=utf-8',
        },
      })
        .then(res => resolve(res))
        .catch(e => reject(new Error(`Failed to get survey-unit (id:${id}) : ${e.message}`))); */
    resolve({ data });
  });
};

export const putDataSurveyUnitById = (urlPearApi, token) => (id, su) => {
  console.log(`PUT survey-unit #${id} : ${su}`);

  return new Promise((resolve, reject) => {
    /* Axios.put(`${urlPearApi}/api/survey-unit/${id}`, su, {
      headers: {
        ...getSecureHeader(token),
        Accept: 'application/json;charset=utf-8',
      },
    })
      .then(res => resolve(res))
      .catch(e => reject(new Error(`Failed to put survey-unit (id:${id}) : ${e.message}`))); */
    resolve();
  });
};
