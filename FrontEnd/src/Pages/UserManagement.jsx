// src/pages/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import './ManagementStyles.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'DOCTOR' });
  const [view, setView] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updateUser, setUpdateUser] = useState({ name: '', email: '', password: '', role: 'DOCTOR' });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const payload = { ...newUser, role: 'DOCTOR' };
    try {
      await axios.post('http://localhost:8080/api/auth/signup', payload);
      alert('User added successfully');
      fetchUsers();
      setNewUser({ name: '', email: '', password: '', role: 'DOCTOR' });
    } catch (err) {
      alert('Failed to add user.');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${selectedUserId}`, updateUser);
      alert('User updated successfully');
      fetchUsers();
      setSelectedUserId('');
      setUpdateUser({ name: '', email: '', password: '', role: 'DOCTOR' });
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${selectedUserId}`);
        alert('User deleted successfully');
        setSelectedUserId('');
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };

  const cards = [
    { title: 'User List', view: 'list', icon: 'fas fa-list' },
    { title: 'Add User', view: 'add', icon: 'fas fa-plus' },
    { title: 'Update User', view: 'update', icon: 'fas fa-edit' },
    { title: 'Delete User', view: 'delete', icon: 'fas fa-trash' }
  ];

  return (
    <div className="management-container">
      <h2 className="management-title">User Management</h2>

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
        {view === 'list' && (
          <div className="data-container">
            <h3>All Users</h3>
            {users.length === 0 ? (
              <p className="no-results">No users found.</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name || '-'}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === 'add' && (
          <div className="form-container">
            <h3>Add User</h3>
            <form onSubmit={handleAddUser}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Add User
              </button>
            </form>
          </div>
        )}

        {view === 'update' && (
          <div className="form-container">
            <h3>Update User</h3>
            <div className="input-group">
              <select
                value={selectedUserId}
                onChange={(e) => {
                  const userId = e.target.value;
                  setSelectedUserId(userId);
                  if (userId) {
                    const user = users.find(u => u.id === userId);
                    setUpdateUser({
                      name: user.name || '',
                      email: user.email,
                      password: '',
                      role: user.role
                    });
                  }
                }}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedUserId && (
              <form onSubmit={handleUpdateUser}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Name"
                    value={updateUser.name}
                    onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={updateUser.email}
                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="New Password (leave blank to keep current)"
                    value={updateUser.password}
                    onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <select
                    value={updateUser.role}
                    onChange={(e) => setUpdateUser({ ...updateUser, role: e.target.value })}
                  >
                    <option value="DOCTOR">Doctor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">
                  Update User
                </button>
              </form>
            )}
          </div>
        )}

        {view === 'delete' && (
          <div className="form-container">
            <h3>Delete User</h3>
            <div className="input-group">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedUserId && (
              <div>
                <p className="warning-text">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <button onClick={handleDeleteUser} className="btn-danger">
                  Delete User
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;