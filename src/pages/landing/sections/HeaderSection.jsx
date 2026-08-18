import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import './headersection.css';

const NAV_LINKS = [
  { label: 'Home',             id: 'hero' },
  { label: 'Features',         id: 'features' },
  { label: 'Virtual Labs',     id: 'virtual-labs' },
  { label: 'Courses',          id: 'courses' },
  { label: 'For Institutions', id: 'for-institutions' },
  { label: 'Contact',          id: 'contact' },
];

export default function HeaderSection({ hideEnquiry = false }) {
  const navigate = useNavigate();
  const [active, setActive]     = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`lph ${scrolled ? 'lph--scrolled' : ''}`}>
      <div className="lph__inner">

        {/* ── Image Logo ── */}
        <div
          className="lph__logo"
          onClick={() => scrollTo('hero')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && scrollTo('hero')}
        >
          <img src={logo} alt="PSchool" />
        </div>

        {/* ── Nav ── */}
        <nav className="lph__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`lph__nav-btn ${active === link.id ? 'lph__nav-btn--active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── Actions — 3 buttons ── */}
        <div className="lph__actions">
          {!hideEnquiry && (
            <button
              className="lph__btn lph__btn--ghost"
              onClick={() => navigate('/institution/request-demo')}
            >
              Request Institution Enquiry
            </button>
          )}
          {!hideEnquiry && (
            <button
              className="lph__btn lph__btn--login"
              onClick={() => navigate('/select-login')}
            >
              Login
            </button>
          )}
          <button
            className="lph__btn lph__btn--primary"
            onClick={() => navigate('/select-login')}
          >
            Download App
          </button>
        </div>

        {/* ── Hamburger ── */}
        <button
          className={`lph__hamburger ${menuOpen ? 'lph__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="lph__drawer" role="navigation" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`lph__drawer-btn ${active === link.id ? 'lph__drawer-btn--active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
          <div className="lph__drawer-actions">
            {!hideEnquiry && (
              <button
                className="lph__btn lph__btn--ghost"
                onClick={() => { setMenuOpen(false); navigate('/institution/request-demo'); }}
              >
                Request Institution Enquiry
              </button>
            )}
            {!hideEnquiry && (
              <button
                className="lph__btn lph__btn--login"
                onClick={() => { setMenuOpen(false); navigate('/select-login'); }}
              >
                Login
              </button>
            )}
            <button
              className="lph__btn lph__btn--primary"
              onClick={() => { setMenuOpen(false); navigate('/select-login'); }}
            >
              Download App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
