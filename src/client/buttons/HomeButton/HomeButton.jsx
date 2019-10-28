import React from 'react';
import IconButton from '../IconButton';

const HomeButton = (props) => {
  const { className, onClick } = props;
  return (
    <IconButton
      icon=""
      className="home-button"
      onClick={onClick}
    />
  );
};

export default HomeButton;
