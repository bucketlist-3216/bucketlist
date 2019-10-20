import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const MenuButton = ({ onClick }) => {
  return (
    <div
      className="icon-list"
      onClick={onClick}>
      <FontAwesomeIcon icon={ faList } size="2x"></FontAwesomeIcon>
    </div>
  );
}

export default MenuButton;
