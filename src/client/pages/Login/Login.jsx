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

ReactGA.initialize('UA-148749594-1');

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

  handleGuestLogin() {
    localStorage.setItem('tutorial', 'true');
    const instance = this;
    this.setLoading(true);
    LoginAPI.loginGuest(this)
      .then(() => {
        instance.routeChange(PATHS.trips());
      })
      .catch(function (error) {
        instance.setLoading(false);
        alert(error.message);
      });
  }

  render() {
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "LoginPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Login Page',
      label: ga_info,
    });

    if (localStorage.getItem('token')) {
      this.routeChange(PATHS.trips());
      return null;
    }

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
        <span className="guest" onClick={this.handleGuestLogin}>continue as guest</span>
      </div>
    );
  }
}

export default Login;
