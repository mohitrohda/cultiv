import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

// Import Pages
import AuthPage from './pages/AuthPage';
import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import Homepage from './pages/Homepage';
import LabourMain from './pages/LabourMain';
import ListLabour from './pages/ListLabour';
import HireLabour from './pages/HireLabour';
import MachineMain from './pages/MachineMain';
import UploadMachine from './pages/UploadMachine';
import RentMachine from './pages/RentMachine';
import BuySellMain from './pages/BuySellMain';
import ForSeller from './pages/ForSeller';
import ForBuyer from './pages/ForBuyer';
import AIFarmingAssistant from './pages/AIFarmingAssistant';
import EnhancedListLabour from './pages/EnhancedListLabour';
import EnhancedHireLabour from './pages/EnhancedHireLabour';
import FirestoreDebug from './pages/FirestoreDebug';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/role" element={<RoleSelection />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            } />
            <Route path="/labour" element={
              <ProtectedRoute>
                <LabourMain />
              </ProtectedRoute>
            } />
            <Route path="/firestore-debug" element={
              <ProtectedRoute>
                <FirestoreDebug />
              </ProtectedRoute>
            } />
            
            {/* Use Enhanced Labour Pages */}
            <Route path="/labour/list" element={
              <ProtectedRoute>
                <EnhancedListLabour />
              </ProtectedRoute>
            } />
            <Route path="/labour/hire" element={
              <ProtectedRoute>
                <EnhancedHireLabour />
              </ProtectedRoute>
            } />
            <Route path="/machines" element={
              <ProtectedRoute>
                <MachineMain />
              </ProtectedRoute>
            } />
            <Route path="/machines/upload" element={
              <ProtectedRoute>
                <UploadMachine />
              </ProtectedRoute>
            } />
            <Route path="/machines/rent" element={
              <ProtectedRoute>
                <RentMachine />
              </ProtectedRoute>
            } />
            <Route path="/market" element={
              <ProtectedRoute>
                <BuySellMain />
              </ProtectedRoute>
            } />
            <Route path="/market/sell" element={
              <ProtectedRoute>
                <ForSeller />
              </ProtectedRoute>
            } />
            <Route path="/market/buy" element={
              <ProtectedRoute>
                <ForBuyer />
              </ProtectedRoute>
            } />
            <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <AIFarmingAssistant />
              </ProtectedRoute>
            } />
            
            {/* Redirects */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;