import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';

const Trip = props => {
  const { trip, userId, showModal, onClick, onDelete } = props;
  let { trip_id, trip_name, destination, start_date, end_date, members } = trip;
  if (!members) {
    members = [];
  }
  members = members.filter((member) => !member.isSelf);
  const memberNames = members.map((member) => member.name ? member.name.split(' ')[0] : "");

  function decodePromisified() {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, secret, resolve)
    })
  }

  function formatDateRange(startDate, endDate) {
    const endOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const startOptions = Object.assign({}, endOptions);
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (startDate.getFullYear() === endDate.getFullYear()) {
      delete startOptions.year;
    }
    return startDate.toLocaleDateString('default', startOptions) + " - "
        + endDate.toLocaleDateString('default', endOptions);
  }

  return (
    <div className="trip row">
      <div className="trip-element trip-img" onClick={onClick}>
        <img src={`../../../../assets/trips/${destination.toLowerCase()}.png`} alt={destination}/>
      </div>
      <div className="trip-element trip-details" onClick={onClick}>
        <span className="trip-name">{trip_name}</span>
        <span className="trip-dest">{destination}</span>
        <span className="trip-dates">{formatDateRange(start_date, end_date)}</span>
        <div className="trip-members">
          <div className="photos">
            {/* TODO:*/}
          </div>
          <div className="names">
            {[memberNames.slice(0, -1).join(', '), memberNames.slice(-1)[0]].join(memberNames.length < 2 ? '' : ' & ')}
          </div>
        </div>
      </div>
      <div className="trip-element delete-button" onClick={onDelete}>
        <span></span>
      </div>
      <div className="trip-element right-icon" onClick={onClick}>
        <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Trip;
