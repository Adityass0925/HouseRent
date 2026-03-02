import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rentAmount: '',
    propertyType: 'Apartment',
    furnishingStatus: 'Unfurnished',
    amenities: '' // We will split this by comma on the backend
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Uploading...');

    // 1. We must use FormData because we are sending files (images)
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('rentAmount', formData.rentAmount);
    data.append('propertyType', formData.propertyType);
    data.append('furnishingStatus', formData.furnishingStatus);
    data.append('amenities', formData.amenities);

    // Append each selected image to the FormData
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      // 2. Get the VIP Pass (Token) from local storage
      const token = localStorage.getItem('token');

      // 3. Send POST request with Token in the headers
      await axios.post('http://localhost:8000/api/owner/properties', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Tells backend to expect files
        }
      });

      setMessage('Property added successfully!');
      setTimeout(() => navigate('/owner'), 2000); // Send back to dashboard
    } catch (error) {
      // If the admin hasn't approved them yet, this will catch that specific error!
      setMessage(error.response?.data?.message || 'Error adding property');
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
          --background-light: #f8f9fa;
          --background-white: #ffffff;
          --border-color: #e0e4e8;
          --success-green: #27ae60;
          --error-red: #e74c3c;
          --radius-lg: 16px;
        }

        .add-property-page {
          min-height: 100vh;
          background: var(--background-light);
          font-family: 'Montserrat', sans-serif;
          padding: 2.5rem;
        }

        .add-property-container {
          max-width: 1000px;
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

        .page-header {
          margin-bottom: 2rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
          transition: all 0.2s ease;
        }

        .back-link:hover {
          color: var(--primary-gold);
          transform: translateX(-3px);
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .form-card {
          background: var(--background-white);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 3rem;
          animation: slideUp 0.6s ease-out 0.2s backwards;
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

        .message-banner.uploading {
          background: rgba(201, 169, 98, 0.1);
          color: var(--primary-gold);
          border: 1px solid rgba(201, 169, 98, 0.3);
        }

        .property-form {
          display: grid;
          gap: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }

        .form-label .required {
          color: var(--error-red);
          margin-left: 0.25rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 1rem 1.25rem;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Montserrat', sans-serif;
          color: var(--text-primary);
          transition: all 0.3s ease;
          background: var(--background-white);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-gold);
          background: var(--background-light);
          box-shadow: 0 0 0 4px rgba(201, 169, 98, 0.1);
          transform: translateY(-2px);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #aaa;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
          font-family: 'Montserrat', sans-serif;
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%235a5a5a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.25rem center;
          padding-right: 3rem;
        }

        .file-upload-area {
          border: 2px dashed var(--border-color);
          border-radius: 12px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s ease;
          background: var(--background-light);
          cursor: pointer;
          position: relative;
        }

        .file-upload-area:hover {
          border-color: var(--primary-gold);
          background: rgba(201, 169, 98, 0.05);
        }

        .file-upload-area.has-files {
          border-color: var(--success-green);
          background: rgba(39, 174, 96, 0.05);
        }

        .file-input {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }

        .upload-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          fill: var(--primary-gold);
        }

        .upload-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .upload-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .file-count {
          margin-top: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--success-green);
        }

        .submit-section {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .submit-button {
          padding: 1.1rem 3rem;
          background: var(--primary-gold);
          color: var(--primary-dark);
          border: none;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
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

        .form-helper {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
          margin-top: 0.3rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .add-property-page {
            padding: 1.5rem;
          }

          .form-card {
            padding: 2rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .submit-section {
            flex-direction: column;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="add-property-page">
        <div className="add-property-container">
          <div className="page-header">
            <Link to="/owner" className="back-link">
              ← Back to Dashboard
            </Link>
            <h1 className="page-title">List New Property</h1>
            <p className="page-subtitle">
              Fill in the details below to add your property to the marketplace
            </p>
          </div>

          <div className="form-card">
            {message && (
              <div className={`message-banner ${
                message.includes('success') ? 'success' : 
                message.includes('Uploading') ? 'uploading' : 
                'error'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {message.includes('success') ? (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  ) : (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  )}
                </svg>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="property-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Property Title<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Luxurious 2BHK Apartment in Downtown"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    Description<span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your property, highlight key features and what makes it special..."
                    onChange={handleChange}
                    required
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Location<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Full address or area"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Monthly Rent (₹)<span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="rentAmount"
                    placeholder="e.g., 25000"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Property Type<span className="required">*</span>
                  </label>
                  <select
                    name="propertyType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Furnishing Status<span className="required">*</span>
                  </label>
                  <select
                    name="furnishingStatus"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Furnished">Furnished</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Amenities</label>
                  <input
                    type="text"
                    name="amenities"
                    placeholder="e.g., Swimming Pool, Gym, WiFi, Parking"
                    onChange={handleChange}
                    className="form-input"
                  />
                  <p className="form-helper">
                    Separate multiple amenities with commas
                  </p>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">
                  Property Images<span className="required">*</span>
                </label>
                <div className={`file-upload-area ${images.length > 0 ? 'has-files' : ''}`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="file-input"
                  />
                  <svg className="upload-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3h-5v2h5c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM3 19.01h8v2H3v-2zm5-3v-5.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V16h3l-4 4-4-4h3z"/>
                  </svg>
                  <div className="upload-title">
                    {images.length > 0 ? 'Files Selected' : 'Click to Upload Images'}
                  </div>
                  <p className="upload-subtitle">
                    {images.length > 0 
                      ? 'Click to change selection' 
                      : 'Upload up to 5 high-quality photos (JPG, PNG)'}
                  </p>
                  {images.length > 0 && (
                    <p className="file-count">
                      ✓ {images.length} {images.length === 1 ? 'image' : 'images'} selected
                    </p>
                  )}
                </div>
              </div>

              <div className="submit-section">
                <button type="submit" className="submit-button">
                  <span>List Property</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProperty;