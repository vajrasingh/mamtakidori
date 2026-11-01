import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { Sparkles } from 'lucide-react';

export const Screen01Splash = () => {
  const { navigateTo, t, language } = useApp();

  // Smooth auto-transition after 3 seconds directly to Language Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo(2);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Tap anywhere to immediately proceed to Language Screen
  const handleScreenClick = () => {
    speechService.unlockAudio();
    navigateTo(2);
  };

  return (
    <div 
      className="screen-fade-in"
      onClick={handleScreenClick}
      style={{
        flex: 1,
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 20px 32px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF4F6 30%, #F8E2E9 65%, #E1EDF8 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Soft decorative background circles */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'rgba(217, 145, 165, 0.18)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '-40px',
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        background: 'rgba(65, 111, 152, 0.18)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Top Branding Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '340px',
        marginTop: '6px',
        zIndex: 10
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '5px 12px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(217, 145, 165, 0.3)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Sparkles size={13} color="var(--warm-rose)" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'ग्रामीण मातृत्व साथी' : 'Rural Maternal Companion'}
          </span>
        </div>
      </div>

      {/* Centerpiece: Official Brand Logo & Protective Ribbon */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0', zIndex: 2 }}>
        <div style={{
          position: 'relative',
          width: '230px',
          height: '230px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px'
        }}>
          {/* Pulsing halo */}
          <div style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 145, 165, 0.35) 0%, rgba(65, 111, 152, 0.12) 70%, transparent 100%)',
            animation: 'orb-pulse 3s infinite alternate'
          }} />

          <img 
            src="/assets/logo.png" 
            alt="Mamta Ki Dori Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '24px',
              filter: 'drop-shadow(0 12px 24px rgba(23, 54, 83, 0.14))'
            }}
          />
        </div>

        <h1 style={{
          fontSize: '34px',
          fontWeight: 800,
          color: 'var(--deep-navy)',
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
          marginBottom: '6px'
        }}>
          {t.screen01.title}
        </h1>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          maxWidth: '280px',
          lineHeight: 1.4,
          fontWeight: 500,
          margin: 0
        }}>
          {t.screen01.subtitle}
        </p>
      </div>

      {/* Minimal Bottom Prompt (No Buttons) */}
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 18px',
          borderRadius: '24px',
          border: '1.5px solid rgba(217, 145, 165, 0.35)',
          boxShadow: '0 4px 14px rgba(65, 111, 152, 0.08)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--warm-rose)',
            display: 'inline-block'
          }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'शुरू करने के लिए स्क्रीन छुएं' : 'Tap anywhere to start'}
          </span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
          {language === 'hi' ? 'आवाज़ से संचालित • सुरक्षित • मुफ़्त' : 'Voice-first • Safe • Free'}
        </p>
      </div>
    </div>
  );
};
