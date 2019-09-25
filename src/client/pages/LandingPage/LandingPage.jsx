import React, { Component } from 'react';

import ReactGA from 'react-ga';

import Login from '../../components/Login';
import BucketListLogo from '../../../../assets/brand/brand-logo.png';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    alert('reported to google');
    return (
      <div className="landing-page">
        <div className="brand">
          <img className="brand-logo" src={BucketListLogo} />
          <span className="brand-title">bucketlist</span>
        </div>
        <div className="login-container">
          <div className="login-title">
            <h1>Travel planning has never been easier</h1>
          </div>
          <Login />
        </div>
        <div className="title">
          <h1>Swipe. List. Go.</h1>
        </div>
      </div>
    );
  }
}

export default LandingPage;
