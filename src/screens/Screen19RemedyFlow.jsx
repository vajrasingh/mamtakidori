import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { 
  Volume2, 
  VolumeX, 
  Camera, 
  Mic, 
  MicOff, 
  X, 
  Send, 
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Screen19RemedyFlow = () => {
  const { navigateTo, language } = useApp();

  // Clean, minimal remedy dataset with short, punchy guidance
  const remedies = [
    {
      id: 'ajwain',
      nameHi: "अजवाइन-सौंफ पानी",
      nameEn: "Ajwain Water",
      emoji: "🌿",
      isSafe: true,
      badgeHi: "🟢 सुरक्षित (सीमित मात्रा)",
      badgeEn: "🟢 Safe in Moderation",
      illustration: "/assets/remedy_safe_tea.jpg",
      adviceHi: "1 चम्मच अजवाइन का गुनगुना पानी पेट भारीपन व गैस में आराम देता है।",
      adviceEn: "Lightly boiled lukewarm ajwain water gently relieves gas and bloating.",
      ashaNoteHi: "सुनीता दीदी (आशा): 'अजवाइन पानी बिल्कुल सुरक्षित है। कल 2 बजे मैं आऊंगी।'"
    },
    {
      id: 'papaya',
      nameHi: "कच्चा पपीता",
      nameEn: "Raw Papaya",
      emoji: "🍈",
      isSafe: false,
      badgeHi: "🚫 बिल्कुल न लें (खतरा)",
      badgeEn: "🚫 Strictly Avoid",
      illustration: "/assets/remedy_papaya_caution.jpg",
      adviceHi: "कच्चा पपीता कभी न खाएं! इससे गर्भाशय संकुचन व गर्भपात का खतरा होता है।",
      adviceEn: "Never eat raw green papaya! It can trigger dangerous contractions.",
      ashaNoteHi: "सुनीता दीदी (आशा): 'कच्चा पपीता कभी मत दीजिएगा! कब्ज में पका केला लें।'"
    },
    {
      id: 'kesar',
      nameHi: "केसर-हल्दी दूध",
      nameEn: "Saffron Milk",
      emoji: "🥛",
      isSafe: true,
      badgeHi: "🟢 सुरक्षित (सिर्फ 1 धागा)",
      badgeEn: "🟢 Safe (1-2 Strands)",
      illustration: "/assets/remedy_safe_tea.jpg",
      adviceHi: "रात में 1 धागा केसर का गुनगुना दूध अच्छी नींद और आराम देता है।",
      adviceEn: "1 strand of saffron in warm milk aids restful sleep and relaxation.",
      ashaNoteHi: "सुनीता दीदी (आशा): 'केसर दूध अच्छा है। आयरन की गोली से 2 घंटे बाद लें।'"
    },
    {
      id: 'castor',
      nameHi: "अरंडी का तेल",
      nameEn: "Castor Oil",
      emoji: "⚠️",
      isSafe: false,
      badgeHi: "🚫 अत्यंत खतरनाक",
      badgeEn: "🚫 Dangerous (Avoid)",
      illustration: "/assets/remedy_papaya_caution.jpg",
      adviceHi: "अरंडी का तेल कभी न दें! यह गंभीर दस्त व बच्चे को संकट में डालता है।",
      adviceEn: "Never take castor oil! It causes severe dehydration and distress.",
      ashaNoteHi: "सुनीता दीदी (आशा): 'अरंडी का तेल बहुत खतरनाक है। तुरंत अस्पताल दिखाएं।'"
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

  // Play minimal audio
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

  // ASHA Voice
  const handleListenAsha = () => {
    if (isPlayingAsha) {
      speechService.stopSpeaking();
      setIsPlayingAsha(false);
      return;
    }
    setIsPlayingAudio(false);
    setIsPlayingAsha(true);

    speechService.speak(currentRemedy.ashaNoteHi, language, {
      onStart: () => setIsPlayingAsha(true),
      onEnd: () => setIsPlayingAsha(false),
      onError: () => setIsPlayingAsha(false)
    });
  };

  // Camera Viewfinder
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.warn('Camera failed:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Voice Mic
  const toggleMic = () => {
    if (isListeningMic) {
      speechService.stopListening();
      setIsListeningMic(false);
      return;
    }

    setIsListeningMic(true);
    speechService.startListening({
      langCode: language,
      onResult: (transcript, isFinal) => {
        if (isFinal) {
          setIsListeningMic(false);
          if (transcript.includes('पपीता')) handleSelectRemedy('papaya');
          else if (transcript.includes('केसर')) handleSelectRemedy('kesar');
          else if (transcript.includes('अरंडी') || transcript.includes('तेल')) handleSelectRemedy('castor');
          else handleSelectRemedy('ajwain');
        }
      },
      onEnd: () => setIsListeningMic(false),
      onError: () => setIsListeningMic(false)
    });
  };

  // Ask ASHA
  const dispatchToAsha = () => {
    speechService.stopSpeaking();
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsAshaVerified(true);
      speechService.speak(currentRemedy.ashaNoteHi, language, {
        onStart: () => setIsPlayingAsha(true),
        onEnd: () => setIsPlayingAsha(false)
      });
    }, 900);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* 1. Sleek Minimal Header */}
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
            {language === 'en' ? 'Remedy Verification' : 'घरेलू नुस्खा जांच'}
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {language === 'en' ? 'Mother & Daughter-in-Law AI Check' : 'सास-बहू व ममता एआई'}
          </span>
        </div>

        <div style={{ width: '38px' }} />
      </div>

      {/* 2. Attractive Borderless Hero Illustration Card */}
      <div style={{
        background: 'white',
        borderRadius: '26px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(65, 111, 152, 0.1)',
        border: 'none'
      }}>
        {/* Generous Large Illustration Stage (Bigger, uncropped, attractive) */}
        <div style={{
          width: '100%',
          height: '240px',
          background: currentRemedy.id === 'ajwain' 
            ? 'radial-gradient(circle at center, #F0FAF5 0%, #FFFFFF 100%)'
            : currentRemedy.id === 'papaya'
            ? 'radial-gradient(circle at center, #FFF4F0 0%, #FFFFFF 100%)'
            : currentRemedy.id === 'kesar'
            ? 'radial-gradient(circle at center, #FFFDF0 0%, #FFFFFF 100%)'
            : 'radial-gradient(circle at center, #FFF5F4 0%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          position: 'relative'
        }}>
          <img 
            src={currentRemedy.illustration} 
            alt={currentRemedy.nameHi} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              borderRadius: '20px',
              filter: 'drop-shadow(0 12px 24px rgba(23, 54, 83, 0.14))',
              transition: 'transform 0.3s ease'
            }} 
          />

          {/* Minimal Floating Status Badge */}
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: currentRemedy.isSafe ? 'rgba(46, 133, 64, 0.95)' : 'rgba(214, 57, 57, 0.95)',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            {language === 'en' ? currentRemedy.badgeEn : currentRemedy.badgeHi}
          </div>
        </div>

        {/* Clean, Non-Cluttered Body */}
        <div style={{ padding: '14px 16px 18px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 8px' }}>
            {language === 'en' ? currentRemedy.nameEn : currentRemedy.nameHi}
          </h3>

          {/* 1 Short, Punchy Guidance Sentence */}
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: currentRemedy.isSafe ? 'var(--deep-navy)' : 'var(--color-error)',
            lineHeight: 1.45,
            margin: '0 0 14px',
            background: currentRemedy.isSafe ? 'var(--powder-blue-light)' : 'var(--color-error-bg)',
            padding: '10px 14px',
            borderRadius: '14px'
          }}>
            {language === 'en' ? currentRemedy.adviceEn : currentRemedy.adviceHi}
          </p>

          {/* Loudspeaker Button */}
          <button
            onClick={handleListenTogether}
            style={{
              width: '100%',
              minHeight: '46px',
              borderRadius: '22px',
              background: isPlayingAudio ? 'var(--warm-rose)' : 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(65, 111, 152, 0.2)'
            }}
          >
            {isPlayingAudio ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <span>{isPlayingAudio ? 'आवाज़ रोकें' : '🔊 सास-बहू मिलकर सुनें (Listen)'}</span>
          </button>
        </div>
      </div>

      {/* 3. Smooth Remedy Selector Pills (Uncropped, Simple & Modern) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {remedies.map(r => {
          const isSelected = selectedId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleSelectRemedy(r.id)}
              style={{
                background: isSelected ? 'var(--powder-blue)' : 'white',
                border: 'none',
                boxShadow: isSelected ? '0 4px 14px rgba(65, 111, 152, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                borderRadius: '16px',
                padding: '10px 4px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontSize: '20px' }}>{r.emoji}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: isSelected ? 800 : 600,
                color: isSelected ? 'var(--deep-navy)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                textAlign: 'center'
              }}>
                {r.nameHi.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Minimal Scan & Speak Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={isCameraActive ? stopCamera : startCamera}
          style={{
            flex: 1,
            minHeight: '44px',
            borderRadius: '16px',
            background: isCameraActive ? 'var(--color-error)' : 'white',
            color: isCameraActive ? 'white' : 'var(--deep-navy)',
            border: 'none',
            boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Camera size={15} color={isCameraActive ? 'white' : 'var(--primary-blue)'} />
          <span>{isCameraActive ? 'कैमरा बंद' : '📷 फोटो स्कैन'}</span>
        </button>

        <button
          onClick={toggleMic}
          style={{
            flex: 1,
            minHeight: '44px',
            borderRadius: '16px',
            background: isListeningMic ? 'rgba(185, 76, 85, 0.15)' : 'white',
            color: isListeningMic ? 'var(--color-error)' : 'var(--deep-navy)',
            border: 'none',
            boxShadow: '0 4px 12px rgba(65, 111, 152, 0.08)',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {isListeningMic ? <MicOff size={15} /> : <Mic size={15} color="var(--primary-blue)" />}
          <span>{isListeningMic ? 'सुन रहे हैं...' : '🎙️ बोलकर पूछें'}</span>
        </button>
      </div>

      {/* Live Camera Viewfinder */}
      {isCameraActive && (
        <div style={{
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: '#000',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={stopCamera}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer'
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 5. Minimal Illustrated ASHA Verification Card */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '14px',
        border: 'none',
        boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)'
      }}>
        {!isAshaVerified ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#EAF3FB',
              flexShrink: 0
            }}>
              <img src="/assets/asha_didi_vector.jpg" alt="ASHA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                सुनीता दीदी (आशा)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                कार्यकर्ता से पुष्टि कराएं
              </div>
            </div>

            <button
              onClick={dispatchToAsha}
              disabled={isDispatching}
              style={{
                background: 'var(--color-success)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '7px 12px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {isDispatching ? <RefreshCw size={13} style={{ animation: 'spin 1s infinite' }} /> : <Send size={13} />}
              <span>{isDispatching ? 'भेज रहे हैं...' : 'सत्यापित करें'}</span>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#EAF3FB',
                flexShrink: 0
              }}>
                <img src="/assets/asha_didi_vector.jpg" alt="ASHA Didi" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    सुनीता देवी
                  </span>
                  <span style={{
                    background: 'var(--color-success)',
                    color: 'white',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '6px'
                  }}>
                    सत्यापित
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  आशा कार्यकर्ता • रामपुर
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '12.5px',
              color: 'var(--deep-navy)',
              margin: '0 0 10px',
              background: 'rgba(72, 187, 120, 0.08)',
              padding: '8px 10px',
              borderRadius: '10px',
              lineHeight: 1.4
            }}>
              "{currentRemedy.ashaNoteHi}"
            </p>

            <button
              onClick={handleListenAsha}
              style={{
                width: '100%',
                minHeight: '36px',
                borderRadius: '14px',
                background: isPlayingAsha ? 'var(--warm-rose)' : 'var(--color-success)',
                color: 'white',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              {isPlayingAsha ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isPlayingAsha ? 'रोकें' : 'सुनीता दीदी की आवाज़ सुनें'}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
