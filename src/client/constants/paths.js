const PATHS = {
  landingPage: () => '/',
  createTrip: (userId = ':userId') => `/user/${userId}/create-trip`,
  swipe: () => `/swipeview`,  // TODO: change the path to `trip/${tripId}/swipe`
  trips: (userId = ':userId') => `/user/${userId}/trips`,
  list: (userId = ':userId', tripId = ':tripId') => `/user/${userId}/trip/${tripId}/list`
};

export default PATHS;
