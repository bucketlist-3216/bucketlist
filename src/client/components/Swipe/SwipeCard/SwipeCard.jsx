import React from 'react';

const SwipeCard = props => {
  const { zIndex, place, setPlaceData, setIsOpen } = props;
  const { images } = place;

  const handleClick = (showInfo) => {
      setIsOpen(showInfo);
  };

  console.log('Displaying image from: ', images[0]);
  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={ images[0] } />
      <div className="info-container">
        <div className="info-title">
          { place.name + ", " + place.price }
        </div>
        <div className="info-desc">
          { place.description }
        </div>
      </div>
      <div className="card-info">
        <button className="info-button-open" onClick={() => handleClick(true)}>tap here for more info</button>
      </div>
    </div>
  );
};

export default SwipeCard;
