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
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  FileText, 
  AlertCircle,
  MapPin,
  Baby,
  Pill,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Edit3
} from 'lucide-react';

export const Screen21Profile = () => {
  const { userProfile, navigateTo, speakText, stopAudio, isSpeaking, language, setLanguage, role, setRole } = useApp();
  const [isPlayingBio, setIsPlayingBio] = useState(false);

  const handleListenBio = () => {
    if (isPlayingBio || isSpeaking) {
      stopAudio();
      setIsPlayingBio(false);
      return;
    }
    setIsPlayingBio(true);
    const speech = language === 'hi' 
      ? `नमस्ते रानी जी। आपकी आयु 24 वर्ष है। आप 12वें सप्ताह के गर्भ में हैं और प्रसव की संभावित तारीख 17 मई 2027 है। आपका पिछला चेकअप 12 अक्टूबर को हुआ था जिसमें टीडी-1 टीका लगा और बीपी सामान्य था। अगला चेकअप 5 नवंबर को प्राथमिक स्वास्थ्य केंद्र में है। परिवार में पति रमेश कुमार और सास कांति देवी हैं। आपका ब्लड ग्रुप बी पॉजिटिव है और हीमोग्लोबिन 10.2 ग्राम है।`
      : `Hello Rani Devi. You are 24 years old and currently in week 12 of pregnancy. Your estimated due date is 17 May 2027. Your last checkup was on 12 October with Td vaccine completed and normal blood pressure. Next checkup is on 5 November at Rampur PHC. Family includes husband Ramesh Kumar and mother-in-law Kanti Devi. Your blood group is B positive with hemoglobin at 10.2 grams.`;
    speakText(speech);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Profile Header Hero Card */}
      <div style={{
        background: 'linear-gradient(135deg, #173653 0%, #2A5A84 100%)',
        borderRadius: '26px',
        padding: '20px',
        color: 'white',
        boxShadow: '0 8px 30px rgba(23, 54, 83, 0.22)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative backdrop glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 145, 165, 0.35) 0%, rgba(217, 145, 165, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.16)',
            backdropFilter: 'blur(8px)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.4px',
            color: '#FFE2EA'
          }}>
            <Sparkles size={13} color="#FFE2EA" />
            <span>{language === 'hi' ? 'मातृ स्वास्थ्य प्रोफाइल' : 'Maternal Health Profile'}</span>
          </div>

          <button
            onClick={handleListenBio}
            style={{
              background: isPlayingBio ? 'var(--warm-rose)' : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '20px',
              padding: '5px 12px',
              color: 'white',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {isPlayingBio ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isPlayingBio ? (language === 'en' ? 'Stop' : 'रोकें') : (language === 'en' ? 'Listen' : 'प्रोफ़ाइल सुनें')}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Large Uncropped Avatar Frame */}
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '3px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
            background: '#FFF4F0',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}>
            <img 
              src="/assets/maternal_joy_hero.jpg" 
              alt="Rani Devi" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                {language === 'hi' ? 'रानी देवी' : 'Rani Devi'}
              </h2>
              <span style={{
                background: 'var(--warm-rose)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                {language === 'hi' ? '24 वर्ष' : '24 Years'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '4px' }}>
              <MapPin size={13} color="#FFE2EA" />
              <span>{language === 'hi' ? 'ग्राम रामपुर, ब्लॉक शिवगढ़' : 'Rampur Village, Shivgarh Block'}</span>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.14)',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                ABHA: 91-8492-3829-1029
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.14)',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                RCH: UP-2026-48912
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pregnancy & Conception Details Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--soft-blush)',
              color: 'var(--warm-rose-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Baby size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'गर्भधारण व गर्भावस्था स्थिति' : 'Pregnancy & Gestation Timeline'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'वर्तमान प्रगति व अनुमानित प्रसव तारीख' : 'Current milestone & delivery forecast'}
              </div>
            </div>
          </div>

          <span style={{
            background: 'var(--powder-blue)',
            color: 'var(--primary-blue)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 800
          }}>
            {language === 'hi' ? '12वां हफ्ता' : 'Week 12'}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span>{language === 'hi' ? 'गर्भधारण (10 अगस्त 2026)' : 'Conceived (10 Aug 2026)'}</span>
            <span>{language === 'hi' ? 'प्रसव अनुमान (17 मई 2027)' : 'Due Date (17 May 2027)'}</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(65, 111, 152, 0.1)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, var(--warm-rose), var(--primary-blue))', borderRadius: '6px' }} />
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary-blue)', marginTop: '4px', textAlign: 'right' }}>
            {language === 'hi' ? '30% पूर्ण • प्रथम त्रैमासिक' : '30% Completed • 1st Trimester'}
          </div>
        </div>

        {/* 2-Column Key Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'अंतिम माहवारी (LMP)' : 'Last Period (LMP)'}
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
              {language === 'hi' ? '10 अगस्त 2026' : '10 August 2026'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? '~12 सप्ताह पूर्व' : '~12 weeks ago'}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'संभावित प्रसव तारीख' : 'Estimated Due Date'}
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--warm-rose-dark)', marginTop: '2px' }}>
              {language === 'hi' ? '17 मई 2027' : '17 May 2027'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? '28 सप्ताह शेष' : '28 weeks remaining'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Checkup History: Last & Upcoming Visits */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: '#F0F7FD',
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'अस्पताल चेकअप व जांच' : 'Checkup History & Schedule'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'पिछली जांच व अगला देय चेकअप' : 'Past visits and upcoming ANC date'}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo(17)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-blue)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Last Checkup Completed */}
        <div style={{
          background: 'var(--color-success-bg)',
          borderRadius: '16px',
          padding: '12px 14px',
          marginBottom: '10px',
          borderLeft: '4px solid var(--color-success)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-success)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-success)' }}>
                {language === 'hi' ? 'पिछला चेकअप (पूर्ण)' : 'Last Checkup (Completed)'}
              </span>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {language === 'hi' ? '12 अक्टूबर 2026' : '12 Oct 2026'}
            </span>
          </div>

          <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '4px' }}>
            {language === 'hi' ? 'PHC रामपुर • डॉ. प्रिया सिंह' : 'Rampur PHC • Dr. Priya Singh'}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.35 }}>
            {language === 'hi' 
              ? 'टीडी-1 का टीका लगा। वजन 52 किग्रा, ब्लड प्रेशर 118/76 mmHg सामान्य पाया गया।'
              : 'Td-1 vaccination administered. Weight 52 kg, BP 118/76 mmHg normal.'}
          </div>
        </div>

        {/* Upcoming Checkup */}
        <div style={{
          background: 'var(--powder-blue-light)',
          borderRadius: '16px',
          padding: '12px 14px',
          borderLeft: '4px solid var(--primary-blue)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--primary-blue)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-blue)' }}>
                {language === 'hi' ? 'आगामी चेकअप (देय)' : 'Upcoming Checkup (Due)'}
              </span>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--warm-rose-dark)' }}>
              {language === 'hi' ? '5 नवंबर 2026' : '5 Nov 2026'}
            </span>
          </div>

          <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '4px' }}>
            {language === 'hi' ? 'प्रथम त्रैमासिक व्यापक एएनसी जांच (ANC-1)' : 'First Trimester Comprehensive ANC (ANC-1)'}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.35 }}>
            {language === 'hi'
              ? 'स्थान: PHC रामपुर। हीमोग्लोबिन खून जांच, पेशाब परीक्षण व वजन/बीपी पुनः जांच।'
              : 'Location: Rampur PHC. Hemoglobin test, urine analysis, and vitals check.'}
          </div>
        </div>

        {/* Assigned ASHA Worker Contact Pill */}
        <div style={{
          marginTop: '12px',
          background: '#FFF9F5',
          borderRadius: '16px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(217, 145, 165, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#EAF3FB',
              flexShrink: 0
            }}>
              <img src="/assets/asha_didi_vector.jpg" alt="ASHA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'आपकी आशा कार्यकर्ता' : 'Assigned ASHA Worker'}
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'सुनीता देवी (आशा दीदी)' : 'Sunita Devi (ASHA Didi)'}
              </div>
            </div>
          </div>

          <a
            href="tel:+919876543210"
            style={{
              background: 'var(--color-success)',
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '14px',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <PhoneCall size={13} />
            <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
          </a>
        </div>
      </div>

      {/* 4. Family & Household Details Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: '#FFF5F0',
            color: 'var(--warm-rose-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'पारिवारिक व घरेलू जानकारी' : 'Family & Household Members'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'सहयोगी परिजन व आपातकालीन संपर्क' : 'Caregivers and emergency contacts'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Member 1: Husband */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: '#F8FAFC',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--powder-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                👨
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? 'रमेश कुमार (पति)' : 'Ramesh Kumar (Husband)'}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? '27 वर्ष • किसान • मुख्य आपातकालीन संपर्क' : '27 yrs • Primary Emergency Contact'}
                </div>
              </div>
            </div>

            <a
              href="tel:+919876543210"
              style={{
                background: 'var(--powder-blue)',
                color: 'var(--primary-blue)',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
              title="Call Husband"
            >
              <PhoneCall size={15} />
            </a>
          </div>

          {/* Member 2: Mother-in-Law (SAS) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: '#FFF5F0',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--soft-blush)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                👵
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? 'कांति देवी (सास)' : 'Kanti Devi (Mother-in-law)'}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? '58 वर्ष • घरेलू देखभालकर्ता व पोषण सहायक' : '58 yrs • Primary Home Caregiver'}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo(14)}
              style={{
                background: 'var(--soft-blush)',
                border: 'none',
                color: 'var(--warm-rose-dark)',
                padding: '5px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {language === 'hi' ? 'सास गाइड' : 'MIL Guide'}
            </button>
          </div>

          {/* Member 3: Previous Children / Parity */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            background: '#F8FAFC',
            borderRadius: '16px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              👶
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'पूर्व संतान' : 'Previous Children'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'पहला गर्भ (प्रथम प्रसव / कोई अन्य बच्चा नहीं)' : 'First Pregnancy (Primigravida / No previous child)'}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Health Parameters & Disease History Card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: 'none'
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

        {/* Key Clinical Badges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px' }}>
          
          <div style={{ background: '#FFF5F5', padding: '10px 12px', borderRadius: '16px', border: '1px solid #FFE3E3' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#C92A2A', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'ब्लड ग्रुप' : 'Blood Group'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#C92A2A', marginTop: '2px' }}>
              B Positive (B+)
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? 'सामान्य आरएच पॉजिटिव' : 'Rh Positive (Normal)'}
            </div>
          </div>

          <div style={{ background: '#FFF9DB', padding: '10px 12px', borderRadius: '16px', border: '1px solid #FFF3BF' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#E67700', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'हीमोग्लोबिन (Hb)' : 'Hemoglobin (Hb)'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#D9480F', marginTop: '2px' }}>
              10.2 g/dL
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? 'हल्का एनीमिया (आयरन चालू)' : 'Mild Anemia (IFA active)'}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'रक्तचाप (BP)' : 'Blood Pressure'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
              118/76 mmHg
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--color-success)', fontWeight: 700 }}>
              {language === 'hi' ? '✅ पूर्णतः सामान्य' : '✅ Normal Range'}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {language === 'hi' ? 'वजन (Weight)' : 'Weight'}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
              52.0 kg
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? '+1.5 kg वृद्धि' : '+1.5 kg gain'}
            </div>
          </div>

        </div>

        {/* Detailed Medical Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#F8FAFC', borderRadius: '12px' }}>
            <ShieldAlert size={16} color="var(--color-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'पुरानी बीमारी / क्रॉनिक रोग' : 'Chronic Medical Conditions'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'कोई नहीं — मधुमेह, थायराइड या हाई बीपी की कोई शिकायत नहीं है।' : 'None — No gestational diabetes, hypertension, or thyroid illness.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#F8FAFC', borderRadius: '12px' }}>
            <AlertCircle size={16} color="var(--primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'ज्ञात एलर्जी' : 'Known Allergies'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'कोई ज्ञात दवा या खाद्य एलर्जी नहीं है।' : 'No known drug, food, or seasonal allergies.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#FFF5F0', borderRadius: '12px' }}>
            <Pill size={16} color="var(--warm-rose-dark)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? 'वर्तमान दवाएं व पूरक आहार' : 'Active Prescriptions & Supplements'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? 'आयरन-फोलिक एसिड (लाल गोली) रोज दोपहर खाने के बाद 1 गोली + कैल्शियम गोली।' : 'Iron & Folic Acid (red tablet) daily after lunch + Calcium tablet.'}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Navigation Shortcuts */}
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
