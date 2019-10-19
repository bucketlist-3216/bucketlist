import React from 'react';

const HeaderButton = (props) => {
  const { icon, className, onClick } = props;

  return (
    <div className={`header-button ${className}`}  onClick={onClick}>
      <span>{icon}</span>
    </div>
  );
};

export default HeaderButton;
