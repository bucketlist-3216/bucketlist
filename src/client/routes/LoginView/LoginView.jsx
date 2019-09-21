import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Login from '../../components/Login'
import './styles.scss';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page">
        <Login />
      </div>
    );
  }
}

export default LoginView;
