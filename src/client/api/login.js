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
    })
    .catch(function (error) {
      toast(`Something went wrong! Oops`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
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
      toast(`Something went wrong! Oops`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
    });
}

export default {
  login,
  loginGuest
};
