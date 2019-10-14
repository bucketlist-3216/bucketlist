import React from 'react';

const EmptyCard = props => {
  const { zIndex } = props;
  return (
    <div className="swipe-card" style={{ zIndex }}>
      <div className="empty">No More Cards</div>
    </div>
  );
};

export default EmptyCard;
