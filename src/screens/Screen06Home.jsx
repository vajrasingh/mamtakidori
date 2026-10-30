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
          borderRadius: '24px',
          padding: '16px 18px',
          boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
          border: '1.5px solid var(--powder-blue)',
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
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '11px',
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
              <span>12 हफ्ता</span>
              <span>40 हफ्ता</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(65, 111, 152, 0.12)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, var(--warm-rose), var(--primary-blue))', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* Minimal Hero Illustration Frame */}
        <div style={{
          width: '84px',
          height: '104px',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '2px solid white',
          boxShadow: '0 4px 12px rgba(65, 111, 152, 0.15)',
          flexShrink: 0,
          background: '#FFF8F6'
        }}>
          <img 
            src="/assets/maternal_joy_hero.jpg" 
            alt="Maternal Joy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              5 नवंबर • PHC रामपुर
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
            title="याद दिलाएं"
          >
            {remindSaved ? <CheckCircle2 size={16} /> : <Bell size={16} />}
          </button>

          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* 3. Talk to Mamta AI Voice Companion Hero */}
      <div 
        onClick={() => navigateTo(7)}
        style={{
          background: 'linear-gradient(135deg, var(--deep-navy) 0%, #1e4569 100%)',
          borderRadius: '20px',
          padding: '14px 18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          boxShadow: '0 6px 20px rgba(23, 54, 83, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--warm-rose)',
            boxShadow: '0 0 16px rgba(217, 145, 165, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Mic size={22} color="white" />
          </div>

          <div>
            <div style={{ fontSize: '16px', fontWeight: 800 }}>
              {language === 'hi' ? 'ममता से बोलकर पूछें' : 'Talk to Mamta AI'}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
              {language === 'hi' ? 'दबाएं और अपनी भाषा में बात करें' : 'Tap to speak your question'}
            </div>
          </div>
        </div>

        <Sparkles size={20} color="var(--soft-blush)" />
      </div>

      {/* 4. Four Large Illustrated Visual Action Tiles (Minimal 2x2 Grid) */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '10px', paddingLeft: '2px' }}>
          {language === 'hi' ? 'मुख्य सुविधाएं' : 'Quick Actions'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          
          {/* Tile 1: Home Remedy AI Verification (Screen 19) */}
          <div 
            onClick={() => navigateTo(19)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              border: '1.5px solid var(--powder-blue)',
              boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ width: '100%', height: '85px', borderRadius: '14px', overflow: 'hidden', background: '#f5f5f5' }}>
              <img src="/assets/remedy_safe_tea.jpg" alt="Home Remedy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
                🌿 {language === 'hi' ? 'घरेलू नुस्खा' : 'Remedy Check'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'सास-बहू एआई जांच' : 'Safe or Avoid?'}
              </div>
            </div>
          </div>

          {/* Tile 2: Check-ups & Ultrasound (Screen 09) */}
          <div 
            onClick={() => navigateTo(9)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              border: '1.5px solid var(--powder-blue)',
              boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ width: '100%', height: '85px', borderRadius: '14px', overflow: 'hidden', background: '#f5f5f5' }}>
              <img src="/assets/doctor_prenatal_clinic.jpg" alt="Checkup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
                🩺 {language === 'hi' ? 'जांच व सोनोग्राफी' : 'Checkups & ANC'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'तारीख व रिपोर्ट' : 'Hospital visits'}
              </div>
            </div>
          </div>

          {/* Tile 3: Nutrition & Care (Screen 08) */}
          <div 
            onClick={() => navigateTo(8)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              border: '1.5px solid var(--powder-blue)',
              boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ width: '100%', height: '85px', borderRadius: '14px', overflow: 'hidden', background: '#f5f5f5' }}>
              <img src="/assets/nutrition_maternal_thali.jpg" alt="Nutrition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
                🍲 {language === 'hi' ? 'पौष्टिक थाली' : 'Nutrition & Diet'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'हरी सब्जी व दाल' : 'Iron & vitamins'}
              </div>
            </div>
          </div>

          {/* Tile 4: ASHA Didi & SOS (Screen 16/18) */}
          <div 
            onClick={() => navigateTo(16)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '12px',
              border: '1.5px solid var(--powder-blue)',
              boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ width: '100%', height: '85px', borderRadius: '14px', overflow: 'hidden', background: '#f5f5f5' }}>
              <img src="/assets/asha_didi_vector.jpg" alt="ASHA Didi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1.2 }}>
                👩‍⚕️ {language === 'hi' ? 'आशा दीदी व मदद' : 'ASHA & Helpline'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'सुनीता देवी • 108' : 'Call 108 Emergency'}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
