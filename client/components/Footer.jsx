import React from 'react';
import '../styles/Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <small>&copy; {currentYear} Emin. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
