import React from 'react';
import { Animated } from 'react-animated-css';
import { CirclesToRhombusesSpinner } from 'react-epic-spinners';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loading">
        <div className="loader-text">bucketlist</div>
        {/* {renderEllipsisAnimation()} */}
        <CirclesToRhombusesSpinner color="white" />
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
