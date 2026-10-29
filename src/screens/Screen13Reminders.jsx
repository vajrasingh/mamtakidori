import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Calendar, Pill, AlertCircle, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const Screen13Reminders = () => {
  const { reminders, setReminders, consent, setConsent, navigateTo, speakText, t, language } = useApp();
  const [items, setItems] = useState([
    { id: 1, title: t.screen13.rem2Title, time: t.screen13.rem2Time, active: true, icon: <Calendar size={20} color="var(--primary-blue)" /> },
    { id: 2, title: t.screen13.rem1Title, time: t.screen13.rem1Time, active: true, icon: <Pill size={20} color="var(--warm-rose-dark)" /> },
    { id: 3, title: t.screen13.rem3Title, time: t.screen13.rem3Time, active: true, icon: <Bell size={20} color="var(--color-success)" /> }
  ]);
  const [discreetMode, setDiscreetMode] = useState(consent.discreetNotifications);
  const [isSaved, setIsSaved] = useState(false);

  const toggleReminder = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const handleSave = () => {
    setConsent(prev => ({ ...prev, discreetNotifications: discreetMode }));
    setIsSaved(true);
    speakText(language === 'hi' 
      ? "आपकी सभी रिमाइंडर और गोपनीयता सेटिंग्स सफलतापूर्वक सुरक्षित कर ली गई हैं।" 
      : "Your reminder and discreet notification preferences are saved."
    );
    setTimeout(() => {
      navigateTo(6); // Return to Home
    }, 1200);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen13.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen13.subtitle}
        </p>
      </div>

      {/* Reminder Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggleReminder(item.id)}
            className="m-card"
            style={{
              padding: '16px',
              marginBottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: item.active ? '1.5px solid var(--powder-blue)' : '1px solid rgba(65, 111, 152, 0.08)',
              background: item.active ? 'var(--surface-white)' : 'rgba(23, 54, 83, 0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: item.active ? 'var(--powder-blue)' : '#EAECEF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: item.active ? 'var(--deep-navy)' : 'var(--text-muted)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: item.active ? 'var(--primary-blue)' : 'var(--text-muted)', fontWeight: 600 }}>
                  {item.time}
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <div style={{
              width: '46px',
              height: '26px',
              borderRadius: '13px',
              background: item.active ? 'var(--primary-blue)' : '#CBD5E1',
              padding: '2px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: item.active ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Shared Device Discreet Mode Card */}
      <div 
        onClick={() => setDiscreetMode(!discreetMode)}
        className="m-card m-card-blush"
        style={{
          padding: '16px',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--soft-blush)',
              color: 'var(--warm-rose-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
                {t.screen13.discreetModeTitle}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {t.screen13.discreetModeDesc}
              </p>
            </div>
          </div>

          <div style={{
            width: '46px',
            height: '26px',
            borderRadius: '13px',
            background: discreetMode ? 'var(--warm-rose)' : '#CBD5E1',
            padding: '2px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: discreetMode ? 'flex-end' : 'flex-start',
            flexShrink: 0
          }}>
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>
      </div>

      {/* Save Action Button */}
      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleSave} className="btn-primary">
          {isSaved ? <CheckCircle2 size={20} /> : <Bell size={20} />}
          <span>{isSaved ? (language === 'hi' ? 'सुरक्षित हो गया!' : 'Preferences Saved!') : t.screen13.btnSaveSettings}</span>
        </button>
      </div>
    </div>
  );
};
