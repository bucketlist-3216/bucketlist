import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';

const PLACES = {
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
};

const PlaceInfo = (props) => {
  const { isModalShown, closeModal } = props;
  return (
    <Modal
      show={isModalShown}
      onHide={closeModal}
      size="xl"
      dialogClassName="placeinfo"
    >
      <Modal.Header closeButton>
        <Modal.Title className="info-title">{PLACES.city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="info-body">
          <div className="image-row">
            {_.map(PLACES.images, (image, key) => {
              console.log(image);
              return <img key={key} className="image" src={image} />;
            })}
          </div>
          <div className="info-content">
            <h1 className="name">{PLACES.name}</h1>
            <p className="description">{PLACES.description}</p>
            <p className="location"><span className="word">Location: </span>{PLACES.location}</p>
            <div className="review-container">
              <p className="section-title">Reviews:</p>
              {_.map(PLACES.reviews, (review, key) => {
                return (
                  <div className="review" key={key}>
                    <p className="message">"{review.message}"</p>
                    <p className="reviewer">
                      - {review.reviewer.name}, {review.reviewer.status}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PlaceInfo;
