import React from 'react';
import SlidingPanel from 'react-sliding-panel';

const SwipeCard = props => {
  const { place, showInfo, setShowInfo } = props;
  const { image } = place;

  const handleClick = (showInfo) => {
      setShowInfo(showInfo);
  };

  return (
    <div className="info-panel">
      <SlidingPanel
        type={"bottom"}
        isOpen={showInfo}
        closeFunc={() => handleClick(false)}
      >
        <div className="info-content">
          <button className="info-button-close" onClick={() => handleClick(false)}>
            <span className="text">tap here to close</span>
            <span className="icon"></span>
          </button>
          <div  className="info-title">
            { place.name + ", " + place.price }
          </div>
          <div  className="info-intro">
            { place.description }
          </div>
          <div className="info-address">
            <div>{ "Location: " + place.address }</div>
            <div>{ "Opening Hours: " + place.opening_hours }</div>
            <div>{ "Phone: " + place.ph_number }</div>
          </div>
          {/*<div  className="info-reviews">
            {"Reviews:"}
          </div>*/}
        </div>
      </SlidingPanel>
    </div>
  );
};

export default SwipeCard;
