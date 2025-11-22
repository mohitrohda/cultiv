import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Common.css';

const LabourMain = () => {
  const navigate = useNavigate();

  return (
    <div className="agricultural-page">
      <div className="glass-container">
        <header className="page-header">
          <button className="agri-back-button" onClick={() => navigate('/home')}>
            Back to Home
          </button>
          <h1>Labour Management</h1>
          <p className="subtitle">Cultivate success with the right workforce</p>
        </header>

        <div className="agri-button-grid">
          <button 
            className="agri-action-button"
            data-icon="📝"
            onClick={() => navigate('/labour/list')}
          >
            List a Labour
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              Add workers to our farming community
            </span>
          </button>
          
          <button 
            className="agri-action-button"
            data-icon="👨‍🌾"
            onClick={() => navigate('/labour/hire')}
          >
            Hire a Labour
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              Find skilled agricultural workers
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabourMain;
