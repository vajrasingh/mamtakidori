import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import { speechService } from '../services/speechService';

export const Screen02Language = () => {
  const { language, setLanguage, navigateTo, availableLanguages, t } = useApp();
  const [selectedLang, setSelectedLang] = useState(language);

  const handlePreview = (e, langCode, sampleText) => {
    e.stopPropagation();
    speechService.speak(sampleText, langCode);
  };

  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    setLanguage(langCode);
    document.body.className = `lang-${langCode}`;
  };

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigateTo(20); // Go to Login Screen with Mobile OTP!
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 18px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', margin: '4px 0 16px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--powder-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          color: 'var(--primary-blue)'
        }}>
          <Globe size={28} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          अपनी क्षेत्रीय भाषा व बोली चुनें
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Choose your native language or rural dialect
        </p>
      </div>

      {/* Language Option Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
        {availableLanguages.map((langItem) => {
          const isSelected = selectedLang === langItem.code;
          return (
            <div
              key={langItem.code}
              onClick={() => handleSelect(langItem.code)}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'linear-gradient(135deg, #FFFFFF 0%, #EAF3FB 100%)' : 'var(--surface-white)',
                border: 'none',
                boxShadow: isSelected ? '0 8px 24px rgba(65, 111, 152, 0.16)' : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--primary-blue)' : 'rgba(65, 111, 152, 0.1)',
                  color: isSelected ? 'white' : 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  {isSelected ? <CheckCircle2 size={18} /> : langItem.code.toUpperCase()}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                      {langItem.name}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--primary-blue)', background: 'var(--powder-blue)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      {langItem.script}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {langItem.region}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => handlePreview(e, langItem.code, langItem.preview)}
                className="btn-listen"
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  minHeight: '34px',
                  background: isSelected ? 'var(--primary-blue)' : 'var(--powder-blue)',
                  color: isSelected ? 'white' : 'var(--deep-navy)'
                }}
              >
                <Volume2 size={14} />
                <span>सुनें</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Continue Action */}
      <div style={{ marginTop: '16px', paddingTop: '10px' }}>
        <button onClick={handleContinue} className="btn-primary" style={{ width: '100%', minHeight: '50px' }}>
          <span>आगे बढ़ें / Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
