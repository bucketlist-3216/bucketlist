import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'react-bootstrap';

import PATHS from '../../constants/paths';

const CityCard = props => {
  const { city } = props;
  let { city, imageUrl } = city;

  function routeChange(pathname) {
    props.history.push({
      pathname
    });
  }

  return (
    <div className="city-card">
        <h3>{city}</h3>
        <br/>
        <Image src={imageUrl}/>
    </div>
  );
};

export default CityCard;
