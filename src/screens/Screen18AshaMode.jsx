import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Volume2, 
  PhoneCall, 
  ShieldAlert, 
  FileCheck,
  Send
} from 'lucide-react';

export const Screen18AshaMode = () => {
  const { speakText, t, language, navigateTo } = useApp();
  const [activeWoman, setActiveWoman] = useState(1);
  const [selectedBarrier, setSelectedBarrier] = useState(null);
  const [visitRecorded, setVisitRecorded] = useState(false);

  const womenList = [
    {
      id: 1,
      name: t.screen18.woman1Name,
      task: t.screen18.woman1Task,
      status: t.screen18.woman1Status,
      statusType: 'warning',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: t.screen18.woman2Name,
      task: t.screen18.woman2Task,
      status: t.screen18.woman2Status,
      statusType: 'error',
      phone: '+91 91234 56789'
    }
  ];

  const barriers = [
    { id: 1, label: t.screen18.barrier1, icon: '🛺' },
    { id: 2, label: t.screen18.barrier2, icon: '👨‍👩‍👦' },
    { id: 3, label: t.screen18.barrier3, icon: '🏥' }
  ];

  const handleRecordVisit = () => {
    setVisitRecorded(true);
    speakText(language === 'hi' 
      ? "गृह भ्रमण का परिणाम सफलतापूर्वक दर्ज कर लिया गया है। अगली भेंट का रिमाइंडर सेट है।" 
      : "Home visit outcome recorded successfully."
    );
    setTimeout(() => setVisitRecorded(false), 3000);
  };

  const handleEscalateDoctor = () => {
    speakText(language === 'hi' 
      ? "प्राथमिक स्वास्थ्य केंद्र के चिकित्सा अधिकारी डॉ. प्रिया सिंह को अलर्ट भेज दिया गया है।" 
      : "Escalation notification dispatched to Medical Officer Dr. Priya Singh."
    );
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '12.5px',
          fontWeight: 700,
          marginBottom: '6px'
        }}>
          <UserCheck size={14} />
          <span>{language === 'hi' ? 'फील्ड कार्यकर्ता पोर्टल' : 'ASHA Field Worker View'}</span>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen18.title}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          {t.screen18.subtitle}
        </p>
      </div>

      {/* Hero Banner: Today's Home Visits */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px' }}>
          {t.screen18.todayVisits}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {womenList.map(woman => {
            const isSelected = activeWoman === woman.id;
            return (
              <div
                key={woman.id}
                onClick={() => setActiveWoman(woman.id)}
                className="m-card"
                style={{
                  padding: '14px 16px',
                  marginBottom: 0,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--color-success)' : '1px solid rgba(65, 111, 152, 0.1)',
                  background: isSelected ? 'var(--color-success-bg)' : 'var(--surface-white)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {woman.name}
                  </div>
                  <span className={`m-badge m-badge-${woman.statusType}`} style={{ fontSize: '11px' }}>
                    {woman.status}
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '10px' }}>
                  {woman.task}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={`tel:${woman.phone}`}
                    className="btn-secondary"
                    style={{ textDecoration: 'none', width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PhoneCall size={14} color="var(--primary-blue)" />
                    <span>{language === 'hi' ? 'फोन करें' : 'Call'}</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(woman.task);
                    }}
                    className="btn-listen"
                    style={{ padding: '6px 12px', fontSize: '13px' }}
                  >
                    <Volume2 size={14} />
                    <span>{t.app.listen}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Non-Blaming Barrier Assessment Box */}
      <div className="m-card m-card-blue" style={{ padding: '16px', marginBottom: '18px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
          {t.screen18.barrierTitle}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {barriers.map(b => (
            <div
              key={b.id}
              onClick={() => setSelectedBarrier(b.id)}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                background: selectedBarrier === b.id ? 'var(--powder-blue)' : 'white',
                border: selectedBarrier === b.id ? '1.5px solid var(--primary-blue)' : '1px solid rgba(65, 111, 152, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
        <button 
          onClick={handleRecordVisit} 
          className="btn-primary"
          style={{ background: 'var(--color-success)' }}
        >
          {visitRecorded ? <CheckCircle2 size={18} /> : <FileCheck size={18} />}
          <span>{visitRecorded ? (language === 'hi' ? 'भ्रमण दर्ज हो गया!' : 'Recorded!') : t.screen18.recordVisitBtn}</span>
        </button>

        <button 
          onClick={handleEscalateDoctor} 
          className="btn-secondary"
          style={{ border: '1.5px solid var(--color-error)', color: 'var(--color-error)' }}
        >
          <ShieldAlert size={18} />
          <span>{t.screen18.escalateDocBtn}</span>
        </button>
      </div>
    </div>
  );
};
