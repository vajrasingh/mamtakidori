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
  UserCheck,
  Heart,
  MessageSquare
} from 'lucide-react';

export const Screen20LoginOTP = () => {
  const { navigateTo, language, setRole, role, setUserProfile, t } = useApp();

  // Role selection state: 'mother' | 'asha'
  const [selectedRole, setSelectedRole] = useState('mother');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpDigits, setOtpDigits] = useState(['5', '2', '8', '1']);
  const [timer, setTimer] = useState(30);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSmsBanner, setShowSmsBanner] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Update phone default when role changes
  const handleSelectRole = (r) => {
    setSelectedRole(r);
    if (r === 'mother') {
      setPhoneNumber('9876543210');
    } else {
      setPhoneNumber('9876500001');
    }
  };

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
  const handleSendOtp = (targetRole = selectedRole) => {
    const activeNumber = targetRole === 'mother' ? (phoneNumber || '9876543210') : (phoneNumber || '9876500001');
    if (activeNumber.length < 10) return;
    setIsSending(true);

    speechService.stopSpeaking();
    const roleSpoken = targetRole === 'asha'
      ? (language === 'en' ? "ASHA worker login" : "आशा कार्यकर्ता लॉगिन")
      : (language === 'en' ? "Mother login" : "गर्भवती माँ लॉगिन");

    speechService.speak(
      language === 'en' 
        ? `${roleSpoken}. Sending 4-digit OTP verification code.` 
        : `${roleSpoken}। आपके नंबर पर 4 अंकों का गुप्त ओटीपी भेजा जा रहा है।`,
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
      }, 700);
    }, 850);
  };

  // Direct 1-tap role CTA
  const handleRoleCtaClick = (r) => {
    handleSelectRole(r);
    handleSendOtp(r);
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

      if (selectedRole === 'asha') {
        setRole('asha');
        setUserProfile({
          name: 'सुनीता देवी',
          roleTitle: 'आशा कार्यकर्ता',
          phc: 'प्राथमिक स्वास्थ्य केंद्र, रामपुर',
          ashaName: 'सुनीता देवी',
          ashaPhone: '+91 98765 00001',
          assignedMothers: 18,
          todayVisits: 3
        });

        speechService.speak(
          language === 'en'
            ? "Welcome Sunita Didi! Opening ASHA Worker portal."
            : "नमस्ते सुनीता दीदी! आशा कार्यकर्ता पोर्टल में आपका स्वागत है।",
          language
        );

        setTimeout(() => {
          navigateTo(18); // Jump to ASHA Worker Portal
        }, 1200);
      } else {
        setRole('mother');
        setUserProfile({
          name: 'रानी देवी',
          week: 12,
          stage: '12वां सप्ताह (तिमाही 1)',
          dueDate: '5 नवंबर 2026',
          ashaName: 'सुनीता देवी',
          ashaPhone: '+91 98765 43210',
          doctorName: 'डॉ. प्रिया सिंह (CHC)',
          doctorPhone: '+91 94123 56789'
        });

        speechService.speak(
          language === 'en'
            ? "Welcome back Rani! Logging into your maternal dashboard."
            : "नमस्ते रानी जी! आपका लॉगिन सफल रहा।",
          language
        );

        setTimeout(() => {
          navigateTo(6); // Jump straight to Home Dashboard
        }, 1200);
      }
    }, 750);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 36px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      
      {/* Top Header with Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button
          onClick={() => step === 'otp' ? setStep('phone') : navigateTo(2)}
          style={{
            background: 'var(--powder-blue)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--deep-navy)',
            boxShadow: '0 4px 12px rgba(65, 111, 152, 0.1)'
          }}
          title="पीछे जाएं"
        >
          <ArrowLeft size={19} />
        </button>

        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-blue)', background: 'var(--powder-blue-light)', padding: '5px 12px', borderRadius: '16px' }}>
          🛡️ सुरक्षित मोबाइल लॉगिन
        </span>
      </div>

      {/* Simulated SMS Notification Banner */}
      {showSmsBanner && step === 'otp' && (
        <div style={{
          background: 'linear-gradient(135deg, var(--deep-navy) 0%, #1e4569 100%)',
          color: 'white',
          borderRadius: '18px',
          padding: '12px 14px',
          marginBottom: '16px',
          boxShadow: '0 8px 24px rgba(23, 54, 83, 0.22)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
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
              आपका 4-अंकों का गुप्त ओटीपी कोड है: <strong style={{ fontSize: '15px', letterSpacing: '1.5px', color: '#FFF' }}>5281</strong>
            </div>
          </div>
        </div>
      )}

      {/* Welcoming Minimal Hero Stage with Large Borderless Artwork */}
      <div style={{
        background: 'white',
        borderRadius: '26px',
        padding: '20px 18px 18px',
        textAlign: 'center',
        boxShadow: '0 8px 30px rgba(65, 111, 152, 0.08)',
        border: 'none',
        marginBottom: '18px'
      }}>
        {/* Large Uncropped Maternal / ASHA Artwork Frame (Borderless with Soft Glow) */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '26px',
          overflow: 'hidden',
          margin: '0 auto 12px',
          boxShadow: '0 8px 24px rgba(65, 111, 152, 0.12)',
          border: 'none',
          background: selectedRole === 'asha'
            ? 'radial-gradient(circle at center, #E8F8EE 0%, #FFFFFF 100%)'
            : 'radial-gradient(circle at center, #FFF2EE 0%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          transition: 'all 0.3s ease'
        }}>
          <img 
            src={selectedRole === 'asha' ? '/assets/asha_didi_vector.jpg' : '/assets/maternal_joy_hero.jpg'} 
            alt={selectedRole === 'asha' ? "ASHA Didi" : "Maternal Joy"} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(23, 54, 83, 0.12))'
            }} 
          />
        </div>

        <h2 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 4px' }}>
          {step === 'phone' ? (language === 'hi' ? 'लॉगिन का प्रकार चुनें' : 'Choose Login Mode') : (language === 'hi' ? 'ओटीपी कोड दर्ज करें' : 'Verify OTP')}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px' }}>
          {step === 'phone' 
            ? (language === 'hi' ? 'नई माँ या आशा कार्यकर्ता के रूप में आगे बढ़ें' : 'Continue as a New Mother or ASHA Worker')
            : `+91 ${phoneNumber}`}
        </p>

        {/* Listen Voice Instructions */}
        <button
          onClick={() => speechService.speak(
            step === 'phone' 
              ? "नई माँ या आशा कार्यकर्ता बटन चुनकर लॉगिन करें।"
              : "संदेश में आए 4 अंकों के कोड को भरें और लॉगिन करें।",
            language
          )}
          style={{
            background: 'var(--powder-blue-light)',
            color: 'var(--primary-blue)',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 14px',
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

      {step === 'phone' ? (
        /* STEP 1: TWO DISTINCT PRIMARY CTA BUTTONS */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'auto' }}>
          
          {/* CTA Button 1: Login as New Mother */}
          <button
            onClick={() => handleRoleCtaClick('mother')}
            disabled={isSending}
            style={{
              width: '100%',
              minHeight: '74px',
              borderRadius: '22px',
              border: selectedRole === 'mother' ? 'none' : 'none',
              background: 'linear-gradient(135deg, #FFF5F2 0%, #FFFFFF 100%)',
              padding: '14px 16px',
              boxShadow: '0 8px 24px rgba(217, 145, 165, 0.16)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--warm-rose) 0%, #E07090 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(217, 145, 165, 0.4)',
                flexShrink: 0
              }}>
                <Heart size={22} fill="white" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                  🌸 {language === 'hi' ? 'नई माँ / गर्भवती माँ लॉगिन' : 'Login as New Mother'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? 'रानी देवी • 12वां सप्ताह • मातृत्व साथी' : 'Rani Devi • Week 12 • Maternal Home'}
                </div>
              </div>
            </div>

            <ArrowRight size={20} color="var(--warm-rose-dark)" />
          </button>

          {/* CTA Button 2: Login as ASHA Worker */}
          <button
            onClick={() => handleRoleCtaClick('asha')}
            disabled={isSending}
            style={{
              width: '100%',
              minHeight: '74px',
              borderRadius: '22px',
              border: 'none',
              background: 'linear-gradient(135deg, #F0FAF5 0%, #FFFFFF 100%)',
              padding: '14px 16px',
              boxShadow: '0 8px 24px rgba(46, 133, 64, 0.14)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-success) 0%, #207335 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(46, 133, 64, 0.35)',
                flexShrink: 0
              }}>
                <UserCheck size={22} />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                  👩‍⚕️ {language === 'hi' ? 'आशा कार्यकर्ता लॉगिन' : 'Login as ASHA Worker'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? 'सुनीता दीदी • कार्यकर्ता • रामपुर PHC' : 'Sunita Didi • Field Worker • Rampur PHC'}
                </div>
              </div>
            </div>

            <ArrowRight size={20} color="var(--color-success)" />
          </button>

          {/* Or Enter Custom Mobile Number */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '14px 16px',
            boxShadow: '0 4px 16px rgba(65, 111, 152, 0.05)',
            border: 'none',
            marginTop: '4px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {language === 'hi' ? 'या अन्य मोबाइल नंबर दर्ज करें:' : 'Or enter another mobile number:'}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '6px 12px',
              background: '#FAFCFE',
              border: 'none',
              boxShadow: 'inset 0 0 0 1.5px rgba(65, 111, 152, 0.2)'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-blue)', marginRight: '8px' }}>
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
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--deep-navy)',
                  letterSpacing: '1px'
                }}
              />
            </div>
          </div>

        </div>
      ) : (
        /* STEP 2: 4-DIGIT OTP BOXES */
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '20px 18px',
          boxShadow: '0 8px 30px rgba(65, 111, 152, 0.08)',
          border: 'none',
          marginBottom: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {selectedRole === 'asha' ? 'आशा कार्यकर्ता ओटीपी कोड' : t.screen20.otpLabel}
            </label>

            <button
              onClick={() => setStep('phone')}
              style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              (बदलें)
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
                  border: 'none',
                  background: digit ? 'var(--powder-blue-light)' : '#FAFCFE',
                  fontSize: '24px',
                  fontWeight: 800,
                  textAlign: 'center',
                  color: 'var(--deep-navy)',
                  outline: 'none',
                  boxShadow: digit ? '0 4px 14px rgba(65, 111, 152, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
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
              border: 'none',
              background: loginSuccess 
                ? 'var(--color-success)' 
                : selectedRole === 'asha'
                ? 'linear-gradient(135deg, var(--color-success) 0%, #207335 100%)'
                : 'linear-gradient(135deg, var(--primary-blue) 0%, #2b5780 100%)',
              opacity: otpDigits.some(d => !d) ? 0.6 : 1,
              boxShadow: '0 6px 20px rgba(65, 111, 152, 0.25)'
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
                <span>{selectedRole === 'asha' ? 'आशा कार्यकर्ता लॉगिन करें' : t.screen20.verifyBtn}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      )}

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
