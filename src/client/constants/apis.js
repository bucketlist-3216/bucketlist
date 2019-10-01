
const baseURL = process.env.HEROKU_APP_NAME;
const root = `https://${baseURL}.herokuapp.com/api/v1`;

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
