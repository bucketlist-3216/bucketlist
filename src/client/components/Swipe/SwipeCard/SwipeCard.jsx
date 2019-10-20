import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SwipeCard = props => {
  const { zIndex, place, imageIndex, setPlaceData, setShowInfo, 
    imageChange, setInitialScreenX } = props;
  const { images } = place;

  const handleImageClickStart = (event) => {
    setInitialScreenX(event.screenX);
  };

  const handleImageClickEnd = (event, showImage) => {
    imageChange(event.screenX, showImage);
  };

  const handleInfoClick = (showInfo) => {
      setShowInfo(showInfo);
  };

  return (
    <div className="swipe-card" style={{ zIndex }} >

      <div onMouseDown={event => handleImageClickStart(event)}>
        <div className="previous-image" onClick={event => handleImageClickEnd(event, "previous")}>
          <div className="previous-image-button">
            <FontAwesomeIcon icon={ faChevronLeft } size="3x"></FontAwesomeIcon>
          </div>
        </div>
        <div className="next-image" onClick={event => handleImageClickEnd(event, "next")}>
          <div className="next-image-button">
            <FontAwesomeIcon icon={ faChevronRight } size="3x"></FontAwesomeIcon>
          </div>
        </div>
      </div>

      <img className="card-image" src={ images[imageIndex] } />
      
      <div className="info-container">
        <div className="info-title">
          { place.name + ", " + place.price }
        </div>
        <div className="info-desc">
          { place.desc }
        </div>
      </div>
      <div className="card-info">
        <button className="info-button-open" onClick={() => handleInfoClick(true)}>tap here for more info</button>
      </div>
      
    </div>
  );
};

export default SwipeCard;