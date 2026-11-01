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
  AlertTriangle,
  Activity,
  PhoneCall,
  MapPin,
  Sparkles,
  ShieldCheck,
  Check,
  FileText,
  Camera,
  Stethoscope,
  Info
} from 'lucide-react';

export const Screen09Checkups = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [activeFilter, setActiveFilter] = useState('all'); // all, upcoming, completed, lab, meds
  const [expandedId, setExpandedId] = useState(1);
  const [selectedTestModal, setSelectedTestModal] = useState(null);
  const [remindersSet, setRemindersSet] = useState({ 1: true });
  const [ironStreak, setIronStreak] = useState(14);
  const [isIronTakenToday, setIsIronTakenToday] = useState(false);

  // Checkup & Diagnostic Data Items
  const checkupItems = [
    {
      id: 1,
      num: 1,
      category: 'upcoming',
      type: 'anc',
      icon: <Calendar size={22} color="var(--primary-blue)" />,
      title: language === 'hi' ? 'प्रथम त्रैमासिक जांच (ANC-1)' : '1st Trimester Checkup (ANC-1)',
      clinic: language === 'hi' ? 'प्राथमिक स्वास्थ्य केंद्र (PHC) रामपुर' : 'Rampur Primary Health Center',
      date: language === 'hi' ? '5 नवंबर 2026 (सप्ताह 12)' : '5 Nov 2026 (Week 12)',
      dueDateText: language === 'hi' ? '3 दिन में देय • सुबह 9 बजे' : 'Due in 3 days • 9:00 AM',
      status: language === 'hi' ? 'आगामी देय' : 'Due Soon',
      statusType: 'warning',
      testsIncluded: [
        { hi: '⚖️ वजन जांच', en: '⚖️ Weight Record' },
        { hi: '🩺 बीपी जांच', en: '🩺 Blood Pressure' },
        { hi: '🩸 हीमोग्लोबिन (Hb)', en: '🩸 Hemoglobin (Hb)' },
        { hi: '🧪 पेशाब एल्ब्यूमिन/शुगर', en: '🧪 Urine Albumin/Sugar' }
      ],
      desc: language === 'hi'
        ? 'गर्भावस्था का पहला आवश्यक चेकअप। डॉक्टर और आशा दीदी द्वारा संपूर्ण शारीरिक जांच, रक्त समूह, एनीमिया व उच्च रक्तचाप का परीक्षण किया जाएगा।'
        : 'Crucial first antenatal checkup. Complete clinical evaluation, blood typing, anemia check, and preeclampsia screening by the PHC medical officer.',
      guidelines: language === 'hi'
        ? 'खाली पेट रहने की जरूरत नहीं है। हल्का नाश्ता करके जाएं और पर्याप्त पानी पिएं। एमसीपी कार्ड (ममता कार्ड) व आधार कार्ड साथ रखें।'
        : 'Fasting is not required. Have a light meal and drink water. Bring MCP Card and Aadhaar/ABHA ID.',
      spoken: language === 'hi' 
        ? "प्रथम त्रैमासिक चेकअप 5 नवंबर को देय है। इसमें वजन, बीपी, खून और पेशाब की जरूरी जांच होगी। खाली पेट रहने की आवश्यकता नहीं है।"
        : "Your first ANC checkup is due on 5 November at Rampur PHC. It includes weight, blood pressure, hemoglobin, and urine screening."
    },
    {
      id: 2,
      num: 2,
      category: 'completed',
      type: 'vaccine',
      icon: <ShieldCheck size={22} color="var(--color-success)" />,
      title: language === 'hi' ? 'टीडी-1 टीका (टेटनस-डिप्थीरिया)' : 'Td-1 Vaccination (Tetanus & Diphtheria)',
      clinic: language === 'hi' ? 'उप-स्वास्थ्य केंद्र शिवगढ़' : 'Sub-Center Shivgarh',
      date: language === 'hi' ? '12 अक्टूबर 2026 • संपन्न' : '12 Oct 2026 • Completed',
      dueDateText: language === 'hi' ? 'सफलतापूर्वक लगा • बैच #TD-8924' : 'Verified Administered • Batch #TD-8924',
      status: language === 'hi' ? 'पूर्ण' : 'Completed',
      statusType: 'success',
      testsIncluded: [
        { hi: '💉 0.5 ml बांह में', en: '💉 0.5 ml Intramuscular' },
        { hi: '🛡️ माँ व शिशु सुरक्षा', en: '🛡️ Mother & Fetal Immunity' }
      ],
      desc: language === 'hi'
        ? 'टेटनस और डिप्थीरिया से रक्षा हेतु प्रथम टीका 12 अक्टूबर को सफलता पूर्वक लग चुका है। टीडी-2 का दूसरा बूस्टर टीका ठीक 4 सप्ताह बाद (10 नवंबर) देय होगा।'
        : 'First dose of Td vaccine successfully administered on 12 October. Second booster dose (Td-2) will be due after 4 weeks on 10 November.',
      guidelines: language === 'hi'
        ? 'टीकाकरण के बाद हल्की सूजन सामान्य है। बर्फ या ठंडे कपड़े की सिकाई करें। कोई अन्य दवा न लगाएं।'
        : 'Mild soreness at the injection site is normal. Apply a clean cold compress if needed.',
      spoken: language === 'hi'
        ? "टीडी का पहला टीका 12 अक्टूबर को सफलता पूर्वक लग चुका है। दूसरा टीका 4 सप्ताह बाद लगेगा।"
        : "First Tetanus injection was completed on 12 October. Second dose will be due in 4 weeks."
    },
    {
      id: 3,
      num: 3,
      category: 'meds',
      type: 'nutrition',
      icon: <Pill size={22} color="var(--warm-rose-dark)" />,
      title: language === 'hi' ? 'आयरन-फोलिक एसिड (IFA) व कैल्शियम' : 'Daily Iron-Folic Acid (IFA) & Calcium',
      clinic: language === 'hi' ? 'दैनिक गृह पोषण' : 'Daily Home Routine',
      date: language === 'hi' ? 'रोजाना 1 लाल गोली दोपहर में' : '1 Red Tablet Daily (Post-Lunch)',
      dueDateText: language === 'hi' ? 'आज की गोली शेष' : 'Daily Dose Pending',
      status: language === 'hi' ? 'दैनिक सक्रिय' : 'Active Daily',
      statusType: 'blue',
      testsIncluded: [
        { hi: '💊 100 mg आयरन + 500 mcg फोलिक', en: '💊 100mg Iron + 500mcg Folic' },
        { hi: '🥛 कैल्शियम रात में', en: '🥛 Calcium at Night' }
      ],
      desc: language === 'hi'
        ? 'खून की कमी (एनीमिया) रोकने और शिशु के मस्तिष्क के विकास के लिए लाल आयरन गोली अत्यंत जरूरी है। इसे हमेशा दोपहर के भोजन के 30 मिनट बाद सादे पानी या नींबू पानी से लें।'
        : 'Essential for preventing maternal anemia and aiding fetal brain development. Take the red iron tablet 30 minutes after lunch with plain water or citrus water.',
      guidelines: language === 'hi'
        ? '⚠️ आयरन और कैल्शियम की गोली कभी भी एक साथ या चाय-दूध के साथ न लें। कम से कम 2 घंटे का अंतर रखें।'
        : '⚠️ Never take Iron and Calcium tablets together or with milk/tea. Maintain at least a 2-hour gap.',
      spoken: language === 'hi'
        ? "आयरन और फोलिक एसिड की लाल गोली रोज दोपहर खाने के बाद पानी से लें। चाय या दूध के साथ कभी न लें।"
        : "Take your red Iron & Folic Acid tablet daily after lunch with water. Never take it with milk or tea."
    },
    {
      id: 4,
      num: 4,
      category: 'lab',
      type: 'scan',
      icon: <Activity size={22} color="var(--primary-blue)" />,
      title: language === 'hi' ? 'अल्ट्रासाउंड एनामली स्कैन (USG)' : 'Ultrasound Anomaly Scan (USG Level-2)',
      clinic: language === 'hi' ? 'सामुदायिक स्वास्थ्य केंद्र (CHC)' : 'Community Health Center (CHC)',
      date: language === 'hi' ? 'सप्ताह 18-20 (दिसंबर 2026)' : 'Week 18-20 (Dec 2026)',
      dueDateText: language === 'hi' ? 'द्वितीय त्रैमासिक स्कैन' : '2nd Trimester Scan',
      status: language === 'hi' ? 'अनुसूचित' : 'Scheduled',
      statusType: 'blue',
      testsIncluded: [
        { hi: '🩻 शिशु के आंतरिक अंग', en: '🩻 Fetal Organs Check' },
        { hi: '🫀 हृदय व रीढ़ की हड्डी', en: '🫀 Spine & Heart Chambers' },
        { hi: '💧 एमनियोटिक द्रव स्तर', en: '💧 Amniotic Fluid Index' }
      ],
      desc: language === 'hi'
        ? 'शिशु के संपूर्ण अंगों की विस्तृत सोनोग्राफी। रीढ़, मस्तिष्क, हृदय और गर्भनाल (प्लेसेंटा) की स्थिति का सटीक परीक्षण होता है।'
        : 'Detailed anatomical sonogram examining the fetus spine, brain, chambers of the heart, limb development, and placental position.',
      guidelines: language === 'hi'
        ? 'जांच से 1 घंटा पहले 2-3 गिलास पानी पिएं ताकि मूत्राशय भरा रहे। यह स्कैन ध्वनि तरंगों पर आधारित है और शिशु के लिए 100% सुरक्षित है।'
        : 'Drink 2-3 glasses of water 1 hour prior. Ultrasound uses sound waves and is completely radiation-free and safe.',
      spoken: language === 'hi'
        ? "अल्ट्रासाउंड जांच 18वें सप्ताह में बच्चे के अंगों के संपूर्ण विकास को देखने के लिए की जाएगी। यह पूरी तरह सुरक्षित है।"
        : "Ultrasound anomaly scan will be conducted at 18 weeks to observe healthy organ growth. It is 100% safe."
    },
    {
      id: 5,
      num: 5,
      category: 'lab',
      type: 'lab',
      icon: <TestTube size={22} color="#D9480F" />,
      title: language === 'hi' ? 'रक्त व ग्लूकोज जांच (GDM & CBC)' : 'Complete Blood Count & Glucose (OGTT)',
      clinic: language === 'hi' ? 'पीएचसी रामपुर पैथोलॉजी' : 'Rampur PHC Pathology Lab',
      date: language === 'hi' ? 'सप्ताह 24 (जनवरी 2027)' : 'Week 24 (Jan 2027)',
      dueDateText: language === 'hi' ? 'मधुमेह व खून जांच' : 'Gestational Diabetes Screen',
      status: language === 'hi' ? 'आगामी' : 'Upcoming',
      statusType: 'blue',
      testsIncluded: [
        { hi: '🩸 सीबीसी व हीमोग्लोबिन', en: '🩸 CBC & Hemoglobin' },
        { hi: '🍯 ओरल ग्लूकोज टेस्ट (75g)', en: '🍯 Oral Glucose Tolerance' }
      ],
      desc: language === 'hi'
        ? 'गर्भावस्था में शुगर (जेस्टेशनल डायबिटीज) की पहचान के लिए 75 ग्राम ग्लूकोज जांच और हीमोग्लोबिन की पुनः जांच की जाती है।'
        : 'Oral Glucose Tolerance Test (OGTT) to rule out gestational diabetes, alongside a repeat Complete Blood Count for hemoglobin tracking.',
      guidelines: language === 'hi'
        ? 'इस जांच के लिए सुबह खाली पेट लैब पहुंचें। ग्लूकोज घोल पीने के 2 घंटे बाद रक्त का नमूना लिया जाएगा।'
        : 'Arrive fasting in the morning. Blood will be drawn 2 hours after drinking the medical glucose solution.',
      spoken: language === 'hi'
        ? "24वें सप्ताह में रक्त और ग्लूकोज जांच होगी जिससे माँ और बच्चे दोनों में शुगर और खून की जांच की जा सके।"
        : "At week 24, blood and glucose tolerance testing will be conducted to screen for gestational diabetes."
    }
  ];

  // Diagnostic Test Reference Encyclopedia
  const diagnosticGuides = [
    {
      nameHi: 'हीमोग्लोबिन (Hb) जांच',
      nameEn: 'Hemoglobin (Hb) Test',
      whyHi: 'एनीमिया (खून की कमी) जांचने के लिए। 11 g/dL से ऊपर सामान्य माना जाता है।',
      whyEn: 'Detects maternal anemia. Levels above 11.0 g/dL indicate healthy oxygen delivery to baby.',
      safetyHi: '100% सुरक्षित • केवल उंगली या नस से हल्का रक्त नमूना',
      safetyEn: '100% Safe • Standard finger-prick or vein draw'
    },
    {
      nameHi: 'पेशाब एल्ब्यूमिन व शुगर',
      nameEn: 'Urine Albumin & Sugar',
      whyHi: 'प्री-एक्लेम्पसिया (गर्भावस्था में बीपी का खतरा) और डायबिटीज की शीघ्र पहचान।',
      whyEn: 'Screens for preeclampsia protein traces and gestational diabetes.',
      safetyHi: 'पूरी तरह दर्द-रहित • साफ कंटेनर में सुबह का नमूना',
      safetyEn: 'Completely painless • Clean midstream urine sample'
    },
    {
      nameHi: 'ब्लड प्रेशर (BP) मॉनिटरिंग',
      nameEn: 'Blood Pressure Monitoring',
      whyHi: 'उच्च रक्तचाप (140/90 से अधिक) से बचाव ताकि सिरदर्द या सूजन से बचा जा सके।',
      whyEn: 'Monitors cardiovascular stability to prevent sudden hypertensive complications.',
      safetyHi: '100% सुरक्षित • डिजिटल या मरकरी कफ से 2 मिनट में जांच',
      safetyEn: '100% Safe • Non-invasive cuff measurement in 2 minutes'
    },
    {
      nameHi: 'अल्ट्रासाउंड सोनोग्राफी',
      nameEn: 'Ultrasound Sonogram',
      whyHi: 'शिशु की धड़कन, विकास दर, अंग बनावट और गर्भनाल की स्थिति देखने के लिए।',
      whyEn: 'Visualizes fetal heartbeat, anatomical growth markers, and placental position.',
      safetyHi: 'एक्स-रे नहीं है! यह केवल ध्वनि तरंगों (Sound Waves) से होता है और पूर्णतः हानिरहित है।',
      safetyEn: 'No radiation! Uses harmless acoustic sound waves with zero risk to the baby.'
    }
  ];

  // Filter items
  const filteredItems = checkupItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return item.category === 'upcoming';
    if (activeFilter === 'completed') return item.category === 'completed';
    if (activeFilter === 'lab') return item.category === 'lab';
    if (activeFilter === 'meds') return item.category === 'meds';
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const toggleReminder = (id) => {
    const nextState = !remindersSet[id];
    setRemindersSet(prev => ({ ...prev, [id]: nextState }));
    if (nextState) {
      speakText(language === 'hi' 
        ? "चेकअप का एसएमएस व व्हाट्सएप रिमाइंडर सेट कर दिया गया है। जांच से एक दिन पहले आपको सूचना मिलेगी।" 
        : "Reminder scheduled via SMS and notification. You will be alerted 24 hours prior."
      );
    }
  };

  const handleTakeIron = () => {
    if (!isIronTakenToday) {
      setIsIronTakenToday(true);
      setIronStreak(prev => prev + 1);
      speakText(language === 'hi' 
        ? `शाबाश रानी जी! आज की आयरन गोली दर्ज हो गई है। लगातार ${ironStreak + 1} दिनों का स्वस्थ रिकॉर्ड पूरा हुआ!` 
        : `Great job Rani! Today's Iron pill recorded. Completed a ${ironStreak + 1}-day streak!`
      );
    } else {
      setIsIronTakenToday(false);
      setIronStreak(prev => prev - 1);
    }
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Header Bar with Audio Guide */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 3px' }}>
            {language === 'hi' ? 'चेकअप व जांच केंद्र' : 'Checkups & Diagnostic Tests'}
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {language === 'hi' ? 'प्रधानमंत्री सुरक्षित मातृत्व अभियान (PMSMA) गाइड' : 'PMSMA Clinical Schedule & Lab Tracking'}
          </div>
        </div>

        <button
          onClick={() => speakText(language === 'hi' 
            ? "चेकअप और जांच केंद्र। आपका पहला बड़ा चेकअप 5 नवंबर को रामपुर प्राथमिक स्वास्थ्य केंद्र में है। नीचे दिए गए कार्ड्स पर टैप करके जांच के नियम और रिमाइंडर देखें।"
            : "Checkup and diagnostic center. Your next primary checkup is due on 5 November at Rampur PHC. Tap any item to view instructions and reminders."
          )}
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
          title="Listen Guide"
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* 2. Interactive PMSMA Maternal Journey Progress Card */}
      <div style={{
        background: 'linear-gradient(135deg, #173653 0%, #254F77 100%)',
        borderRadius: '24px',
        padding: '18px',
        color: 'white',
        boxShadow: '0 8px 24px rgba(23, 54, 83, 0.22)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow circle */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 145, 165, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '3px 9px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#FFE2EA'
            }}>
              ANC माइलस्टोन
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
              1 / 4 जांचें पूर्ण
            </span>
          </div>

          <span style={{
            background: 'var(--warm-rose)',
            color: 'white',
            padding: '3px 9px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: 800
          }}>
            25% पूर्ण
          </span>
        </div>

        <div style={{ fontSize: '16.5px', fontWeight: 800, lineHeight: 1.25, marginBottom: '6px' }}>
          {language === 'hi' ? 'अगला चेकअप: 5 नवंबर 2026' : 'Next Checkup: 5 November 2026'}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '14px', lineHeight: 1.35 }}>
          {language === 'hi' 
            ? 'रामपुर प्राथमिक स्वास्थ्य केंद्र • डॉ. प्रिया सिंह द्वारा प्रथम संपूर्ण परीक्षण' 
            : 'Rampur Primary Health Center • ANC-1 Evaluation by Dr. Priya Singh'}
        </div>

        {/* Progress bar */}
        <div style={{
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '10px'
        }}>
          <div style={{
            width: '25%',
            height: '100%',
            background: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)',
            borderRadius: '10px'
          }} />
        </div>

        {/* 4 Core ANC Milestones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: 'rgba(255,255,255,0.75)' }}>
          <span style={{ color: '#6EE7B7', fontWeight: 800 }}>ANC 1 (सप्ताह 12)</span>
          <span>ANC 2 (सप्ताह 20)</span>
          <span>ANC 3 (सप्ताह 28)</span>
          <span>ANC 4 (सप्ताह 36)</span>
        </div>
      </div>

      {/* 3. Interactive Filter Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '2px',
        scrollbarWidth: 'none'
      }}>
        {[
          { key: 'all', hi: 'सभी (5)', en: 'All (5)' },
          { key: 'upcoming', hi: 'देय चेकअप (1)', en: 'Due ANC (1)' },
          { key: 'completed', hi: 'टीकाकरण पूर्ण (1)', en: 'Vaccines (1)' },
          { key: 'meds', hi: 'दैनिक पोषण (1)', en: 'Daily Pills (1)' },
          { key: 'lab', hi: 'लैब व स्कैन (2)', en: 'Lab & Scans (2)' },
        ].map(filter => {
          const isActive = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              style={{
                background: isActive ? 'var(--deep-navy)' : 'white',
                color: isActive ? 'white' : 'var(--deep-navy)',
                border: isActive ? 'none' : '1px solid #E2E8F0',
                padding: '7px 12px',
                borderRadius: '16px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(23, 54, 83, 0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s'
              }}
            >
              {language === 'hi' ? filter.hi : filter.en}
            </button>
          );
        })}
      </div>

      {/* 4. Interactive Checkup Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map(item => {
          const isExpanded = expandedId === item.id;
          const isReminderSet = !!remindersSet[item.id];

          return (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '22px',
                padding: '16px',
                boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)',
                borderLeft: item.statusType === 'warning' ? '5px solid #F59E0B' :
                           item.statusType === 'success' ? '5px solid #10B981' :
                           '5px solid var(--primary-blue)',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '14px',
                    background: item.statusType === 'warning' ? '#FEF3C7' :
                                item.statusType === 'success' ? '#D1FAE5' : '#E0F2FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>

                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '3px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--primary-blue)" />
                      <span>{item.clinic}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--warm-rose-dark)', marginTop: '4px' }}>
                      {item.date}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <span style={{
                    background: item.statusType === 'warning' ? '#FEF3C7' :
                               item.statusType === 'success' ? '#D1FAE5' : '#E0F2FE',
                    color: item.statusType === 'warning' ? '#B45309' :
                           item.statusType === 'success' ? '#065F46' : 'var(--primary-blue)',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800
                  }}>
                    {item.status}
                  </span>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                    title="Toggle Expand"
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Tests Included Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                {item.testsIncluded.map((test, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F1F5F9',
                      color: 'var(--deep-navy)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}
                  >
                    {language === 'hi' ? test.hi : test.en}
                  </span>
                ))}
              </div>

              {/* Special Interactive Tracker for Daily Iron Pills */}
              {item.type === 'nutrition' && (
                <div style={{
                  marginTop: '12px',
                  background: isIronTakenToday ? 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' : '#FFF5F5',
                  padding: '12px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: isIronTakenToday ? '1.5px solid #10B981' : '1px solid #FEE2E2'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isIronTakenToday ? '#10B981' : '#EF4444',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800
                    }}>
                      {isIronTakenToday ? <Check size={18} /> : '💊'}
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                        {isIronTakenToday 
                          ? (language === 'hi' ? '✅ आज की गोली ले ली गई!' : '✅ Today\'s tablet taken!') 
                          : (language === 'hi' ? 'क्या आपने आज दोपहर की गोली ली?' : 'Have you taken today\'s IFA tablet?')}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        🔥 {language === 'hi' ? `लगातार ${ironStreak} दिन का स्वस्थ स्ट्रीक` : `${ironStreak} Day Active Streak`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleTakeIron}
                    style={{
                      background: isIronTakenToday ? '#059669' : 'var(--warm-rose)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '6px 12px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {isIronTakenToday 
                      ? (language === 'hi' ? 'ली गई ✓' : 'Done ✓') 
                      : (language === 'hi' ? 'हाँ, ले ली' : 'Mark Taken')}
                  </button>
                </div>
              )}

              {/* Expanded Details & Interactive Action Row */}
              {isExpanded && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #E2E8F0',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.45, margin: '0 0 10px' }}>
                    {item.desc}
                  </p>

                  <div style={{
                    background: '#F8FAFC',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '11.5px',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px'
                  }}>
                    <Info size={15} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item.guidelines}</span>
                  </div>

                  {/* Action buttons row */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => speakText(item.spoken)}
                      style={{
                        background: 'var(--powder-blue)',
                        color: 'var(--primary-blue)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <Volume2 size={14} />
                      <span>{language === 'hi' ? 'सुनें' : 'Listen'}</span>
                    </button>

                    <button
                      onClick={() => toggleReminder(item.id)}
                      style={{
                        background: isReminderSet ? 'var(--deep-navy)' : '#F1F5F9',
                        color: isReminderSet ? 'white' : 'var(--deep-navy)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <Bell size={14} />
                      <span>
                        {isReminderSet 
                          ? (language === 'hi' ? 'रिमाइंडर चालू ✓' : 'Reminder Set ✓') 
                          : (language === 'hi' ? 'रिमाइंडर लगाएं' : 'Set Reminder')}
                      </span>
                    </button>

                    {item.type === 'anc' && (
                      <button
                        onClick={() => navigateTo(22)}
                        style={{
                          background: 'linear-gradient(135deg, #D96E8A 0%, #C45573 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        <Activity size={14} />
                        <span>{language === 'hi' ? 'AI पल्लर स्कैन' : 'AI Pallor Scan'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigateTo(11)}
                      style={{
                        background: '#F1F5F9',
                        color: 'var(--deep-navy)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <Camera size={14} />
                      <span>{language === 'hi' ? 'पर्चा अपलोड' : 'Upload Rx'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Interactive Diagnostic Test Knowledge Encyclopedia */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '18px',
        boxShadow: '0 6px 22px rgba(65, 111, 152, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'var(--powder-blue-light)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <TestTube size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'गर्भावस्था में जरूरी लैब जांचें' : 'Essential Diagnostic Test Guide'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'टैप करके जानें यह जांच क्यों जरूरी और सुरक्षित है' : 'Tap any test to understand why it is safe and vital'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {diagnosticGuides.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTestModal(guide)}
              style={{
                background: '#F8FAFC',
                padding: '12px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '3px' }}>
                {language === 'hi' ? guide.nameHi : guide.nameEn}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.35, marginBottom: '6px' }}>
                {language === 'hi' ? guide.whyHi.slice(0, 48) + '...' : guide.whyEn.slice(0, 52) + '...'}
              </div>
              <span style={{ fontSize: '10.5px', color: 'var(--primary-blue)', fontWeight: 800 }}>
                {language === 'hi' ? 'विस्तार से जानें →' : 'Learn more →'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. ASHA Escort & Transport Coordination Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
        border: '1.5px solid #10B981',
        borderRadius: '20px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid white',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <img 
              src="/assets/family_support_mil.jpg" 
              alt="ASHA Didi" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'अस्पताल जाने में मदद चाहिए?' : 'Need escort to PHC on Nov 5?'}
            </div>
            <div style={{ fontSize: '11px', color: '#047857' }}>
              {language === 'hi' ? 'सुनीता दीदी (आशा) आपके साथ जाएंगी' : 'ASHA Didi Sunita will accompany you'}
            </div>
          </div>
        </div>

        <a
          href="tel:+919876543210"
          style={{
            background: '#059669',
            color: 'white',
            textDecoration: 'none',
            padding: '7px 12px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <PhoneCall size={13} />
          <span>{language === 'hi' ? 'आशा दीदी' : 'Call ASHA'}</span>
        </a>
      </div>

      {/* 7. Emergency Triage Quick Button */}
      <div 
        onClick={() => navigateTo(12)}
        style={{
          background: 'var(--soft-blush)',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="var(--warm-rose-dark)" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'कोई असामान्य दर्द, चक्कर या रक्तस्राव?' : 'Any unexpected bleeding or fever?'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'खतरे के लक्षण जांचें व तुरंत 108 पर कॉल करें' : 'Check danger signs or call 108 emergency'}
            </div>
          </div>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--warm-rose-dark)' }}>
          {language === 'hi' ? 'जांचें →' : 'Check →'}
        </span>
      </div>

      {/* Interactive Diagnostic Test Detail Modal */}
      {selectedTestModal && (
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
            borderRadius: '24px',
            padding: '20px',
            maxWidth: '360px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                {language === 'hi' ? selectedTestModal.nameHi : selectedTestModal.nameEn}
              </div>
              <button
                onClick={() => setSelectedTestModal(null)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.45, marginBottom: '12px' }}>
              <strong>{language === 'hi' ? 'यह जांच क्यों जरूरी है?' : 'Why is this test conducted?'}</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
                {language === 'hi' ? selectedTestModal.whyHi : selectedTestModal.whyEn}
              </p>
            </div>

            <div style={{
              background: '#ECFDF5',
              padding: '10px 12px',
              borderRadius: '14px',
              fontSize: '11.5px',
              color: '#065F46',
              marginBottom: '16px'
            }}>
              <strong>🛡️ {language === 'hi' ? 'सुरक्षा मानक:' : 'Safety Assurance:'}</strong>
              <div style={{ marginTop: '2px' }}>
                {language === 'hi' ? selectedTestModal.safetyHi : selectedTestModal.safetyEn}
              </div>
            </div>

            <button
              onClick={() => setSelectedTestModal(null)}
              style={{
                width: '100%',
                background: 'var(--primary-blue)',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {language === 'hi' ? 'समझ गए' : 'Understood'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
