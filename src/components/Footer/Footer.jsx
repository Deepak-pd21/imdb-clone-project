import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <span className="footer__logoBox">IMDB</span>
          <span className="footer__title">Clone</span>
        </div>

        <div className="footer__links">
          <a href="#top" className="footer__link">
            Back to top
          </a>
        </div>

        <p className="footer__copy">
          © {year} Deepak · Built for self learning purposes only
        </p>
      </div>
    </footer>
  );
};

export default Footer;
