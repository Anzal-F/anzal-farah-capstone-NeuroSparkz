import React, { useState } from 'react';
import './FAQs.scss';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };

  const questions = [
    {
      question: 'What is the purpose of this platform?',
      answer: 'This platform provides students with tools to enhance their study habits by generating flashcards, quizzes, and keeping track of them.',
    },
    {
      question: 'How do I create flashcards?',
      answer: 'Simply enter the content in the provided input field, click submit, and your flashcards will be created and stored for later use.',
    },
    {
      question: 'Can I take quizzes based on my flashcards?',
      answer: 'Yes, once your flashcards are created, you can instantly generate quizzes that will test your knowledge based on your flashcards.',
    },
    {
      question: 'How do I save my progress?',
      answer: 'By signing up for an account, your flashcards history will be saved. This allows you to track progress over time.',
    },
    {
      question: 'Do I need an account to use the platform?',
      answer: 'No, you can create flashcards and take quizzes without an account. However, an account allows you to save data for future use.',
    },
    {
      question: 'Can I edit or delete flashcards?',
      answer: 'Yes, once logged in, you can easily edit or delete your saved flashcards to keep your study material up to date.',
    },
    {
      question: 'Are the quizzes timed?',
      answer: 'Currently, quizzes are not timed, but we plan to add this feature in the future to improve the testing experience.',
    },
    {
      question: 'Can I share my flashcards?',
      answer: 'Currently not, but we will soon make Flashcards to be shared with other users through direct links or exporting them to various formats such as PDF or text.',
    },
  ];

  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{item.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;