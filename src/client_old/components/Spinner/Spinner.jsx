import React from 'react';

const Spinner = () => {
  return (
    <div style={{position: 'relative', width: '100%', height: '100vh'}}>
      <img src="/assets/gif/loader.gif" style={{position: 'absolute', width: '50px', height: '50px', left: 'calc(50% - 25px)', top: 'calc(50% - 25px)'}} />
    </div>
  );
}

export default Spinner;
