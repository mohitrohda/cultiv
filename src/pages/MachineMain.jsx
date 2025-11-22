import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Common.css';

const MachineMain = () => {
  const navigate = useNavigate();

  return (
    <div className="agricultural-page">
      <div className="glass-container">
        <header className="page-header">
          <button className="agri-back-button" onClick={() => navigate('/home')}>
            Back to Home
          </button>
          <h1>Farming Machines</h1>
          <p className="subtitle">Modern tools for modern farming</p>
        </header>

        <div className="agri-button-grid">
          <button 
            className="agri-action-button"
            data-icon="🔄"
            onClick={() => navigate('/machines/upload')}
          >
            Upload Your Machine For Rent
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              Share your equipment with fellow farmers
            </span>
          </button>
          
          <button 
            className="agri-action-button"
            data-icon="🚜"
            onClick={() => navigate('/machines/rent')}
          >
            Rent The Machine
            <span style={{fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', opacity: 0.8}}>
              Find equipment for your farming needs
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachineMain;