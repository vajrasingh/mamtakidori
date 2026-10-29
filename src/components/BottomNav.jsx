import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, CalendarCheck, MessageSquareHeart, Users } from 'lucide-react';

export const BottomNav = () => {
  const { currentScreen, navigateTo, t, role } = useApp();

  // Hide bottom nav on splash, language, onboarding, and registration
  if ([1, 2, 3, 4, 5].includes(currentScreen)) {
    return null;
  }

  const isHomeActive = currentScreen === 6;
  const isCareActive = [8, 9, 15, 11].includes(currentScreen);
  const isAiActive = [7, 10].includes(currentScreen);
  const isSupportActive = [14, 16, 17, 18].includes(currentScreen);

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

      {/* 3. Talk to Mamta (Prominent AI Companion Center Action) */}
      <button 
        className={`nav-tab-item ai-center-tab ${isAiActive ? 'is-active' : ''}`}
        onClick={() => navigateTo(7)}
        aria-label="Talk to Mamta AI"
      >
        <div className="ai-center-button">
          <img 
            src="/assets/mamta_ai_avatar.jpg" 
            alt="Mamta AI"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        </div>
        <span style={{ fontWeight: 700, marginTop: '2px', color: 'var(--deep-navy)' }}>
          {t.nav.talkToMamta}
        </span>
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
