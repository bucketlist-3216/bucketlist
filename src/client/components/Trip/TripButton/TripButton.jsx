import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const TripButton = props => {
  const { text, onClick } = props;

  return (
    <div>
      <button className="trip-button" onClick={onClick}>
        <span>{text}</span>
      </button>
    </div>
  );
};

export default withRouter(TripButton);
