const PATHS = {
  home: '/',
  login: '/login',
  createTrip: '/create-trip',
  citySelect: '/create-trip/city-select',
  places: '/place-list',
  createTripOld: (userId = ':userId') => `/user/${userId}/create-trip`,
  swipe: '/swipe',
  swipeOld: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/swipe`,
  trips: (userId = ':userId') => `/user/${userId}/trips`,
  list: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/list`
};

export default PATHS;
