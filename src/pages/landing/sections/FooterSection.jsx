import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.jpg';
import './footersection.css';

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50" />
      <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3" />
      <path d="M3 20.5L8.5 7 13.5 12 3 20.5Z" fill="#F44336" />
      <path d="M13.5 12L20 8.5 20 15.5 13.5 12Z" fill="#FFC107" />
    </svg>
  );
}

function AppleStoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M16.5 2C16.5 2 16.8 4.8 15 6.5C13.2 8.2 11 7.8 11 7.8C11 7.8 10.6 5.1 12.5 3.4C14.3 1.7 16.5 2 16.5 2Z" fill="#1a8fe3" />
      <path d="M20.5 16.5C20.5 16.5 19.2 19.8 17.5 21C16 22 15 21.5 13.5 21.5C12 21.5 11 22 9.5 21C7.8 19.8 6.5 16.5 6.5 16.5C6.5 16.5 5 13 6 10.5C7 8 9 7.5 10.5 7.5C12 7.5 12.5 8.5 13.5 8.5C14.5 8.5 15.2 7.5 16.8 7.5C18.4 7.5 20 8.5 20.8 10.5C21 11 21.2 11.5 21.2 12C21.2 13.5 20.5 16.5 20.5 16.5Z" fill="#1a8fe3" />
    </svg>
  );
}

const PRODUCT_LINKS = [
  { label: 'Home',            href: '#' },
  { label: 'Features',        href: '#features' },
  { label: 'Virtual Labs',    href: '#courses' },
  { label: 'Courses',         href: '#courses' },
  { label: 'For Institutions',href: '#for-institutions' },
];

const COMPANY_LINKS = [
  { label: 'Contact',         href: '#contact' },
  { label: 'Privacy Policy',  href: '#' },
  { label: 'Terms of Service',href: '#' },
];

const SOCIAL = [
  { Icon: XIcon,         label: 'X (Twitter)', bg: '#000000' },
  { Icon: InstagramIcon, label: 'Instagram',   bg: '#E1306C' },
  { Icon: LinkedInIcon,  label: 'LinkedIn',    bg: '#0A66C2' },
  { Icon: FacebookIcon,  label: 'Facebook',    bg: '#1877F2' },
  { Icon: YouTubeIcon,   label: 'YouTube',     bg: '#FF0000' },
];

export default function FooterSection() {
  const navigate = useNavigate();

  return (
    <footer className="ftr">
      <div className="lp-container ftr__inner">

        {/* ── Top grid ── */}
        <div className="ftr__grid">

          {/* Brand */}
          <div className="ftr__brand">
            <img src={logoImg} alt="P-School" className="ftr__logo" />
            <p className="ftr__brand-desc">
              Practical STEM learning through interactive virtual laboratories.
              Learn by doing, not just watching.
            </p>
          </div>

          {/* Product */}
          <div className="ftr__col">
            <h4 className="ftr__col-title">Product</h4>
            <ul className="ftr__links">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="ftr__link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="ftr__col">
            <h4 className="ftr__col-title">Company</h4>
            <ul className="ftr__links">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="ftr__link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div className="ftr__col">
            <h4 className="ftr__col-title">Download</h4>
            <div className="ftr__store-btns">
              <button className="ftr__store-btn">
                <PlayStoreIcon />
                <span>Play Store</span>
              </button>
              <button className="ftr__store-btn">
                <AppleStoreIcon />
                <span>Apple Store</span>
              </button>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ftr__bottom">
          <p className="ftr__copy">
            © 2026 P-SCHOOL. All rights reserved. Hands-on STEM learning through virtual labs.
          </p>
          <div className="ftr__social">
            {SOCIAL.map(({ Icon, label, bg }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="ftr__social-icon"
                style={{ '--social-bg': bg }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
