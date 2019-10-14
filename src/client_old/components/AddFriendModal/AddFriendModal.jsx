import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import autoBindMethods from 'class-autobind-decorator';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';

@autoBindMethods
class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  render() {
    const { isModalShown, closeModal } = this.props;
    return (
      <Modal
        show={isModalShown}
        onHide={closeModal}
        size="sm"
        dialogClassName="add-friend-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">Add Friend</Modal.Title>
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
    const { tripId } = this.props;
    const { email } = this.state;
    axios
      .request({
        url: APIS.tripFriend(tripId),
        method: 'post',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        },
        data: { email }
      })
      .then(function(response) {
        window.location.reload();
      })
      .catch(function(error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.landingPage);
        } else if (error.response && error.response.status === 404) {
          // TODO: Make this error message sound and look nicer
          alert(`Could not find user with email '${email}'.`);
        } else {
          alert(error.message);
          console.log(error);
        }
      });
  }
};

export default AddFriendModal;
