import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Common.css';

const BuySellMain = () => {
  const navigate = useNavigate();

  return (
    <div className="agricultural-page">
      <div className="glass-container">
        <header className="page-header">
          <button className="agri-back-button" onClick={() => navigate('/home')}>
            Back to Home
          </button>
          <h1>Marketplace</h1>
          <p className="subtitle">Buy fresh produce or sell your harvest</p>
        </header>

        <div className="agri-button-grid">
          <button 
            className="agri-action-button"
            data-icon="🛒"
            onClick={() => navigate('/market/buy')}
          >
            For Buyer
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              Purchase fresh agricultural produce
            </span>
          </button>
          
          <button 
            className="agri-action-button"
            data-icon="💰"
            onClick={() => navigate('/market/sell')}
          >
            For Seller
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              List your crops and produce for sale
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuySellMain;