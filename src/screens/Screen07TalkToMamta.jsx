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
      spokenHi: "रानी जी, आपका पहला चेकअप 5 नवंबर को प्राथमिक स्वास्थ्य केंद्र में है। क्या मैं रिमाइंडर सेट कर दूँ?",
      spokenEn: "Rani, your checkup is on 5 November at the health centre. Shall I set a reminder for you?",
      actionType: 'checkup',
      date: '5 नवंबर 2026',
      why: language === 'hi' ? 'हीमोग्लोबिन और बीपी जांच' : 'Hemoglobin & BP check'
    },
    weakness: {
      queryHi: "मुझे बहुत कमजोरी और चक्कर आ रहे हैं",
      queryEn: "I am feeling very tired and weak",
      spokenHi: "कमजोरी खून की कमी से हो सकती है। रोज भोजन के बाद 1 लाल आयरन गोली और हरी सब्जियां लें।",
      spokenEn: "Weakness is often low iron. Take 1 red iron tablet daily after lunch and eat green vegetables.",
      actionType: 'symptom',
      severity: 'moderate',
      recommendation: language === 'hi' ? 'आयरन गोली + हरी सब्जियां' : 'Iron tablet + Greens'
    },
    remedy: {
      queryHi: "क्या गर्भावस्था में केसर दूध सुरक्षित है?",
      queryEn: "Is saffron milk safe during pregnancy?",
      spokenHi: "सीमित मात्रा में केसर दूध सुरक्षित है। कच्चा पपीता या अरंडी का तेल बिल्कुल न लें।",
      spokenEn: "Saffron milk is safe in moderation. Strictly avoid raw papaya and castor oil.",
      actionType: 'remedy',
      status: language === 'hi' ? 'सुरक्षित (Safe)' : 'Safe in Moderation'
    },
    scan: {
      queryHi: "सोनोग्राफी में क्या पता चलता है?",
      queryEn: "What does an ultrasound scan check?",
      spokenHi: "सोनोग्राफी से शिशु के अंगों व धड़कन की सुरक्षित जांच होती है। यह दर्द रहित और सुरक्षित है।",
      spokenEn: "An ultrasound safely checks baby growth and heartbeat. It is painless and safe.",
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
        const fallbackText = language === 'en' ? "When is my next hospital check-up?" : "मेरा अगला चेकअप कब है?";
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

      const speech = language === 'en' ? matchedResponse.spokenEn : matchedResponse.spokenHi;
      speakText(speech);
    }, 1200);
  };

  // Select a suggested chip
  const handleSelectChip = (topicKey) => {
    stopAudio();
    const item = knowledgeBase[topicKey];
    const text = language === 'en' ? item.queryEn : item.queryHi;
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
                {language === 'en' ? activeResponse.spokenEn : activeResponse.spokenHi}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid rgba(65, 111, 152, 0.1)', paddingTop: '12px' }}>
                <button
                  onClick={() => speakText(language === 'en' ? activeResponse.spokenEn : activeResponse.spokenHi)}
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
                      speakText(language === 'en' ? "Checkup reminder saved for 5 November." : "5 नवंबर का चेकअप रिमाइंडर सेव हो गया है।");
                    }}
                    className="btn-secondary"
                    style={{ width: 'auto', minHeight: '34px', padding: '6px 12px', fontSize: '13px' }}
                  >
                    {actionDone ? <CheckCircle2 size={14} color="var(--color-success)" /> : <Bell size={14} />}
                    <span>{actionDone ? (language === 'en' ? 'Saved' : 'सेव हो गया') : t.screen07.actionRemind}</span>
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

      {/* Minimal Suggested Illustrated Action Chips */}
      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          {language === 'en' ? 'Suggested Questions:' : 'सुझाए गए प्रश्न:'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <button
            onClick={() => handleSelectChip('checkup')}
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'white',
              border: '1.5px solid var(--powder-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Calendar size={18} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'en' ? 'Next Checkup When?' : 'अगला चेकअप कब?'}
            </span>
          </button>

          <button
            onClick={() => handleSelectChip('weakness')}
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'white',
              border: '1.5px solid var(--powder-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Heart size={18} color="var(--warm-rose)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'en' ? 'Weakness & Fatigue' : 'कमजोरी और थकान'}
            </span>
          </button>

          <button
            onClick={() => handleSelectChip('remedy')}
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'white',
              border: '1.5px solid var(--powder-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Sparkles size={18} color="var(--color-warning)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--deep-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'en' ? 'Saffron Milk Advice' : 'केसर दूध का नियम'}
            </span>
          </button>

          <button
            onClick={() => navigateTo(19)}
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              background: 'var(--powder-blue-light)',
              border: '1.5px solid var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '16px' }}>🌿</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-blue)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'en' ? 'Verify Home Remedy' : 'घरेलू नुस्खा जांचें'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
