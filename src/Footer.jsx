import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2024 BinariaOS</p>
    </footer>
  );
};

const styles = {
  footer: {
    height: '60px',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'black',
    textAlign: 'center',
    padding: '0.5em 0',
    // backgroundColor: '#d5d4d4', // Eliminado el fondo del footer
  },
  text: {
    margin: 0,
    fontSize: '0.8em',
  },
};

export default Footer;
