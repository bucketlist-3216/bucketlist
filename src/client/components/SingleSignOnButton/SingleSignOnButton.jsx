import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-148749594-1');

const SingleSignOnButton = props => {
  const { domain, providerName, logo, renderProps } = props;
  console.log(props);

  ReactGA.event({
    category: 'User',
    action: 'Logged In',
    label: providerName
  });

  return (
    <div>
      <button
        className="sso-button"
        onClick={renderProps.onClick}
        disabled={props.disabled}
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
