import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LikeButton from '../../../buttons/LikeButton';
import DislikeButton from '../../../buttons/DislikeButton';
import Img from 'react-image';
import { PixelSpinner } from 'react-epic-spinners';

const SwipeCard = props => {
  const { zIndex, place, imageIndex, setPlaceData, setShowInfo, imageChange, setInitialScreenX, renderResult } = props;
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
    <div className="swipe-card" style={{ zIndex }}>
      <div onMouseDown={event => handleImageClickStart(event)}>
        <div className="previous-image" onClick={event => handleImageClickEnd(event, "previous")}>
          {renderResult === 'like' && <LikeButton className="like-label" onClick={null}/>}
          <div className="previous-image-button">
            <FontAwesomeIcon icon={ faChevronLeft } size="3x"></FontAwesomeIcon>
          </div>
        </div>
        <div className="next-image" onClick={event => handleImageClickEnd(event, "next")}>
          {renderResult === 'dislike' && <DislikeButton className="dislike-label" onClick={null}/>}
          <div className="next-image-button">
            <FontAwesomeIcon icon={ faChevronRight } size="3x"></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <Img className="card-image" src={images[imageIndex]} loader={ <PixelSpinner/> } />
      <div className="info-container">
        <button className="info-button-open" onClick={() => handleInfoClick(true)}>
          <span className="icon"></span>
          <span className="text">tap here for more info</span>
        </button>
        <div className="info-text">
          <div className="info-title">
            { place.name + ", " + place.price }
          </div>
          <div className="info-desc">
            { place.description }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
