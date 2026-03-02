import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-gold: #C9A962;
          --primary-dark: #1a1a1a;
          --primary-light: #f8f7f4;
          --accent-navy: #2c3e50;
          --text-primary: #1a1a1a;
          --text-secondary: #5a5a5a;
          --text-light: #ffffff;
        }

        .home-container {
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: var(--text-primary);
          background: var(--primary-light);
          overflow-x: hidden;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 5%;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .navbar.scrolled .logo {
          color: var(--primary-gold);
        }

        .navbar.scrolled .nav-links a {
          color: var(--text-light);
        }

        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-light);
          text-decoration: none;
          letter-spacing: 2px;
          transition: color 0.3s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeInDown 0.8s ease-out;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          animation: fadeInDown 0.8s ease-out 0.2s backwards;
        }

        .nav-links a {
          color: var(--text-light);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-gold);
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-links .btn-register {
          background: var(--primary-gold);
          color: var(--primary-dark);
          padding: 0.7rem 1.8rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 169, 98, 0.3);
          text-shadow: none;
        }

        .nav-links .btn-register::after {
          display: none;
        }

        .nav-links .btn-register:hover {
          background: var(--accent-navy);
          color: var(--text-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(201, 169, 98, 0.4);
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(26, 26, 26, 0.85) 0%,
            rgba(44, 62, 80, 0.75) 50%,
            rgba(201, 169, 98, 0.3) 100%
          );
          z-index: 2;
        }

        .hero-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%231a1a1a"/><path d="M0 50 L50 0 L100 50 L50 100 Z" fill="%232c3e50" opacity="0.1"/></svg>');
          background-size: 100px 100px;
          opacity: 0.15;
          z-index: 1;
          animation: patternMove 30s linear infinite;
        }

        .hero-background-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.3);
          font-style: italic;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: var(--text-light);
          max-width: 900px;
          padding: 2rem;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        .hero-subtitle {
          font-size: 0.95rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--primary-gold);
          font-weight: 500;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1s ease-out 0.5s backwards;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: 1px;
          animation: fadeInUp 1s ease-out 0.7s backwards;
        }

        .hero-title .highlight {
          color: var(--primary-gold);
          display: inline-block;
          position: relative;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          max-width: 650px;
          margin: 0 auto 3rem;
          font-weight: 300;
          animation: fadeInUp 1s ease-out 0.9s backwards;
        }

        .hero-cta {
          display: inline-flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeInUp 1s ease-out 1.1s backwards;
        }

        .btn-primary {
          background: var(--primary-gold);
          color: var(--primary-dark);
          padding: 1.2rem 3rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 1px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 30px rgba(201, 169, 98, 0.4);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
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

        .btn-primary:hover::before {
          width: 400px;
          height: 400px;
        }

        .btn-primary:hover {
          color: var(--text-light);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(201, 169, 98, 0.5);
        }

        .btn-primary span {
          position: relative;
          z-index: 1;
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-light);
          padding: 1.2rem 3rem;
          border: 2px solid var(--text-light);
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 1px;
          transition: all 0.4s ease;
        }

        .btn-secondary:hover {
          background: var(--text-light);
          color: var(--primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          animation: bounce 2s infinite;
        }

        .scroll-indicator::before {
          content: '↓';
          font-size: 2rem;
          color: var(--primary-gold);
          opacity: 0.7;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes patternMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100px, 100px);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 4%;
          }

          .logo {
            font-size: 1.5rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-links a {
            font-size: 0.85rem;
          }

          .nav-links .btn-register {
            padding: 0.6rem 1.3rem;
            font-size: 0.85rem;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 0.8rem;
            letter-spacing: 2px;
          }

          .hero-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            padding: 1rem 2.5rem;
            font-size: 0.95rem;
            width: 100%;
            max-width: 280px;
          }

          .scroll-indicator {
            bottom: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-content {
            padding: 1rem;
          }

          .nav-links {
            gap: 0.7rem;
          }

          .nav-links a:not(.btn-register) {
            display: none;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo">
          HouseRent
        </Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn-register">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div
            className="hero-background-image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
              width: "100%",
            }}
          ></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-subtitle">Premium Property Rentals</div>
          <h1 className="hero-title">
            Find Your <span className="highlight">Perfect</span> Home
          </h1>
          <p className="hero-description">
            Discover exceptional properties tailored to your lifestyle. 
            From modern apartments to luxurious estates, your dream home awaits.
          </p>
          <div className="hero-cta">
            <a href="#browse" className="btn-primary">
              <span>Browse Properties</span>
            </a>
            <a href="#learn-more" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>

        <div className="scroll-indicator"></div>
      </section>
    </div>
  );
};

export default Home;