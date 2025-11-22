import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { machineService } from '../services/databaseService';
import '../styles/Form.css';

const UploadMachine = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    manufactureYear: '',
    price: '',
    description: ''
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

    const result = await machineService.addMachine({
      ...formData,
      manufactureYear: parseInt(formData.manufactureYear),
      price: parseFloat(formData.price)
    });

    if (result.success) {
      alert('Machine listed successfully!');
      navigate('/machines/rent');
    } else {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="agri-form-container">
      <header className="agri-form-header">
        <button className="agri-back-button" onClick={() => navigate('/machines')}>
          Back
        </button>
        <h1>Upload Machine for Rent</h1>
        <p className="agri-subtitle">Share your farming equipment with the community</p>
      </header>

      <form onSubmit={handleSubmit} className="agri-form">
        <div className="agri-form-group">
          <label htmlFor="name">Machine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Tractor, Harvester, Plough"
          />
        </div>

        <div className="agri-form-group">
          <label htmlFor="manufactureYear">Manufacture Year:</label>
          <input
            type="number"
            id="manufactureYear"
            name="manufactureYear"
            min="1990"
            max="2024"
            value={formData.manufactureYear}
            onChange={handleChange}
            required
            placeholder="Enter manufacture year"
          />
        </div>

        <div className="agri-form-group">
          <label htmlFor="price">Daily Rental Price (₹):</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter daily rental price"
          />
        </div>

        <div className="agri-form-group">
          <label htmlFor="description">Machine Description (Optional):</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Brief description of the machine's condition and features"
          />
        </div>

        <button type="submit" className="agri-submit-button" disabled={loading}>
          {loading ? 'Uploading Machine...' : 'List Machine for Rent'}
        </button>
      </form>
    </div>
  );
};

export default UploadMachine;