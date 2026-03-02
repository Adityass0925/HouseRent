import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch users as soon as the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setMessage('Failed to fetch users. Are you sure you are an Admin?');
    }
  };

  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/admin/approve-owner/${userId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setMessage('Owner approved successfully!');
      fetchUsers(); // Refresh the table to show the new status
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error approving owner.');
    }
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
          --success-green: #27ae60;
          --error-red: #e74c3c;
          --background-light: #f8f9fa;
          --background-white: #ffffff;
          --border-color: #e0e4e8;
        }

        .dashboard-container {
          min-height: 100vh;
          background: var(--background-light);
          font-family: 'Montserrat', sans-serif;
          padding: 2rem;
        }

        .dashboard-wrapper {
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

        .dashboard-header {
          margin-bottom: 2.5rem;
        }

        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .back-link:hover {
          color: var(--primary-gold);
          background: rgba(201, 169, 98, 0.1);
          transform: translateX(-3px);
        }

        .dashboard-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--background-white);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-left: 4px solid var(--primary-gold);
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .message-banner {
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-banner.success {
          background: rgba(39, 174, 96, 0.1);
          color: var(--success-green);
          border: 1px solid rgba(39, 174, 96, 0.3);
        }

        .message-banner.error {
          background: rgba(231, 76, 60, 0.1);
          color: var(--error-red);
          border: 1px solid rgba(231, 76, 60, 0.3);
        }

        .message-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .table-container {
          background: var(--background-white);
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          animation: fadeIn 0.6s ease-out 0.2s backwards;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-navy) 100%);
        }

        .data-table th {
          padding: 1.25rem 1.5rem;
          text-align: left;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--background-white);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table tbody tr {
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.2s ease;
        }

        .data-table tbody tr:nth-child(even) {
          background: rgba(248, 249, 250, 0.5);
        }

        .data-table tbody tr:hover {
          background: rgba(201, 169, 98, 0.05);
        }

        .data-table tbody tr:last-child {
          border-bottom: none;
        }

        .data-table td {
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .user-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-email {
          color: var(--text-secondary);
        }

        .role-badge {
          display: inline-block;
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
          letter-spacing: 0.3px;
        }

        .role-badge.admin {
          background: rgba(231, 76, 60, 0.1);
          color: #c0392b;
        }

        .role-badge.owner {
          background: rgba(52, 152, 219, 0.1);
          color: #2980b9;
        }

        .role-badge.renter {
          background: rgba(155, 89, 182, 0.1);
          color: #8e44ad;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.approved {
          background: rgba(39, 174, 96, 0.1);
          color: var(--success-green);
        }

        .status-badge.pending {
          background: rgba(243, 156, 18, 0.1);
          color: #d68910;
        }

        .status-badge.na {
          background: rgba(149, 165, 166, 0.1);
          color: #7f8c8d;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }

        .approve-button {
          padding: 0.6rem 1.5rem;
          background: var(--success-green);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          box-shadow: 0 2px 8px rgba(39, 174, 96, 0.2);
        }

        .approve-button:hover {
          background: #229954;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        }

        .approve-button:active {
          transform: translateY(0);
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-secondary);
        }

        .empty-state-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          opacity: 0.3;
        }

        .empty-state-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-state-text {
          font-size: 0.95rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .data-table th,
          .data-table td {
            padding: 1rem;
            font-size: 0.85rem;
          }

          .table-wrapper {
            overflow-x: scroll;
          }

          .data-table {
            min-width: 600px;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="dashboard-header">
            <div className="header-top">
              <Link to="/admin" className="back-link">
                ← Back to Dashboard
              </Link>
            </div>
            <h1 className="dashboard-title">User Management</h1>
            <p className="dashboard-subtitle">
              Manage all registered users and approve property owners
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{users.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Owners</div>
              <div className="stat-value">
                {users.filter(u => u.userType === 'owner').length}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending Approval</div>
              <div className="stat-value">
                {users.filter(u => u.userType === 'owner' && !u.isApprovedOwner).length}
              </div>
            </div>
          </div>

          {message && (
            <div className={`message-banner ${message.includes('success') ? 'success' : 'error'}`}>
              <svg className="message-icon" viewBox="0 0 24 24" fill="currentColor">
                {message.includes('success') ? (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                ) : (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                )}
              </svg>
              {message}
            </div>
          )}

          <div className="table-container">
            <div className="table-wrapper">
              {users.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <span className="user-name">{user.name}</span>
                        </td>
                        <td>
                          <span className="user-email">{user.email}</span>
                        </td>
                        <td>
                          <span className={`role-badge ${user.userType}`}>
                            {user.userType}
                          </span>
                        </td>
                        <td>
                          {user.userType === 'owner' ? (
                            <span className={`status-badge ${user.isApprovedOwner ? 'approved' : 'pending'}`}>
                              <span className="status-dot"></span>
                              {user.isApprovedOwner ? 'Approved' : 'Pending'}
                            </span>
                          ) : (
                            <span className="status-badge na">N/A</span>
                          )}
                        </td>
                        <td>
                          {user.userType === 'owner' && !user.isApprovedOwner && (
                            <button 
                              onClick={() => handleApprove(user._id)}
                              className="approve-button"
                            >
                              Approve Owner
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <svg className="empty-state-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  <div className="empty-state-title">No Users Found</div>
                  <div className="empty-state-text">There are no registered users yet.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;