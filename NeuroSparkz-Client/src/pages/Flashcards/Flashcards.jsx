import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext"; 
import './Flashcards.scss';

const backendUrl = import.meta.env.VITE_BACKEND_URL; 

const Flashcards = () => {
  const [text, setText] = useState(() => localStorage.getItem('text') || '');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false); 
  const [error, setError] = useState(null);
  const [flashcards, setFlashcards] = useState(() => {
    const savedFlashcards = localStorage.getItem('flashcards');
    return savedFlashcards ? JSON.parse(savedFlashcards) : [];
  });
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizReady, setQuizReady] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const { user, token } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem('loading', JSON.stringify(loading));
    localStorage.setItem('error', error);
  }, [text, loading, error]);

  const handleGenerate = async () => {
    if (!text.trim() || (user && !topic.trim())) {
      setError('Please provide both text and topic');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const requestBody = user ? { text, topic } : { text };
      
      const response = await axios.post(
        `${backendUrl}/flashcards/generate-flashcards`,
        requestBody,
        { headers }
      );

      const generatedFlashcards = response.data.flashcards;
      setFlashcards(generatedFlashcards);

      localStorage.setItem('flashcards', JSON.stringify(generatedFlashcards));

    } catch (err) {
      console.error('Error generating flashcards:', err.response?.data || err.message);
      setError('Error generating flashcards');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value); 
  };

  const handleButtonClick = () => {
    if (user && !topic) {
      setShowTopicModal(true);
    } else {
      handleGenerate();
    }
  };

  const handleTopicSubmit = () => {
    if (topic.trim() === '') {
      setError('Please enter a topic to proceed.');
      return;
    }
    setShowTopicModal(false);
    setError('');
  };

  const handleAddNewFlashcard = () => {
    setFlashcards([]); 
    setText('');
    setTopic('');
    localStorage.removeItem('flashcards');  
  };

  const handleTakeQuiz = () => {
    setShowQuizModal(true);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const startQuiz = async () => {
    setLoadingQuiz(true);  

    try {
      const response = await axios.post(`${backendUrl}/generate-quiz`, { text }); 
      
      if (response.data && response.data.questions) {
        const shuffledQuestions = response.data.questions.map(question => ({
          ...question,
          options: shuffleArray(question.options),  
        }));
        
        navigate('/quiz', { state: { quizData: shuffledQuestions } });
      } else {
        setSubmissionError('Error generating quiz');
      }
    } catch (err) {
      setSubmissionError('Error generating quiz');
      console.error('Error:', err);
    } finally {
      setLoadingQuiz(false);
    }
  };

  return (
    <div className="flashcards-container">
      <h1 className="flash-title"> Flashcards</h1>
      
      {flashcards.length === 0 && (
        <>
          <textarea
            className="flashcards-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="6"
            cols="50"
            placeholder="Insert your text here"
          />
          
          <button
            className="flashcards-button"
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? 'Generating...' : user ? (topic ? 'Generate Flashcards' : 'Set Topic') : 'Generate Flashcards'}
          </button>
        </>
      )}

      {showTopicModal && user && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>What is the topic of study?</h2>
            <input
              type="text"
              value={topic}
              onChange={handleTopicChange}
              placeholder="Enter topic"
              className="topic-input"
            />
            <button onClick={handleTopicSubmit}>Save Topic</button>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {submissionError && <p className="error-message">{submissionError}</p>}

      {flashcards.length > 0 && (
        <div className="flashcards-list">
          <div className="flashcards-row">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="flashcard-card">
                <strong>{flashcard.keyPoint}</strong>
                <p>{flashcard.description}</p>
                {flashcard.example && <p><em>Example: {flashcard.example}</em></p>}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={handleAddNewFlashcard} className="add-new-flashcard-button">
              Add New Flashcard
            </button>

            <button onClick={handleTakeQuiz} className="take-quiz-button">
              Take Quiz
            </button>
          </div>

        </div>
      )}

      {showQuizModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ready to take the quiz?</h2>
            <button onClick={startQuiz} disabled={loadingQuiz}>
              {loadingQuiz ? 'Loading Quiz...' : 'Start Quiz'}
            </button>
            <button className='cancel_btn' onClick={() => setShowQuizModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
