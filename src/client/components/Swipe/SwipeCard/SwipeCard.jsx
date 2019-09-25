import React from 'react';

const Card = props => {
  const { zIndex, place, none } = props;
  return (
    <div className="swipe-cards" style={{ zIndex }}>
      {none ? renderEmptyCard() : renderImageCard(place)}
    </div>
  );
};

const renderImageCard = place => {
  return <img className="card-image" src={place.image} />;
};

const renderEmptyCard = () => {
  return <div className="empty-card">No More Card</div>
}

export default Card;
