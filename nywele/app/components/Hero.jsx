"use client"
import React from 'react';
import './Hero.css';
// import model from '../assets/model 2.jpg'; // Replace with your actual image path

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>
                    Unleash <span>Your Beauty</span>
                </h1>
                <p className="hero-subtitle">
                    Discover premium wigs designed to bring out your unique style — elegance, confidence, and beauty in every strand.
                </p>
                <button className="shop-button">Shop Now</button>
            </div>

            <div className="hero-image">
                <img src='model_wig.jpg' alt="Model wearing wig" />
            </div>
        </section>
    );
};

export default Hero;
