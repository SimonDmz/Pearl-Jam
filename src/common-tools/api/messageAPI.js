import Axios from 'axios';
import { authentication, getHeader, getIdep } from './utils';

// warning : getIdep use kc token => may return ''
const idep = async () => await getIdep();

export const getMessages = (pearlApiUrl, authenticationMode) =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.get(`${pearlApiUrl}/api/messages/${idep}`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e => {
            reject(new Error(`Failed to fetch messages : ${e.response.data.error.message}`));
          });
      })
      .catch(e => {
        console.log('error');
        console.log(e);
        reject(new Error(`Error during refreshToken : ${e.response.data.error.message}`));
      });
  });

export const markMessageAsRead = (pearlApiUrl, authenticationMode) => id =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.put(`${pearlApiUrl}/api/message/${id}/interviewer/${idep}/read`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e =>
            reject(new Error(`Failed to mark message as read  (id:${id}) : ${e.message}`))
          );
      })
      .catch(e => reject(new Error(`Error during refreshToken : ${e.message}`)));
  });

export const markMessageADelete = (pearlApiUrl, authenticationMode) => id =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.put(`${pearlApiUrl}/api/message/${id}/interviewer/${idep}/delete`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e =>
            reject(new Error(`Failed to mark message as deleted  (id:${id}) : ${e.message}`))
          );
      })
      .catch(e => reject(new Error(`Error during refreshToken : ${e.message}`)));
  });

export const getUserFromApi = (pearlApiUrl, authenticationMode) =>
  new Promise((resolve, reject) => {
    authentication(authenticationMode)
      .then(() => {
        Axios.get(`${pearlApiUrl}/api/user`, {
          headers: getHeader(authenticationMode),
        })
          .then(res => resolve(res))
          .catch(e => reject(new Error(`Failed to get user API data : ${e.message}`)));
      })
      .catch(e => reject(new Error(`Error during refreshToken : ${e.message}`)));
  });
