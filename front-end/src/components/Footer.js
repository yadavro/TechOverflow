import React from "react";
import { useNavigate } from "react-router-dom";
import tech from "../images/tech.png";
import "../util/Footer.css";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram,
  FaHeart,
  FaQuestionCircle,
  FaTag,
  FaUsers,
  FaInfoCircle,
  FaGavel,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };
  const handleQuestion = () => {
    navigate("/questions");
  };
  const handleHelp = () => {
    navigate("/help");
  };
  const handleChat = () => {
    navigate("/Chat");
  };
  const handleAbout = () => {
    navigate("/about");
  };
  const handleLegal = () => {
    navigate("/legal");
  };
  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo" onClick={handleLogoClick}>
              <img className="logo" src={tech} alt="techOverflow logo" />
            </div>
            <p className="brand-description">
              Your go-to platform for technical questions, knowledge sharing, and community-driven solutions.
              Join thousands of developers solving problems together.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Community</h4>
              <nav className="nav-links">
                <li onClick={handleQuestion}>
                  <FaQuestionCircle />
                  <span>Questions</span>
                </li>
                <li onClick={handleChat}>
                  <FaTag />
                  <span>Tags</span>
                </li>
                <li onClick={handleHelp}>
                  <FaUsers />
                  <span>Users</span>
                </li>
              </nav>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <nav className="nav-links">
                <li onClick={handleAbout}>
                  <FaInfoCircle />
                  <span>About</span>
                </li>
                <li onClick={handleLegal}>
                  <FaGavel />
                  <span>Privacy</span>
                </li>
                <li onClick={handleLegal}>
                  <FaGavel />
                  <span>Terms</span>
                </li>
                <li onClick={handleContact}>
                  <FaEnvelope />
                  <span>Contact</span>
                </li>
              </nav>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <nav className="nav-links">
                <li onClick={handleHelp}>
                  <FaQuestionCircle />
                  <span>Help Center</span>
                </li>
                <li onClick={handleChat}>
                  <FaUsers />
                  <span>Community</span>
                </li>
                <li onClick={handleAbout}>
                  <FaInfoCircle />
                  <span>Blog</span>
                </li>
                <li onClick={handleContact}>
                  <FaEnvelope />
                  <span>Support</span>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 techOverflow. Made with <FaHeart className="heart-icon" /> for developers worldwide.</p>
          </div>
          <div className="footer-meta">
            <span>Version 1.0</span>
            <span>•</span>
            <span>Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
