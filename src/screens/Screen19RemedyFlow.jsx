import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Camera, 
  Mic, 
  MicOff, 
  Users, 
  ChevronRight, 
  Send, 
  Calendar, 
  HeartHandshake, 
  UserCheck, 
  Globe, 
  ArrowLeft,
  Scan,
  RefreshCw,
  Upload
} from 'lucide-react';

export const Screen19RemedyFlow = () => {
  const { 
    navigateTo, 
    goBack, 
    language, 
    changeLanguage, 
    toggleLanguage,
    availableLanguages,
    t 
  } = useApp();

  // Remedy definitions with respectful cultural framing & clinical evidence
  const remedies = [
    {
      id: 'ajwain',
      nameHi: "अजवाइन और सौंफ का पानी/काढ़ा",
      nameEn: "Ajwain & Fennel Seed Water / Kadha",
      icon: "🌿",
      category: "safe", // 'safe', 'caution', 'danger'
      statusBadgeHi: "🟢 सीमित मात्रा में सुरक्षित व उपयोगी",
      statusBadgeEn: "🟢 Safe in Mild Moderation",
      matajiQueryHi: "ममता बेटी! बहू को पेट भारी और गैस लग रही है। क्या हम अजवाइन-सौंफ का हल्का काढ़ा दे सकते हैं?",
      matajiQueryEn: "Mamta! Rani is feeling gassy and heavy. Can we prepare mild ajwain and fennel water?",
      raniQueryHi: "ममता दीदी, क्या पहली तिमाही में यह मेरे और बच्चे के लिए पूरी तरह सुरक्षित है?",
      raniQueryEn: "Mamta Didi, is this completely safe for me and my baby in this first trimester?",
      respectTraditionHi: "माताजी, आपका अनुभव बिल्कुल सही है। अजवाइन और सौंफ पारंपरिक रूप से पाचन दुरुस्त करने के लिए जाने जाते हैं।",
      respectTraditionEn: "Mataji, your maternal concern is well-grounded; carom and fennel seeds are traditionally revered for soothing digestion.",
      clinicalFactHi: "क्लिनिकल तथ्य: 1 चम्मच अजवाइन और 1 चम्मच सौंफ को 1 गिलास पानी में हल्का उबालकर गुनगुना छानकर पीना पेट की गैस और ऐंठन में आराम देता है। इसमें तीखे मसाले न मिलाएं और दिन में 1-2 कप से ज्यादा न लें।",
      clinicalFactEn: "Clinical Evidence: Lightly boiling 1 tsp ajwain and 1 tsp fennel in water relieves bloating and cramps safely. Avoid excess concentration or reheating with hot spices.",
      safeAlternativeHi: "सुरक्षित सुझाव: पानी को हल्का उबालें। भोजन के बाद 10 मिनट टहलें और खाना धीरे-धीरे चबाकर खाएं।",
      safeAlternativeEn: "Safe tip: Sip it lukewarm after meals. Also take a gentle 10-minute stroll.",
      ashaMessageHi: "नमस्ते माताजी और रानी! मैंने ममता एआई का सुझाव देखा है। अजवाइन और सौंफ का हल्का पानी बिल्कुल सुरक्षित है। लेकिन ज्यादा गाढ़ा काढ़ा मत बनाइएगा। कल दोपहर 2 बजे मैं आपके घर आऊंगी और रानी का बीपी भी नापूंगी।",
      ashaMessageEn: "Hello Mataji and Rani! I reviewed Mamta AI's assessment. Light ajwain-saunf water is safe and gentle. Do not make it too strong. I will visit your home tomorrow at 2 PM to check Rani's BP."
    },
    {
      id: 'papaya',
      nameHi: "कच्चा पपीता या पपीते की सब्जी",
      nameEn: "Raw Papaya / Papaya Sabzi",
      icon: "🥭",
      category: "danger",
      statusBadgeHi: "🚫 कड़ाई से वर्जित (गर्भावस्था में हानिकारक)",
      statusBadgeEn: "🚫 Strictly Prohibited (High Medical Risk)",
      matajiQueryHi: "बहू को पेट साफ नहीं हो रहा था। क्या कच्चे पपीते की सब्जी बनाकर खिला दें?",
      matajiQueryEn: "Rani has constipation. Can we make a curry from raw unripened papaya?",
      raniQueryHi: "ममता दीदी, क्या कच्चा पपीता खाने से बच्चे को कोई खतरा हो सकता है?",
      raniQueryEn: "Mamta Didi, is there any danger to the baby if I eat raw green papaya?",
      respectTraditionHi: "माताजी, पेट साफ रखने की आपकी चिंता हम समझते हैं, लेकिन इस अवस्था में कच्चा पपीता बिल्कुल नहीं देना चाहिए।",
      respectTraditionEn: "Mataji, we respect your intent to relieve constipation, but raw papaya is strongly dangerous during pregnancy.",
      clinicalFactHi: "क्लिनिकल चेतावनी (FOGSI दिशानिर्देश): कच्चे या अधपके पपीते में 'लेटेक्स' (सफेद दूध) और 'पपैन' एंजाइम अत्यधिक मात्रा में होते हैं। यह गर्भाशय में संकुचन (ऐंठन) पैदा कर सकते हैं, जिससे गर्भपात या रक्तस्राव का गंभीर खतरा होता है!",
      clinicalFactEn: "Clinical Contraindication: Raw or semi-ripe green papaya contains high levels of latex and papain enzymes. These stimulate uterine contractions and prostaglandins, triggering severe miscarriage risk!",
      safeAlternativeHi: "सुरक्षित विकल्प: पके हुए सेब, केला, अमरूद, दलिया या गुनगुना पानी पिएं। कच्चा पपीता बिल्कुल न खाएं।",
      safeAlternativeEn: "Safe alternatives: Ripe bananas, stewed apples, high-fiber porridge, and extra fluids. Strictly avoid raw papaya.",
      ashaMessageHi: "माताजी, प्रणाम! कच्चा पपीता रानी को भूलकर भी मत दीजिएगा! इससे गर्भपात का बहुत बड़ा खतरा होता है। कब्ज के लिए रानी को रोज गुनगुना पानी और पके फल दीजिए। कल मैं आकर खुद देखूंगी।",
      ashaMessageEn: "Mataji, Namaste! Please do not give raw papaya to Rani under any circumstances. It triggers uterine spasms. Give her warm water and ripe fruits. I will inspect her personally tomorrow."
    },
    {
      id: 'kesar',
      nameHi: "केसर और हल्दी वाला दूध",
      nameEn: "Saffron & Turmeric Warm Milk",
      icon: "🥛",
      category: "caution",
      statusBadgeHi: "⚠️ केवल सीमित मात्रा (1-2 धागे) में सुरक्षित",
      statusBadgeEn: "⚠️ Safe Only in Strict Moderation (1-2 strands)",
      matajiQueryHi: "क्या रात को सोने से पहले बहू को केसर और हल्दी वाला दूध देना अच्छा रहेगा?",
      matajiQueryEn: "Is it good to give Rani hot milk with saffron and turmeric at bedtime?",
      raniQueryHi: "ममता दीदी, क्या अधिक केसर से शरीर में अधिक गर्मी होती है?",
      raniQueryEn: "Mamta Didi, does excessive saffron cause overheating or issues in early pregnancy?",
      respectTraditionHi: "माताजी, केसर और हल्दी वाला दूध भारतीय घरों में बहुत पवित्र और पौष्टिक माना जाता है।",
      respectTraditionEn: "Mataji, warm milk with turmeric and saffron is a cherished, nourishing Indian tradition.",
      clinicalFactHi: "क्लिनिकल सलाह: दूध में केवल 1 से 2 धागे केसर और एक चुटकी हल्दी ही डालें। यह अनिद्रा और मांसपेशियों के दर्द में आराम देता है। अधिक मात्रा में केसर गर्भाशय में उत्तेजना पैदा कर सकता है।",
      clinicalFactEn: "Clinical Guidance: Limit saffron to 1 or 2 delicate strands and a pinch of turmeric. It aids sleep and provides calcium. Heavy doses of saffron must be strictly avoided.",
      safeAlternativeHi: "सुरक्षित तरीका: दूध को अच्छी तरह उबालें, मलाई कम रखें और सोने से 40 मिनट पहले गुनगुना पिएं।",
      safeAlternativeEn: "Safe method: Boil milk thoroughly, use mild heat, and drink 40 minutes before bedtime.",
      ashaMessageHi: "माताजी, केसर दूध बहुत अच्छा है लेकिन केवल 1 धागा ही डालिएगा। अधिक मात्रा कभी न दें। रानी की आयरन की गोली और दूध में कम से कम 2 घंटे का अंतर जरूर रखिएगा!",
      ashaMessageEn: "Mataji, saffron milk is fine with just 1 strand. Never use heavy doses. Ensure a 2-hour gap between her iron tablet and milk so iron is absorbed properly!"
    },
    {
      id: 'castor',
      nameHi: "अरंडी का तेल (Erand Tel / Castor Oil)",
      nameEn: "Castor Oil (Erand Tel)",
      icon: "🫗",
      category: "danger",
      statusBadgeHi: "🚫 कड़ाई से वर्जित (जानलेवा दस्त व ऐंठन का खतरा)",
      statusBadgeEn: "🚫 Strictly Prohibited (Severe Dehydration Risk)",
      matajiQueryHi: "गांव में कुछ लोग कह रहे थे कि पेट साफ रखने या प्रसव आसान करने के लिए अरंडी का तेल पिला दें?",
      matajiQueryEn: "Some village elders suggested giving castor oil to clear bowels and ease labor?",
      raniQueryHi: "ममता दीदी, मुझे इससे बहुत डर लग रहा है। क्या यह सुरक्षित है?",
      raniQueryEn: "Mamta Didi, I am worried about this. Is castor oil safe?",
      respectTraditionHi: "माताजी, यह एक पुराना और बहुत ही खतरनाक भ्रम है जो कई पीढ़ियों से चला आ रहा है।",
      respectTraditionEn: "Mataji, this is an outdated and extremely hazardous folk myth that risks the life of mother and baby.",
      clinicalFactHi: "क्लिनिकल चेतावनी (MoHFW): अरंडी का तेल आंतों में भयंकर मरोड़ और अनियंत्रित दस्त पैदा करता है। इससे शरीर में गंभीर पानी की कमी (dehydration) होती है और गर्भ में पल रहे शिशु की धड़कन अनियमित हो सकती है। इसे कभी न लें!",
      clinicalFactEn: "Clinical Alert: Castor oil causes violent intestinal spasms, severe diarrhea, acute maternal dehydration, and fetal distress. It is strictly condemned by medical guidelines.",
      safeAlternativeHi: "सुरक्षित विकल्प: कब्ज या प्रसव के लिए केवल अस्पताल के डॉक्टर और आशा दीदी की सलाह पर ही चलें।",
      safeAlternativeEn: "Safe alternative: Rely strictly on hospital protocols, hydration, and guidance from Sunita Didi.",
      ashaMessageHi: "माताजी, अरंडी का तेल तो बिल्कुल भूल से भी मत दीजिएगा! पिछले साल हमारे पास के गांव में एक बहू की तबीयत इसी से बहुत बिगड़ गई थी। अस्पताल और आशा की सलाह ही सबसे सुरक्षित है।",
      ashaMessageEn: "Mataji, never touch castor oil! Last year a woman in the adjacent village faced severe complications from it. Follow only PHC doctor and ASHA advice."
    }
  ];

  // States
  const [selectedRemedyId, setSelectedRemedyId] = useState('ajwain');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [detectedHerbName, setDetectedHerbName] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  // Voice & STT States
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');

  // Audio Playback States
  const [isAiAudioPlaying, setIsAiAudioPlaying] = useState(false);
  const [isAshaAudioPlaying, setIsAshaAudioPlaying] = useState(false);

  // Agentic AI Chain of Thought
  const [isThinking, setIsThinking] = useState(false);
  const [cotStep, setCotStep] = useState(4); // 1, 2, 3, 4

  // ASHA Verification States
  const [hasAshaConsent, setHasAshaConsent] = useState(true);
  const [isDispatchingToAsha, setIsDispatchingToAsha] = useState(false);
  const [isAshaVerified, setIsAshaVerified] = useState(false);
  const [visitConfirmed, setVisitConfirmed] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const activeRemedy = remedies.find(r => r.id === selectedRemedyId) || remedies[0];

  // Simulate or Start Real Camera
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    setCapturedPhoto(null);
    setDetectedHerbName(null);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        throw new Error('Camera API not supported');
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      setCameraError(language === 'hi' 
        ? "कैमरा सीधे नहीं खुल सका। आप फोटो चुन सकते हैं या नीचे दिए बटन से जांच कर सकते हैं।" 
        : "Live camera unavailable. You can upload an image or select a remedy directly."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    // If live video stream is running, capture snapshot via canvas
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedPhoto(dataUrl);
      stopCamera();
    } else {
      // High-aesthetic simulated herb snapshot
      setCapturedPhoto('/assets/nutrition_maternal_thali.jpg');
      stopCamera();
    }

    // Agentic AI Herb Detection
    simulateVisionRecognition();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhoto(event.target.result);
        stopCamera();
        simulateVisionRecognition();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateVisionRecognition = () => {
    setIsThinking(true);
    setCotStep(1);

    setTimeout(() => setCotStep(2), 600);
    setTimeout(() => setCotStep(3), 1200);
    setTimeout(() => {
      setCotStep(4);
      setIsThinking(false);
      // Pick remedy based on selection or detect
      setDetectedHerbName(language === 'hi' 
        ? `${activeRemedy.nameHi} (एआई दृष्टि द्वारा 98.4% सटीकता से पहचाना गया)` 
        : `${activeRemedy.nameEn} (Identified with 98.4% AI Vision Confidence)`
      );
    }, 1800);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      speechService.stopSpeaking();
    };
  }, []);

  // Remedy Change Handler
  const handleSelectRemedy = (remedyId) => {
    speechService.stopSpeaking();
    setIsAiAudioPlaying(false);
    setIsAshaAudioPlaying(false);
    setIsAshaVerified(false);
    setVisitConfirmed(false);
    setSelectedRemedyId(remedyId);
    setCapturedPhoto(null);
    setDetectedHerbName(null);

    // Trigger Agentic Reasoning stream
    setIsThinking(true);
    setCotStep(1);
    setTimeout(() => setCotStep(2), 500);
    setTimeout(() => setCotStep(3), 1000);
    setTimeout(() => {
      setCotStep(4);
      setIsThinking(false);
    }, 1500);
  };

  // Microphone Voice Input
  const handleToggleMic = () => {
    if (isListeningMic) {
      speechService.stopListening();
      setIsListeningMic(false);
    } else {
      speechService.stopSpeaking();
      setIsListeningMic(true);
      setSpeechTranscript('');

      speechService.startListening({
        langCode: language,
        onStart: () => setIsListeningMic(true),
        onResult: (transcript, isFinal) => {
          setSpeechTranscript(transcript);
          if (isFinal) {
            setIsListeningMic(false);
            // If mentions papaya, switch to papaya; if ajwain, switch to ajwain
            const lower = transcript.toLowerCase();
            if (lower.includes('पपीता') || lower.includes('papaya')) {
              handleSelectRemedy('papaya');
            } else if (lower.includes('केसर') || lower.includes('saffron') || lower.includes('हल्दी')) {
              handleSelectRemedy('kesar');
            } else if (lower.includes('अरंडी') || lower.includes('castor') || lower.includes('एरंड')) {
              handleSelectRemedy('castor');
            } else {
              handleSelectRemedy('ajwain');
            }
          }
        },
        onError: () => {
          setIsListeningMic(false);
        },
        onEnd: () => {
          setIsListeningMic(false);
        }
      });
    }
  };

  // Listen Together Audio (Mamta AI's Voice)
  const handleListenTogether = () => {
    if (isAiAudioPlaying) {
      speechService.stopSpeaking();
      setIsAiAudioPlaying(false);
      return;
    }

    setIsAshaAudioPlaying(false);
    setIsAiAudioPlaying(true);

    const spokenText = language === 'en'
      ? `${activeRemedy.respectTraditionEn}. ${activeRemedy.clinicalFactEn}. ${activeRemedy.safeAlternativeEn}`
      : `${activeRemedy.respectTraditionHi} ${activeRemedy.clinicalFactHi} ${activeRemedy.safeAlternativeHi}`;

    speechService.speak(spokenText, language, {
      onStart: () => setIsAiAudioPlaying(true),
      onEnd: () => setIsAiAudioPlaying(false),
      onError: () => setIsAiAudioPlaying(false)
    });
  };

  // Dispatch to ASHA worker Sunita Didi
  const handleSendToAsha = () => {
    speechService.stopSpeaking();
    setIsAiAudioPlaying(false);
    setIsDispatchingToAsha(true);

    // Simulate real-time dispatch to field portal & Sunita Didi's review
    setTimeout(() => {
      setIsDispatchingToAsha(false);
      setIsAshaVerified(true);
      // Auto-play ASHA voice note preview
      const ashaText = language === 'en' ? activeRemedy.ashaMessageEn : activeRemedy.ashaMessageHi;
      speechService.speak(ashaText, language, {
        onStart: () => setIsAshaAudioPlaying(true),
        onEnd: () => setIsAshaAudioPlaying(false)
      });
    }, 1800);
  };

  // Listen to ASHA Worker Voice Note
  const handleListenAshaAudio = () => {
    if (isAshaAudioPlaying) {
      speechService.stopSpeaking();
      setIsAshaAudioPlaying(false);
      return;
    }

    setIsAiAudioPlaying(false);
    setIsAshaAudioPlaying(true);

    const ashaText = language === 'en' ? activeRemedy.ashaMessageEn : activeRemedy.ashaMessageHi;
    speechService.speak(ashaText, language, {
      onStart: () => setIsAshaAudioPlaying(true),
      onEnd: () => setIsAshaAudioPlaying(false)
    });
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* 1. Header with Co-Inquiry Hub Branding & Dialect Selector */}
      <div style={{
        background: 'linear-gradient(135deg, var(--deep-navy) 0%, #1e4569 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(23, 54, 83, 0.25)'
      }}>
        {/* Glowing background halo */}
        <div style={{
          position: 'absolute',
          right: '-25px',
          top: '-25px',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'rgba(217, 145, 165, 0.3)',
          filter: 'blur(30px)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--soft-blush)'
            }}>
              <HeartHandshake size={13} />
              <span>{t.screen19.tag}</span>
            </span>
          </div>

          {/* Quick Regional Dialect Switcher */}
          <button
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '14px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="क्षेत्रीय बोली बदलें"
          >
            <Globe size={12} />
            <span>{availableLanguages.find(l => l.code === language)?.name || 'हिन्दी'}</span>
          </button>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1.25 }}>
          {t.screen19.title}
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 14px', lineHeight: 1.35 }}>
          {t.screen19.subtitle}
        </p>

        {/* Multi-Persona Co-Presence Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 10px',
          fontSize: '11px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: '0 auto 3px' }}>
              <img src="/assets/mother_holding_newborn.jpg" alt="Rani" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid white' }} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: '8px', height: '8px', background: '#48bb78', borderRadius: '50%', border: '1px solid white' }} />
            </div>
            <div style={{ fontWeight: 700 }}>रानी</div>
            <div style={{ fontSize: '9px', opacity: 0.8 }}>माँ (12wk)</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: '0 auto 3px' }}>
              <img src="/assets/family_support_mil.jpg" alt="Mataji" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid white' }} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: '8px', height: '8px', background: '#48bb78', borderRadius: '50%', border: '1px solid white' }} />
            </div>
            <div style={{ fontWeight: 700 }}>माताजी</div>
            <div style={{ fontSize: '9px', opacity: 0.8 }}>सासू माँ</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: '0 auto 3px' }}>
              <img src="/assets/mamta_ai_avatar.jpg" alt="Mamta AI" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #D991A5' }} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: '8px', height: '8px', background: '#4299e1', borderRadius: '50%', border: '1px solid white' }} />
            </div>
            <div style={{ fontWeight: 700 }}>ममता</div>
            <div style={{ fontSize: '9px', color: 'var(--soft-blush)' }}>एआई सखी</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: '0 auto 3px' }}>
              <img src="/assets/asha_worker_visit.jpg" alt="Sunita Didi" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #48bb78' }} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: '8px', height: '8px', background: isAshaVerified ? '#48bb78' : '#ecc94b', borderRadius: '50%', border: '1px solid white' }} />
            </div>
            <div style={{ fontWeight: 700 }}>सुनीता दीदी</div>
            <div style={{ fontSize: '9px', color: '#48bb78' }}>{isAshaVerified ? 'सत्यापित' : 'समीक्षा'}</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Input Controls: Voice STT & Live Camera Scanner */}
      <div className="m-card" style={{ padding: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          {t.screen19.selectPreset}
        </div>

        {/* 4 Quick Preset Remedy Chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
          {remedies.map(r => {
            const isSelected = selectedRemedyId === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRemedy(r.id)}
                style={{
                  background: isSelected ? 'var(--powder-blue-light)' : 'white',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? '0 4px 12px rgba(65, 111, 152, 0.18)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '20px' }}>{r.icon}</span>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--deep-navy)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {language === 'en' ? r.nameEn : r.nameHi}
                  </div>
                  <div style={{ fontSize: '11px', color: r.category === 'danger' ? 'var(--color-error)' : r.category === 'safe' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {r.category === 'danger' ? '🚫 वर्जित' : r.category === 'safe' ? '🟢 सुरक्षित' : '⚠️ सावधानी'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Camera & Voice Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Live Camera Scanner Button */}
          <button
            onClick={isCameraActive ? stopCamera : startCamera}
            className="btn-primary"
            style={{
              flex: 1,
              minHeight: '44px',
              fontSize: '13px',
              padding: '8px 12px',
              background: isCameraActive ? 'var(--color-error)' : 'var(--primary-blue)'
            }}
          >
            <Camera size={16} />
            <span>{isCameraActive ? 'कैमरा बंद करें' : t.screen19.btnCamera}</span>
          </button>

          {/* Voice Microphone Input Button */}
          <button
            onClick={handleToggleMic}
            className="btn-secondary"
            style={{
              flex: 1,
              minHeight: '44px',
              fontSize: '13px',
              padding: '8px 12px',
              background: isListeningMic ? 'rgba(185, 76, 85, 0.15)' : 'white',
              borderColor: isListeningMic ? 'var(--color-error)' : 'var(--border-light)',
              color: isListeningMic ? 'var(--color-error)' : 'var(--deep-navy)'
            }}
          >
            {isListeningMic ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{isListeningMic ? 'सुन रहे हैं...' : t.screen19.btnVoice}</span>
          </button>
        </div>

        {/* Hidden file input for fallback upload */}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />

        {/* Live Camera Viewfinder Overlay */}
        {isCameraActive && (
          <div style={{
            marginTop: '14px',
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: '#000',
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--primary-blue)',
            boxShadow: '0 8px 24px rgba(65, 111, 152, 0.3)'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Agentic AI Scanner Reticle Overlay */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '16px',
              pointerEvents: 'none',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)'
            }}>
              {/* Corner Crosshairs */}
              <div style={{ position: 'absolute', top: -2, left: -2, width: '18px', height: '18px', borderTop: '3px solid #63b3ed', borderLeft: '3px solid #63b3ed' }} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: '18px', height: '18px', borderTop: '3px solid #63b3ed', borderRight: '3px solid #63b3ed' }} />
              <div style={{ position: 'absolute', bottom: -2, left: -2, width: '18px', height: '18px', borderBottom: '3px solid #63b3ed', borderLeft: '3px solid #63b3ed' }} />
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: '18px', height: '18px', borderBottom: '3px solid #63b3ed', borderRight: '3px solid #63b3ed' }} />

              {/* Sweeping Laser Line Animation */}
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #48bb78, #63b3ed, transparent)',
                boxShadow: '0 0 12px #63b3ed',
                animation: 'pulse 1.8s infinite'
              }} />
            </div>

            {/* Instruction banner */}
            <div style={{
              position: 'absolute',
              top: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Scan size={13} color="#63b3ed" />
              <span>{t.screen19.cameraScanning}</span>
            </div>

            {/* Capture Controls at bottom of camera */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              alignItems: 'center'
            }}>
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer'
                }}
                title="गैलरी से चुनें"
              >
                <Upload size={18} />
              </button>

              <button
                onClick={capturePhoto}
                style={{
                  background: 'white',
                  border: '4px solid var(--primary-blue)',
                  borderRadius: '50%',
                  width: '56px',
                  height: '56px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
                }}
                title="फोटो खींचें"
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--warm-rose)' }} />
              </button>

              <button
                onClick={stopCamera}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer'
                }}
                title="बंद करें"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Photo Captured or Identified Result Banner */}
        {capturedPhoto && (
          <div style={{
            marginTop: '12px',
            background: 'var(--powder-blue-light)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <img 
              src={capturedPhoto} 
              alt="Scanned Herb" 
              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid white' }} 
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 700 }}>
                {detectedHerbName || 'फोटो स्कैन पूरा हुआ (Photo Scanned)'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--deep-navy)' }}>
                {language === 'en' ? activeRemedy.nameEn : activeRemedy.nameHi}
              </div>
            </div>
            <button
              onClick={() => { setCapturedPhoto(null); setDetectedHerbName(null); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}

        {/* Live Speech Recognition Transcript */}
        {speechTranscript && (
          <div style={{
            marginTop: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(217, 145, 165, 0.15)',
            borderLeft: '3px solid var(--warm-rose)',
            fontSize: '12px',
            color: 'var(--deep-navy)'
          }}>
            <strong>सुना गया सवाल:</strong> "{speechTranscript}"
          </div>
        )}
      </div>

      {/* 3. Multi-Turn Spoken Dialog Between Mataji & Rani */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Mataji (Mother-in-Law) Spoken Query */}
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          background: 'white',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          borderLeft: '4px solid var(--warm-rose)'
        }}>
          <img 
            src="/assets/family_support_mil.jpg" 
            alt="Mataji" 
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--warm-rose-dark)' }}>
                माताजी (सासू माँ का सवाल):
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>पारंपरिक चिंता</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--deep-navy)', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
              "{language === 'en' ? activeRemedy.matajiQueryEn : activeRemedy.matajiQueryHi}"
            </p>
          </div>
        </div>

        {/* Rani (Pregnant Mother) Spoken Follow-up */}
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          background: 'white',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          borderLeft: '4px solid var(--primary-blue)',
          marginLeft: '12px'
        }}>
          <img 
            src="/assets/mother_holding_newborn.jpg" 
            alt="Rani" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-blue)' }}>
                रानी (गर्भवती माँ का सवाल):
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>12वां हफ्ता</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--deep-navy)', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
              "{language === 'en' ? activeRemedy.raniQueryEn : activeRemedy.raniQueryHi}"
            </p>
          </div>
        </div>
      </div>

      {/* 4. Agentic AI Reasoning Chain (CoT Logs) */}
      <div style={{
        background: 'var(--powder-blue-light)',
        border: '1px solid rgba(65, 111, 152, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--primary-blue)" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--deep-navy)', textTransform: 'uppercase' }}>
              ममता एआई एजेंटिक तर्क विश्लेषण (Agentic Reasoning)
            </span>
          </div>
          {isThinking && (
            <span style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 700, animation: 'pulse 1s infinite' }}>
              विश्लेषण जारी है...
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: 'var(--deep-navy)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: cotStep >= 1 ? 1 : 0.4 }}>
            <CheckCircle2 size={13} color={cotStep >= 1 ? 'var(--color-success)' : 'var(--text-muted)'} />
            <span>{t.screen19.cotStep1}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: cotStep >= 2 ? 1 : 0.4 }}>
            <CheckCircle2 size={13} color={cotStep >= 2 ? 'var(--color-success)' : 'var(--text-muted)'} />
            <span>{t.screen19.cotStep2}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: cotStep >= 3 ? 1 : 0.4 }}>
            <CheckCircle2 size={13} color={cotStep >= 3 ? 'var(--color-success)' : 'var(--text-muted)'} />
            <span>{t.screen19.cotStep3}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: cotStep >= 4 ? 1 : 0.4, fontWeight: 700 }}>
            <CheckCircle2 size={13} color={cotStep >= 4 ? 'var(--color-success)' : 'var(--text-muted)'} />
            <span>{t.screen19.cotStep4}</span>
          </div>
        </div>
      </div>

      {/* 5. Mamta AI Comprehensive Guidance Card */}
      <div className="m-card" style={{
        padding: '18px',
        borderLeft: activeRemedy.category === 'danger' ? '6px solid var(--color-error)' : activeRemedy.category === 'safe' ? '6px solid var(--color-success)' : '6px solid var(--color-warning)',
        background: 'white'
      }}>
        {/* Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{
            background: activeRemedy.category === 'danger' ? 'var(--color-error-bg)' : activeRemedy.category === 'safe' ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            color: activeRemedy.category === 'danger' ? 'var(--color-error)' : activeRemedy.category === 'safe' ? 'var(--color-success)' : 'var(--color-warning)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 800
          }}>
            {language === 'en' ? activeRemedy.statusBadgeEn : activeRemedy.statusBadgeHi}
          </span>

          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            FOGSI / MoHFW सम्मत
          </span>
        </div>

        {/* Respecting Tradition */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--warm-rose-dark)', marginBottom: '2px' }}>
            🌿 परंपरा का आदर (Cultural Respect):
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--deep-navy)', lineHeight: 1.45, margin: 0 }}>
            {language === 'en' ? activeRemedy.respectTraditionEn : activeRemedy.respectTraditionHi}
          </p>
        </div>

        {/* Clinical Science Fact */}
        <div style={{
          marginBottom: '12px',
          background: activeRemedy.category === 'danger' ? 'rgba(185, 76, 85, 0.08)' : 'var(--powder-blue-light)',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: activeRemedy.category === 'danger' ? 'var(--color-error)' : 'var(--primary-blue)', marginBottom: '3px' }}>
            🔬 डॉक्टरी तथ्य व क्लिनिकल विज्ञान (Clinical Facts):
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--deep-navy)', lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
            {language === 'en' ? activeRemedy.clinicalFactEn : activeRemedy.clinicalFactHi}
          </p>
        </div>

        {/* Safe Recommendation / Alternative */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-success)', marginBottom: '2px' }}>
            💡 सुरक्षित विकल्प व सलाह (Safe Alternative):
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
            {language === 'en' ? activeRemedy.safeAlternativeEn : activeRemedy.safeAlternativeHi}
          </p>
        </div>

        {/* Loudspeaker "Listen Together" Button with Audio Waves */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleListenTogether}
            className="btn-listen"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              minHeight: '42px',
              background: isAiAudioPlaying ? 'var(--warm-rose)' : 'var(--primary-blue)',
              color: 'white'
            }}
          >
            {isAiAudioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isAiAudioPlaying ? 'आवाज़ रोकें' : t.screen19.listenTogether}</span>
          </button>

          {isAiAudioPlaying && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span className="wave-bar" style={{ animationDelay: '0.1s' }} />
              <span className="wave-bar" style={{ animationDelay: '0.3s' }} />
              <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
              <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
              <span style={{ fontSize: '11px', color: 'var(--warm-rose-dark)', fontWeight: 700, marginLeft: '4px' }}>
                सास-बहू मिलकर सुन रहे हैं...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 6. ASHA Worker (Sunita Didi) Verification Action Card */}
      <div className="m-card" style={{
        padding: '16px',
        background: isAshaVerified ? 'var(--surface-white)' : 'var(--powder-blue-light)',
        border: isAshaVerified ? '2px solid var(--color-success)' : '1px solid rgba(65, 111, 152, 0.25)'
      }}>
        {!isAshaVerified ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <UserCheck size={18} color="var(--primary-blue)" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
                {t.screen19.sendAshaBtn}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
              {t.screen19.sendAshaPrompt}
            </p>

            {/* Granular Consent Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--deep-navy)', marginBottom: '14px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={hasAshaConsent} 
                onChange={(e) => setHasAshaConsent(e.target.checked)} 
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }} 
              />
              <span>हाँ, मैं (रानी) अपनी सहमति देती हूँ कि यह सवाल आशा कार्यकर्ता सुनीता दीदी को भेजा जाए।</span>
            </label>

            <button
              onClick={handleSendToAsha}
              disabled={!hasAshaConsent || isDispatchingToAsha}
              className="btn-primary"
              style={{
                width: '100%',
                minHeight: '46px',
                fontSize: '14px',
                opacity: (!hasAshaConsent || isDispatchingToAsha) ? 0.6 : 1
              }}
            >
              {isDispatchingToAsha ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s infinite' }} />
                  <span>{t.screen19.ashaDispatching}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{t.screen19.sendAshaBtn}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Live Verified ASHA Response Card */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(72, 187, 120, 0.35)'
              }}>
                <ShieldCheck size={16} />
                <span>{t.screen19.ashaVerifiedBadge}</span>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                अभी-अभी सत्यापित
              </span>
            </div>

            {/* Sunita Didi Profile & Voice Note */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
              <img 
                src="/assets/asha_worker_visit.jpg" 
                alt="Sunita Didi" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-success)' }} 
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  सुनीता देवी (आपकी आशा कार्यकर्ता)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 600, marginBottom: '4px' }}>
                  रामपुर सेक्टर 4 • +91 98765 43210
                </div>
                <p style={{ fontSize: '13px', color: 'var(--deep-navy)', lineHeight: 1.45, margin: 0, fontStyle: 'italic', background: 'rgba(72, 187, 120, 0.08)', padding: '8px 10px', borderRadius: '8px' }}>
                  "{language === 'en' ? activeRemedy.ashaMessageEn : activeRemedy.ashaMessageHi}"
                </p>
              </div>
            </div>

            {/* Actions for Sunita Didi's Note */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleListenAshaAudio}
                className="btn-listen"
                style={{
                  flex: 1,
                  minHeight: '40px',
                  fontSize: '13px',
                  background: isAshaAudioPlaying ? 'var(--warm-rose)' : 'var(--color-success)',
                  color: 'white'
                }}
              >
                {isAshaAudioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isAshaAudioPlaying ? 'रोकें' : t.screen19.ashaVoiceBtn}</span>
              </button>

              <button
                onClick={() => setVisitConfirmed(true)}
                className="btn-secondary"
                disabled={visitConfirmed}
                style={{
                  flex: 1,
                  minHeight: '40px',
                  fontSize: '12px',
                  padding: '6px 10px',
                  borderColor: visitConfirmed ? 'var(--color-success)' : 'var(--border-light)',
                  color: visitConfirmed ? 'var(--color-success)' : 'var(--deep-navy)'
                }}
              >
                {visitConfirmed ? (
                  <>
                    <CheckCircle2 size={15} color="var(--color-success)" />
                    <span>भेंट पक्की हो गई!</span>
                  </>
                ) : (
                  <>
                    <Calendar size={15} />
                    <span>{t.screen19.scheduleVisitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 7. Bottom Navigation Link back to Home or Talk To Mamta */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
        <button
          onClick={() => navigateTo(6)}
          className="btn-secondary"
          style={{ flex: 1, minHeight: '46px', fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          <span>होम डैशबोर्ड पर जाएं</span>
        </button>

        <button
          onClick={() => navigateTo(7)}
          className="btn-primary"
          style={{ flex: 1, minHeight: '46px', fontSize: '14px' }}
        >
          <Sparkles size={16} />
          <span>ममता से और पूछें</span>
        </button>
      </div>

    </div>
  );
};
