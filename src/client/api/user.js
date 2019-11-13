import axios from 'axios';
import { toast } from 'react-toastify';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';
import ERROR_MESSAGES from '../constants/error-messages.json';

function handleError(error, routeChange) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('platform');
    routeChange(PATHS.login);
    error.message = ERROR_MESSAGES["401"];
    error.hasSpecialMessage = true;
  } else if (error.response && error.response.status === 403) {
    routeChange(PATHS.trips());
    error.message = ERROR_MESSAGES["403"];
    error.hasSpecialMessage = true;
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
