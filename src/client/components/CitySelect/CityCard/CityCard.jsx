import React from "react";
import Image from 'react-bootstrap';

import PATHS from '../../../constants/paths';

const CityCard = props => {
  const { city, onClick } = props;
  let { name, imageUrl, disabled } = city;

  return (
    <div className="city-card">
        <div className="city-image" onClick={onClick}>
          {disabled && <span>coming soon</span>}
          {disabled && <div className="glass"></div>}
          <img src={imageUrl}/>
        </div>
        <br/>
        <span className="city-name" onClick={onClick}>{name}</span>
    </div>
  );
};

export default CityCard;
