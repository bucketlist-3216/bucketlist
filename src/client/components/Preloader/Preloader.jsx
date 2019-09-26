import React from 'react';
import { Animated } from 'react-animated-css';

import BucketListLogo from '../../../../assets/brand/brand-logo.png';

const loadingText = 'Taking you around the world';

const Preloader = () => {
  return (
    <div className="preloader">
      <Animated
        className="logo-container"
        animationIn="zoomIn"
        animationInDelay="1000"
        animationInDuration="500"
        // isVisible={false}
      >
        <img className="logo" src={BucketListLogo} />
      </Animated>
      <Animated
        className="logo-container"
        animationIn="fadeIn"
        animationInDelay="2000"
        animationInDuration="500"
        // isVisible={false}
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
