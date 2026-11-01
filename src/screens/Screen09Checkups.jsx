import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  TestTube, 
  Pill, 
  CheckCircle2, 
  Volume2, 
  Bell, 
  AlertTriangle,
  Activity,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Check,
  ChevronRight,
  Clock,
  Info
} from 'lucide-react';

export const Screen09Checkups = () => {
  const { navigateTo, speakText, language } = useApp();
  const [remindersSet, setRemindersSet] = useState({ 1: true });
  const [isIronTaken, setIsIronTaken] = useState(false);
  const [activeTestDetail, setActiveTestDetail] = useState(null);

  const toggleReminder = (id) => {
    const nextState = !remindersSet[id];
    setRemindersSet(prev => ({ ...prev, [id]: nextState }));
    speakText(nextState 
      ? (language === 'hi' ? "चेकअप का रिमाइंडर सेट हो गया है।" : "Checkup reminder scheduled.") 
      : (language === 'hi' ? "रिमाइंडर हटा दिया गया है।" : "Reminder removed.")
    );
  };

  const handleTakeIron = () => {
    setIsIronTaken(!isIronTaken);
    if (!isIronTaken) {
      speakText(language === 'hi' ? "शाबाश! आज की लाल आयरन गोली दर्ज हो गई।" : "Great! Today's Iron tablet logged.");
    }
  };

  const handleAudioSummary = () => {
    const speech = language === 'hi'
      ? "चेकअप और जांच सूची। आपका अगला जरूरी चेकअप 5 नवंबर को रामपुर प्राथमिक स्वास्थ्य केंद्र में है। टीडी का पहला टीका लग चुका है। रोज दोपहर खाने के बाद लाल आयरन की गोली जरूर लें।"
      : "Checkup and ANC summary. Your next antenatal visit is on 5 November at Rampur PHC. Td-1 vaccination is completed. Take your red iron tablet daily after lunch.";
    speakText(speech);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* 1. Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
            {language === 'hi' ? 'जांच व चेकअप' : 'Checkups & ANC'}
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {language === 'hi' ? 'स्वास्थ्य केंद्र क्लिनिक व टीकाकरण' : 'Clinical visits & mandatory schedule'}
          </div>
        </div>

        <button
          onClick={handleAudioSummary}
          style={{
            background: 'var(--powder-blue)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
          title="Listen Audio"
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* 2. Primary Hero Card — Next Upcoming Checkup (High Visual Hierarchy) */}
      <div style={{
        background: 'linear-gradient(135deg, #173653 0%, #22517C 100%)',
        borderRadius: '24px',
        padding: '18px',
        color: 'white',
        boxShadow: '0 8px 24px rgba(23, 54, 83, 0.22)',
        position: 'relative'
      }}>
        {/* Top Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{
            background: '#F59E0B',
            color: 'white',
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Clock size={12} />
            <span>{language === 'hi' ? '3 दिन में देय • ANC 1' : 'Due in 3 Days • ANC 1'}</span>
          </div>

          <span style={{ fontSize: '11px', color: '#FFE2EA', fontWeight: 700 }}>
            {language === 'hi' ? '12वां सप्ताह' : 'Week 12'}
          </span>
        </div>

        {/* Date & Center */}
        <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>
          {language === 'hi' ? '5 नवंबर 2026 (गुरुवार)' : '5 November 2026 (Thu)'}
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '14px' }}>
          <MapPin size={14} color="#93C5FD" />
          <span>{language === 'hi' ? 'प्राथमिक स्वास्थ्य केंद्र (PHC) रामपुर • सुबह 9 बजे' : 'Primary Health Center Rampur • 9:00 AM'}</span>
        </div>

        {/* 4 Essential Tests Chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '14px' }}>
          {[
            { hi: '⚖️ वजन जांच', en: '⚖️ Weight' },
            { hi: '🩺 बीपी जांच', en: '🩺 Blood Pressure' },
            { hi: '🩸 हीमोग्लोबिन (Hb)', en: '🩸 Hemoglobin' },
            { hi: '🧪 पेशाब जांच', en: '🧪 Urine Test' }
          ].map((t, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: 'white'
            }}>
              {language === 'hi' ? t.hi : t.en}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleReminder(1)}
            style={{
              flex: 1,
              background: remindersSet[1] ? 'rgba(255, 255, 255, 0.25)' : 'white',
              color: remindersSet[1] ? 'white' : 'var(--deep-navy)',
              border: 'none',
              padding: '9px 12px',
              borderRadius: '14px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Bell size={14} />
            <span>{remindersSet[1] ? (language === 'hi' ? 'रिमाइंडर चालू ✓' : 'Reminder Set ✓') : (language === 'hi' ? 'याद दिलाएं' : 'Set Alert')}</span>
          </button>

          <a
            href="tel:+919876543210"
            style={{
              flex: 1,
              background: '#10B981',
              color: 'white',
              textDecoration: 'none',
              padding: '9px 12px',
              borderRadius: '14px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <PhoneCall size={14} />
            <span>{language === 'hi' ? 'आशा साथ लें' : 'Call ASHA'}</span>
          </a>
        </div>
      </div>

      {/* 3. Clean Visual Timeline Cards (Uncluttered, Minimal Text) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', paddingLeft: '2px' }}>
          📋 {language === 'hi' ? 'सभी आवश्यक जांचें व टीके' : 'Checkup & Vaccine Milestones'}
        </div>

        {/* Card 1: Td-1 Vaccine (Completed) */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(65, 111, 152, 0.06)',
          borderLeft: '5px solid #10B981'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#D1FAE5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'टीडी-1 टीका (टेटनस)' : 'Td-1 Vaccination'}
              </div>
              <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                ✅ {language === 'hi' ? '12 अक्टूबर को पूर्ण • टीडी-2 देय 10 नवंबर' : 'Completed 12 Oct • Td-2 due 10 Nov'}
              </div>
            </div>
          </div>
          <span style={{
            background: '#D1FAE5',
            color: '#065F46',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: '8px'
          }}>
            {language === 'hi' ? 'पूर्ण' : 'Done'}
          </span>
        </div>

        {/* Card 2: Daily Iron Tablet (Interactive) */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(65, 111, 152, 0.06)',
          borderLeft: '5px solid var(--warm-rose-dark)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--soft-blush)',
              color: 'var(--warm-rose-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Pill size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'लाल आयरन गोली (IFA)' : 'Daily Iron Tablet (IFA)'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'रोज दोपहर भोजन के बाद 1 गोली' : '1 red tablet after lunch daily'}
              </div>
            </div>
          </div>

          <button
            onClick={handleTakeIron}
            style={{
              background: isIronTaken ? '#10B981' : 'var(--warm-rose)',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {isIronTaken ? (language === 'hi' ? 'ली गई ✓' : 'Taken ✓') : (language === 'hi' ? 'हाँ, ले ली' : 'Mark Taken')}
          </button>
        </div>

        {/* Card 3: Ultrasound Anomaly Scan (Scheduled) */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(65, 111, 152, 0.06)',
          borderLeft: '5px solid var(--primary-blue)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--powder-blue-light)',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Activity size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'अल्ट्रासाउंड एनामली स्कैन' : 'Ultrasound Anomaly Scan'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'सप्ताह 18-20 • सीएचसी में अंग परीक्षण' : 'Week 18-20 • Fetal organs check at CHC'}
              </div>
            </div>
          </div>

          <span style={{
            background: 'var(--powder-blue-light)',
            color: 'var(--primary-blue)',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: '8px'
          }}>
            {language === 'hi' ? 'सप्ताह 18' : 'Week 18'}
          </span>
        </div>
      </div>

      {/* 4. Visual 4-Tile Diagnostic Quick Guide (Minimal text, Tap for detail) */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '16px 18px',
        boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '12px' }}>
          🧪 {language === 'hi' ? 'जांच के आसान नियम' : 'Quick Diagnostic Test Guide'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {[
            {
              titleHi: '🩸 हीमोग्लोबिन (Hb)',
              titleEn: '🩸 Hemoglobin (Hb)',
              normal: '> 11.0 g/dL',
              noteHi: 'खून की कमी जांचने हेतु',
              noteEn: 'Anemia prevention',
              safeHi: 'उंगली से 1 बूंद रक्त'
            },
            {
              titleHi: '🩺 ब्लड प्रेशर (BP)',
              titleEn: '🩺 Blood Pressure',
              normal: '120/80 mmHg',
              noteHi: 'उच्च रक्तचाप रोकथाम',
              noteEn: 'Preeclampsia screen',
              safeHi: 'हाथ में कफ बांधकर 2 मिनट'
            },
            {
              titleHi: '🧪 पेशाब जांच',
              titleEn: '🧪 Urine Screen',
              normal: 'एल्ब्यूमिन: शून्य (Nil)',
              noteHi: 'किडनी व शुगर सुरक्षा',
              noteEn: 'Albumin & glucose',
              safeHi: 'साफ कंटेनर में सुबह का नमूना'
            },
            {
              titleHi: '🩻 अल्ट्रासाउंड',
              titleEn: '🩻 Sonography',
              normal: 'शिशु धड़कन 140-160',
              noteHi: 'ध्वनि तरंगें • 100% सुरक्षित',
              noteEn: 'Soundwaves • 100% Safe',
              safeHi: 'कोई विकिरण या दर्द नहीं'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTestDetail(item)}
              style={{
                background: '#F8FAFC',
                padding: '12px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '3px' }}>
                {language === 'hi' ? item.titleHi : item.titleEn}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '2px' }}>
                {item.normal}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? item.noteHi : item.noteEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Minimal Emergency Contact Strip */}
      <div 
        onClick={() => navigateTo(16)}
        style={{
          background: 'var(--color-error-bg)',
          border: '1.5px solid var(--color-error)',
          borderRadius: '18px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="var(--color-error)" />
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--color-error)' }}>
            {language === 'hi' ? 'अचानक तेज दर्द या रक्तस्राव? तुरंत 108 पर कॉल करें' : 'Severe pain or bleeding? Call 108 Ambulance'}
          </div>
        </div>
        <ChevronRight size={18} color="var(--color-error)" />
      </div>

      {/* Interactive Modal if user taps a test */}
      {activeTestDetail && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(23, 54, 83, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '22px',
            padding: '20px',
            maxWidth: '340px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
              {language === 'hi' ? activeTestDetail.titleHi : activeTestDetail.titleEn}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '8px' }}>
              {language === 'hi' ? 'सामान्य पैमाना:' : 'Normal Range:'} {activeTestDetail.normal}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
              {language === 'hi' ? activeTestDetail.noteHi : activeTestDetail.noteEn}
            </div>
            <div style={{ background: '#ECFDF5', padding: '8px 12px', borderRadius: '12px', fontSize: '11.5px', color: '#065F46', marginBottom: '16px' }}>
              🛡️ {activeTestDetail.safeHi}
            </div>
            <button
              onClick={() => setActiveTestDetail(null)}
              style={{
                width: '100%',
                background: 'var(--primary-blue)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {language === 'hi' ? 'ठीक है' : 'Close'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
