import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, ArrowRight, ChevronRight, Smartphone } from 'lucide-react';

export const Screen03Onboarding = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: t.screen03.slide1Title,
      desc: t.screen03.slide1Desc,
      img: '/assets/doctor_prenatal_clinic.jpg',
      audio: language === 'hi'
        ? "गर्भावस्था की देखभाल अब आसान। हर हफ्ते की जरूरी जानकारी और चेकअप की याद सीधे अपनी भाषा में।"
        : "Pregnancy care made simple. Understand every stage, remember check-ups, and get doctor-reviewed advice in your own voice."
    },
    {
      title: t.screen03.slide2Title,
      desc: t.screen03.slide2Desc,
      img: '/assets/mamta_ai_avatar.jpg',
      audio: language === 'hi'
        ? "अपनी आवाज़ में ममता से पूछें। लिखने की जरूरत नहीं, बस बोलकर सवाल पूछें और तुरंत जवाब पाएं।"
        : "Ask Mamta in your own voice. No typing required. Simply speak naturally and hear caring, simple answers."
    },
    {
      title: t.screen03.slide3Title,
      desc: t.screen03.slide3Desc,
      img: '/assets/family_support_mil.jpg',
      audio: language === 'hi'
        ? "परिवार भी बनेगा आपका सहारा। सास और परिवार के लिए पोषण और सही देखभाल के छोटे ऑडियो संदेश।"
        : "Your family can learn and support you. Audio lessons for mothers-in-law and family about healthy nutrition and care."
    }
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else {
      navigateTo(4); // Go to Consent screen
    }
  };

  const handleSkip = () => {
    navigateTo(4);
  };

  const currentSlide = slides[activeSlide];

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'space-between' }}>
      {/* Top Bar with Skip */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

        <button
          onClick={handleSkip}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '6px 12px'
          }}
        >
          {t.app.skip}
        </button>
      </div>

      {/* Main Slide Card */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto 0' }}>
        <div style={{
          width: '240px',
          height: '240px',
          borderRadius: '26px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(65, 111, 152, 0.12)',
          marginBottom: '20px',
          border: 'none',
          background: 'radial-gradient(circle at center, #FFF4EE 0%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          position: 'relative'
        }}>
          <img 
            src={currentSlide.img} 
            alt={currentSlide.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 20px rgba(23, 54, 83, 0.14))'
            }}
          />
        </div>

        <button
          onClick={() => speakText(currentSlide.audio)}
          className="btn-listen"
          style={{ marginBottom: '16px' }}
        >
          <Volume2 size={16} />
          <span>{t.app.listen}</span>
        </button>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: 'var(--deep-navy)',
          marginBottom: '10px',
          lineHeight: 1.25
        }}>
          {currentSlide.title}
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          maxWidth: '300px'
        }}>
          {currentSlide.desc}
        </p>
      </div>

      {/* Slide Indicators and Actions */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={{
                width: activeSlide === idx ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeSlide === idx ? 'var(--primary-blue)' : 'var(--powder-blue)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        <button onClick={handleNext} className="btn-primary" style={{ marginBottom: '10px' }}>
          <span>{activeSlide === slides.length - 1 ? t.screen03.btnStart : t.app.continue}</span>
          <ArrowRight size={20} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigateTo(20)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-blue)',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Smartphone size={15} />
            <span>{language === 'hi' ? 'पहले से खाता है? ओटीपी से लॉगिन करें' : 'Already have an account? Login with OTP'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
