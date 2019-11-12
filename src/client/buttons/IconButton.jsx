import React from 'react';

const IconButton = (props) => {
  const { icon, className, onClick, imgSrc } = props;
  const image = imgSrc ? imgSrc : "../../../../assets/common/user-icon.png";

  return (
    <div className={`icon-button ${className}`}  onClick={onClick}>
      { icon
        ? <span>{icon}</span>
        : <span><img className="icon-button-image" src={image}/></span>
      }
    </div>
  );
};

export default IconButton;
