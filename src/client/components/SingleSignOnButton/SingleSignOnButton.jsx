import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import { Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

ReactGA.initialize('UA-148749594-1');

const responseGoogle = (response) => {
  console.log(response);
}

import loginSecrets from '../../../../config/login_secrets.json';

const responseFacebook = (response) => {
  console.log(response);
}

const SingleSignOnButton = props => {
  const { domain, providerName, logo } = props;
  const identity = providerName.toLowerCase();

  if (identity === 'google') {
    ReactGA.event({
      category: 'User',
      action: 'Logged In',
      label: 'Google'
    });
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
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  } else if (identity === 'facebook') {
    ReactGA.event({
      category: 'User',
      action: 'Logged In',
      label: 'Facebook'
    });
    return (
      <FacebookLogin
        appId={loginSecrets.facebook}
        callback={responseFacebook}
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
};

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string
};

export default SingleSignOnButton;
