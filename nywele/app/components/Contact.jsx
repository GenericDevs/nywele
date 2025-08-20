"use client"
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-wrapper">
        
        {/* Left Side - Contact Info */}
        <div className="contact-info-card">
          <h2>Let’s Connect</h2>
          <p className="contact-tagline">
            Have a question, project, or just want to say hello?  
            We’d love to hear from you.
          </p>

          <div className="contact-item">
            <FaEnvelope className="icon" /> hello@wigwise.com
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" /> +254 712 345 678
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" /> Nairobi, Kenya
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="contact-form">
          <h3>Send a Message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
