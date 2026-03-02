import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  
  // 1. State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'user' // Defaults to a regular renter/user
  });

  // State for showing success/error messages
  const [message, setMessage] = useState('');

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    try {
      // Send the POST request to our Node.js backend
      const response = await axios.post('http://localhost:8000/api/user/register', formData);
      
      setMessage('Registration successful! Redirecting to login...');
      
      // Wait 2 seconds, then send them to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Grab the error message from the backend if it exists
      setMessage(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="auth-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --primary-gold: #C9A962;
          --primary-dark: #1a1a1a;
          --primary-light: #f8f7f4;
          --accent-navy: #2c3e50;
          --text-primary: #1a1a1a;
          --text-secondary: #5a5a5a;
          --error-red: #e74c3c;
          --success-green: #27ae60;
        }

        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Montserrat', sans-serif;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="40" fill="white" opacity="0.03"/></svg>');
          background-size: 50px 50px;
          animation: patternMove 20s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .auth-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 3rem;
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--primary-gold), var(--accent-navy));
          border-radius: 24px 24px 0 0;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .auth-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-dark);
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .auth-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .message {
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message.success {
          background: rgba(39, 174, 96, 0.1);
          color: var(--success-green);
          border: 1px solid rgba(39, 174, 96, 0.3);
        }

        .message.error {
          background: rgba(231, 76, 60, 0.1);
          color: var(--error-red);
          border: 1px solid rgba(231, 76, 60, 0.3);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }

        .form-input {
          padding: 1rem 1.25rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Montserrat', sans-serif;
          color: var(--text-primary);
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-gold);
          box-shadow: 0 0 0 4px rgba(201, 169, 98, 0.1);
          transform: translateY(-2px);
        }

        .form-input::placeholder {
          color: #aaa;
        }

        .form-select {
          padding: 1rem 1.25rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Montserrat', sans-serif;
          color: var(--text-primary);
          transition: all 0.3s ease;
          background: white;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%235a5a5a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.25rem center;
          padding-right: 3rem;
        }

        .form-select:focus {
          outline: none;
          border-color: var(--primary-gold);
          box-shadow: 0 0 0 4px rgba(201, 169, 98, 0.1);
          transform: translateY(-2px);
        }

        .submit-button {
          padding: 1.1rem;
          background: var(--primary-gold);
          color: var(--primary-dark);
          border: none;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: var(--accent-navy);
          transition: all 0.5s ease;
          transform: translate(-50%, -50%);
        }

        .submit-button:hover::before {
          width: 500px;
          height: 500px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 169, 98, 0.4);
          color: white;
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .submit-button span {
          position: relative;
          z-index: 1;
        }

        .auth-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e0e0e0;
        }

        .auth-footer-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .auth-link {
          color: var(--primary-gold);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
        }

        .auth-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-gold);
          transition: width 0.3s ease;
        }

        .auth-link:hover::after {
          width: 100%;
        }

        .auth-link:hover {
          color: var(--accent-navy);
        }

        .back-home {
          display: inline-block;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .back-home:hover {
          color: var(--primary-gold);
          transform: translateX(-3px);
        }

        /* Security Badge */
        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .security-icon {
          width: 16px;
          height: 16px;
          fill: var(--success-green);
        }

        /* User Type Helper */
        .user-type-hint {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
          margin-top: 0.3rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .auth-container {
            padding: 1rem;
          }

          .auth-card {
            padding: 2rem 1.5rem;
          }

          .auth-title {
            font-size: 1.5rem;
          }

          .auth-logo {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <div className="auth-card">
        <Link to="/" className="back-home">← Back to Home</Link>
        
        <div className="auth-header">
          <div className="auth-logo">HouseRent</div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us to find your perfect home</p>
        </div>

        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              placeholder="Enter your phone number" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a strong password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">I am a</label>
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleChange} 
              required
              className="form-select"
            >
              <option value="user">Renter - Looking for a home</option>
              <option value="owner">Owner - Listing properties</option>
              <option value="admin">Administrator</option>
            </select>
            <p className="user-type-hint">Choose your account type based on your needs</p>
          </div>

          <button type="submit" className="submit-button">
            <span>Create Account</span>
          </button>
        </form>

        <div className="security-badge">
          <svg className="security-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <span>Secure encrypted connection</span>
        </div>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-link">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;