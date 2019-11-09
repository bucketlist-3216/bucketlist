import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function handleError(error, routeChange) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('platform');
    routeChange(PATHS.login);
    error.message = 'Please log in to continue.';
  } else if (error.response && error.response.status === 403) {
    routeChange(PATHS.trips());
    error.message = 'Sorry, you are not authorized to view this page.';
  }
  throw error;
}

function getTrips (routeChange) {
  return axios
    .request({
      url: APIS.trip(),
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

function getTrip (routeChange, tripId) {
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
      handleError(error, routeChange);
    });
}

function addTrip (routeChange, trip) {
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
      handleError(error, routeChange);
    });
}

function updateTrip (routeChange, tripId, trip) {
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
      handleError(error, routeChange);
    });
}

function deleteTrip (routeChange, tripId) {
  return axios
    .request({
      url: APIS.trip(tripId),
      method: 'delete',
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
  getTrips,
  getTrip,
  addTrip,
  updateTrip,
  deleteTrip
};
