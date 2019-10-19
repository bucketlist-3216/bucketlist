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
import HomeButton from '../../buttons/HomeButton';
import ListButton from '../../buttons/ListButton';

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
      isModalShown: false
    };
  }

  componentDidMount() {
    console.log("Swipe Component Mounted");
  }

  // Helper function for changing swipe list
  listChange(value) {
    this.setState({ swipeList: value });
  }

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

  // Helper function to set state

  showModal(placeId) {
    this.setState({ isModalShown: true });
  }

  closeModal(event) {
    this.setState({ isModalShown: false });
  }

  setIsOpen(showInfo) {
    this.setState({ isModalShown: showInfo });
  }

  setPlaceData(placeData) {
    this.setState({ placeData });
  }

  // Helper functions for swiping

  nextCard = () => {
    const { places } = this.state;
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
      this.setState({ placeData: {} });
    } else {
      this.getPlacesToSwipe();
    }
  };

  renderSwiping() {
    const { places } = this.state;
    const currentPlace = places[0];

    return (
      <div className="swipe-container">
        <Swipeable
          buttons={this.renderButtons}
          onSwipe={this.castVote(currentPlace)}
          onAfterSwipe={this.nextCard}
        >
          <SwipeCard place={currentPlace} setPlaceData={this.setPlaceData} setIsOpen={this.setIsOpen} />
          {this.renderModal()}
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} />}
      </div>
    );
  }

  renderSwipeComplete() {
    return (
      <div className="swipe-container">
        <EmptyCard zIndex={-2}>No more cards</EmptyCard>
      </div>
    );
  }

  renderButtons({ left, right }) {
    return (
      <div className="swipe-buttons">
        <SwipeButton onClick={left} type="reject" />
        <SwipeButton onClick={right} type="approve" />
      </div>
    );
  }

  renderList(swipeList) {
    if (swipeList === 1) {
      if (this.state.places[0].category === 'Attraction') {
        SAMPLE_PLACES.attraction = this.state.places;
        this.setState({ places : SAMPLE_PLACES.food });
      }
      return (
        <ToggleButtonGroup className="list-buttons" name="list-button" value={swipeList} onChange={this.listChange}>
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
        <ToggleButtonGroup className="list-buttons" name="list-button" value={swipeList} onChange={this.listChange}>
          <ToggleButton className="list-button-unselected" name="food" value={1}>food</ToggleButton>
          <ToggleButton className="list-button-selected" name="places" value={2}>places</ToggleButton>
        </ToggleButtonGroup>
      );
    };
  }

  render() {
    const { places, isLoading, city, swipeList } = this.state;
    const { tripId } = this.props.match.params;

    return (
      <div className="swipe">
        <div className="swipe-header">
          <div className="swipe-header-primary">
            <div className="city">
              {city}
            </div>
          </div>
          <div className="swipe-header-secondary">
            <HomeButton
              onClick={() => this.routeChange(PATHS.trips())}
            />
            {places.length > 0 && (
              <div>
                {this.renderList(this.state.swipeList)}
              </div>
            )}
            <ListButton
              onClick={() => this.routeChange(PATHS.list(tripId))}
            />
          </div>
        </div>
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }

  renderModal() {
    const { isModalShown, places } = this.state;
    const isMobile = window.innerWidth < 555;
    const place = places[0];

    return (
      <div className="info-panel">
        <SlidingPanel
          type={"bottom"}
          isOpen={isModalShown}
          closeFunc={() => this.setIsOpen(false)}
        >
          <div className="info-content">
            <div className="card-info-content">
              <button className="info-button-close" onClick={() => this.setIsOpen(false)}>tap here to close</button>
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
}

export default Swipe;
