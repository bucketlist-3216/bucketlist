import React from 'react';
import IconButton from '../IconButton';

const ProfileButton = (props) => {
  const { className, onClick, imgSrc } = props;
  console.log(imgSrc);
  return (
    <IconButton
      icon=""
      className="profile-button"
      onClick={onClick}
      icon={imgSrc ? null : ""}
      imgSrc = {imgSrc}
    />
  );
};

export default ProfileButton;
