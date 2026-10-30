import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Camera, 
  Mic, 
  MicOff, 
  X, 
  Check, 
  Send, 
  Globe, 
  ArrowLeft,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export const Screen19RemedyFlow = () => {
  const { 
    navigateTo, 
    goBack, 
    language, 
    toggleLanguage,
    availableLanguages 
  } = useApp();

  // Curated remedies with clean, minimal content & illustrations
  const remedies = [
    {
      id: 'ajwain',
      nameHi: "अजवाइन-सौंफ का पानी",
      nameEn: "Ajwain & Fennel Water",
      category: "safe", // 'safe' or 'danger'
      statusBadgeHi: "🟢 सीमित मात्रा में सुरक्षित",
      statusBadgeEn: "🟢 Safe in Moderation",
      illustration: "/assets/remedy_safe_tea.jpg",
      simpleQueryHi: "माताजी: 'क्या बहू को पेट गैस में अजवाइन-सौंफ का पानी दे सकते हैं?'",
      simpleQueryEn: "Mataji: 'Can we give Rani mild ajwain & fennel water for gas?'",
      adviceHi: "हाँ, 1 चम्मच अजवाइन व सौंफ का हल्का उबला गुनगुना पानी पेट के भारीपन में आराम देता है।",
      adviceEn: "Yes, lightly boiled lukewarm ajwain and fennel water gently eases digestion and bloating.",
      ashaNoteHi: "सुनीता दीदी: 'अजवाइन का हल्का पानी बिल्कुल सुरक्षित है। कल 2 बजे मैं घर आकर चेकअप करूंगी।'",
      ashaNoteEn: "Sunita Didi: 'Mild ajwain water is safe. I will visit your home tomorrow at 2 PM to check on Rani.'"
    },
    {
      id: 'papaya',
      nameHi: "कच्चा पपीता (सब्जी/काढ़ा)",
      nameEn: "Raw Green Papaya",
      category: "danger",
      statusBadgeHi: "🚫 कड़ाई से वर्जित (खतरा!)",
      statusBadgeEn: "🚫 Strictly Do Not Consume",
      illustration: "/assets/remedy_papaya_caution.jpg",
      simpleQueryHi: "माताजी: 'कब्ज दूर करने के लिए कच्चे पपीते की सब्जी दे दें?'",
      simpleQueryEn: "Mataji: 'Can we give raw papaya curry to clear constipation?'",
      adviceHi: "कच्चा पपीता बिल्कुल न खाएं! इसमें मौजूद लेटेक्स गर्भाशय में संकुचन व गर्भपात का खतरा पैदा करता है।",
      adviceEn: "Never eat raw green papaya! High latex content triggers uterine contractions and miscarriage risk.",
      ashaNoteHi: "सुनीता दीदी: 'कच्चा पपीता कभी मत दीजिएगा! कब्ज के लिए पका केला और गुनगुना पानी दें।'",
      ashaNoteEn: "Sunita Didi: 'Never give raw papaya! For constipation, offer ripe bananas and warm water.'"
    },
    {
      id: 'kesar',
      nameHi: "हल्दी व केसर दूध",
      nameEn: "Turmeric & Saffron Milk",
      category: "safe",
      statusBadgeHi: "🟢 1-2 धागे सीमित मात्रा में सुरक्षित",
      statusBadgeEn: "🟢 Safe with Just 1-2 Strands",
      illustration: "/assets/remedy_safe_tea.jpg",
      simpleQueryHi: "माताजी: 'क्या रात को बहू को केसर और हल्दी वाला दूध दें?'",
      simpleQueryEn: "Mataji: 'Can we give warm saffron & turmeric milk at night?'",
      adviceHi: "दूध में केवल 1 धागा केसर और चुटकी भर हल्दी डालें। यह अच्छी नींद और ताकत देता है।",
      adviceEn: "Add just 1 strand of saffron and a pinch of turmeric. It calms muscles and aids sound sleep.",
      ashaNoteHi: "सुनीता दीदी: 'केसर दूध अच्छा है, पर सिर्फ 1 धागा। आयरन की गोली और दूध में 2 घंटे का अंतर रखें।'",
      ashaNoteEn: "Sunita Didi: 'Saffron milk is good with just 1 strand. Keep a 2-hour gap from iron tablets.'"
    },
    {
      id: 'castor',
      nameHi: "अरंडी का तेल (Erand Tel)",
      nameEn: "Castor Oil",
      category: "danger",
      statusBadgeHi: "🚫 अत्यंत खतरनाक (कभी न लें)",
      statusBadgeEn: "🚫 Extremely Dangerous (Never Take)",
      illustration: "/assets/remedy_papaya_caution.jpg",
      simpleQueryHi: "माताजी: 'क्या पेट साफ करने के लिए अरंडी का तेल दें?'",
      simpleQueryEn: "Mataji: 'Can we give castor oil for clearing bowels?'",
      adviceHi: "अरंडी का तेल कभी न दें! इससे भयंकर मरोड़, दस्त, डिहाइड्रेशन और बच्चे को खतरा हो सकता है।",
      adviceEn: "Never use castor oil! It causes severe cramping, acute diarrhea, dehydration, and fetal distress.",
      ashaNoteHi: "सुनीता दीदी: 'अरंडी का तेल बहुत खतरनाक है। कोई भी समस्या हो तो तुरंत अस्पताल जाएं।'",
      ashaNoteEn: "Sunita Didi: 'Castor oil is extremely hazardous. For any distress, visit the health centre.'"
    }
  ];

  const [selectedId, setSelectedId] = useState('ajwain');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingAsha, setIsPlayingAsha] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [isAshaVerified, setIsAshaVerified] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const currentRemedy = remedies.find(r => r.id === selectedId) || remedies[0];

  // Stop sounds and camera on cleanup
  useEffect(() => {
    return () => {
      speechService.stopSpeaking();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleSelectRemedy = (id) => {
    speechService.stopSpeaking();
    setIsPlayingAudio(false);
    setIsPlayingAsha(false);
    setIsAshaVerified(false);
    setSelectedId(id);
  };

  // Loudspeaker Playback (Minimal audio)
  const handleListenTogether = () => {
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAsha(false);
    setIsPlayingAudio(true);

    const text = language === 'en' ? currentRemedy.adviceEn : currentRemedy.adviceHi;
    speechService.speak(text, language, {
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  // ASHA Voice Note Playback
  const handleListenAsha = () => {
    if (isPlayingAsha) {
      speechService.stopSpeaking();
      setIsPlayingAsha(false);
      return;
    }
    setIsPlayingAudio(false);
    setIsPlayingAsha(true);

    const text = language === 'en' ? currentRemedy.ashaNoteEn : currentRemedy.ashaNoteHi;
    speechService.speak(text, language, {
      onStart: () => setIsPlayingAsha(true),
      onEnd: () => setIsPlayingAsha(false),
      onError: () => setIsPlayingAsha(false)
    });
  };

  // Live Camera
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      }
    } catch (e) {
      console.warn('Camera error:', e);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Mic Speech
  const toggleMic = () => {
    if (isListeningMic) {
      speechService.stopListening();
      setIsListeningMic(false);
    } else {
      speechService.stopSpeaking();
      setIsListeningMic(true);
      speechService.startListening({
        langCode: language,
        onResult: (transcript, isFinal) => {
          if (isFinal) {
            setIsListeningMic(false);
            if (transcript.includes('पपीता') || transcript.includes('papaya')) {
              handleSelectRemedy('papaya');
            } else if (transcript.includes('केसर') || transcript.includes('दूध')) {
              handleSelectRemedy('kesar');
            } else if (transcript.includes('अरंडी') || transcript.includes('तेल')) {
              handleSelectRemedy('castor');
            } else {
              handleSelectRemedy('ajwain');
            }
          }
        },
        onEnd: () => setIsListeningMic(false),
        onError: () => setIsListeningMic(false)
      });
    }
  };

  // Dispatch to ASHA
  const dispatchToAsha = () => {
    speechService.stopSpeaking();
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsAshaVerified(true);
      // Auto-play ASHA note
      const text = language === 'en' ? currentRemedy.ashaNoteEn : currentRemedy.ashaNoteHi;
      speechService.speak(text, language, {
        onStart: () => setIsPlayingAsha(true),
        onEnd: () => setIsPlayingAsha(false)
      });
    }, 1200);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Minimal Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigateTo(6)}
          style={{
            background: 'var(--powder-blue)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--deep-navy)'
          }}
          title="पीछे जाएं"
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
            🌿 {language === 'en' ? 'Home Remedy Check' : 'घरेलू नुस्खा सत्यापन'}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {language === 'en' ? 'Rani & Mataji with Mamta AI' : 'रानी और माताजी की सह-पूछताछ'}
          </span>
        </div>

        {/* Dialect Switcher */}
        <button
          onClick={toggleLanguage}
          style={{
            background: 'white',
            border: '1px solid rgba(65, 111, 152, 0.25)',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--primary-blue)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          <Globe size={12} />
          <span>{availableLanguages.find(l => l.code === language)?.name || 'हिन्दी'}</span>
        </button>
      </div>

      {/* 2. Hero Visual Illustration Card (The Star of the Minimal Design) */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
        border: currentRemedy.category === 'danger' ? '2px solid rgba(185, 76, 85, 0.25)' : '2px solid rgba(60, 134, 106, 0.2)',
        position: 'relative'
      }}>
        {/* Generous Illustration Frame */}
        <div style={{
          width: '100%',
          height: '210px',
          background: 'linear-gradient(180deg, #FDFBFA 0%, #F5F1ED 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img 
            src={currentRemedy.illustration} 
            alt={currentRemedy.nameHi} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} 
          />

          {/* Minimal Floating Status Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: currentRemedy.category === 'danger' ? 'var(--color-error)' : 'var(--color-success)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {language === 'en' ? currentRemedy.statusBadgeEn : currentRemedy.statusBadgeHi}
          </div>
        </div>

        {/* Minimal Content Body */}
        <div style={{ padding: '16px 18px 20px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 6px' }}>
            {language === 'en' ? currentRemedy.nameEn : currentRemedy.nameHi}
          </h3>

          <div style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
            marginBottom: '10px',
            lineHeight: 1.35
          }}>
            "{language === 'en' ? currentRemedy.simpleQueryEn : currentRemedy.simpleQueryHi}"
          </div>

          {/* Simple, Punchy 1-Sentence Advice */}
          <p style={{
            fontSize: '15px',
            fontWeight: 600,
            color: currentRemedy.category === 'danger' ? 'var(--color-error)' : 'var(--deep-navy)',
            lineHeight: 1.45,
            margin: '0 0 16px',
            background: currentRemedy.category === 'danger' ? 'var(--color-error-bg)' : 'var(--powder-blue-light)',
            padding: '10px 14px',
            borderRadius: '12px'
          }}>
            {language === 'en' ? currentRemedy.adviceEn : currentRemedy.adviceHi}
          </p>

          {/* Single Primary Loudspeaker Playback Button */}
          <button
            onClick={handleListenTogether}
            style={{
              width: '100%',
              minHeight: '48px',
              borderRadius: '24px',
              background: isPlayingAudio ? 'var(--warm-rose)' : 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(65, 111, 152, 0.25)',
              transition: 'all 0.2s'
            }}
          >
            {isPlayingAudio ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isPlayingAudio ? 'आवाज़ रोकें' : '🔊 सास-बहू मिलकर सुनें (Listen)'}</span>
          </button>
        </div>
      </div>

      {/* 3. Minimal 4 Illustrated Remedy Chips */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', paddingLeft: '4px' }}>
          {language === 'en' ? 'Choose Remedy:' : 'जांच के लिए नुस्खा चुनें:'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {remedies.map(r => {
            const isSelected = selectedId === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRemedy(r.id)}
                style={{
                  background: isSelected ? 'var(--powder-blue-light)' : 'white',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '8px 4px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#f8f8f8'
                }}>
                  <img src={r.illustration} alt={r.nameHi} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? 800 : 600,
                  color: 'var(--deep-navy)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}>
                  {r.id === 'ajwain' ? 'अजवाइन' : r.id === 'papaya' ? 'पपीता' : r.id === 'kesar' ? 'केसर' : 'अरंडी'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Minimal Camera & Voice Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={isCameraActive ? stopCamera : startCamera}
          style={{
            flex: 1,
            minHeight: '44px',
            borderRadius: '16px',
            background: isCameraActive ? 'var(--color-error)' : 'white',
            color: isCameraActive ? 'white' : 'var(--deep-navy)',
            border: '1.5px solid var(--border-light)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Camera size={16} color={isCameraActive ? 'white' : 'var(--primary-blue)'} />
          <span>{isCameraActive ? 'कैमरा बंद करें' : '📷 कैमरा स्कैन'}</span>
        </button>

        <button
          onClick={toggleMic}
          style={{
            flex: 1,
            minHeight: '44px',
            borderRadius: '16px',
            background: isListeningMic ? 'rgba(185, 76, 85, 0.15)' : 'white',
            color: isListeningMic ? 'var(--color-error)' : 'var(--deep-navy)',
            border: isListeningMic ? '1.5px solid var(--color-error)' : '1.5px solid var(--border-light)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {isListeningMic ? <MicOff size={16} /> : <Mic size={16} color="var(--primary-blue)" />}
          <span>{isListeningMic ? 'सुन रहे हैं...' : '🎙️ बोलकर पूछें'}</span>
        </button>
      </div>

      {/* Live Camera Viewfinder (if user turns on camera) */}
      {isCameraActive && (
        <div style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: '#000',
          border: '2px solid var(--primary-blue)'
        }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: '16px',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '12px',
            pointerEvents: 'none'
          }} />
          <button
            onClick={stopCamera}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 5. Minimal Illustrated ASHA Verification Card */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '16px',
        border: '1.5px solid rgba(72, 187, 120, 0.3)',
        boxShadow: '0 4px 16px rgba(72, 187, 120, 0.08)'
      }}>
        {!isAshaVerified ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#EAF3FB',
              flexShrink: 0
            }}>
              <img src="/assets/asha_didi_vector.jpg" alt="ASHA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                सुनीता दीदी (आशा) से सत्यापन
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                क्या आप आशा कार्यकर्ता से पुष्टि कराना चाहती हैं?
              </div>
            </div>

            <button
              onClick={dispatchToAsha}
              disabled={isDispatching}
              style={{
                background: 'var(--color-success)',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
            >
              {isDispatching ? <RefreshCw size={14} style={{ animation: 'spin 1s infinite' }} /> : <Send size={14} />}
              <span>{isDispatching ? 'भेज रहे हैं...' : 'पूछें'}</span>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-success)',
                flexShrink: 0
              }}>
                <img src="/assets/asha_didi_vector.jpg" alt="ASHA Didi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    सुनीता देवी (आशा कार्यकर्ता)
                  </span>
                  <span style={{
                    background: 'var(--color-success)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '8px'
                  }}>
                    सत्यापित
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  रामपुर सेक्टर 4 • +91 98765 43210
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '13px',
              color: 'var(--deep-navy)',
              margin: '0 0 10px',
              fontStyle: 'italic',
              background: 'rgba(72, 187, 120, 0.08)',
              padding: '8px 12px',
              borderRadius: '10px',
              lineHeight: 1.4
            }}>
              "{language === 'en' ? currentRemedy.ashaNoteEn : currentRemedy.ashaNoteHi}"
            </p>

            <button
              onClick={handleListenAsha}
              style={{
                width: '100%',
                minHeight: '38px',
                borderRadius: '16px',
                background: isPlayingAsha ? 'var(--warm-rose)' : 'var(--color-success)',
                color: 'white',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {isPlayingAsha ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isPlayingAsha ? 'रोकें' : 'सुनीता दीदी का ऑडियो संदेश सुनें'}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
