import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Heart, 
  Baby, 
  Calendar 
} from 'lucide-react';

export const Screen15CareTimeline = () => {
  const { speakText, t, language, navigateTo } = useApp();
  const [expandedPhase, setExpandedPhase] = useState(1);

  const timelinePhases = [
    {
      id: 1,
      title: t.screen15.phase1,
      desc: t.screen15.phase1Desc,
      status: language === 'hi' ? 'वर्तमान चरण (Active)' : 'Current Stage',
      statusType: 'primary',
      icon: '🌱',
      why: language === 'hi' ? 'शुरुआती जांच से खून की कमी और जोखिम को समय रहते ठीक किया जाता है।' : 'Early screening prevents maternal anemia and identifies risks early.',
      who: language === 'hi' ? 'सुनीता आशा दीदी और प्राथमिक स्वास्थ्य केंद्र (PHC)' : 'Sunita ASHA Didi & PHC Staff',
      spoken: language === 'hi'
        ? "पहला चरण: गर्भधारण से 12वें सप्ताह तक। इसमें रजिस्ट्रेशन, एमसीपी कार्ड, टीडी का टीका और फोलिक एसिड की गोली जरूरी है।"
        : "Phase 1: Conception to Week 12. Includes ANC registration, MCP card, Tetanus shot, and folic acid supplements."
    },
    {
      id: 2,
      title: t.screen15.phase2,
      desc: t.screen15.phase2Desc,
      status: language === 'hi' ? 'आगामी (Upcoming)' : 'Upcoming',
      statusType: 'muted',
      icon: '🌸',
      why: language === 'hi' ? 'सोनोग्राफी से शिशु के अंगों की वृद्धि देखी जाती है और 100 दिन की आयरन की गोली पूरी करनी होती है।' : 'Ultrasound anomaly scan and 100 IFA tablets ensure healthy growth.',
      who: language === 'hi' ? 'सामुदायिक स्वास्थ्य केंद्र (CHC) डॉक्टर' : 'Community Health Centre Clinician',
      spoken: language === 'hi'
        ? "दूसरा चरण: 13वें से 27वें सप्ताह तक। इसमें अल्ट्रासाउंड जांच और आयरन की नियमित खुराक जरूरी है।"
        : "Phase 2: Weeks 13 to 27. Features ultrasound anomaly screening and daily iron supplementation."
    },
    {
      id: 3,
      title: t.screen15.phase3,
      desc: t.screen15.phase3Desc,
      status: language === 'hi' ? 'योजनाबद्ध (Planned)' : 'Planned',
      statusType: 'muted',
      icon: '🏥',
      why: language === 'hi' ? 'प्रसव के समय 108 एम्बुलेंस और अस्पताल का पहले से चयन सुरक्षित प्रसव सुनिश्चित करता है।' : 'Pre-booking 108 ambulance and hospital ensures institutional delivery safety.',
      who: language === 'hi' ? 'आशा कार्यकर्ता और परिवार' : 'ASHA Worker & Family Supporter',
      spoken: language === 'hi'
        ? "तीसरा चरण: 28वें से 40वें सप्ताह तक। सुरक्षित प्रसव के लिए अस्पताल और एम्बुलेंस 108 की पहले से तैयारी।"
        : "Phase 3: Weeks 28 to 40. Institutional birth preparedness and emergency transport readiness."
    },
    {
      id: 4,
      title: t.screen15.phase4,
      desc: t.screen15.phase4Desc,
      status: language === 'hi' ? 'प्रसव पश्चात (Postpartum)' : 'Postpartum',
      statusType: 'muted',
      icon: '🤱',
      why: language === 'hi' ? 'अस्पताल में 48 घंटे रुकने से माँ और बच्चे दोनों की जान सुरक्षित रहती है।' : '48-hour hospital stay ensures immediate newborn care and mother recovery.',
      who: language === 'hi' ? 'अस्पताल नर्सिंग स्टाफ और डॉक्टर' : 'Hospital Staff & Midwife',
      spoken: language === 'hi'
        ? "चौथा चरण: प्रसव और शुरुआती 48 घंटे। जन्म के 1 घंटे के भीतर माँ का पहला गाढ़ा पीला दूध जरूर पिलाएं।"
        : "Phase 4: Delivery and first 48 hours. Initiate early breastfeeding within 1 hour."
    },
    {
      id: 5,
      title: t.screen15.phase5,
      desc: t.screen15.phase5Desc,
      status: language === 'hi' ? 'शिशु स्वास्थ्य (0-24 माह)' : 'Child Care (0-24m)',
      statusType: 'muted',
      icon: '👶',
      why: language === 'hi' ? 'समय पर टीके लगवाने से बच्चा 12 जानलेवा बीमारियों से सुरक्षित रहता है।' : 'Timely immunizations protect the infant against 12 preventable diseases.',
      who: language === 'hi' ? 'एएनएम दीदी और आंगनवाड़ी' : 'ANM & Anganwadi Worker',
      spoken: language === 'hi'
        ? "पांचवां चरण: बच्चे के 2 साल तक के सभी टीके जैसे पोलियो, पेंटावेलेंट और मीजल्स नियमित रूप से लगवाएं।"
        : "Phase 5: Complete child vaccinations up to 24 months, including BCG, Polio, and Pentavalent."
    }
  ];

  const togglePhase = (id) => {
    setExpandedPhase(prev => prev === id ? null : id);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen15.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen15.subtitle}
        </p>
      </div>

      {/* Vertical Timeline */}
      <div style={{ position: 'relative', paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Continuous Vertical Connecting Line */}
        <div style={{
          position: 'absolute',
          left: '12px',
          top: '14px',
          bottom: '24px',
          width: '3px',
          background: 'linear-gradient(to bottom, var(--primary-blue) 0%, var(--powder-blue) 60%, rgba(65, 111, 152, 0.2) 100%)',
          borderRadius: '2px'
        }} />

        {timelinePhases.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const isCurrent = phase.id === 1;

          return (
            <div key={phase.id} style={{ position: 'relative' }}>
              {/* Timeline Node Dot */}
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '16px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: isCurrent ? 'var(--primary-blue)' : 'var(--surface-white)',
                border: isCurrent ? '3px solid var(--powder-blue)' : '2px solid #BAC7D5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isCurrent ? '0 0 10px rgba(65, 111, 152, 0.5)' : 'none',
                zIndex: 2
              }}>
                {isCurrent ? (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                ) : (
                  <span style={{ fontSize: '10px' }}>{phase.id}</span>
                )}
              </div>

              {/* Phase Card */}
              <div 
                className="m-card"
                onClick={() => togglePhase(phase.id)}
                style={{
                  padding: '16px',
                  marginBottom: 0,
                  cursor: 'pointer',
                  border: isCurrent ? '1.5px solid var(--primary-blue)' : '1px solid rgba(65, 111, 152, 0.1)',
                  background: isCurrent ? 'var(--powder-blue-light)' : 'var(--surface-white)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{phase.icon}</span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                      {phase.title}
                    </h4>
                  </div>

                  <span className={`m-badge ${isCurrent ? 'm-badge-blue' : ''}`} style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                    {phase.status}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {phase.desc}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(65, 111, 152, 0.1)', animation: 'fadeIn 0.2s ease-out' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)' }}>
                        {language === 'hi' ? 'यह क्यों जरूरी है?' : 'Why this matters:'}
                      </span>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {phase.why}
                      </p>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)' }}>
                        {language === 'hi' ? 'कौन मदद करेगा?' : 'Who can help:'}
                      </span>
                      <p style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 600 }}>
                        {phase.who}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(phase.spoken);
                        }}
                        className="btn-listen"
                        style={{ padding: '6px 12px', fontSize: '13px' }}
                      >
                        <Volume2 size={14} />
                        <span>{t.app.listen}</span>
                      </button>

                      {isCurrent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo(9); // Go to Checkups
                          }}
                          className="btn-secondary"
                          style={{ width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                        >
                          <Calendar size={14} />
                          <span>{language === 'hi' ? 'चेकअप देखें' : 'View Check-up'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
