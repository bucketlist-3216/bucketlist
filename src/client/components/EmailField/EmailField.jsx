import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import autoBindMethods from 'class-autobind-decorator';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';

@autoBindMethods
class EmailField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  render() {
    const { isModalShown, tripId, closeModal } = this.props;
    return (
      <Modal
        show={isModalShown}
        onHide={closeModal}
        size="xl"
        dialogClassName="placeinfo"
      >
        <Modal.Header closeButton>
          <Modal.Title className="info-title">Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addFriend}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={this.handleChangeEmail}
                className="email-field"
                type="email"
                placeholder="Type your friend's email"
              />
            </Form.Group>
            <Button className="submit-button" type="submit">
              Add Friend
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  addFriend(event) {
    event.preventDefault();
    const instance = this;
    axios
      .request({
        url: APIS.tripFriend(this.props.tripId),
        method: 'post',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        },
        data: { email: this.state.email }
      })
      .then(function(response) {
        window.location.reload();
      })
      .catch(function(error) {
        if (error.response && error.response.status == 401) {
          instance.routeChange(PATHS.landingPage);
          return;
        }
        alert(error.message);
        console.log(error);
      });
  }
};

export default EmailField;
