import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Image as ImageIcon, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, X, Scan, Upload } from 'lucide-react';

export const Screen11PhotoUpload = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [selectedType, setSelectedType] = useState('prescription');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const recordTypes = [
    { id: 'prescription', label: t.screen11.type1, icon: '💊' },
    { id: 'ultrasound', label: t.screen11.type2, icon: '🩺' },
    { id: 'mcp', label: t.screen11.type3, icon: '📋' }
  ];

  const startCamera = async () => {
    setIsCameraActive(true);
    setPreviewImage(null);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (e) {
      console.warn('Live camera access failed:', e);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const snapPhoto = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPreviewImage(dataUrl);
    } else {
      setPreviewImage('/assets/doctor_prenatal_clinic.jpg');
    }
    stopCamera();

    speakText(language === 'hi' 
      ? "दस्तावेज़ की फोटो ले ली गई है। कृपया श्रेणी की पुष्टि करके सेव करें।" 
      : "Document image captured. Please confirm category and save."
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    speakText(language === 'hi' 
      ? "आपकी रिपोर्ट सुरक्षित रूप से सेव हो गई है। यह आपके 'रिकॉर्ड्स' सेक्शन में उपलब्ध रहेगी।" 
      : "Your health report has been safely saved in your records."
    );
    setTimeout(() => {
      navigateTo(17); // Go to My Records
    }, 1500);
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen11.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen11.subtitle}
        </p>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileUpload} 
      />

      {/* Live Camera Viewfinder if active */}
      {isCameraActive && (
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: '#000',
          aspectRatio: '4/3',
          marginBottom: '20px',
          border: '2px solid var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          
          {/* Scanner Reticle */}
          <div style={{
            position: 'absolute',
            inset: '16px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '12px',
            pointerEvents: 'none'
          }} />

          {/* Shutter capture button */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={snapPhoto}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'white',
                border: '4px solid var(--primary-blue)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="फोटो खींचें"
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--warm-rose)' }} />
            </button>

            <button
              onClick={stopCamera}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Upload Drop Zone / Camera Box */}
      {!previewImage && !isCameraActive && (
        <div style={{
          border: '2px dashed var(--primary-blue)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--powder-blue-light)',
          padding: '28px 20px',
          textAlign: 'center',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--powder-blue)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Camera size={32} />
          </div>

          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '16px' }}>
            {t.screen11.uploadBox}
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button
              onClick={startCamera}
              className="btn-primary"
              style={{ flex: 1, minHeight: '48px', fontSize: '15px', padding: '8px 12px' }}
            >
              <Camera size={18} />
              <span>{t.screen11.btnCamera}</span>
            </button>

            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '48px', fontSize: '15px', padding: '8px 12px' }}
            >
              <ImageIcon size={18} />
              <span>{t.screen11.btnGallery}</span>
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Area */}
      {previewImage && (
        <div style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'var(--surface-white)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '20px',
          border: '2px solid var(--powder-blue)',
          position: 'relative'
        }}>
          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(23, 54, 83, 0.75)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <img 
            src={previewImage} 
            alt="Uploaded Health Record" 
            style={{ width: '100%', maxHeight: '220px', objectFit: 'contain', background: '#F8FAFC' }}
          />

          <div style={{ padding: '12px 16px', background: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="var(--color-success)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'दस्तावेज़ सफलतापूर्वक कैप्चर किया गया' : 'Document captured successfully'}
            </span>
          </div>
        </div>
      )}

      {/* Select Record Type */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px', display: 'block' }}>
          {t.screen11.categoryLabel}
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {recordTypes.map(rt => {
            const isSelected = selectedType === rt.id;
            return (
              <button
                key={rt.id}
                onClick={() => setSelectedType(rt.id)}
                style={{
                  background: isSelected ? 'var(--powder-blue-light)' : 'var(--surface-white)',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '24px' }}>{rt.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? 'var(--primary-blue)' : 'var(--deep-navy)', textAlign: 'center' }}>
                  {rt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy Guarantee Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(72, 187, 120, 0.1)',
        marginBottom: '24px'
      }}>
        <ShieldCheck size={20} color="var(--color-success)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--deep-navy)', lineHeight: 1.35 }}>
          {t.screen11.privacyNotice}
        </span>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleSave}
          disabled={!previewImage}
          className="btn-primary"
          style={{ width: '100%', minHeight: '52px', opacity: previewImage ? 1 : 0.6 }}
        >
          {isSaved ? (
            <>
              <CheckCircle2 size={20} />
              <span>{language === 'hi' ? 'सुरक्षित हो गया!' : 'Safely Stored!'}</span>
            </>
          ) : (
            <>
              <span>{t.screen11.btnSave}</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
