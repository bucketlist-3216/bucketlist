import React, { Component } from 'react';

import Login from '../../components/Login';
import BucketListLogo from '../../../../assets/brand/brand-logo.png';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
