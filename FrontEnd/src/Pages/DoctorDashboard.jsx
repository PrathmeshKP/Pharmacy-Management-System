// src/pages/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../Components/DoctorNavbar';
import PlaceOrder from './PlaceOrder';
import Payment from './Payment'; // Removed ViewOrders import
import FloatingChatBot from "../components/FloatingChatBot";
import axios from '../utils/axiosInstance';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [showMedicines, setShowMedicines] = useState(false);

  useEffect(() => {
    // Fetch medicines when dashboard loads
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/medicines/all');
        setMedicines(res.data);
      } catch (err) {
        console.error('Failed to fetch medicines', err);
      }
    };

    fetchMedicines();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleMedicineView = () => {
    setShowMedicines(!showMedicines);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'place-order':
        return <PlaceOrder />;
      // Removed view-orders case
      case 'payments':
        return <Payment />;
      default:
        return (
          <div className="dashboard-welcome">
            <div className="welcome-card-small">
              <i className="fas fa-user-md"></i>
              <h2>Welcome, {localStorage.getItem('doctorName') || 'Doctor'}</h2>
              <p>Select an option from the navigation menu to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="doctor-dashboard">
      <DoctorNavbar setActiveTab={setActiveTab} handleLogout={handleLogout} activeTab={activeTab} />
      
      {/* Medicine Toggle Button - Visible on all pages */}
      <div className="medicine-toggle-container">
        <button 
          className={`medicine-toggle-btn ${showMedicines ? 'active' : ''}`}
          onClick={toggleMedicineView}
        >
          <i className={`fas ${showMedicines ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          <span>{showMedicines ? 'Hide Medicines' : 'Show Available Medicines'}</span>
        </button>
      </div>
      
      <div className="dashboard-content">
        {renderContent()}
        
        {/* Medicine Cards Section - Visible when toggled */}
        {showMedicines && (
          <div className="medicine-cards-section">
            <h3>Available Medicines</h3>
            {medicines.length === 0 ? (
              <p className="no-results">No medicines available.</p>
            ) : (
              <div className="medicine-cards-grid">
                {medicines.map((med) => (
                  <div className="medicine-card" key={med.id}>
                    <div className="medicine-card-header">
                      <h4>{med.name}</h4>
                    </div>
                    <div className="medicine-card-content">
                      <p><i className="fas fa-rupee-sign"></i> <strong>Price:</strong> ₹{med.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <FloatingChatBot />
    </div>
  );
};

export default DoctorDashboard;