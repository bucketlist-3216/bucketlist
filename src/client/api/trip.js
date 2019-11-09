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
      alert(error.message);
    });
}

function getTrip (instance, tripId) {
  return axios
    .request({
      url: APIS.trip(tripId),
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

function addTrip (instance, trip) {
  return axios
    .request({
      url: APIS.trip(),
      method: 'post',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      },
      data: { trip }
    })
    .catch(function(error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.login);
        return;
      }
      alert(error.message);
      console.log(error);
    });
}

function updateTrip (instance, tripId, trip) {
  return axios
    .request({
      url: APIS.trip(tripId),
      method: 'put',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      },
      data: { trip }
    })
    .catch(function(error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.login);
        return;
      }
      alert(error.message);
      console.log(error);
    });
}

export default {
  getTrips,
  getTrip,
  addTrip,
  updateTrip
};
