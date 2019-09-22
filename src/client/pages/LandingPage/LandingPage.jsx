import React, { Component } from 'react';

import Login from '../../components/Login';
import './styles.scss';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page">
        <div className="login-container">
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
