import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext"; 
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.scss";
import deleteIcon from "../../assets/images/delete.png";

const Dashboard = () => {
  const { user, token } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();  

  useEffect(() => {
    if (user && token) {
      fetchFlashcards(user.userId, token);
    }
  }, [user, token]);

  const fetchFlashcards = async (userId, token) => {
    try {
      console.log("Fetching flashcards for user:", userId);
      const response = await axios.get(
        `${backendUrl}/flashcards/user-flashcards/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Flashcards fetched successfully:", response.data);

      const groupedFlashcards = response.data.map((flashcardSet) => ({
        ...flashcardSet,
        cards: Array.isArray(flashcardSet.cards) ? flashcardSet.cards : [],
        isExpanded: false,
      }));

      setFlashcards(groupedFlashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };
  const toggleSetExpansion = (setId) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcardSet) =>
        flashcardSet.id === setId
          ? { ...flashcardSet, isExpanded: !flashcardSet.isExpanded }
          : flashcardSet
      )
    );
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/flashcards/delete-flashcard/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log('Flashcard deleted:', response.data);
      setFlashcards((prevFlashcards) => prevFlashcards.filter((flashcard) => flashcard.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleGenerateFlashcards = async (text, topic) => {
    try {
      const response = await axios.post(
        `${backendUrl}/generate-flashcards`,
        { text, topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Flashcards generated successfully:", response.data);

      navigate("/dashboard");  
      fetchFlashcards(user.userId, token);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Flashcards</h2>

      <div 
        className="add-flashcard-card" 
        onClick={() => navigate('/flashcards')} 
        title="Create Flashcards"
      >
        <span className="plus-icon">+</span>
      </div>

      {flashcards.length > 0 ? (
        flashcards.map((flashcardSet) => (
          <div
            key={flashcardSet.id}
            className={`flashcard-set ${flashcardSet.isExpanded ? "expanded" : ""}`}
          >
            <div className="set-header" onClick={() => toggleSetExpansion(flashcardSet.id)}>
              <h3>{flashcardSet.topic}</h3>
              <div className="set-header-icons">
                <div className="expand-icon">{flashcardSet.isExpanded ? "-" : "+"}</div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(flashcardSet.id); }} className="delete-btn">
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
            {flashcardSet.isExpanded && (
              <div className="flashcards">
                {flashcardSet.cards.map((card, index) => (
                  <div className="flashcard" key={card.id || index}>
                    <div className="flashcard-header">
                      {card.keyPoint}
                    </div>
                    <div className="flashcard-description">{card.description}</div>
                    {card.example && <div className="flashcard-example">Example: {card.example}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No flashcards found.</p>
      )}
    </div>
  );
};

export default Dashboard;