import React, { Component } from 'react';
import Swipeable from 'react-swipy';

import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';

const PLACES = [
  { city: 'Singapore', image: 'image1.png', name: 'Raffles Place' },
  { city: 'Singapore', image: 'image2.png', name: 'City Hall' }
];

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: PLACES
    };
  }

  remove = () => {
    this.setState(({ places }) => ({
      places: places.slice(1, places.length)
    }));
  };

  render() {
    const { places } = this.state;

    return (
      <div className="swipe">
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }

  renderSwiping() {
    const { places } = this.state;
    return (
      <div className="swipe-container">
        <Swipeable
          buttons={({ left, right }) => (
            <div className="swipe-buttons">
              <SwipeButton onClick={left}>Reject</SwipeButton>
              <SwipeButton onClick={right}>Accept</SwipeButton>
            </div>
          )}
          onAfterSwipe={this.remove}
        >
          <SwipeCard>{places[0].name}</SwipeCard>
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1}>{places[1].name}</SwipeCard>}
      </div>
    );
  }

  renderSwipeComplete() {
    return <SwipeCard zIndex={-2}>No more cards</SwipeCard>;
  }
}

export default Swipe;
