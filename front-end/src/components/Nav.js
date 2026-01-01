import React, { useEffect, useState } from "react";
import "../util/Nav.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import tech from '../images/tech.png';

function Nav({ onSidebarToggle, sidebarOpen }) {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/questions", { state: { searchQuerry: search.trim() } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleLogo = () => {
    navigate("/home");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleAskQuestion = () => {
    navigate("/askQuestion");
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button 
          className="sidebar-toggle-btn" 
          onClick={onSidebarToggle}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <img 
          className="logo" 
          onClick={handleLogo} 
          src={tech} 
          alt="techOverflow logo"
        />
      </div>

      <div className="nav-center">
        <form className="search-form" onSubmit={handleSearch}>
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              value={search}
              onChange={handleChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Search for questions, topics, or users..."
            />

          </div>
        </form>
      </div>

      <div className="nav-right">
        <button className="nav-btn ask-btn" onClick={handleAskQuestion}>
          Ask Question
        </button>

        <button className="nav-btn login-btn" onClick={handleLogin}>
          <FaUser />
          Log in
        </button>
        <button className="nav-btn signup-btn" onClick={handleSignup}>
          <FaUserPlus />
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Nav;
