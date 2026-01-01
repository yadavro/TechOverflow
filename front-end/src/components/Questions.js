import React, { useState, useEffect } from "react";
import "../util/Question.css";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaSearch, 
  FaSort, 
  FaFilter, 
  FaQuestionCircle,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaComment,
  FaClock,
  FaUser,
  FaTags,
  FaCheckCircle,
  FaHeart,
  FaBookmark,
  FaShare,
  FaTimes
} from "react-icons/fa";
import { 
  HiSparkles,
  HiTrendingUp,
  HiClock
} from "react-icons/hi";

// Enhanced sample data with variety
const allQuestions = [
  {
    questionid: 1,
    questionTitle: "How to properly handle async/await in React useEffect?",
    question: "I'm having trouble with async operations in useEffect. Should I create a separate async function inside useEffect or is there a better pattern?",
    questionTag: ['React.js', 'JavaScript', 'Async/Await'],
    author: {
      name: "Sarah Johnson",
      avatar: "👩‍💻",
      reputation: 2845
    },
    votes: 23,
    views: 1542,
    answers: 5,
    createdAt: "2024-01-15T10:30:00Z",
    hasAcceptedAnswer: true,
    difficulty: "intermediate",
    type: "question"
  },
  {
    questionid: 2,
    questionTitle: "Best practices for managing state in large React applications",
    question: "What are the recommended patterns for state management in complex React apps? Should I use Context API, Redux, or Zustand?",
    questionTag: ['React.js', 'State Management', 'Redux', 'Context API'],
    author: {
      name: "Michael Chen",
      avatar: "👨‍💼",
      reputation: 5621
    },
    votes: 45,
    views: 3201,
    answers: 12,
    createdAt: "2024-01-14T15:45:00Z",
    hasAcceptedAnswer: true,
    difficulty: "advanced",
    type: "question"
  },
  {
    questionid: 3,
    questionTitle: "PostgreSQL vs MySQL: Which database for a new project?",
    question: "Starting a new e-commerce project and need to choose between PostgreSQL and MySQL. What are the key differences and use cases?",
    questionTag: ['PostgreSQL', 'MySQL', 'Database', 'Backend'],
    author: {
      name: "Alex Rodriguez",
      avatar: "👨‍🔬",
      reputation: 3456
    },
    votes: 18,
    views: 892,
    answers: 8,
    createdAt: "2024-01-14T09:20:00Z",
    hasAcceptedAnswer: false,
    difficulty: "beginner",
    type: "question"
  },
  {
    questionid: 4,
    questionTitle: "Docker container keeps crashing in production",
    question: "My Docker container runs fine locally but crashes immediately in production. Getting exit code 125. How do I debug this?",
    questionTag: ['Docker', 'DevOps', 'Production', 'Debugging'],
    author: {
      name: "Emma Wilson",
      avatar: "👩‍🔧",
      reputation: 4123
    },
    votes: 67,
    views: 4321,
    answers: 15,
    createdAt: "2024-01-13T14:10:00Z",
    hasAcceptedAnswer: true,
    difficulty: "intermediate",
    type: "question"
  },
  {
    questionid: 5,
    questionTitle: "Implementing JWT authentication in Node.js",
    question: "What's the secure way to implement JWT authentication? Should I store tokens in localStorage or httpOnly cookies?",
    questionTag: ['Node.js', 'JWT', 'Authentication', 'Security'],
    author: {
      name: "David Park",
      avatar: "👨‍💻",
      reputation: 6789
    },
    votes: 34,
    views: 2156,
    answers: 9,
    createdAt: "2024-01-13T11:30:00Z",
    hasAcceptedAnswer: true,
    difficulty: "advanced",
    type: "question"
  },
  {
    questionid: 6,
    questionTitle: "CSS Grid vs Flexbox: When to use which?",
    question: "I'm confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and use cases?",
    questionTag: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    author: {
      name: "Lisa Zhang",
      avatar: "👩‍🎨",
      reputation: 1892
    },
    votes: 28,
    views: 1678,
    answers: 6,
    createdAt: "2024-01-12T16:45:00Z",
    hasAcceptedAnswer: true,
    difficulty: "beginner",
    type: "question"
  },
  {
    questionid: 7,
    questionTitle: "Python FastAPI vs Django: Performance comparison",
    question: "Building a high-traffic API and considering FastAPI vs Django REST. What are the performance implications and trade-offs?",
    questionTag: ['Python', 'FastAPI', 'Django', 'Performance'],
    author: {
      name: "James Miller",
      avatar: "👨‍🔬",
      reputation: 8234
    },
    votes: 52,
    views: 3845,
    answers: 11,
    createdAt: "2024-01-12T08:15:00Z",
    hasAcceptedAnswer: false,
    difficulty: "advanced",
    type: "question"
  },
  {
    questionid: 8,
    questionTitle: "How to optimize React app bundle size?",
    question: "My React app bundle is 2MB+ and loading slowly. What are the best strategies to reduce bundle size and improve performance?",
    questionTag: ['React.js', 'Performance', 'Webpack', 'Optimization'],
    author: {
      name: "Rachel Green",
      avatar: "👩‍💻",
      reputation: 3567
    },
    votes: 41,
    views: 2934,
    answers: 13,
    createdAt: "2024-01-11T13:20:00Z",
    hasAcceptedAnswer: true,
    difficulty: "intermediate",
    type: "question"
  }
];

