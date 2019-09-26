import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const PlaceInfo = ({ place, state, closeModal }) => {

  return (
    <Modal
      show={state.isModalShown}
      onHide={closeModal}
      animation={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title >
          {place.city}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img className="card-image" src={place.image_link} />
        </div>
        <div>
          {place.name}
        </div>
        <div>
          {place.price}
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
};

export default PlaceInfo;
