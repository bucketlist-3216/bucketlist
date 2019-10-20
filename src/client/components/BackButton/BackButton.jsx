import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ onClick }) => {
  return (
    <div
      className="icon-back"
      onClick={onClick}>
      <FontAwesomeIcon icon={ faArrowLeft } size="2x"></FontAwesomeIcon>
    </div>
  );
}

export default BackButton;
