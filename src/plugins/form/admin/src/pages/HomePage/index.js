import React, { useState } from 'react';
import pluginId from '../../pluginId';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
        <label htmlFor="phone">Phone:</label><br />
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required /><br />
        <label htmlFor="message">Message:</label><br />
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" cols="50" required></textarea><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default HomePage;
