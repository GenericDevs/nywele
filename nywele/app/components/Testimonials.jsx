"use client"
import React from "react";
import "./Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Grace W.",
    quote:
      "These wigs are stunning! The quality is unmatched and I feel confident every time I wear one.",
  },
  {
    id: 2,
    name: "Janet K.",
    quote:
      "Absolutely love the styles and the customer service. I’m definitely coming back for more!",
  },
  {
    id: 3,
    name: "Linda M.",
    quote:
      "It’s like the wig was made just for me. Lightweight, natural-looking, and affordable.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-list">
        {testimonials.map(({ id, name, quote }) => (
          <div className="testimonial-card" key={id}>
            <FaQuoteLeft className="quote-icon" />
            <p className="quote">“{quote}”</p>
            <p className="name">— {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
