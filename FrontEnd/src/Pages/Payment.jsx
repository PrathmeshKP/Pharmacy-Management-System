// src/pages/Payment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagementStyles.css'; // Use the same styling as other components

const Payment = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctorEmail = localStorage.getItem('email'); 

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:8087/api/payments/pending?doctorEmail=${doctorEmail}`);
        setPendingPayments(response.data);
      } catch (error) {
        console.error('Error fetching pending payments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorEmail) {
      fetchPendingPayments();
    }
  }, [doctorEmail]);

  const handlePayNow = (payment) => {
    // Load Razorpay script dynamically
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initializePayment = async () => {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const razorpayOptions = {
        key: 'rzp_test_xiGcrRYtN6bFKT', 
        amount: payment.amount * 100, 
        currency: 'INR',
        name: 'PharmaCare Management System',
        description: `Payment for Order #${payment.orderId}`,
        handler: async function (response) {
          try {
            await axios.put(`http://localhost:8087/api/payments/complete/${payment.id}`);
            alert('Payment successful!');
            // Remove the paid payment from the list
            setPendingPayments(prev => prev.filter(p => p.id !== payment.id));
          } catch (err) {
            console.error('Error completing payment:', err);
            alert('Payment succeeded, but backend update failed.');
          }
        },
        prefill: {
          email: payment.doctorEmail,
          name: localStorage.getItem('doctorName') || 'Doctor'
        },
        theme: {
          color: '#4caf50', // Use the pharmacy theme color
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    };

    initializePayment();
  };

  if (loading) {
    return (
      <div className="data-container">
        <h2 className="management-title">Pending Payments</h2>
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2 className="management-title">Pending Payments</h2>

      {pendingPayments.length === 0 ? (
        <div className="no-payments">
          <i className="fas fa-check-circle"></i>
          <p>No pending payments found.</p>
        </div>
      ) : (
        <div className="payment-grid">
          {pendingPayments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <div className="card-header">
                <h4>Payment for Order #{payment.orderId}</h4>
                <span className="badge pending">Pending</span>
              </div>
              <div className="card-content">
                <p><i className="fas fa-rupee-sign"></i> <strong>Amount:</strong> ₹{payment.amount}</p>
                <p><i className="fas fa-calendar"></i> <strong>Created:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {payment.doctorEmail}</p>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => handlePayNow(payment)}
                  className="btn-primary"
                >
                  <i className="fas fa-credit-card"></i> Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payment;