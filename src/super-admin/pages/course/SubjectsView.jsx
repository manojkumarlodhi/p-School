import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './subjectsview.css';

/* ── Flow indicator banner ── */
function FlowBanner() {
  return (
    <div className="sv-flow-banner">
      <span className="sv-flow-label">Flow</span>
      <div className="sv-flow-steps">
        <span className="sv-flow-dash" />
        <span className="sv-flow-step sv-flow-step-active">Course</span>
        <span className="sv-flow-chevron">»</span>
        <span className="sv-flow-step sv-flow-step-active">Subject</span>
        <span className="sv-flow-chevron">»</span>
        <span className="sv-flow-step">Chapter</span>
        <span className="sv-flow-chevron">»</span>
        <span className="sv-flow-step">Content</span>
        <span className="sv-flow-arrow">→</span>
      </div>
    </div>
  );
}

/* ── Empty state illustration ── */
function EmptyIllustration() {
  return (
    <svg width="240" height="200" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="140" rx="110" ry="70" fill="#e0f7ff" opacity="0.5"/>
      <ellipse cx="130" cy="140" rx="85" ry="52" fill="#b3ecff" opacity="0.4"/>
      <rect x="72" y="105" width="116" height="80" rx="6" fill="#1ba8d5" opacity="0.85"/>
      <rect x="72" y="97" width="48" height="14" rx="4" fill="#1ba8d5" opacity="0.85"/>
      <rect x="72" y="115" width="116" height="70" rx="6" fill="#38bdf8"/>
      <text x="122" y="160" fontSize="28" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="system-ui,sans-serif">X</text>
      <rect x="155" y="78" width="36" height="44" rx="4" fill="#fff" stroke="#b3ecff" strokeWidth="1.5"/>
      <line x1="161" y1="90" x2="185" y2="90" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="161" y1="97" x2="185" y2="97" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="161" y1="104" x2="178" y2="104" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <rect x="68" y="62" width="30" height="38" rx="4" fill="#fff" stroke="#b3ecff" strokeWidth="1.5"/>
      <line x1="74" y1="73" x2="92" y2="73" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="74" y1="80" x2="92" y2="80" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <text x="148" y="75" fontSize="18" fontWeight="700" fill="#1ba8d5" fontFamily="system-ui,sans-serif">?</text>
      <text x="72" y="58" fontSize="14" fontWeight="700" fill="#38bdf8" fontFamily="system-ui,sans-serif">?</text>
      <text x="58" y="108" fontSize="14" fontWeight="700" fill="#f87171" fontFamily="system-ui,sans-serif">×</text>
      <circle cx="88" cy="96" r="10" fill="#fbbf24"/>
      <path d="M78 93 Q88 82 98 93" fill="#1e293b"/>
      <rect x="82" y="106" width="12" height="22" rx="3" fill="#1e293b"/>
      <path d="M80 128 Q88 140 96 128Z" fill="#1e293b"/>
      <line x1="82" y1="112" x2="70" y2="102" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
      <line x1="94" y1="112" x2="104" y2="118" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
      <line x1="86" y1="128" x2="84" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="128" x2="92" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="83" cy="149" rx="5" ry="3" fill="#0f172a"/>
      <ellipse cx="93" cy="149" rx="5" ry="3" fill="#0f172a"/>
      <path d="M108 52 Q130 38 152 52" fill="none" stroke="#b3ecff" strokeWidth="1.5" strokeDasharray="4 3"/>
    </svg>
  );
}

const SUBJECTS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: 'Core Java',
  chapters: 12,
}));

export default function SubjectsView() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [search, setSearch] = useState('');
  const [hasContent] = useState(true); // with content state

  const filtered = SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sv-page">

      {/* ── Page header ── */}
      <div className="sv-page-header">
        <div className="sv-header-left">
          <button className="sv-back-btn" onClick={() => navigate(-1)} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="sv-page-title">Java Full Stack Development</h1>
        </div>
        <span className="sv-breadcrumb">Course Management</span>
      </div>

      {/* ── Body ── */}
      <div className="sv-body">

        {/* Toolbar */}
        <div className="sv-toolbar">
          <span className="sv-toolbar-label">Browse subjects included in this course</span>
          <div className="sv-toolbar-actions">
            <div className="sv-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search" className="sv-search-input"
                value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <button className="sv-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filters
            </button>
            <button className="sv-switch-btn"
              onClick={() => navigate(`/dashboard/course-management/courses/${courseId}/chapters`)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
              Switch hierarchy
            </button>
            <button className="sv-add-btn"
              onClick={() => navigate(`/dashboard/course-management/courses/${courseId}/subjects/add`)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              + Add Subject
            </button>
          </div>
        </div>

        {/* Content */}
        {!hasContent ? (
          <div className="sv-empty-wrap">
            <div className="sv-empty">
              <EmptyIllustration/>
              <h2 className="sv-empty-title">No Content Yet</h2>
              <p className="sv-empty-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
            </div>
          </div>
        ) : (
          <div className="sv-grid">
            {filtered.map((subject) => (
              <div key={subject.id} className="sv-card">
                <div className="sv-card-body">
                  <div className="sv-card-accent"/>
                  <div className="sv-card-info">
                    <h3 className="sv-card-title">{subject.name}</h3>
                    <p className="sv-card-meta">Chapters : {subject.chapters}</p>
                  </div>
                </div>
                <div className="sv-card-footer">
                  <button className="sv-view-link"
                    onClick={() => navigate(`/dashboard/course-management/courses/${courseId}/subjects/${subject.id}/chapters`)}>
                    View All Chapter →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
