import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

/* Shield + person illustration */
const InviteIllustration = () => (
  <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 240, height: 'auto' }}>
    <ellipse cx="120" cy="170" rx="90" ry="24" fill="#e0f2fe" opacity="0.6"/>
    {/* Shield */}
    <path d="M120 30 L160 50 L160 100 C160 130 120 155 120 155 C120 155 80 130 80 100 L80 50 Z"
      fill="#1ba8d5" opacity="0.15" stroke="#1ba8d5" strokeWidth="2"/>
    <path d="M120 45 L148 60 L148 100 C148 122 120 140 120 140 C120 140 92 122 92 100 L92 60 Z"
      fill="#1ba8d5" opacity="0.25"/>
    {/* Checkmark on shield */}
    <path d="M108 95 L116 103 L132 87" stroke="#1ba8d5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Person */}
    <circle cx="168" cy="72" r="16" fill="#fbbf24"/>
    <path d="M150 115 Q168 100 186 115 L188 155 L148 155 Z" fill="#1ba8d5"/>
    {/* Stars */}
    <text x="60" y="55" fontSize="14" fill="#fbbf24">✦</text>
    <text x="190" y="45" fontSize="10" fill="#fbbf24">✦</text>
    <text x="50" y="130" fontSize="10" fill="#1ba8d5" opacity="0.5">✦</text>
  </svg>
);

/* Step bar — 5 steps total for this flow */
function StepBar({ step = 1, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex:1, height:4, borderRadius:2,
          background: i < step ? '#1ba8d5' : '#e5e7eb',
          transition:'background 0.3s',
        }} />
      ))}
    </div>
  );
}

export default function InstructorSecureInvitation() {
  const navigate = useNavigate();

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Institution Instructor</h2>
        <p className="inauth-brand-sub">
          You've been invited to join an institution on P-School. Complete your registration to get started.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">Secure Link</span>
          <span className="inauth-brand-tag">Verified Invite</span>
        </div>
      </div>

      {/* Right */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={1} total={5} />

          {/* Illustration */}
          <div style={{ display:'flex', justifyContent:'center', margin:'0 0 24px' }}>
            <InviteIllustration />
          </div>

          <h1 className="inauth-form-title" style={{ color:'#111827', fontSize:24 }}>
            Secure Invitation
          </h1>
          <p className="inauth-form-sub">Join your institution through a verified link</p>

          {/* Institution name */}
          <div className="inauth-field">
            <label className="inauth-label">Institution Name</label>
            <input className="inauth-input" type="text" value="Bright Future Academy" readOnly
              style={{ background:'#f0f9ff', color:'#0369a1', fontWeight:600 }} />
          </div>

          {/* Invitation status */}
          <div style={{
            border:'1.5px solid #bbf7d0', borderRadius:10, padding:'12px 16px',
            background:'#f0fdf4', marginBottom:24,
          }}>
            <div style={{ fontSize:12, color:'#6b7280', marginBottom:4 }}>Invitation Status</div>
            <div style={{ fontSize:15, fontWeight:700, color:'#16a34a' }}>Valid</div>
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/instructor/invite/verify-email')}>
            Accept &amp; Continue
          </button>

          <div style={{ textAlign:'center', marginTop:12 }}>
            <button className="inauth-link"
              onClick={() => navigate('/instructor/login')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
