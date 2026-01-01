import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Nav from './components/Nav';
import Questions from './components/Questions';
import Home from './components/Home';
import SideNav from './components/SideNav';
import Footer from './components/Footer';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import QuestionDetail from "./components/QuestionDetail";
import TagDetail from "./components/TagDetail";
import AskQuestion from "./components/AskQuestion";
import Tags from "./components/Tags";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    // Close sidebar when switching to mobile to ensure it's hidden
    if (mobile) {
      setSidebarOpen(false);
    }
    // Don't automatically open on desktop - only open when hamburger is clicked
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
        <div className="app-container">
          <SideNav isOpen={sidebarOpen} isMobile={isMobile} onClose={() => setSidebarOpen(false)} />
          <div className={`main-layout ${sidebarOpen && !isMobile ? 'with-sidebar' : 'full-width'}`}>
            <div className="content">
              <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/questions/:id" element={<QuestionDetail/>}/>
                <Route path="/tag/:detail" element={<TagDetail/>}/>
                <Route path="/askQuestion" element={<AskQuestion/>}/>
                <Route path="/tags" element={<Tags/>}/>
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
