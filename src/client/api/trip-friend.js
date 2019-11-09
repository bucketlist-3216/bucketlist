import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function getTripFriends (instance, tripId) {
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
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('platform');
        instance.routeChange(PATHS.login);
        return;
      }
      alert(error.message);
    });
}

export default {
  getTripFriends
};
