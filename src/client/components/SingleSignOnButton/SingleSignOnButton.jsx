import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import axios from 'axios'

import APIS from '../../constants/apis';
import loginSecrets from '../../../../config/login_secrets.json';

class SingleSignOnButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.routeChange = this.routeChange.bind(this);
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

    let that = this;
    axios
      .post(APIS.login, {userData})
      .then(function (response) {
        that.setState({userId: response.data.insertedId[0]});
        that.routeChange();
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  routeChange() {
    window.location.href = `/user/${this.state.userId}/trips`;
  }

  render() {
    const { domain, providerName, logo } = this.props;
    const identity = providerName.toLowerCase();

    if (identity === 'google') {
      return (
        <GoogleLogin
          clientId={loginSecrets.google}
          render={renderProps => (
            <div>
              <button className="sso-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                {logo}
                <span>{providerName}</span>
              </button>
            </div>
          )}
          buttonText={providerName}
          onSuccess={this.handleResponse}
          onFailure={(error) => console.log(error)}
          cookiePolicy={'single_host_origin'}
        />
      );
    } else if (identity === 'facebook') {
      return (
        <FacebookLogin
          appId={loginSecrets.facebook}
          fields="name,email"
          callback={this.handleResponse}
          render={renderProps => (
            <div>
              <button className="sso-button" onClick={renderProps.onClick}>
                {logo}
                <span>{providerName}</span>
              </button>
            </div>
          )}
        />
      );
    }
  }
}

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string
};

export default SingleSignOnButton;
