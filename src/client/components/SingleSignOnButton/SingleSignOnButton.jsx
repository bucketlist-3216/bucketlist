import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

const SingleSignOnButton = (props) => {
  const { domain, providerName } = props;
  const identity = providerName.toLowerCase();

  return (
    <Button className="sso-button">
      <span>{providerName}</span>
    </Button>
  )
}

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string,
}

export default SingleSignOnButton;