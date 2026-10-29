import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Volume2, Check, Users, UserCheck, ArrowRight, Info } from 'lucide-react';

export const Screen04Consent = () => {
  const { consent, setConsent, navigateTo, speakText, t, language } = useApp();
  const [showDetails, setShowDetails] = useState(false);

  const toggleFamily = () => {
    setConsent(prev => ({ ...prev, familySharing: !prev.familySharing }));
  };

  const toggleAsha = () => {
    setConsent(prev => ({ ...prev, ashaSharing: !prev.ashaSharing }));
  };

  const handleAudioExplainer = () => {
    const text = language === 'hi'
      ? "आपकी जानकारी पूरी तरह सुरक्षित है। आपके चेकअप और जरूरी तारीखों को याद दिलाने के लिए बुनियादी जानकारी रखी जाती है। आपकी निजी जांच रिपोर्ट या बातचीत बिना आपकी अनुमति के परिवार या किसी अन्य व्यक्ति को नहीं दिखाई जाएगी। आप इसे जब चाहें बदल सकती हैं।"
      : "Your privacy is our priority. We only store essential details to calculate checkup dates and health reminders. Your personal symptoms and medical records are NEVER shared with family members without your explicit permission.";
    speakText(text);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px'
        }}>
          <ShieldCheck size={28} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '6px' }}>
          {t.screen04.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          {t.screen04.subtitle}
        </p>

        {/* Spoken Explanation Button */}
        <button
          onClick={handleAudioExplainer}
          className="btn-listen"
          style={{ marginTop: '12px', display: 'inline-flex' }}
        >
          <Volume2 size={16} />
          <span>{t.screen04.audioExplainer}</span>
        </button>
      </div>

      {/* Section 1: Essential App Consent */}
      <div className="m-card m-card-blue" style={{ marginBottom: '14px', borderLeft: '4px solid var(--primary-blue)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--powder-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              flexShrink: 0
            }}>
              <Lock size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--deep-navy)' }}>
                  {t.screen04.essentialTitle}
                </span>
                <span className="m-badge m-badge-blue" style={{ fontSize: '11px' }}>
                  {t.screen04.essentialBadge}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {t.screen04.essentialDesc}
              </p>
            </div>
          </div>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <Check size={16} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Section 2: Optional Granular Sharing */}
      <div style={{ margin: '8px 0 16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{language === 'hi' ? 'वैकल्पिक परिवार व आशा शेयरिंग' : 'Optional Family & Health Worker Sharing'}</span>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>
            ({language === 'hi' ? 'आपकी मर्जी' : 'Your Choice'})
          </span>
        </h4>

        {/* Mother-in-Law Toggle Card */}
        <div 
          onClick={toggleFamily}
          className="m-card" 
          style={{ 
            padding: '16px', 
            marginBottom: '10px', 
            cursor: 'pointer',
            border: consent.familySharing ? '1.5px solid var(--warm-rose)' : '1px solid rgba(65, 111, 152, 0.1)',
            background: consent.familySharing ? 'var(--soft-blush)' : 'var(--surface-white)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--soft-blush)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warm-rose-dark)',
                flexShrink: 0
              }}>
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                  {t.screen04.familySharingTitle}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {t.screen04.familySharingDesc}
                </div>
              </div>
            </div>

            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: consent.familySharing ? 'none' : '2px solid #BAC7D5',
              background: consent.familySharing ? 'var(--warm-rose)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}>
              {consent.familySharing && <Check size={16} strokeWidth={3} />}
            </div>
          </div>
        </div>

        {/* ASHA Sharing Toggle Card */}
        <div 
          onClick={toggleAsha}
          className="m-card" 
          style={{ 
            padding: '16px', 
            marginBottom: '10px', 
            cursor: 'pointer',
            border: consent.ashaSharing ? '1.5px solid var(--color-success)' : '1px solid rgba(65, 111, 152, 0.1)',
            background: consent.ashaSharing ? 'var(--color-success-bg)' : 'var(--surface-white)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--color-success-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-success)',
                flexShrink: 0
              }}>
                <UserCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                  {t.screen04.ashaSharingTitle}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {t.screen04.ashaSharingDesc}
                </div>
              </div>
            </div>

            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: consent.ashaSharing ? 'none' : '2px solid #BAC7D5',
              background: consent.ashaSharing ? 'var(--color-success)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}>
              {consent.ashaSharing && <Check size={16} strokeWidth={3} />}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Promise Footer */}
      <div style={{
        background: 'rgba(65, 111, 152, 0.05)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px'
      }}>
        <Info size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '13px', color: 'var(--deep-navy)', fontWeight: 500 }}>
          {t.screen04.privatePromise}
        </span>
      </div>

      {/* Continue Action */}
      <div style={{ marginTop: 'auto' }}>
        <button onClick={() => navigateTo(5)} className="btn-primary">
          <span>{t.screen04.btnAccept}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
