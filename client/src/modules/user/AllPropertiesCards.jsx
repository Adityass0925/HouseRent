import React, { useState } from 'react';

const AllPropertiesCards = ({ property, onBook, userType }) => {
  const [isHovered, setIsHovered] = useState(false);

  // If there's an image uploaded, use the first one, otherwise use a placeholder
  const imageUrl = property.images && property.images.length > 0 
    ? `http://localhost:8000/${property.images[0].replace('\\', '/')}` 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

        :root {
          --primary-gold: #C9A962;
          --primary-dark: #1a1a1a;
          --accent-navy: #2c3e50;
          --text-primary: #1a1a1a;
          --text-secondary: #5a5a5a;
          --text-light: #8a8a8a;
          --background-light: #ffffff;
          --border-color: #e8e8e8;
        }

        .property-card {
          position: relative;
          background: var(--background-light);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .property-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .property-card:hover .property-image {
          transform: scale(1.08);
        }

        .property-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .property-card:hover .property-image-overlay {
          opacity: 1;
        }

        .property-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--primary-dark);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }

        .property-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .property-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 2.6rem;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .location-icon {
          width: 16px;
          height: 16px;
          fill: var(--primary-gold);
          flex-shrink: 0;
        }

        .property-details {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .property-detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .property-price-section {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: auto;
        }

        .property-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-gold);
          line-height: 1;
        }

        .price-period {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .book-button {
          width: 100%;
          padding: 16px;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 0 0 16px 16px;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
        }

        .book-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: var(--primary-gold);
          transition: all 0.5s ease;
          transform: translate(-50%, -50%);
        }

        .book-button:hover::before {
          width: 500px;
          height: 500px;
        }

        .book-button:hover {
          box-shadow: 0 -4px 20px rgba(201, 169, 98, 0.3);
        }

        .book-button:active {
          transform: scale(0.98);
        }

        .book-button span {
          position: relative;
          z-index: 1;
        }

        .property-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .info-icon {
          width: 18px;
          height: 18px;
          fill: var(--primary-gold);
          flex-shrink: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .property-card {
            max-width: 100%;
          }

          .property-title {
            font-size: 1.25rem;
          }

          .property-price {
            font-size: 1.75rem;
          }

          .property-content {
            padding: 20px;
          }
        }
      `}</style>

      <div 
        className="property-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="property-image-container">
          <img 
            src={imageUrl} 
            alt={property.title} 
            className="property-image"
          />
          <div className="property-image-overlay"></div>
          <div className="property-badge">
            {property.propertyType}
          </div>
        </div>

        <div className="property-content">
          <h3 className="property-title">{property.title}</h3>
          
          <div className="property-location">
            <svg className="location-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {property.location}
          </div>

          <div className="property-details">
            <div className="property-detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">{property.propertyType}</span>
            </div>
            <div className="property-detail-item">
              <span className="detail-label">Furnishing</span>
              <span className="detail-value">{property.furnishingStatus}</span>
            </div>
          </div>

          <div className="property-price-section">
            <span className="property-price">₹{property.rentAmount.toLocaleString()}</span>
            <span className="price-period">/ month</span>
          </div>
        </div>

        {userType === 'renter' && (
          <button 
            onClick={() => onBook(property._id)} 
            className="book-button"
          >
            <span>Book Property</span>
          </button>
        )}
      </div>
    </>
  );
};

export default AllPropertiesCards;