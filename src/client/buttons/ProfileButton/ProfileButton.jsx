import React from 'react';
import IconButton from '../IconButton';

const ProfileButton = (props) => {
  const { className, onClick, imgSrc } = props;
  return (
    <IconButton
      icon=""
      className="profile-button"
      onClick={onClick}
      imgSrc={imgSrc}
    />
  );
};

export default ProfileButton;
