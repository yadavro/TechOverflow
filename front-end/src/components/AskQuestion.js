import React, { useEffect, useState } from "react";
import "../util/AskQuestion.css";
import TextEditor from "./TextEditot";
import DynamicDropdown from "./DynamicDropdown";
import { 
  FaQuestionCircle, 
  FaLightbulb, 
  FaCode, 
  FaTags, 
  FaRocket, 
  FaCheck,
  FaChevronRight,
  FaChevronLeft,
  FaEdit,
  FaBullseye,
  FaSearch,
  FaPaperPlane,
  FaInfoCircle,
  FaCheckCircle,
  FaArrowRight,
  FaArrowUp,
  FaSave,
  FaEye,
  FaChartLine,
  FaStar,
  FaExclamationTriangle,
  FaTimes,
  FaCloudUploadAlt,
  FaMagic,
  FaHeart,
  FaUserCircle,
  FaBookmark,
  FaShareAlt
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [details, setDetails] = useState("");
  const [findouts, setFindouts] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [questionScore, setQuestionScore] = useState(0);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const steps = [
    { id: 1, title: "Write Title", icon: FaEdit, description: "Summarize your problem" },
    { id: 2, title: "Add Details", icon: FaCode, description: "Describe the problem" },
    { id: 3, title: "Share Attempts", icon: FaBullseye, description: "What you tried" },
    { id: 4, title: "Add Tags", icon: FaTags, description: "Categorize your question" },
    { id: 5, title: "Review", icon: FaRocket, description: "Submit your question" }
  ];

  // Calculate question quality score
  const calculateQuestionScore = () => {
    let score = 0;
    
    // Title quality (0-30 points)
    if (title.length >= 15) score += 10;
    if (title.length >= 30) score += 10;
    if (title.includes('?')) score += 5;
    if (title.toLowerCase().includes('how') || title.toLowerCase().includes('why') || title.toLowerCase().includes('what')) score += 5;
    
    // Details quality (0-40 points)
    if (details.length >= 50) score += 15;
    if (details.length >= 150) score += 15;
    if (details.toLowerCase().includes('expected') || details.toLowerCase().includes('actual')) score += 10;
    
    // Attempts quality (0-20 points)
    if (findouts.length >= 30) score += 10;
    if (findouts.toLowerCase().includes('tried') || findouts.toLowerCase().includes('attempted')) score += 10;
    
    // Tags quality (0-10 points)
    if (tags.length >= 1) score += 5;
    if (tags.length >= 3) score += 5;
    
    return Math.min(score, 100);
  };

  // Auto-save functionality
  const autoSave = () => {
    if (title || details || findouts || tags.length > 0) {
      localStorage.setItem('askQuestion_draft', JSON.stringify({
        title, details, findouts, tags, formStep, timestamp: Date.now()
      }));
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    }
  };

  // Find similar questions (mock implementation)
  const findSimilarQuestions = (searchTitle) => {
    const mockQuestions = [
      { title: "How to handle async operations in JavaScript?", votes: 42 },
      { title: "React useState hook not updating state", votes: 38 },
      { title: "Python list comprehension best practices", votes: 25 },
      { title: "CSS flexbox alignment issues", votes: 31 },
      { title: "SQL join queries optimization", votes: 19 }
    ];
    
    if (searchTitle.length > 10) {
      const filtered = mockQuestions.filter(q => 
        searchTitle.toLowerCase().split(' ').some(word => 
          q.title.toLowerCase().includes(word) && word.length > 3
        )
      );
      setSimilarQuestions(filtered.slice(0, 3));
    } else {
      setSimilarQuestions([]);
    }
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    const totalSteps = 5;
    const completedSteps = formStep - 1;
    const currentStepProgress = 
      formStep === 1 ? (title.length > 0 ? 0.5 : 0) :
      formStep === 2 ? (details.length > 0 ? 0.5 : 0) :
      formStep === 3 ? (findouts.length > 0 ? 0.5 : 0) :
      formStep === 4 ? (tags.length > 0 ? 0.5 : 0) : 1;
    
    return Math.round(((completedSteps + currentStepProgress) / totalSteps) * 100);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with celebration
    setTimeout(() => {
      setShowCelebration(true);
      localStorage.removeItem('askQuestion_draft'); // Clear draft
      
      setTimeout(() => {
        alert(`Question submitted successfully!\n\nTitle: ${title}\nDetails: ${details}\nAttempts: ${findouts}\nTags: ${tags.join(', ')}\nQuality Score: ${questionScore}/100`);
        setIsSubmitting(false);
        setShowCelebration(false);
        
        // Reset form
        setTitle('');
        setDetails('');
        setFindouts('');
        setTags([]);
        setFormStep(1);
      }, 3000);
    }, 1500);
  };

  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
    findSimilarQuestions(value);
    if (errors.title && value.trim()) {
      setErrors(prev => ({ ...prev, title: null }));
    }
  };

  const handleNext = (step) => {
    const newErrors = {};
    
    if (step === 2 && !title.trim()) {
      newErrors.title = "Title is required";
    }
    if (step === 3 && !details.trim()) {
      newErrors.details = "Problem details are required";
    }
    if (step === 4 && !findouts.trim()) {
      newErrors.findouts = "Please describe what you tried";
    }
    if (step === 5 && tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormStep(step);
    setErrors({});
  };

  const handlePrevious = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleStepClick = (targetStep) => {
    // Allow navigation to any completed step or the current step
    if (targetStep <= getMaxAllowedStep()) {
      setFormStep(targetStep);
      setErrors({}); // Clear any errors when navigating
    }
  };

  const getMaxAllowedStep = () => {
    // Users can navigate to any step they've "unlocked" by completing previous steps
    let maxStep = 1;
    
    if (title.trim()) maxStep = Math.max(maxStep, 2);
    if (details.trim()) maxStep = Math.max(maxStep, 3);
    if (findouts.trim()) maxStep = Math.max(maxStep, 4);
    if (tags.length > 0) maxStep = Math.max(maxStep, 5);
    
    return maxStep;
  };

  const isStepClickable = (stepId) => {
    return stepId <= getMaxAllowedStep();
  };

  const handleDetailsChange = (content) => {
    const trimmedText = content.replace(/<p>|<\/p>/g, '');
    setDetails(trimmedText);
    if (errors.details && trimmedText.trim()) {
      setErrors(prev => ({ ...prev, details: null }));
    }
  };

  const handlefindoutsChange = (content) => {
    const trimmedText = content.replace(/<p>|<\/p>/g, '');
    setFindouts(trimmedText);
    if (errors.findouts && trimmedText.trim()) {
      setErrors(prev => ({ ...prev, findouts: null }));
    }
  };

  const handleSelectedTagsChange = (selectedTags) => {
    setTags(selectedTags);
    if (errors.tags && selectedTags.length > 0) {
      setErrors(prev => ({ ...prev, tags: null }));
    }
  };

  // Auto-save every 3 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 3000);
    return () => clearInterval(interval);
  }, [title, details, findouts, tags, formStep]);

  // Update question quality score
  useEffect(() => {
    const score = calculateQuestionScore();
    setQuestionScore(score);
  }, [title, details, findouts, tags]);

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('askQuestion_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        const timeDiff = Date.now() - parsed.timestamp;
        
        // Only restore if draft is less than 24 hours old
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setTitle(parsed.title || '');
          setDetails(parsed.details || '');
          setFindouts(parsed.findouts || '');
          setTags(parsed.tags || []);
          setFormStep(parsed.formStep || 1);
        }
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, []);

  // Handle ESC key to close preview modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showPreview) {
        setShowPreview(false);
      }
    };

    if (showPreview) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Restore scrolling
    };
  }, [showPreview]);
  
  return (
    <div className="ask-question-page">
      <div className="ask-question-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <FaQuestionCircle />
            </div>
            <div className="header-text">
              <h1>Ask a Public Question</h1>
              <p className="header-subtitle">
                Get help from the community by asking a well-structured question
              </p>
            </div>
            <div className="header-decoration">
              <HiSparkles className="sparkle-icon" />
            </div>
          </div>
          
          {/* Progress Bar and Stats */}
          <div className="header-stats">
            <div className="progress-bar-container">
              <div className="progress-info">
                <span className="progress-label">Progress</span>
                <span className="progress-percentage">{getProgressPercentage()}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="quality-score">
              <div className="score-icon">
                <FaChartLine />
              </div>
              <div className="score-info">
                <span className="score-label">Quality Score</span>
                <div className={`score-value ${questionScore >= 80 ? 'excellent' : questionScore >= 60 ? 'good' : questionScore >= 40 ? 'fair' : 'needs-work'}`}>
                  {questionScore}/100
                  <FaStar className="score-star" />
                </div>
              </div>
            </div>
            
            {autoSaved && (
              <div className="auto-save-indicator">
                <FaSave className="save-icon" />
                <span>Draft saved</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="progress-container">
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`progress-step ${formStep >= step.id ? 'active' : ''} ${formStep > step.id ? 'completed' : ''} ${isStepClickable(step.id) ? 'clickable' : 'disabled'}`}
                onClick={() => handleStepClick(step.id)}
                role="button"
                tabIndex={isStepClickable(step.id) ? 0 : -1}
                aria-label={`Go to ${step.title}`}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && isStepClickable(step.id)) {
                    e.preventDefault();
                    handleStepClick(step.id);
                  }
                }}
              >
                <div className="step-connector">
                  {index < steps.length - 1 && <div className="connector-line"></div>}
                </div>
                <div className="step-circle">
                  {formStep > step.id ? (
                    <FaCheck className="check-icon" />
                  ) : (
                    <step.icon className="step-icon" />
                  )}
                </div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                  {isStepClickable(step.id) && formStep !== step.id && (
                    <div className="click-hint">
                      <span>Click to navigate</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Guidelines */}
            <div className="guidelines-section">
              <div className="guidelines-header">
                <FaLightbulb className="guidelines-icon" />
                <h3>Writing a Good Question</h3>
              </div>
              <div className="guidelines-content">
                <p>
                  You're ready to ask a programming-related question. This form will guide you through creating a question that gets great answers.
                </p>
                <div className="tips-grid">
                  <div className="tip-card">
                    <FaSearch className="tip-icon" />
                    <span>Be specific and detailed</span>
                  </div>
                  <div className="tip-card">
                    <FaCode className="tip-icon" />
                    <span>Include relevant code</span>
                  </div>
                  <div className="tip-card">
                    <FaTags className="tip-icon" />
                    <span>Use appropriate tags</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Title */}
            <div className={`form-section ${formStep >= 1 ? 'active' : ''}`}>
              <div className="section-header">
                <div className="section-number">1</div>
                <div className="section-title">
                  <h3>Question Title</h3>
                  <p>Be specific and imagine you're asking a question to another person.</p>
                </div>
              </div>
              
              <div className="input-group">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="e.g. How do I find the index of an element in a JavaScript array?"
                    onChange={handleTitle}
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    disabled={formStep < 1}
                  />
                  <div className="input-icon">
                    <FaEdit />
                  </div>
                </div>
                {errors.title && (
                  <div className="error-message">
                    <FaInfoCircle />
                    <span>{errors.title}</span>
                  </div>
                )}
                <div className="input-help">
                  <span className="char-count">{title.length}/150 characters</span>
                </div>
              </div>

              {formStep === 1 && (
                <div className="section-actions">
                  <button
                    className="next-btn"
                    type="button"
                    onClick={() => handleNext(2)}
                    disabled={!title.trim()}
                  >
                    <span>Continue</span>
                    <FaChevronRight />
                  </button>
                </div>
              )}

              {/* Similar Questions */}
              {similarQuestions.length > 0 && formStep === 1 && (
                <div className="similar-questions">
                  <div className="similar-header">
                    <FaExclamationTriangle className="warning-icon" />
                    <h4>Similar questions found</h4>
                  </div>
                  <p>Check if these existing questions answer your problem:</p>
                  <div className="similar-list">
                    {similarQuestions.map((q, index) => (
                      <div key={index} className="similar-item">
                        <div className="similar-content">
                          <h5>{q.title}</h5>
                          <div className="similar-stats">
                            <span className="votes">{q.votes} votes</span>
                          </div>
                        </div>
                        <button className="view-similar-btn">
                          <FaEye />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Problem Details */}
            <div className={`form-section ${formStep >= 2 ? 'active' : ''}`}>
              <div className="section-header">
                <div className="section-number">2</div>
                <div className="section-title">
                  <h3>Problem Details</h3>
                  <p>Introduce the problem and expand on what you put in the title. Minimum 30 characters.</p>
                </div>
              </div>

              {formStep >= 2 && (
                <div className="editor-container">
                  <TextEditor
                    nextClick={() => handleNext(3)}
                    onContentChange={handleDetailsChange}
                  />
                  {errors.details && (
                    <div className="error-message">
                      <FaInfoCircle />
                      <span>{errors.details}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 3: What You Tried */}
            <div className={`form-section ${formStep >= 3 ? 'active' : ''}`}>
              <div className="section-header">
                <div className="section-number">3</div>
                <div className="section-title">
                  <h3>What Did You Try?</h3>
                  <p>Describe what you tried, what you expected, and what actually happened. Minimum 30 characters.</p>
                </div>
              </div>

              {formStep >= 3 && (
                <div className="editor-container">
                  <TextEditor
                    nextClick={() => handleNext(4)}
                    onContentChange={handlefindoutsChange}
                  />
                  {errors.findouts && (
                    <div className="error-message">
                      <FaInfoCircle />
                      <span>{errors.findouts}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 4: Tags */}
            <div className={`form-section ${formStep >= 4 ? 'active' : ''}`}>
              <div className="section-header">
                <div className="section-number">4</div>
                <div className="section-title">
                  <h3>Tags</h3>
                  <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                </div>
              </div>

              {formStep >= 4 && (
                <div className="tags-container">
                  <DynamicDropdown onSelectedOptionsChange={handleSelectedTagsChange} />
                  {errors.tags && (
                    <div className="error-message">
                      <FaInfoCircle />
                      <span>{errors.tags}</span>
                    </div>
                  )}
                  <div className="tags-help">
                    <span>Popular tags: react, javascript, python, css, html</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Section */}
            {formStep >= 4 && (
              <div className="submit-section">
                <div className="submit-header">
                  <h3>Ready to Submit</h3>
                  <p>Review your question and submit it to the community</p>
                  
                  {/* Preview Toggle */}
                  <div className="preview-controls">
                    <button
                      type="button"
                      className={`preview-btn ${showPreview ? 'active' : ''}`}
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <FaEye />
                      <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                    </button>
                  </div>
                </div>



                {/* Navigation and Submit */}
                <div className="final-actions">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                  >
                    <FaChevronLeft />
                    <span>Back</span>
                  </button>
                  
                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={formStep < 4 || isSubmitting}
                  >
                    <div className="btn-content">
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Submit Question</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step Navigation for other steps */}
            {formStep > 1 && formStep < 4 && (
              <div className="step-navigation">
                <button
                  type="button"
                  className="back-btn"
                  onClick={handlePrevious}
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>
                
                <button
                  type="button"
                  className="next-btn"
                  onClick={() => handleNext(formStep + 1)}
                  disabled={
                    (formStep === 2 && !details.trim()) ||
                    (formStep === 3 && !findouts.trim())
                  }
                >
                  <span>Continue</span>
                  <FaChevronRight />
                </button>
              </div>
            )}
          </form>

          {/* Success Celebration */}
          {showCelebration && (
            <div className="celebration-overlay">
              <div className="celebration-content">
                <div className="success-animation">
                  <div className="checkmark">
                    <FaCheckCircle />
                  </div>
                  <div className="confetti">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className={`confetti-piece confetti-${i % 4}`}></div>
                    ))}
                  </div>
                </div>
                <h2>Question Submitted Successfully!</h2>
                <p>Your question has been posted to the community</p>
                <div className="celebration-score">
                  <FaHeart className="heart-icon" />
                  <span>Quality Score: {questionScore}/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Question Preview Modal - Moved outside container for proper overlay */}
      {showPreview && (
        <div 
          className="preview-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPreview(false);
            }
          }}
        >
          <div className="preview-modal">
            <div className="preview-modal-header">
              <div className="preview-title-section">
                <FaMagic className="preview-icon" />
                <h3>Question Preview</h3>
              </div>
              <button
                className="preview-close-btn"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="preview-modal-content">
              <div className="preview-question-card">
                <div className="preview-question-header">
                  <h2 className="preview-question-title">
                    {title || 'Your question title will appear here...'}
                  </h2>
                  <div className="preview-question-meta">
                    <div className="preview-author">
                      <FaUserCircle className="author-avatar" />
                      <span>You</span>
                    </div>
                    <div className="preview-stats">
                      <span className="preview-timestamp">asked just now</span>
                    </div>
                  </div>
                </div>

                <div className="preview-question-body">
                  <div className="preview-section">
                    <h4>Problem Description:</h4>
                    <div className="preview-content-block">
                      {details ? (
                        <p>{details}</p>
                      ) : (
                        <p className="preview-placeholder">Your detailed problem description will appear here...</p>
                      )}
                    </div>
                  </div>

                  <div className="preview-section">
                    <h4>What I've Tried:</h4>
                    <div className="preview-content-block">
                      {findouts ? (
                        <p>{findouts}</p>
                      ) : (
                        <p className="preview-placeholder">Your attempts and expected results will appear here...</p>
                      )}
                    </div>
                  </div>

                  <div className="preview-section">
                    <h4>Tags:</h4>
                    <div className="preview-tags-container">
                      {tags.length > 0 ? (
                        tags.map((tag, index) => (
                          <span key={index} className="preview-tag">{tag}</span>
                        ))
                      ) : (
                        <span className="preview-placeholder">Your selected tags will appear here...</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="preview-question-footer">
                  <div className="preview-actions">
                    <button className="preview-action-btn">
                      <FaArrowUp />
                      <span>0</span>
                    </button>
                    <button className="preview-action-btn">
                      <FaBookmark />
                    </button>
                    <button className="preview-action-btn">
                      <FaShareAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-modal-footer">
              <div className="preview-modal-actions">
                <button
                  className="preview-edit-btn"
                  onClick={() => setShowPreview(false)}
                >
                  <FaEdit />
                  <span>Continue Editing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;
