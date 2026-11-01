import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { 
  ArrowLeft, 
  Smartphone, 
  ShieldCheck, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw,
  Globe,
  MessageSquare
} from 'lucide-react';
import { AmbientMusicControl } from '../components/AmbientMusicControl';

export const Screen20LoginOTP = () => {
  const { navigateTo, language, toggleLanguage, availableLanguages, setUserProfile, t } = useApp();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpDigits, setOtpDigits] = useState(['5', '2', '8', '1']);
  const [timer, setTimer] = useState(30);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSmsBanner, setShowSmsBanner] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Resend countdown timer
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle phone submission
  const handleSendOtp = () => {
    if (phoneNumber.length < 10) return;
    setIsSending(true);

    speechService.stopSpeaking();
    speechService.speak(
      language === 'en' 
        ? "Sending OTP verification code to your mobile number." 
        : "आपके मोबाइल नंबर पर 4 अंकों का गुप्त ओटीपी भेजा जा रहा है।",
      language
    );

    setTimeout(() => {
      setIsSending(false);
      setStep('otp');
      setShowSmsBanner(true);
      setTimer(30);

      // Auto announce OTP
      setTimeout(() => {
        speechService.speak(
          language === 'en'
            ? "Your verification code is 5 2 8 1."
            : "आपका ओटीपी कोड है 5 2 8 1",
          language
        );
      }, 800);
    }, 900);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance focus
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Auto-fill demo OTP
  const handleAutoFill = () => {
    setOtpDigits(['5', '2', '8', '1']);
  };

  // Verify and Login
  const handleVerify = () => {
    setIsVerifying(true);
    speechService.stopSpeaking();

    setTimeout(() => {
      setIsVerifying(false);
      setLoginSuccess(true);

      // Update logged-in user profile
      setUserProfile(prev => ({
        ...prev,
        name: 'रानी देवी',
        week: 12,
        stage: '12वां सप्ताह (तिमाही 1)'
      }));

      speechService.speak(
        language === 'en'
          ? "Welcome back Rani! Logging into your dashboard."
          : "नमस्ते रानी जी! आपका लॉगिन सफल रहा।",
        language
      );

      setTimeout(() => {
        navigateTo(6); // Jump straight to Home Dashboard
      }, 1200);
    }, 800);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 36px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          onClick={() => step === 'otp' ? setStep('phone') : navigateTo(1)}
          style={{
            background: 'var(--powder-blue)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--deep-navy)'
          }}
          title="पीछे जाएं"
        >
          <ArrowLeft size={18} />
        </button>

        <AmbientMusicControl language={language} />

        {/* Dialect Toggle */}
        <button
          onClick={toggleLanguage}
          style={{
            background: 'white',
            border: '1px solid rgba(65, 111, 152, 0.25)',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--primary-blue)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          <Globe size={12} />
          <span>{availableLanguages.find(l => l.code === language)?.name || 'हिन्दी'}</span>
        </button>
      </div>

      {/* Simulated SMS Notification Banner */}
      {showSmsBanner && step === 'otp' && (
        <div style={{
          background: 'linear-gradient(135deg, var(--deep-navy) 0%, #1e4569 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '12px 14px',
          marginBottom: '16px',
          boxShadow: '0 6px 18px rgba(23, 54, 83, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <MessageSquare size={18} color="var(--soft-blush)" />
          </div>
          <div style={{ flex: 1, fontSize: '12px' }}>
            <div style={{ fontWeight: 800, color: 'var(--soft-blush)', marginBottom: '1px' }}>
              📩 संदेश: ममता की डोरी
            </div>
            <div>
              आपका 4-अंकों का गुप्त ओटीपी कोड है: <strong style={{ fontSize: '14px', letterSpacing: '1px' }}>5281</strong>
            </div>
          </div>
        </div>
      )}

      {/* Welcoming Minimal Hero Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '20px 18px',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: '1.5px solid var(--powder-blue)',
        marginBottom: '20px'
      }}>
        {/* Warm Maternal Illustration (Uncropped) */}
        <div style={{
          width: '88px',
          height: '88px',
          borderRadius: '22px',
          overflow: 'hidden',
          margin: '0 auto 12px',
          boxShadow: '0 4px 14px rgba(65, 111, 152, 0.12)',
          border: '2px solid white',
          background: '#FFF6F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px'
        }}>
          <img 
            src="/assets/maternal_joy_hero.jpg" 
            alt="Maternal Joy" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 4px' }}>
          {step === 'phone' ? (language === 'hi' ? 'फोन नंबर से लॉगिन' : 'Mobile Login') : (language === 'hi' ? 'ओटीपी कोड दर्ज करें' : 'Verify OTP')}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px' }}>
          {step === 'phone' ? (language === 'hi' ? '4 अंकों का सुरक्षित कोड भेजा जाएगा' : 'A 4-digit code will be sent') : `+91 ${phoneNumber}`}
        </p>

        {/* Listen Voice Instructions */}
        <button
          onClick={() => speechService.speak(
            step === 'phone' 
              ? "अपना 10 अंकों का फोन नंबर भरें और ओटीपी प्राप्त करें बटन दबाएं।"
              : "संदेश में आए 4 अंकों के कोड को भरें और लॉगिन करें।",
            language
          )}
          style={{
            background: 'var(--powder-blue-light)',
            color: 'var(--primary-blue)',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Volume2 size={14} />
          <span>निर्देश सुनें</span>
        </button>
      </div>

      {/* Main Interactive Form Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '20px 18px',
        boxShadow: '0 6px 20px rgba(65, 111, 152, 0.06)',
        border: '1.5px solid var(--border-light)',
        marginBottom: 'auto'
      }}>
        {step === 'phone' ? (
          /* STEP 1: MOBILE NUMBER */
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px', display: 'block' }}>
              {t.screen20.phoneLabel}
            </label>

            {/* Phone Input Box with +91 Country Code */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid var(--primary-blue)',
              borderRadius: '18px',
              padding: '6px 14px',
              background: '#FAFCFE',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-blue)', marginRight: '8px' }}>
                🇮🇳 +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder={t.screen20.phonePlaceholder}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--deep-navy)',
                  letterSpacing: '1px'
                }}
              />
            </div>

            {/* Quick Demo Pill */}
            <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                type="button"
                onClick={() => setPhoneNumber('9876543210')}
                style={{
                  background: 'var(--powder-blue-light)',
                  border: '1px dashed var(--primary-blue)',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  color: 'var(--primary-blue)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ⚡ {t.screen20.demoPhonePill}
              </button>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOtp}
              disabled={phoneNumber.length < 10 || isSending}
              className="btn-primary"
              style={{
                width: '100%',
                minHeight: '50px',
                borderRadius: '24px',
                fontSize: '16px',
                opacity: phoneNumber.length < 10 || isSending ? 0.6 : 1
              }}
            >
              {isSending ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s infinite' }} />
                  <span>भेजा जा रहा है...</span>
                </>
              ) : (
                <>
                  <span>{t.screen20.sendOtpBtn}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        ) : (
          /* STEP 2: 4-DIGIT OTP BOXES */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {t.screen20.otpLabel}
              </label>

              <button
                onClick={() => setStep('phone')}
                style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                (नंबर बदलें)
              </button>
            </div>

            {/* 4 Spacious Digit Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  style={{
                    width: '54px',
                    height: '58px',
                    borderRadius: '16px',
                    border: digit ? '2.5px solid var(--primary-blue)' : '1.5px solid var(--border-light)',
                    background: digit ? 'var(--powder-blue-light)' : '#FAFCFE',
                    fontSize: '24px',
                    fontWeight: 800,
                    textAlign: 'center',
                    color: 'var(--deep-navy)',
                    outline: 'none',
                    boxShadow: digit ? '0 4px 12px rgba(65, 111, 152, 0.15)' : 'none',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {/* 1-Tap Auto Fill Helper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={handleAutoFill}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-success)',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCircle2 size={14} />
                <span>{t.screen20.autoFillOtp}</span>
              </button>

              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {timer > 0 ? `${timer} ${t.screen20.resendWait}` : (
                  <button
                    onClick={() => { setTimer(30); handleSendOtp(); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {t.screen20.resendOtp}
                  </button>
                )}
              </span>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={otpDigits.some(d => !d) || isVerifying || loginSuccess}
              className="btn-primary"
              style={{
                width: '100%',
                minHeight: '50px',
                borderRadius: '24px',
                fontSize: '16px',
                background: loginSuccess ? 'var(--color-success)' : 'var(--primary-blue)',
                opacity: otpDigits.some(d => !d) ? 0.6 : 1
              }}
            >
              {loginSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>सत्यापित! स्वागत है...</span>
                </>
              ) : isVerifying ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s infinite' }} />
                  <span>जांच हो रही है...</span>
                </>
              ) : (
                <>
                  <span>{t.screen20.verifyBtn}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Switch to New Registration */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button
          onClick={() => navigateTo(5)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary-blue)',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {t.screen20.newUserLink}
        </button>
      </div>

    </div>
  );
};
