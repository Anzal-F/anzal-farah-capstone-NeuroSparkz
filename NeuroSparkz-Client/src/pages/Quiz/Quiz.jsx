import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.scss';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const getMotivationalQuote = (scorePercentage) => {
  if (scorePercentage === 0) return "Keep going, you'll get better with practice!";
  if (scorePercentage <= 25) return "Don't give up! Every effort counts.";
  if (scorePercentage <= 50) return "Good job! Keep improving.";
  if (scorePercentage <= 75) return "Great work! You're on the right track!";
  return "Excellent! You're a quiz master!";
};

const Quiz = () => {
  const [text, setText] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;

  // Load quiz from localStorage on mount
  useEffect(() => {
    const storedQuiz = localStorage.getItem('quizQuestions');
    if (storedQuiz) {
      setQuizQuestions(JSON.parse(storedQuiz));
    } else if (quizData) {
      setQuizQuestions(quizData);
      localStorage.setItem('quizQuestions', JSON.stringify(quizData));
    }
  }, [quizData]);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError(null);
    setSubmissionError('');
    setResults(null);
    setUserAnswers({});
    setCorrectAnswers({});
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/generate-quiz';
      const response = await axios.post(backendUrl, { text });

      if (response.data?.questions) {
        const shuffledQuestions = response.data.questions.map((question) => ({
          ...question,
          options: shuffleArray(question.options),
        }));

        setQuizQuestions(shuffledQuestions);
        localStorage.setItem('quizQuestions', JSON.stringify(shuffledQuestions));
      } else {
        setError('Error generating quiz');
      }
    } catch (err) {
      setError('Error generating quiz');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(userAnswers).length !== quizQuestions.length) {
      setSubmissionError('Please answer all questions before submitting.');
      return;
    }

    let score = 0;
    const totalQuestions = quizQuestions.length;
    const newCorrectAnswers = {};

    quizQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        score++;
      } else {
        newCorrectAnswers[index] = q.correctAnswer;
      }
    });

    setCorrectAnswers(newCorrectAnswers);
    const scorePercentage = (score / totalQuestions) * 100;
    setResults(`You got ${score} out of ${totalQuestions} correct!`);
    setResults((prevResults) => `${prevResults}\n${getMotivationalQuote(scorePercentage)}`);

    setShowModal(true);
  };

  const handleClearQuiz = () => {
    setText('');
    setQuizQuestions([]);
    setUserAnswers({});
    setResults(null);
    setCorrectAnswers({});
    setShowModal(false);
    localStorage.removeItem('quizQuestions');
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>

      {!quizQuestions.length && (
        <div className="quiz_container">
          <textarea
            className="quiz-textarea"
            rows="10"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate quiz questions"
          />
          <button className="quiz-btn" onClick={handleGenerateQuiz} disabled={loading}>
            {loading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {submissionError && <p className="error-message">{submissionError}</p>}

      {quizQuestions.length > 0 && (
        <div className="quiz-questions">
          <h2 className="quiz-questions-title">Questions</h2>
          <form onSubmit={(e) => e.preventDefault()} className="quiz-form">
            {quizQuestions.map((question, index) => (
              <div key={index} className="quiz-question">
                <p className="question-text">{question.question}</p>
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="quiz-option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswerChange(index, option)}
                      checked={userAnswers[index] === option}
                      className="quiz-input"
                    />
                    {option}
                  </label>
                ))}
                {correctAnswers[index] && (
                  <p className="correct-answer">Correct Answer: {correctAnswers[index]}</p>
                )}
              </div>
            ))}
            <button type="button" className="submit-btn" onClick={handleSubmitQuiz}>
              Submit Quiz
            </button>
          </form>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Quiz Results</h3>
            <p>{results}</p>
            <button onClick={() => setShowModal(false)} className="close-modal">Close</button>
          </div>
        </div>
      )}

      <button className="refresh-btn" onClick={handleClearQuiz}>
        Clear
      </button>
    </div>
  );
};

export default Quiz;