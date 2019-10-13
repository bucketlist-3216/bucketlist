import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import APIS from '../../../constants/apis';
import InfoIcon from '../../../../../assets/common/icon-info.svg';
import SwipeButton from '../SwipeButton';

const SwipeCard = props => {
  const { zIndex, place, setPlaceData, setIsOpen } = props;
  const { image } = place;

  const handleClick = (showInfo) => {
      setIsOpen(showInfo);
  };

  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={ image } />
      <div className="info-container">
        <div className="info-title">
          { place.name + ", " + place.price }
        </div>
        <div className="info-desc">
          { place.desc }
        </div>
      </div>
      <div className="card-info">
        <button className="info-button-open" onClick={() => handleClick(true)}>tap here for more info</button>
      </div>
    </div>
  );
};

export default SwipeCard;
