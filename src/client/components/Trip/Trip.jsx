import React, { Component } from "react";

import axios from 'axios'

const Trip = props => {
  console.log(props);
  let { trip } = props;
  let { destination, start_date, end_date, members } = trip;
  console.log(members);
  console.log(destination);
  if (!members) {
    members = [];
  }
  return (
    <div className="trip">
      <div className="trip-destination">
        {destination}
      </div>
      <div className="trip-start-date">
        {start_date}
      </div>
      <div className="trip-end-date">
        {end_date}
      </div>
      <div className="trip-members">
        {members.map((member) => {
          return (
            <div className="trip-member">
              {member}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trip;
