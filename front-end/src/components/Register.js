import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "../util/Register.css";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaSpinner,
  FaSignInAlt,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUserFriends,
  FaCheck,
  FaTimes
} from "react-icons/fa";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirmpassword: "",
  submitted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SUBMIT_FORM":
      return {
        ...state,
        submitted: true,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

function Register() {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: value,
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    // Clear confirm password error when passwords match
    if (name === 'confirmpassword' && value === formData.password) {
      setErrors(prev => ({...prev, confirmpassword: ''}));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fname.trim()) {
      newErrors.fname = 'First name is required';
    } else if (formData.fname.length < 2) {
      newErrors.fname = 'First name must be at least 2 characters';
    }
    
    if (!formData.lname.trim()) {
      newErrors.lname = 'Last name is required';
    } else if (formData.lname.length < 2) {
      newErrors.lname = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmpassword.trim()) {
      newErrors.confirmpassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      alert(
        `fname:${formData.fname} \n lname:${formData.lname}\n email:${formData.email}\n password:${formData.password} \n confirmpassword: ${formData.confirmpassword}`
      );
      
      axios
        .post("/postregister", {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          setErrors({ general: 'Registration failed. Please try again.' });
        })
        .finally(() => {
          setIsLoading(false);
        });
        
      dispatch({
        type: "SUBMIT_FORM",
      });
    }, 1500); // 1.5 second delay to show loading state
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f59e0b';
    if (passwordStrength < 75) return '#3b82f6';
    return '#10b981';
  };

  useEffect(() => {
    if (formData.submitted) {
      console.log("Form has been submitted!");
      dispatch({ type: "RESET_FORM" });
      setPasswordStrength(0);
    }
  }, [formData.submitted]);

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Header Section */}
        <div className="register-header">
          <div className="register-icon">
            <FaUserPlus />
          </div>
          <h1>Join techOverflow</h1>
          <p>Create your account and start learning</p>
        </div>

        {/* Register Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* General Error Message */}
          {errors.general && (
            <div className="error-banner">
              <FaExclamationTriangle />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Name Fields Row */}
          <div className="name-row">
            {/* First Name Input */}
            <div className="input-group">
              <label htmlFor="fname">First Name</label>
              <div className={`input-wrapper ${focusedField === 'fname' ? 'focused' : ''} ${errors.fname ? 'error' : ''} ${formData.fname && !errors.fname ? 'success' : ''}`}>
                <FaUser className="input-icon" />
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  value={formData.fname}
                  onChange={handleChange}
                  onFocus={() => handleFocus('fname')}
                  onBlur={handleBlur}
                  placeholder="Enter your first name"
                  disabled={isLoading}
                  autoComplete="given-name"
                />
                {formData.fname && !errors.fname && (
                  <FaCheckCircle className="success-icon" />
                )}
              </div>
              {errors.fname && (
                <div className="error-message">
                  <FaExclamationTriangle />
                  <span>{errors.fname}</span>
                </div>
              )}
            </div>

            {/* Last Name Input */}
            <div className="input-group">
              <label htmlFor="lname">Last Name</label>
              <div className={`input-wrapper ${focusedField === 'lname' ? 'focused' : ''} ${errors.lname ? 'error' : ''} ${formData.lname && !errors.lname ? 'success' : ''}`}>
                <FaUser className="input-icon" />
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  value={formData.lname}
                  onChange={handleChange}
                  onFocus={() => handleFocus('lname')}
                  onBlur={handleBlur}
                  placeholder="Enter your last name"
                  disabled={isLoading}
                  autoComplete="family-name"
                />
                {formData.lname && !errors.lname && (
                  <FaCheckCircle className="success-icon" />
                )}
              </div>
              {errors.lname && (
                <div className="error-message">
                  <FaExclamationTriangle />
                  <span>{errors.lname}</span>
                </div>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${formData.email && !errors.email ? 'success' : ''}`}>
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="Enter your email address"
                disabled={isLoading}
                autoComplete="email"
              />
              {formData.email && !errors.email && (
                <FaCheckCircle className="success-icon" />
              )}
            </div>
            {errors.email && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''} ${formData.password && !errors.password ? 'success' : ''}`}>
              <FaLock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${passwordStrength}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                </div>
                <div className="strength-label" style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthLabel()}
                </div>
              </div>
            )}
            
            {errors.password && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="input-group">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className={`input-wrapper ${focusedField === 'confirmpassword' ? 'focused' : ''} ${errors.confirmpassword ? 'error' : ''} ${formData.confirmpassword && !errors.confirmpassword && formData.password === formData.confirmpassword ? 'success' : ''}`}>
              <FaLock className="input-icon" />
              <input
                id="confirmpassword"
                name="confirmpassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmpassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmpassword')}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {formData.confirmpassword && formData.password && (
              <div className={`password-match ${formData.password === formData.confirmpassword ? 'match' : 'no-match'}`}>
                {formData.password === formData.confirmpassword ? (
                  <>
                    <FaCheck />
                    <span>Passwords match</span>
                  </>
                ) : (
                  <>
                    <FaTimes />
                    <span>Passwords do not match</span>
                  </>
                )}
              </div>
            )}
            
            {errors.confirmpassword && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{errors.confirmpassword}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <FaUserPlus />
                <span>Create Account</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Login Link */}
          <div className="login-prompt">
            <p>Already have an account?</p>
            <Link to="/login" className="login-link">
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
          </div>
        </form>
      </div>
      
      {/* Background Decorations */}
      <div className="register-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
        <div className="background-shape shape-4"></div>
      </div>
    </div>
  );
}

export default Register;
