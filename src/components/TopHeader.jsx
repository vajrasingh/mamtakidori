import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Globe, 
  PhoneCall, 
  UserCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

export const TopHeader = () => {
  const { 
    currentScreen, 
    goBack, 
    navigateTo, 
    language, 
    toggleLanguage, 
    role, 
    setRole, 
    setIsJumperOpen,
    isSpeaking,
    t
  } = useApp();

  const isMainTab = [1, 2, 3, 6, 7, 9, 14].includes(currentScreen);

  const getRoleLabel = () => {
    if (role === 'mil') return t.app.milRole;
    if (role === 'asha') return t.app.ashaRole;
    return t.app.motherRole;
  };

  const cycleRole = () => {
    if (role === 'mother') {
      setRole('mil');
      navigateTo(14); // Jump to Mother-in-Law screen
    } else if (role === 'mil') {
      setRole('asha');
      navigateTo(18); // Jump to ASHA mode screen
    } else {
      setRole('mother');
      navigateTo(6); // Back to Home
    }
  };

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Role Switcher Pill */}
        <button
          onClick={cycleRole}
          className="m-badge m-badge-blue"
          title="भूमिका बदलें (Switch Role)"
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '11px',
            border: '1px solid rgba(65, 111, 152, 0.25)',
            background: role === 'asha' ? 'var(--color-success-bg)' : role === 'mil' ? 'var(--soft-blush)' : 'var(--powder-blue)'
          }}
        >
          <UserCheck size={12} />
          <span>{getRoleLabel()}</span>
        </button>

        {/* Regional Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="m-badge"
          style={{
            cursor: 'pointer',
            background: 'var(--surface-white)',
            border: '1px solid rgba(65, 111, 152, 0.25)',
            padding: '4px 8px',
            fontSize: '11.5px',
            fontWeight: 800,
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
          title="क्षेत्रीय भाषा व बोली चुनें (Select Regional Dialect)"
        >
          <Globe size={13} />
          <span>
            {language === 'bho' ? 'भोजपुरी' : 
             language === 'mai' ? 'मैथिली' : 
             language === 'raj' ? 'राजस्थानी' : 
             language === 'bn' ? 'বাংলা' : 
             language === 'mr' ? 'मराठी' : 
             language === 'en' ? 'Eng' : 'हिन्दी'}
          </span>
        </button>

        {/* Urgent Help (SOS) */}
        <button
          onClick={() => navigateTo(16)}
          className="btn-sos"
          style={{ padding: '5px 10px', fontSize: '12px' }}
          title={t.app.urgentHelp}
        >
          <PhoneCall size={12} />
          <span>108</span>
        </button>

        {/* Screen Jumper for testing/presentation */}
        <button
          onClick={() => setIsJumperOpen(true)}
          style={{
            background: 'rgba(23, 54, 83, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
          title="All 18 Screens Directory"
        >
          <Layers size={16} />
        </button>
      </div>
    </header>
  );
};
