import React from 'react';
import IconButton from '../IconButton';

const DislikeButton = (props) => {
  const { className, onClick } = props;

  return (
    <IconButton
      icon=""
      className={`dislike-button ${className}`}
      onClick={onClick}
    />
  );
};

export default DislikeButton;
