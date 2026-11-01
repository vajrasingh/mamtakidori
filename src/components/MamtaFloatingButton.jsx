import React from 'react';
import { useApp } from '../context/AppContext';
import { Mic, Sparkles } from 'lucide-react';

export const MamtaFloatingButton = () => {
  const { currentScreen, navigateTo, isSpeaking, language } = useApp();

  // Hide on splash, language, onboarding, consent, registration, login, and on Mamta AI screen itself
  if ([1, 2, 3, 4, 5, 7, 20].includes(currentScreen)) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '96px',
        right: '16px',
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      {/* Subtle floating badge tooltip */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(23, 54, 83, 0.95) 0%, rgba(43, 87, 128, 0.95) 100%)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '16px',
          fontSize: '11.5px',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 14px rgba(23, 54, 83, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'none',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        <Sparkles size={11} color="var(--soft-blush)" />
        <span>{language === 'en' ? 'Talk to Mamta' : 'ममता से बात'}</span>
      </div>

      {/* Main Circular FAB Button */}
      <button
        onClick={() => navigateTo(7)}
        className="mamta-fab-button"
        aria-label="Talk to Mamta AI"
        title={language === 'en' ? 'Talk to Mamta AI' : 'ममता से बात करें'}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          border: '2.5px solid white',
          padding: 0,
          position: 'relative',
          cursor: 'pointer',
          background: 'var(--warm-rose)',
          boxShadow: isSpeaking
            ? '0 0 0 5px rgba(217, 145, 165, 0.45), 0 8px 24px rgba(23, 54, 83, 0.28)'
            : '0 8px 24px rgba(23, 54, 83, 0.22), 0 0 16px rgba(217, 145, 165, 0.4)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {/* Mamta Avatar */}
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

        {/* Corner Microphone Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--warm-rose-dark) 0%, #D96E8A 100%)',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)'
          }}
        >
          <Mic size={11} color="white" strokeWidth={2.5} />
        </div>
      </button>
    </div>
  );
};
