import { useNavigate, useLocation } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

const FamilyIllustration = () => (
  <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 280, height: 'auto' }}>
    <ellipse cx="140" cy="180" rx="120" ry="40" fill="#e0f2fe" opacity="0.6"/>
    <circle cx="80" cy="80" r="22" fill="#fbbf24"/>
    <path d="M55 140 Q80 115 105 140 L108 180 L52 180 Z" fill="#1ba8d5"/>
    <circle cx="200" cy="80" r="22" fill="#f9a8d4"/>
    <path d="M175 140 Q200 115 225 140 L228 180 L172 180 Z" fill="#8b5cf6"/>
    <circle cx="140" cy="100" r="16" fill="#fde68a"/>
    <path d="M122 145 Q140 128 158 145 L160 180 L120 180 Z" fill="#22c55e"/>
    <line x1="102" y1="100" x2="124" y2="108" stroke="#1ba8d5" strokeWidth="2" strokeDasharray="4 3" opacity="0.6"/>
    <line x1="178" y1="100" x2="156" y2="108" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 3" opacity="0.6"/>
    <path d="M133 68 C133 65 136 62 140 65 C144 62 147 65 147 68 C147 72 140 78 140 78 C140 78 133 72 133 68Z" fill="#ef4444" opacity="0.8"/>
  </svg>
);

function StepBar({ step = 3, total = 4 }) {
  return (
    <div className="sreg-step-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sreg-step-seg${i < step ? ' active' : ''}`} />
      ))}
    </div>
  );
}

export default function StudentParentNotification() {
  const navigate = useNavigate();
  const location = useLocation();
  const age = location.state?.age ?? 14;

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Keeping Parents Informed</h2>
        <p className="inauth-brand-sub">
          We believe in transparent learning. Your parent or guardian will receive
          periodic updates about your progress on P-SCHOOL.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={3} total={4} />

          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 24px' }}>
            <FamilyIllustration />
          </div>

          <h1 className="inauth-form-title sreg-title">Parent Notification</h1>
          <p className="inauth-form-sub">We'll keep your parent/guardian informed</p>
          <p style={{ fontSize: 13.5, color: '#1ba8d5', fontWeight: 600, marginBottom: 20 }}>
            ritu.parent@example.com
          </p>

          <div style={{
            background: '#f0f9ff', border: '1px solid #bae6fd',
            borderRadius: 12, padding: '16px 18px', marginBottom: 28,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>👨‍👩‍👧</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0369a1', marginBottom: 4 }}>
                Parent/Guardian Notification
              </div>
              <div style={{ fontSize: 13, color: '#0369a1', lineHeight: 1.55 }}>
                We will send periodic updates to your parent/guardian about your
                learning progress in P-SCHOOL. They can help monitor your growth!
              </div>
            </div>
          </div>

          <div className="sreg-btn-row">
            <button className="sreg-btn-back"
              onClick={() => navigate('/student/register/parental-consent', { state: { age } })}>
              Back
            </button>
            {/* 13-15 Middle: after parent notification → free trial */}
            <button className="sreg-btn-continue"
              onClick={() => navigate('/student/register/free-trial', { state: { age } })}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
