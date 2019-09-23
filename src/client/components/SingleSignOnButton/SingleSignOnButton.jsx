import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

const SingleSignOnButton = props => {
  const { domain, providerName, logo } = props;
  const identity = providerName.toLowerCase();

  return (
    <div>
      <button className="sso-button">
        {logo}
        <span>{providerName}</span>
      </button>
    </div>
  );
};

SingleSignOnButton.propTypes = {
  domain: PropTypes.string,
  providerName: PropTypes.string
};

export default SingleSignOnButton;
