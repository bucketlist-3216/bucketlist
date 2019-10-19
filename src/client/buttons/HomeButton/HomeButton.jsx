import React from 'react';
import HeaderButton from '../HeaderButton';

const HomeButton = (props) => {
  const { className, onClick } = props;
  return (
    <HeaderButton
      icon=""
      className="home-button"
      onClick={onClick}
    />
  );
};

export default HomeButton;
