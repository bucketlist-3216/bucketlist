import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import APIS from '../../../constants/apis';
import InfoIcon from '../../../../../assets/common/icon-info.svg';
import SwipeButton from '../SwipeButton';

const SwipeCard = props => {
  const { zIndex, place, setPlaceData, showModal } = props;
  const { image_link, place_id } = place;

  const getPlaceData = (placeId) => {
    axios
      .request({
        url: APIS.place(placeId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        setPlaceData(response.data);
      })
      .catch(function (error) {
        if (error.response && error.response.status == 401) {
          routeChange(PATHS.landingPage);
          return;
        }
        alert(error.message);
      });
  };

  const handleClick = (placeId) => {
      showModal();
      //getPlaceData(placeId);
  };

  return (
    <div className="swipe-card" style={{ zIndex }}>
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
        <InfoIcon className="info-icon" onClick={() => handleClick(place_id)}/>
      </div>


    </div>
  );
};

export default SwipeCard;
