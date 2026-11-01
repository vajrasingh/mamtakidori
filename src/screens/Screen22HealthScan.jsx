import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Camera, 
  Activity, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  FileText, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  RefreshCw, 
  Sun, 
  UserCheck, 
  Eye, 
  HelpCircle,
  PhoneCall,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';

export const Screen22HealthScan = () => {
  const { navigateTo, speakText, stopAudio, isSpeaking, language, setHealthRecords } = useApp();
  
  // Step modes: 'guidelines' -> 'faceScan' -> 'nailsPrompt' -> 'report'
  const [scanStep, setScanStep] = useState('guidelines');
  const [scanProgress, setScanProgress] = useState(0);
  const [simulatedPulse, setSimulatedPulse] = useState(74);
  const [isSentToAsha, setIsSentToAsha] = useState(false);
  const [isSentToDoctor, setIsSentToDoctor] = useState(false);
  const [isSavedToRecords, setIsSavedToRecords] = useState(false);
  const [isSpeakingReport, setIsSpeakingReport] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Initialize camera for scanning
  const startCamera = async () => {
    setCameraError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable, using simulated scanner stream:", err);
      setCameraError(true);
      setCameraActive(true); // Allow simulation
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Handle starting face scan
  const handleStartScan = async () => {
    setScanStep('faceScan');
    setScanProgress(0);
    await startCamera();

    speakText(language === 'hi' 
      ? "कृपया चेहरा स्थिर रखें। चेहरे और आंखों की पुतली से रक्तचाप, हृदय गति और पीलापन स्कैन किया जा रहा है।" 
      : "Please keep your face steady. Scanning micro-pulse, blood pressure, and facial pallor."
    );

    let progress = 0;
    progressTimerRef.current = setInterval(() => {
      progress += 4;
      setScanProgress(Math.min(progress, 100));
      setSimulatedPulse(prev => 72 + Math.floor(Math.sin(progress) * 5));

      if (progress >= 100) {
        clearInterval(progressTimerRef.current);
        // Transition to secondary nails check prompt
        setTimeout(() => {
          setScanStep('nailsPrompt');
          speakText(language === 'hi'
            ? "चेहरा स्कैन पूर्ण हुआ। संभावित रक्ताल्पता की जांच हेतु नाखूनों की फोटो लें या सीधे रिपोर्ट देखें।"
            : "Face scan complete. Capture fingernails for deeper anemia check or continue to report."
          );
        }, 600);
      }
    }, 150);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  // Handle Capture Nails or Skip
  const handleCaptureNails = () => {
    speakText(language === 'hi' ? "नाखून का पीलापन स्कैन कर लिया गया है। रिपोर्ट तैयार हो रही है।" : "Nails scanned. Generating clinical summary report.");
    setTimeout(() => {
      stopCamera();
      setScanStep('report');
    }, 800);
  };

  const handleSkipNails = () => {
    stopCamera();
    setScanStep('report');
  };

  // Speak Report Summary
  const handleListenReport = () => {
    if (isSpeakingReport || isSpeaking) {
      stopAudio();
      setIsSpeakingReport(false);
      return;
    }
    setIsSpeakingReport(true);
    const text = language === 'hi'
      ? "स्कैन परिणाम: अनुमानित हीमोग्लोबिन 10.4 ग्राम प्रति डेसीलीटर है, जो हल्के पीलेपन और रक्ताल्पता का संकेत देता है। रक्तचाप 120 बटा 78 सामान्य है और हृदय गति 76 है। सूचना: यह एआई आधारित अनुमान है, पक्का निदान नहीं। कृपया अस्पताल में डॉक्टर से पुष्टि कराएं।"
      : "Scan result: Estimated hemoglobin is 10.4 grams per deciliter, indicating mild pallor and anemia. Blood pressure is 120 over 78, normal range, with heart rate 76 bpm. Notice: This is an AI screening and not a certified clinical diagnosis. Please confirm at the hospital.";
    speakText(text);
  };

  // Send to ASHA Worker
  const handleSendToAsha = () => {
    setIsSentToAsha(true);
    speakText(language === 'hi' 
      ? "रिपोर्ट आशा कार्यकर्ता सुनीता दीदी को भेज दी गई है। वे आपसे संपर्क करेंगी।" 
      : "Scan report dispatched to ASHA worker Sunita Devi. She will follow up."
    );
  };

  // Send to Doctor
  const handleSendToDoctor = () => {
    setIsSentToDoctor(true);
    speakText(language === 'hi' 
      ? "रिपोर्ट पीएचसी रामपुर के डॉक्टर प्रिया सिंह को सत्यापन हेतु भेज दी गई है।" 
      : "Report submitted to Dr. Priya Singh at Rampur PHC for clinical review."
    );
  };

  // Save to Health Records
  const handleSaveToRecords = () => {
    setIsSavedToRecords(true);
    setHealthRecords(prev => [
      {
        id: Date.now(),
        type: 'ai_scan',
        title: 'एआई पल्लर व स्वास्थ्य पैरामीटर स्कैन (Hb 10.4)',
        titleEn: 'AI Pallor & Vital Parameters Scan (Hb 10.4)',
        date: language === 'hi' ? 'आज • 2 नवंबर 2026' : 'Today • 2 Nov 2026',
        dateEn: '2 Nov 2026',
        doctor: 'AI पल्लर बायो-सेंसर (rPPG)',
        doctorEn: 'AI Pallor Bio-Sensor (rPPG)',
        status: 'हल्का एनीमिया (परामर्श देय)',
        statusEn: 'Mild Anemia (Advisory)',
        imageUrl: '/assets/doctor_prenatal_clinic.jpg'
      },
      ...prev
    ]);
    speakText(language === 'hi' ? "स्कैन रिपोर्ट आपके हेल्थ रिकॉर्ड में सुरक्षित सहेज ली गई है।" : "Report saved to your permanent health records.");
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            stopCamera();
            navigateTo(6);
          }}
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

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--deep-navy)', margin: 0 }}>
            {language === 'hi' ? 'AI पल्लर व स्वास्थ्य स्कैन' : 'AI Pallor & Vitals Scan'}
          </h2>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            rPPG & Anemia Screening
          </div>
        </div>

        <div style={{ width: '38px' }} />
      </div>

      {/* ================= STEP 1: GUIDELINES ================= */}
      {scanStep === 'guidelines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #173653 0%, #2A5A84 100%)',
            borderRadius: '24px',
            padding: '18px',
            color: 'white',
            boxShadow: '0 8px 24px rgba(23, 54, 83, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#FFE2EA',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} />
                <span>rPPG कैमरा तकनीक</span>
              </div>
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 6px', lineHeight: 1.25 }}>
              {language === 'hi' ? 'चेहरे व आंखों से स्वास्थ्य जांचें' : 'Check Vitals via Facial rPPG'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.4 }}>
              {language === 'hi' 
                ? 'कैमरा आंखों और त्वचा के रक्त प्रवाह से बीपी, पल्स और खून की कमी (पीलापन) का त्वरित अनुमान लगाता है।' 
                : 'Measures blood volume pulse, heart rate, and pallor through micro-facial capillary reflections.'}
            </p>
          </div>

          {/* Visual Scan Guide Illustration (Added above instructions) */}
          <div style={{
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(65, 111, 152, 0.12)',
            background: 'white',
            border: '2px solid white'
          }}>
            <img 
              src="/assets/ai_pallor_scan_guide.jpg" 
              alt="AI Pallor and Vitals Facial Scan Guide"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '190px',
                objectFit: 'cover'
              }}
            />
            <div style={{
              padding: '10px 14px',
              background: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: 'var(--deep-navy)',
              fontWeight: 700
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
                <span>{language === 'hi' ? 'स्मार्टफोन कैमरा आधारित बायो-ऑप्टिकल स्कैनिंग' : 'Smartphone camera bio-optical scanning'}</span>
              </div>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>rPPG AI</span>
            </div>
          </div>

          {/* Essential Rules / Guidelines Card */}
          <div style={{
            background: 'white',
            borderRadius: '22px',
            padding: '16px 18px',
            boxShadow: '0 6px 20px rgba(65, 111, 152, 0.08)'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '12px' }}>
              📋 {language === 'hi' ? 'स्कैन से पहले जरूरी नियम' : 'Scan Rules for Accurate Results'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sun size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {language === 'hi' ? '1. पर्याप्त व साफ रोशनी' : '1. Proper Natural Lighting'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {language === 'hi' ? 'चेहरे पर सीधी रोशनी हो, कोई परछाई या अंधेरा न हो।' : 'Ensure bright, even light with no dark shadows.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#E0F2FE',
                  color: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {language === 'hi' ? '2. सीधा चेहरा व आंखें खुली रखें' : '2. Face Front & Eyes Visible'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {language === 'hi' ? 'कैमरे के बिल्कुल सामने देखें, चश्मा उतार लें।' : 'Look straight into lens at eye level; remove glasses.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#F1F5F9',
                  color: 'var(--deep-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {language === 'hi' ? '3. सादी पृष्ठभूमि व 5 सेकंड स्थिरता' : '3. Plain Background & Hold Still'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {language === 'hi' ? 'पीछे सादी दीवार हो और स्कैन होते समय सिर न हिलाएं।' : 'Keep plain background, no movement for 5 seconds.'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={handleStartScan}
            className="btn-primary"
            style={{ minHeight: '50px', fontSize: '16px', borderRadius: '24px', boxShadow: '0 6px 20px rgba(65, 111, 152, 0.28)' }}
          >
            <Camera size={20} />
            <span>{language === 'hi' ? '📷 कैमरा खोलें व स्कैन शुरू करें' : '📷 Open Camera & Start Scan'}</span>
          </button>
        </div>
      )}

      {/* ================= STEP 2: LIVE FACE SCANNER ================= */}
      {scanStep === 'faceScan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          
          {/* Camera Viewfinder Viewport */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '340px',
            height: '340px',
            borderRadius: '32px',
            overflow: 'hidden',
            background: '#0B192C',
            boxShadow: '0 12px 36px rgba(11, 25, 44, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Real Video Element */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)' // Mirror mode
              }} 
            />

            {/* Simulated fallback feed if real camera not allowed */}
            {cameraError && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assets/maternal_joy_hero.jpg" 
                  alt="Face Simulation" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                />
              </div>
            )}

            {/* Biometric Face Oval Target HUD */}
            <div style={{
              position: 'absolute',
              width: '210px',
              height: '270px',
              borderRadius: '50%',
              border: `3px dashed ${scanProgress > 70 ? 'var(--color-success)' : 'var(--warm-rose)'}`,
              boxShadow: scanProgress > 70 ? '0 0 24px rgba(46, 133, 64, 0.6)' : '0 0 24px rgba(217, 145, 165, 0.6)',
              pointerEvents: 'none',
              transition: 'all 0.3s'
            }}>
              {/* Eye Level Guideline */}
              <div style={{
                position: 'absolute',
                top: '36%',
                left: '15px',
                right: '15px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.4)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-9px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '1px 6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  letterSpacing: '0.5px'
                }}>
                  EYES (rPPG)
                </div>
              </div>
            </div>

            {/* Scan Beam Radar Animation */}
            <div style={{
              position: 'absolute',
              top: `${scanProgress}%`,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #38BDF8, #F472B6, transparent)',
              boxShadow: '0 0 12px #38BDF8',
              pointerEvents: 'none',
              transition: 'top 0.1s linear'
            }} />

            {/* Live Pulse Metric Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '8px 14px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={18} color="var(--warm-rose)" style={{ animation: 'pulse 0.8s infinite' }} />
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>PULSE (rPPG)</div>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>{simulatedPulse} bpm</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>PROGRESS</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#38BDF8' }}>{scanProgress}%</div>
              </div>
            </div>
          </div>

          {/* Status Instruction */}
          <div style={{ textAlign: 'center', maxWidth: '300px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
              {language === 'hi' ? 'स्थिर रहें, सूक्ष्म रक्त प्रवाह स्कैन हो रहा है...' : 'Hold still, measuring blood volume pulse...'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {language === 'hi' ? 'आंखों व गालों के रंग से हीमोग्लोबिन स्तर मापा जा रहा है' : 'Analyzing conjunctival & dermal color perfusion'}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3: NAIL BED SCAN PROMPT ================= */}
      {scanStep === 'nailsPrompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '18px',
            boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FFF5F5',
              color: '#E03131',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: '28px'
            }}>
              💅
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 6px' }}>
              {language === 'hi' ? 'नाखूनों का द्वितीयक स्कैन' : 'Fingernail Bed Pallor Check'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 16px' }}>
              {language === 'hi' 
                ? 'चेहरे के स्कैन में हल्का पीलापन दिखा है। सटीक जांच के लिए कृपया अपने हाथ के नाखूनों की फोटो लें।' 
                : 'Slight dermal pallor detected. To improve hemoglobin accuracy, capture your fingernail beds.'}
            </p>

            {/* Nail Target Box Mockup */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '18px',
              border: '2px dashed var(--primary-blue)',
              padding: '24px 16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '32px' }}>✋</span>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-blue)' }}>
                {language === 'hi' ? 'उंगलियों को कैमरे के सामने रखें' : 'Hold fingertips flat in front of camera'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCaptureNails}
                className="btn-primary"
                style={{ flex: 1, minHeight: '46px', fontSize: '14px' }}
              >
                <Camera size={18} />
                <span>{language === 'hi' ? 'नाखून फोटो लें' : 'Capture Nails'}</span>
              </button>

              <button
                onClick={handleSkipNails}
                className="btn-secondary"
                style={{ flex: 1, minHeight: '46px', fontSize: '14px' }}
              >
                <span>{language === 'hi' ? 'छोड़ें व रिपोर्ट देखें' : 'Skip to Report'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: RESULT REPORT ================= */}
      {scanStep === 'report' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Main Status Badge Card */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '18px',
            boxShadow: '0 8px 24px rgba(65, 111, 152, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{
                background: '#FFF4E6',
                color: '#D9480F',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <AlertTriangle size={14} color="#D9480F" />
                <span>{language === 'hi' ? 'हल्का पीलापन (परामर्श देय)' : 'Mild Pallor Detected'}</span>
              </div>

              <button
                onClick={handleListenReport}
                style={{
                  background: isSpeakingReport ? 'var(--warm-rose)' : 'var(--powder-blue)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '5px 12px',
                  color: isSpeakingReport ? 'white' : 'var(--primary-blue)',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                {isSpeakingReport ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isSpeakingReport ? (language === 'en' ? 'Stop' : 'रोकें') : (language === 'en' ? 'Listen' : 'रिपोर्ट सुनें')}</span>
              </button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', margin: '0 0 4px' }}>
              {language === 'hi' ? 'स्वास्थ्य पैरामीटर रिपोर्ट सारांश' : 'Vitals & Pallor Summary Report'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 16px' }}>
              {language === 'hi' ? 'स्कैन समय: आज, 09:42 AM • रानी देवी (24 वर्ष)' : 'Scan timestamp: Today, 09:42 AM • Rani Devi (24 Yrs)'}
            </p>

            {/* 4 Clinical Metric Tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              
              {/* Metric 1: Hemoglobin / Pallor */}
              <div style={{ background: '#FFF5F5', padding: '12px', borderRadius: '16px', border: '1px solid #FFE3E3' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#C92A2A', textTransform: 'uppercase' }}>
                  {language === 'hi' ? 'अनुमानित हीमोग्लोबिन' : 'Estimated Hb'}
                </div>
                <div style={{ fontSize: '19px', fontWeight: 800, color: '#C92A2A', marginTop: '2px' }}>
                  10.4 g/dL
                </div>
                <div style={{ fontSize: '11px', color: '#D9480F', fontWeight: 700 }}>
                  {language === 'hi' ? 'हल्की रक्ताल्पता (Mild)' : 'Mild Pallor'}
                </div>
              </div>

              {/* Metric 2: Blood Pressure */}
              <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '16px', border: '1px solid #DCFCE7' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#15803D', textTransform: 'uppercase' }}>
                  {language === 'hi' ? 'रक्तचाप (BP rPPG)' : 'Estimated BP'}
                </div>
                <div style={{ fontSize: '19px', fontWeight: 800, color: '#15803D', marginTop: '2px' }}>
                  120/78
                </div>
                <div style={{ fontSize: '11px', color: '#15803D', fontWeight: 700 }}>
                  {language === 'hi' ? '✅ सामान्य (Normal)' : '✅ Optimal'}
                </div>
              </div>

              {/* Metric 3: Heart Rate */}
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'hi' ? 'हृदय गति (Heart Rate)' : 'Heart Rate'}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
                  76 bpm
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {language === 'hi' ? 'नियमित पल्स' : 'Steady rhythm'}
                </div>
              </div>

              {/* Metric 4: SpO2 */}
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'hi' ? 'ऑक्सीजन (SpO2)' : 'Oxygen SpO2'}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', marginTop: '2px' }}>
                  98%
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>
                  {language === 'hi' ? 'उत्तम' : 'Optimal'}
                </div>
              </div>

            </div>

            {/* Mandatory AI Disclaimer (Requested explicitly) */}
            <div style={{
              background: '#FFF9DB',
              borderRadius: '16px',
              padding: '12px 14px',
              borderLeft: '4px solid #F59F00',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Info size={16} color="#F59F00" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#D97706' }}>
                  {language === 'hi' ? 'महत्वपूर्ण सूचना (AI आधारित अनुमान):' : 'Important Clinical Disclaimer (AI Estimate):'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#92400E', margin: 0, lineHeight: 1.45 }}>
                {language === 'hi' 
                  ? 'यह रिपोर्ट कैमरा और AI द्वारा की गई प्रारंभिक स्क्रीनिंग है और यह अंतिम मेडिकल निदान नहीं है। अंतिम पुष्टि के लिए हमेशा प्राथमिक स्वास्थ्य केंद्र (PHC) जाकर डॉक्टर से लैब टेस्ट कराएं।' 
                  : 'This report is generated via camera AI screening and is not a definitive medical diagnosis. Always visit your PHC medical officer for lab blood tests.'}
              </p>
            </div>

            {/* Doctor Recommended Suggestions */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              padding: '12px 14px',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
                💡 {language === 'hi' ? 'सुझाव व आगामी कदम' : 'Recommended Actions'}
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <li>{language === 'hi' ? '5 नवंबर को रामपुर PHC में खून की नियमित हीमोग्लोबिन जांच कराएं।' : 'Complete laboratory Hb screening at Rampur PHC on 5 Nov.'}</li>
                <li>{language === 'hi' ? 'प्रतिदिन 1 लाल आयरन-फोलिक एसिड गोली दोपहर भोजन के बाद अवश्य लें।' : 'Take 1 red Iron-Folic Acid tablet daily after lunch.'}</li>
                <li>{language === 'hi' ? 'आहार में हरी पालक, चना, गुड़ और नींबू पानी शामिल करें।' : 'Include spinach, lentils, jaggery, and citrus in daily diet.'}</li>
              </ul>
            </div>

            {/* Escalation & Notifications: Send to ASHA, Doctor, Save to Records */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              {/* Send to ASHA */}
              <button
                onClick={handleSendToAsha}
                disabled={isSentToAsha}
                style={{
                  background: isSentToAsha ? 'var(--color-success-bg)' : '#FFF5F0',
                  color: isSentToAsha ? 'var(--color-success)' : 'var(--warm-rose-dark)',
                  border: isSentToAsha ? '1px solid var(--color-success)' : '1px solid var(--soft-blush)',
                  borderRadius: '16px',
                  padding: '11px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: isSentToAsha ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCheck size={18} />
                  <span>{isSentToAsha ? (language === 'hi' ? '✅ आशा दीदी (सुनीता जी) को भेज दी गई' : '✅ Dispatched to ASHA Worker') : (language === 'hi' ? 'आशा दीदी को रिपोर्ट भेजें' : 'Send Report to ASHA Worker')}</span>
                </div>
                {!isSentToAsha && <Send size={15} />}
              </button>

              {/* Send to Doctor for Verification */}
              <button
                onClick={handleSendToDoctor}
                disabled={isSentToDoctor}
                style={{
                  background: isSentToDoctor ? 'var(--color-success-bg)' : '#F0F7FD',
                  color: isSentToDoctor ? 'var(--color-success)' : 'var(--primary-blue)',
                  border: isSentToDoctor ? '1px solid var(--color-success)' : '1px solid var(--powder-blue)',
                  borderRadius: '16px',
                  padding: '11px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: isSentToDoctor ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} />
                  <span>{isSentToDoctor ? (language === 'hi' ? '✅ PHC डॉक्टर को सत्यापन हेतु भेजी गई' : '✅ Sent to PHC Doctor for Verification') : (language === 'hi' ? 'PHC डॉक्टर को सत्यापन हेतु भेजें' : 'Submit to PHC Doctor')}</span>
                </div>
                {!isSentToDoctor && <Send size={15} />}
              </button>

              {/* Save to Health Records */}
              <button
                onClick={handleSaveToRecords}
                disabled={isSavedToRecords}
                style={{
                  background: isSavedToRecords ? 'var(--color-success)' : 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: isSavedToRecords ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(65, 111, 152, 0.25)'
                }}
              >
                <FileText size={17} />
                <span>{isSavedToRecords ? (language === 'hi' ? '✅ हेल्थ रिकॉर्ड्स में सुरक्षित' : '✅ Saved to Health Records') : (language === 'hi' ? 'हेल्थ रिकॉर्ड में सहेजें' : 'Save to Health Records')}</span>
              </button>

            </div>
          </div>

          {/* Retake Scan / Return */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                setScanStep('guidelines');
                setIsSentToAsha(false);
                setIsSentToDoctor(false);
                setIsSavedToRecords(false);
              }}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '44px', fontSize: '13px' }}
            >
              <RefreshCw size={15} />
              <span>{language === 'hi' ? 'पुनः स्कैन करें' : 'Retake Scan'}</span>
            </button>

            <button
              onClick={() => navigateTo(6)}
              className="btn-primary"
              style={{ flex: 1, minHeight: '44px', fontSize: '13px' }}
            >
              <span>{language === 'hi' ? 'होम पर जाएं' : 'Back to Home'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
