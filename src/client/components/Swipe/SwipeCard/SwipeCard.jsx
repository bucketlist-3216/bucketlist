import React from 'react';

const Card = ({ zIndex = 0, children }) => (
  <div className="swipe-cards" style={{ zIndex }}>
    {children}
  </div>
);

export default Card;
