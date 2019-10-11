const root = 'https://bucketlist-pwa.herokuapp.com/api/v1'

const APIS = {
  login: `${root}/login`,
  trip: (tripId = '') => `${root}/trip/${tripId}`,
  vote: `${root}/trip/vote`,
  voteResults: (tripId) => `${root}/trip/${tripId}/vote/results/`,
  placesToVote: (tripId, userId) => `${root}/trip/${tripId}/vote/user/${userId}`,
  userTrips: (userId) => `${root}/user/${userId}/trips`,
  place: (placeId) => `${root}/place/${placeId}`,
  tripFriend: (tripId) => `${root}/trip/${tripId}/members`
};

export default APIS;
