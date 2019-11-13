import React, { Component } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import autoBindMethods from 'class-autobind-decorator';
import { toast } from 'react-toastify'; 

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';

@autoBindMethods
class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }
  
  render() {
    const { isModalShown, closeModal } = this.props;
    return (
      <Modal
        show={isModalShown}
        onHide={closeModal}
        size="xl"
        dialogClassName="add-friend-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">
            <span className="icon"></span>
            <span className="text">Add Friend</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addFriend}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                required
                onChange={this.handleChangeEmail}
                className="email-field"
                type="email"
                placeholder="add by email"
              />
            </Form.Group>
            <Button className="submit-button" type="submit">
              send invitation
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
        // Show a toast
        toast('Added successfully', {
          type: 'success',
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });

        setTimeout(() => {window.location.reload();}, 2000);
      })
      .catch(function(error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.landingPage);
        } else if (error.response && error.response.status === 404) {
          // TODO: Make this error message sound and look nicer
          toast(`Could not find user with email ${email}`, {
            type: 'error',
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
          });

        } else if (error.response && error.response.status === 409) {
          toast(`User with email '${email}' is already in this trip.`, {
            type: 'error',
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
          });

        } else {
          toast(`Oops! Something went wrong.`, {
            type: 'error',
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
          });
          console.log(error);
        }
      });
  }
};

export default AddFriendModal;
