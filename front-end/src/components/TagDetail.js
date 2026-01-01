import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaEye, FaArrowUp, FaArrowDown, FaCheckCircle, FaClock, FaUser, FaTags, FaSortAmountDown, FaFilter, FaSearch, FaPlus } from 'react-icons/fa';
import '../util/TagDetail.css';
const allQuestion = [
  {
    questionid: 1,
    questionTitle: "How to optimize React component re-renders?",
    question: "My React application is experiencing performance issues with unnecessary re-renders. I'm using functional components with hooks, and I notice that components are re-rendering even when their props haven't changed. What are the best practices to prevent this?",
    questionTag: ['react', 'performance', 'hooks'],
    votes: 45,
    answers: 8,
    views: 2341,
    isAnswered: true,
    author: "Alex Chen",
    authorReputation: 2847,
    timeAgo: "2 hours ago",
    difficulty: "intermediate"
  },
  {
    questionid: 2,
    questionTitle: "Understanding React useEffect dependency array",
    question: "I'm confused about when to include variables in the useEffect dependency array. Sometimes my effect runs infinitely, other times it doesn't run when I expect it to. Can someone explain the rules?",
    questionTag: ["react", "hooks", "useEffect"],
    votes: 32,
    answers: 12,
    views: 1876,
    isAnswered: true,
    author: "Sarah Johnson",
    authorReputation: 1654,
    timeAgo: "5 hours ago",
    difficulty: "beginner"
  },
  {
    questionid: 3,
    questionTitle: "React Context API vs Redux - When to use which?",
    question: "I'm building a medium-sized React application and trying to decide between using Context API for state management or implementing Redux. What are the pros and cons of each approach?",
    questionTag: ["react", "context-api", "redux", "state-management"],
    votes: 67,
    answers: 15,
    views: 4523,
    isAnswered: true,
    author: "Michael Rodriguez",
    authorReputation: 5432,
    timeAgo: "1 day ago",
    difficulty: "intermediate"
  },
  {
    questionid: 4,
    questionTitle: "React Router v6 navigation and authentication",
    question: "How do I implement protected routes in React Router v6? I need to redirect users to login page if they're not authenticated, but the new Navigate component behavior is confusing me.",
    questionTag: ["react", "react-router", "authentication"],
    votes: 28,
    answers: 6,
    views: 1245,
    isAnswered: false,
    author: "Emily Davis",
    authorReputation: 987,
    timeAgo: "8 hours ago",
    difficulty: "intermediate"
  },
  {
    questionid: 5,
    questionTitle: "Testing React components with Jest and React Testing Library",
    question: "I'm trying to test a React component that has async operations and state updates. My tests are failing because they're not waiting for the async operations to complete. What's the proper way to test this?",
    questionTag: ["react", "testing", "jest", "react-testing-library"],
    votes: 19,
    answers: 4,
    views: 892,
    isAnswered: true,
    author: "David Kim",
    authorReputation: 3241,
    timeAgo: "12 hours ago",
    difficulty: "advanced"
  },
  {
    questionid: 6,
    questionTitle: "React Hooks: Custom hook for API calls",
    question: "I want to create a reusable custom hook for making API calls with loading states and error handling. What's the best pattern to follow? Should I use useReducer or multiple useState hooks?",
    questionTag: ["react", "hooks", "custom-hooks", "api"],
    votes: 41,
    answers: 9,
    views: 2156,
    isAnswered: true,
    author: "Lisa Wang",
    authorReputation: 4167,
    timeAgo: "3 days ago",
    difficulty: "intermediate"
  },
  {
    questionid: 7,
    questionTitle: "React 18 concurrent features and Suspense",
    question: "I'm upgrading to React 18 and want to implement Suspense for data fetching. How do I properly use concurrent features like startTransition and useDeferredValue in a real application?",
    questionTag: ["react", "react-18", "suspense", "concurrent"],
    votes: 73,
    answers: 11,
    views: 3987,
    isAnswered: true,
    author: "James Thompson",
    authorReputation: 7823,
    timeAgo: "4 days ago",
    difficulty: "advanced"
  },
];

function TagDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionTag } = location.state || { questionTag: 'react' };
  
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Filter questions by the current tag
    const filtered = allQuestion.filter(question => 
      question.questionTag.some(tag => 
        tag.toLowerCase().includes(questionTag.toLowerCase())
      )
    );
    setFilteredQuestions(filtered);
  }, [questionTag]);

  useEffect(() => {
    // Apply search filter and sorting
    let result = allQuestion.filter(question => 
      question.questionTag.some(tag => 
        tag.toLowerCase().includes(questionTag.toLowerCase())
      )
    );

    if (searchQuery) {
      result = result.filter(question => 
        question.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'votes':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'answers':
        result.sort((a, b) => b.answers - a.answers);
        break;
      case 'views':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));
        break;
    }

    setFilteredQuestions(result);
  }, [questionTag, searchQuery, sortBy]);

  const handleTagClick = (tag) => {
    navigate(`/tag/${tag}`, { state: { questionTag: tag } });
  };

  const handleQuestionClick = (questionid) => {
    navigate(`/questions/${questionid}`, { state: { questionId: questionid } });
  };

  const handleAskQuestion = () => {
    navigate('/askQuestion');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const totalQuestions = filteredQuestions.length;
  const answeredQuestions = filteredQuestions.filter(q => q.isAnswered).length;

  return (
    <div className="tag-detail-page">
      <div className="tag-detail-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="tag-info">
              <div className="tag-header-icon">
                <FaTags />
              </div>
              <div className="tag-header-text">
                <h1 className="tag-title">{questionTag}</h1>
                <div className="tag-stats">
                  <span className="stat-item">
                    <FaQuestionCircle className="stat-icon" />
                    {totalQuestions} questions
                  </span>
                  <span className="stat-item">
                    <FaCheckCircle className="stat-icon answered" />
                    {answeredQuestions} answered
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="ask-question-btn" onClick={handleAskQuestion}>
            <FaPlus />
            Ask Question
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <form className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder={`Search in ${questionTag} questions...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="filter-controls">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="votes">Most Votes</option>
              <option value="answers">Most Answers</option>
              <option value="views">Most Views</option>
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <div 
                key={question.questionid} 
                className="question-card"
                style={{'--animation-delay': `${index * 0.1}s`}}
              >
                {/* Question Stats */}
                <div className="question-stats">
                  <div className="stat-item">
                    <span className="stat-number">{question.votes}</span>
                    <span className="stat-label">votes</span>
                  </div>
                  <div className={`stat-item ${question.isAnswered ? 'answered' : ''}`}>
                    <span className="stat-number">{question.answers}</span>
                    <span className="stat-label">answers</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{formatNumber(question.views)}</span>
                    <span className="stat-label">views</span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="question-content">
                  <div className="question-header">
                    <h3 
                      className="question-title"
                      onClick={() => handleQuestionClick(question.questionid)}
                    >
                      {question.isAnswered && (
                        <FaCheckCircle className="accepted-icon" />
                      )}
                      {question.questionTitle}
                    </h3>
                    <div 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}
                    >
                      {question.difficulty}
                    </div>
                  </div>

                  <p className="question-preview">{question.question}</p>

                  <div className="question-tags">
                    {question.questionTag.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="question-tag"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="question-meta">
                    <div className="author-info">
                      <FaUser className="author-avatar" />
                      <div className="author-details">
                        <span className="author-name">{question.author}</span>
                        <span className="author-reputation">{question.authorReputation.toLocaleString()} rep</span>
                      </div>
                    </div>
                    <div className="question-time">
                      <FaClock />
                      {question.timeAgo}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-questions">
              <FaQuestionCircle />
              <h3>No questions found</h3>
              <p>No questions match your search criteria for the "{questionTag}" tag.</p>
              <button className="btn-primary" onClick={handleAskQuestion}>
                <FaPlus />
                Ask the first question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TagDetail

