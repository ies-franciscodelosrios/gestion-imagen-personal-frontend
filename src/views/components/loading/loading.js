import React from 'react';

const LoaderDiv = ({ text }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        <div class="loader"></div>
      </div>
    </div>
  );
};

export default LoaderDiv;