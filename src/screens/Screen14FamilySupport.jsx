import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Volume2, Shield, Utensils, Sparkles, CheckCircle2, ChevronRight, HelpCircle, Moon } from 'lucide-react';

export const Screen14FamilySupport = () => {
  const { speakText, t, language, navigateTo } = useApp();
  const [activeLesson, setActiveLesson] = useState(null);

  const lessons = [
    {
      id: 1,
      title: t.screen14.card1Title,
      desc: t.screen14.card1Desc,
      icon: <Utensils size={22} color="var(--primary-blue)" />,
      audio: language === 'hi' 
        ? "बहू को दिन में थोड़ा-थोड़ा करके चार बार पौष्टिक खाना दें। थाली में हरी पालक, दाल, रोटी, गुड़ और मौसमी फल जरूर शामिल करें। इससे माँ और बच्चे दोनों में खून की कमी नहीं होती।" 
        : "Provide nourishing small meals four times a day. Include spinach, lentils, rotis, curd, and seasonal fruits to prevent maternal anemia."
    },
    {
      id: 2,
      title: t.screen14.card2Title,
      desc: t.screen14.card2Desc,
      icon: <HelpCircle size={22} color="var(--color-warning)" />,
      audio: language === 'hi'
        ? "गुनगुना हल्दी वाला दूध और सौंफ का पानी पीना सुरक्षित है। लेकिन बिना डॉक्टर की सलाह के कोई भी अनजान जड़ी-बूटी या कच्चा पपीता न दें। किसी भी शंका में आशा दीदी से पूछें।"
        : "Warm turmeric milk is safe and soothing. Avoid raw papaya and unverified herbs. In case of doubt, consult your ASHA worker."
    },
    {
      id: 3,
      title: t.screen14.card3Title,
      desc: t.screen14.card3Desc,
      icon: <Moon size={22} color="var(--warm-rose-dark)" />,
      audio: language === 'hi'
        ? "गर्भवती बहू को भारी पानी की बाल्टी उठाने या ज्यादा देर झुककर झाड़ू-पोंछा करने से बचाएं। दोपहर में कम से कम 2 घंटे का बायीं करवट का आराम जरूर दें।"
        : "Relieve her from heavy lifting like water buckets or continuous bending. Ensure she gets at least 2 hours of quiet rest on her left side."
    }
  ];

  const handlePlayLesson = (item) => {
    setActiveLesson(item.id);
    speakText(item.audio);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--soft-blush)',
          color: 'var(--warm-rose-dark)',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '13px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          <Heart size={14} fill="var(--warm-rose)" />
          <span>{language === 'hi' ? 'सास और परिवार का प्यार' : 'Mother-in-Law & Family Care'}</span>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen14.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen14.subtitle}
        </p>
      </div>

      {/* Hero Illustration of Mother-in-Law & Pregnant Woman Bonding (Uncropped & Enlarged) */}
      <div style={{
        width: '100%',
        height: '230px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.1)',
        marginBottom: '16px',
        border: 'none',
        background: 'radial-gradient(circle at center, #FFF4EE 0%, #FFFFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px'
      }}>
        <img 
          src="/assets/family_support_mil.jpg" 
          alt="Mother-in-law and daughter-in-law" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(23, 54, 83, 0.14))'
          }}
        />
      </div>

      {/* Listen Together Hero Button */}
      <div 
        onClick={() => speakText(language === 'hi' 
          ? "नमस्ते माताजी! गर्भावस्था में बहू और आने वाले बच्चे की देखभाल के लिए खान-पान, आराम और समय पर चेकअप सबसे महत्वपूर्ण है।" 
          : "Welcome! Caring for your daughter-in-law with nutritious meals, rest, and regular checkups ensures a healthy baby."
        )}
        className="m-card m-card-blush"
        style={{
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--warm-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Volume2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'सास-बहू मिलकर सुनें' : 'Listen Together with Mamta'}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'ममता की विशेष स्वास्थ्य सलाह' : 'Special guidance for family'}
            </div>
          </div>
        </div>
        <span className="btn-listen" style={{ padding: '6px 12px', fontSize: '13px' }}>
          {t.app.listen}
        </span>
      </div>

      {/* Shared Educational Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {lessons.map(item => {
          const isPlaying = activeLesson === item.id;
          return (
            <div
              key={item.id}
              className="m-card"
              style={{
                padding: '16px',
                marginBottom: 0,
                border: isPlaying ? '1.5px solid var(--warm-rose)' : '1px solid rgba(65, 111, 152, 0.1)',
                background: isPlaying ? 'var(--soft-blush)' : 'var(--surface-white)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--powder-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {item.title}
                  </h4>
                </div>

                <button
                  onClick={() => handlePlayLesson(item)}
                  className={`btn-listen ${isPlaying ? 'is-playing' : ''}`}
                  style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                  <Volume2 size={14} />
                  <span>{isPlaying ? t.app.playing : t.app.listen}</span>
                </button>
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45, paddingLeft: '46px' }}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Screen 19 Entry: Family Remedy AI & ASHA Verification Flow */}
      <div 
        onClick={() => navigateTo(19)}
        className="m-card"
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--powder-blue-light) 100%)',
          border: '2px solid var(--primary-blue)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 6px 18px rgba(65, 111, 152, 0.16)',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="m-badge m-badge-blue" style={{ fontSize: '11px', padding: '2px 8px' }}>
                🌿 {language === 'hi' ? 'घरेलू नुस्खा एआई सत्यापन' : 'Family Remedy AI Flow'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>
                ✅ {language === 'hi' ? 'आशा सत्यापित' : 'ASHA Verified'}
              </span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
              {language === 'hi' ? 'सास-बहू घरेलू नुस्खा एआई से पूछें' : 'Verify Traditional Remedy with Mamta AI'}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
              {language === 'hi' 
                ? 'अजवाइन का पानी, कच्चा पपीता या काढ़ा सुरक्षित है या नहीं? कैमरा या आवाज़ से पूछें और सुनीता दीदी से जांच कराएं।' 
                : 'Is ajwain water, raw papaya, or kadha safe? Scan or speak to verify with Mamta AI and ASHA worker.'}
            </p>
          </div>

          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'var(--primary-blue)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ChevronRight size={22} />
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div style={{
        background: 'rgba(65, 111, 152, 0.05)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
      }}>
        <Shield size={18} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {t.screen14.privacyAssurance}
        </p>
      </div>
    </div>
  );
};
