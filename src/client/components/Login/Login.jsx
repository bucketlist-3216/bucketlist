import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';

import PROVIDERS from '../../constants/providers';
import SingleSignOnButton from '../SingleSignOnButton/SingleSignOnButton';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="login-title">
          <h1>Travel planning has never been easier</h1>
          <p>Continue with</p>
        </div>

        <div className="sso-container">
          {PROVIDERS.map((provider, key) => (
            <SingleSignOnButton
              key={key}
              domain={provider.id}
              providerName={provider.providerName}
            />
          ))}
        </div>
        <div className="login-fields">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control className="email-field" type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control className="password-field" type="password" placeholder="Password" />
            </Form.Group>
            <Button className="submit-button" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
