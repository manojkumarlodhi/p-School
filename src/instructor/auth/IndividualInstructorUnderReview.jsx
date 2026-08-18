import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

const ReviewIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width:'100%', maxWidth:200, height:'auto' }}>
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

export default function IndividualInstructorUnderReview() {
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
          Your application is being reviewed by our team. We'll notify you via email once approved.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner" style={{ textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center', margin:'20px 0 28px' }}>
            <ReviewIllustration />
          </div>

          <h1 style={{ fontSize:24, fontWeight:800, color:'#111827', margin:'0 0 8px' }}>
            Under review
          </h1>
          <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 24px' }}>
            Your application is being reviewed by our team
          </p>

          {/* Info card */}
          <div style={{
            background:'#fffbeb', border:'1px solid #fde68a',
            borderRadius:12, padding:'20px', marginBottom:36, textAlign:'center',
          }}>
            <div style={{ fontSize:22, marginBottom:8 }}>⏰</div>
            <div style={{ fontSize:15, fontWeight:700, color:'#92400e', marginBottom:6 }}>
              We'll email you after verification
            </div>
            <div style={{ fontSize:13, color:'#92400e', lineHeight:1.5 }}>
              Please check your email for updates on your application status.
            </div>
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/instructor/individual/approved')}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
