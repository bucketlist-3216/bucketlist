import React from 'react';
import InfoIcon from '../../../../../assets/common/icon-info.svg'

const SwipeCard = props => {
  const { zIndex, place } = props;
  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={place.image} />
      <div className="card-info">
        <div className="description">{place.name}, {place.price}</div>
        <InfoIcon className="info-icon" onClick={() => alert('TODO: Modal appears')}/>
      </div>
      
    </div>
  );
};

export default SwipeCard;
