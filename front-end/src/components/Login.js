import React, { useEffect, useState } from "react";
import "../util/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  FaEnvelope, 
  FaLock, 
  FaSignInAlt, 
  FaEye, 
  FaEyeSlash,
  FaSpinner,
  FaUserPlus,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      // Clear email error when user starts typing
      if (errors.email) {
        setErrors(prev => ({...prev, email: ''}));
      }
    } else if (name === "password") {
      setPassword(value);
      // Clear password error when user starts typing
      if (errors.password) {
        setErrors(prev => ({...prev, password: ''}));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmit(true);
    setIsLoading(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  useEffect(() => {
    if (submit) {
      // Simulate API call with timeout
      setTimeout(() => {
        alert(`email: ${email} and password: ${password}`);
        axios
          .post("/api", { email, password })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            setErrors({ general: 'Invalid credentials. Please try again.' });
          })
          .finally(() => {
            setSubmit(false);
            setIsLoading(false);
          });
      }, 1000); // 1 second delay to show loading state
    }
  }, [submit, email, password]);

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header Section */}
        <div className="login-header">
          <div className="login-icon">
            <FaShieldAlt />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your techOverflow account</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* General Error Message */}
          {errors.general && (
            <div className="error-banner">
              <FaExclamationTriangle />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''} ${email && !errors.email ? 'success' : ''}`}>
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="Enter your email address"
                disabled={isLoading}
                autoComplete="email"
              />
              {email && !errors.email && (
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
            <div className={`input-wrapper ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'error' : ''} ${password && !errors.password ? 'success' : ''}`}>
              <FaLock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
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
            {errors.password && (
              <div className="error-message">
                <FaExclamationTriangle />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Sign Up Link */}
          <div className="signup-prompt">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-link">
              <FaUserPlus />
              <span>Create Account</span>
            </Link>
          </div>
        </form>
      </div>
      
      {/* Background Decorations */}
      <div className="login-background">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>
      </div>
    </div>
  );
}

export default Login;
