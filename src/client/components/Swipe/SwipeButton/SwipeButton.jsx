import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const SwipeButton = ({ type, onClick }) => {
  const icon = (type === 'approve') ? faThumbsUp : faThumbsDown;
  return (
    <Button className="action-button" variant="outline-dark" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="4x"/>
    </Button>
  );
};

export default SwipeButton;
