import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function handleError(error, routeChange) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('platform');
    routeChange(PATHS.login);
    error.message = 'Please log in to continue.';
  } else if (error.response && error.response.status === 403) {
    routeChange(PATHS.trips());
    error.message = 'Sorry, you are not authorized to view this page.';
  }
  throw error;
}

function getUserData(routeChange, userId) {
  return axios
    .request({
      url: APIS.user(userId),
      method: 'get',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      }
    })
    .catch(function (error) {
      handleError(error, routeChange);
    });
}

export default {
  getUserData
};
