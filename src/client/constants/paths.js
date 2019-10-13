const PATHS = {
  home: '/',
  createTrip: '/create-trip',
  citySelect: '/create-trip/city-select',
  createTripOld: (userId = ':userId') => `/user/${userId}/create-trip`,
  swipe: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/swipe`,
  trips: (userId = ':userId') => `/user/${userId}/trips`,
  list: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/list`
};

export default PATHS;