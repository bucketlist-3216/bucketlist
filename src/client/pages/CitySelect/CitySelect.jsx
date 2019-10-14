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
      "name": "singapore",
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
    console.log('Here')
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
        instance.routeChange(PATHS.landingPage);
        return;
      }
      alert(error.message);
      console.log(error);
    });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // if (this.state.isLoading) {
    //     return (<Preloader />);
    // }

    return (
      <div className="city-select">
      	<div className="close" onClick={() => this.routeChange(PATHS.createTrip())}>
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
