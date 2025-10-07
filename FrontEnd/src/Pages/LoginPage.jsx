import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('DOCTOR'); 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      const token = res.data.token;
      const userRole = res.data.role;

      if (userRole !== role) {
        alert(`You tried to log in as ${role}, but your actual role is ${userRole}.`);
        setIsLoading(false);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('email', email);
      localStorage.setItem('doctorName', name);

      if (userRole === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/doctor');
      }
    } catch (err) {
      alert('Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-prescription"></i>
            <h2>PharmaCare Login</h2>
          </div>
          <p>Access your pharmacy management account</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="role">Account Type</label>
            <select 
              id="role"
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            >
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Register here</a></p>
          <p><a href="/forgot-password">Forgot your password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;