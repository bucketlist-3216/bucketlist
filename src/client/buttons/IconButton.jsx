import React from 'react';

const IconButton = (props) => {
  const { icon, className, onClick } = props;

  return (
    <div className={`icon-button ${className}`}  onClick={onClick}>
      <span>{icon}</span>
    </div>
  );
};

export default IconButton;
