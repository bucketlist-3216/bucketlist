import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './styles.scss'

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page">
        <Button variant="primary">Login</Button>
        <Button variant="default">Sign Up</Button>
      </div>
    );
  }
}

export default LoginView;
