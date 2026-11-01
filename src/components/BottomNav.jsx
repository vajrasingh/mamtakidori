import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, FileText, User, HeartHandshake } from 'lucide-react';

export const BottomNav = () => {
  const { currentScreen, navigateTo, role, language } = useApp();

  // Hide bottom nav on splash, language, onboarding, registration, and login OTP
  if ([1, 2, 3, 4, 5, 20].includes(currentScreen)) {
    return null;
  }

  const isHomeActive = currentScreen === 6;
  const isProfileActive = currentScreen === 21;
  const isRecordsActive = [17, 9, 11].includes(currentScreen);
  const isSupportActive = currentScreen === 16 || currentScreen === 18;

  return (
    <nav className="bottom-nav-bar" aria-label="Main Navigation">
      {/* 1. Home */}
      <button 
        className={`nav-tab-item ${isHomeActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(6)}
      >
        <div className="nav-icon-container">
          <Home size={22} strokeWidth={isHomeActive ? 2.5 : 2} />
        </div>
        <span>{language === 'en' ? 'Home' : 'होम'}</span>
      </button>

      {/* 2. Profile (in place of My Care) */}
      <button 
        className={`nav-tab-item ${isProfileActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(21)}
      >
        <div className="nav-icon-container">
          <User size={22} strokeWidth={isProfileActive ? 2.5 : 2} />
        </div>
        <span>{language === 'en' ? 'Profile' : 'प्रोफ़ाइल'}</span>
      </button>

      {/* 3. Health Record */}
      <button 
        className={`nav-tab-item ${isRecordsActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(17)}
      >
        <div className="nav-icon-container">
          <FileText size={22} strokeWidth={isRecordsActive ? 2.5 : 2} />
        </div>
        <span>{language === 'en' ? 'Records' : 'रिकॉर्ड्स'}</span>
      </button>

      {/* 4. Health Support & SOS (Screen 16) */}
      <button 
        className={`nav-tab-item ${isSupportActive ? 'is-active' : ''}`}
        onClick={() => {
          if (role === 'asha') navigateTo(18);
          else navigateTo(16);
        }}
      >
        <div className="nav-icon-container">
          <HeartHandshake size={22} strokeWidth={isSupportActive ? 2.5 : 2} />
        </div>
        <span>{language === 'en' ? 'Support' : 'सहायता'}</span>
      </button>
    </nav>
  );
};
