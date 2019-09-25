const root = 'https://bucketlist-pwa.herokuapp.com';

const APIS = {
  login: `${root}/api/v1/login`,
  vote: {
    results: (tripId) => `${root}/api/v1/trip/${tripId}/vote/results/`
  },
  user: {
    trips: (userId) => `${root}/api/v1/user/${userId}/trips`
  }
};

export default APIS;
