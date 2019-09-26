import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import { Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import loginSecrets from '../../../../config/login_secrets.json';

ReactGA.initialize('UA-148749594-1');

const SingleSignOnButton = props => {
  const { domain, providerName, logo, renderProps } = props;
  const identity = providerName.toLowerCase();

  if (identity === 'google') {
    ReactGA.event({
      category: 'User',
      action: 'Logged In',
      label: 'Google'
    });
    return (
      <div>
        <button className="sso-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          {logo}
          <span>{providerName}</span>
        </button>
      </div>
    );
  } else if (identity === 'facebook') {
    ReactGA.event({
      category: 'User',
      action: 'Logged In',
      label: 'Facebook'
    });
    return (
      <div>
        <button className="sso-button" onClick={renderProps.onClick}>
          {logo}
          <span>{providerName}</span>
        </button>
      </div>
    );
  }
};

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string
};

export default SingleSignOnButton;
