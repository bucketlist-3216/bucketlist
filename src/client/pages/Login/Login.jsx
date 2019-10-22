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
          <SingleSignOnButton
            providerName={PROVIDERS['google'].providerName}
            logo={PROVIDERS['google'].logo}
            setLoading={this.setLoading}
            onLoginSuccess={() => this.routeChange(PATHS.trips())}
          />
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
