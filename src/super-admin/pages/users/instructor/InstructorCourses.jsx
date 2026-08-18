import { useNavigate } from 'react-router-dom';
import './instructorcourses.css';

/* ── Empty state SVG illustration ── */
function EmptyIllustration() {
  return (
    <svg
      width="260"
      height="220"
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="empty-illustration"
    >
      {/* Background blob */}
      <ellipse cx="130" cy="140" rx="110" ry="70" fill="#e0f7ff" opacity="0.5" />
      <ellipse cx="130" cy="140" rx="85" ry="52" fill="#b3ecff" opacity="0.4" />

      {/* Folder back */}
      <rect x="72" y="105" width="116" height="80" rx="6" fill="#1ba8d5" opacity="0.85" />
      {/* Folder tab */}
      <rect x="72" y="97" width="48" height="14" rx="4" fill="#1ba8d5" opacity="0.85" />
      {/* Folder front */}
      <rect x="72" y="115" width="116" height="70" rx="6" fill="#38bdf8" />

      {/* X mark on folder */}
      <text x="122" y="160" fontSize="28" fontWeight="800" fill="#fff" textAnchor="middle"
        fontFamily="system-ui, sans-serif">X</text>

      {/* Floating document 1 */}
      <rect x="155" y="78" width="36" height="44" rx="4" fill="#fff"
        stroke="#b3ecff" strokeWidth="1.5" />
      <line x1="161" y1="90" x2="185" y2="90" stroke="#b3ecff" strokeWidth="2"
        strokeLinecap="round" />
      <line x1="161" y1="97" x2="185" y2="97" stroke="#b3ecff" strokeWidth="2"
        strokeLinecap="round" />
      <line x1="161" y1="104" x2="178" y2="104" stroke="#b3ecff" strokeWidth="2"
        strokeLinecap="round" />

      {/* Floating document 2 */}
      <rect x="68" y="62" width="30" height="38" rx="4" fill="#fff"
        stroke="#b3ecff" strokeWidth="1.5" />
      <line x1="74" y1="73" x2="92" y2="73" stroke="#b3ecff" strokeWidth="2"
        strokeLinecap="round" />
      <line x1="74" y1="80" x2="92" y2="80" stroke="#b3ecff" strokeWidth="2"
        strokeLinecap="round" />

      {/* Question marks */}
      <text x="148" y="75" fontSize="18" fontWeight="700" fill="#1ba8d5"
        fontFamily="system-ui, sans-serif">?</text>
      <text x="72" y="58" fontSize="14" fontWeight="700" fill="#38bdf8"
        fontFamily="system-ui, sans-serif">?</text>

      {/* X marks floating */}
      <text x="58" y="108" fontSize="14" fontWeight="700" fill="#f87171"
        fontFamily="system-ui, sans-serif">×</text>
      <text x="196" y="108" fontSize="12" fontWeight="700" fill="#94a3b8"
        fontFamily="system-ui, sans-serif">×</text>

      {/* Person — body */}
      {/* Head */}
      <circle cx="88" cy="96" r="10" fill="#fbbf24" />
      {/* Hair */}
      <path d="M78 93 Q88 82 98 93" fill="#1e293b" />
      {/* Body */}
      <rect x="82" y="106" width="12" height="22" rx="3" fill="#1e293b" />
      {/* Skirt */}
      <path d="M80 128 Q88 140 96 128Z" fill="#1e293b" />
      {/* Left arm — raised pointing */}
      <line x1="82" y1="112" x2="70" y2="102" stroke="#fbbf24" strokeWidth="3"
        strokeLinecap="round" />
      {/* Right arm */}
      <line x1="94" y1="112" x2="104" y2="118" stroke="#fbbf24" strokeWidth="3"
        strokeLinecap="round" />
      {/* Legs */}
      <line x1="86" y1="128" x2="84" y2="148" stroke="#1e293b" strokeWidth="3"
        strokeLinecap="round" />
      <line x1="90" y1="128" x2="92" y2="148" stroke="#1e293b" strokeWidth="3"
        strokeLinecap="round" />
      {/* Shoes */}
      <ellipse cx="83" cy="149" rx="5" ry="3" fill="#0f172a" />
      <ellipse cx="93" cy="149" rx="5" ry="3" fill="#0f172a" />

      {/* Cloud dashes around */}
      {[
        [115, 55], [140, 45], [165, 55],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#b3ecff"
          strokeWidth="1.5" strokeDasharray="3 3" />
      ))}
      <path d="M108 52 Q130 38 152 52" fill="none" stroke="#b3ecff"
        strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

export default function InstructorCourses() {
  const navigate = useNavigate();

  return (
    <div className="icrs-page">

      {/* ── Page header ── */}
      <div className="icrs-page-header">
        <div className="icrs-header-left">
          <button
            className="icrs-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="icrs-page-title">Instructor Courses Created</h1>
        </div>
        <span className="icrs-breadcrumb">
          User Management &rsaquo; Instructors &rsaquo; Instructors Details &rsaquo; Courses Created
        </span>
      </div>

      {/* ── Empty state ── */}
      <div className="icrs-body">
        <div className="icrs-empty">
          <EmptyIllustration />
          <h2 className="icrs-empty-title">No Content Yet</h2>
          <p className="icrs-empty-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          </p>
        </div>
      </div>

    </div>
  );
}
