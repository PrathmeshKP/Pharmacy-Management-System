// src/Components/DoctorNavbar.js
import React from 'react';
import './DoctorNavbar.css';

const DoctorNavbar = ({ setActiveTab, handleLogout, activeTab }) => {
  const navItems = [
    { key: 'place-order', label: 'Place Order', icon: 'fas fa-cart-plus' },
    { key: 'payments', label: 'Payments', icon: 'fas fa-credit-card' } // Removed view-orders
  ];

  return (
    <nav className="doctor-navbar">
      <div className="nav-brand">
        <i className="fas fa-user-md"></i>
        <span>PharmaCare Doctor Portal</span>
      </div>
      
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="user-info">
        <span>Welcome, {localStorage.getItem('doctorName') || 'Doctor'}</span>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;