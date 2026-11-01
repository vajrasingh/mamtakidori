import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  Utensils, 
  ShieldAlert, 
  CheckCircle2, 
  Droplet, 
  Apple, 
  Heart, 
  Sparkles,
  Info,
  ChevronRight,
  Pill
} from 'lucide-react';

export const Screen23NutritionDiet = () => {
  const { navigateTo, speakText, language } = useApp();
  const [activeTab, setActiveTab] = useState('thali'); // 'thali', 'foods', 'avoid'
  const [waterGlasses, setWaterGlasses] = useState(5);

  const handleAudioExplainer = () => {
    const text = language === 'hi'
      ? "पौष्टिक आहार और मातृत्व थाली। गर्भावस्था में रोज हरी पत्तेदार सब्जियां, दालें, दूध और मौसमी फल खाएं। गुड़ और चना खून बढ़ाने में मदद करते हैं। कच्चा पपीता और अनानास बिल्कुल न खाएं। आयरन की लाल गोली दोपहर में सादे पानी से लें, चाय या दूध के साथ न लें।"
      : "Maternal nutrition and diet guide. Eat colorful green vegetables, lentils, dairy, and seasonal fruits daily. Jaggery and roasted gram boost hemoglobin. Avoid raw papaya and pineapple. Take your iron pill with water, never with tea or milk.";
    speakText(text);
  };

  const handleAddWater = () => {
    if (waterGlasses < 10) {
      setWaterGlasses(prev => prev + 1);
      speakText(language === 'hi' ? `${waterGlasses + 1} गिलास पानी पूरा हुआ। खूब पानी पिएं!` : `${waterGlasses + 1} glasses of water completed.`);
    }
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* 1. Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigateTo(6)}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} color="var(--deep-navy)" />
          </button>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
              {language === 'hi' ? 'पौष्टिक आहार व थाली' : 'Nutrition & Diet Guide'}
            </h2>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'जच्चा-बच्चा पोषण व स्वास्थ्य' : 'Maternal nourishment & healthy baby growth'}
            </div>
          </div>
        </div>

        <button
          onClick={handleAudioExplainer}
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
          title="Listen Diet Audio"
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* 2. Visual Hero Card — The Maternal Thali */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: 'none'
      }}>
        <div style={{ width: '100%', height: '170px', position: 'relative', overflow: 'hidden' }}>
          <img 
            src="/assets/nutrition_maternal_thali.jpg" 
            alt="Maternal Thali" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(23, 54, 83, 0.85) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '14px 16px'
          }}>
            <div>
              <span style={{
                background: 'var(--warm-rose)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '10.5px',
                fontWeight: 800
              }}>
                {language === 'hi' ? 'सतरंगी संतुलित थाली' : 'Balanced Maternal Plate'}
              </span>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>
                {language === 'hi' ? 'माँ और गर्भस्थ शिशु का संपूर्ण पोषण' : 'Essential Nutrients for Mother & Child'}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Food Group Nutrients Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '14px 16px', background: '#F8FAFC' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px' }}>🥬</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'आयरन' : 'Iron'}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>पालक, मेथी</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px' }}>🫘</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'प्रोटीन' : 'Protein'}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>दाल, चना, सोया</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px' }}>🥛</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'कैल्शियम' : 'Calcium'}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>दूध, दही, पनीर</div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Category Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '16px' }}>
        {[
          { key: 'thali', hi: '🥗 क्या खाएं', en: '🥗 What to Eat' },
          { key: 'avoid', hi: '🚫 क्या न खाएं', en: '🚫 Avoid' },
          { key: 'routine', hi: '⏰ नियम व पानी', en: '⏰ Routine' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              background: activeTab === tab.key ? 'white' : 'transparent',
              color: activeTab === tab.key ? 'var(--deep-navy)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 4px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: activeTab === tab.key ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {language === 'hi' ? tab.hi : tab.en}
          </button>
        ))}
      </div>

      {/* Tab 1: What to Eat (Superfoods) */}
      {activeTab === 'thali' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              icon: '🥬',
              titleHi: 'हरी पत्तेदार सब्जियां (पालक, मेथी, बथुआ)',
              titleEn: 'Green Leafy Vegetables (Spinach, Fenugreek)',
              descHi: 'खून बढ़ाता है और बच्चे के मस्तिष्क के विकास में सहायक है।',
              descEn: 'Rich in Iron & Folate, vital for oxygen transport to fetus.'
            },
            {
              icon: '🥜',
              titleHi: 'गुड़ और भुना चना (आयरन बूस्टर)',
              titleEn: 'Jaggery & Roasted Gram (Iron Booster)',
              descHi: 'एनीमिया रोकने का सबसे सस्ता और सुरक्षित घरेलू उपाय।',
              descEn: 'Natural iron booster preventing maternal anemia.'
            },
            {
              icon: '🥛',
              titleHi: 'दूध, छाछ व दही',
              titleEn: 'Milk, Buttermilk & Curd',
              descHi: 'शिशु की हड्डियों और दांतों के मजबूत विकास के लिए कैल्शियम।',
              descEn: 'Supplies essential calcium for baby\'s bone and tooth buds.'
            },
            {
              icon: '🍊',
              titleHi: 'मौसमी खट्टे फल (आंवला, अमरूद, संतरा)',
              titleEn: 'Citrus Fruits (Amla, Guava, Orange)',
              descHi: 'विटामिन-सी से भरपूर, जो भोजन से आयरन सोखने में मदद करता है।',
              descEn: 'Vitamin C helps the body absorb iron effectively.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '18px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 14px rgba(65, 111, 152, 0.06)'
            }}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {language === 'hi' ? item.descHi : item.descEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: What to Avoid (Caution & Danger) */}
      {activeTab === 'avoid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              icon: '🚫',
              titleHi: 'कच्चा या अधपका पपीता',
              titleEn: 'Raw or Semi-ripe Papaya',
              descHi: 'इसमें लेटेक्स होता है जिससे गर्भाशय संकुचन का खतरा होता है।',
              descEn: 'Contains latex enzymes that can trigger uterine contractions.'
            },
            {
              icon: '🍍',
              titleHi: 'अनानास (पाइनएप्पल)',
              titleEn: 'Pineapple',
              descHi: 'इसमें ब्रोमेलिन होता है जो गर्भावस्था के शुरुआती दिनों में हानिकारक है।',
              descEn: 'Contains bromelain which may soften cervix in early pregnancy.'
            },
            {
              icon: '☕',
              titleHi: 'ज्यादा चाय या कॉफ़ी',
              titleEn: 'Excess Tea or Coffee',
              descHi: 'चाय-कॉफ़ी शरीर में आयरन सोखने से रोकती है। भोजन के साथ न पिएं।',
              descEn: 'Caffeine inhibits iron absorption. Never drink right after meals.'
            },
            {
              icon: '🥣',
              titleHi: 'बासी भोजन या बाजार का खुला खाना',
              titleEn: 'Stale Food or Uncovered Street Food',
              descHi: 'पेट के संक्रमण और फूड पॉइजनिंग का गंभीर खतरा हो सकता है।',
              descEn: 'High risk of stomach infection and food poisoning.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: '#FFF5F5',
              border: '1px solid #FFE3E3',
              borderRadius: '18px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#C92A2A' }}>
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {language === 'hi' ? item.descHi : item.descEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Daily Routine & Hydration */}
      {activeTab === 'routine' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Interactive Water Tracker */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(65, 111, 152, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplet size={20} color="var(--primary-blue)" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {language === 'hi' ? 'दैनिक पानी ट्रैकर' : 'Daily Hydration Tracker'}
                </span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-blue)' }}>
                {waterGlasses} / 10 {language === 'hi' ? 'गिलास' : 'Glasses'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: '24px',
                    height: '32px',
                    borderRadius: '8px',
                    background: i < waterGlasses ? 'var(--primary-blue)' : '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  {i < waterGlasses ? '💧' : ''}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddWater}
              style={{
                width: '100%',
                background: 'var(--powder-blue)',
                color: 'var(--primary-blue)',
                border: 'none',
                padding: '8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              + {language === 'hi' ? '1 गिलास पानी दर्ज करें' : 'Log 1 Glass of Water'}
            </button>
          </div>

          {/* Medicine Timing Rule */}
          <div style={{
            background: '#FFF9DB',
            border: '1px solid #FFF3BF',
            borderRadius: '18px',
            padding: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Pill size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#B45309' }}>
                {language === 'hi' ? 'दवा लेने का सही समय' : 'Medicine Timing Rule'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                {language === 'hi'
                  ? 'आयरन की लाल गोली रोज दोपहर भोजन के 30 मिनट बाद पानी से लें। कैल्शियम रात में सोने से पहले लें। दोनों गोलियां कभी साथ न लें।'
                  : 'Take Iron pill 30 mins after lunch with water. Take Calcium at bedtime. Never take both together.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Ask Mamta AI or Family Remedy CTA */}
      <div 
        onClick={() => navigateTo(19)}
        style={{
          background: 'linear-gradient(135deg, #173653 0%, #22517C 100%)',
          borderRadius: '20px',
          padding: '14px 16px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(23, 54, 83, 0.16)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} color="#FFE2EA" />
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800 }}>
              {language === 'hi' ? 'सास-बहू घरेलू नुस्खा सत्यापन' : 'Ask Mamta AI about Food Safety'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)' }}>
              {language === 'hi' ? 'अजवाइन, केसर दूध या जड़ी-बूटी की जांच कराएं' : 'Verify traditional home recipes & herbs'}
            </div>
          </div>
        </div>
        <ChevronRight size={18} color="white" />
      </div>

    </div>
  );
};
