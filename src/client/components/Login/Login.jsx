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
      userId: 0,
      token: ''
    };
  }

  handleResponse(platform) {
    let instance = this;
    return function (response) {
      instance.props.setLoading(true);
      let userData = {};

      if (platform === 'google') {
        userData = {
          email: response.profileObj.email,
          username: response.profileObj.name,
          token: response.Zi.id_token,
          platform
        };
        instance.setState({ token: response.Zi.id_token });
      } else if (platform === 'facebook') {
        userData = {
          email: response.email,
          username: response.name,
          token: response.accessToken,
          platform
        };
        instance.setState({ token: response.accessToken });
      }
      localStorage.setItem('token', userData.token);
      localStorage.setItem('platform', userData.platform);

      axios
        .post(APIS.login, { userData })
        .then(function (response) {
          instance.setState({ userId: response.data.insertedId[0] });
          instance.routeChange(PATHS.trips(instance.state.userId));
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            instance.routeChange(PATHS.landingPage);
            return;
          }
          alert(error.message);
        });
      //this.props.setLoading(true); // Should set loading here but it keeps throwing this error: Can't perform a React state update on an unmounted component.
    }
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
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
            responseType="id_token"
            buttonText={PROVIDERS['google'].providerName}
            onSuccess={this.handleResponse('google')}
            onFailure={error => console.log(error)}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin
            appId={loginSecrets.facebook}
            fields="name,email"
            callback={this.handleResponse('facebook')}
            render={renderProps => (
              <SingleSignOnButton
                providerName={PROVIDERS['facebook'].providerName}
                logo={PROVIDERS['facebook'].logo}
                renderProps={renderProps}
                disabled
              />
            )}
            responseType="token"
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
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                disabled
                className="password-field"
                type="password"
                placeholder="Password"
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
