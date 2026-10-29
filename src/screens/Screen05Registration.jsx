import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, CheckCircle2, HeartHandshake, ArrowRight, UserCheck, Volume2 } from 'lucide-react';

export const Screen05Registration = () => {
  const { userProfile, setUserProfile, navigateTo, speakText, t, language } = useApp();
  const [name, setName] = useState(userProfile.name);
  const [selectedTrimester, setSelectedTrimester] = useState(1);
  const [isAshaAssisted, setIsAshaAssisted] = useState(true);

  const trimesters = [
    { id: 1, title: t.screen05.firstTrimester, weeks: '1-12 हफ्ते (Weeks)', icon: '🌱' },
    { id: 2, title: t.screen05.secondTrimester, weeks: '13-27 हफ्ते (Weeks)', icon: '🌸' },
    { id: 3, title: t.screen05.thirdTrimester, weeks: '28-40 हफ्ते (Weeks)', icon: '👶' }
  ];

  const handleVoiceInputName = () => {
    speakText(language === 'hi' ? "कृपया अपना नाम बोलें।" : "Please say your name.");
    setTimeout(() => {
      setName(language === 'hi' ? 'रानी देवी' : 'Rani Devi');
    }, 2000);
  };

  const handleComplete = () => {
    setUserProfile(prev => ({
      ...prev,
      name: name || (language === 'hi' ? 'रानी देवी' : 'Rani Devi'),
      week: selectedTrimester === 1 ? 12 : selectedTrimester === 2 ? 20 : 32
    }));
    navigateTo(6); // Go to Home Dashboard
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '6px' }}>
          {t.screen05.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          {t.screen05.subtitle}
        </p>

        <button
          onClick={() => speakText(language === 'hi' 
            ? "अपना नाम लिखें या माइक दबाकर बोलें। इसके बाद अपनी गर्भावस्था का महीना चुनें।" 
            : "Enter your name or tap the mic to speak. Then select your pregnancy month."
          )}
          className="btn-listen"
          style={{ marginTop: '10px' }}
        >
          <Volume2 size={16} />
          <span>{t.screen05.audioPrompt}</span>
        </button>
      </div>

      {/* Name Input with Voice Dictation */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '8px' }}>
          {t.screen05.nameLabel}
        </label>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.screen05.namePlaceholder}
            style={{
              width: '100%',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--powder-blue)',
              padding: '0 54px 0 16px',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--surface-white)',
              outline: 'none'
            }}
          />
          <button
            onClick={handleVoiceInputName}
            title="बोलकर नाम बताएं (Speak Name)"
            style={{
              position: 'absolute',
              right: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--powder-blue)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--deep-navy)',
              cursor: 'pointer'
            }}
          >
            <Mic size={20} />
          </button>
        </div>
      </div>

      {/* Stage / Trimester Selection Cards */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px' }}>
          {t.screen05.stageLabel}
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {trimesters.map(tri => {
            const isSelected = selectedTrimester === tri.id;
            return (
              <div
                key={tri.id}
                onClick={() => setSelectedTrimester(tri.id)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--powder-blue-light)' : 'var(--surface-white)',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid rgba(65, 111, 152, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{tri.icon}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)' }}>
                      {tri.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {tri.weeks}
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 size={22} color="var(--primary-blue)" />
                ) : (
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #BAC7D5' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ASHA Assisted Registration Toggle */}
      <div 
        onClick={() => setIsAshaAssisted(!isAshaAssisted)}
        style={{
          background: 'var(--soft-blush)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={20} color="var(--warm-rose-dark)" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)' }}>
            {t.screen05.ashaAssisted}
          </span>
        </div>
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '6px',
          background: isAshaAssisted ? 'var(--warm-rose)' : 'white',
          border: isAshaAssisted ? 'none' : '2px solid #BAC7D5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          {isAshaAssisted && <CheckCircle2 size={16} />}
        </div>
      </div>

      {/* Complete Button */}
      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleComplete} className="btn-primary">
          <span>{t.screen05.btnRegister}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
