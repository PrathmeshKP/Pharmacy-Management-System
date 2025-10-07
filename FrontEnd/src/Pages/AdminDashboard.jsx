// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar';
import UserManagement from './UserManagement';
import MedicineManagement from './MedicineManagement';
import OrderManagement from './OrderManagement';
import SupplierManagement from './SupplierManagement';
import SalesReportManagement from './SalesReportManagement';
import FloatingChatBot from "../components/FloatingChatBot";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'medicines':
        return <MedicineManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'suppliers':
        return <SupplierManagement />;
      case 'sales':
        return <SalesReportManagement />;
      default:
        return (
          <div className="dashboard-welcome">
            <div className="welcome-card">
              <i className="fas fa-tachometer-alt"></i>
              <h2>Admin Dashboard</h2>
              <p>Select a management option from the navigation menu to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar setActiveTab={setActiveTab} handleLogout={handleLogout} activeTab={activeTab} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
      <FloatingChatBot />
    </div>
  );
};

export default AdminDashboard;