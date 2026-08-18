import { useNavigate } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

/* Gift box illustration */
const GiftIllustration = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 280, height: 'auto' }}>
    {/* Background arc */}
    <ellipse cx="140" cy="160" rx="110" ry="35" fill="#e0f2fe" opacity="0.7"/>
    <path d="M30 160 Q140 80 250 160" fill="#bae6fd" opacity="0.4"/>
    {/* Gift box base */}
    <rect x="80" y="110" width="120" height="70" rx="6" fill="#1ba8d5"/>
    <rect x="80" y="110" width="120" height="70" rx="6" fill="url(#giftGrad)"/>
    {/* Gift box lid */}
    <rect x="72" y="95" width="136" height="22" rx="5" fill="#0ea5e9"/>
    {/* Ribbon vertical */}
    <rect x="130" y="95" width="20" height="85" rx="4" fill="#fbbf24"/>
    {/* Ribbon horizontal */}
    <rect x="72" y="100" width="136" height="12" rx="4" fill="#fbbf24"/>
    {/* Bow left */}
    <ellipse cx="118" cy="95" rx="18" ry="10" fill="#f59e0b" transform="rotate(-20 118 95)"/>
    {/* Bow right */}
    <ellipse cx="162" cy="95" rx="18" ry="10" fill="#f59e0b" transform="rotate(20 162 95)"/>
    {/* Bow center */}
    <circle cx="140" cy="95" r="8" fill="#fbbf24"/>
    {/* Stars */}
    <text x="55" y="75" fontSize="18" fill="#fbbf24">✦</text>
    <text x="210" y="65" fontSize="14" fill="#fbbf24">✦</text>
    <text x="230" y="100" fontSize="10" fill="#fbbf24">✦</text>
    <defs>
      <linearGradient id="giftGrad" x1="80" y1="110" x2="200" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1ba8d5"/>
        <stop offset="100%" stopColor="#0284c7"/>
      </linearGradient>
    </defs>
  </svg>
);

const FEATURES = [
  { icon: '📚', title: '7-day intro courses',      desc: 'Access curated beginner-friendly content' },
  { icon: '🧪', title: 'Limited lab credits',      desc: 'Try hands-on coding and robotics labs' },
  { icon: '🏆', title: 'Certificates locked',      desc: 'Upgrade to unlock certificates for completed courses' },
];

function StepBar({ step = 4, total = 4 }) {
  return (
    <div className="sreg-step-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sreg-step-seg${i < step ? ' active' : ''}`} />
      ))}
    </div>
  );
}

export default function StudentFreeTrial() {
  const navigate = useNavigate();

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">7 Days Free</h2>
        <p className="inauth-brand-sub">
          Get full access to beginner courses, virtual labs, and learning tools — completely free for 7 days.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">Intro Courses</span>
          <span className="inauth-brand-tag">Lab Credits</span>
          <span className="inauth-brand-tag">No Credit Card</span>
        </div>
      </div>

      {/* Right */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={4} total={4} />

          {/* Illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 20px' }}>
            <GiftIllustration />
          </div>

          <h1 className="inauth-form-title" style={{ textAlign: 'center' }}>
            Start your free trial
          </h1>
          <p className="inauth-form-sub" style={{ textAlign: 'center' }}>
            Get access to amazing learning resources
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: '#f0f9ff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, fontSize: 18,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 12.5, color: '#9ca3af' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trial badge */}
          <div style={{
            textAlign: 'center', marginBottom: 20,
            fontSize: 15, fontWeight: 700, color: '#1ba8d5',
          }}>
            7 Day Free Trial
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/student/register/welcome')}>
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
