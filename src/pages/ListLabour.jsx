import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { labourService } from '../services/databaseService';
import '../styles/Form.css';

const ListLabour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await labourService.addLabour({
      ...formData,
      age: parseInt(formData.age)
    });

    if (result.success) {
      alert('Labour listed successfully!');
      navigate('/labour/hire');
    } else {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="agri-form-container">
      <header className="agri-form-header">
        <button className="agri-back-button" onClick={() => navigate('/labour')}>
          Back
        </button>
        <h1>List a Labour</h1>
        <p className="agri-subtitle">Provide details to list a labour on AgroConnect</p>
      </header>

      <form onSubmit={handleSubmit} className="agri-form">
        <div className="agri-form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter labour's full name"
          />
        </div>

        <div className="agri-form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="70"
            placeholder="Enter age"
          />
        </div>

        <div className="agri-form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="agri-form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>

        <button type="submit" className="agri-submit-button" disabled={loading}>
          {loading ? 'Listing Labour...' : 'List Labour'}
        </button>
      </form>
    </div>
  );
};

export default ListLabour;