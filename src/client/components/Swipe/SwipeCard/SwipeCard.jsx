import React from 'react';

const SwipeCard = props => {
  const { zIndex, place, setPlaceData, setIsOpen } = props;
  const { images } = place;

  const handleClick = (showInfo) => {
      setIsOpen(showInfo);
  };

  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={ images[0] } />
      <div className="info-container">
        <button className="info-button-open" onClick={() => handleClick(true)}>
          <span className="icon"></span>
          <span className="text">tap here for more info</span>
        </button>
        <div className="info-text">
          <div className="info-title">
            { place.name + ", " + place.price }
          </div>
          <div className="info-desc">
            { place.desc }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
