import React, { Component } from 'react';
import Swipeable from 'react-swipy';
import { Button, Modal } from 'react-bootstrap';
import autoBindMethods from 'class-autobind-decorator';

import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';

const PLACES = [
  {
    city: 'Greece',
    image:
      'https://lonelyplanetwp.imgix.net/2016/02/Santorini-sunset_CS.jpg?fit=min&q=40&sharp=10&vib=20&w=1470',
    name: 'Santorini',
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

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: PLACES,
      showModal: false
    };
  }

  handleShow(event) {
    this.setState({ showModal: true });
  }

  handleClose(event) {
    this.setState({ showModal: false });
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
        <SwipeButton onClick={left} type="reject" />
        <SwipeButton onClick={right} type="approve" />
      </div>
    );
  }

  renderModal() {
    const { places } = this.state;
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.handleClose}
        animation={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title >
            {places[0].city}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img className="card-image" src={places[0].image} />
          </div>
          <div>
            {places[0].name}
          </div>
          <div>
            Price: $$$$
          </div>
          <div>
            Location: 8 Rankins Ln
          </div>
          <div>
            <div> Must Try: </div>
            <div> - Lox & Cream Cheese Bagel </div>
            <div> - Berry Bagel w Honey Cream Cheese </div>
            <div> - Melbourne Magic Coffee </div>
          </div>
          <div>
            <div> Reviews:</div>
            <div> “The soft egg bagel with salmon breakfast was sensational! Sounded simply and hearty but packed a punch!”
            - Jessica Crawford, Elite Yelp </div>
            <div> “While my buddy opted for the strawberry bagel with pistachio sprinkles, I had the french toast with bananas and blueberries. Was instantly envious of her food. Have to come back.
            - Pete Jose, Yelp Member </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  renderInfoButton() {
    return (
      <Button variant="primary" onClick={this.handleShow}>
        Question Mark
      </Button>
    )
  }

  render() {
    const { places } = this.state;

    return (
      <div className="swipe">
        {this.renderInfoButton()}
        {places.length > 0 ? this.renderModal() : <div></div>}
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
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
