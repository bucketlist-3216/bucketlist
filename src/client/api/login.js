import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function login (instance, userData) {
  return axios
    .post(APIS.login, { userData })
    .then(function (response) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('platform', userData.platform);
      localStorage.setItem('userId', response.data.userId);

      instance.routeChange(PATHS.trips());
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function loginGuest (instance) {
  return axios
    .post(APIS.loginGuest)
    .then(function (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('platform', "jwt");
      localStorage.setItem('userId', response.data.userId)

      instance.routeChange(PATHS.trips());
    })
    .catch(function (error) {
      alert(error.message);
    });
}

export default {
  login,
  loginGuest
};
