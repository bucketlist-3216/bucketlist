import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';

// Import paths
import PATHS from '../../constants/paths';
import APIS from '../../constants/apis';

// Import components
import CityCard from '../../components/CityCard';
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

@autoBindMethods
class CitySelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  handleAddTrip (trip) {
    let instance = this;
    return axios
    .request({
      url: APIS.trip(),
      method: 'post',
      headers: {
        token: localStorage.getItem('token'),
        platform: localStorage.getItem('platform')
      },
      data: { trip }
    })
    .then(function(response) {
      let tripId = response.data.insertedId;
      // TODO: put in props for redirect
      instance.routeChange(PATHS.swipe(tripId));
      //instance.routeChange(PATHS.trips());
      instance.setState({ isLoading: false});
    })
    .catch(function(error) {
      if (error.response && error.response.status === 401) {
        instance.routeChange(PATHS.login);
        return;
      }
      toast(`Oops! Something went wrong.`, {
        type: 'error',
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
      console.log(error);
    });
  }

  render() {
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
      	<div className="close" onClick={() => this.routeChange(PATHS.trips())}>
      		<span></span>
      	</div>
        {/* <h2>Select city</h2> */}
        <div className="city-list">
        {
          // Create city cards here from data
          CITIES.cities.map(((city, key) => (
              // TODO: Should pass city name also here
              <div onClick={() => { if (!city.disabled) this.handleAddTrip({ destination: city.name})}}>
                <CityCard city={city} key={key}/>
              </div>
            )
          ))
        }
        </div>
      </div>
    );
  }
}

export default CitySelect;
