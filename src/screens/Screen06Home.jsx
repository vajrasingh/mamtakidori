import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Volume2, 
  Bell, 
  Mic, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Utensils, 
  Pill, 
  Users, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export const Screen06Home = () => {
  const { userProfile, navigateTo, speakText, t, language } = useApp();
  const [remindSaved, setRemindSaved] = useState(false);

  const handleRemindMe = (e) => {
    e.stopPropagation();
    setRemindSaved(true);
    speakText(language === 'hi' 
      ? "5 नवंबर के चेकअप का रिमाइंडर सेव कर लिया गया है। आपको सुबह 9 बजे याद दिलाया जाएगा।" 
      : "Reminder saved for your checkup on 5 November. You will be reminded at 9 AM."
    );
    setTimeout(() => setRemindSaved(false), 4000);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Top Greeting Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
            {t.screen06.greeting}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {t.screen06.subtitle}
          </p>
        </div>

        <button
          onClick={() => speakText(t.screen06.stageAudio)}
          className="btn-listen"
          style={{ padding: '6px 12px', fontSize: '14px' }}
        >
          <Volume2 size={16} />
          <span>{t.app.listen}</span>
        </button>
      </div>

      {/* 1. Large Pregnancy Stage Progress Card */}
      <div 
        onClick={() => navigateTo(8)}
        className="m-card m-card-blush"
        style={{
          padding: '18px 20px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="m-badge m-badge-blue" style={{ fontSize: '12px' }}>
                {language === 'hi' ? 'वर्तमान स्थिति' : 'Current Stage'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {t.app.sampleDataNotice}
              </span>
            </div>

            <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
              {t.screen06.currentStageTitle}
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
              {t.screen06.currentStageDesc}
            </p>

            {/* Visual Progress Bar (12/40 weeks) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '4px' }}>
                <span>{language === 'hi' ? '12वां हफ्ता' : 'Week 12'}</span>
                <span>{language === 'hi' ? '40 हफ्ते' : '40 Weeks'}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(65, 111, 152, 0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, var(--warm-rose), var(--primary-blue))', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '2px solid white',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0
          }}>
            <img 
              src="/assets/doctor_prenatal_clinic.jpg" 
              alt="Pregnancy Stage" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* 2. Large Next Important Step Card */}
      <div 
        onClick={() => navigateTo(9)}
        className="m-card"
        style={{
          padding: '18px 20px',
          borderLeft: '5px solid var(--primary-blue)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Calendar size={18} color="var(--primary-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px', color: 'var(--primary-blue)' }}>
            {t.screen06.nextStepTitle}
          </span>
        </div>

        <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen06.nextStepAction}
        </h3>

        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--warm-rose-dark)', marginBottom: '6px' }}>
          {t.screen06.nextStepDate}
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '14px' }}>
          {t.screen06.nextStepWhy}
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              speakText(language === 'hi' 
                ? "आपका अगला चेकअप 5 नवंबर को प्राथमिक स्वास्थ्य केंद्र में है। इसमें खून और यूरिन की जांच होगी जिससे खून की कमी समय रहते रोकी जा सके।" 
                : "Your next checkup is on 5 November at the Primary Health Centre. Blood and urine tests will prevent anemia and ensure your baby grows healthy."
              );
            }} 
            className="btn-listen"
          >
            <Volume2 size={16} />
            <span>{t.app.listen}</span>
          </button>

          <button 
            onClick={handleRemindMe} 
            className="btn-secondary"
            style={{ width: 'auto', minHeight: '38px', padding: '6px 14px', fontSize: '14px' }}
          >
            {remindSaved ? (
              <>
                <CheckCircle2 size={16} color="var(--color-success)" />
                <span style={{ color: 'var(--color-success)' }}>{language === 'hi' ? 'याद रहेगा!' : 'Saved!'}</span>
              </>
            ) : (
              <>
                <Bell size={16} />
                <span>{t.screen06.btnRemindMe}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Talk to Mamta AI Hero Card (Agentic Voice AI Entry) */}
      <div 
        onClick={() => navigateTo(7)}
        className="m-card m-card-navy"
        style={{
          padding: '20px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          right: '-20px',
          top: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(217, 145, 165, 0.25)',
          filter: 'blur(25px)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={16} color="var(--warm-rose)" />
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--powder-blue)' }}>
                {language === 'hi' ? 'आवाज़ साथी' : 'Voice Companion'}
              </span>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
              {t.screen06.talkHeroTitle}
            </h3>

            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
              {t.screen06.talkHeroSubtitle}
            </p>
          </div>

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--warm-rose)',
            boxShadow: '0 0 20px rgba(217, 145, 165, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <Mic size={28} />
          </div>
        </div>
      </div>

      {/* 3b. Family Remedy AI & ASHA Co-Inquiry Card (Screen 19 Entry) */}
      <div 
        onClick={() => navigateTo(19)}
        className="m-card"
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--powder-blue-light) 100%)',
          border: '1.5px solid var(--primary-blue)',
          boxShadow: '0 6px 16px rgba(65, 111, 152, 0.14)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="m-badge m-badge-blue" style={{ fontSize: '11px', padding: '2px 8px' }}>
                🤝 {language === 'hi' ? 'सास-बहू सह-पूछताछ' : 'Family Co-Inquiry'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>
                ✅ {language === 'hi' ? 'आशा सत्यापित' : 'ASHA Verified'}
              </span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '3px' }}>
              {language === 'hi' ? 'घरेलू नुस्खा एआई सत्यापन' : 'Family Home Remedy AI Flow'}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
              {language === 'hi' 
                ? 'रानी और माताजी मिलकर ममता एआई और आशा दीदी से पूछें कि कौन सा नुस्खा सुरक्षित है।' 
                : 'Rani & Mataji ask Mamta AI whether a home remedy is safe, verified by ASHA worker.'}
            </p>
          </div>

          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--powder-blue)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <HeartHandshake size={24} />
          </div>
        </div>
      </div>

      {/* 4. Five Major Illustrated Categories */}
      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '12px' }}>
          {t.screen06.categoriesTitle}
        </h3>

        <div className="category-cards-grid">
          {/* Cat 1: Week by Week */}
          <div className="category-card" onClick={() => navigateTo(8)}>
            <div className="category-icon-circle" style={{ background: 'var(--powder-blue)', color: 'var(--primary-blue)' }}>
              <Activity size={28} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.screen06.cat1}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'शिशु का विकास' : 'Baby Growth'}
            </span>
          </div>

          {/* Cat 2: Checkups & Tests */}
          <div className="category-card" onClick={() => navigateTo(9)}>
            <div className="category-icon-circle" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
              <Calendar size={28} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.screen06.cat2}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'जांच व तारीखें' : 'ANC & Tests'}
            </span>
          </div>

          {/* Cat 3: Food & Nutrition */}
          <div className="category-card" onClick={() => navigateTo(14)}>
            <div className="category-icon-circle" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
              <Utensils size={28} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.screen06.cat3}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'पौष्टिक थाली' : 'Healthy Diet'}
            </span>
          </div>

          {/* Cat 4: Medicines & Records */}
          <div className="category-card" onClick={() => navigateTo(11)}>
            <div className="category-icon-circle" style={{ background: 'var(--soft-blush)', color: 'var(--warm-rose-dark)' }}>
              <Pill size={28} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.screen06.cat4}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'पर्ची व गोलियां' : 'Prescriptions'}
            </span>
          </div>

          {/* Cat 5: Family Support (Span 2 columns) */}
          <div 
            className="category-card" 
            onClick={() => navigateTo(14)}
            style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'left', gap: '16px', padding: '16px 20px' }}
          >
            <div className="category-icon-circle" style={{ background: 'var(--soft-blush-light)', color: 'var(--warm-rose)', margin: 0, flexShrink: 0 }}>
              <Users size={30} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {t.screen06.cat5}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'सास और परिवार के लिए उपयोगी ऑडियो संदेश' : 'Mother-in-Law audio lessons & care partnership'}
              </div>
            </div>
            <ChevronRight size={20} color="var(--primary-blue)" />
          </div>
        </div>
      </div>

      {/* 5. Persistent Emergency Notice Banner */}
      <div 
        onClick={() => navigateTo(16)}
        style={{
          background: 'var(--color-error-bg)',
          border: '1.5px solid rgba(185, 76, 85, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
      >
        <AlertTriangle size={22} color="var(--color-error)" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-error)' }}>
            {t.screen06.sosBanner}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--deep-navy)', fontWeight: 600 }}>
            {language === 'hi' ? '108 एम्बुलेंस या आशा दीदी को तुरंत संपर्क करें' : 'Contact 108 Ambulance or ASHA Didi'}
          </div>
        </div>
        <ChevronRight size={18} color="var(--color-error)" />
      </div>
    </div>
  );
};
