import React from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';

// Import paths
import PATHS from '../../constants/paths';
import APIS from '../../constants/apis';

// Import components
import CityCard from './CityCard';
import Image from 'react-bootstrap/Image';

// Import images
import SingaporeImage from '../../../../assets/city/singapore.png';
import NewYorkCityImage from '../../../../assets/city/new-york-city.png';

const CITIES = {
  "cities": [
    {
      "name": "Singapore",
      "imageUrl": SingaporeImage,
      "disabled": false
    },
    {
      "name": "New York City",
      "imageUrl": NewYorkCityImage,
      "disabled": true
    }
  ]
}

const CitySelect = (props) => {
  var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
  var ga_info = "CitySelectPage" + "_" + user_id + "_" + new Date().toLocaleString();

  ReactGA.initialize('UA-148749594-1');
  ReactGA.event({
    category: 'User',
    action: 'Viewed City Select Page',
    label: ga_info,
  });

  return (
    <div className="city-select">
    	<div className="close" onClick={props.handleClose}>
    		<span></span>
    	</div>
      {/* <h2>Select city</h2> */}
      <div className="city-list">
      {
        // Create city cards here from data
        CITIES.cities.map((city, key) =>
          <CityCard key={key} city={city} onClick={() => { if (!city.disabled) props.handleSelectCity(city.name)}}/>
        )
      }
      </div>
    </div>
  );
}

export default CitySelect;
