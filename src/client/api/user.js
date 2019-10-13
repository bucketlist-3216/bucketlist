import axios from 'axios';

import APIS from '../constants/apis.js';
import PATHS from '../constants/paths';

function login (instance, userData) {
  return axios
    .post(APIS.login, { userData })
    .then(function (response) {
      instance.setState({ userId: response.data.insertedId[0] });
      instance.routeChange(PATHS.trips(instance.state.userId));
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.landingPage);
        return;
      }
      alert(error.message);
    });
}

function createGuestUser (instance) {
  return axios
    .post(APIS.createGuestUser)
    .then(function (response) {
      instance.setState({ userId: response.data.insertedId[0] });
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
  createGuestUser
};
