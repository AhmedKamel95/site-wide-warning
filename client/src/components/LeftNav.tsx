import React from 'react';

const styles: {[key: string]: React.CSSProperties} = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '300px',
    backgroundColor: '#EDEDED',
  },
  cta: {
    width: '200px',
    height: '60px',
    backgroundColor: '#414141',
    marginTop: '100px',
    marginBottom: '80px',
    borderRadius: '5px',
  },
  leftNavItem: {
    backgroundColor: '#C6C6C6',
    width: '200px',
    height: '60px',
    marginTop: '20px',
    borderRadius: '5px',
  },
};

const GlobalHeader = () => {
  return (
    <div style={styles.root}>
      <div style={styles.cta} />
      <div style={styles.leftNavItem} />
      <div style={styles.leftNavItem} />
      <div style={styles.leftNavItem} />
      <div style={styles.leftNavItem} />
      <div style={styles.leftNavItem} />
    </div>
  );
};

export default GlobalHeader;