function Questions() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [questions, setQuestions] = useState(allQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['React hooks', 'JWT authentication', 'Docker deployment']);

  // Handle search from navigation state
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
    }
  }, [location.state]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const suggestions = [];
      
      // Add matching question titles
      const matchingTitles = allQuestions
        .filter(q => q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3)
        .map(q => ({ type: 'question', text: q.questionTitle, icon: '❓' }));
      
      // Add matching tags
      const matchingTags = allTags
        .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3)
        .map(tag => ({ type: 'tag', text: tag, icon: '🏷️' }));
      
      // Add related searches
      const relatedSearches = [
        `${searchTerm} tutorial`,
        `${searchTerm} best practices`,
        `${searchTerm} examples`
      ].map(text => ({ type: 'related', text, icon: '💡' }));

      suggestions.push(...matchingTitles, ...matchingTags, ...relatedSearches.slice(0, 2));
      setSearchSuggestions(suggestions.slice(0, 6));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchTerm.length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    setShowSuggestions(false);
    
    // Add to recent searches if not already there
    if (!recentSearches.includes(suggestion.text)) {
      setRecentSearches([suggestion.text, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !recentSearches.includes(searchTerm.trim())) {
      setRecentSearches([searchTerm.trim(), ...recentSearches.slice(0, 4)]);
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
  };

  // Filter and sort questions
  useEffect(() => {
    let filtered = [...questions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.questionTag.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (filterBy === "answered") {
      filtered = filtered.filter(q => q.hasAcceptedAnswer);
    } else if (filterBy === "unanswered") {
      filtered = filtered.filter(q => !q.hasAcceptedAnswer);
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        selectedTags.every(tag => q.questionTag.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case "votes":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "answers":
        filtered.sort((a, b) => b.answers - a.answers);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, sortBy, filterBy, selectedTags, questions]);

  const handleQuestionClick = (question) => {
    navigate(`/questions/${question.questionid}`, {
      state: {
        questionId: question.questionid,
        title: question.questionTitle,
        description: question.question
      }
    });
  };

  const handleTagClick = (tag) => {
    navigate(`/tag/${tag}`, { state: { questionTag: tag } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays === 0) {
      if (diffHours === 0) return "Just now";
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "#10B981";
      case "intermediate": return "#F59E0B";
      case "advanced": return "#EF4444";
      default: return "#6B7280";
    }
  };

  const allTags = [...new Set(allQuestions.flatMap(q => q.questionTag))];

    return (
    <div className="questions-page">
      <div className="questions-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>All Questions</h1>
            <p className="header-subtitle">
              {filteredQuestions.length} questions found
              {searchTerm && (
                <span className="search-info"> for "<strong>{searchTerm}</strong>"</span>
              )}
            </p>
          </div>
          <button 
            className="ask-question-btn"
            onClick={() => navigate("/askQuestion")}
          >
            <FaQuestionCircle />
            Ask Question
          </button>
        </div>

        {/* Search and Filters */}
        <div className="search-filter-bar">
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search questions, tags, or topics..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={clearSearch}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
                <div className="search-shortcut">
                  <span>⌘K</span>
                </div>
              </div>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
              <div className="search-suggestions">
                <div className="suggestions-content">
                  {searchTerm.length === 0 && recentSearches.length > 0 && (
                    <div className="suggestions-section">
                      <div className="suggestions-header">
                        <span>Recent searches</span>
                        <button 
                          className="clear-recent-btn"
                          onClick={() => setRecentSearches([])}
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          className="suggestion-item recent-search"
                          onClick={() => handleSuggestionClick({ text: search, type: 'recent' })}
                        >
                          <span className="suggestion-icon">🕒</span>
                          <span className="suggestion-text">{search}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchSuggestions.length > 0 && (
                    <div className="suggestions-section">
                      <div className="suggestions-header">
                        <span>Suggestions</span>
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className={`suggestion-item ${suggestion.type}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span className="suggestion-icon">{suggestion.icon}</span>
                          <span className="suggestion-text">{suggestion.text}</span>
                          <span className="suggestion-type">{suggestion.type}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="suggestions-footer">
                    <div className="search-tips">
                      <span>💡 Pro tip: Use quotes for exact matches</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="filter-controls">
            <button 
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="votes">Most Votes</option>
              <option value="views">Most Views</option>
              <option value="answers">Most Answers</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h4>Status</h4>
              <div className="filter-options">
                <button 
                  className={`filter-option ${filterBy === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterBy('all')}
                >
                  All Questions
                </button>
                <button 
                  className={`filter-option ${filterBy === 'answered' ? 'active' : ''}`}
                  onClick={() => setFilterBy('answered')}
                >
                  Answered
                </button>
                <button 
                  className={`filter-option ${filterBy === 'unanswered' ? 'active' : ''}`}
                  onClick={() => setFilterBy('unanswered')}
                >
                  Unanswered
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h4>Popular Tags</h4>
              <div className="tag-filters">
                {allTags.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="questions-list">
          {filteredQuestions.length === 0 ? (
            <div className="no-questions">
              <FaQuestionCircle />
              <h3>No questions found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="btn-primary"
                onClick={() => navigate("/askQuestion")}
              >
                Ask the first question
              </button>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div key={question.questionid} className="question-card">
                <div className="question-stats">
                  <div className="stat-item">
                    <div className="stat-number">{question.votes}</div>
                    <div className="stat-label">votes</div>
                  </div>
                  <div className={`stat-item ${question.hasAcceptedAnswer ? 'answered' : ''}`}>
                    <div className="stat-number">{question.answers}</div>
                    <div className="stat-label">answers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{formatNumber(question.views)}</div>
                    <div className="stat-label">views</div>
                  </div>
                </div>

                <div className="question-content">
                  <div className="question-header">
                    <h3 
                      className="question-title"
                      onClick={() => handleQuestionClick(question)}
                    >
          {question.questionTitle}
                      {question.hasAcceptedAnswer && (
                        <FaCheckCircle className="accepted-icon" />
                      )}
                    </h3>
                    <div 
                      className="difficulty-badge"
                      style={{ color: getDifficultyColor(question.difficulty) }}
                    >
                      {question.difficulty}
                    </div>
                  </div>

                  <p className="question-preview">
                    {question.question}
                  </p>

                  <div className="question-tags">
                    {question.questionTag.map((tag, index) => (
                      <span
                        key={index}
                        className="question-tag"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="question-meta">
                    <div className="author-info">
                      <span className="author-avatar">{question.author.avatar}</span>
                      <div className="author-details">
                        <span className="author-name">{question.author.name}</span>
                        <span className="author-reputation">{formatNumber(question.author.reputation)} rep</span>
                      </div>
                    </div>

                    <div className="question-time">
                      <FaClock />
                      <span>asked {formatDate(question.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="question-actions">
                  <button className="action-btn" title="Vote up">
                    <FaArrowUp />
                  </button>
                  <button className="action-btn" title="Bookmark">
                    <FaBookmark />
                  </button>
                  <button className="action-btn" title="Share">
                    <FaShare />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination would go here */}
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-ellipsis">...</span>
          <button className="page-btn">10</button>
      </div>
      </div>
    </div>
  );
}

export default Questions;
