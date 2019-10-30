import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// Import api
import LoginAPI from '../../api/login';

import PATHS from '../../constants/paths';
import PROVIDERS from '../../constants/providers';
import loginSecrets from '../../../../config/login_secrets.json';

ReactGA.initialize('UA-148749594-1');

const SingleSignOnButton = props => {
  const { domain, providerName, logo, setLoading, onLoginSuccess } = props;

  ReactGA.event({
    category: 'User',
    action: 'Logged In',
    label: providerName
  });

  const handleResponse = (platform) => {
    return function (response) {
      setLoading(true);
      let userData = {};

      if (platform === 'google') {
        userData = {
          email: response.profileObj.email,
          name: response.profileObj.name,
          token: response.Zi.id_token,
          platform
        };
      } else if (platform === 'facebook') {
        userData = {
          email: response.email,
          name: response.name,
          token: response.accessToken,
          platform
        };
      }

      LoginAPI.login(userData)
        .then(() => {
          setLoading(false);
          onLoginSuccess();
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
  }

  if (providerName === PROVIDERS['google'].providerName) {
    return (
      <GoogleLogin
        className="half-row"
        clientId={loginSecrets.google}
        render={renderProps => (
          <div>
            <button
              className="sso-button"
              onClick={renderProps.onClick}
              disabled={props.disabled}
            >
              <div className="logo">{logo}</div>
              <span>{providerName}</span>
            </button>
          </div>
        )}
        responseType="id_token"
        buttonText={providerName}
        onSuccess={handleResponse('google')}
        onFailure={error => console.log(error)}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
  // else if (providerName === PROVIDERS['facebook'].providerName) {
  //   // TODO: implement FacebookLogin
  //   return (
  //     <FacebookLogin
  //       className="half-row"
  //       appId={loginSecrets.facebook}
  //       fields="name,email"
  //       callback={this.handleResponse('facebook')}
  //       render={renderProps => (
  //         <SingleSignOnButton
  //           providerName={PROVIDERS['facebook'].providerName}
  //           logo={PROVIDERS['facebook'].logo}
  //           renderProps={renderProps}
  //           disabled
  //         />
  //       )}
  //       responseType="token"
  //     />
  //   );
  // }

  return (
    <div>
      <button
        className="sso-button"
        onClick={() => null}
        disabled={props.disabled}
      >
        <div className="logo">{logo}</div>
        <span>{providerName}</span>
      </button>
    </div>
  );
};

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string
};

export default SingleSignOnButton;
