import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, CheckCircle2, ArrowRight, Globe } from 'lucide-react';

export const Screen02Language = () => {
  const { language, setLanguage, navigateTo, speakText, t } = useApp();
  const [selectedLang, setSelectedLang] = useState(language);

  const handlePreview = (e, langCode, sampleText) => {
    e.stopPropagation();
    speakText(sampleText);
  };

  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    setLanguage(langCode);
    document.body.className = langCode === 'en' ? 'lang-en' : 'lang-hi';
  };

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigateTo(3); // Go to Onboarding
  };

  return (
    <div className="screen-fade-in" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', margin: '20px 0 28px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--powder-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          color: 'var(--primary-blue)'
        }}>
          <Globe size={30} />
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
          {t.screen02.title}
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          {t.screen02.subtitle}
        </p>
      </div>

      {/* Language Option Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {/* Hindi Option */}
        <div
          onClick={() => handleSelect('hi')}
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            background: selectedLang === 'hi' ? 'linear-gradient(135deg, #FFFFFF 0%, #EAF3FB 100%)' : 'var(--surface-white)',
            border: selectedLang === 'hi' ? '2.5px solid var(--primary-blue)' : '1.5px solid rgba(65, 111, 152, 0.12)',
            boxShadow: selectedLang === 'hi' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>🇮🇳</span>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  हिन्दी (Hindi)
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  आवाज़ और लिखावट हिन्दी में
                </div>
              </div>
            </div>

            {selectedLang === 'hi' ? (
              <CheckCircle2 size={24} color="var(--primary-blue)" />
            ) : (
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #C4D2E0' }} />
            )}
          </div>

          <button
            onClick={(e) => handlePreview(e, 'hi', "नमस्ते! मैं ममता हूँ। आपकी मातृत्व सखी।")}
            className="btn-listen"
            style={{ marginTop: '8px', width: 'auto' }}
          >
            <Volume2 size={16} />
            <span>हिन्दी में आवाज़ सुनें</span>
          </button>
        </div>

        {/* English Option */}
        <div
          onClick={() => handleSelect('en')}
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            background: selectedLang === 'en' ? 'linear-gradient(135deg, #FFFFFF 0%, #EAF3FB 100%)' : 'var(--surface-white)',
            border: selectedLang === 'en' ? '2.5px solid var(--primary-blue)' : '1.5px solid rgba(65, 111, 152, 0.12)',
            boxShadow: selectedLang === 'en' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>🌐</span>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  English
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Voice and text in English
                </div>
              </div>
            </div>

            {selectedLang === 'en' ? (
              <CheckCircle2 size={24} color="var(--primary-blue)" />
            ) : (
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #C4D2E0' }} />
            )}
          </div>

          <button
            onClick={(e) => handlePreview(e, 'en', "Hello! I am Mamta, your voice-first pregnancy companion.")}
            className="btn-listen"
            style={{ marginTop: '8px', width: 'auto' }}
          >
            <Volume2 size={16} />
            <span>Listen in English</span>
          </button>
        </div>
      </div>

      {/* Continue Action */}
      <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
        <button onClick={handleContinue} className="btn-primary">
          <span>{selectedLang === 'hi' ? 'आगे बढ़ें / Continue' : 'Continue'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
