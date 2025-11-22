import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { labourService } from '../services/databaseService';

import '../styles/EnhancedLabourList.css';

const EnhancedHireLabour = () => {
  const navigate = useNavigate();
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const [filters, setFilters] = useState({
    skill: '',
    cropExperience: '',
    minExperience: '',
    maxWage: ''
  });

  const availableSkills = [
    'Ploughing', 'Sowing', 'Weeding', 'Harvesting', 'Irrigation', 
    'Pruning', 'Fertilizing', 'Pest Control', 'Tractor Operation'
  ];

  const availableCrops = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Pulses',
    'Vegetables', 'Fruits', 'Spices', 'Flowers', 'Coffee', 'Tea'
  ];

  useEffect(() => {
    console.log('🔍 Component mounted, loading labours...');
    loadLabours();
  }, [filters]);

  const loadLabours = async () => {
    console.log('🔄 Loading labours with filters:', filters);
    setLoading(true);
    setDebugInfo('Loading labours...');
    
    try {
      const laboursData = await labourService.getLabours({
        status: 'available',
        ...filters
      });
      
      console.log('✅ Received labours data:', laboursData);
      console.log('📊 Number of labours:', laboursData.length);
      
      // Debug each labour
      laboursData.forEach((labour, index) => {
        console.log(`👤 Labour ${index + 1}:`, {
          id: labour.id,
          name: labour.name,
          status: labour.status,
          skills: labour.skills,
          experience: labour.experience,
          wages: labour.wages
        });
      });
      
      setLabours(laboursData);
      setDebugInfo(`Found ${laboursData.length} labours. Check console for details.`);
      
    } catch (error) {
      console.error('❌ Error loading labours:', error);
      setLabours([]);
      setDebugInfo(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    console.log('⚙️ Filter changed:', filterName, value);
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleHire = async (labourId) => {
    if (window.confirm('Are you sure you want to hire this labour?')) {
      const result = await labourService.hireLabour(labourId);
      if (result.success) {
        alert('Labour hired successfully!');
        loadLabours();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  const calculateTotalExperience = (experience) => {
    if (!experience || !Array.isArray(experience)) return 0;
    return experience.reduce((total, exp) => total + parseInt(exp.duration || 0), 0);
  };

  const getStarRating = (rating) => {
    if (!rating || rating === 0) return 'New';
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  // Test with sample data if no labours found
  const addTestData = async () => {
    console.log('🧪 Adding test labour data...');
    const testLabour = {
      name: 'Test Labour',
      age: '30',
      gender: 'Male',
      contact: '9876543210',
      address: 'Test Village',
      wages: '500',
      availableFrom: '2024-01-01',
      availableTo: '2024-12-31',
      experience: [{ crop: 'Rice', duration: '5', farmSize: '10', employer: 'Test Farm' }],
      skills: ['Ploughing', 'Sowing'],
      preferredCrops: ['Rice', 'Wheat'],
      languages: ['Hindi', 'English'],
      education: 'High School'
    };

    const result = await labourService.addLabour(testLabour);
    if (result.success) {
      alert('Test labour added! Refreshing...');
      loadLabours();
    } else {
      alert('Failed to add test labour: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="enhanced-labour-list-container">
        <header className="list-header">
          <button className="back-button" onClick={() => navigate('/labour')}>← Back</button>
          <h1>Available Labours</h1>
          <p className="subtitle">Find skilled agricultural workers with detailed experience</p>
        </header>
        <div className="loading">Loading labours...</div>
      </div>
    );
  }

  return (
    <div className="enhanced-labour-list-container">
      <header className="list-header">
        <button className="back-button" onClick={() => navigate('/labour')}>← Back</button>
        <h1>Available Labours</h1>
        <p className="subtitle">Find skilled agricultural workers with detailed experience</p>
      </header>

      {/* Debug Info Section 
      <div className="debug-section">
        <h3>🔧 Debug Information</h3>
        <div className="debug-info">
          <p><strong>Status:</strong> {debugInfo}</p>
          <p><strong>Labours Count:</strong> {labours.length}</p>
          <p><strong>Current Filters:</strong> {JSON.stringify(filters)}</p>
        </div>
        <div className="debug-actions">
          <button onClick={loadLabours} className="debug-button">
            🔄 Refresh Data
          </button>
          <button onClick={addTestData} className="debug-button">
            🧪 Add Test Labour
          </button>
          <button 
            onClick={() => setFilters({ skill: '', cropExperience: '', minExperience: '', maxWage: '' })}
            className="debug-button"
          >
            🗑️ Clear Filters
          </button>
        </div>
      </div> */}

      {/* Filters Section */}
      <div className="filters-section">
        <h3>🔍 Filter Labours</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Skill</label>
            <select 
              value={filters.skill} 
              onChange={(e) => handleFilterChange('skill', e.target.value)}
            >
              <option value="">All Skills</option>
              {availableSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Crop Experience</label>
            <select 
              value={filters.cropExperience} 
              onChange={(e) => handleFilterChange('cropExperience', e.target.value)}
            >
              <option value="">All Crops</option>
              {availableCrops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Min Experience (Years)</label>
            <input
              type="number"
              value={filters.minExperience}
              onChange={(e) => handleFilterChange('minExperience', e.target.value)}
              min="0"
              max="50"
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Max Daily Wage (₹)</label>
            <input
              type="number"
              value={filters.maxWage}
              onChange={(e) => handleFilterChange('maxWage', e.target.value)}
              min="0"
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      {labours.length === 0 ? (
        <div className="empty-state">
          <h3>🚫 No Labours Found</h3>
          <p>No labours available matching your criteria. Here are some things to try:</p>
          
          <div className="empty-state-actions">
            <button onClick={() => navigate('/labour/list')} className="action-button">
              📝 List a New Labour
            </button>
            <button onClick={addTestData} className="debug-button">
              🧪 Add Test Labour
            </button>
          </div>
        </div>
      ) : (
        <div className="labours-grid">
          {labours.map((labour) => (
            <div key={labour.id} className="labour-card">
              <div className="labour-header">
                <div className="labour-basic-info">
                  <h3>{labour.name || 'Unknown Name'}</h3>
                  <div className="labour-meta">
                    <span>👤 {labour.age || 'N/A'} years • {labour.gender || 'N/A'}</span>
                    <span>📞 {labour.contact || 'No contact'}</span>
                  </div>
                </div>
                <div className="labour-rating">
                  {labour.rating > 0 ? getStarRating(labour.rating) : 'New'}
                  {labour.totalJobs > 0 && <span>({labour.totalJobs} jobs)</span>}
                </div>
              </div>

              <div className="labour-details">
                <div className="detail-row">
                  <strong>💰 Daily Wage:</strong> ₹{labour.wages || 'Not specified'}
                </div>
                <div className="detail-row">
                  <strong>📍 Location:</strong> {labour.address || 'Not specified'}
                </div>
                <div className="detail-row">
                  <strong>📅 Availability:</strong> {labour.availableFrom || 'Not specified'} to {labour.availableTo || 'Not specified'}
                </div>
              </div>

              {/* Skills Section */}
              {labour.skills && labour.skills.length > 0 && (
                <div className="skills-section">
                  <strong>🛠️ Skills:</strong>
                  <div className="skills-tags">
                    {labour.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {labour.experience && labour.experience.length > 0 && (
                <div className="experience-section">
                  <strong>🌾 Experience:</strong>
                  <div className="experience-list">
                    {labour.experience.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <span className="crop-name">{exp.crop}</span>
                        <span className="exp-duration">{exp.duration} years</span>
                        {exp.farmSize && <span className="farm-size">{exp.farmSize} acres</span>}
                        {exp.employer && <span className="employer">@{exp.employer}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="total-experience">
                    Total Experience: {calculateTotalExperience(labour.experience)} years
                  </div>
                </div>
              )}

              {/* Preferred Crops */}
              {labour.preferredCrops && labour.preferredCrops.length > 0 && (
                <div className="preferred-crops">
                  <strong>⭐ Preferred Crops:</strong>
                  <div className="crops-tags">
                    {labour.preferredCrops.map(crop => (
                      <span key={crop} className="crop-tag">{crop}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {labour.languages && labour.languages.length > 0 && (
                <div className="languages-section">
                  <strong>🗣️ Languages:</strong>
                  <div className="languages-tags">
                    {labour.languages.map(lang => (
                      <span key={lang} className="language-tag">{lang}</span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => handleHire(labour.id)}
                className="hire-button"
              >
                📞 Hire This Labour
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedHireLabour;