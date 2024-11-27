import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed

const Signup = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const endpoint = userType === 'salon' ? '/api/salons/signup' : '/api/users/signup';
      await axios.post(endpoint, formData);
      setSuccess(`${userType === 'salon' ? 'Salon' : 'User'} account created successfully!`);
      setError('');
      // Clear form or redirect as needed
    } catch (error) {
      setError(error.response.data.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>{userType === 'salon' ? 'Salon' : 'User'} Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
