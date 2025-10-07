import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo">
            <i className="fas fa-prescription"></i>
            <h1>PharmaCare Manager</h1>
          </div>
          <p className="tagline">Advanced pharmacy management for modern healthcare providers</p>
          <p className="subtext">Streamline your pharmacy operations with our comprehensive management system</p>
          
          <div className="cta-buttons">
            <Link to="/login" className="cta-button primary">Login</Link>
            <Link to="/signup" className="cta-button secondary">Register</Link>
          </div>
        </div>
        
        
        <div className="hero-image">
          <div className="floating-pills">
            <div className="mega-pill">
              <div className="shine"></div>
              <div className="reflection"></div>
            </div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose Our System?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-pills"></i> 
            </div>
            <h3>Full On Pharmacy Management</h3>
            <p>Track medications, Supplies, Orders and Chill</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-stethoscope"></i> 
            </div>
            <h3>Doctor Portal</h3>
            <p>Streamlined prescription management for healthcare providers</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-bar"></i> 
            </div>
            <h3>Reporting & Analytics</h3>
            <p>Comprehensive insights into pharmacy operations and performance</p>
          </div>
        </div>
      </div>
      <footer className="home-footer">
        <p>&copy; 2025 PharmaCare Manager. All rights reserved to Prathmesh KP</p>
      </footer>
    </div>
  );
};

export default HomePage;