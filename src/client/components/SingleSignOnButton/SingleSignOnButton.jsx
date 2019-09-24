import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const responseGoogle = (response) => {
  console.log(response);
}

const responseFacebook = (response) => {
  console.log(response);
}

const SingleSignOnButton = props => {
  const { domain, providerName, logo } = props;
  const identity = providerName.toLowerCase();

  if (identity === 'google') {
    return (
      <GoogleLogin
        clientId="INSERT_CLIENT_ID.apps.googleusercontent.com"
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
    return (
      <FacebookLogin
        appId="INSERT_APP_ID"
        autoLoad
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
