import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { produceService } from '../services/databaseService';
import '../styles/Form.css';

const ForSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    manufacturedDate: '',
    price: ''
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

    const result = await produceService.addProduce({
      ...formData,
      price: parseFloat(formData.price)
    });

    if (result.success) {
      alert('Produce listed successfully!');
      navigate('/market/buy');
    } else {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <button className="back-button" onClick={() => navigate('/market')}>← Back</button>
        <h1>Sell Your Produce</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Veggies/Crop/Fruit Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Crop">Crop</option>
            <option value="Grains">Grains</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="manufacturedDate">Harvest/Manufactured Date:</label>
          <input
            type="date"
            id="manufacturedDate"
            name="manufacturedDate"
            value={formData.manufacturedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹ per kg):</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ForSeller;