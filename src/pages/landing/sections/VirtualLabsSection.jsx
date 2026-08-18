import { useState } from 'react';
import codingImg      from '../../../assets/images/realtimecoading.png';
import circuitImg     from '../../../assets/images/circuit&Robotics.png';
import safeImg        from '../../../assets/images/safeexperimentation.png';
import './virtuallabssection.css';

/* ── Icons ── */
function CodingIcon({ active }) {
  return (
    <span className={`vls__icon-wrap${active ? ' vls__icon-wrap--active' : ''}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill={active ? '#1a8fe3' : '#111827'} />
        <polyline points="8 9 4 12 8 15"  stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 9 20 12 16 15" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="13" y1="7" x2="11" y2="17" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CircuitIcon({ active }) {
  return (
    <span className={`vls__icon-wrap${active ? ' vls__icon-wrap--active' : ''}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.6" />
        <path d="M12 6v2M12 16v2M6 12H4M20 12h-2" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.6" />
        <path d="M8.5 8.5l1.5 1.5M14 14l1.5 1.5M15.5 8.5L14 10M10 14l-1.5 1.5" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function SafeIcon({ active }) {
  return (
    <span className={`vls__icon-wrap${active ? ' vls__icon-wrap--active' : ''}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 3z" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.6" />
        <circle cx="14" cy="13" r="4" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.4" />
        <path d="M10 10l-2 2 2 2" stroke={active ? '#1a8fe3' : '#374151'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.08)" />
      <polyline points="7 12 10.5 15.5 17 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Data ── */
const FEATURES = [
  {
    id: 'coding',
    Icon: CodingIcon,
    title: 'Real-time Coding Environments',
    desc: 'Write, execute, and debug code instantly',
    image: codingImg,
  },
  {
    id: 'circuit',
    Icon: CircuitIcon,
    title: 'Circuit & Robotics Simulation',
    desc: 'Design and test electronics and robots without hardware',
    image: circuitImg,
  },
  {
    id: 'safe',
    Icon: SafeIcon,
    title: 'Safe Experimentation',
    desc: 'Learn with instant feedback and no risk of damage',
    image: safeImg,
  },
];

const BENEFITS = [
  { id: 'no-lab',  title: 'No Physical Labs Needed',  desc: 'All equipment and experiments simulated digitally' },
  { id: 'anytime', title: 'Learn Anytime, Anywhere',   desc: 'Your mobile device is your complete lab' },
  { id: 'mastery', title: 'Practice-Driven Mastery',   desc: 'Learn through hands-on experimentation' },
];

export default function VirtualLabsSection() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="vls">
      <div className="lp-container vls__inner">

        {/* ── Heading ── */}
        <div className="vls__hd">
          <h2 className="vls__h2">
            Practical Learning Powered by<br />Virtual Labs
          </h2>
          <p className="vls__sub">
            Experience real-time coding environments, circuit simulators,<br />
            and robotics platforms—all in one app
          </p>
        </div>

        {/* ── Feature rows ── */}
        <div className="vls__features">
          {FEATURES.map((f) => {
            const isActive = activeId === f.id;
            return (
              <div
                key={f.id}
                className={`vls__row${isActive ? ' vls__row--active' : ''}`}
                onMouseEnter={() => setActiveId(f.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Image — slides in from left when active */}
                <div className={`vls__row-img${isActive ? ' vls__row-img--visible' : ''}`}>
                  <img src={f.image} alt={f.title} />
                </div>

                {/* Content */}
                <div className="vls__row-content">
                  <f.Icon active={isActive} />
                  <h3 className={`vls__row-title${isActive ? ' vls__row-title--active' : ''}`}>
                    {f.title}
                  </h3>
                  <p className="vls__row-desc">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Benefit cards ── */}
        <div className="vls__benefits">
          {BENEFITS.map((b) => (
            <div key={b.id} className="vls__benefit">
              <CheckIcon />
              <h4 className="vls__benefit-title">{b.title}</h4>
              <p className="vls__benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
