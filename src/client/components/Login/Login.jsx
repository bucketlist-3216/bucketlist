import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';

import PROVIDERS from '../../constants/providers';
import './styles.scss';
import SingleSignOnButton from '../SingleSignOnButton/SingleSignOnButton';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="sso-container">
          {PROVIDERS.map((provider, key) => (
            <SingleSignOnButton
              key={key}
              domain={provider.id}
              providerName={provider.providerName}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Login;
