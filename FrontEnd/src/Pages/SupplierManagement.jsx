// src/pages/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const SupplierManagement = () => {
  const [view, setView] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', email: '', contact: '' });
  const [updateSupplier, setUpdateSupplier] = useState({ id: '', name: '', email: '', contact: '' });
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      if (view === 'all') {
        try {
          const res = await axios.get('http://localhost:8080/api/suppliers');
          setSuppliers(res.data);
        } catch (err) {
          console.error('Error fetching suppliers:', err);
        }
      }
    };
    fetchSuppliers();
  }, [view]);

  const cards = [
    { title: 'All Suppliers', view: 'all', icon: 'fas fa-list' },
    { title: 'Add Supplier', view: 'add', icon: 'fas fa-plus' },
    { title: 'Update Supplier', view: 'update', icon: 'fas fa-edit' },
    { title: 'Delete Supplier', view: 'delete', icon: 'fas fa-trash' },
  ];

  return (
    <div className="management-container">
      <h2 className="management-title">Supplier Management</h2>

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
        {view === 'all' && (
          <div className="data-container">
            <h3>All Suppliers</h3>
            {suppliers.length === 0 ? (
              <p className="no-results">No suppliers found.</p>
            ) : (
              <div className="card-grid">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="data-card">
                    <div className="card-header">
                      <h4>{supplier.name}</h4>
                      <span className="badge">ID: {supplier.id}</span>
                    </div>
                    <div className="card-content">
                      <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {supplier.email}</p>
                      <p><i className="fas fa-phone"></i> <strong>Contact:</strong> {supplier.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'add' && (
          <div className="form-container">
            <h3>Add Supplier</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await axios.post('http://localhost:8080/api/suppliers/add', newSupplier);
                alert('Supplier added successfully');
                setNewSupplier({ name: '', email: '', contact: '' });
              } catch (err) {
                alert('Failed to add supplier');
              }
            }}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={newSupplier.contact}
                  onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Add Supplier
              </button>
            </form>
          </div>
        )}

        {view === 'update' && (
          <div className="form-container">
            <h3>Update Supplier</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await axios.put(`http://localhost:8080/api/suppliers/${updateSupplier.id}`, updateSupplier);
                alert('Supplier updated successfully');
                setUpdateSupplier({ id: '', name: '', email: '', contact: '' });
              } catch (err) {
                alert('Failed to update supplier');
              }
            }}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Supplier ID"
                  value={updateSupplier.id}
                  onChange={(e) => setUpdateSupplier({ ...updateSupplier, id: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={updateSupplier.name}
                  onChange={(e) => setUpdateSupplier({ ...updateSupplier, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={updateSupplier.email}
                  onChange={(e) => setUpdateSupplier({ ...updateSupplier, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={updateSupplier.contact}
                  onChange={(e) => setUpdateSupplier({ ...updateSupplier, contact: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary">
                Update Supplier
              </button>
            </form>
          </div>
        )}

        {view === 'delete' && (
          <div className="form-container">
            <h3>Delete Supplier</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await axios.delete(`http://localhost:8080/api/suppliers/${deleteId}`);
                alert('Supplier deleted successfully');
                setDeleteId('');
              } catch (err) {
                alert('Failed to delete supplier');
              }
            }}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter Supplier ID to delete"
                  value={deleteId}
                  onChange={(e) => setDeleteId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-danger">
                Delete Supplier
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;