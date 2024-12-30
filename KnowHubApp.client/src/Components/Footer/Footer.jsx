import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} KnowHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;