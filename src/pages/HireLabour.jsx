import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { labourService } from '../services/databaseService';
import '../styles/List.css';

const HireLabour = () => {
  const navigate = useNavigate();
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLabours();
  }, []);

  const loadLabours = async () => {
    const laboursData = await labourService.getLabours();
    // Filter only available labours
    const availableLabours = laboursData.filter(labour => labour.status === 'available');
    setLabours(availableLabours);
    setLoading(false);
  };

  const handleHire = async (labourId) => {
    if (window.confirm('Are you sure you want to hire this labour?')) {
      const result = await labourService.hireLabour(labourId);
      if (result.success) {
        alert('Labour hired successfully!');
        loadLabours(); // Refresh the list
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading labours...</div>;
  }

  return (
    <div className="list-container">
      <header className="list-header">
        <button className="back-button" onClick={() => navigate('/labour')}>← Back</button>
        <h1>Available Labours</h1>
      </header>

      {labours.length === 0 ? (
        <div className="empty-state">
          <p>No labours available at the moment.</p>
          <button onClick={() => navigate('/labour/list')} className="action-button">
            List a Labour
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {labours.map((labour) => (
            <div key={labour.id} className="item-card">
              <h3>{labour.name}</h3>
              <p><strong>Age:</strong> {labour.age}</p>
              <p><strong>Gender:</strong> {labour.gender}</p>
              <p><strong>Contact:</strong> {labour.contact}</p>
              <button 
                onClick={() => handleHire(labour.id)}
                className="hire-button"
              >
                Hire
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HireLabour;