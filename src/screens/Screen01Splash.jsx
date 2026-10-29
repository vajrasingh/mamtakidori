import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const Screen01Splash = () => {
  const { navigateTo, t, language } = useApp();

  // Auto transition after 3.5 seconds or let user tap to advance
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo(2);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="screen-fade-in"
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 24px 40px',
        background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F8E5EA 65%, #EAF3FB 100%)',
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
        background: 'rgba(217, 145, 165, 0.15)',
        filter: 'blur(30px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '-40px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(65, 111, 152, 0.15)',
        filter: 'blur(40px)'
      }} />

      {/* Top Branding Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.85)',
        padding: '6px 14px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(217, 145, 165, 0.3)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '12px'
      }}>
        <Sparkles size={14} color="var(--warm-rose)" />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--deep-navy)' }}>
          {language === 'hi' ? 'ग्रामीण मातृत्व साथी' : 'Rural Maternal Companion'}
        </span>
      </div>

      {/* Centerpiece: Official Brand Logo & Protective Ribbon */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0' }}>
        <div style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {/* Pulsing halo */}
          <div style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 145, 165, 0.3) 0%, rgba(65, 111, 152, 0.1) 70%, transparent 100%)',
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
              filter: 'drop-shadow(0 12px 24px rgba(23, 54, 83, 0.12))'
            }}
          />
        </div>

        <h1 style={{
          fontSize: '34px',
          fontWeight: 800,
          color: 'var(--deep-navy)',
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
          marginBottom: '8px'
        }}>
          {t.screen01.title}
        </h1>

        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
          maxWidth: '280px',
          lineHeight: 1.4,
          fontWeight: 500
        }}>
          {t.screen01.subtitle}
        </p>
      </div>

      {/* Bottom Start Action & Pulse Bar */}
      <div style={{ width: '100%', maxWidth: '320px' }}>
        <button 
          onClick={() => navigateTo(2)}
          className="btn-primary"
          style={{
            background: 'var(--gradient-primary)',
            fontSize: '18px',
            letterSpacing: '0.2px'
          }}
        >
          <span>{language === 'hi' ? 'शुरू करें / Start' : 'Get Started'}</span>
          <ArrowRight size={20} />
        </button>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
          {language === 'hi' ? 'आवाज़ से संचालित, सुरक्षित और मुफ़्त' : 'Voice-first, safe & free'}
        </p>
      </div>
    </div>
  );
};
