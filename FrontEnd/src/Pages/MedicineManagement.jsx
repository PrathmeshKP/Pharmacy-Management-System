// src/pages/MedicineManagement.js
import React, { useState } from 'react';
import MedicineList from './MedicineList';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const MedicineManagement = () => {
  const [view, setView] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({ 
    id: '', name: '', manufacturer: '', quantity: '', price: '' 
  });
  const [deleteId, setDeleteId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cards = [
    { title: 'All Medicines', view: 'all', icon: 'fas fa-list' },
    { title: 'Search Medicine', view: 'search', icon: 'fas fa-search' },
    { title: 'Add Medicine', view: 'add', icon: 'fas fa-plus' },
    { title: 'Update Medicine', view: 'update', icon: 'fas fa-edit' },
    { title: 'Delete Medicine', view: 'delete', icon: 'fas fa-trash' }
  ];

  return (
    <div className="management-container">
      <h2 className="management-title">Medicine Management</h2>

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
        {view === 'all' && <MedicineList />}
        
        {view === 'search' && (
          <div className="form-container">
            <h3>Search Medicine</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await axios.get(`http://localhost:8080/api/medicines/search?name=${searchQuery}`);
                  const data = Array.isArray(res.data) ? res.data : [res.data];
                  setSearchResults(data);
                } catch (err) {
                  alert('Failed to search medicines');
                  setSearchResults([]);
                }
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter medicine name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>

            {Array.isArray(searchResults) && searchResults.length > 0 ? (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Manufacturer</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.name}</td>
                        <td>{m.manufacturer}</td>
                        <td>{m.quantity}</td>
                        <td>₹{m.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : searchResults.length === 0 && searchQuery ? (
              <p className="no-results">No medicines found.</p>
            ) : null}
          </div>
        )}

        {view === 'add' && (
          <div className="form-container">
            <h3>Add Medicine</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post('http://localhost:8080/api/medicines/add', formData);
                  alert('Medicine added successfully');
                  setFormData({ name: '', manufacturer: '', quantity: '', price: '', id: '' });
                } catch (err) {
                  alert('Failed to add medicine');
                }
              }}
            >
              <div className="input-group">
                <input 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  name="manufacturer" 
                  placeholder="Manufacturer" 
                  value={formData.manufacturer} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  name="quantity" 
                  type="number" 
                  placeholder="Quantity" 
                  value={formData.quantity} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  name="price" 
                  type="number" 
                  placeholder="Price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <button type="submit" className="btn-primary">
                Add Medicine
              </button>
            </form>
          </div>
        )}

        {view === 'update' && (
          <div className="form-container">
            <h3>Update Medicine</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`http://localhost:8080/api/medicines/update/${formData.id}`, formData);
                  alert('Medicine updated successfully');
                  setFormData({ id: '', name: '', manufacturer: '', quantity: '', price: '' });
                } catch (err) {
                  alert('Failed to update medicine');
                }
              }}
            >
              <div className="input-group">
                <input 
                  name="id" 
                  placeholder="ID" 
                  value={formData.id} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="input-group">
                <input 
                  name="manufacturer" 
                  placeholder="Manufacturer" 
                  value={formData.manufacturer} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="input-group">
                <input 
                  name="quantity" 
                  type="number" 
                  placeholder="Quantity" 
                  value={formData.quantity} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="input-group">
                <input 
                  name="price" 
                  type="number" 
                  placeholder="Price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                />
              </div>
              <button type="submit" className="btn-primary">
                Update Medicine
              </button>
            </form>
          </div>
        )}

        {view === 'delete' && (
          <div className="form-container">
            <h3>Delete Medicine</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.delete(`http://localhost:8080/api/medicines/delete/${deleteId}`);
                  alert('Medicine deleted successfully');
                  setDeleteId('');
                } catch (err) {
                  alert('Failed to delete medicine');
                }
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter medicine ID to delete"
                  value={deleteId}
                  onChange={(e) => setDeleteId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-danger">
                Delete Medicine
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineManagement;