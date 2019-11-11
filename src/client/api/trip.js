import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function getTrips (instance) {
  return axios
    .request({
      url: APIS.trip(),
      method: 'get',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      }
    })
    .then(function (response) {
      instance.setState({ trips : response.data });
      instance.setState({ isDoneFetching: true });
      instance.setState({ isLoading: false });
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('platform');
        instance.routeChange(PATHS.login);
        return;
      }
      toast(`Something went wrong! Oops`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
    });
}

export default {
  getTrips
};
