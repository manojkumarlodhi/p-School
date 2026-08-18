import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

/* Waiting illustration — same as student waiting */
const ReviewIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 200, height: 'auto' }}>
    <circle cx="100" cy="100" r="90" fill="#e0f2fe" />
    <rect x="78" y="60" width="44" height="80" rx="6" fill="#bae6fd" />
    <path d="M78 60 L122 60 L100 100 L78 60Z" fill="#1ba8d5" opacity="0.7"/>
    <path d="M78 140 L122 140 L100 100 L78 140Z" fill="#1ba8d5" opacity="0.4"/>
    <circle cx="100" cy="105" r="4" fill="#1ba8d5"/>
    <circle cx="148" cy="72" r="14" fill="#fbbf24"/>
    <path d="M134 110 Q148 95 162 110 L162 140 L134 140 Z" fill="#1ba8d5"/>
    <rect x="44" y="130" width="8" height="20" rx="2" fill="#6b7280"/>
    <ellipse cx="48" cy="118" rx="14" ry="16" fill="#22c55e" opacity="0.8"/>
    <ellipse cx="38" cy="124" rx="10" ry="12" fill="#22c55e" opacity="0.6"/>
    <ellipse cx="58" cy="124" rx="10" ry="12" fill="#22c55e" opacity="0.6"/>
  </svg>
);

const NEXT_STEPS = [
  "You'll receive an email notification once approved",
  'Check your inbox for next steps',
  'Usually approved within 24-48 hours',
];

export default function InstructorUnderReview() {
  const navigate = useNavigate();

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Under Review</h2>
        <p className="inauth-brand-sub">
          Your application has been submitted. Our team will review your documents and get back to you within 24-48 hours.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner" style={{ textAlign:'center' }}>
          {/* Illustration */}
          <div style={{ display:'flex', justifyContent:'center', margin:'0 0 24px' }}>
            <ReviewIllustration />
          </div>

          <h1 style={{ fontSize:22, fontWeight:800, color:'#111827', margin:'0 0 8px' }}>
            Invitation Accepted
          </h1>
          <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 24px' }}>
            Your request is under review
          </p>

          {/* Status card */}
          <div style={{
            background:'#fffbeb', border:'1px solid #fde68a',
            borderRadius:12, padding:'16px 20px', marginBottom:28, textAlign:'center',
          }}>
            <div style={{ fontSize:13, color:'#92400e', marginBottom:4 }}>⚠️ Status</div>
            <div style={{ fontSize:16, fontWeight:700, color:'#d97706' }}>Pending Approval</div>
          </div>

          {/* What's next */}
          <div style={{ textAlign:'left', marginBottom:28 }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#111827', margin:'0 0 12px' }}>
              What's next?
            </h3>
            {NEXT_STEPS.map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                <div style={{
                  width:20, height:20, borderRadius:'50%', background:'#e0f2fe',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0, fontSize:11, color:'#1ba8d5', fontWeight:700,
                }}>→</div>
                <span style={{ fontSize:13.5, color:'#374151' }}>{s}</span>
              </div>
            ))}
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/instructor/invite/approved')}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
