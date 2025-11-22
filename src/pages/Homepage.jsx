import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: "👨‍🌾",
      label: t("hiringLabours"),
      path: "/labour",
      color: "var(--leaf-green)"
    },
    {
      icon: "🚜",
      label: t("rentFarmingMachine"),
      path: "/machines",
      color: "var(--accent-orange)"
    },
    {
      icon: "🤖",
      label: t("AI Farming Assistant"),
      path: "/ai-assistant",
      color: "var(--secondary-green)"
    },
    {
      icon: "🛒",
      label: t("buyOrSell"),
      path: "/market",
      color: "var(--soil-brown)"
    }
  ];

  return (
    <>
      <div className="homepage">
        <header className="header">
          <h1 className="website-name">🌾 CULTIV</h1>
          <p className="tagline">Your Digital Farming Companion</p>
        </header>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <button
              key={index}
              className="agri-feature-button"
              data-icon={feature.icon}
              onClick={() => feature.path ? navigate(feature.path) : feature.action()}
              style={{ '--feature-color': feature.color }}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="about">
        <h1>ABOUT US</h1>
        <p>
          At AgroConnect, we are dedicated to building a smarter, more connected agricultural ecosystem. 
          Our platform brings together farmers, labourers, and machine owners on a single digital space, 
          making essential farming resources accessible, reliable, and easy to use.
        </p>
        <p>
          We enable labourers to list their skills and connect with farmers who need their support, 
          while machine owners can rent out equipment to those who require modern tools for efficient cultivation. 
          By streamlining hiring and renting, we reduce effort, save time, and bring transparency to key farming operations.
        </p>
        <p>
          Beyond this, AgroConnect offers a simple and secure marketplace where farmers can buy and sell crops directly. 
          Our mission is to empower the agricultural community with technology-driven solutions that boost productivity, 
          improve decision-making, and foster sustainable growth across the farming ecosystem.
        </p>
      </div>

      <div className="agri-divider"></div>

      <footer className="agri-footer">
        <div className="footer-section">
          <h3>Founders</h3>
          <ul>
            <li>Pranav Verma</li>
            <li>Mohit Rohda</li>
            <li>Snehal Singh</li>
            <li>Pradipta Kar</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Mission</h3>
          <p>
            "A nation grows when its farmers grow — empowering agriculture means empowering the future. 
            We're committed to bridging technology and tradition for sustainable farming."
          </p>
        </div>
      </footer>
    </>
  );
};

export default Homepage;
