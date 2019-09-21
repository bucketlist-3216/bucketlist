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
        <Button variant="primary">Login</Button>
        <Button variant="danger">Sign Up</Button>
      </div>
    );
  }
}

export default Login;
