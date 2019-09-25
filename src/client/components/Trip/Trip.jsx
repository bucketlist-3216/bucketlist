import React, { Component } from "react";

import TripButton from '../TripButton/TripButton';
import TRIP_BUTTONS from '../../constants/tripButtons';

const Trip = props => {
  let { trip } = props;
  let { destination, start_date, end_date, members } = trip;
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

  return (
    <div className="trip">
      <div className="trip-img-container">
        <img src={`../../../../assets/trips/${destination}.jpg`} className="trip-img"/>
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
            <div className="trip-member">
              {member.username || member.email}
            </div>
          ))}
        </div>
        <div className="trip-button-containers">
          {TRIP_BUTTONS.map((content, key) => (
            <TripButton
              key={key}
              text={content.text}
              url={content.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trip;
