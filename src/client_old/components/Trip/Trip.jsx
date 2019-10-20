import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

import TripButton from './TripButton';
import PATHS from '../../constants/paths';

const Trip = props => {
  const { trip, userId, showModal } = props;
  let { trip_id, destination, start_date, end_date, members } = trip;
  if (!members) {
    members = [];
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  [start_date, end_date] = [start_date, end_date].map(date =>
    new Date(date).toLocaleDateString('default', options)
  );

  function routeChange(pathname) {
    props.history.push({
      pathname
    });
  }

  return (
    <div className="trip">
      <div className="trip-img-container">
        <img src={`../../../../assets/trips/${destination}.jpg`} alt={destination} className="trip-img"/>
      </div>
      <div className="trip-details">
        <div className="trip-destination">
          {destination}
        </div>
        <div className="trip-dates">
          {start_date} <br/>
          - {end_date}
        </div>
        <div className="trip-members">
          {members.map((member, key) => (
            <div className="trip-member" key={key}>
              <FontAwesomeIcon icon={faUserAlt}/>
              <span>{member.username || member.email}</span>
            </div>
          ))}
        </div>
        <div className="trip-button-containers">
          <TripButton
            text="view list"
            onClick={() => routeChange(PATHS.list(userId, trip_id))}
          />
          <TripButton
            text="swipe location"
            onClick={() => routeChange(PATHS.swipe(userId, trip_id))}
          />
          <TripButton
            text="add friend"
            onClick={() => showModal(trip_id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Trip;
