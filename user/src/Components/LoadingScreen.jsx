import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <div style={styles.text}>Loading...</div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  loader: {
    width: '100px',
    height: '100px',
    border: '6px solid rgba(255, 255, 255, 0.2)',
    borderTop: '6px solid cyan',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    filter: 'drop-shadow(0 0 10px cyan)',
  },
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    opacity: 0.8,
  }
};

export default LoadingScreen;
