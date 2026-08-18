import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

function StepBar({ step = 5, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < step ? '#1ba8d5' : '#e5e7eb' }} />
      ))}
    </div>
  );
}

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

const DOCS = [
  { id: 'govId',   label: 'Government ID',           hint: 'PDF, DOC, ZIP (Max 10MB)' },
  { id: 'qualCert',label: 'Qualification Certificate', hint: 'PDF, DOC, ZIP (Max 10MB)' },
  { id: 'cv',      label: 'CV/Resume',                hint: 'PDF, DOC, ZIP (Max 10MB)' },
];

function DocUploadCard({ doc, uploaded, onUpload }) {
  const ref = useRef(null);
  return (
    <div style={{
      border:'1.5px dashed #bae6fd', borderRadius:12, padding:'16px 18px',
      background:'#f9fafb', marginBottom:12,
      display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
    }}>
      <div>
        <div style={{ fontSize:14, fontWeight:600, color:'#111827', marginBottom:3 }}>{doc.label}</div>
        <div style={{ fontSize:12, color:'#9ca3af' }}>{doc.hint}</div>
      </div>
      {uploaded ? (
        <span style={{
          padding:'6px 16px', borderRadius:20, background:'#dcfce7',
          color:'#16a34a', fontSize:13, fontWeight:600,
        }}>Uploaded</span>
      ) : (
        <>
          <button type="button" style={{
            display:'flex', alignItems:'center', gap:6, padding:'8px 16px',
            border:'1.5px solid #1ba8d5', borderRadius:20, background:'#fff',
            color:'#1ba8d5', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }} onClick={() => ref.current?.click()}>
            <UploadIcon /> Upload File
          </button>
          <input ref={ref} type="file" style={{ display:'none' }}
            onChange={() => onUpload(doc.id)} />
        </>
      )}
    </div>
  );
}

export default function InstructorUploadDocuments() {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState({ qualCert: true }); // pre-uploaded for demo

  function handleUpload(id) {
    setUploaded(prev => ({ ...prev, [id]: true }));
  }

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Upload Documents</h2>
        <p className="inauth-brand-sub">
          Help us verify your qualifications. Upload your Government ID, Qualification Certificate, and CV/Resume.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={5} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:24 }}>
            Upload documents
          </h1>
          <p className="inauth-form-sub">Help us verify your qualifications</p>

          <div style={{ marginBottom:24 }}>
            {DOCS.map(doc => (
              <DocUploadCard
                key={doc.id}
                doc={doc}
                uploaded={!!uploaded[doc.id]}
                onUpload={handleUpload}
              />
            ))}
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/instructor/invite/under-review')}>
            Submit For Approval
          </button>
        </div>
      </div>
    </div>
  );
}
