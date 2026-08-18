import './certificationssection.css';

const CERTS = [
  {
    id: 'issued',
    title: 'Issued on Completion',
    desc: 'Digital certificates awarded automatically upon finishing courses',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="10" fill="#EBF7FF" />
        <rect x="13" y="10" width="22" height="28" rx="3" stroke="#1a8fe3" strokeWidth="1.8" fill="none" />
        <line x1="18" y1="17" x2="30" y2="17" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="18" y1="21" x2="30" y2="21" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="18" y1="25" x2="25" y2="25" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="33" cy="35" r="7" fill="#EBF7FF" stroke="#1a8fe3" strokeWidth="1.8" />
        <polyline points="29.5 35 32 37.5 36.5 32.5" stroke="#1a8fe3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'shareable',
    title: 'Shareable & Verifiable',
    desc: 'Share certificates with employers and on professional profiles',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="10" fill="#EBF7FF" />
        <rect x="11" y="14" width="30" height="20" rx="3" stroke="#1a8fe3" strokeWidth="1.8" fill="none" />
        <line x1="16" y1="20" x2="36" y2="20" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="24" x2="36" y2="24" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="28" x2="28" y2="28" stroke="#1a8fe3" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M26 34 L26 40 M22 40 L30 40" stroke="#1a8fe3" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="38" cy="38" r="4" fill="#1a8fe3" />
        <path d="M36.5 38 L37.5 39 L39.5 37" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'proof',
    title: 'Proof of Skills',
    desc: 'Demonstrate hands-on practical abilities to employers',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="10" fill="#EBF7FF" />
        <rect x="14" y="9" width="20" height="26" rx="3" stroke="#1a8fe3" strokeWidth="1.8" fill="none" />
        <line x1="19" y1="16" x2="29" y2="16" stroke="#1a8fe3" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="20" x2="29" y2="20" stroke="#1a8fe3" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="19 24 21 26 25 22" stroke="#1a8fe3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="19 29 21 31 25 27" stroke="#1a8fe3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="28" y="28" width="12" height="16" rx="2" fill="#EBF7FF" stroke="#1a8fe3" strokeWidth="1.6" />
        <line x1="31" y1="33" x2="37" y2="33" stroke="#1a8fe3" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="31" y1="36" x2="37" y2="36" stroke="#1a8fe3" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="31" y1="39" x2="34" y2="39" stroke="#1a8fe3" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function CertificationsSection() {
  return (
    <section className="crt">
      <div className="lp-container crt__inner">

        {/* Heading — centered */}
        <div className="crt__hd">
          <h2 className="crt__h2">Certifications &amp; Outcomes</h2>
          <p className="crt__sub">Earn recognized digital certificates upon course completion</p>
        </div>

        {/* Cards */}
        <div className="crt__grid">
          {CERTS.map((c) => (
            <div key={c.id} className="crt__card">
              <div className="crt__card-icon">{c.icon}</div>
              <h3 className="crt__card-title">{c.title}</h3>
              <p className="crt__card-desc">{c.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
