// src/pages/MedicineList.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
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

  return (
    <div className="data-container">
      <h3>All Medicines</h3>
      {medicines.length === 0 ? (
        <p className="no-results">No medicines found.</p>
      ) : (
        <div className="card-grid">
          {medicines.map((med) => (
            <div className="data-card" key={med.id}>
              <div className="card-header">
                <h4>{med.name}</h4>
                <span className="badge">ID: {med.id}</span>
              </div>
              <div className="card-content">
                <p><i className="fas fa-industry"></i> <strong>Manufacturer:</strong> {med.manufacturer}</p>
                <p><i className="fas fa-rupee-sign"></i> <strong>Price:</strong> ₹{med.price}</p>
                <p><i className="fas fa-box"></i> <strong>Quantity:</strong> {med.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineList;