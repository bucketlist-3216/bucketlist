import React from 'react';
import ReactGA from 'react-ga';
import { Button } from 'react-bootstrap';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';
import { toast } from 'react-toastify'; 

import PlaceCard from '../../components/PlaceCard/PlaceCard'
import DummyPlaces from '../../components/PlaceCard/DummyData'
import PlaceListTopBar from '../../components/AppBarTop/PlaceListTopBar';
import Preloader from '../../components/Preloader'
import TripDetails from '../../components/TripDetails'
import TripInfo from '../../components/TripInfo';
import GroupSettings from '../../components/GroupSettings';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';

// Import api
import TripAPI from '../../api/trip';
import TripFriendAPI from '../../api/trip-friend';

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

@autoBindMethods
class PlaceList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        trip: null,
        places: [],
        tripFriends: [],
        isLoading: true,
        isManagingTrip: false,
        isManagingGroup: false
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
    const instance = this;
    const { tripId } = this.props.match.params;
    this.setState({ isLoading: true });

    const gettingTrip = TripAPI.getTrip(this.routeChange, tripId)
      .then(function (response) {
        instance.setState({ trip : response.data });
      });
    const gettingTripFriends = TripFriendAPI.getTripFriends(this.routeChange, tripId)
      .then(function (response) {
        instance.setState({ tripFriends : response.data });
      });
    const gettingPlaces = axios
      .request({
        url: APIS.voteResults(tripId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        instance.setState({ places: response.data });
      });
    Promise.all([gettingTrip, gettingTripFriends, gettingPlaces])
      .then(function () {
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
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
      });

    TripFriendAPI
      .getTripFriends(this, tripId)
      .then(() => {
        let counter = 1;
        instance.setState({tripFriends : _.map(instance.state.tripFriends, e => {
          if (e.name === '_GUEST_USER') {
            e.name = 'Anon ' + counter;
            counter += 1;
          }
          return e;
        })})
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

    if (this.state.isLoading) {
      return <Preloader/>;
    }

    if (this.state.isManagingTrip) {
      return <TripInfo
        trip={this.state.trip}
        destination="Singapore"
        handleBack={() => this.setState({ isManagingTrip: false })}
        routeChange={this.routeChange}
      />;
    }

    if (this.state.isManagingGroup) {
      return <GroupSettings parent={this} />;
    }

    const { tripId } = this.props.match.params;
    const { trip, places } = this.state;
    return (
      <div className="list-page">
        <PlaceListTopBar trip={trip} placeCount={places.length} onClick={() => this.routeChange(PATHS.trips())}></PlaceListTopBar>
        <TripDetails tripId={tripId} parent={this} />
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
