import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Volume2, Globe } from 'lucide-react';
import { speechService } from '../services/speechService';

export const RegionalLanguageModal = () => {
  const { 
    isLangModalOpen, 
    setIsLangModalOpen, 
    language, 
    changeLanguage, 
    availableLanguages 
  } = useApp();

  if (!isLangModalOpen) return null;

  const handlePreviewAudio = (e, langObj) => {
    e.stopPropagation();
    speechService.speak(langObj.preview, langObj.code);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(23, 54, 83, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0'
      }}
      onClick={() => setIsLangModalOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '85vh',
          background: 'var(--warm-offwhite)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          padding: '24px 20px 32px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--powder-blue)',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
                क्षेत्रीय भाषा व बोली चुनें
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Select Your Regional Language / Dialect
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLangModalOpen(false)}
            style={{
              background: 'var(--powder-blue)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="var(--deep-navy)" />
          </button>
        </div>

        {/* Language List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
          {availableLanguages.map((langItem) => {
            const isSelected = language === langItem.code;
            return (
              <div
                key={langItem.code}
                onClick={() => changeLanguage(langItem.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--powder-blue-light)' : 'white',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
                    {isSelected ? <Check size={18} /> : langItem.code.toUpperCase()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                        {langItem.name}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-blue)', background: 'var(--powder-blue)', padding: '2px 6px', borderRadius: '4px' }}>
                        {langItem.script}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {langItem.region}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handlePreviewAudio(e, langItem)}
                  className="btn-listen"
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    minHeight: '34px',
                    background: isSelected ? 'var(--primary-blue)' : 'var(--powder-blue)',
                    color: isSelected ? 'white' : 'var(--deep-navy)'
                  }}
                  title="बोलकर सुनें (Hear voice preview)"
                >
                  <Volume2 size={14} />
                  <span>सुनें</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(65, 111, 152, 0.08)', fontSize: '12px', color: 'var(--deep-navy)', textAlign: 'center' }}>
          💡 <strong>आवाज़-आधारित सुविधा:</strong> ममता आपके चुने हुए क्षेत्रीय उच्चारण व सरल बोली में उत्तर देगी।
        </div>
      </div>
    </div>
  );
};
