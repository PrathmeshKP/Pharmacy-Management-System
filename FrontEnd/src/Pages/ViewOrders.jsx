// src/pages/ViewOrders.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const doctorEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/orders/doctor/${doctorEmail}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [doctorEmail]);

  return (
    <div className="data-container">
      <h3>My Orders</h3>
      {orders.length === 0 ? (
        <p className="no-results">No orders found.</p>
      ) : (
        <div className="card-grid">
          {orders.map((order) => (
            <div key={order.id} className="data-card">
              <div className="card-header">
                <h4>Order #{order.id}</h4>
                <div>
                  {order.verified && <span className="badge verified">Verified</span>}
                  {order.pickedUp && <span className="badge picked-up">Picked Up</span>}
                  {!order.verified && <span className="badge pending">Pending</span>}
                </div>
              </div>
              <div className="card-content">
                <p><i className="fas fa-pills"></i> <strong>Drug:</strong> {order.drugName}</p>
                <p><i className="fas fa-boxes"></i> <strong>Quantity:</strong> {order.quantity}</p>
                <p><i className="fas fa-calendar"></i> <strong>Placed:</strong> {new Date(order.placedAt).toLocaleString()}</p>
                <p><i className="fas fa-list-ol"></i> <strong>Drug IDs:</strong> {order.drugIds.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;