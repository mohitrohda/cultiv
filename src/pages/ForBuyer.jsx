import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { produceService } from '../services/databaseService';
import '../styles/List.css';

const ForBuyer = () => {
  const navigate = useNavigate();
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    const produceData = await produceService.getProduce();
    const availableProduce = produceData.filter(item => item.status === 'available');
    setProduce(availableProduce);
    setLoading(false);
  };

  const handleBuy = async (produceId) => {
    if (window.confirm('Are you sure you want to buy this item?')) {
      const result = await produceService.buyProduce(produceId);
      if (result.success) {
        alert('Item purchased successfully!');
        loadProduce();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading produce...</div>;
  }

  return (
    <div className="list-container">
      <header className="list-header">
        <button className="back-button" onClick={() => navigate('/market')}>← Back</button>
        <h1>Available Produce</h1>
      </header>

      {produce.length === 0 ? (
        <div className="empty-state">
          <p>No produce available for sale at the moment.</p>
          <button onClick={() => navigate('/market/sell')} className="action-button">
            Sell Produce
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {produce.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Harvest Date:</strong> {item.manufacturedDate}</p>
              <p><strong>Price:</strong> ₹{item.price}/kg</p>
              <button 
                onClick={() => handleBuy(item.id)}
                className="hire-button"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForBuyer;