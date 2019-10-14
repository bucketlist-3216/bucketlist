import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

// Import paths
import PATHS from '../../constants/paths';

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

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // if (this.state.isLoading) {
    //     return (<Preloader />);
    // }

    return (
      <div className="city-select">
      	<div className="close">
      		<span></span>
      	</div>
        {/* <h2>Select city</h2> */}
        <div className="city-list">
        {
          // Create city cards here from data
          CITIES.cities.map(((city, key) => (
              // TODO: Should pass city name also here
              <div onClick={() => { if (!city.disabled) this.routeChange(PATHS.swipe)}}>
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
