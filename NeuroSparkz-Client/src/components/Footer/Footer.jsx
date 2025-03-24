import React from 'react';
import './Footer.scss'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Neurosparkz. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/flashcards">Flashcards</a>
          <a href="/quiz">Quizes</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;