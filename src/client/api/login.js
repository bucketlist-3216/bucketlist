import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function login (userData) {
  return axios
    .post(APIS.login, { userData },
      {headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      }
    })
    .then(function (response) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('platform', userData.platform);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('tutorial', true);

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
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('tutorial', true);

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
