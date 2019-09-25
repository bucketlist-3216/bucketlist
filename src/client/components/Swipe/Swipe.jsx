import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swipeable from 'react-swipy';
import autoBindMethods from 'class-autobind-decorator';

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
      <div>
        {places.length > 0 ? this.renderModal() : <div></div>}
        <div className="swipe">
          <div className="swipe-header">Swipe Title</div>
          {places.length > 0 ? this.renderInfoButton() : <div></div>}
          {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
        </div>
      </div>
    );
  }
}

export default Swipe;
