import React, { useState, useEffect } from 'react';
import { ambientMusic } from '../services/ambientMusicService';
import { Music, VolumeX, Sparkles } from 'lucide-react';

export const AmbientMusicControl = ({ language = 'hi' }) => {
  const [isPlaying, setIsPlaying] = useState(ambientMusic.isPlaying());

  useEffect(() => {
    const unsubscribe = ambientMusic.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    ambientMusic.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      className="ambient-music-badge"
      title={isPlaying ? "संगीत रोकें / Pause Calming Music" : "शांत संगीत सुनें / Play Calming Music"}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: isPlaying 
          ? 'linear-gradient(135deg, rgba(217, 145, 165, 0.22) 0%, rgba(65, 111, 152, 0.25) 100%)' 
          : 'rgba(255, 255, 255, 0.85)',
        border: isPlaying ? '1.5px solid var(--warm-rose)' : '1px solid rgba(65, 111, 152, 0.2)',
        borderRadius: '20px',
        padding: '5px 11px',
        fontSize: '11.5px',
        fontWeight: 700,
        color: isPlaying ? 'var(--deep-navy)' : 'var(--text-secondary)',
        cursor: 'pointer',
        boxShadow: isPlaying ? '0 2px 10px rgba(217, 145, 165, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(8px)',
        zIndex: 50
      }}
    >
      {isPlaying ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px' }}>
            <span className="wave-bar" style={{ animationDelay: '0s', height: '10px' }} />
            <span className="wave-bar" style={{ animationDelay: '0.2s', height: '14px' }} />
            <span className="wave-bar" style={{ animationDelay: '0.4s', height: '8px' }} />
          </div>
          <span style={{ color: 'var(--deep-navy)' }}>
            {language === 'en' ? 'Calming Music' : 'शांत संगीत'}
          </span>
        </>
      ) : (
        <>
          <Music size={13} color="var(--primary-blue)" />
          <span>
            {language === 'en' ? 'Play Music' : 'शांत संगीत'}
          </span>
        </>
      )}
    </button>
  );
};
