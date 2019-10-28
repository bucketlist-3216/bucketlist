import React from 'react';

const Backdrop = props => {
  const { backdropClickHandler } = props;
  
  return (
    <div className="backdrop" onClick={() => backdropClickHandler()}/>
  )
};

export default Backdrop;
