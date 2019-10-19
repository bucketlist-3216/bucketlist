import React from 'react';
import IconButton from '../IconButton';

const ListButton = (props) => {
  const { onClick } = props;

  return (
    <IconButton
      icon=""
      className="list-button"
      onClick={onClick}
    />
  );
};

export default ListButton;
