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
  PhoneCall,
  HeartHandshake,
  Activity,
  Stethoscope
} from 'lucide-react';

export const Screen06Home = () => {
  const { userProfile, navigateTo, speakText, t, language } = useApp();
  const [remindSaved, setRemindSaved] = useState(false);

  const handleRemindMe = (e) => {
    e.stopPropagation();
    setRemindSaved(true);
    speakText(language === 'hi' 
      ? "5 नवंबर के चेकअप का रिमाइंडर सेव कर लिया गया है। आपको सुबह 9 बजे याद दिलाया जाएगा।" 
      : "Reminder saved for your checkup on 5 November."
    );
    setTimeout(() => setRemindSaved(false), 3000);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Hero Maternal Stage Card with Beautiful Illustration */}
      <div 
        onClick={() => navigateTo(8)}
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F9FD 100%)',
          borderRadius: '26px',
          padding: '18px 20px',
          boxShadow: '0 8px 30px rgba(65, 111, 152, 0.09)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{
              background: 'var(--soft-blush)',
              color: 'var(--warm-rose-dark)',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '11.5px',
              fontWeight: 800
            }}>
              🌸 {language === 'hi' ? 'नमस्ते रानी जी' : 'Hello Rani'}
            </span>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 4px', lineHeight: 1.2 }}>
            {language === 'hi' ? '12वां सप्ताह (तिमाही 1)' : 'Week 12 (1st Trimester)'}
          </h3>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.3 }}>
            {language === 'hi' ? 'नन्हा शिशु नींबू के आकार का हो चुका है' : 'Baby is now the size of a lime'}
          </p>

          {/* Minimal Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '3px' }}>
              <span>{language === 'en' ? 'Wk 12' : '12 हफ्ता'}</span>
              <span>{language === 'en' ? 'Wk 40' : '40 हफ्ता'}</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(65, 111, 152, 0.12)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, var(--warm-rose), var(--primary-blue))', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* Minimal Uncropped Hero Illustration Frame (Single clean layer, no double border/bg) */}
        <div style={{
          width: '112px',
          height: '112px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/assets/maternal_joy_hero.jpg" 
            alt="Maternal Joy" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain'
            }} 
          />
        </div>
      </div>

      {/* 2. Next Checkup Minimal Action Pill */}
      <div 
        onClick={() => navigateTo(9)}
        style={{
          background: 'white',
          borderRadius: '18px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid var(--primary-blue)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--powder-blue)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Calendar size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'अगला अस्पताल चेकअप' : 'Next ANC Checkup'}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'en' ? '5 November • Rampur PHC' : '5 नवंबर • PHC रामपुर'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleRemindMe}
            style={{
              background: remindSaved ? 'var(--color-success-bg)' : 'var(--powder-blue-light)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: remindSaved ? 'var(--color-success)' : 'var(--primary-blue)',
              cursor: 'pointer'
            }}
            title={language === 'en' ? 'Remind me' : 'याद दिलाएं'}
          >
            {remindSaved ? <CheckCircle2 size={16} /> : <Bell size={16} />}
          </button>

          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* 3. Catchy Check Your Health Parameters & Vitals Scan Card (Routes to Screen 22) */}
      <div 
        id="check-health-params-card"
        onClick={() => navigateTo(22)}
        style={{
          background: 'linear-gradient(135deg, #173653 0%, #22517C 100%)',
          borderRadius: '24px',
          padding: '16px 18px',
          cursor: 'pointer',
          color: 'white',
          boxShadow: '0 8px 24px rgba(23, 54, 83, 0.22)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-25px',
          right: '-25px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 145, 165, 0.35) 0%, rgba(217, 145, 165, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.16)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.3px',
            color: '#FFE2EA'
          }}>
            <Activity size={13} color="#FFE2EA" />
            <span>{language === 'hi' ? 'स्वास्थ्य पैरामीटर स्कैन' : 'AI Health Parameter Scan'}</span>
          </div>

          <span style={{
            background: 'var(--warm-rose)',
            color: 'white',
            padding: '3px 9px',
            borderRadius: '12px',
            fontSize: '10.5px',
            fontWeight: 800,
            boxShadow: '0 2px 8px rgba(217, 145, 165, 0.4)'
          }}>
            {language === 'hi' ? 'जांच व स्कैन' : 'Scan & Check'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '16.5px', fontWeight: 800, lineHeight: 1.25, marginBottom: '4px' }}>
              {language === 'hi' ? 'अपने स्वास्थ्य पैरामीटर जांचें' : 'Check Your Health Parameters'}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.35 }}>
              {language === 'hi' ? 'बीपी, वजन, हीमोग्लोबिन व लक्षणों का तुरंत स्कैन कराएं' : 'Scan BP, vitals, weight, Hb & symptom safety'}
            </div>
          </div>

          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D96E8A 0%, #C45573 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(217, 110, 138, 0.4)'
          }}>
            <Stethoscope size={22} color="white" />
          </div>
        </div>

        {/* Catchy Pill Badges */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
          {[
            { hi: '🩸 बीपी / हीमोग्लोबिन', en: '🩸 BP & Hb' },
            { hi: '⚖️ वजन जांच', en: '⚖️ Weight' },
            { hi: '🩺 लक्षण स्कैन', en: '🩺 Symptoms' },
            { hi: '⚡ अभी जांचें →', en: '⚡ Check Now →' }
          ].map((pill, idx) => (
            <span key={idx} style={{
              background: idx === 3 ? 'white' : 'rgba(255, 255, 255, 0.14)',
              color: idx === 3 ? 'var(--deep-navy)' : 'rgba(255, 255, 255, 0.95)',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 9px',
              borderRadius: '8px'
            }}>
              {language === 'hi' ? pill.hi : pill.en}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Four Beautiful Visual Action Tiles (Single Clean White Background, No Double Layer) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingLeft: '2px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'मुख्य सुविधाएं' : 'Quick Actions'}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'टैप करके देखें' : 'Tap to open'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          
          {/* Tile 1: Home Remedy AI Verification (Screen 19) */}
          <div 
            onClick={() => navigateTo(19)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '16px 14px',
              border: 'none',
              boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '104px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src="/assets/remedy_safe_tea.jpg" 
                alt="Home Remedy" 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
              🌿 {language === 'hi' ? 'घरेलू नुस्खे' : 'Remedy Check'}
            </div>
          </div>

          {/* Tile 2: Check-ups & Ultrasound (Screen 09) */}
          <div 
            onClick={() => navigateTo(9)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '16px 14px',
              border: 'none',
              boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '104px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src="/assets/doctor_prenatal_clinic.jpg" 
                alt="Checkup" 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
              🩺 {language === 'hi' ? 'जांच व टीका' : 'Checkups & ANC'}
            </div>
          </div>

          {/* Tile 3: Nutrition & Care (Screen 23) */}
          <div 
            onClick={() => navigateTo(23)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '16px 14px',
              border: 'none',
              boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '104px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src="/assets/nutrition_maternal_thali.jpg" 
                alt="Nutrition" 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
              🍲 {language === 'hi' ? 'पौष्टिक आहार' : 'Nutrition & Diet'}
            </div>
          </div>

          {/* Tile 4: ASHA Didi & SOS (Screen 16/18) */}
          <div 
            onClick={() => navigateTo(16)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '16px 14px',
              border: 'none',
              boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '104px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <img 
                src="/assets/asha_didi_vector.jpg" 
                alt="ASHA Didi" 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
              👩‍⚕️ {language === 'hi' ? 'आशा दीदी' : 'ASHA Didi'}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
