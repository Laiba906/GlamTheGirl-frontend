import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ userType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = userType === 'salon' ? '/api/salons/login' : '/api/users/login';
      const response = await axios.post(endpoint, formData);
      setSuccess('Login successful!');
      setError('');
      // Store token or redirect based on your app flow
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>{userType === 'salon' ? 'Salon' : 'User'} Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
