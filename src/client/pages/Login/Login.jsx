import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

// Import constants
import PROVIDERS from '../../constants/providers';
import PATHS from '../../constants/paths';

// Import api
import LoginAPI from '../../api/login';

// Import components
import SingleSignOnButton from '../../components/SingleSignOnButton';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Preloader from '../../components/Preloader';

@autoBindMethods
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  handleResponse(platform) {
    let instance = this;
    return function (response) {
      instance.setLoading(true);
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

      LoginAPI.login(instance, userData);
    }
  }

  render() {
    if (localStorage.getItem('token')) {
      this.routeChange(PATHS.trips());
      return null;
    }

    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (this.state.isLoading) {
        return (<Preloader />);
    }

    return (
      <div className="app-home">
        <h1 className="title">bucketlist</h1>
        {/* <div className="login-inputs">

        </div> */}
        {// TODO: implement normal login
        /*<div className="social-logins">
          <div className="row"><input type="text" className="input-login" placeholder="email"></input></div>
          <div className="row"><input type="password" className="input-login" placeholder="password"></input></div>
          <div className="row"><button className="login-button input-login">Login</button></div>
          <p className="signup">Don't have an account? Sign up <a href="">here</a></p>
        </div>*/}
        <div className="row">
          <GoogleLogin
            className="half-row"
            clientId={process.env.GOOGLE_CLIENT_ID}
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
          {// TODO: implement FacebookLogin
          /*<FacebookLogin
            className="half-row"
            appId={process.env.FACEBOOK_APP_ID}
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
          />*/}
        </div>
      	<div className="or">
      		<div className="line"></div>
      		<span>or</span>
        	<div className="line"></div>
      	</div>
        <span className="guest" onClick={() => LoginAPI.loginGuest(this)}>continue as guest</span>
      </div>
    );
  }
}

export default Login;
