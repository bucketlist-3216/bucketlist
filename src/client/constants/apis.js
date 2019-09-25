const root = 'http://localhost:3001';

const APIS = {
  login: `${root}/api/v1/login`,
  vote: {
    results: (tripId) => `${root}/api/v1/trip/${tripId}/vote/results/`
  }
};

export default APIS;