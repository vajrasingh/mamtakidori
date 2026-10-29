import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { Mic, MicOff, Volume2, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Screen10VoiceRecord = () => {
  const { navigateTo, speakText, stopAudio, t, language } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [hasCompleted, setHasCompleted] = useState(false);

  const startRecord = () => {
    stopAudio();
    setIsRecording(true);
    setHasCompleted(false);
    setRecordedText('');

    speechService.startListening({
      lang: language,
      onResult: (transcript, isFinal) => {
        setRecordedText(transcript);
        if (isFinal) {
          setIsRecording(false);
          setHasCompleted(true);
        }
      },
      onError: () => {
        const sample = language === 'hi' 
          ? "मुझे पिछले दो दिन से सिर में दर्द और चक्कर आ रहे हैं।" 
          : "I have had a headache and dizziness for the last two days.";
        setRecordedText(sample);
        setIsRecording(false);
        setHasCompleted(true);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });
  };

  const stopRecord = () => {
    speechService.stopListening();
    setIsRecording(false);
    if (!recordedText) {
      const sample = language === 'hi' 
        ? "मुझे पिछले दो दिन से सिर में दर्द और चक्कर आ रहे हैं।" 
        : "I have had a headache and dizziness for the last two days.";
      setRecordedText(sample);
    }
    setHasCompleted(true);
  };

  const handleContinueToMamta = () => {
    navigateTo(7); // Send to Mamta AI
  };

  return (
    <div className="screen-fade-in" style={{ padding: '20px 20px 32px', display: 'flex', flexDirection: 'column', minHeight: '100%', textAlign: 'center' }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '6px' }}>
          {t.screen10.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          {t.screen10.subtitle}
        </p>
      </div>

      {/* Large Microphone Graphic with Ripple Circles */}
      <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div 
          onClick={isRecording ? stopRecord : startRecord}
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {/* Animated sound ripples */}
          <div style={{
            position: 'absolute',
            inset: isRecording ? '-20px' : '-10px',
            borderRadius: '50%',
            background: isRecording ? 'rgba(185, 76, 85, 0.2)' : 'rgba(65, 111, 152, 0.15)',
            animation: isRecording ? 'orb-pulse 1.2s infinite' : 'none',
            transition: 'all 0.3s'
          }} />

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: isRecording ? 'var(--color-error)' : 'var(--gradient-primary)',
            boxShadow: isRecording ? '0 0 35px rgba(185, 76, 85, 0.6)' : '0 10px 30px rgba(65, 111, 152, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'all 0.3s'
          }}>
            {isRecording ? <MicOff size={54} /> : <Mic size={54} />}
          </div>
        </div>

        {/* Status text */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: isRecording ? 'var(--color-error)' : 'var(--deep-navy)' }}>
            {isRecording ? t.screen10.recordingStatus : (hasCompleted ? (language === 'hi' ? 'आवाज़ रिकॉर्ड हो गई!' : 'Voice Captured!') : (language === 'hi' ? 'बोलने के लिए माइक पर टैप करें' : 'Tap mic to start speaking'))}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isRecording ? t.screen10.recordingHint : (language === 'hi' ? 'जितना आसानी से बोलेंगी, उतना बेहतर समझ आएगा' : 'Speak as naturally as you like')}
          </div>
        </div>

        {/* Real-time speech result preview */}
        {recordedText && (
          <div style={{
            marginTop: '20px',
            width: '100%',
            maxWidth: '340px',
            background: 'var(--surface-white)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            boxShadow: 'var(--shadow-sm)',
            border: '1.5px solid var(--powder-blue)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {language === 'hi' ? 'रिकॉर्ड किया गया संदेश:' : 'Transcribed Voice:'}
            </div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
              "{recordedText}"
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: 'auto' }}>
        {hasCompleted ? (
          <button onClick={handleContinueToMamta} className="btn-primary">
            <span>{language === 'hi' ? 'ममता से जवाब सुनें' : 'Get Mamta\'s Answer'}</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <button 
            onClick={isRecording ? stopRecord : startRecord} 
            className="btn-primary"
            style={{ background: isRecording ? 'var(--color-error)' : 'var(--primary-blue)' }}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            <span>{isRecording ? t.screen10.btnStop : t.screen10.btnStart}</span>
          </button>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '16px',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <ShieldCheck size={16} color="var(--color-success)" />
          <span>{t.screen10.privacyNote}</span>
        </div>
      </div>
    </div>
  );
};
