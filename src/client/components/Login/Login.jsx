import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './styles.scss'

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <Button className="login-button">Login</Button>
        <Button className="signup-button">Sign Up</Button>
      </div>
    );
  }
}

export default Login;
