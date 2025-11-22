import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { machineService } from '../services/databaseService';
import '../styles/List.css';

const RentMachine = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    const machinesData = await machineService.getMachines();
    const availableMachines = machinesData.filter(machine => machine.status === 'available');
    setMachines(availableMachines);
    setLoading(false);
  };

  const handleRent = async (machineId) => {
    if (window.confirm('Are you sure you want to rent this machine?')) {
      const result = await machineService.rentMachine(machineId);
      if (result.success) {
        alert('Machine rented successfully!');
        loadMachines();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading machines...</div>;
  }

  return (
    <div className="list-container">
      <header className="list-header">
        <button className="back-button" onClick={() => navigate('/machines')}>← Back</button>
        <h1>Available Machines</h1>
      </header>

      {machines.length === 0 ? (
        <div className="empty-state">
          <p>No machines available for rent at the moment.</p>
          <button onClick={() => navigate('/machines/upload')} className="action-button">
            Upload a Machine
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {machines.map((machine) => (
            <div key={machine.id} className="item-card">
              <h3>{machine.name}</h3>
              <p><strong>Manufacture Year:</strong> {machine.manufactureYear}</p>
              <p><strong>Price:</strong> ₹{machine.price}/day</p>
              <button 
                onClick={() => handleRent(machine.id)}
                className="hire-button"
              >
                Rent
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentMachine;