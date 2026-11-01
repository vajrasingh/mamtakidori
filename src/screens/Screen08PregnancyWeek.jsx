import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Heart, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Screen08PregnancyWeek = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [selectedRange, setSelectedRange] = useState('9-12');

  const weekRanges = [
    { id: '1-4', label: '1-4', desc: language === 'hi' ? 'गर्भधारण का प्रारंभ' : 'Conception' },
    { id: '5-8', label: '5-8', desc: language === 'hi' ? 'हार्टबीट की शुरुआत' : 'First Heartbeat' },
    { id: '9-12', label: '9-12', desc: language === 'hi' ? 'नींबू जितना आकार' : 'Lemon Size' },
    { id: '13-16', label: '13-16', desc: language === 'hi' ? 'दूसरी तिमाही' : '2nd Trimester' },
    { id: '17-20', label: '17-20', desc: language === 'hi' ? 'पहली हलचल' : 'First Kicks' }
  ];

  const handleListenGuide = () => {
    const text = language === 'hi'
      ? "सप्ताह 9 से 12 में आपका बच्चा अब छोटे नींबू जितना है। उसकी दिल की धड़कन तेज और मजबूत हो चुकी है। इस समय ज्यादा पानी पिएं, आयरन की गोली खाने के बाद लें और भारी वजन उठाने से बचें।"
      : "In weeks 9 to 12, your baby is the size of a small lemon. The heartbeat is strong. Drink plenty of water, take your iron tablet after food, and avoid heavy lifting.";
    speakText(text);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen08.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen08.subtitle}
        </p>
      </div>

      {/* Horizontal Week Range Selector Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '14px',
        scrollbarWidth: 'none'
      }}>
        {weekRanges.map(range => {
          const isSelected = selectedRange === range.id;
          return (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: isSelected ? 'var(--primary-blue)' : 'var(--surface-white)',
                color: isSelected ? 'white' : 'var(--deep-navy)',
                border: isSelected ? 'none' : '1.5px solid var(--powder-blue)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 4px 12px rgba(65, 111, 152, 0.3)' : 'none'
              }}
            >
              <span>सप्ताह {range.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Weekly Visual Card */}
      <div className="m-card m-card-blue" style={{ padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🍋</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {t.screen08.babySize}
            </div>
          </div>

          <button onClick={handleListenGuide} className="btn-listen" style={{ padding: '6px 12px', fontSize: '13px' }}>
            <Volume2 size={15} />
            <span>{t.app.listen}</span>
          </button>
        </div>

        {/* Baby & Mother Illustration (Uncropped) */}
        <div style={{
          width: '100%',
          height: '180px',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '16px',
          boxShadow: '0 4px 14px rgba(65, 111, 152, 0.08)',
          border: '2px solid white',
          background: '#FFF8F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px'
        }}>
          <img 
            src="/assets/doctor_prenatal_clinic.jpg" 
            alt="Fetal Growth" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Minimal Bullet Highlights */}
        <div style={{ marginBottom: '14px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
            {t.screen08.whatHappensTitle}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-primary)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-blue)', flexShrink: 0 }} />
              <span>{language === 'hi' ? 'शिशु के हाथ-पैर व अंग तेजी से विकसित हो रहे हैं।' : 'Baby limbs and organs are developing rapidly.'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-primary)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-blue)', flexShrink: 0 }} />
              <span>{language === 'hi' ? 'हार्टबीट मजबूत और नियमित हो चुकी है।' : 'Baby heartbeat is now strong and steady.'}</span>
            </li>
          </ul>
        </div>

        {/* Minimal Care Guidance Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '14px',
          padding: '10px 14px',
          borderLeft: '4px solid var(--color-warning)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} color="var(--color-warning)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '12.5px', color: 'var(--deep-navy)', fontWeight: 600 }}>
            {language === 'hi' ? 'भरपूर पानी पिएं, लाल आयरन गोली लें और भारी वजन न उठाएं।' : 'Drink plenty of water, take your iron tablet, and avoid lifting heavy loads.'}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <button 
          onClick={() => navigateTo(9)} 
          className="btn-primary"
        >
          <span>{language === 'hi' ? 'जांच व चेकअप देखें' : 'View Check-ups & Tests'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
