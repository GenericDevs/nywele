"use client"
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">Nywele Affordable Hair Studio</h3>
        <p className="footer-tagline">Your one-stop shop for wigs, hair extensions, and beauty essentials.</p>
        
        {/* <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/shop">Shop</a>
          <a href="/contact">Contact</a>
        </div> */}

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Nywele Affordable Hair Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
