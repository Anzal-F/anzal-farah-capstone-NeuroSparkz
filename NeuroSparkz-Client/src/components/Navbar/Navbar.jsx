import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import logo from '../../assets/logo/logo.png';
import hambuger from "../../assets/images/hambuger.png";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    setShowModal(false);
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <button className="toggle-button" onClick={toggleMenu}>
        <img src={hambuger} alt="Menu" />
      </button>

      <ul>
        <li>
          <Link to="/flashcards" className='links' onClick={closeMenu}>Flashcards</Link>
        </li>
        <li>
          <Link to="/quiz" className='links' onClick={closeMenu}>Quiz</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login" className='links' onClick={closeMenu}>Login</Link>
            </li>
            <li>
              <Link to="/signup" className='links' onClick={closeMenu}>Sign Up</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard" className='links' onClick={closeMenu}>Dashboard</Link>
            </li>
            <li>
              <p className='links' onClick={() => { toggleModal(); closeMenu(); }}>Sign Out</p>
            </li>
          </>
        )}
      </ul>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to sign out?</h2>
            <div className="modal-buttons">
              <button onClick={handleSignOut}>Yes, Sign Out</button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;