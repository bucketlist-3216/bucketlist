import React, { Component } from 'react';
import Swipeable from 'react-swipy';

import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';

const PLACES = [
  {
    city: 'Singapore',
    image:
      'https://www.visitsingapore.com/mice/en/plan-your-event/venues/raffles-city-centre/overview/_jcr_content/cardcontent/cardcontentpar/image_video/carousel/item_3.resize.carousel-img.0.0.jpg',
    name: 'Raffles Place'
  },
  {
    city: 'Singapore',
    image: 'https://mapio.net/images-p/4200239.jpg',
    name: 'City Hall'
  }
];

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: PLACES
    };
  }

  nextCard = () => {
    const { places } = this.state;
    const newPlaces = places.slice(1, places.length);
    this.setState({ places: newPlaces });
  };

  renderButtons({ left, right }) {
    return (
      <div className="swipe-buttons">
        <SwipeButton onClick={left}>Reject</SwipeButton>
        <SwipeButton onClick={right}>Accept</SwipeButton>
      </div>
    );
  }

  renderSwiping() {
    const { places } = this.state;
    return (
      <div className="swipe-container">
        <Swipeable buttons={this.renderButtons} onAfterSwipe={this.nextCard}>
          <SwipeCard place={places[0]} />
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} />}
      </div>
    );
  }

  renderSwipeComplete() {
    return <SwipeCard zIndex={-2} none>No more cards</SwipeCard>;
  }

  render() {
    const { places } = this.state;

    return (
      <div className="swipe">
        <div className="swipe-header">Swipe Title</div>
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
