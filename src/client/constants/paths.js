const PATHS = {
  home: '/',
  login: '/login',
  createTrip: () => '/create-trip',
  citySelect: () => '/create-trip/city-select',
  trips: () => '/trips',
  createTripOld: (userId = ':userId') => `/user/${userId}/create-trip`,
  swipe: (tripId = `:tripId`) => `/swipe/${tripId}`,
  list: (tripId = `:tripId`) => `/list/${tripId}`,
  swipeOld: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/swipe`,
  tripsOld: (userId = ':userId') => `/user/${userId}/trips`,
  listOld: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/list`
};

export default PATHS;
