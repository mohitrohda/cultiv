import React, { useState } from 'react'; // Add useState import
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Language.css';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { switchLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Now useState is defined

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    switchLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      navigate('/role');
    }
  };

  return (
    <div className="language-container">
      <div className="language-card">
        <h1 className="language-title">{t('selectLanguage')}</h1>
        <p className="language-subtitle">Choose your preferred language</p>

        <div className="language-options">
          <button
            className={`language-option ${selectedLanguage === 'english' ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect('english')}
          >
            <span className="flag">🇺🇸</span>
            <span className="language-name">{t('english')}</span>
          </button>

          <button
            className={`language-option ${selectedLanguage === 'hindi' ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect('hindi')}
          >
            <span className="flag">🇮🇳</span>
            <span className="language-name">{t('hindi')}</span>
          </button>
        </div>

        <button 
          className="continue-btn"
          onClick={handleContinue}
          disabled={!selectedLanguage}
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;