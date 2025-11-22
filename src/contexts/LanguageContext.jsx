import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  // Safe fallback if context is not available
  if (!context) {
    console.warn('useLanguage used outside LanguageProvider, using fallback');
    const fallbackTranslations = {
      // Add some basic fallback translations here
      login: "Login",
      signup: "Sign Up",
      // ... add other keys as needed
    };
    
    return {
      language: 'english',
      switchLanguage: () => {},
      t: (key) => fallbackTranslations[key] || key
    };
  }
  
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const [translations, setTranslations] = useState({});

  // Translations dictionary
  const translationData = {
    english: {
      // Auth Page
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      submit: "Submit",
      dontHaveAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      switchToSignup: "Switch to Sign Up",
      switchToLogin: "Switch to Login",
      
      // Language Selection
      selectLanguage: "Select Your Language",
      english: "English",
      hindi: "Hindi",
      continue: "Continue",
      
      // Role Selection
      selectIdentity: "Which identity defines you well?",
      farmer: "Farmer",
      merchant: "Merchant",
      worker: "Worker",
      buyer: "Buyer",
      
      // Homepage
      hiringLabours: "Hiring Labours",
      rentFarmingMachine: "Rent Farming Machine",
      trackYourLand: "Track your land",
      buyOrSell: "Buy or Sell",
      
      // Labour Pages
      labourManagement: "Labour Management",
      listingALabour: "Listing a Labour",
      hiringALabour: "Hiring a Labour",
      listALabour: "List a Labour",
      availableLabours: "Available Labours",
      noLaboursAvailable: "No labours available at the moment.",
      
      // Machine Pages
      farmingMachines: "Farming Machines",
      uploadMachineForRent: "Upload Your Machine For Rent",
      rentTheMachine: "Rent The Machine",
      uploadMachine: "Upload Machine for Rent",
      availableMachines: "Available Machines",
      noMachinesAvailable: "No machines available for rent at the moment.",
      
      // Market Pages
      buyOrSell: "Buy or Sell",
      forBuyer: "For Buyer",
      forSeller: "For Seller",
      sellYourProduce: "Sell Your Produce",
      availableProduce: "Available Produce",
      noProduceAvailable: "No produce available for sale at the moment.",
      
      // Common
      name: "Name",
      age: "Age",
      gender: "Gender",
      contactNumber: "Contact Number",
      machineName: "Machine Name",
      manufactureYear: "Manufacture Year",
      rentingPrice: "Renting Price",
      price: "Price",
      type: "Type",
      harvestDate: "Harvest Date",
      back: "Back",
      hire: "Hire",
      rent: "Rent",
      buy: "Buy"
    },
    hindi: {
      // Auth Page
      login: "लॉगिन",
      signup: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      submit: "जमा करें",
      dontHaveAccount: "खाता नहीं है?",
      haveAccount: "पहले से खाता है?",
      switchToSignup: "साइन अप पर जाएं",
      switchToLogin: "लॉगिन पर जाएं",
      
      // Language Selection
      selectLanguage: "अपनी भाषा चुनें",
      english: "अंग्रेजी",
      hindi: "हिंदी",
      continue: "जारी रखें",
      
      // Role Selection
      selectIdentity: "कौन सी पहचान आपको बेहतर परिभाषित करती है?",
      farmer: "किसान",
      merchant: "व्यापारी",
      worker: "मजदूर",
      buyer: "खरीदार",
      
      // Homepage
      hiringLabours: "मजदूरों को किराय पर रखना",
      rentFarmingMachine: "कृषि मशीन किराए पर लें",
      trackYourLand: "अपनी जमीन ट्रैक करें",
      buyOrSell: "खरीदें या बेचें",
      
      // Labour Pages
      labourManagement: "श्रम प्रबंधन",
      listingALabour: "एक मजदूर की सूची बनाना",
      hiringALabour: "एक मजदूर को किराए पर रखना",
      listALabour: "एक मजदूर सूचीबद्ध करें",
      availableLabours: "उपलब्ध मजदूर",
      noLaboursAvailable: "फिलहाल कोई मजदूर उपलब्ध नहीं है।",
      
      // Machine Pages
      farmingMachines: "कृषि मशीनें",
      uploadMachineForRent: "किराए के लिए अपनी मशीन अपलोड करें",
      rentTheMachine: "मशीन किराए पर लें",
      uploadMachine: "किराए के लिए मशीन अपलोड करें",
      availableMachines: "उपलब्ध मशीनें",
      noMachinesAvailable: "फिलहाल किराए के लिए कोई मशीन उपलब्ध नहीं है।",
      
      // Market Pages
      buyOrSell: "खरीदें या बेचें",
      forBuyer: "खरीदार के लिए",
      forSeller: "विक्रेता के लिए",
      sellYourProduce: "अपना उत्पाद बेचें",
      availableProduce: "उपलब्ध उत्पाद",
      noProduceAvailable: "फिलहाल बिक्री के लिए कोई उत्पाद उपलब्ध नहीं है।",
      
      // Common
      name: "नाम",
      age: "उम्र",
      gender: "लिंग",
      contactNumber: "संपर्क नंबर",
      machineName: "मशीन का नाम",
      manufactureYear: "निर्माण वर्ष",
      rentingPrice: "किराया मूल्य",
      price: "कीमत",
      type: "प्रकार",
      harvestDate: "फसल कटाई की तारीख",
      back: "वापस",
      hire: "किराए पर रखें",
      rent: "किराए पर लें",
      buy: "खरीदें"
    }
  };

  useEffect(() => {
    setTranslations(translationData[language]);
  }, [language]);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('cultiv-language', lang);
  };

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};