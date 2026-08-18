import { useState } from 'react';
import './individualassignments.css';
import { useNavigate, useParams } from 'react-router-dom';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* ── Gauge ── */
function Gauge({ value, max }) {
  const r = 38;
  const circ = Math.PI * r; // semicircle = π * r
  const pct = Math.min(value / max, 1);
  // Split: blue for filled portion, green for remainder
  const bluePct = pct * 0.75; // 75% blue
  const greenPct = pct * 0.25; // 25% green
  const blueLen  = circ * bluePct;
  const greenLen = circ * greenPct;
  const gapLen   = circ * (1 - pct);
  return (
    <div className="iad-gauge-wrap">
      <svg className="iad-gauge-svg" viewBox="0 0 100 60">
        {/* Background arc */}
        <path className="iad-gauge-bg-path"
          d="M 11 54 A 39 39 0 0 1 89 54"
          fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
        {/* Blue fill */}
        <path className="iad-gauge-blue-path"
          d="M 11 54 A 39 39 0 0 1 89 54"
          fill="none" stroke="#1ba8d5" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${blueLen} ${circ}`}
          strokeDashoffset={0} />
        {/* Green fill (offset after blue) */}
        <path className="iad-gauge-green-path"
          d="M 11 54 A 39 39 0 0 1 89 54"
          fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${greenLen} ${circ}`}
          strokeDashoffset={-blueLen} />
      </svg>
      <div className="iad-gauge-center">
        <span className="iad-gauge-value">{value}</span>
        <span className="iad-gauge-label">Total</span>
      </div>
    </div>
  );
}

