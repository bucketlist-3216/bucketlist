import axios from 'axios';
import { toast } from 'react-toastify'; 

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function login (userData) {
  return axios
    .request({
      url: APIS.login,
      method: 'post',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      },
      data: { userData }
    })
    .then(function (response) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('platform', userData.platform);
      localStorage.setItem('userId', response.data.userId);
    })
    .catch(function (error) {
      toast(`Oops! Something went wrong.`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
    });
}

function loginGuest (instance) {
  return axios
    .request({
      url: APIS.loginGuest,
      method: 'post'
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('platform', "jwt");
      localStorage.setItem('userId', response.data.userId)

      instance.routeChange(PATHS.trips());
    })
    .catch(function (error) {
      toast(`Oops! Something went wrong.`, {
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
