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

const SAMPLE_PLACE = [{
  place_id: 203,
  name: 'Thian Hock Keng Temple, Singapore',
  description:
    'Beautifully restored, Thian Hock Keng Temple is the oldest Chinese temple in Singapore and dedicated to Mazu, the Goddess of the Sea.',
  type: 'ATTRACTION',
  longitude: 103.84763,
  latitude: 1.28094,
  images: [
    'http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/culture-heritage/thian-hock-kheng-temple-carousel01-rect.jpg',
    'http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/culture-heritage/thian-hock-kheng-temple-carousel01-rect.jpg',
    'http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/culture-heritage/thian-hock-kheng-temple-carousel01-rect.jpg'
  ],
  location: '8 Sample Location Drive, SG 378921',
  link_1: 'http://www.thianhockkeng.com.sg',
  link_2:
    'http://www.yoursingapore.com/en/see-do-singapore/culture-heritage/places-of-worship/thian-hock-keng-temple.html',
  opening_hours: 'Daily, 7.30am – 5.30pm',
  image_credits: 'Joel Chua DY',
  image_cap:
    'The Thian Hock Keng Temple in Singapore is dedicated to Mazu, the Goddess of the Sea.',
  address: '158 Telok Ayer Street',
  city: 'Singapore',
  reviews: [
    {
      reviewer: {
        name: 'Jessica Crawford',
        status: 'Elite Reviewer, Reviews.com'
      },
      message:
        "This is the best review ever, I just can't possibly think of anything bad to say. The entire experience was phenomenal."
    },
    {
      reviewer: {
        name: 'Thomas Shelby',
        status: 'Legend Reviewer, The Birmingham Reviews'
      },
      message: 'Terrible place. Not a single joy.'
    }
  ]
}];

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: 'Singapore',
      places: SAMPLE_PLACE,
      placeData: SAMPLE_PLACE[0],
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

    const { tripId, userId } = this.props.match.params;
    const instance = this;
  }

  castVote(place) {
    return swipeDirection => {
      const { tripId, userId } = this.props.match.params;
      const instance = this;
      const vote = {
        left: 'DISLIKE',
        right: 'LIKE'
      };
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
    const currentPlace = SAMPLE_PLACE[0];
    return (
      <div className="swipe-container">
        <Swipeable
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
      return (
        <ToggleButtonGroup className="list-buttons" name="list-button" value={swipeList} onChange={this.listChange}>
          <ToggleButton className="list-button-selected" name="food" value={1}>food</ToggleButton>
          <ToggleButton className="list-button-unselected" name="places" value={2}>places</ToggleButton>
        </ToggleButtonGroup>
      );
    }
    else {
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
    const { userId, tripId } = this.props.match.params;

    return (
      <div className="swipe">
        <div className="swipe-header-primary">
          <div className="city">
            {city}
          </div>
        </div>
        <div className="swipe-header-secondary">
          <BackButton
            onClick={() => this.routeChange(PATHS.trips(userId))}
          />
          {this.renderList(this.state.swipeList)}
          <img
            className="icon-list"
            src="/assets/common/icon-list.png"
            onClick={() => this.routeChange(PATHS.list(userId, tripId))}
          />
        </div>
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }

  renderModal() {
    const { isModalShown } = this.state;
    const isMobile = window.innerWidth < 555;

      return (
        <div className="swipe-card">
          <img className="card-image" src='http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/places-to-see/marina-bay-area-carousel01-rect.jpg' />
          <div className="info-container">
            <div className="info-title">
              {"Marina Bay Sands, $$$"}
            </div>
            <div className="info-desc">
              {"Singapore’s most iconic hotel for the world’s largest rooftop Infinity Pool, award-winning dining, and a wide range of shopping and entertainment options."}
            </div>
          </div>
          <div className="swipe-buttons">
            <SwipeButton type="reject" />
            <SwipeButton type="approve" />
          </div>
          <div className="card-info">
            <button className="info-button-open" onClick={() => this.setIsOpen(true)}>tap here for more info</button>
          </div>

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
                  {"Marina Bay Sands, $$$"}
                </div>
                <div  className="info-intro">
                  {"Singapore’s most iconic hotel for the world’s largest rooftop Infinity Pool, award-winning dining, and a wide range of shopping and entertainment options."}
                </div>
                <div className="info-address">
                  <div>{"Location: 10 Bayfront Ave, Singapore 018956"}</div>
                  <div>{"Hours: 7:30AM - 9PM"}</div>
                  <div>{"Phone: 6463 0527"}</div>
                  <div>{"Yelp Rating: 4.5/5"}</div>
                </div>
                <div  className="info-reviews">
                  {"Reviews:"}
                </div>
              </div>
            </SlidingPanel>
          </div>
        </div>
      );
  }
}

export default Swipe;
