import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RenterHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Renter');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap');

        :root {
          --primary-gold: #C9A962;
          --primary-dark: #1a1a1a;
          --accent-navy: #2c3e50;
          --accent-blue: #3498db;
          --text-primary: #1a1a1a;
          --text-secondary: #5a5a5a;
          --background-light: #f8f9fa;
          --background-white: #ffffff;
          --border-color: #e0e4e8;
          --danger-red: #e74c3c;
        }

        .dashboard-page {
          min-height: 100vh;
          background: var(--background-light);
          font-family: 'Montserrat', sans-serif;
          padding: 2.5rem;
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-card {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-navy) 100%);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 3rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          position: relative;
          overflow: hidden;
          animation: slideDown 0.6s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(30%, -30%);
        }

        .welcome-header {
          position: relative;
          z-index: 1;
        }

        .welcome-greeting {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary-gold);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .welcome-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
          max-width: 600px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .action-card {
          background: var(--background-white);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
        }

        .action-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .action-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .action-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-gold), var(--accent-navy));
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .action-card:hover::before {
          transform: scaleX(1);
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-gold);
        }

        .action-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-card.disabled:hover {
          transform: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border-color: transparent;
        }

        .action-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, var(--primary-gold), #d4af37);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(201, 169, 98, 0.3);
        }

        .action-card.disabled .action-icon {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
        }

        .action-icon svg {
          width: 28px;
          height: 28px;
          fill: white;
        }

        .action-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .action-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-gold);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: gap 0.3s ease;
        }

        .action-card:hover .action-link {
          gap: 0.75rem;
        }

        .logout-section {
          display: flex;
          justify-content: center;
          animation: fadeIn 0.6s ease-out 0.4s backwards;
        }

        .logout-button {
          padding: 0.9rem 2rem;
          background: transparent;
          color: var(--danger-red);
          border: 2px solid var(--danger-red);
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logout-button:hover {
          background: var(--danger-red);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        }

        .logout-button svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 1.5rem;
          }

          .welcome-card {
            padding: 2rem;
          }

          .welcome-title {
            font-size: 2rem;
          }

          .actions-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .action-card {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="dashboard-page">
        <div className="dashboard-content">
          <div className="welcome-card">
            <div className="welcome-header">
              <div className="welcome-greeting">Renter Dashboard</div>
              <h1 className="welcome-title">Welcome, {userName}</h1>
              <p className="welcome-subtitle">
                Discover your perfect home from our curated collection of premium rental properties.
              </p>
            </div>
          </div>

          <div className="actions-grid">
            <div className="action-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <h3 className="action-title">Browse Properties</h3>
              <p className="action-description">
                Explore available rental properties, filter by your preferences, and find your ideal home.
              </p>
              <span className="action-link">
                Coming Soon
              </span>
            </div>

            <div className="action-card disabled">
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <h3 className="action-title">My Bookings</h3>
              <p className="action-description">
                View your current and past bookings, manage reservations, and track booking status.
              </p>
              <span className="action-link">
                Coming Soon
              </span>
            </div>

            <div className="action-card disabled">
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 className="action-title">Favorites</h3>
              <p className="action-description">
                Save your favorite properties and easily access them later for quick booking.
              </p>
              <span className="action-link">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="logout-section">
            <button onClick={handleLogout} className="logout-button">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenterHome;