import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const PlaceInfo = ({ place, state, closeModal }) => {
  const place = {
    "place_id": 203,
    "name": "Thian Hock Keng Temple, Singapore",
    "description": "Beautifully restored, Thian Hock Keng Temple is the oldest Chinese temple in Singapore and dedicated to Mazu, the Goddess of the Sea.",
    "type": "ATTRACTION",
    "longitude": 103.84763,
    "latitude": 1.28094,
    "image_link": "http://www.yoursingapore.com/content/dam/desktop/global/see-do-singapore/culture-heritage/thian-hock-kheng-temple-carousel01-rect.jpg",
    "link_1": "http://www.thianhockkeng.com.sg",
    "link_2": "http://www.yoursingapore.com/en/see-do-singapore/culture-heritage/places-of-worship/thian-hock-keng-temple.html",
    "opening_hours": "Daily, 7.30am – 5.30pm",
    "image_credits": "Joel Chua DY",
    "image_cap": "The Thian Hock Keng Temple in Singapore is dedicated to Mazu, the Goddess of the Sea.",
    "address": "158 Telok Ayer Street",
    "city": "Singapore"
  };

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
