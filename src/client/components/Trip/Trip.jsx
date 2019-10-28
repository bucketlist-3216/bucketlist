import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';

const Trip = props => {
  const { trip, userId, showModal, onClick, onDelete } = props;
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
    <div className="trip row">
      <div className="trip-element trip-img" onClick={onClick}>
        <img src={`../../../../assets/trips/${destination.toLowerCase()}.png`} alt={destination}/>
      </div>
      <div className="trip-element trip-dest" onClick={onClick}>
        <span>{destination}</span>
      </div>
      <div className="trip-element delete-button" onClick={onDelete}>
        <FontAwesomeIcon icon={ faTrash }></FontAwesomeIcon>
      </div>
      <div className="trip-element right-icon" onClick={onClick}>
        <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Trip;
