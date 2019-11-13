import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 

import APIS from '../../../constants/apis';
import InfoIcon from '../../../../../assets/common/icon-info.svg';

const SwipeCard = props => {
  const { zIndex, place, setPlaceData, showModal } = props;
  const { image_link, place_id } = place;
  // const https_image_link = image_link.startsWith("http:") ? image_link.replace("http", "https") : image_link;

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

        toast(`Oops! Something went wrong.`, {
          type: 'error',
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      });
  };

  const handleClick = (placeId) => {
      showModal();
      getPlaceData(placeId);
  };

  return (
    <div className="swipe-card" style={{ zIndex }}>
      <img className="card-image" src={image_link} />
      <div className="card-info">
        <InfoIcon className="info-icon" onClick={() => handleClick(place_id)}/>
      </div>

    </div>
  );
};

export default SwipeCard;
