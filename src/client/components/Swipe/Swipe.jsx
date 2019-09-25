import React, { Component } from 'react';
import Swipeable from 'react-swipy';

import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';

const PLACES = [
  {
    city: 'Singapore',
    image:
      'https://www.visitsingapore.com/mice/en/plan-your-event/venues/raffles-city-centre/overview/_jcr_content/cardcontent/cardcontentpar/image_video/carousel/item_3.resize.carousel-img.0.0.jpg',
    name: 'Raffles Place',
    price: '$$'
  },
  {
    city: 'Singapore',
    image: 'https://mapio.net/images-p/4200239.jpg',
    name: 'City Hall',
    price: '$$'
  },
  {
    city: 'Singapore',
    image:
      'https://s.yimg.com/ny/api/res/1.2/iVm.c1YQKUE.EwTdInbenw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/https://img.huffingtonpost.com/asset/5cdbdd1c2100003500d0c8e4.jpeg',
    name: 'Hawker Centre',
    price: '$'
  },
  {
    city: 'Singapore',
    image:
      'https://www.rwsentosa.com/-/media/project/non-gaming/rwsentosa/attractions/universal-studios-singapore/others/uss-entrance-globe_1366x666.jpg?h=268&la=en&w=550&hash=25DA89E7DBC4BCFF95D0A2CB7E24DC1B0F3F0B11',
    name: 'Resort World',
    price: '$$$'
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
    return (
      <div className="swipe-container">
        <EmptyCard zIndex={-2}>No more cards</EmptyCard>
      </div>
    );
  }

  renderButtons({ left, right }) {
    return (
      <div className="swipe-buttons">
        <SwipeButton onClick={left}>Reject</SwipeButton>
        <SwipeButton onClick={right}>Accept</SwipeButton>
      </div>
    );
  }

  render() {
    const { places } = this.state;

    return (
      <div className="swipe">
        <div className="swipe-header">
          <div className="city">{places[0].city || ''}</div>
          <div className="place-name">{places[0].name || ''}</div>
        </div>
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
