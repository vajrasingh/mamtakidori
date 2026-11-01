import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Users, 
  UserCheck, 
  ExternalLink, 
  CheckCircle2, 
  Trash2, 
  PlusCircle, 
  Eye 
} from 'lucide-react';

export const Screen17RecordsPrivacy = () => {
  const { consent, setConsent, healthRecords, navigateTo, speakText, t, language } = useApp();
  const [selectedDoc, setSelectedDoc] = useState(null);

  const toggleMilSharing = () => {
    setConsent(prev => ({ ...prev, familySharing: !prev.familySharing }));
    speakText(language === 'hi' 
      ? "सास के साथ पोषण संदेश साझा करने की अनुमति अपडेट कर दी गई है।" 
      : "Mother-in-law sharing preferences updated."
    );
  };

  const toggleAshaSharing = () => {
    setConsent(prev => ({ ...prev, ashaSharing: !prev.ashaSharing }));
    speakText(language === 'hi' 
      ? "आशा कार्यकर्ता के साथ जांच तारीख साझा करने की अनुमति अपडेट कर दी गई है।" 
      : "ASHA worker coordination preferences updated."
    );
  };

  const handleRevokeAll = () => {
    setConsent(prev => ({ ...prev, familySharing: false, ashaSharing: false }));
    speakText(language === 'hi' 
      ? "सभी साझाकरण अनुमतियाँ तुरंत रद्द कर दी गई हैं। अब आपका डेटा पूरी तरह निजी है।" 
      : "All external sharing has been revoked. Your data is strictly private."
    );
  };

  return (
    <div className="screen-fade-in" style={{ padding: '16px 18px 28px', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '4px' }}>
          {t.screen17.title}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t.screen17.subtitle}
        </p>
      </div>

      {/* Upload New Document Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => navigateTo(11)}
          className="btn-primary"
          style={{ minHeight: '48px', fontSize: '15px' }}
        >
          <PlusCircle size={18} />
          <span>{language === 'hi' ? 'नई पर्ची या रिपोर्ट जोड़ें' : 'Upload New Report / Prescription'}</span>
        </button>
      </div>

      {/* Stored Health Records */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '10px' }}>
          {language === 'hi' ? 'सहेजे गए मेडिकल रिकॉर्ड्स' : 'Saved Health Records'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {healthRecords.map(doc => (
            <div
              key={doc.id}
              className="m-card"
              style={{
                padding: '14px 16px',
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--powder-blue)',
                  color: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={20} />
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '2px' }}>
                    {language === 'en' ? (doc.titleEn || doc.title) : doc.title}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {language === 'en' ? (doc.dateEn || doc.date) : doc.date} • {language === 'en' ? (doc.doctorEn || doc.doctor) : doc.doctor}
                  </div>
                  <span className="m-badge m-badge-success" style={{ fontSize: '11px', marginTop: '4px' }}>
                    {language === 'en' ? (doc.statusEn || doc.status) : doc.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                style={{
                  background: 'var(--powder-blue)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--deep-navy)',
                  cursor: 'pointer'
                }}
                title="View document"
              >
                <Eye size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Granular Sharing Matrix */}
      <div className="m-card m-card-blush" style={{ padding: '18px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '12px' }}>
          {t.screen17.sharingHeader}
        </h3>

        {/* MIL Toggle */}
        <div 
          onClick={toggleMilSharing}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid rgba(217, 145, 165, 0.2)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={18} color="var(--warm-rose-dark)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-navy)' }}>
              {t.screen17.shareMilToggle}
            </span>
          </div>

          <div style={{
            width: '42px',
            height: '24px',
            borderRadius: '12px',
            background: consent.familySharing ? 'var(--warm-rose)' : '#CBD5E1',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: consent.familySharing ? 'flex-end' : 'flex-start',
            transition: 'all 0.2s',
            flexShrink: 0
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white' }} />
          </div>
        </div>

        {/* ASHA Toggle */}
        <div 
          onClick={toggleAshaSharing}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={18} color="var(--primary-blue)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-navy)' }}>
              {t.screen17.shareAshaToggle}
            </span>
          </div>

          <div style={{
            width: '42px',
            height: '24px',
            borderRadius: '12px',
            background: consent.ashaSharing ? 'var(--color-success)' : '#CBD5E1',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: consent.ashaSharing ? 'flex-end' : 'flex-start',
            transition: 'all 0.2s',
            flexShrink: 0
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white' }} />
          </div>
        </div>
      </div>

      {/* Revoke All Sharing Action */}
      <button
        onClick={handleRevokeAll}
        className="btn-secondary"
        style={{
          border: '1.5px solid var(--color-error)',
          color: 'var(--color-error)',
          background: 'var(--color-error-bg)',
          minHeight: '48px',
          fontSize: '15px',
          marginBottom: '10px'
        }}
      >
        <Lock size={16} />
        <span>{t.screen17.btnRevokeAll}</span>
      </button>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(23, 54, 83, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--deep-navy)', marginBottom: '8px' }}>
              {language === 'en' ? (selectedDoc.titleEn || selectedDoc.title) : selectedDoc.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {language === 'en' ? (selectedDoc.dateEn || selectedDoc.date) : selectedDoc.date} • {language === 'en' ? (selectedDoc.doctorEn || selectedDoc.doctor) : selectedDoc.doctor}
            </p>

            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={selectedDoc.imageUrl} alt={selectedDoc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <button onClick={() => setSelectedDoc(null)} className="btn-primary" style={{ minHeight: '44px' }}>
              <span>{t.app.done}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
