// src/pages/PlaceOrder.js
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const PlaceOrder = () => {
  const [order, setOrder] = useState({
    medicineName: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorName = localStorage.getItem('doctorName');
    const doctorEmail = localStorage.getItem('email');

    const fullOrder = {
      doctorName: doctorName,
      doctorEmail: doctorEmail,
      drugName: order.medicineName,
      quantity: parseInt(order.quantity),
      drugIds: ['demo-id-123']
    };

    try {
      await axios.post('http://localhost:8080/api/orders/place', fullOrder);
      alert('Order placed successfully!');
      setOrder({ medicineName: '', quantity: '' });
    } catch (error) {
      console.error('Order failed', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="form-container">
      <h3>Place New Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="medicineName"
            placeholder="Medicine Name"
            value={order.medicineName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;