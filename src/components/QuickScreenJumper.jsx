import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';

export const QuickScreenJumper = () => {
  const { currentScreen, navigateTo, isJumperOpen, setIsJumperOpen, language } = useApp();

  if (!isJumperOpen) return null;

  const screens = [
    { num: 1, titleHi: "स्क्रीन 01: स्पलैश स्क्रीन (Splash)", titleEn: "Screen 01: Splash Screen" },
    { num: 2, titleHi: "स्क्रीन 02: भाषा चयन (Language Selection)", titleEn: "Screen 02: Language Selection" },
    { num: 3, titleHi: "स्क्रीन 03: परिचय एवं ऑनबोर्डिंग (Welcome & Onboarding)", titleEn: "Screen 03: Welcome & Onboarding" },
    { num: 4, titleHi: "स्क्रीन 04: निजता व सहमति (Consent & Privacy)", titleEn: "Screen 04: Consent & Privacy" },
    { num: 5, titleHi: "स्क्रीन 05: गर्भावस्था पंजीकरण (Registration)", titleEn: "Screen 05: Pregnancy Registration" },
    { num: 6, titleHi: "स्क्रीन 06: होम डैशबोर्ड (Home Dashboard)", titleEn: "Screen 06: Home Dashboard" },
    { num: 7, titleHi: "स्क्रीन 07: ममता एआई साथी (Talk to Mamta AI)", titleEn: "Screen 07: Talk to Mamta: Agentic AI" },
    { num: 8, titleHi: "स्क्रीन 08: सप्ताह-दर-सप्ताह (Pregnancy by Week)", titleEn: "Screen 08: Pregnancy by Week" },
    { num: 9, titleHi: "स्क्रीन 09: चेकअप और जांचें (Check-ups & Tests)", titleEn: "Screen 09: Check-ups & Tests" },
    { num: 10, titleHi: "स्क्रीन 10: आवाज़ रिकॉर्डिंग (Voice Recording)", titleEn: "Screen 10: Voice Recording" },
    { num: 11, titleHi: "स्क्रीन 11: फोटो अपलोड/रिपोर्ट (Photo Upload)", titleEn: "Screen 11: Photo Upload / Records" },
    { num: 12, titleHi: "स्क्रीन 12: लक्षण व खतरे के संकेत (Symptoms & Triage)", titleEn: "Screen 12: Symptoms & Triage" },
    { num: 13, titleHi: "स्क्रीन 13: रिमाइंडर व नोटिफिकेशन (Reminders)", titleEn: "Screen 13: Notifications & Reminders" },
    { num: 14, titleHi: "स्क्रीन 14: परिवार व सास मोड (Mother-in-Law Mode)", titleEn: "Screen 14: Family Support (MIL Mode)" },
    { num: 15, titleHi: "स्क्रीन 15: देखभाल टाइमलाइन (Care Timeline 0-24m)", titleEn: "Screen 15: Care Timeline (0-24m)" },
    { num: 16, titleHi: "स्क्रीन 16: मदद व आपातकाल (Get Help & SOS)", titleEn: "Screen 16: Get Help & Contacts" },
    { num: 17, titleHi: "स्क्रीन 17: स्वास्थ्य रिकॉर्ड्स व शेयरिंग (Records & Privacy)", titleEn: "Screen 17: Records & Privacy" },
    { num: 18, titleHi: "स्क्रीन 18: आशा कार्यकर्ता मोड (ASHA Worker Mode)", titleEn: "Screen 18: ASHA Worker Mode" },
    { num: 19, titleHi: "स्क्रीन 19: सास-बहू घरेलू नुस्खा एआई सत्यापन (Family Remedy AI & ASHA)", titleEn: "Screen 19: Family Remedy AI & ASHA Verification Flow" },
    { num: 20, titleHi: "स्क्रीन 20: सरल ओटीपी लॉगिन (Simple Mobile OTP Login)", titleEn: "Screen 20: Simple Mobile OTP Login" },
    { num: 21, titleHi: "स्क्रीन 21: माँ का प्रोफ़ाइल (Maternal Health Profile)", titleEn: "Screen 21: Maternal Health Profile" },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(23, 54, 83, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0'
      }}
      onClick={() => setIsJumperOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '84vh',
          background: 'var(--warm-offwhite)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'सभी 20 स्क्रीन देखें' : 'All 20 Prototype Screens'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'किसी भी स्क्रीन पर तुरंत जाने के लिए टैप करें' : 'Tap any screen to jump directly'}
            </p>
          </div>
          <button
            onClick={() => setIsJumperOpen(false)}
            style={{
              background: 'var(--powder-blue)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="var(--deep-navy)" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          {screens.map(s => {
            const isActive = currentScreen === s.num;
            return (
              <div
                key={s.num}
                onClick={() => {
                  navigateTo(s.num);
                  setIsJumperOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '8px',
                  background: isActive ? 'var(--powder-blue)' : 'var(--surface-white)',
                  border: isActive ? '1.5px solid var(--primary-blue)' : '1px solid rgba(65, 111, 152, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--primary-blue)' : 'var(--powder-blue)',
                    color: isActive ? 'white' : 'var(--deep-navy)',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {s.num}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: isActive ? 700 : 600, color: 'var(--text-primary)' }}>
                    {language === 'hi' ? s.titleHi : s.titleEn}
                  </span>
                </div>

                {isActive ? (
                  <CheckCircle2 size={18} color="var(--primary-blue)" />
                ) : (
                  <ChevronRight size={16} color="var(--text-secondary)" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
