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
      <Animated
        className="logo-container"
        animationIn="fadeIn"
        animationInDelay="0"
      >
        <div className="loading">
          <div className="loader-text">{loadingText}</div>
          {renderEllipsisAnimation()}
        </div>
      </Animated>
    </div>
  );
};

const renderEllipsisAnimation = () => {
  return (
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
