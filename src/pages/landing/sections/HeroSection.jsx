import iphoneImg from '../../../assets/images/iPhone.png';
import './herosection.css';

const TRUST = [
  'Free to download and explore',
  'No physical labs or hardware required',
  'Learn anytime, anywhere',
];

export default function HeroSection() {
  return (
    <section id="hero" className="hs">

      <div className="hs__wrap">

        {/* ── LEFT — text content (42% column) ── */}
        <div className="hs__left">
          <span className="hs__badge">
            <span className="hs__badge-star">✦</span>
            Learn. Build. Master.
          </span>

          <h1 className="hs__h1">
            Hands-on STEM Learning Through<br />
            Virtual Labs
          </h1>

          <p className="hs__p">
            Learn <span className="hs__kw">Coding</span>,{' '}
            <span className="hs__kw">Electronics</span>,{' '}
            <span className="hs__kw">Mechanics</span>, and{' '}
            <span className="hs__kw">Robotics</span>
            <br />
            using interactive, app-based virtual laboratories.
          </p>
        </div>

        {/* ── RIGHT — phones (58% column) ── */}
        <div className="hs__phones">
          {/* Phone 1 — smaller, left side, starts lower */}
          <img
            src={iphoneImg}
            alt="PSchool App"
            className="hs__phone--first"
          />
          {/* Phone 2 — bigger, right side, starts from top */}
          <img
            src={iphoneImg}
            alt="PSchool App"
            className="hs__phone--second"
          />
        </div>

      </div>

      {/* ── TRUST BAR ── */}
      <div className="hs__trust">
        <div className="hs__trust-row">
          {TRUST.map((t) => (
            <div key={t} className="hs__trust-item">
              <svg className="hs__trust-svg" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#22c55e" />
                <path
                  d="M6.5 11.5l3 3 6-6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
