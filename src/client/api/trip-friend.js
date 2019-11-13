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
  } else if (error.response && error.response.status === 403) {
    routeChange(PATHS.trips());
    error.message = ERROR_MESSAGES["403"];
  }

  toast(`Oops! Something went wrong.`, {
    type: 'error',
    autoClose: 4000,
    position: toast.POSITION.BOTTOM_CENTER,
    hideProgressBar: true,
  });
  
  throw error;
}

function getTripFriends (routeChange, tripId) {
  return axios
    .request({
      url: APIS.tripFriend(tripId),
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
  getTripFriends
};
