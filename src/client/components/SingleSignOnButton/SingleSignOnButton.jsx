import React from 'react';
import PropTypes from 'prop-types';

const SingleSignOnButton = props => {
  const { providerName, logo, renderProps } = props;

  return (
    <div>
      <button
        className="sso-button"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
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
