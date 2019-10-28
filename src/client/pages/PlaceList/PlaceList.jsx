import React from 'react';
import ReactGA from 'react-ga';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import PlaceCard from '../../components/PlaceCard/PlaceCard'
import DummyPlaces from '../../components/PlaceCard/DummyData'
import PlaceListTopBar from '../../components/AppBarTop/PlaceListTopBar';
import Preloader from '../../components/Preloader'
import TripDetails from '../../components/TripDetails'

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';

const DummyPlace = {
  place_id: 1,
  name: "Ya Kun Kaya Toast",
  address: "1 Fusionopolis Way, #B1-15, S'138632",
  image_link: null,
  voteCount: {
    LIKE: 5,
    DISLIKE: 0
  }
};

class PlaceList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        places: [],
        isDoneFetching: false,
        isLoading: true
    };
  }

  routeChange(pathname, placeId) {
    this.props.history.push({
      pathname,
      state: {
        placeId
      }
    });
  }

  componentDidMount() {
    let instance = this;
    const tripId = this.props.match.params.tripId;
    axios
      .request({
        url: APIS.voteResults(tripId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        instance.setState({places:response.data});
        instance.setState({isDoneFetching:true});
        instance.setState({isLoading:false});
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.login);
          return;
        }
        alert(error.message);
      });
  }

  render() {
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "PlaceListPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Place List Page',
      label: ga_info,
    });

    if (!this.state.isDoneFetching) {
      return <Preloader/>;
    }

    const { tripId } = this.props.match.params;

    return (
      <div className="list-page">
        <PlaceListTopBar destination="Singapore" onClick={() => this.routeChange(PATHS.trips())}></PlaceListTopBar>
        <TripDetails tripId={tripId} />
        { this.state.places.length === 0
          ? (
            <div className="place-container-empty">
              <span>
                No places shortlisted yet! <br/>
                Start exploring now.
              </span>
              <Button className="swipe-button" onClick={() => this.routeChange(PATHS.swipe(tripId))}>
                Let's Go!
              </Button>
            </div>
          )
          : (
            <div className="place-container">{
              this.state.places.map((place, key) => (
                <PlaceCard
                  key={key}
                  place={place}
                />
              ))
            }</div>
          )
        }
        { this.state.places.length > 0 &&
          (
            <Button className="swipe-button-bottom" onClick={() => this.routeChange(PATHS.swipe(tripId))}>
              Let's Explore
            </Button>
          )
        }
      </div>
    );
  }
}

export default PlaceList;
