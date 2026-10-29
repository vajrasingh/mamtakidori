import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Image as ImageIcon, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, X } from 'lucide-react';

export const Screen11PhotoUpload = () => {
  const { navigateTo, speakText, t, language } = useApp();
  const [selectedType, setSelectedType] = useState('prescription');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const recordTypes = [
    { id: 'prescription', label: t.screen11.type1, icon: '💊' },
    { id: 'ultrasound', label: t.screen11.type2, icon: '🩺' },
    { id: 'mcp', label: t.screen11.type3, icon: '📋' }
  ];

  const handleSimulateUpload = (source) => {
    // Simulated realistic photo capture
    setPreviewImage('/assets/doctor_prenatal_clinic.jpg');
    speakText(language === 'hi' 
      ? "दवा पर्ची का फोटो लोड हो गया है। कृपया रिकॉर्ड का प्रकार चुनकर सेव करें।" 
      : "Document photo loaded. Please confirm the record type and save."
    );
  };

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

      {/* Upload Drop Zone / Camera Box */}
      {!previewImage ? (
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
              onClick={() => handleSimulateUpload('camera')}
              className="btn-primary"
              style={{ flex: 1, minHeight: '48px', fontSize: '15px', padding: '8px 12px' }}
            >
              <Camera size={18} />
              <span>{t.screen11.btnCamera}</span>
            </button>

            <button
              onClick={() => handleSimulateUpload('gallery')}
              className="btn-secondary"
              style={{ flex: 1, minHeight: '48px', fontSize: '15px', padding: '8px 12px' }}
            >
              <ImageIcon size={18} />
              <span>{t.screen11.btnGallery}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Image Preview Area */
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
            alt="Uploaded Preview" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />

          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="var(--color-success)" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--deep-navy)' }}>
              {language === 'hi' ? 'दस्तावेज़ सफलतापूर्वक लोड हुआ' : 'Document successfully loaded'}
            </span>
          </div>
        </div>
      )}

      {/* Record Category Checklist */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px' }}>
          {t.screen11.selectType}
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recordTypes.map(item => {
            const isSelected = selectedType === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--powder-blue-light)' : 'var(--surface-white)',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid rgba(65, 111, 152, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.label}
                  </span>
                </div>

                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--primary-blue)' : 'white',
                  border: isSelected ? 'none' : '2px solid #BAC7D5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  {isSelected && <CheckCircle2 size={16} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Safety Notice Banner */}
      <div style={{
        background: 'var(--color-warning-bg)',
        borderLeft: '4px solid var(--color-warning)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 14px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <AlertTriangle size={18} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12.5px', color: 'var(--deep-navy)', lineHeight: 1.45, fontWeight: 500 }}>
            {t.screen11.safetyWarning}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={handleSave} 
          className="btn-primary"
          disabled={!previewImage}
          style={{ opacity: previewImage ? 1 : 0.6 }}
        >
          {isSaved ? <CheckCircle2 size={20} /> : <ShieldCheck size={20} />}
          <span>{isSaved ? (language === 'hi' ? 'सेव हो गया!' : 'Saved to Records!') : (language === 'hi' ? 'रिकॉर्ड्स में सुरक्षित करें' : 'Save to My Records')}</span>
        </button>
      </div>
    </div>
  );
};
