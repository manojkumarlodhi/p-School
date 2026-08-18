import './virtuallabmanagement.css';

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );
}

/* ── Coming Soon SVG illustration ── */
function ComingSoonIllustration() {
  return (
    <svg width="320" height="180" viewBox="0 0 320 180" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* ── Diagonal accent lines ── */}
      <line x1="30" y1="95" x2="130" y2="75" stroke="#1ba8d5" strokeWidth="3"
        strokeLinecap="round" opacity="0.7"/>
      <line x1="190" y1="75" x2="295" y2="95" stroke="#1ba8d5" strokeWidth="3"
        strokeLinecap="round" opacity="0.7"/>

      {/* ── Shadow / base ── */}
      <ellipse cx="160" cy="158" rx="90" ry="10" fill="#1ba8d5" opacity="0.12"/>

      {/* ── Main dark navy speech-bubble shape ── */}
      {/* Rounded rect body */}
      <rect x="60" y="40" width="200" height="90" rx="18" fill="#1e293b"/>
      {/* Bottom-left tail */}
      <path d="M80 130 L65 155 L105 130 Z" fill="#1e293b"/>

      {/* ── Light blue highlight band (top-left) ── */}
      <rect x="60" y="40" width="200" height="38" rx="18" fill="#1ba8d5" opacity="0.18"/>

      {/* ── "COMING" text ── */}
      <text x="160" y="88" textAnchor="middle"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontWeight="900" fontSize="30" letterSpacing="2"
        fill="#ffffff">
        COMING
      </text>

      {/* ── "SOON" text with cyan color ── */}
      <text x="160" y="120" textAnchor="middle"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontWeight="900" fontSize="34" letterSpacing="3"
        fill="#1ba8d5">
        SOON
      </text>

      {/* ── Underline beneath SOON ── */}
      <line x1="100" y1="128" x2="220" y2="128" stroke="#1ba8d5" strokeWidth="3"
        strokeLinecap="round"/>

    </svg>
  );
}

export default function VirtualLabManagement() {
  return (
    <div className="vlm-page">

      {/* ── Page header ── */}
      <div className="vlm-page-header">
        <h1 className="vlm-page-title">Virtual Lab Management</h1>
        <span className="vlm-breadcrumb">
          Course Management &rsaquo; Course List
        </span>
      </div>

      {/* ── Body ── */}
      <div className="vlm-body">
        <div className="vlm-card">

          {/* Toolbar */}
          <div className="vlm-toolbar">
            <h2 className="vlm-toolbar-title">Class List</h2>
            <div className="vlm-toolbar-actions">
              {/* Search */}
              <div className="vlm-search">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  className="vlm-search-input"
                  aria-label="Search labs"
                />
              </div>

              {/* Filters */}
              <button className="vlm-filter-btn" aria-label="Open filters">
                <FilterIcon />
                Filters
              </button>

              {/* Add Lab */}
              <button className="vlm-add-btn" aria-label="Add lab">
                <PlusIcon />
                Add Lab
              </button>
            </div>
          </div>

          {/* ── Coming Soon state ── */}
          <div className="vlm-empty-state">
            <ComingSoonIllustration />
            <p className="vlm-empty-text">
              Virtual Lab features will be available after<br />
              successful third-party lab integration.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
