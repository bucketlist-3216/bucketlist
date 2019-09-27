import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import autoBindMethods from 'class-autobind-decorator';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import loginSecrets from '../../../../config/login_secrets.json';
import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import PROVIDERS from '../../constants/providers';
import SingleSignOnButton from '../SingleSignOnButton/SingleSignOnButton';

@autoBindMethods
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0
    };
  }

  handleResponse(response) {
    let userData = {};
    let platform = '';

    if (response.hasOwnProperty('googleId')) {
      userData = {
        email: response.profileObj.email,
        username: response.profileObj.name,
        accessToken: response.accessToken
      };
      platform = 'google';
    } else {
      userData = {
        email: response.email,
        username: response.name,
        accessToken: response.accessToken
      };
      platform = 'facebook';
    }

    let instance = this;
    axios
      .post(APIS.login, { userData })
      .then(function (response) {
        instance.setState({ userId: response.data.insertedId[0] });
        instance.routeChange();
      })
      .catch(function (error) {
        alert(error.message);
      });
    //this.props.setLoading(true); // Should set loading here but it keeps throwing this error: Can't perform a React state update on an unmounted component.
  }

  routeChange() {
    this.props.history.push(PATHS.trips(this.state.userId));
  }

  render() {
    return (
      <div className="login">
        <div className="sso-container">
          <GoogleLogin
            clientId={loginSecrets.google}
            render={renderProps => (
              <SingleSignOnButton
                providerName={PROVIDERS['google'].providerName}
                logo={PROVIDERS['google'].logo}
                renderProps={renderProps}
              />
            )}
            buttonText={PROVIDERS['google'].providerName}
            onSuccess={this.handleResponse}
            onFailure={error => console.log(error)}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin
            appId={loginSecrets.facebook}
            fields="name,email"
            callback={this.handleResponse}
            render={renderProps => (
              <SingleSignOnButton
                providerName={PROVIDERS['facebook'].providerName}
                logo={PROVIDERS['facebook'].logo}
                renderProps={renderProps}
              />
            )}
          />
        </div>
        <div className="login-fields">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                disabled
                className="email-field"
                type="email"
                placeholder="Email"
                aria-label="Email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                disabled
                className="password-field"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </Form.Group>
            <Button className="submit-button" type="submit" disabled>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
