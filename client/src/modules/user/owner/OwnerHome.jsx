import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Owner');

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
          --success-green: #27ae60;
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

        .primary-action {
          background: var(--success-green);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 8px 30px rgba(39, 174, 96, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeIn 0.6s ease-out 0.2s backwards;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .primary-action:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(39, 174, 96, 0.3);
        }

        .primary-action-content {
          flex: 1;
        }

        .primary-action-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .primary-action-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .primary-action-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .primary-action-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .primary-action-icon svg {
          width: 40px;
          height: 40px;
          fill: white;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          animation-delay: 0.3s;
        }

        .action-card:nth-child(2) {
          animation-delay: 0.4s;
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
          animation: fadeIn 0.6s ease-out 0.5s backwards;
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

          .primary-action {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }

          .primary-action-title {
            font-size: 1.75rem;
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
              <div className="welcome-greeting">Owner Dashboard</div>
              <h1 className="welcome-title">Welcome back, {userName}</h1>
              <p className="welcome-subtitle">
                Manage your property listings, track bookings, and grow your rental business.
              </p>
            </div>
          </div>

          <div className="primary-action" onClick={() => navigate('/owner/add-property')}>
            <div className="primary-action-content">
              <div className="primary-action-label">Quick Action</div>
              <h2 className="primary-action-title">Add New Property</h2>
              <p className="primary-action-description">
                List a new property and start receiving booking requests from renters.
              </p>
            </div>
            <div className="primary-action-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
          </div>

          <div className="actions-grid">
            <div className="action-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="action-title">My Properties</h3>
              <p className="action-description">
                View and manage all your listed properties, update details, and track performance.
              </p>
              <span className="action-link">
                Coming Soon
              </span>
            </div>

            <div className="action-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <h3 className="action-title">Bookings</h3>
              <p className="action-description">
                Review booking requests, manage reservations, and communicate with renters.
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

export default OwnerHome;