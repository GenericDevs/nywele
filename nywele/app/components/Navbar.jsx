"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (sectionId) => {
    setMenuOpen(false); // Close mobile menu on click
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link href="/" className="logo-link">
          Nywele <span>Hair Studio</span>
        </Link>
      </div>
      {/* Hamburger Icon for Mobile */}
      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
<ul className={`nav-links ${menuOpen ? "open" : ""}`}>
  <li>
    <button onClick={() => handleScroll("featured")} className="link-btn">Shop</button>
  </li>
  <li>
    <button onClick={() => handleScroll("testimonials")} className="link-btn">Testimonials</button>
  </li>
  <li>
    <button onClick={() => handleScroll("about")} className="link-btn">About</button>
  </li>
  <li>
    <Link href="/admin" className="link-btn" onClick={() => setMenuOpen(false)}>
      Admin
    </Link>
  </li>
</ul>
    </nav>
  );
}

export default Navbar;
