import React from "react";
import Image from 'react-bootstrap';

import PATHS from '../../constants/paths';

const CityCard = props => {
  const { city } = props;
  let { name, imageUrl } = city;

  return (
    <div className="city-card">
        <img className="city-image" src={imageUrl}/>
        <br/>
        <span className="city-name">{name}</span>
    </div>
  );
};

export default CityCard;
