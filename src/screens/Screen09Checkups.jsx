import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  TestTube, 
  Pill, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  AlertTriangle 
} from 'lucide-react';

export const Screen09Checkups = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [expandedId, setExpandedId] = useState(1);

  const checkupItems = [
    {
      id: 1,
      num: 1,
      icon: <Calendar size={22} color="var(--primary-blue)" />,
      title: t.screen09.item1Title,
      date: t.screen09.item1Date,
      desc: t.screen09.item1Desc,
      status: t.screen09.item1Status,
      statusType: 'warning',
      spoken: language === 'hi' 
        ? "प्रथम त्रैमासिक चेकअप 5 नवंबर को देय है। इसमें वजन, बीपी, खून और पेशाब की जरूरी जांच होगी।"
        : "Your first ANC checkup is due on 5 November. It includes weight, blood pressure, hemoglobin, and urine screening."
    },
    {
      id: 2,
      num: 2,
      icon: <TestTube size={22} color="var(--color-success)" />,
      title: t.screen09.item2Title,
      date: t.screen09.item2Date,
      desc: t.screen09.item2Desc,
      status: t.screen09.item2Status,
      statusType: 'success',
      spoken: language === 'hi'
        ? "टीडी का पहला टीका 12 अक्टूबर को सफलता पूर्वक लग चुका है। दूसरा टीका 4 सप्ताह बाद लगेगा।"
        : "First Tetanus injection was completed on 12 October. Second dose will be due in 4 weeks."
    },
    {
      id: 3,
      num: 3,
      icon: <Pill size={22} color="var(--warm-rose-dark)" />,
      title: t.screen09.item3Title,
      date: language === 'hi' ? 'रोजाना 1 लाल गोली' : '1 red tablet daily',
      desc: t.screen09.item3Desc,
      status: t.screen09.item3Status,
      statusType: 'blue',
      spoken: language === 'hi'
        ? "आयरन और फोलिक एसिड की लाल गोली रोज दोपहर खाने के बाद पानी से लें। चाय या दूध के साथ कभी न लें।"
        : "Take your red Iron & Folic Acid tablet daily after lunch with water. Never take it with milk or tea."
    },
    {
      id: 4,
      num: 4,
      icon: <UserCheck size={22} color="var(--primary-blue)" />,
      title: t.screen09.item4Title,
      date: language === 'hi' ? 'सप्ताह 18-20 में' : 'At week 18-20',
      desc: t.screen09.item4Desc,
      status: t.screen09.item4Status,
      statusType: 'blue',
      spoken: language === 'hi'
        ? "अल्ट्रासाउंड जांच 18वें सप्ताह में बच्चे के अंगों के संपूर्ण विकास को देखने के लिए की जाएगी।"
        : "Ultrasound anomaly scan will be conducted at 18 weeks to observe healthy organ growth."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen09.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen09.subtitle}
        </p>
      </div>

      {/* Checklist of Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {checkupItems.map(item => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="m-card"
              style={{
                padding: '16px',
                marginBottom: 0,
                borderLeft: item.statusType === 'warning' ? '4px solid var(--color-warning)' :
                           item.statusType === 'success' ? '4px solid var(--color-success)' :
                           '4px solid var(--primary-blue)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => toggleExpand(item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--powder-blue)',
                    color: 'var(--deep-navy)',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.num}
                  </div>

                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '3px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--warm-rose-dark)', marginBottom: '4px' }}>
                      {item.date}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`m-badge m-badge-${item.statusType}`} style={{ fontSize: '11px' }}>
                    {item.status}
                  </span>
                  {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(65, 111, 152, 0.1)', animation: 'fadeIn 0.2s ease-out' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(item.spoken);
                      }}
                      className="btn-listen"
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      <Volume2 size={15} />
                      <span>{t.app.listen}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(13); // Go to Reminders
                      }}
                      className="btn-secondary"
                      style={{ width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                    >
                      <Bell size={14} />
                      <span>{language === 'hi' ? 'याद दिलाएं' : 'Remind Me'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Symptoms / Emergency Help Prompt */}
      <div 
        onClick={() => navigateTo(12)}
        style={{
          marginTop: '16px',
          background: 'var(--soft-blush)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertTriangle size={20} color="var(--warm-rose-dark)" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'अगर कोई परेशानी या दर्द हो?' : 'Feeling any discomfort or pain?'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'लक्षण जांचें या तुरंत मदद लें' : 'Check symptoms or call emergency'}
            </div>
          </div>
        </div>
        <ChevronDown size={18} color="var(--warm-rose-dark)" style={{ transform: 'rotate(-90deg)' }} />
      </div>
    </div>
  );
};
