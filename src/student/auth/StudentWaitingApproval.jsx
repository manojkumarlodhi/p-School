import { useNavigate, useLocation } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

const WaitingIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sreg-waiting-illustration">
    <circle cx="100" cy="100" r="90" fill="#e0f2fe" />
    <rect x="78" y="60" width="44" height="80" rx="6" fill="#bae6fd" />
    <path d="M78 60 L122 60 L100 100 L78 60Z" fill="#1ba8d5" opacity="0.7"/>
    <path d="M78 140 L122 140 L100 100 L78 140Z" fill="#1ba8d5" opacity="0.4"/>
    <circle cx="100" cy="105" r="4" fill="#1ba8d5"/>
    <circle cx="94" cy="112" r="3" fill="#1ba8d5" opacity="0.6"/>
    <circle cx="106" cy="112" r="3" fill="#1ba8d5" opacity="0.6"/>
    <circle cx="148" cy="72" r="14" fill="#fbbf24"/>
    <path d="M134 110 Q148 95 162 110 L162 140 L134 140 Z" fill="#1ba8d5"/>
    <rect x="44" y="130" width="8" height="20" rx="2" fill="#6b7280"/>
    <ellipse cx="48" cy="118" rx="14" ry="16" fill="#22c55e" opacity="0.8"/>
    <ellipse cx="38" cy="124" rx="10" ry="12" fill="#22c55e" opacity="0.6"/>
    <ellipse cx="58" cy="124" rx="10" ry="12" fill="#22c55e" opacity="0.6"/>
  </svg>
);

export default function StudentWaitingApproval() {
  const navigate = useNavigate();
  const location = useLocation();
  const age = location.state?.age ?? 12;

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Almost There!</h2>
        <p className="inauth-brand-sub">
          We've sent a consent request to your parent or guardian. Once they approve, you're all set!
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <div className="sreg-waiting-wrap">
            <WaitingIllustration />

            <h2 className="sreg-waiting-title">Waiting for approval</h2>
            <p className="sreg-waiting-sub">We've sent a consent request to</p>
            <p className="sreg-waiting-email">ritu.parent@example.com</p>

            <div className="sreg-pending-card">
              <span className="sreg-pending-icon">⚠️</span>
              <div className="sreg-pending-body">
                <div className="sreg-pending-title">Approval pending</div>
                <div className="sreg-pending-desc">
                  Your parent/guardian needs to approve your account. This usually takes a few minutes.
                </div>
              </div>
            </div>

            <div className="sreg-btn-row">
              <button className="sreg-btn-back"
                onClick={() => navigate('/student/register/parental-consent', { state: { age } })}>
                Back
              </button>
              {/* After approval, student would be redirected here — for now go to instructor splash */}
              <button className="sreg-btn-continue"
                onClick={() => navigate('/instructor')}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
