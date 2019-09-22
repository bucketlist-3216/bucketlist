import React, { Component } from 'react';

import Login from '../../components/Login';
import './styles.scss';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page">
        <div className="login-container">
          <div className="title">
            <h1>Swipe. List. Go</h1>
          </div>
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginView;
