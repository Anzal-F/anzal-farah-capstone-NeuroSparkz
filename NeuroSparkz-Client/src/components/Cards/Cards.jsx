import React from 'react';
import { Link } from 'react-router-dom';
import flashcard from "../../assets/images/flashcard.png"
import quiz from "../../assets/images/quiz.png"
import login from "../../assets/images/login.png"
import './Cards.scss';

const Cards = () => {
  return (
    <div className="cards-page">
      <header className="cards-header">
        <h1>Explore Key Features</h1>
        <p>Discover the powerful features of our platform and get started with your learning journey today!</p>
      </header>

      <div className="cards-container">
        <div className="card">
          <Link to="/flashcards">
            <div className="card-content">
              <img  src={flashcard} alt="Flashcards" />
              <div className="text">
                <h3>Flashcards</h3>
                <p>Create and store your own flashcards to improve your study sessions. Each flashcard comes with detailed descriptions, and examples to help reinforce concepts. With the ability to organize your flashcards by topics, you can streamline your learning process for maximum retention.</p>
                
                <ul>
                  <li>Personalised flashcards of your work with a detailed title, summary, and examples</li>
                  <li>Revisit flashcards anytime to reinforce learning</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>

        <div className="card card-reversed">
          <Link to="/quiz">
            <div className="card-content">
              <img  src={quiz} alt="Quizzes" />
              <div className="text">
                <h3>Quizzes</h3>
                <p>Transform your flashcards into personalized quizzes to track your knowledge and progress. With 10 questions covering the material you've learned, you can quiz yourself and see how well you've mastered the content. Whether you're preparing for an exam or just reinforcing your understanding, quizzes are a fun and effective way to test your knowledge!</p>

                <ul>
                  <li>Generate quizzes from your flashcards</li>
                  <li>Test your knowledge with 10 questions per quiz</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="/signup">
            <div className="card-content">
              <img  src={login} alt="Sign Up" />
              <div className="text">
                <h3>Sign Up/ Login</h3>
                <p>Join our platform to save your flashcards, and access your study materials anytime. By signing up, you can store all your progress and have everything at your fingertips for a more organized and efficient study routine. Start your learning journey today and never lose track of your hard work!</p>

                <ul>
                  <li>Store your flashcards for future use</li>
                  <li>Access your study materials anytime, anywhere</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;