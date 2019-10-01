let root;
const baseURL = process.env.APP_NAME;

if (process.env.IS_HEROKU === 'true') {
  root = `https://${baseURL}.herokuapp.com/api/v1`;
}
else {
  root = `http://${baseURL}/api/v1`;
}

const APIS = {
  login: `${root}/login`,
  trip: `${root}/trip`,
  vote: `${root}/trip/vote`,
  voteResults: (tripId) => `${root}/trip/${tripId}/vote/results/`,
  placesToVote: (tripId, userId) => `${root}/trip/${tripId}/vote/user/${userId}`,
  userTrips: (userId) => `${root}/user/${userId}/trips`,
  place: (placeId) => `${root}/place/${placeId}`
};

export default APIS;
