import React from 'react';
import IconButton from '../IconButton';

const LikeButton = (props) => {
  const { className, onClick } = props;

  return (
    <IconButton
      icon=""
      className={`like-button ${className}`}
      onClick={onClick}
    />
  );
};

export default LikeButton;
