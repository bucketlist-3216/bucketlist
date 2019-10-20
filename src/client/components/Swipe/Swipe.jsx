import React, { Component } from 'react';
import SlidingPanel from 'react-sliding-panel';
import Swipeable from 'react-swipy';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';
import PlaceInfo from '../PlaceInfo/';
import BackButton from '../BackButton';


import { SAMPLE_PLACES } from './sample_data';

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: 'Singapore',
      places: SAMPLE_PLACES.attraction,
      placeData: {},
      swipeList: 1,
      hasNext: true,
      showInfo: false,
      imageIndex: 0,
      initialScreenX: 0,
    };
  }

  componentDidMount() {
    console.log("Swipe Component Mounted");
  }

  /* These are helper functions for setting states. */
  setShowInfo(showInfo) {
    this.setState({ showInfo: showInfo });
  }

  setPlaceData(placeData) {
    this.setState({ placeData });
  }

  setInitialScreenX(value) {
    this.setState({ initialScreenX: value });
  }

  setSwipeList(value) {
    this.setState({ imageIndex: 0 });
    this.setState({ swipeList: value });
  }

  // TODO: Cleanup
  // Helper function for redirecting
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  // Helper functions to communicate with backend
  getCity(tripId) {
    const instance = this;
  }

  getPlacesToSwipe(placeId) {

    const { tripId } = this.props.match.params;
    const instance = this;

    axios
      .request({
        url: APIS.placesToVote(tripId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        },
        params: { placeId }
      })
      .then(function(response) {
        if (response.data.length == 0) {
          instance.setState({ hasNext: false });
        }
        instance.setState({ places: response.data });
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.login);
          return;
        }
        alert(error.message);
      });
  }

  castVote(place) {
    return swipeDirection => {
      const { tripId } = this.props.match.params;
      const instance = this;
      const vote = {
        left: 'DISLIKE',
        right: 'LIKE'
      };

      axios
        .request({
          url: APIS.vote,
          method: 'post',
          headers: {
            token: localStorage.getItem('token'),
            platform: localStorage.getItem('platform')
          },
          data: {
            vote: vote[swipeDirection],
            trip_id: tripId,
            place_id: place.place_id
          }
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            instance.routeChange(PATHS.login);
            return;
          }
          alert(error.message);
        });
    };
  }

  imageChange(screenX, value) {
    const delta = Math.abs(screenX - this.state.initialScreenX);

    if (delta < 10) {
      var imgIdx = this.state.imageIndex;
      if (value === "previous") {
        imgIdx = Math.max(0, imgIdx - 1);
      } else {
        imgIdx = Math.min(this.state.places[0].images.length - 1, imgIdx + 1);
      }
      this.setState({ imageIndex: imgIdx });
    }
  }
  // TODO: Cleanup until here


  // Helper functions for swiping
  nextCard = () => {
    const { places } = this.state;
    this.setState({ imageIndex: 0 });
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
      this.setState({ placeData: {} });
    } else {
      this.getPlacesToSwipe();
    }
  };

  /* Render swipe buttons. */
  renderSwipeButtons({ left, right }) {
    return (
      <div className="swipe-buttons">
        <SwipeButton onClick={left} type="reject" />
        <SwipeButton onClick={right} type="approve" />
      </div>
    );
  }

  /* Render swipe cards. */
  renderSwiping() {
    const { places, imageIndex } = this.state;
    const currentPlace = places[0];

    return (
      <div className="swipe-container">
        <Swipeable
          buttons={this.renderSwipeButtons}
          onSwipe={this.castVote(currentPlace)}
          onAfterSwipe={this.nextCard}
        >
          <SwipeCard place={currentPlace} imageIndex={imageIndex} setPlaceData={this.setPlaceData} 
            setShowInfo={this.setShowInfo} imageChange={this.imageChange} setInitialScreenX={this.setInitialScreenX} />
          {this.renderInfoModal()}
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} imageIndex={0} />}
      </div>
    );
  }

  /* Render this when there are no more swipe cards. */
  renderSwipeComplete() {
    return (
      <div className="swipe-container">
        <EmptyCard zIndex={-2}>No more cards</EmptyCard>
      </div>
    );
  }

  /* Renders the chosen list of cards between food places and attraction places. */
  renderSwipeList(swipeList) {
    if (swipeList === 1) {
      if (this.state.places[0].category === 'Attraction') {
        SAMPLE_PLACES.attraction = this.state.places;
        this.setState({ places : SAMPLE_PLACES.food });
      }
      return (
        <ToggleButtonGroup className="list-buttons" name="list-button" value={swipeList} onChange={this.setSwipeList}>
          <ToggleButton className="list-button-selected" name="food" value={1}>food</ToggleButton>
          <ToggleButton className="list-button-unselected" name="places" value={2}>places</ToggleButton>
        </ToggleButtonGroup>
      );
    }
    else {
      if (this.state.places[0].category === 'Food') {
        SAMPLE_PLACES.food = this.state.places;
        this.setState({ places : SAMPLE_PLACES.attraction });
      }
      return (
        <ToggleButtonGroup className="list-buttons" name="list-button" value={swipeList} onChange={this.setSwipeList}>
          <ToggleButton className="list-button-unselected" name="food" value={1}>food</ToggleButton>
          <ToggleButton className="list-button-selected" name="places" value={2}>places</ToggleButton>
        </ToggleButtonGroup>
      );
    };
  }

  /* Renders modal to display more information about the swipe card location. */
  renderInfoModal() {
    const { showInfo, places } = this.state;
    const isMobile = window.innerWidth < 555;
    const place = places[0];

    return (
      <div className="info-panel">
        <SlidingPanel
          type={"bottom"}
          isOpen={showInfo}
          closeFunc={() => this.setShowInfo(false)}
        >
          <div className="info-content">
            <div className="card-info-content">
              <button className="info-button-close" onClick={() => this.setShowInfo(false)}>tap here to close</button>
            </div>
            <div  className="info-title">
              { place.name + ", " + place.price }
            </div>
            <div  className="info-intro">
              { place.desc }
            </div>
            <div className="info-address">
              <div>{ "Location: " + place.location }</div>
              <div>{ "Opening Hours: " + place.hours }</div>
              <div>{ "Phone: " + place.number }</div>
            </div>
            <div  className="info-reviews">
              {"Reviews:"}
            </div>
          </div>
        </SlidingPanel>
      </div>
    );
  }

  /* This is the main render function. */
  render() {
    const { places, isLoading, city, swipeList } = this.state;
    const { tripId } = this.props.match.params;

    return (
      <div className="swipe">
        <div className="swipe-header-primary">
          <div className="city">
            {city}
          </div>
        </div>
        <div className="swipe-header-secondary">
          <BackButton
            onClick={() => this.routeChange(PATHS.trips())}
            // onClick={() => this.routeChange(PATHS.trips(userId))}
          />
          {places.length > 0 && (
            <div>
              {this.renderSwipeList(this.state.swipeList)}
            </div>
          )}
          <img
            className="icon-list"
            src="/assets/common/icon-list.png"
            onClick={() => this.routeChange(PATHS.list(tripId))}
            // onClick={() => this.routeChange(PATHS.list(userId, tripId))}
          />
        </div>
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
