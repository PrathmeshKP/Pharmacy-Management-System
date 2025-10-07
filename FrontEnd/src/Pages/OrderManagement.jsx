// src/pages/OrderManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const OrderManagement = () => {
  const [view, setView] = useState('');
  const [verifyId, setVerifyId] = useState('');
  const [orders, setOrders] = useState([]);
  const [pickupId, setPickupId] = useState('');
  const [paymentData, setPaymentData] = useState({ 
    orderId: '', doctorEmail: '', amount: '' 
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let endpoint = '';
        if (view === 'all') {
          endpoint = 'http://localhost:8080/api/orders/all';
        } else if (view === 'verified') {
          endpoint = 'http://localhost:8080/api/orders/verified';
        } else if (view === 'picked') {
          endpoint = 'http://localhost:8080/api/orders/picked-up';
        }
        
        if (endpoint) {
          const res = await axios.get(endpoint);
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    
    fetchOrders();
  }, [view]);

  const cards = [
    { title: 'All Orders', view: 'all', icon: 'fas fa-list' },
    { title: 'Verify Order', view: 'verify', icon: 'fas fa-check-circle' },
    { title: 'Pick Up Order', view: 'pickup', icon: 'fas fa-box' },
    { title: 'Verified Orders', view: 'verified', icon: 'fas fa-clipboard-check' },
    { title: 'Picked Up Orders', view: 'picked', icon: 'fas fa-truck-loading' },
    { title: 'Initiate Payment', view: 'initiate-payment', icon: 'fas fa-credit-card' }
  ];

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8087/api/payments/initiate', paymentData);
      alert('Payment initiated successfully! The doctor will now see this payment in their pending payments.');
      setPaymentData({ orderId: '', doctorEmail: '', amount: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to initiate payment. Please check the details and try again.');
    }
  };

  return (
    <div className="management-container">
      <h2 className="management-title">Order Management</h2>

      <div className="management-grid">
        {cards.map((card) => (
          <div
            key={card.view}
            className={`management-card ${view === card.view ? 'active' : ''}`}
            onClick={() => setView(card.view)}
          >
            <i className={card.icon}></i>
            <span>{card.title}</span>
          </div>
        ))}
      </div>

      <div className="management-content">
        {(view === 'all' || view === 'verified' || view === 'picked') && (
          <div className="data-container">
            <h3>
              {view === 'all' && 'All Orders'}
              {view === 'verified' && 'Verified Orders'}
              {view === 'picked' && 'Picked Up Orders'}
            </h3>
            
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
                        {!order.verified && !order.pickedUp && <span className="badge pending">Pending</span>}
                      </div>
                    </div>
                    <div className="card-content">
                      <p><i className="fas fa-user-md"></i> <strong>Doctor:</strong> {order.doctorName}</p>
                      <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {order.doctorEmail}</p>
                      <p><i className="fas fa-pills"></i> <strong>Drug:</strong> {order.drugName}</p>
                      <p><i className="fas fa-boxes"></i> <strong>Quantity:</strong> {order.quantity}</p>
                      <p><i className="fas fa-calendar"></i> <strong>Placed:</strong> {new Date(order.placedAt).toLocaleString()}</p>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'verify' && (
          <div className="form-container">
            <h3>Verify Order</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`http://localhost:8080/api/orders/verify/${verifyId}`);
                  alert('Order verified successfully');
                  setVerifyId('');
                } catch (err) {
                  alert('Failed to verify order');
                }
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter Order ID to verify"
                  value={verifyId}
                  onChange={(e) => setVerifyId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Verify Order
              </button>
            </form>
          </div>
        )}

        {view === 'pickup' && (
          <div className="form-container">
            <h3>Pick Up Order</h3>
            <p className="form-note">Only verified orders can be marked as picked up</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`http://localhost:8080/api/orders/pickup/${pickupId}`);
                  alert('Order marked as picked up successfully');
                  setPickupId('');
                } catch (err) {
                  alert('Failed to pick up order');
                }
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter Order ID to pick up"
                  value={pickupId}
                  onChange={(e) => setPickupId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Mark as Picked Up
              </button>
            </form>
          </div>
        )}

        {view === 'initiate-payment' && (
          <div className="form-container">
            <h3>Initiate Payment</h3>
            <p className="form-note">This will create a pending payment for the doctor to complete</p>
            <form onSubmit={handleInitiatePayment}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Order ID"
                  value={paymentData.orderId}
                  onChange={(e) => setPaymentData({ ...paymentData, orderId: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Doctor Email"
                  value={paymentData.doctorEmail}
                  onChange={(e) => setPaymentData({ ...paymentData, doctorEmail: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  required
                  min="1"
                  step="0.01"
                />
              </div>
              <button type="submit" className="btn-primary">
                Initiate Payment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;