import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Admin');

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
              <div className="welcome-greeting">Admin Dashboard</div>
              <h1 className="welcome-title">Welcome back, {userName}</h1>
              <p className="welcome-subtitle">
                Manage your platform, oversee users, and maintain control of all properties and operations.
              </p>
            </div>
          </div>

          <div className="actions-grid">
            <div className="action-card" onClick={() => navigate('/admin/users')}>
              <div className="action-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h3 className="action-title">Manage Users</h3>
              <p className="action-description">
                View all registered users, approve property owners, and manage account permissions.
              </p>
              <span className="action-link">
                Open User Management →
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

export default AdminHome;