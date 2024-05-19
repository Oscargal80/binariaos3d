import React from 'react';
import './App.css'; // Asegúrate de que se importe el CSS

const Footer = ({ toggleFondoAudio }) => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2024 BinariaOS</p>
      <button onClick={toggleFondoAudio} className="audio-toggle-button">Audio On/Off</button>
    </footer>
  );
};

export default Footer;
