const PATHS = {
  home: '/',
  login: '/login',
  tutorial: '/tutorial',
  citySelect: () => '/create-trip/city-select',
  trips: () => '/trips',
  createTripOld: (userId = ':userId') => `/user/${userId}/create-trip`,
  swipe: (tripId = `:tripId`) => `/swipe/${tripId}`,
  list: (tripId = `:tripId`) => `/list/${tripId}`,
  swipeOld: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/swipe`,
  tripsOld: (userId = ':userId') => `/user/${userId}/trips`,
  listOld: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/list`,
  invite: (inviteLink = ':inviteLink') => `/invite/${inviteLink}`,
  profile: '/profile',
};

export default PATHS;
