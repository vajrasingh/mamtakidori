import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Volume2, 
  Heart, 
  Activity, 
  ChevronRight, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const Screen12Symptoms = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [hasEmergency, setHasEmergency] = useState(false);

  const symptomList = [
    {
      id: 'nausea',
      title: t.screen12.symp2,
      severity: t.screen12.symp2Severity,
      icon: '🤢',
      isRedFlag: false,
      adviceHi: "प्रारंभिक महीनों में जी मिचलाना सामान्य है। सुबह उठकर नींबू पानी या सूखा टोस्ट लें और खाली पेट न रहें।",
      adviceEn: "Morning nausea is common in early pregnancy. Sip lemon water, eat dry toast, and avoid an empty stomach."
    },
    {
      id: 'weakness',
      title: t.screen12.symp1,
      severity: t.screen12.symp1Severity,
      icon: '🥱',
      isRedFlag: false,
      adviceHi: "कमजोरी खून की कमी का संकेत हो सकती है। आयरन की लाल गोली नियमित रूप से लें और गुड़, चना व हरी सब्जियां खाएं।",
      adviceEn: "Weakness can indicate low iron. Take your red iron tablet daily and eat green leafy vegetables and lentils."
    },
    {
      id: 'headache',
      title: t.screen12.symp4,
      severity: t.screen12.symp4Severity,
      icon: '🤕',
      isRedFlag: false,
      adviceHi: "तेज सिरदर्द हाई ब्लड प्रेशर का संकेत हो सकता है। स्वास्थ्य केंद्र जाकर अपना बीपी जरूर चेक करवाएं।",
      adviceEn: "Persistent headache can be a sign of high blood pressure. Visit the health centre to check your BP."
    },
    {
      id: 'stomach_pain',
      title: t.screen12.symp3,
      severity: t.screen12.symp3Severity,
      icon: '😣',
      isRedFlag: true,
      adviceHi: "पेट में तेज दर्द होने पर तुरंत डॉक्टर या आशा दीदी से संपर्क करें।",
      adviceEn: "Severe stomach pain requires urgent medical attention. Contact your doctor or ASHA worker immediately."
    },
    {
      id: 'bleeding',
      title: t.screen12.symp5,
      severity: t.screen12.symp5Severity,
      icon: '🩸',
      isRedFlag: true,
      adviceHi: "रक्तस्राव या खून आना आपातकालीन स्थिति है! तुरंत 108 एम्बुलेंस को कॉल करें या निकटतम अस्पताल जाएं।",
      adviceEn: "Bleeding is an emergency! Call 108 ambulance immediately or go to the nearest hospital."
    }
  ];

  const handleToggleSymptom = (item) => {
    let updated;
    if (selectedSymptoms.includes(item.id)) {
      updated = selectedSymptoms.filter(id => id !== item.id);
    } else {
      updated = [...selectedSymptoms, item.id];
    }
    setSelectedSymptoms(updated);

    // Check if any red flag symptom is active
    const redFlagPresent = updated.some(id => {
      const found = symptomList.find(s => s.id === id);
      return found && found.isRedFlag;
    });

    setHasEmergency(redFlagPresent);

    if (item.isRedFlag && !selectedSymptoms.includes(item.id)) {
      speakText(language === 'hi' 
        ? "चेतावनी! यह एक आपातकालीन लक्षण है। कृपया तुरंत 108 एम्बुलेंस या सुनीता आशा दीदी से संपर्क करें।" 
        : "Warning! This is a red flag symptom. Please call 108 Ambulance or contact your ASHA worker immediately."
      );
    } else {
      speakText(language === 'hi' ? item.adviceHi : (item.adviceEn || item.title));
    }
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen12.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen12.subtitle}
        </p>
      </div>

      {/* Red Flag Urgent Care Alert Box (If bleeding or acute pain selected) */}
      {hasEmergency && (
        <div style={{
          background: 'var(--color-error-bg)',
          border: '2px solid var(--color-error)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '16px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldAlert size={22} color="var(--color-error)" />
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-error)' }}>
              {t.screen12.emergencyTitle}
            </span>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--deep-navy)', lineHeight: 1.45, fontWeight: 600, marginBottom: '14px' }}>
            {t.screen12.emergencyAlert}
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="tel:108"
              className="btn-primary"
              style={{
                background: 'var(--color-error)',
                flex: 1,
                minHeight: '44px',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(185, 76, 85, 0.4)'
              }}
            >
              <PhoneCall size={16} />
              <span>{t.screen12.btnCallAmbulance}</span>
            </a>

            <button
              onClick={() => navigateTo(16)}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '44px', fontSize: '14px' }}
            >
              <span>{language === 'hi' ? 'आशा दीदी को कॉल' : 'Call ASHA'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Symptom Cards Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {symptomList.map(item => {
          const isSelected = selectedSymptoms.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleToggleSymptom(item)}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? (item.isRedFlag ? 'var(--color-error-bg)' : 'var(--powder-blue-light)') : 'var(--surface-white)',
                border: isSelected ? (item.isRedFlag ? '2px solid var(--color-error)' : '2px solid var(--primary-blue)') : '1px solid rgba(65, 111, 152, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '26px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: item.isRedFlag && isSelected ? 'var(--color-error)' : 'var(--deep-navy)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12.5px', color: item.isRedFlag ? 'var(--color-error)' : 'var(--text-secondary)' }}>
                    {item.severity}
                  </div>
                </div>
              </div>

              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: isSelected ? (item.isRedFlag ? 'var(--color-error)' : 'var(--primary-blue)') : 'white',
                border: isSelected ? 'none' : '2px solid #BAC7D5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}>
                {isSelected && <CheckCircle2 size={16} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice Prompt */}
      <div 
        onClick={() => navigateTo(10)}
        style={{
          background: 'var(--surface-white)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          border: '1.5px dashed var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Volume2 size={20} color="var(--primary-blue)" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'अगर कुछ और बताना चाहती हैं, तो बोलें' : 'Want to explain anything else? Speak'}
          </span>
        </div>
        <ChevronRight size={18} color="var(--primary-blue)" />
      </div>

      {/* Save Action */}
      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={() => {
            speakText(language === 'hi' 
              ? "आपके लक्षण सुरक्षित कर लिए गए हैं। अगर कोई परेशानी बढ़े तो तुरंत आशा कार्यकर्ता को सूचित करें।" 
              : "Symptoms logged. Reach out to your health worker if discomfort persists."
            );
            navigateTo(6); // Back to Home
          }} 
          className="btn-primary"
        >
          <span>{t.app.save}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
