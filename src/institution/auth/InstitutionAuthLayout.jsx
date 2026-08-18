import './institutionauth.css';

/* ── Orbit node icons ── */
/* Each node: angle in degrees (0 = top, clockwise), radius (px from center), icon */
const NODES = [
  { angle:  -60, r: 190, icon: 'robot'   },  // top-right outer
  { angle:   10, r: 190, icon: 'layers'  },  // right outer
  { angle:   75, r: 190, icon: 'atom'    },  // bottom-right outer
  { angle:  140, r: 190, icon: 'robot2'  },  // bottom outer
  { angle:  200, r: 190, icon: 'gear'    },  // bottom-left outer
  { angle:  260, r: 190, icon: 'layers2' },  // left outer
  { angle:  310, r: 190, icon: 'bug'     },  // top-left outer
  { angle: -110, r: 190, icon: 'robot3'  },  // top outer-left
  { angle: -20,  r: 190, icon: 'atom2'   },  // top-right
];

function deg2rad(d) { return (d * Math.PI) / 180; }

/* ── Icon SVGs ── */
const ICON_SVGS = {
  robot: { color: '#7c3aed', path: <><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M7 15h.01M17 15h.01"/></> },
  layers: { color: '#1ba8d5', path: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></> },
  atom: { color: '#6b7280', path: <><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></> },
  robot2: { color: '#1ba8d5', path: <><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M7 15h.01M17 15h.01"/></> },
  gear: { color: '#f59e0b', path: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
  layers2: { color: '#1ba8d5', path: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></> },
  bug: { color: '#ef4444', path: <><path d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 116 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 014-4h4a4 4 0 014 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/></> },
  robot3: { color: '#7c3aed', path: <><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><path d="M7 15h2M15 15h2"/></> },
  atom2: { color: '#ec4899', path: <><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/></> },
};

/* ── Right panel SVG illustration ── */
function OrbitIllustration() {
  const cx = 210; // SVG center x
  const cy = 210; // SVG center y

  return (
    <svg
      className="inst-auth-orbit-svg"
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Concentric circles ── */}
      <circle cx={cx} cy={cy} r="190" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r="130" fill="none" stroke="rgba(255,255,255,0.6)"  strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r="70"  fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>

      {/* ── Center P logo ── */}
      <defs>
        <radialGradient id="pGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#1ba8d5"/>
        </radialGradient>
        <filter id="pShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1ba8d5" floodOpacity="0.4"/>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r="42" fill="url(#pGrad)" filter="url(#pShadow)"/>
      <text x={cx} y={cy + 14} textAnchor="middle"
        fontFamily="system-ui, 'Segoe UI', sans-serif"
        fontWeight="900" fontSize="40" fill="#fff">
        P
      </text>

      {/* ── Orbit nodes ── */}
      {NODES.map((node, i) => {
        const rad = deg2rad(node.angle - 90); // -90 so 0° = top
        const nx = cx + node.r * Math.cos(rad);
        const ny = cy + node.r * Math.sin(rad);
        const ic = ICON_SVGS[node.icon];
        if (!ic) return null;
        return (
          <g key={i}>
            {/* White circle background */}
            <circle cx={nx} cy={ny} r="22" fill="#fff"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}/>
            {/* Icon — centered at nx,ny */}
            <g transform={`translate(${nx - 11}, ${ny - 11})`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={ic.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {ic.path}
              </svg>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default function InstitutionAuthLayout({ children }) {
  return (
    <div className="inst-auth-page">
      <div className="inst-auth-card">

        {/* ── LEFT: form panel ── */}
        <div className="inst-auth-form-panel">
          <div className="inst-auth-form-inner">
            {children}
          </div>
        </div>

        {/* ── RIGHT: light blue orbit panel ── */}
        <div className="inst-auth-image-panel">

          {/* Top text */}
          <div className="inst-auth-image-top">
            <h2 className="inst-auth-image-title">
              Built for Modern<br />Education Management
            </h2>
            <p className="inst-auth-image-subtitle">
              P-School enables scalable learning operations with role-based access,
              quality control, and performance tracking across individuals and institutions.
            </p>
          </div>

          {/* SVG orbit illustration — fills remaining space */}
          <div className="inst-auth-orbit-container">
            <OrbitIllustration />
          </div>

        </div>
      </div>
    </div>
  );
}
