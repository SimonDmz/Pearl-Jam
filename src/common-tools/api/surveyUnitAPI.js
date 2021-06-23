import Axios from 'axios';
import { authentication, getHeader } from './utils';

export const getSurveyUnits = (urlPearlApi, authenticationMode) =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.get(`${urlPearlApi}/api/survey-units`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e => {
            reject(new Error(`Failed to fetch survey-units : ${e.response.data.error.message}`));
          });
      })
      .catch(e => {
        reject(new Error(`Error during refreshToken : ${e.response.data.error.message}`));
      });
  });

export const getSurveyUnitById = (urlPearlApi, authenticationMode) => id =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.get(`${urlPearlApi}/api/survey-unit/${id}`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e => reject(new Error(`Failed to fetch survey-unit (id:${id}) : ${e.message}`)));
      })
      .catch(e => reject(new Error(`Error during refreshToken : ${e.message}`)));
  });

export const putDataSurveyUnitById = (urlPearlApi, authenticationMode) => (id, su) =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.put(`${urlPearlApi}/api/survey-unit/${id}`, su, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e => reject(new Error(`Failed to put survey-unit (id:${id}) : ${e.message}`)));
      })
      .catch(e => reject(new Error(`Error during refreshToken : ${e.message}`)));
  });
