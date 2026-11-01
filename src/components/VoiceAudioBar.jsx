import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Square, RotateCcw } from 'lucide-react';

export const VoiceAudioBar = () => {
  const { isSpeaking, currentSpokenText, stopAudio, replayAudio, t, currentScreen } = useApp();

  if (!isSpeaking && !currentSpokenText) return null;

  const hasBottomNav = ![1, 2, 3, 4, 5, 20].includes(currentScreen);

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: hasBottomNav ? '85px' : '20px',
        left: '16px',
        right: '16px',
        background: 'linear-gradient(135deg, rgba(23, 54, 83, 0.96) 0%, rgba(65, 111, 152, 0.96) 100%)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 60,
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Volume2 size={18} color="var(--powder-blue)" className={isSpeaking ? 'pulse-anim' : ''} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--warm-rose)', fontWeight: 700 }}>
              {isSpeaking ? t.app.playing : t.app.done}
            </span>
            {isSpeaking && (
              <div className="sound-waves-bar active" style={{ height: '14px', margin: 0, gap: '2px' }}>
                <span className="sound-wave-pillar" style={{ background: 'var(--warm-rose)', width: '2px' }}></span>
                <span className="sound-wave-pillar" style={{ background: 'var(--warm-rose)', width: '2px' }}></span>
                <span className="sound-wave-pillar" style={{ background: 'var(--warm-rose)', width: '2px' }}></span>
                <span className="sound-wave-pillar" style={{ background: 'var(--warm-rose)', width: '2px' }}></span>
              </div>
            )}
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#F0F6FC'
          }}>
            {currentSpokenText || t.app.tagline}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={replayAudio}
          title={t.app.replay}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={15} />
        </button>

        <button
          onClick={stopAudio}
          title={t.app.stop}
          style={{
            background: 'var(--warm-rose)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <Square size={13} fill="white" />
        </button>
      </div>
    </div>
  );
};
