import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { labourService } from '../services/databaseService';
import '../styles/EnhancedLabourForm.css';

const EnhancedListLabour = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [experienceFields, setExperienceFields] = useState([{ crop: '', duration: '', farmSize: '', employer: '' }]);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    wages: '',
    availableFrom: '',
    availableTo: '',
    preferredCrops: [],
    languages: ['Hindi'],
    education: '',
    certification: ''
  });

  // Available skills and crops for selection
  const availableSkills = [
    'Ploughing', 'Sowing', 'Weeding', 'Harvesting', 'Irrigation', 
    'Pruning', 'Fertilizing', 'Pest Control', 'Tractor Operation',
    'Organic Farming', 'Greenhouse Management', 'Dairy Farming'
  ];

  const availableCrops = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Pulses',
    'Vegetables', 'Fruits', 'Spices', 'Flowers', 'Coffee', 'Tea'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experienceFields];
    updatedExperiences[index][field] = value;
    setExperienceFields(updatedExperiences);
  };

  const addExperienceField = () => {
    setExperienceFields([...experienceFields, { crop: '', duration: '', farmSize: '', employer: '' }]);
  };

  const removeExperienceField = (index) => {
    if (experienceFields.length > 1) {
      const updatedExperiences = experienceFields.filter((_, i) => i !== index);
      setExperienceFields(updatedExperiences);
    }
  };

  const handleSkillAdd = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handlePreferredCropChange = (crop) => {
    const updatedCrops = formData.preferredCrops.includes(crop)
      ? formData.preferredCrops.filter(c => c !== crop)
      : [...formData.preferredCrops, crop];
    
    setFormData(prev => ({
      ...prev,
      preferredCrops: updatedCrops
    }));
  };

  const handleLanguageChange = (language) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    
    setFormData(prev => ({
      ...prev,
      languages: updatedLanguages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty experience fields
    const validExperiences = experienceFields.filter(exp => 
      exp.crop && exp.duration && exp.farmSize
    );

    const labourData = {
      ...formData,
      age: parseInt(formData.age),
      wages: parseFloat(formData.wages),
      experience: validExperiences,
      skills: skills,
      rating: 0,
      totalJobs: 0,
      verified: false
    };

    const result = await labourService.addLabour(labourData);

    if (result.success) {
      alert('Labour listed successfully with experience details!');
      navigate('/labour/hire');
    } else {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="enhanced-labour-container">
      <header className="enhanced-labour-header">
        <button className="back-button" onClick={() => navigate('/labour')}>← Back</button>
        <h1>List a Labour</h1>
        <p className="subtitle">Add detailed information including experience and skills</p>
      </header>

      <form onSubmit={handleSubmit} className="enhanced-labour-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h3>👤 Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="70"
                required
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number *</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter 10-digit phone number"
                pattern="[0-9]{10}"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter complete address"
              />
            </div>
          </div>
        </div>

        {/* Work & Availability Section */}
        <div className="form-section">
          <h3>💼 Work Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="wages">Expected Daily Wages (₹) *</label>
              <input
                type="number"
                id="wages"
                name="wages"
                value={formData.wages}
                onChange={handleChange}
                min="0"
                step="50"
                required
                placeholder="Expected daily wages"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableFrom">Available From *</label>
              <input
                type="date"
                id="availableFrom"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableTo">Available To *</label>
              <input
                type="date"
                id="availableTo"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="education">Education Level</label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
              >
                <option value="">Select Education</option>
                <option value="Illiterate">Illiterate</option>
                <option value="Primary">Primary School</option>
                <option value="Secondary">Secondary School</option>
                <option value="High School">High School</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="form-section">
          <h3>🛠️ Skills & Expertise</h3>
          <div className="skills-section">
            <div className="skills-input">
              <select
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                className="skill-select"
              >
                <option value="">Select a skill</option>
                {availableSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <button type="button" onClick={handleSkillAdd} className="add-skill-btn">
                Add Skill
              </button>
            </div>
            
            <div className="skills-list">
              {skills.map(skill => (
                <div key={skill} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => handleSkillRemove(skill)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop Experience Section */}
        <div className="form-section">
          <h3>🌾 Crop Experience</h3>
          {experienceFields.map((experience, index) => (
            <div key={index} className="experience-row">
              <div className="experience-grid">
                <div className="form-group">
                  <label>Crop/Farming Type</label>
                  <select
                    value={experience.crop}
                    onChange={(e) => handleExperienceChange(index, 'crop', e.target.value)}
                    required={index === 0}
                  >
                    <option value="">Select Crop</option>
                    {availableCrops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    value={experience.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    min="0"
                    max="50"
                    placeholder="Years"
                    required={index === 0}
                  />
                </div>

                <div className="form-group">
                  <label>Farm Size (Acres)</label>
                  <input
                    type="number"
                    value={experience.farmSize}
                    onChange={(e) => handleExperienceChange(index, 'farmSize', e.target.value)}
                    min="0"
                    step="0.1"
                    placeholder="Acres"
                  />
                </div>

                <div className="form-group">
                  <label>Previous Employer</label>
                  <input
                    type="text"
                    value={experience.employer}
                    onChange={(e) => handleExperienceChange(index, 'employer', e.target.value)}
                    placeholder="Employer name"
                  />
                </div>
              </div>
              
              {experienceFields.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeExperienceField(index)}
                  className="remove-experience-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          
          <button type="button" onClick={addExperienceField} className="add-experience-btn">
            + Add Another Crop Experience
          </button>
        </div>

        {/* Preferred Crops Section */}
        <div className="form-section">
          <h3>⭐ Preferred Crops to Work With</h3>
          <div className="crops-grid">
            {availableCrops.map(crop => (
              <label key={crop} className="crop-checkbox">
                <input
                  type="checkbox"
                  checked={formData.preferredCrops.includes(crop)}
                  onChange={() => handlePreferredCropChange(crop)}
                />
                <span>{crop}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="form-section">
          <h3>🗣️ Languages Known</h3>
          <div className="languages-grid">
            {['Hindi', 'English', 'Punjabi', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Gujarati'].map(language => (
              <label key={language} className="language-checkbox">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Listing Labour...' : 'List Labour with Experience'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedListLabour;