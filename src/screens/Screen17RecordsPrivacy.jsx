import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Users, 
  UserCheck, 
  ExternalLink, 
  CheckCircle2, 
  Trash2, 
  PlusCircle, 
  Eye,
  Calendar,
  TestTube,
  Pill,
  Clock,
  Volume2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Activity,
  Heart
} from 'lucide-react';

export const Screen17RecordsPrivacy = () => {
  const { consent, setConsent, healthRecords, navigateTo, speakText, t, language } = useApp();
  const [activeTab, setActiveTab] = useState('care'); // 'care', 'records', 'privacy'
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [expandedCheckupId, setExpandedCheckupId] = useState(1);

  // My Care / ANC Checkup items (Merged into Health Record)
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

  const toggleCheckupExpand = (id) => {
    setExpandedCheckupId(prev => prev === id ? null : id);
  };

  const toggleMilSharing = () => {
    setConsent(prev => ({ ...prev, familySharing: !prev.familySharing }));
    speakText(language === 'hi' 
      ? "सास के साथ पोषण संदेश साझा करने की अनुमति अपडेट कर दी गई है।" 
      : "Mother-in-law sharing preferences updated."
    );
  };

  const toggleAshaSharing = () => {
    setConsent(prev => ({ ...prev, ashaSharing: !prev.ashaSharing }));
    speakText(language === 'hi' 
      ? "आशा कार्यकर्ता के साथ जांच तारीख साझा करने की अनुमति अपडेट कर दी गई है।" 
      : "ASHA worker coordination preferences updated."
    );
  };

  const handleRevokeAll = () => {
    setConsent(prev => ({ ...prev, familySharing: false, ashaSharing: false }));
    speakText(language === 'hi' 
      ? "सभी साझाकरण अनुमतियाँ तुरंत रद्द कर दी गई हैं। अब आपका डेटा पूरी तरह निजी है।" 
      : "All external sharing has been revoked. Your data is strictly private."
    );
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 32px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {language === 'hi' ? 'स्वास्थ्य रिकॉर्ड व मातृ देखभाल' : 'Health Records & Maternal Care'}
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          {language === 'hi' ? 'एएनसी चेकअप, टीका, पर्चियां और रिपोर्ट एक ही सुरक्षित जगह पर' : 'ANC checkups, vaccines, prescriptions & lab reports all in one place'}
        </p>
      </div>

      {/* Segmented Switch Tabs (Merged My Care + Records + Privacy) */}
      <div style={{
        display: 'flex',
        background: '#EDF2F7',
        borderRadius: '18px',
        padding: '4px',
        marginBottom: '16px',
        gap: '4px'
      }}>
        <button
          onClick={() => setActiveTab('care')}
          style={{
            flex: 1,
            padding: '10px 4px',
            border: 'none',
            borderRadius: '14px',
            background: activeTab === 'care' ? 'white' : 'transparent',
            color: activeTab === 'care' ? 'var(--deep-navy)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'care' ? 800 : 600,
            fontSize: '12px',
            boxShadow: activeTab === 'care' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
        >
          <span>🩺</span>
          <span>{language === 'hi' ? 'चेकअप व टीका' : 'ANC Care'}</span>
        </button>

        <button
          onClick={() => setActiveTab('records')}
          style={{
            flex: 1,
            padding: '10px 4px',
            border: 'none',
            borderRadius: '14px',
            background: activeTab === 'records' ? 'white' : 'transparent',
            color: activeTab === 'records' ? 'var(--deep-navy)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'records' ? 800 : 600,
            fontSize: '12px',
            boxShadow: activeTab === 'records' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
        >
          <span>📄</span>
          <span>{language === 'hi' ? 'पर्चियां व रिपोर्ट' : 'Reports'}</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          style={{
            flex: 1,
            padding: '10px 4px',
            border: 'none',
            borderRadius: '14px',
            background: activeTab === 'privacy' ? 'white' : 'transparent',
            color: activeTab === 'privacy' ? 'var(--deep-navy)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'privacy' ? 800 : 600,
            fontSize: '12px',
            boxShadow: activeTab === 'privacy' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
        >
          <span>🔒</span>
          <span>{language === 'hi' ? 'प्राइवेसी' : 'Privacy'}</span>
        </button>
      </div>

      {/* TAB 1: MY CARE & ANC CHECKUPS */}
      {activeTab === 'care' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Quick Summary Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1A4D7C 0%, #2A5A84 100%)',
            borderRadius: '20px',
            padding: '14px 16px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 6px 20px rgba(23, 54, 83, 0.16)'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#FFE2EA', fontWeight: 700, textTransform: 'uppercase' }}>
                {language === 'hi' ? 'अगला देय चेकअप' : 'Next Scheduled Checkup'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, marginTop: '2px' }}>
                {language === 'hi' ? '5 नवंबर • PHC रामपुर' : '5 Nov • Rampur PHC'}
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                {language === 'hi' ? 'प्रथम त्रैमासिक व्यापक जांच व हीमोग्लोबिन' : 'ANC-1 Vitals & Hemoglobin blood test'}
              </div>
            </div>

            <button
              onClick={() => speakText(language === 'hi' ? "5 नवंबर को आपकी पहली व्यापक एएनसी जांच है। कृपया सुबह 10 बजे रामपुर पीएचसी पहुंचें।" : "Your first comprehensive ANC checkup is due on 5 November at Rampur PHC.")}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Listen"
            >
              <Volume2 size={18} />
            </button>
          </div>

          {/* Checklist Accordion */}
          {checkupItems.map(item => {
            const isExpanded = expandedCheckupId === item.id;
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
                  transition: 'all 0.2s',
                  borderRadius: '20px'
                }}
                onClick={() => toggleCheckupExpand(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: item.statusType === 'warning' ? 'var(--color-warning-bg)' :
                                 item.statusType === 'success' ? 'var(--color-success-bg)' :
                                 'var(--powder-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>

                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span 
                      className={`m-badge ${
                        item.statusType === 'warning' ? 'm-badge-warning' :
                        item.statusType === 'success' ? 'm-badge-success' :
                        'm-badge-blue'
                      }`}
                      style={{ fontSize: '11px' }}
                    >
                      {item.status}
                    </span>
                    {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{
                    marginTop: '14px',
                    paddingTop: '12px',
                    borderTop: '1px solid #EDF2F7',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.45, margin: 0 }}>
                      {item.desc}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(item.spoken);
                      }}
                      className="btn-listen"
                      style={{ alignSelf: 'flex-start', padding: '6px 14px', fontSize: '12.5px', borderRadius: '16px' }}
                    >
                      <Volume2 size={15} />
                      <span>{language === 'en' ? 'Listen Advice' : 'सलाह सुनें'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Action to upload or book */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => navigateTo(11)}
              className="btn-primary"
              style={{ flex: 1, minHeight: '46px', fontSize: '13.5px' }}
            >
              <PlusCircle size={16} />
              <span>{language === 'hi' ? 'पर्ची अपलोड करें' : 'Upload Prescription'}</span>
            </button>

            <button
              onClick={() => setActiveTab('records')}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '46px', fontSize: '13.5px' }}
            >
              <FileText size={16} />
              <span>{language === 'hi' ? 'सभी रिकॉर्ड्स देखें' : 'View Reports'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MEDICAL RECORDS & PRESCRIPTIONS */}
      {activeTab === 'records' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Upload New Document Button */}
          <button
            onClick={() => navigateTo(11)}
            className="btn-primary"
            style={{ minHeight: '48px', fontSize: '15px' }}
          >
            <PlusCircle size={18} />
            <span>{language === 'hi' ? 'नई पर्ची या रिपोर्ट जोड़ें' : 'Upload New Report / Prescription'}</span>
          </button>

          {/* Stored Health Records */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {healthRecords.map(doc => (
              <div
                key={doc.id}
                className="m-card"
                style={{
                  padding: '14px 16px',
                  marginBottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '14px',
                    background: 'var(--powder-blue)',
                    color: 'var(--primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText size={20} />
                  </div>

                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                      {language === 'en' ? (doc.titleEn || doc.title) : doc.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {language === 'en' ? (doc.dateEn || doc.date) : doc.date} • {language === 'en' ? (doc.doctorEn || doc.doctor) : doc.doctor}
                    </div>
                    <span className="m-badge m-badge-success" style={{ fontSize: '10.5px', marginTop: '4px' }}>
                      {language === 'en' ? (doc.statusEn || doc.status) : doc.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDoc(doc)}
                  style={{
                    background: 'var(--powder-blue)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--deep-navy)',
                    cursor: 'pointer'
                  }}
                  title="View document"
                >
                  <Eye size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRIVACY & SHARING */}
      {activeTab === 'privacy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div className="m-card m-card-blush" style={{ padding: '18px', marginBottom: 0, borderRadius: '22px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '12px' }}>
              {t.screen17.sharingHeader}
            </h3>

            {/* MIL Toggle */}
            <div 
              onClick={toggleMilSharing}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(217, 145, 165, 0.2)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} color="var(--warm-rose-dark)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-navy)' }}>
                  {t.screen17.shareMilToggle}
                </span>
              </div>

              <div style={{
                width: '42px',
                height: '24px',
                borderRadius: '12px',
                background: consent.familySharing ? 'var(--warm-rose)' : '#CBD5E1',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: consent.familySharing ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s',
                flexShrink: 0
              }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white' }} />
              </div>
            </div>

            {/* ASHA Toggle */}
            <div 
              onClick={toggleAshaSharing}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserCheck size={18} color="var(--primary-blue)" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-navy)' }}>
                  {t.screen17.shareAshaToggle}
                </span>
              </div>

              <div style={{
                width: '42px',
                height: '24px',
                borderRadius: '12px',
                background: consent.ashaSharing ? 'var(--color-success)' : '#CBD5E1',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: consent.ashaSharing ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s',
                flexShrink: 0
              }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white' }} />
              </div>
            </div>
          </div>

          {/* Revoke All Sharing Action */}
          <button
            onClick={handleRevokeAll}
            className="btn-secondary"
            style={{
              border: '1.5px solid var(--color-error)',
              color: 'var(--color-error)',
              background: 'var(--color-error-bg)',
              minHeight: '48px',
              fontSize: '15px'
            }}
          >
            <Lock size={16} />
            <span>{t.screen17.btnRevokeAll}</span>
          </button>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(23, 54, 83, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
              {language === 'en' ? (selectedDoc.titleEn || selectedDoc.title) : selectedDoc.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {language === 'en' ? (selectedDoc.dateEn || selectedDoc.date) : selectedDoc.date} • {language === 'en' ? (selectedDoc.doctorEn || selectedDoc.doctor) : selectedDoc.doctor}
            </p>

            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={selectedDoc.imageUrl} alt={selectedDoc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <button onClick={() => setSelectedDoc(null)} className="btn-primary" style={{ minHeight: '44px' }}>
              <span>{t.app.done}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
