import React, { useState } from 'react'; // Make sure useState is imported
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { authService } from '../services/authService';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Role.css';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'farmer', label: t('farmer'), icon: '👨‍🌾' },
    { id: 'merchant', label: t('merchant'), icon: '👨‍💼' },
    { id: 'worker', label: t('worker'), icon: '👷' },
    { id: 'buyer', label: t('buyer'), icon: '🛒' }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    
    try {
      const user = auth.currentUser;
      if (user) {
        const result = await authService.updateUserRole(user.uid, selectedRole);
        if (result.success) {
          navigate('/home');
        } else {
          alert('Error saving role: ' + result.error);
        }
      } else {
        navigate('/auth');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-container">
      <div className="role-card">
        <h1 className="role-title">{t('selectIdentity')}</h1>
        <p className="role-subtitle">Choose the role that best describes you</p>

        <form onSubmit={handleSubmit} className="role-form">
          <div className="role-options">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-option ${selectedRole === role.id ? 'selected' : ''}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <span className="role-icon">{role.icon}</span>
                <span className="role-label">{role.label}</span>
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="role-submit-btn"
            disabled={!selectedRole || loading}
          >
            {loading ? 'Saving...' : t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;