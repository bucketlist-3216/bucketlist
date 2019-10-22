import React from "react";
import Image from 'react-bootstrap';

import PATHS from '../../constants/paths';

const CityCard = props => {
  const { city } = props;
  let { name, imageUrl, disabled } = city;

  return (
    <div className="city-card">
        <div className="city-image">
          <img src={imageUrl}/>
          {disabled && <span>Coming Soon</span>}
        </div>
        <br/>
        <span className="city-name">{name}</span>
    </div>
  );
};

export default CityCard;
