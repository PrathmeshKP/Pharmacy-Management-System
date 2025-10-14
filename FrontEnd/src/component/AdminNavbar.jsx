// src/Components/AdminNavbar.js
import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = ({ setActiveTab, handleLogout, activeTab }) => {
  const navItems = [
    { key: 'users', label: 'Users', icon: 'fas fa-users' },
    { key: 'medicines', label: 'Medicines', icon: 'fas fa-pills' },
    { key: 'orders', label: 'Orders', icon: 'fas fa-shopping-cart' },
    { key: 'suppliers', label: 'Suppliers', icon: 'fas fa-truck' },
    { key: 'sales', label: 'Sales Report', icon: 'fas fa-chart-line' }
  ];

  return (
    <nav className="admin-navbar">
      <div className="nav-brand">
        <i className="fas fa-prescription"></i>
        <span>PharmaCare Admin</span>
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
      
      <button className="logout-btn" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default AdminNavbar;