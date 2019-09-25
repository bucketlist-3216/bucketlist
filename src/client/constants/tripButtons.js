import PATHS from './paths'

const TRIP_BUTTONS = [
  {
    text: 'view list',
    url: PATHS.list
  },
  {
    text: 'swipe location',
    url: PATHS.swipe
  },
  {
    text: 'add friends',
    url: (tripId) => 'addfriends'
  }
];

export default TRIP_BUTTONS;
