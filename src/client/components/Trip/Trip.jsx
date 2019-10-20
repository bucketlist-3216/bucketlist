import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';

const Trip = props => {
  const { trip, userId, showModal, onClick } = props;
  let { trip_id, destination, start_date, end_date, members } = trip;
  if (!members) {
    members = [];
  }

  function decodePromisified() {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, secret, resolve)
    })
  }

  return (
    <div className="trip" onClick={onClick}>
      <div className="row">
        <div className="trip-element">
          <img src={`../../../../assets/trips/${destination.toLowerCase()}.png`} alt={destination} className="trip-img"/>
        </div>
        <div className="trip-element trip-dest">
            {destination}
        </div>
        <div className="trip-element right-icon">
          <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default Trip;
