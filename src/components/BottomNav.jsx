import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, CalendarCheck, FileText, Users } from 'lucide-react';

export const BottomNav = () => {
  const { currentScreen, navigateTo, t, role, language } = useApp();

  // Hide bottom nav on splash, language, onboarding, registration, and login OTP
  if ([1, 2, 3, 4, 5, 20].includes(currentScreen)) {
    return null;
  }

  const isHomeActive = currentScreen === 6;
  const isCareActive = [8, 9, 15].includes(currentScreen);
  const isRecordsActive = [17, 11].includes(currentScreen);
  const isSupportActive = [14, 16, 18].includes(currentScreen);

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
        <span>{t.nav.home}</span>
      </button>

      {/* 2. My Care */}
      <button 
        className={`nav-tab-item ${isCareActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(9)}
      >
        <div className="nav-icon-container">
          <CalendarCheck size={22} strokeWidth={isCareActive ? 2.5 : 2} />
        </div>
        <span>{t.nav.myCare}</span>
      </button>

      {/* 3. Health Record (in place of Mamta) */}
      <button 
        className={`nav-tab-item ${isRecordsActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(17)}
      >
        <div className="nav-icon-container">
          <FileText size={22} strokeWidth={isRecordsActive ? 2.5 : 2} />
        </div>
        <span>{language === 'en' ? 'Health Record' : 'हेल्थ रिकॉर्ड'}</span>
      </button>

      {/* 4. My Support */}
      <button 
        className={`nav-tab-item ${isSupportActive ? 'is-active' : ''}`}
        onClick={() => {
          if (role === 'asha') navigateTo(18);
          else if (role === 'mil') navigateTo(14);
          else navigateTo(14);
        }}
      >
        <div className="nav-icon-container">
          <Users size={22} strokeWidth={isSupportActive ? 2.5 : 2} />
        </div>
        <span>{t.nav.mySupport}</span>
      </button>
    </nav>
  );
};
