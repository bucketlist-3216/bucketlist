import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

import APIS from '../../../constants/apis';
import PATHS from '../../../constants/paths';

class EmailField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
      isLoading: true
    };
  }

  componentDidMount() {
    const instance = this;
    axios
      .request({
        url: APIS.place(this.props.placeId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        instance.setState({ place: response.data });
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          instance.routeChange(PATHS.landingPage());
          return;
        }
        alert(error.message);
      });
      instance.setState({ isLoading: true });
  }

  render() {
    const PLACE = this.state.place;
    if (this.state.isLoading || !PLACE) {
      return null;
    }

    const { isModalShown, closeModal, isMobile, getTripId } = this.props;
    return (
      <Modal
        show={isModalShown}
        onHide={closeModal}
        size="xl"
        dialogClassName="placeinfo"
      >
        <Modal.Header closeButton>
          <Modal.Title className="info-title">{PLACE.city}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                disabled
                className="email-field"
                type="email"
                placeholder="Type your friend's email"
              />
            </Form.Group>
            <Button className="submit-button" type="submit" disabled>
              Add Friend
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
};

const renderImages = (PLACE, isMobile) => {
  // if isMobile, render only one image
  if (isMobile) {
    return (
        <img className="image" src={PLACE.images[0]} />
    );
  } else {
    _.map(PLACE.images, (image, key) => {
      return <img key={key} className="image" src={image} />;
    });
  }
};

export default PlaceInfo;
