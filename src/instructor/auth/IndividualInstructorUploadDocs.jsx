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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

const DOCS = [
  { id: 'govId',   label: 'Government ID',           hint: 'PDF, DOC, ZIP (Max 10MB)' },
  { id: 'eduCert', label: 'Educational Certificates', hint: 'PDF, DOC, ZIP (Max 10MB)' },
  { id: 'resume',  label: 'Resume / CV upload',       hint: 'PDF, DOC, ZIP (Max 10MB)' },
];

function DocCard({ doc, uploaded, onUpload }) {
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
        <span style={{ padding:'6px 16px', borderRadius:20, background:'#dcfce7', color:'#16a34a', fontSize:13, fontWeight:600 }}>
          Uploaded
        </span>
      ) : (
        <>
          <button type="button" style={{
            display:'flex', alignItems:'center', gap:6, padding:'8px 16px',
            border:'1.5px solid #1ba8d5', borderRadius:20, background:'#fff',
            color:'#1ba8d5', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
          }} onClick={() => ref.current?.click()}>
            <UploadIcon /> Upload File
          </button>
          <input ref={ref} type="file" style={{ display:'none' }} onChange={() => onUpload(doc.id)} />
        </>
      )}
    </div>
  );
}

export default function IndividualInstructorUploadDocs() {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState({ eduCert: true });
  const [portfolio, setPortfolio] = useState('gsvsvd/svsvd/svs/');

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Upload Documents</h2>
        <p className="inauth-brand-sub">
          Help us verify your qualifications. Upload your Government ID, Educational Certificates, and Resume.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={5} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:24 }}>
            Upload documents
          </h1>
          <p className="inauth-form-sub">Help us verify your qualifications</p>

          <div style={{ marginBottom:16 }}>
            {DOCS.map(doc => (
              <DocCard key={doc.id} doc={doc}
                uploaded={!!uploaded[doc.id]}
                onUpload={id => setUploaded(p => ({ ...p, [id]: true }))} />
            ))}
          </div>

          {/* Portfolio link */}
          <div className="inauth-field">
            <label className="inauth-label">Portfolio Link (optional)</label>
            <input className="inauth-input" type="text" placeholder="https://your-portfolio.com"
              value={portfolio} onChange={e => setPortfolio(e.target.value)} />
          </div>

          <div style={{ display:'flex', gap:12, marginTop:8 }}>
            <button type="button" style={{
              flex:1, padding:13, border:'1.5px solid #e5e7eb', borderRadius:10,
              background:'#fff', fontSize:14, fontWeight:600, color:'#374151',
              cursor:'pointer', fontFamily:'inherit',
            }} onClick={() => navigate('/instructor/individual/tell-us-about-you')}>
              Back
            </button>
            <button type="button" style={{
              flex:2, padding:13, border:'none', borderRadius:10,
              background:'#1ba8d5', fontSize:14, fontWeight:700, color:'#fff',
              cursor:'pointer', fontFamily:'inherit',
            }} onClick={() => navigate('/instructor/individual/under-review')}>
              Submit For Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
