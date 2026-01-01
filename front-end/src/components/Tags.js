import React, { useState } from 'react'
import "../util/Tags.css";
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTags, FaHashtag, FaQuestionCircle, FaCode, FaDatabase, FaMobile, FaDesktop } from 'react-icons/fa';
const tags=[
    {
        tagId:1,
        tagTitle:"python",
        tagContent:"Python is a high-level, interpreted programming language with dynamic semantics. Its high-level built-in data structures make it ideal for web development, data analysis, and machine learning.",
        questionCount: 1248,
        icon: "FaCode",
        color: "#3776ab"
    },
    {
        tagId:2,
        tagTitle:"java",
        tagContent:"Java is a class-based, object-oriented programming language designed for portability across platforms. It's widely used for enterprise applications and Android development.",
        questionCount: 987,
        icon: "FaCode",
        color: "#f89820"
    },
    {
        tagId:3,
        tagTitle:"javascript",
        tagContent:"JavaScript is a versatile programming language primarily used for web development. It enables interactive web pages and is an essential part of web applications.",
        questionCount: 2156,
        icon: "FaCode",
        color: "#f7df1e"
    },
    {
        tagId:4,
        tagTitle:"react",
        tagContent:"React is a JavaScript library for building user interfaces, maintained by Facebook. It's used for developing single-page applications with component-based architecture.",
        questionCount: 834,
        icon: "FaDesktop",
        color: "#61dafb"
    },
    {
        tagId:5,
        tagTitle:"nodejs",
        tagContent:"Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript on the server-side for building scalable network applications.",
        questionCount: 672,
        icon: "FaCode",
        color: "#339933"
    },
    {
        tagId:6,
        tagTitle:"database",
        tagContent:"Database questions cover SQL, NoSQL, data modeling, optimization, and database management systems. Common topics include MySQL, PostgreSQL, MongoDB.",
        questionCount: 543,
        icon: "FaDatabase",
        color: "#336791"
    },
    {
        tagId:7,
        tagTitle:"html",
        tagContent:"HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of web content.",
        questionCount: 756,
        icon: "FaDesktop",
        color: "#e34c26"
    },
    {
        tagId:8,
        tagTitle:"css",
        tagContent:"CSS (Cascading Style Sheets) is used for styling HTML elements. It controls layout, colors, fonts, and overall visual appearance of web pages.",
        questionCount: 689,
        icon: "FaDesktop",
        color: "#1572b6"
    },
    {
        tagId:9,
        tagTitle:"mobile-development",
        tagContent:"Mobile development encompasses creating applications for mobile devices including iOS, Android, React Native, Flutter, and cross-platform solutions.",
        questionCount: 445,
        icon: "FaMobile",
        color: "#25d366"
    },
    {
        tagId:10,
        tagTitle:"algorithms",
        tagContent:"Algorithm questions cover data structures, sorting, searching, dynamic programming, and computational complexity. Essential for technical interviews.",
        questionCount: 398,
        icon: "FaCode",
        color: "#ff6b6b"
    },
    {
        tagId:11,
        tagTitle:"machine-learning",
        tagContent:"Machine Learning involves algorithms that allow computers to learn and make decisions from data. Covers topics like neural networks, deep learning, and AI.",
        questionCount: 312,
        icon: "FaCode",
        color: "#4ecdc4"
    },
    {
        tagId:12,
        tagTitle:"api",
        tagContent:"API (Application Programming Interface) questions cover REST, GraphQL, authentication, integration, and web service development and consumption.",
        questionCount: 567,
        icon: "FaCode",
        color: "#45b7d1"
    }
]

function Tags() {
    const [inputValue, setInputValue] = useState('');
    const [filteredTags, setFilteredTags] = useState(tags);
    const navigate=useNavigate();
  
    // Function to filter tags based on the input value
    const filterTags = () => {
      if (inputValue.length >= 3) {
        const filtered = tags.filter(tag => 
          tag.tagTitle.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredTags(filtered);
      } else {
        setFilteredTags(tags); // Show all tags if less than 3 characters are entered
      }
    };
  
    // Handle Enter key press
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        filterTags();
      }
    };
    const handleClick=(tag)=>{
        navigate(`/tag/${tag}`,{state:{questionTag:tag}});
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        filterTags(value);
      };
  
        const getIcon = (iconName) => {
        const iconMap = {
            FaCode: FaCode,
            FaDatabase: FaDatabase,
            FaMobile: FaMobile,
            FaDesktop: FaDesktop
        };
        const IconComponent = iconMap[iconName] || FaHashtag;
        return <IconComponent />;
    };

    return (
    <div className='tags-container'>
        <div className='tags-header'>
            <div className='header-content'>
                <div className='header-icon'>
                    <FaTags />
                </div>
                <div className='header-text'>
                    <h1 className='tags-title'>Explore Tags</h1>
                    <p className='tags-subtitle'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
                </div>
            </div>
            
            <div className='search-section'>
                <div className='search-wrapper'>
                    <FaSearch className='search-icon' />
                    <input
                      type="text"
                      placeholder="Search tags (type at least 3 characters)..."
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="tag-search-input"
                    />
                    {inputValue && (
                        <button 
                            className='clear-search'
                            onClick={() => {setInputValue(''); setFilteredTags(tags);}}
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className='search-stats'>
                    Showing {filteredTags.length} of {tags.length} tags
                </div>
            </div>
        </div>

        <div className='tags-grid'>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag, index) => (
              <div 
                key={tag.tagId} 
                className='tag-card'
                style={{'--animation-delay': `${index * 0.1}s`}}
                onClick={() => handleClick(tag.tagTitle)}
              >
                <div className='tag-card-header'>
                    <div 
                        className='tag-icon'
                        style={{'--tag-color': tag.color}}
                    >
                        {getIcon(tag.icon)}
                    </div>
                    <div className='tag-info'>
                        <h3 className='tag-name'>{tag.tagTitle}</h3>
                        <div className='tag-stats'>
                            <FaQuestionCircle className='stats-icon' />
                            <span>{tag.questionCount.toLocaleString()} questions</span>
                        </div>
                    </div>
                </div>
                <p className='tag-description'>{tag.tagContent}</p>
                <div className='tag-card-footer'>
                    <span className='explore-text'>Click to explore →</span>
                </div>
              </div>
            ))
          ) : (
            <div className='no-tags-found'>
                <div className='no-tags-icon'>
                    <FaSearch />
                </div>
                <h3>No matching tags found</h3>
                <p>Try adjusting your search term or browse all available tags.</p>
                <button 
                    className='reset-search-btn'
                    onClick={() => {setInputValue(''); setFilteredTags(tags);}}
                >
                    Show All Tags
                </button>
            </div>
          )}
        </div>
      </div>
    );
  }
export default Tags
