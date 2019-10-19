import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <img
      className="icon-back"
      src="/assets/common/icon-leftarrow.png"
      onClick={onClick}
    />
  );
}

export default BackButton;
