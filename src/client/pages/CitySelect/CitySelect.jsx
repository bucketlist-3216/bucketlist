import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

// Import paths
import PATHS from '../../constants/paths';

// Import components
import CityCard from '../../components/CityCard';
import Image from 'react-bootstrap/Image';

const CITIES = {
    "cities": [
        {
            "city": "Singapore",
            "imageUrl": "https://i.ibb.co/ZYzjJ9B/sg-resize.jpg"
        },
        {
            "city": "New York",
            "imageUrl": "https://i.ibb.co/LCJQkKL/ny-resize.jpg"
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
        {/* <h2>Select city</h2> */}
        <div className="city-list">
        {
            // Create city cards here from data
            CITIES.cities.map(((city, key) => (
                <div className="city-card" key={key}>
                    <Image className="city-image" src={city.imageUrl} roundedCircle></Image>
                    <br/>
                    <p className="city-name">{city.city}</p>
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