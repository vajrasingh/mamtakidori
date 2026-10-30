import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Calendar, 
  Bell, 
  PhoneCall, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Share2,
  ChevronRight
} from 'lucide-react';

export const Screen07TalkToMamta = () => {
  const { 
    isListening, 
    setIsListening, 
    isSpeaking, 
    speakText, 
    stopAudio, 
    navigateTo, 
    t, 
    language 
  } = useApp();

  // Voice Interaction State: 'ready' | 'listening' | 'understanding' | 'responding' | 'complete' | 'unrecognized'
  const [aiState, setAiState] = useState('ready');
  const [userQuery, setUserQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState(null);
  const [actionDone, setActionDone] = useState(false);

  // Pre-configured Responses & Action Cards
  const knowledgeBase = {
    checkup: {
      queryHi: "मेरा अगला अस्पताल चेकअप कब है?",
      queryEn: "When is my next hospital check-up?",
      spokenHi: "रानी जी, आपका पहला त्रैमासिक चेकअप 5 नवंबर को प्राथमिक स्वास्थ्य केंद्र में देय है। इसमें खून और पेशाब की जरूरी जांच होगी ताकि खून की कमी न हो। क्या मैं आपके लिए इसका रिमाइंडर सेट कर दूँ?",
      spokenEn: "Rani, your first trimester check-up is scheduled for 5 November at the Primary Health Centre. This includes important blood and urine tests to prevent anemia. Shall I set a reminder for you?",
      actionType: 'checkup',
      date: '5 नवंबर 2026',
      why: language === 'hi' ? 'हीमोग्लोबिन और बीपी की नियमित जांच' : 'Hemoglobin & BP routine monitoring'
    },
    weakness: {
      queryHi: "मुझे बहुत कमजोरी और चक्कर आ रहे हैं",
      queryEn: "I am feeling very tired and weak",
      spokenHi: "कमजोरी और चक्कर आना अक्सर शरीर में खून की कमी यानी एनीमिया का लक्षण हो सकता है। आप रोजाना दोपहर के भोजन के बाद 1 लाल आयरन की गोली जरूर लें और हरी पत्तेदार सब्जियां खाएं। अगर चक्कर बहुत तेज हों, तो तुरंत स्वास्थ्य केंद्र जाएं।",
      spokenEn: "Weakness and dizziness can often be a sign of anemia (low iron). Please make sure to take your red Iron & Folic Acid tablet daily after lunch with water, and eat green leafy vegetables. If dizziness is severe, please visit the health centre.",
      actionType: 'symptom',
      severity: 'moderate',
      recommendation: language === 'hi' ? 'आयरन की गोली + हरी सब्जियां' : 'Iron tablet + Green vegetables'
    },
    remedy: {
      queryHi: "क्या गर्भावस्था में केसर दूध सुरक्षित है?",
      queryEn: "Is saffron milk safe during pregnancy?",
      spokenHi: "हाँ, सीमित मात्रा में 1-2 धागे केसर वाला गुनगुना दूध आमतौर पर सुरक्षित और आरामदायक होता है। यह माँ को अच्छी नींद देने में मदद करता है। ध्यान रहे कि किसी भी नुस्खे का अत्यधिक सेवन न करें और कच्चा पपीता खाने से बचें।",
      spokenEn: "Yes, a warm glass of milk with 1 or 2 strands of saffron in moderation is generally safe and soothing. It helps mothers rest peacefully. Remember to avoid excessive quantities, and avoid unripe papaya. If unsure, consult your ASHA worker.",
      actionType: 'remedy',
      status: language === 'hi' ? 'सीमित मात्रा में सुरक्षित (Safe in Moderation)' : 'Safe in Moderation'
    },
    scan: {
      queryHi: "सोनोग्राफी में क्या पता चलता है?",
      queryEn: "What does an ultrasound scan check?",
      spokenHi: "सोनोग्राफी से शिशु के अंगों के विकास, दिल की धड़कन और गर्भनाल की स्थिति की सुरक्षित जांच होती है। यह माँ और बच्चे दोनों के लिए पूरी तरह सुरक्षित है और इसमें कोई दर्द नहीं होता।",
      spokenEn: "An ultrasound safely checks your baby's physical development, heartbeat, and placenta location. It is completely safe, painless, and uses sound waves rather than radiation.",
      actionType: 'education'
    }
  };

  // Start Voice Listening
  const handleStartListening = () => {
    stopAudio();
    setUserQuery('');
    setActiveResponse(null);
    setAiState('listening');
    setIsListening(true);

    speechService.startListening({
      lang: language,
      onResult: (transcript, isFinal) => {
        setUserQuery(transcript);
        if (isFinal) {
          processQuery(transcript);
        }
      },
      onError: (err) => {
        console.warn('STT Error, falling back to simulated query:', err);
        const fallbackText = language === 'hi' ? "मेरा अगला चेकअप कब है?" : "When is my next hospital check-up?";
        setUserQuery(fallbackText);
        processQuery(fallbackText);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  // Process Query & Trigger Agentic Response
  const processQuery = (queryText) => {
    setIsListening(false);
    setAiState('understanding');

    setTimeout(() => {
      let matchedResponse = knowledgeBase.checkup;
      const lower = queryText.toLowerCase();

      if (lower.includes('कमजोरी') || lower.includes('थकान') || lower.includes('weak') || lower.includes('tired')) {
        matchedResponse = knowledgeBase.weakness;
      } else if (lower.includes('केसर') || lower.includes('दूध') || lower.includes('नुस्खा') || lower.includes('saffron') || lower.includes('remedy')) {
        matchedResponse = knowledgeBase.remedy;
      } else if (lower.includes('सोनोग्राफी') || lower.includes('अल्ट्रासाउंड') || lower.includes('scan') || lower.includes('ultrasound')) {
        matchedResponse = knowledgeBase.scan;
      }

      setActiveResponse(matchedResponse);
      setAiState('responding');

      const speech = language === 'hi' ? matchedResponse.spokenHi : matchedResponse.spokenEn;
      speakText(speech);
    }, 1200);
  };

  // Select a suggested chip
  const handleSelectChip = (topicKey) => {
    stopAudio();
    const item = knowledgeBase[topicKey];
    const text = language === 'hi' ? item.queryHi : item.queryEn;
    setUserQuery(text);
    processQuery(text);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--powder-blue)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: '8px' }}>
          <Sparkles size={14} color="var(--primary-blue)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--deep-navy)' }}>
            {t.screen07.headerTitle}
          </span>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {aiState === 'listening' ? t.screen07.listeningText :
           aiState === 'understanding' ? t.screen07.understandingText :
           aiState === 'responding' ? t.screen07.speakingText :
           t.screen07.readyText}
        </p>
      </div>

      {/* 3D Glassmorphism Glowing Voice Orb */}
      <div className="ai-orb-experience-stage">
        <div className="ai-orb-container" onClick={handleStartListening}>
          <div className="ai-orb-glow-backdrop" />
          <div className="ai-orb-ring" />
          <div className="ai-orb-ring-outer" />
          <div className={`ai-orb-sphere ${aiState === 'listening' ? 'is-listening' : isSpeaking ? 'is-speaking' : ''}`}>
            {aiState === 'listening' ? (
              <MicOff size={48} color="var(--color-error)" />
            ) : isSpeaking ? (
              <Volume2 size={48} color="white" />
            ) : (
              <Mic size={52} color="white" />
            )}
          </div>
        </div>

        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-blue)', marginTop: '-12px' }}>
          {aiState === 'listening' ? (language === 'hi' ? 'ममता सुन रही है... बोलिए' : 'Mamta is listening...') : t.screen07.micTapHint}
        </p>

        {/* Sound Equalizer Waves */}
        <div className={`sound-waves-bar ${aiState === 'listening' || isSpeaking ? 'active' : ''}`}>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
          <span className="sound-wave-pillar"></span>
        </div>
      </div>

      {/* Active Conversation or Result Card */}
      {userQuery && (
        <div style={{
          background: 'var(--surface-white)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          boxShadow: 'var(--shadow-sm)',
          border: '1.5px solid var(--powder-blue)',
          marginBottom: '16px'
        }}>
          {/* User Asked */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {language === 'hi' ? 'आपने पूछा:' : 'You asked:'}
            </span>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)' }}>
              "{userQuery}"
            </div>
          </div>

          {/* Mamta Answered */}
          {activeResponse && (
            <div>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {language === 'hi' ? activeResponse.spokenHi : activeResponse.spokenEn}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid rgba(65, 111, 152, 0.1)', paddingTop: '12px' }}>
                <button
                  onClick={() => speakText(language === 'hi' ? activeResponse.spokenHi : activeResponse.spokenEn)}
                  className="btn-listen"
                  style={{ fontSize: '13px', padding: '6px 12px' }}
                >
                  <RotateCcw size={14} />
                  <span>{t.app.replay}</span>
                </button>

                {activeResponse.actionType === 'checkup' && (
                  <button
                    onClick={() => {
                      setActionDone(true);
                      speakText(language === 'hi' ? "5 नवंबर का चेकअप रिमाइंडर सेव हो गया है।" : "Checkup reminder saved for 5 November.");
                    }}
                    className="btn-secondary"
                    style={{ width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                  >
                    {actionDone ? <CheckCircle2 size={14} color="var(--color-success)" /> : <Bell size={14} />}
                    <span>{actionDone ? (language === 'hi' ? 'सेव हो गया' : 'Saved') : t.screen07.actionRemind}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo(16)}
                  className="btn-secondary"
                  style={{ width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                >
                  <PhoneCall size={14} color="var(--primary-blue)" />
                  <span>{t.screen07.actionCallAsha}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Questions (Chips) */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px' }}>
          {t.screen07.suggestedHeading}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => handleSelectChip('checkup')}
            className="category-card"
            style={{ padding: '12px 14px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} color="var(--primary-blue)" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.screen07.chip2}
              </span>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </button>

          <button
            onClick={() => handleSelectChip('weakness')}
            className="category-card"
            style={{ padding: '12px 14px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={18} color="var(--warm-rose-dark)" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.screen07.chip1}
              </span>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </button>

          <button
            onClick={() => handleSelectChip('remedy')}
            className="category-card"
            style={{ padding: '12px 14px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={18} color="var(--color-warning)" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.screen07.chip3}
              </span>
            </div>
            <ChevronRight size={16} color="var(--text-muted)" />
          </button>

          {/* Direct Link to Screen 19: Family Remedy AI & ASHA Flow */}
          <button
            onClick={() => navigateTo(19)}
            className="category-card"
            style={{ 
              padding: '12px 14px', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              textAlign: 'left',
              background: 'var(--powder-blue-light)',
              border: '1.5px solid var(--primary-blue)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🌿</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)' }}>
                {language === 'hi' 
                  ? 'सास-बहू घरेलू नुस्खा एआई सत्यापन (आशा दीदी द्वारा जांच)' 
                  : 'Family Home Remedy AI Flow (Verify with ASHA)'}
              </span>
            </div>
            <ChevronRight size={16} color="var(--primary-blue)" />
          </button>
        </div>
      </div>
    </div>
  );
};
