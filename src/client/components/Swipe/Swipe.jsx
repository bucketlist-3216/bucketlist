import React, { Component } from 'react';
import Swipeable from 'react-swipy';
import axios from 'axios';

import APIS from '../../constants/apis';
import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';

const PLACES = [
  {
    city: 'Greece',
    image:
      'https://lonelyplanetwp.imgix.net/2016/02/Santorini-sunset_CS.jpg?fit=min&q=40&sharp=10&vib=20&w=1470',
    name: 'Santorini',
    price: '$$'
  },
  {
    city: 'New York',
    image:
      'https://www.nycgo.com/images/venues/152/tripadvisortimessquare_taggeryanceyiv_5912__x_large.jpg',
    name: 'Times Square',
    price: '$$$'
  },
  {
    city: 'Paris',
    image:
      'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg',
    name: 'Eiffel Tower',
    price: '$$'
  },
  {
    city: 'Dubai',
    image:
      'https://images2.minutemediacdn.com/image/upload/c_crop,h_1192,w_2123,x_0,y_70/f_auto,q_auto,w_1100/v1559225783/shape/mentalfloss/584459-istock-183342824.jpg',
    name: 'Burj Khalifa',
    price: '$$$'
  },
  {
    city: 'Rome',
    image:
      'https://www.roadaffair.com/wp-content/uploads/2017/09/colosseum-rome-italy-shutterstock_433413835-1024x683.jpg',
    name: 'Colosseum',
    price: '$'
  }
];

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      isDoneSwiping: false
    };
  }

  nextCard = () => {
    const { places } = this.state;
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
    } else {
      instance.props.setLoading(true);
      let instance = this;
      axios
        .get(APIS.vote.places)
        .get(APIS.vote.results(tripId))
        .then(function (response) {
          if (response.data.length == 0) {
            instance.setState({ isDoneSwiping: true });
          }
          instance.setState({ places: response.data });
          instance.props.setLoading(false);
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
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
        <SwipeButton onClick={left} type="reject" />
        <SwipeButton onClick={right} type="approve" />
      </div>
    );
  }

  render() {
    const { places } = this.state;

    return (
      <div className="swipe">
        {places.length > 0 && (
          <div>
            <div className="swipe-header">
              <img
                className="icon-back"
                src="./assets/common/icon-leftarrow.png"
              />
              <div className="city">{places[0].city || ''}</div>
              <img className="icon-list" src="./assets/common/icon-list.png" />
            </div>
            <div className="place-name">{places[0].name || ''}</div>
          </div>
        )}
        {this.state.isDoneSwiping ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
