import React, { Component } from "react";

const PlaceCard = props => {
  let { place } = props;
  let { place_id, name, address, voteCount } = place;

  return (
    <div className="place-card">
      <div className="place-img-container">
        <img src={`../../../../assets/places/default.jpg`} className="place-img"/>
      </div>
      <div className="place-details">
        <div className="place-name">
          {name}
        </div>
        <div className="place-address">
          {address}
        </div>
        <div className="place-votes">
          Votes: {voteCount.LIKE}/{voteCount.LIKE + voteCount.DISLIKE}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
