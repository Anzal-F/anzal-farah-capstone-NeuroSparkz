import { UserProvider } from './context/UserContext'; // Import the UserProvider
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp'; 
import Dashboard from './pages/Dashboard/Dashboard'; 
import Flashcards from './pages/Flashcards/Flashcards'; 
import Quiz from './pages/Quiz/Quiz'; 
import Homepage from './pages/Homepage/Homepage';
import "./App.css"
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
