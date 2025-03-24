import React from "react";
import banner from "../../assets/images/banner.png";
import arrow from "../../assets/images/arrow_icon.png";
import "./Banner.scss";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Master Your Learning, Effortlessly</h1>
          <p>
            Elevate your study game with smart flashcards and AI-powered quizzes. 
            Say goodbye to endless notes—turn knowledge into an interactive experience.
          </p>
          <p>
            Stay ahead, retain more, and make studying **faster, smarter,** and more fun. 
          </p>
          <p>
          "NeuroSparkz – Ignite Your Learning, One Flashcard at a Time!"
          </p>
          <div className="cta-btn">
            <a href="/signup">
              Start Learning Now <img src={arrow} alt="Arrow Icon" />
            </a>
          </div>
        </div>
        <div className="banner-image">
          <img src={banner} alt="Study Platform" />
        </div>
      </div>
    </section>
  );
}

export default Banner;