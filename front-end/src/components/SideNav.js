import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import "../util/SIdeNav.css";
import { useNavigate, useLocation } from "react-router-dom";

function SideNav({ isOpen, isMobile, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate("/home");
    if (isMobile) onClose();
  };

  const handleTag = () => {
    navigate("/tags");
    if (isMobile) onClose();
  };

  const handleQuestion = () => {
    navigate("/questions");
    if (isMobile) onClose();
  };

  const handleUsers = () => {
    navigate("/users");
    if (isMobile) onClose();
  };

  const handleAskQuestion = () => {
    navigate("/askQuestion");
    if (isMobile) onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    if (isMobile) onClose();
  };

  const handleSignup = () => {
    navigate("/signup");
    if (isMobile) onClose();
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path === "/home" && location.pathname === "/");
  };
  return (
    <>
      {/* Sidebar container */}
      <div className={`side-navbar ${isOpen && !isMobile ? 'open' : 'collapsed'} ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="nav-content">
          <ul className="nav-links">
            <li 
              className={`nav-item ${isActive("/home") ? 'active' : ''}`} 
              onClick={handleHome}
              title="Home"
            >
              <FaHome className="nav-icon" />
              {(isOpen && !isMobile) || isMobile ? <span className="nav-text">Home</span> : null}
            </li>
            
            <li 
              className={`nav-item ${isActive("/questions") ? 'active' : ''}`} 
              onClick={handleQuestion}
              title="Questions"
            >
              <FaClipboardQuestion className="nav-icon" />
              {(isOpen && !isMobile) || isMobile ? <span className="nav-text">Questions</span> : null}
            </li>
            
            <li 
              className={`nav-item ${isActive("/tags") ? 'active' : ''}`} 
              onClick={handleTag}
              title="Tags"
            >
              <FaTags className="nav-icon" />
              {(isOpen && !isMobile) || isMobile ? <span className="nav-text">Tags</span> : null}
            </li>
            
            <li 
              className={`nav-item ${isActive("/users") ? 'active' : ''}`} 
              onClick={handleUsers}
              title="Users"
            >
              <FaUsers className="nav-icon" />
              {(isOpen && !isMobile) || isMobile ? <span className="nav-text">Users</span> : null}
            </li>
            
            {/* Show these items only on mobile */}
            {isMobile && (
              <>
                <li 
                  className={`nav-item ${isActive("/askQuestion") ? 'active' : ''}`} 
                  onClick={handleAskQuestion}
                  title="Ask Question"
                >
                  <FaQuestionCircle className="nav-icon" />
                  <span className="nav-text">Ask Question</span>
                </li>
                
                <li 
                  className={`nav-item ${isActive("/login") ? 'active' : ''}`} 
                  onClick={handleLogin}
                  title="Login"
                >
                  <FaUser className="nav-icon" />
                  <span className="nav-text">Log in</span>
                </li>
                
                <li 
                  className={`nav-item ${isActive("/signup") ? 'active' : ''}`} 
                  onClick={handleSignup}
                  title="Sign up"
                >
                  <FaUserPlus className="nav-icon" />
                  <span className="nav-text">Sign up</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} />
      )}
    </>
  );
}

export default SideNav;
