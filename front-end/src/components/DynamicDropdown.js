import React, { useState, useRef, useEffect } from "react";
import "../util/DynamicDropdown.css";
import { FaTags, FaSearch, FaTimes, FaPlus, FaCode, FaDesktop, FaDatabase, FaMobile, FaCloud, FaRobot, FaGamepad } from "react-icons/fa";
function DynamicDropdown({onSelectedOptionsChange}) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const maxTags = 5;
  const tagCategories = {
    "Programming Languages": {
      icon: FaCode,
      color: "#3b82f6",
      tags: ["javascript", "python", "java", "typescript", "c++", "c#", "php", "ruby", "go", "rust", "swift", "kotlin", "scala", "r", "matlab", "perl"]
    },
    "Web Development": {
      icon: FaDesktop,
      color: "#10b981",
      tags: ["html", "css", "react", "vue.js", "angular", "node.js", "express", "next.js", "nuxt.js", "svelte", "bootstrap", "tailwind-css", "sass", "webpack", "babel"]
    },
    "Database": {
      icon: FaDatabase,
      color: "#8b5cf6",
      tags: ["mysql", "postgresql", "mongodb", "redis", "sqlite", "oracle", "cassandra", "elasticsearch", "firebase", "supabase", "prisma", "sequelize"]
    },
    "Mobile Development": {
      icon: FaMobile,
      color: "#f59e0b",
      tags: ["react-native", "flutter", "ionic", "xamarin", "android", "ios", "swift", "kotlin", "cordova", "expo"]
    },
    "Cloud & DevOps": {
      icon: FaCloud,
      color: "#06b6d4",
      tags: ["aws", "azure", "google-cloud", "docker", "kubernetes", "jenkins", "gitlab-ci", "github-actions", "terraform", "ansible", "nginx", "apache"]
    },
    "AI & Machine Learning": {
      icon: FaRobot,
      color: "#ef4444",
      tags: ["machine-learning", "artificial-intelligence", "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy", "jupyter", "opencv", "nlp", "deep-learning"]
    },
    "Game Development": {
      icon: FaGamepad,
      color: "#8b5cf6",
      tags: ["unity", "unreal-engine", "godot", "pygame", "phaser", "three.js", "webgl", "opengl", "directx", "c++", "c#", "lua"]
    }
  };

  const allOptions = Object.values(tagCategories).flatMap(category => category.tags);

  // Get category for a tag
  const getCategoryForTag = (tag) => {
    for (const [categoryName, categoryData] of Object.entries(tagCategories)) {
      if (categoryData.tags.includes(tag)) {
        return { name: categoryName, ...categoryData };
      }
    }
    return { name: "Other", icon: FaTags, color: "#6b7280" };
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFocusedIndex(-1);
    
    if (value.trim()) {
      const filteredOptions = allOptions
        .filter((option) =>
          option.toLowerCase().includes(value.toLowerCase()) &&
          !selectedOptions.includes(option)
        )
        .slice(0, 10); // Limit to 10 suggestions
      
      setDropdownOptions(filteredOptions);
      setIsDropdownOpen(true);
    } else {
      setDropdownOptions([]);
      setIsDropdownOpen(false);
    }
  };
  const handleSelectOption = (option) => {
    if (selectedOptions.length >= maxTags) return;
    
    const updatedOptions = [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    setDropdownOptions([]);
    setInputValue("");
    setIsDropdownOpen(false);
    setFocusedIndex(-1);
    onSelectedOptionsChange(updatedOptions);
    
    // Refocus input for better UX
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter((opt) => opt !== option);
    setSelectedOptions(updatedOptions);
    onSelectedOptionsChange(updatedOptions);
  };

  const handleKeyDown = (event) => {
    if (!isDropdownOpen || dropdownOptions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < dropdownOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < dropdownOptions.length) {
          handleSelectOption(dropdownOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
        break;
      case 'Backspace':
        if (!inputValue && selectedOptions.length > 0) {
          event.preventDefault();
          handleRemoveOption(selectedOptions[selectedOptions.length - 1]);
        }
        break;
    }
  };

  const handleInputFocus = () => {
    if (inputValue.trim() && dropdownOptions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleInputBlur = (event) => {
    // Delay closing to allow clicking on dropdown options
    setTimeout(() => {
      if (!dropdownRef.current?.contains(event.relatedTarget)) {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
      }
    }, 150);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="modern-tag-selector" ref={dropdownRef}>
      {/* Selected Tags Display */}
      {selectedOptions.length > 0 && (
        <div className="selected-tags-container">
          <div className="selected-tags-header">
            <FaTags className="selected-tags-icon" />
            <span className="selected-count">{selectedOptions.length}/{maxTags} tags selected</span>
          </div>
          <div className="selected-tags-list">
            {selectedOptions.map((option, index) => {
              const category = getCategoryForTag(option);
              const IconComponent = category.icon;
              return (
                <div 
                  key={index} 
                  className="selected-tag-chip"
                  style={{'--category-color': category.color}}
                >
                  <IconComponent className="tag-category-icon" />
                  <span className="tag-name">{option}</span>
                  <button 
                    className="remove-tag-btn"
                    onClick={() => handleRemoveOption(option)}
                    aria-label={`Remove ${option} tag`}
                  >
                    <FaTimes />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tag Input */}
      <div className="tag-input-container">
        <div className="tag-input-wrapper">
          <FaSearch className="input-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="modern-tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              selectedOptions.length >= maxTags 
                ? `Maximum ${maxTags} tags selected` 
                : "Search and select tags... (e.g., react, javascript, python)"
            }
            disabled={selectedOptions.length >= maxTags}
            maxLength={50}
          />
          {selectedOptions.length >= maxTags && (
            <div className="max-tags-indicator">
              <span>Max {maxTags}</span>
            </div>
          )}
        </div>
        
        {/* Tag limit indicator */}
        <div className="tag-input-footer">
          <div className="tag-counter">
            <span className={`counter ${selectedOptions.length >= maxTags ? 'limit-reached' : ''}`}>
              {selectedOptions.length}/{maxTags}
            </span>
          </div>
          {inputValue && (
            <div className="search-status">
              {dropdownOptions.length} suggestion{dropdownOptions.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {isDropdownOpen && dropdownOptions.length > 0 && (
        <div className="modern-dropdown">
          <div className="dropdown-header">
            <FaPlus className="dropdown-icon" />
            <span>Select from suggestions</span>
          </div>
          <ul className="dropdown-list">
            {dropdownOptions.map((option, index) => {
              const category = getCategoryForTag(option);
              const IconComponent = category.icon;
              return (
                <li
                  key={index}
                  className={`dropdown-option ${index === focusedIndex ? 'focused' : ''}`}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  style={{'--category-color': category.color}}
                >
                  <div className="option-icon">
                    <IconComponent />
                  </div>
                  <div className="option-content">
                    <span className="option-name">{option}</span>
                    <span className="option-category">{category.name}</span>
                  </div>
                  <div className="option-action">
                    <FaPlus />
                  </div>
                </li>
              );
            })}
          </ul>
          {dropdownOptions.length === 0 && inputValue && (
            <div className="no-options">
              <FaSearch className="no-options-icon" />
              <span>No tags found for "{inputValue}"</span>
            </div>
          )}
        </div>
      )}

      {/* Popular Tags Suggestions */}
      {selectedOptions.length === 0 && !inputValue && (
        <div className="popular-tags-section">
          <div className="popular-tags-header">
            <span className="popular-label">Popular tags:</span>
          </div>
          <div className="popular-tags-grid">
            {["javascript", "python", "react", "html", "css", "java", "node.js", "typescript"].map((tag) => {
              const category = getCategoryForTag(tag);
              const IconComponent = category.icon;
              return (
                <button
                  key={tag}
                  className="popular-tag-btn"
                  onClick={() => handleSelectOption(tag)}
                  style={{'--category-color': category.color}}
                >
                  <IconComponent className="popular-tag-icon" />
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicDropdown;
