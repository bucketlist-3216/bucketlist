const root = 'http://localhost:3001/api/v1' //'https://bucketlist-pwa.herokuapp.com';

const APIS = {
  login: `${root}/login`,
  vote: {
    results: (tripId) => `${root}/trip/${tripId}/vote/results/`,
    places: (tripId, userId) => `${root}/trip/${tripId}/vote/user/${userId}`
  },
  user: {
    trips: (userId) => `${root}/user/${userId}/trips`
  },
  trip: `${root}/trip`
};

export default APIS;
