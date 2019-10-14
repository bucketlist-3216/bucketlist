import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function login (instance, userData) {
  localStorage.setItem('token', userData.token);
  localStorage.setItem('platform', userData.platform);

  return axios
    .post(APIS.login, { userData })
    .then(function (response) {
      instance.routeChange(PATHS.trips);
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.landingPage);
        return;
      }
      alert(error.message);
    });
}

function loginGuest (instance) {
  return axios
    .post(APIS.loginGuest)
    .then(function (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('platform', "jwt");

      instance.routeChange(PATHS.trips);
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.login);
        return;
      }
      alert(error.message);
    });
}

export default {
  login,
  loginGuest
};
