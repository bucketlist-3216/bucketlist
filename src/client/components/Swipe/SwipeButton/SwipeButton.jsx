import React from 'react';
import LikeButton from '../../../buttons/LikeButton';
import DislikeButton from '../../../buttons/DislikeButton';

const SwipeButton = ({ type, onClick }) => {
  if (type === 'approve') {
    return <LikeButton className="swipe-button" onClick={onClick}/>;
  } else {
    return <DislikeButton className="swipe-button" onClick={onClick}/>;
  }
};

export default SwipeButton;
