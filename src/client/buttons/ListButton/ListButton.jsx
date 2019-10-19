import React from 'react';
import HeaderButton from '../HeaderButton';

const ListButton = (props) => {
  const { onClick } = props;

  return (
    <HeaderButton
      icon=""
      className="list-button"
      onClick={onClick}
    />
  );
};

export default ListButton;
