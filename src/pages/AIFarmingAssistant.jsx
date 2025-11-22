import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AIAssistant.css';

const AIFarmingAssistant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [cropInfo, setCropInfo] = useState(null);
  const [error, setError] = useState(null);
  
  // Pre-typed values with realistic agricultural data
  const [formData, setFormData] = useState({
    nitrogen: '50',
    phosphorus: '50',
    potassium: '50',
    temperature: '25.0',
    humidity: '80.0',
    ph_value: '6.5',
    rainfall: '150.0'
  });

  // API endpoint - adjust this based on your deployment
  const API_URL = 'http://localhost:5001'; // Change this in production

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear previous results when user changes input
    setPrediction(null);
    setError(null);
  };

  const predictCrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setConfidence(null);
    setCropInfo(null);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nitrogen: parseInt(formData.nitrogen),
          phosphorus: parseInt(formData.phosphorus),
          potassium: parseInt(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph_value: parseFloat(formData.ph_value),
          rainfall: parseFloat(formData.rainfall)
        })
      });

      const result = await response.json();

      if (result.success) {
        setPrediction(result.prediction);
        setConfidence(result.confidence);
        setCropInfo(result.crop_info);
      } else {
        setError(result.message || 'Prediction failed');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Failed to connect to prediction service. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nitrogen: '50',
      phosphorus: '50',
      potassium: '50',
      temperature: '25.0',
      humidity: '80.0',
      ph_value: '6.5',
      rainfall: '150.0'
    });
    setPrediction(null);
    setConfidence(null);
    setCropInfo(null);
    setError(null);
  };

  // Quick preset buttons for common scenarios
  const presetScenarios = [
    {
      name: 'Rice Conditions',
      data: { nitrogen: '90', phosphorus: '42', potassium: '43', temperature: '20.8', humidity: '82.0', ph_value: '6.5', rainfall: '202.9' }
    },
    {
      name: 'Wheat Conditions', 
      data: { nitrogen: '80', phosphorus: '60', potassium: '50', temperature: '18.0', humidity: '70.0', ph_value: '7.0', rainfall: '100.0' }
    },
    {
      name: 'Cotton Conditions',
      data: { nitrogen: '100', phosphorus: '45', potassium: '40', temperature: '28.0', humidity: '65.0', ph_value: '7.2', rainfall: '80.0' }
    }
  ];

  const applyPreset = (presetData) => {
    setFormData(presetData);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-glass-container">
        <header className="ai-header">
          <button className="ai-back-button" onClick={() => navigate('/home')}>
            ← Back to Home
          </button>
          <h1>🌱 AI Farming Assistant</h1>
          <p className="ai-subtitle">
            Get intelligent crop recommendations based on your soil and weather conditions
          </p>
        </header>

        {/* Quick Presets */}
        <div className="preset-section">
          <h3>Quick Presets:</h3>
          <div className="preset-buttons">
            {presetScenarios.map((preset, index) => (
              <button
                key={index}
                className="preset-button"
                onClick={() => applyPreset(preset.data)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-content">
          <div className="input-section">
            <form onSubmit={predictCrop} className="ai-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nitrogen">
                    <span className="input-icon">🌿</span>
                    Nitrogen (N)
                  </label>
                  <input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    min="0"
                    max="140"
                    required
                  />
                  <div className="input-help">Soil nitrogen content in kg/ha (0-140)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="phosphorus">
                    <span className="input-icon">🧪</span>
                    Phosphorus (P)
                  </label>
                  <input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    min="0"
                    max="145"
                    required
                  />
                  <div className="input-help">Soil phosphorus content in kg/ha (0-145)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="potassium">
                    <span className="input-icon">⚡</span>
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    id="potassium"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    min="0"
                    max="205"
                    required
                  />
                  <div className="input-help">Soil potassium content in kg/ha (0-205)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="temperature">
                    <span className="input-icon">🌡️</span>
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="50"
                    required
                  />
                  <div className="input-help">Average temperature in Celsius (0-50°C)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="humidity">
                    <span className="input-icon">💧</span>
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    id="humidity"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="100"
                    required
                  />
                  <div className="input-help">Relative humidity percentage (0-100%)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="ph_value">
                    <span className="input-icon">📊</span>
                    pH Value
                  </label>
                  <input
                    type="number"
                    id="ph_value"
                    name="ph_value"
                    value={formData.ph_value}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="14"
                    required
                  />
                  <div className="input-help">Soil pH level (0-14 scale, 6.0-7.5 optimal)</div>
                </div>

                <div className="form-group">
                  <label htmlFor="rainfall">
                    <span className="input-icon">🌧️</span>
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    id="rainfall"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="300"
                    required
                  />
                  <div className="input-help">Annual rainfall in millimeters (0-300mm)</div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="predict-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🤖</span>
                      Get Crop Recommendation
                    </>
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="reset-button"
                  onClick={resetForm}
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          {prediction && cropInfo && (
            <div className="result-section">
              <div className="prediction-card">
                <div className="prediction-header">
                  <h3>🌾 Recommended Crop</h3>
                  {confidence && (
                    <div className="confidence-badge">
                      AI Confidence: {confidence}%
                    </div>
                  )}
                </div>
                
                <div className="prediction-result">
                  <div className="crop-name">{prediction}</div>
                  <div className="crop-description">
                    {cropInfo.description}
                  </div>
                </div>

                <div className="crop-details">
                  <div className="detail-item">
                    <strong>🌤️ Growing Season:</strong> {cropInfo.season}
                  </div>
                  <div className="detail-item">
                    <strong>💧 Water Requirement:</strong> {cropInfo.water}
                  </div>
                  <div className="detail-item">
                    <strong>🌱 Soil Type:</strong> {cropInfo.soil}
                  </div>
                  <div className="detail-item">
                    <strong>📅 Growth Duration:</strong> {cropInfo.duration}
                  </div>
                  <div className="detail-item">
                    <strong>🧪 Fertilizer:</strong> {cropInfo.fertilizer}
                  </div>
                </div>

                <div className="prediction-actions">
                  <button className="save-button" onClick={() => alert('Feature coming soon!')}>
                    💾 Save Recommendation
                  </button>
                  <button className="share-button" onClick={() => alert('Feature coming soon!')}>
                    📤 Share Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {!prediction && !loading && !error && (
            <div className="info-section">
              <div className="info-card">
                <h4>💡 How it works</h4>
                <ul>
                  <li>Enter your soil nutrient levels and environmental conditions</li>
                  <li>Our AI analyzes 7 key parameters for optimal crop selection</li>
                  <li>Get personalized recommendations with confidence scores</li>
                  <li>Based on machine learning trained on 2200+ agricultural data points</li>
                  <li>Model accuracy: 98.18% (Decision Tree Classifier)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFarmingAssistant;