import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Calendar, 
  Heart, 
  Activity, 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  VolumeX, 
  FileText, 
  MapPin,
  Baby,
  Pill,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';

export const Screen21Profile = () => {
  const { navigateTo, speakText, stopAudio, isSpeaking, language } = useApp();
  const [isPlayingBio, setIsPlayingBio] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(12);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  // Gestational Milestones for interactive graph
  const milestones = [
    { week: 4, sizeHi: 'खसखस दाना', sizeEn: 'Poppy Seed', fruit: '🌱', length: '0.1 cm', weight: '< 1 g', trimester: 1, descHi: 'गर्भ में नन्हा भ्रूण रोपित हुआ', descEn: 'Implantation in uterus' },
    { week: 8, sizeHi: 'रास्पबेरी', sizeEn: 'Raspberry', fruit: '🍇', length: '1.6 cm', weight: '1 g', trimester: 1, descHi: 'नन्हे दिल की धड़कन शुरू', descEn: 'Heartbeat detectable' },
    { week: 12, sizeHi: 'नींबू (वर्तमान)', sizeEn: 'Lime (Current)', fruit: '🍋', length: '5.4 cm', weight: '14 g', trimester: 1, descHi: 'हाथ-पैर व अंग पूर्ण विकसित', descEn: 'Tiny fingers & vital organs formed', isCurrent: true },
    { week: 20, sizeHi: 'केला (अल्ट्रासाउंड)', sizeEn: 'Banana (Scan)', fruit: '🍌', length: '25 cm', weight: '300 g', trimester: 2, descHi: 'एनामली स्कैन व हलचल', descEn: 'Anomaly scan & movement' },
    { week: 28, sizeHi: 'बैंगन (तिमाही 3)', sizeEn: 'Eggplant (T3)', fruit: '🍆', length: '37 cm', weight: '1000 g', trimester: 3, descHi: 'पलकें झपकना व तीव्र वृद्धि', descEn: 'Eyes open & rapid brain growth' },
    { week: 40, sizeHi: 'तरबूज (प्रसव)', sizeEn: 'Watermelon (Full Term)', fruit: '🍉', length: '51 cm', weight: '3200 g', trimester: 3, descHi: 'शिशु का स्वागत व स्वस्थ प्रसव', descEn: 'Full term delivery milestone' }
  ];

  const currentMilestone = milestones.find(m => m.week === selectedWeek) || milestones[2];

  const handleListenBio = () => {
    if (isPlayingBio || isSpeaking) {
      stopAudio();
      setIsPlayingBio(false);
      return;
    }
    setIsPlayingBio(true);
    const speech = language === 'hi' 
      ? `नमस्ते रानी जी। आपकी आयु 24 वर्ष है। आप 12वें सप्ताह के गर्भ में हैं और शिशु अभी नींबू के आकार का है। प्रसव की अनुमानित तारीख 17 मई 2027 है। आपका पिछला चेकअप 12 अक्टूबर को हुआ था जिसमें टीडी-1 टीका लगा। अगला चेकअप 5 नवंबर को प्राथमिक स्वास्थ्य केंद्र में है। परिवार में पति रमेश कुमार और सास कांति देवी हैं। आपका ब्लड ग्रुप बी पॉजिटिव और हीमोग्लोबिन 10.2 ग्राम है।`
      : `Hello Rani Devi. You are 24 years old and in week 12 of pregnancy. Your baby is the size of a lime. Due date is 17 May 2027. Your last checkup was on 12 October with Td vaccine completed. Next checkup is on 5 November at Rampur PHC. Family includes husband Ramesh Kumar and mother-in-law Kanti Devi. Blood group is B positive with hemoglobin at 10.2 grams.`;
    speakText(speech);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Simplified Minimalist Header Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '16px 18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Real Avatar */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '2.5px solid var(--powder-blue)',
            boxShadow: '0 4px 12px rgba(65, 111, 152, 0.12)'
          }}>
            <img 
              src="/assets/maternal_joy_hero.jpg" 
              alt="Rani Devi" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
                {language === 'hi' ? 'रानी देवी' : 'Rani Devi'}
              </h2>
              <span style={{
                background: 'var(--soft-blush)',
                color: 'var(--warm-rose-dark)',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                {language === 'hi' ? '24 वर्ष' : '24 Yrs'}
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {language === 'hi' ? 'ग्राम रामपुर, ब्लॉक शिवगढ़' : 'Rampur Village, Shivgarh'}
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
              <span style={{
                background: '#F1F5F9',
                fontSize: '10.5px',
                fontWeight: 700,
                color: 'var(--deep-navy)',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                ABHA: 91-8492-3829-1029
              </span>
              <span style={{
                background: '#FEE2E2',
                fontSize: '10.5px',
                fontWeight: 800,
                color: '#B91C1C',
                padding: '2px 7px',
                borderRadius: '6px'
              }}>
                B+
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleListenBio}
          style={{
            background: isPlayingBio ? 'var(--warm-rose)' : 'var(--powder-blue)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: isPlayingBio ? 'white' : 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
          title="Listen Profile"
        >
          {isPlayingBio ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* 2. Micro-Interactive Gestational Growth Graph & Timeline */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'गर्भावस्था वृद्धि व समयरेखा' : 'Gestational Growth Graph'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'सप्ताह चुनकर शिशु का आकार व विकास देखें' : 'Tap milestone to view baby size comparison'}
            </div>
          </div>

          <span style={{
            background: 'var(--powder-blue)',
            color: 'var(--primary-blue)',
            padding: '3px 9px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 800
          }}>
            {language === 'hi' ? '12वां सप्ताह (वर्तमान)' : 'Week 12 (Active)'}
          </span>
        </div>

        {/* Trimester Indicator Strip */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <div style={{
            flex: 1,
            background: currentMilestone.trimester === 1 ? 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' : '#F1F5F9',
            border: currentMilestone.trimester === 1 ? '1.5px solid var(--primary-blue)' : '1px solid transparent',
            padding: '6px 8px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: currentMilestone.trimester === 1 ? 'var(--primary-blue)' : 'var(--text-secondary)' }}>
              {language === 'hi' ? 'तिमाही 1' : 'Trimester 1'}
            </div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
              W 1 - 12
            </div>
          </div>

          <div style={{
            flex: 1,
            background: currentMilestone.trimester === 2 ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' : '#F1F5F9',
            border: currentMilestone.trimester === 2 ? '1.5px solid #D97706' : '1px solid transparent',
            padding: '6px 8px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: currentMilestone.trimester === 2 ? '#D97706' : 'var(--text-secondary)' }}>
              {language === 'hi' ? 'तिमाही 2' : 'Trimester 2'}
            </div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
              W 13 - 27
            </div>
          </div>

          <div style={{
            flex: 1,
            background: currentMilestone.trimester === 3 ? 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)' : '#F1F5F9',
            border: currentMilestone.trimester === 3 ? '1.5px solid var(--warm-rose-dark)' : '1px solid transparent',
            padding: '6px 8px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: currentMilestone.trimester === 3 ? 'var(--warm-rose-dark)' : 'var(--text-secondary)' }}>
              {language === 'hi' ? 'तिमाही 3' : 'Trimester 3'}
            </div>
            <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
              W 28 - 40
            </div>
          </div>
        </div>

        {/* Visual Interactive Milestone Graph Points */}
        <div style={{
          position: 'relative',
          padding: '14px 6px 8px',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
          borderRadius: '18px',
          marginBottom: '12px'
        }}>
          {/* Subtle Curve Line */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '20px',
            right: '20px',
            height: '3px',
            background: 'linear-gradient(90deg, #CBD5E1 0%, var(--primary-blue) 35%, #CBD5E1 100%)',
            zIndex: 1
          }} />

          {/* Interactive Milestone Nodes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            {milestones.map((m) => {
              const isSelected = selectedWeek === m.week;
              return (
                <button
                  key={m.week}
                  onClick={() => setSelectedWeek(m.week)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <div style={{
                    width: isSelected ? '34px' : '26px',
                    height: isSelected ? '34px' : '26px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--primary-blue)' : m.isCurrent ? 'var(--warm-rose)' : 'white',
                    color: isSelected ? 'white' : 'var(--deep-navy)',
                    boxShadow: isSelected ? '0 0 14px rgba(65, 111, 152, 0.45)' : '0 2px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isSelected ? '16px' : '13px',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    {m.fruit}
                  </div>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: isSelected ? 800 : 600,
                    color: isSelected ? 'var(--primary-blue)' : 'var(--text-secondary)'
                  }}>
                    W{m.week}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Micro-Detail Card */}
        <div style={{
          background: selectedWeek === 12 ? 'var(--powder-blue-light)' : '#F8FAFC',
          borderRadius: '16px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: selectedWeek === 12 ? '4px solid var(--primary-blue)' : '4px solid #CBD5E1'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '18px' }}>{currentMilestone.fruit}</span>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? currentMilestone.sizeHi : currentMilestone.sizeEn}
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-primary)', marginTop: '2px' }}>
              {language === 'hi' ? currentMilestone.descHi : currentMilestone.descEn}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {currentMilestone.length}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {currentMilestone.weight}
            </div>
          </div>
        </div>

        {/* Conception & EDD Micro Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '12px', fontSize: '11.5px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{language === 'hi' ? 'गर्भधारण:' : 'Conception:'} </span>
            <strong style={{ color: 'var(--deep-navy)' }}>{language === 'hi' ? '10 अगस्त 2026' : '10 Aug 2026'}</strong>
          </div>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '12px', fontSize: '11.5px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{language === 'hi' ? 'प्रसव तिथि:' : 'Due Date:'} </span>
            <strong style={{ color: 'var(--warm-rose-dark)' }}>{language === 'hi' ? '17 मई 2027' : '17 May 2027'}</strong>
          </div>
        </div>
      </div>

      {/* 3. Interactive Calendar-Based Checkup Schedule (Expandable) */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)',
        cursor: 'pointer'
      }}
      onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: '#F0F7FD',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CalendarDays size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'चेकअप व अस्पताल कैलेंडर' : 'Checkup Schedule & Calendar'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {isCalendarExpanded 
                  ? (language === 'hi' ? 'संक्षिप्त करने के लिए टैप करें' : 'Tap to collapse')
                  : (language === 'hi' ? 'विस्तार से देखने के लिए टैप करें' : 'Tap to expand checkups & dates')}
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--powder-blue-light)',
            color: 'var(--primary-blue)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isCalendarExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {/* Compact Mini-Calendar Strip (Always Visible) */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Highlighted past checkup: 12 Oct */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckCircle2 size={13} />
              <span>12 Oct</span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'टीडी-1 टीका पूर्ण' : 'Td-1 Vaccine Done'}
            </div>
          </div>

          {/* Highlighted upcoming checkup: 5 Nov */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: 'var(--primary-blue)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px rgba(65, 111, 152, 0.3)'
            }}>
              <Clock size={13} />
              <span>5 Nov</span>
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary-blue)' }}>
              {language === 'hi' ? 'एएनसी-1 देय' : 'ANC-1 Due'}
            </div>
          </div>
        </div>

        {/* Smooth Expandable Section (Opens when user clicks) */}
        {isCalendarExpanded && (
          <div style={{
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #EDF2F7',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {/* Past Visit */}
            <div style={{
              background: 'var(--color-success-bg)',
              borderRadius: '14px',
              padding: '10px 12px',
              borderLeft: '3px solid var(--color-success)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--color-success)' }}>
                <span>{language === 'hi' ? 'पिछला चेकअप: 12 अक्टूबर 2026' : 'Last Checkup: 12 Oct 2026'}</span>
                <span>✅ {language === 'hi' ? 'सत्यापित' : 'Completed'}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--deep-navy)', marginTop: '2px', fontWeight: 700 }}>
                PHC रामपुर • डॉ. प्रिया सिंह
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'टीडी-1 टीका लगा, वजन 52 किग्रा, बीपी 118/76 सामान्य।' : 'Td-1 vaccination given, weight 52 kg, BP 118/76 normal.'}
              </div>
            </div>

            {/* Upcoming Visit */}
            <div style={{
              background: 'var(--powder-blue-light)',
              borderRadius: '14px',
              padding: '10px 12px',
              borderLeft: '3px solid var(--primary-blue)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--primary-blue)' }}>
                <span>{language === 'hi' ? 'आगामी चेकअप: 5 नवंबर 2026' : 'Upcoming Checkup: 5 Nov 2026'}</span>
                <span>⏰ 10:00 AM</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--deep-navy)', marginTop: '2px', fontWeight: 700 }}>
                {language === 'hi' ? 'प्रथम त्रैमासिक एएनसी जांच (ANC-1)' : 'First Trimester Comprehensive ANC (ANC-1)'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {language === 'hi' ? 'स्थान: PHC रामपुर। हीमोग्लोबिन खून जांच, पेशाब टेस्ट व वजन/बीपी पुनः जांच।' : 'Location: Rampur PHC. Hemoglobin test, urine routine, BP & weight.'}
              </div>
            </div>

            {/* ASHA Coordinator Call */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: '#FFF9F5',
              borderRadius: '12px',
              border: '1px solid rgba(217, 145, 165, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#EAF3FB'
                }}>
                  <img src="/assets/asha_didi_vector.jpg" alt="ASHA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {language === 'hi' ? 'सुनीता देवी (आशा दीदी)' : 'Sunita Devi (ASHA Didi)'}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                    {language === 'hi' ? 'अस्पताल ले जाने हेतु संपर्क' : 'Coordination for hospital visit'}
                  </div>
                </div>
              </div>

              <a
                href="tel:+919876543210"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--color-success)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '5px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <PhoneCall size={12} />
                <span>{language === 'hi' ? 'कॉल' : 'Call'}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 4. Family & Household Members (Real People Images Instead of Icons) */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'परिवार व देखभालकर्ता' : 'Family & Caregiver Circle'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'घर के सदस्य व आपातकालीन संपर्क' : 'Household members & emergency support'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Member 1: Husband (Real Photo Avatar) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: '#F8FAFC',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--powder-blue)',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <img 
                  src="/assets/husband_ramesh_avatar.jpg" 
                  alt="Ramesh Kumar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? 'रमेश कुमार (पति)' : 'Ramesh Kumar (Husband)'}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? '27 वर्ष • किसान • मुख्य आपात संपर्क' : '27 yrs • Primary Emergency Contact'}
                </div>
              </div>
            </div>

            <a
              href="tel:+919876543210"
              style={{
                background: 'var(--powder-blue)',
                color: 'var(--primary-blue)',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
              title="Call Husband"
            >
              <PhoneCall size={16} />
            </a>
          </div>

          {/* Member 2: Mother-in-Law (Real Photo Avatar) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: '#FFF5F0',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--soft-blush)',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <img 
                  src="/assets/family_support_mil.jpg" 
                  alt="Kanti Devi" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? 'कांति देवी (सास)' : 'Kanti Devi (Mother-in-law)'}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? '58 वर्ष • गृह पोषण व देखभाल सहायक' : '58 yrs • Primary Home Caregiver'}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo(14)}
              style={{
                background: 'var(--soft-blush)',
                border: 'none',
                color: 'var(--warm-rose-dark)',
                padding: '6px 12px',
                borderRadius: '14px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {language === 'hi' ? 'सास गाइड' : 'MIL Guide'}
            </button>
          </div>

          {/* Member 3: Children / Parity (Real Photo Avatar) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            background: '#F8FAFC',
            borderRadius: '16px'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #E2E8F0',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <img 
                src="/assets/mother_holding_newborn.jpg" 
                alt="First Pregnancy" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'पूर्व संतान स्थिति' : 'Children & Parity'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'पहला गर्भ (प्रथम प्रसव / कोई पूर्व बच्चा नहीं)' : 'First Pregnancy (Primigravida / 1st child)'}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Medical Profile & Clinical History (Clean & Structured) */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: '#F0FAF3',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={20} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'स्वास्थ्य इतिहास व बीमारी जानकारी' : 'Medical Profile & Clinical History'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'ब्लड ग्रुप, हीमोग्लोबिन, लक्षण व दवाएं' : 'Blood type, hemoglobin, vitals & allergies'}
            </div>
          </div>
        </div>

        {/* 4 Clean Clinical Chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px' }}>
          
          <div style={{ background: '#FFF5F5', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#C92A2A', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'ब्लड ग्रुप' : 'Blood Group'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#C92A2A', marginTop: '2px' }}>
              B Positive (B+)
            </div>
          </div>

          <div style={{ background: '#FFF9DB', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#E67700', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'हीमोग्लोबिन (Hb)' : 'Hemoglobin (Hb)'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#D9480F', marginTop: '2px' }}>
              10.2 g/dL
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'रक्तचाप (BP)' : 'Blood Pressure'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
              118/76 mmHg
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'वजन (Weight)' : 'Weight'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
              52.0 kg
            </div>
          </div>

        </div>

        {/* Minimal Clinical Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-primary)', padding: '8px 12px', background: '#F8FAFC', borderRadius: '12px' }}>
            <strong>{language === 'hi' ? 'पुरानी बीमारी:' : 'Chronic Conditions:'}</strong> {language === 'hi' ? 'कोई नहीं (मधुमेह, थायराइड या बीपी नहीं)' : 'None (No gestational diabetes or hypertension)'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-primary)', padding: '8px 12px', background: '#F8FAFC', borderRadius: '12px' }}>
            <strong>{language === 'hi' ? 'दवा व पूरक:' : 'Active Medicine:'}</strong> {language === 'hi' ? 'आयरन-फोलिक एसिड (IFA लाल गोली) + कैल्शियम' : 'Iron-Folic Acid (IFA red tablet) + Calcium'}
          </div>
        </div>
      </div>

      {/* 6. Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button
          onClick={() => navigateTo(17)}
          style={{
            background: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '14px',
            boxShadow: '0 4px 14px rgba(65, 111, 152, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <FileText size={22} color="var(--primary-blue)" />
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'हेल्थ रिकॉर्ड्स' : 'Health Records'}
          </span>
        </button>

        <button
          onClick={() => navigateTo(19)}
          style={{
            background: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '14px',
            boxShadow: '0 4px 14px rgba(65, 111, 152, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '20px' }}>🌿</span>
          <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
            {language === 'hi' ? 'घरेलू नुस्खे' : 'Home Remedies'}
          </span>
        </button>
      </div>

    </div>
  );
};
