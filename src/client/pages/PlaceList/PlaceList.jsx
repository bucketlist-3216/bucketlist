import React from 'react';
import axios from 'axios';
import PlaceCard from '../../components/PlaceCard/PlaceCard'
//import DummyPlace from '../../components/PlaceCard/DummyData'

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

  /*
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
          instance.routeChange(PATHS.landingPage);
          return;
        }
        alert(error.message);
      });
  }
  */

  /* render() {
    if (this.state.isDoneFetching) {
      let userId = this.props.match.params.userId;
      let tripId = this.props.match.params.tripId;
      let places = (
        <div className="places-container">
          <span>
            Let's start swiping! <br />
            We'll show you your top places here.
          </span>
        </div>
      );
      if (this.state.places.length > 0) {
         places = (
           <div className="places-container">
            {this.state.places.map((place, key) => (
              <PlaceCard
                key={key}
                place={place}
                onClick={() => this.routeChange(PATHS.swipe(userId, tripId), place.place_id)}
              />
            ))}
          </div>
        );
      }

      return (
        <div className="list-page">
          <div className="header-container">
            <Header />
          </div>
          <div className="buttons-container">
            <button className="swipe-button" onClick={() => this.routeChange(PATHS.swipe(userId, tripId))}>
              <span>continue swiping</span>
            </button>
            <button className="trips-button" onClick={() => this.routeChange(PATHS.trips(userId))}>
              <span>done</span>
            </button>
          </div>
          {places}
        </div>
      );
    } else {
      return null;
    } 
  } */

  render() {
    return (
      <div className="list-page">
        <PlaceCard place={DummyPlace} onClick={this.foo}></PlaceCard>
      </div>
    )
  }

  foo() {
    return null;
  }
}

export default PlaceList;