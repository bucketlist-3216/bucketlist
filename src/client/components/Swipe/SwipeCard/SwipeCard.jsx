import React from 'react';
import InfoIcon from '../../../../../assets/common/icon-info.svg'

const SwipeCard = props => {
  const { zIndex, place } = props;
  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={place.image_link} />
      <div className="card-info">
        <InfoIcon className="info-icon" onClick={() => alert('TODO: Modal appears')}/>
      </div>

    </div>
  );
};

export default SwipeCard;
