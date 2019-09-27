import React from 'react';
import InfoIcon from '../../../../../assets/common/icon-info.svg'

const SwipeCard = props => {
  const { zIndex, place, showModal } = props;
  //const https_image_link = place.image_link.startsWith("http") ? place.image_link.replace("http", "https") : place.image_link;

  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={place.image_link} />
      <div className="card-info">
        <InfoIcon className="info-icon" onClick={showModal}/>
      </div>

    </div>
  );
};

export default SwipeCard;
