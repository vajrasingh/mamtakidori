import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  PhoneCall, 
  Volume2
} from 'lucide-react';

export const TopHeader = () => {
  const { 
    currentScreen, 
    goBack, 
    navigateTo, 
    language, 
    isSpeaking,
    t
  } = useApp();

  const isMainTab = [1, 2, 3, 6, 7, 9, 14, 20].includes(currentScreen);

  return (
    <header className="top-app-bar">
      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', gap: '8px' }}>
        {!isMainTab && (
          <button 
            onClick={goBack} 
            className="header-icon-btn"
            title={t.app.back}
            style={{
              background: 'var(--powder-blue)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--deep-navy)'
            }}
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div 
          onClick={() => navigateTo(7)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer' 
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src="/assets/mamta_ai_avatar.jpg" 
              alt="Mamta AI" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--powder-blue)',
                boxShadow: isSpeaking ? '0 0 12px var(--warm-rose)' : 'none',
                transition: 'all 0.3s'
              }}
            />
            {isSpeaking && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--color-success)',
                border: '2px solid white'
              }} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {t.app.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {language === 'hi' ? 'सखी ममता' : 'Mamta AI'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Urgent Help (SOS) */}
        <button
          onClick={() => navigateTo(16)}
          className="btn-sos"
          style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '4px' }}
          title={t.app.urgentHelp}
        >
          <PhoneCall size={13} />
          <span>108 आपातकालीन</span>
        </button>
      </div>
    </header>
  );
};
