import React, { Component } from "react";

const PlaceCard = props => {
  let { place } = props;
  let { place_id, name, address, image_link, voteCount } = place;

  if (!image_link || image_link === '<Null>') {
      image_link = '../../../../assets/places/default.jpg'
  }

  return (
    <div className="place-card">
      <div className="place-img-container">
        <img src={image_link} className="place-img"/>
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