/* ── Overview Tab ── */
function OverviewTab({ navigate, assignmentId, onClose }) {
  return (
    <div className="iad-tab-content">
      <div className="iad-overview-layout">
        <div className="iad-overview-main">
          <h3 className="iad-section-title">Performance Overview</h3>
          <p className="iad-overview-desc">
            Complete the coding worksheet on variables. This assignment covers variable declaration,
            data types, and basic operations. Students should demonstrate understanding of naming
            conventions and proper usage of different variable types in Python.
          </p>

          <h3 className="iad-section-title" style={{ marginTop: 24 }}>Attachments</h3>
          <div className="iad-attachment-item">
            <div className="iad-attachment-icon"><FileIcon /></div>
            <span className="iad-attachment-name">Worksheet.pdf</span>
            <button className="iad-attachment-dl"><DownloadIcon /></button>
          </div>
        </div>

        <div className="iad-overview-actions">
          <button className="iad-btn-edit"
            onClick={() => navigate(`/instructor/individual/dashboard/assignments/${assignmentId}/edit`)}>
            <EditIcon /> Edit Assignment
          </button>
          <button className="iad-btn-reminder">
            <BellIcon /> Send Reminder
          </button>
          <button className="iad-btn-close" onClick={onClose}>
            Close Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Submissions Tab ── */
const SUBMISSIONS = [
  { id: 'sub1', name: 'Aarav Patel',  date: 'Submitted Feb 10, 2026' },
  { id: 'sub2', name: 'Priya Sharma', date: 'Submitted Feb 10, 2026' },
  { id: 'sub3', name: 'Rohan Mehta',  date: 'Submitted Feb 10, 2026' },
  { id: 'sub4', name: 'Sneha Gupta',  date: 'Submitted Feb 10, 2026' },
];

function SubmissionsTab({ assignmentId, navigate }) {
  return (
    <div className="iad-tab-content">
      <div className="iad-sub-stats">
        {[
          { label: 'Students',  value: 32,  cls: '' },
          { label: 'Submitted', value: 28,  cls: 'submitted' },
          { label: 'Pending',   value: 3,   cls: 'pending' },
          { label: 'Late',      value: 2,   cls: 'late' },
        ].map(s => (
          <div key={s.label} className="iad-sub-stat">
            <div className={`iad-sub-stat-value ${s.cls}`}>{s.value}</div>
            <div className="iad-sub-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="iad-sub-total">Total - {SUBMISSIONS.length}</p>

      <div className="iad-sub-table-wrap">
        <table className="iad-sub-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Submitted On</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SUBMISSIONS.map(s => (
              <tr key={s.id} className="iad-sub-row"
                onClick={() => navigate(`/instructor/individual/dashboard/assignments/${assignmentId}/submissions/${s.id}`)}>
                <td>
                  <div className="iad-sub-student">
                    <div className="iad-sub-avatar">{s.name.charAt(0)}</div>
                    <span className="iad-sub-name">{s.name}</span>
                  </div>
                </td>
                <td className="iad-sub-date">{s.date}</td>
                <td>
                  <button className="iad-sub-arrow"><ArrowIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Analytics Tab ── */
function AnalyticsTab() {
  const TIMELINE = [
    { label: 'On Time',       pct: 84, count: '26 students', cls: 'ontime' },
    { label: 'Late',          pct: 6,  count: '2 students',  cls: 'late'   },
    { label: 'Not Submitted', pct: 10, count: '3 students',  cls: 'notsub' },
  ];
  return (
    <div className="iad-tab-content">
      <div className="iad-analytics-grid">
        {/* Average Score */}
        <div className="iad-analytics-card">
          <h3 className="iad-section-title">Average Score</h3>
          <div className="iad-score-row">
            <Gauge value={100} max={100} />
            <div className="iad-score-stats">
              <div className="iad-score-stat-row">
                <span className="iad-score-stat-label">Average</span>
                <span className="iad-score-stat-value">89</span>
              </div>
              <div className="iad-score-stat-row">
                <span className="iad-score-stat-label">Highest Score</span>
                <span className="iad-score-stat-value">98</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="iad-analytics-card">
          <h3 className="iad-section-title">Grade Distribution</h3>
          <div className="iad-grade-dist">
            {[
              { range: '90-100', count: 32 },
              { range: '75-89',  count: 8  },
              { range: '75-0',   count: 2  },
            ].map(g => (
              <div key={g.range} className="iad-grade-bucket">
                <div className="iad-grade-bucket-value">{g.count}</div>
                <div className="iad-grade-bucket-label">{g.range}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Timeline */}
        <div className="iad-analytics-card iad-analytics-full">
          <h3 className="iad-section-title">Submission Timeline</h3>
          {TIMELINE.map(t => (
            <div key={t.label} className="iad-timeline-item">
              <span className="iad-timeline-label">{t.label}</span>
              <div className="iad-timeline-bar-wrap">
                <div className={`iad-timeline-bar ${t.cls}`} style={{ width: `${t.pct}%` }} />
              </div>
              <span className="iad-timeline-count">{t.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Confirm Close Modal ── */
function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <div className="iad-modal-overlay" onClick={onCancel}>
      <div className="iad-modal" onClick={e => e.stopPropagation()}>
        <div className="iad-modal-icon">⚠️</div>
        <h3 className="iad-modal-title">Are you sure?</h3>
        <p className="iad-modal-sub">
          You're about to close this assignment. This action cannot be undone.
        </p>
        <div className="iad-modal-actions">
          <button className="iad-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="iad-modal-confirm" onClick={onConfirm}>Close Assignment</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function IndividualAssignmentDetail() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="iad-page">
      {/* Header */}
      <div className="iad-page-header">
        <div className="iad-page-header-left">
          <button className="iad-back-btn"
            onClick={() => navigate('/instructor/individual/dashboard/assignments')}>
            <BackIcon />
          </button>
          <div>
            <h1 className="iad-page-title">Assignments Details</h1>
            <p className="iad-breadcrumb">Home / Assignments / Details</p>
          </div>
        </div>
      </div>

      {/* Meta grid */}
      <div className="iad-meta-grid">
        <div className="iad-meta-card">
          <div className="iad-meta-label">Class</div>
          <div className="iad-meta-value">Grade 7A</div>
        </div>
        <div className="iad-meta-card">
          <div className="iad-meta-label">Subject</div>
          <div className="iad-meta-value">Coding</div>
        </div>
        <div className="iad-meta-card">
          <div className="iad-meta-label">Due Date</div>
          <div className="iad-meta-value">Feb 12, 2026</div>
        </div>
        <div className="iad-meta-card">
          <div className="iad-meta-label">Total Marks</div>
          <div className="iad-meta-value">100</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="iad-tabs">
        {['overview', 'submissions', 'analytics'].map(tab => (
          <button key={tab}
            className={`iad-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview'    && (
        <OverviewTab navigate={navigate} assignmentId={assignmentId}
          onClose={() => setShowConfirm(true)} />
      )}
      {activeTab === 'submissions' && (
        <SubmissionsTab assignmentId={assignmentId} navigate={navigate} />
      )}
      {activeTab === 'analytics'   && <AnalyticsTab />}

      {showConfirm && (
        <ConfirmModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            navigate('/instructor/individual/dashboard/assignments');
          }}
        />
      )}
    </div>
  );
}
