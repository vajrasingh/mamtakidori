import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  HeartHandshake, 
  Volume2, 
  Hospital 
} from 'lucide-react';

export const Screen16GetHelp = () => {
  const { speakText, t, language } = useApp();

  const handleAudioExplainer = () => {
    const text = language === 'hi' 
      ? "यदि आपको तेज दर्द या रक्तस्राव हो, तो बिना देर किए 108 एम्बुलेंस पर कॉल करें। सामान्य जांच या अस्पताल जाने के लिए अपनी आशा कार्यकर्ता सुनीता दीदी से संपर्क करें।" 
      : "In case of sudden bleeding or severe pain, immediately call 108 Ambulance. For routine visits or clinic questions, call your ASHA worker Sunita Didi.";
    speakText(text);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen16.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen16.subtitle}
        </p>

        <button onClick={handleAudioExplainer} className="btn-listen" style={{ marginTop: '10px' }}>
          <Volume2 size={16} />
          <span>{language === 'hi' ? 'मदद के विकल्प सुनें' : 'Listen to Help Options'}</span>
        </button>
      </div>

      {/* 1. Emergency 108 Ambulance Card (Top Priority Red) */}
      <div 
        className="m-card" 
        style={{ 
          background: 'var(--color-error-bg)', 
          border: '2px solid var(--color-error)',
          padding: '18px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={24} color="var(--color-error)" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-error)' }}>
              {t.screen16.ambulanceTitle}
            </h3>
          </div>
          <span className="m-badge m-badge-error" style={{ fontSize: '12px' }}>
            24x7 निःशुल्क
          </span>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--deep-navy)', lineHeight: 1.45, marginBottom: '14px' }}>
          {language === 'hi' ? 'प्रसव पीड़ा, रक्तस्राव या किसी भी गंभीर स्थिति में तुरंत सरकारी एम्बुलेंस बुलाएं।' : 'Call 108 immediately in case of labor pain, bleeding, or emergencies.'}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href="tel:108"
            className="btn-primary"
            style={{
              background: 'var(--color-error)',
              textDecoration: 'none',
              flex: 1,
              minHeight: '48px',
              fontSize: '16px',
              boxShadow: '0 4px 14px rgba(185, 76, 85, 0.4)'
            }}
          >
            <PhoneCall size={18} />
            <span>{t.screen16.ambulanceNumber}</span>
          </a>

          <a
            href="tel:102"
            className="btn-secondary"
            style={{
              textDecoration: 'none',
              flex: 1,
              minHeight: '48px',
              fontSize: '15px',
              border: '1.5px solid var(--color-error)',
              color: 'var(--color-error)'
            }}
          >
            <PhoneCall size={16} />
            <span>{t.screen16.jananiNumber}</span>
          </a>
        </div>
      </div>

      {/* 2. Assigned ASHA Worker Contact Card */}
      <div className="m-card m-card-blue" style={{ padding: '18px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--primary-blue)',
            flexShrink: 0
          }}>
            <img src="/assets/asha_worker_visit.jpg" alt="ASHA Worker" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'आपकी स्थानीय स्वास्थ्य सखी' : 'Assigned Community Worker'}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {t.screen16.ashaName}
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          <MapPin size={15} color="var(--primary-blue)" />
          <span>{t.screen16.ashaLocation}</span>
        </div>

        <a
          href="tel:+919876543210"
          className="btn-primary"
          style={{ textDecoration: 'none', minHeight: '46px', fontSize: '15px' }}
        >
          <PhoneCall size={18} />
          <span>{t.screen16.btnDirectCall}: {t.screen16.ashaPhone}</span>
        </a>
      </div>

      {/* 3. Primary Health Centre (PHC) & Doctor Card */}
      <div className="m-card" style={{ padding: '18px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Hospital size={22} color="var(--deep-navy)" />
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--deep-navy)' }}>
            {t.screen16.phcTitle}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
          <MapPin size={15} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{t.screen16.phcAddress}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          <Clock size={15} color="var(--color-warning)" />
          <span>{t.screen16.docHours}</span>
        </div>

        <div style={{ borderTop: '1px solid rgba(65, 111, 152, 0.1)', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)' }}>
              {t.screen16.docName}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? 'चिकित्सा अधिकारी' : 'Medical Officer'}
            </div>
          </div>

          <a
            href="tel:+919412356789"
            className="btn-secondary"
            style={{ textDecoration: 'none', width: 'auto', minHeight: '36px', padding: '6px 14px', fontSize: '13px' }}
          >
            <PhoneCall size={14} />
            <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
