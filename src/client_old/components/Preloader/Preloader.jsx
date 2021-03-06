import React from 'react';
import { Animated } from 'react-animated-css';

import BucketListLogo from '../../../../assets/brand/brand-logo.png';

const loadingText = 'Taking you around the world';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="logo-container">
        <img className="logo" src={BucketListLogo} />
      </div>
      <div className="logo-container">
        <div className="loading">
          <div className="loader-text">{loadingText}</div>
          {renderEllipsisAnimation()}
        </div>
      </div>
    </div>
  );
};

const renderEllipsisAnimation = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
