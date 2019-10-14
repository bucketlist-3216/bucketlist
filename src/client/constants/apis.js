// const root = 'https://bucketlist-pwa.herokuapp.com/api/v1'
// const root = 'http://localhost:3001/api/v1';
const root = 'https://bucketlist-mvp.herokuapp.com/api/v1';

const APIS = {
  login: `${root}/login`,
  loginGuest: `${root}/login/guest`,
  trip: (tripId = '') => `${root}/trip/${tripId}`,
  vote: `${root}/trip/vote`,
  voteResults: (tripId) => `${root}/trip/${tripId}/vote/results/`,
  placesToVote: (tripId, userId) => `${root}/trip/${tripId}/vote/user/${userId}`,
  place: (placeId) => `${root}/place/${placeId}`,
  tripFriend: (tripId) => `${root}/trip/${tripId}/members`
};

export default APIS;
