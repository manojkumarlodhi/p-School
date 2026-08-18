import { useState } from 'react';
import './assignments.css';
import { useNavigate, useParams } from 'react-router-dom';


/* â”€â”€ Icons â”€â”€ */
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

/* â”€â”€ Gauge component â”€â”€ */
function Gauge({ value, max, color = '#1ba8d5' }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circ * (1 - pct * 0.75); // 270Â° arc
  return (
    <div className="asgd-gauge-wrap">
      <svg className="asgd-gauge-svg" viewBox="0 0 100 100">
        <circle className="asgd-gauge-bg" cx="50" cy="50" r={r}
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={0} />
        <circle className="asgd-gauge-fill" cx="50" cy="50" r={r}
          style={{ stroke: color }}
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={circ * 0.75 * (1 - pct)} />
      </svg>
      <div className="asgd-gauge-center">
        <span className="asgd-gauge-value">{value}</span>
        <span className="asgd-gauge-label">Total</span>
      </div>
    </div>
  );
}

/* â”€â”€ Overview Tab â”€â”€ */
function OverviewTab({ navigate, onClose }) {
  return (
    <>
      <h3 className="asgd-overview-title">Performance Overview</h3>
      <p className="asgd-overview-desc">
        Complete the coding worksheet on variables. This assignment covers variable declaration,
        data types, and basic operations. Students should demonstrate understanding of naming
        conventions and proper usage of different variable types in Python.
      </p>

      <h3 className="asgd-attachments-title">Attachments</h3>
      <div className="asgd-attachment-item">
        <div className="asgd-attachment-icon"><FileIcon /></div>
        <span className="asgd-attachment-name">Worksheet.pdf</span>
        <button className="asgd-attachment-dl"><DownloadIcon /></button>
      </div>

      <div className="asgd-actions">
        <button className="asgd-btn-edit"
          onClick={() => navigate('/instructor/dashboard/assignments/create')}>
          <EditIcon /> Edit Assignment
        </button>
        <button className="asgd-btn-reminder">
          <BellIcon /> Send Reminder
        </button>
        <button className="asgd-btn-close" onClick={onClose}>
          Close Assignment
        </button>
      </div>
    </>
  );
}

/* â”€â”€ Submissions Tab â”€â”€ */
const SUBMISSIONS = [
  { id: 'sub1', name: 'Aarav Patel',  date: 'Submitted Feb 10, 2026' },
  { id: 'sub2', name: 'Aarav Patel',  date: 'Submitted Feb 10, 2026' },
  { id: 'sub3', name: 'Aarav Patel',  date: 'Submitted Feb 10, 2026' },
  { id: 'sub4', name: 'Aarav Patel',  date: 'Submitted Feb 10, 2026' },
];

function SubmissionsTab({ classId, assignmentId, navigate }) {
  return (
    <>
      <div className="asgd-sub-stats">
        <div className="asgd-sub-stat">
          <div className="asgd-sub-stat-value">32</div>
          <div className="asgd-sub-stat-label">Students</div>
        </div>
        <div className="asgd-sub-stat">
          <div className="asgd-sub-stat-value submitted">28</div>
          <div className="asgd-sub-stat-label">Submitted</div>
        </div>
        <div className="asgd-sub-stat">
          <div className="asgd-sub-stat-value pending">3</div>
          <div className="asgd-sub-stat-label">Pending</div>
        </div>
        <div className="asgd-sub-stat">
          <div className="asgd-sub-stat-value late">2</div>
          <div className="asgd-sub-stat-label">Late</div>
        </div>
      </div>

      <p className="asgd-sub-total">Total - {SUBMISSIONS.length}</p>

      <div className="asgd-sub-list">
        {SUBMISSIONS.map(s => (
          <div key={s.id} className="asgd-sub-item"
            onClick={() => navigate(`/instructor/dashboard/classes/${classId}/assignments/${assignmentId}/submissions/${s.id}`)}>
            <div className="asgd-sub-avatar">{s.name.charAt(0)}</div>
            <div className="asgd-sub-body">
              <div className="asgd-sub-name">{s.name}</div>
              <div className="asgd-sub-date">{s.date}</div>
            </div>
            <button className="clsd-assignment-arrow"><ArrowIcon /></button>
          </div>
        ))}
      </div>
    </>
  );
}

/* â”€â”€ Analytics Tab â”€â”€ */
function AnalyticsTab() {
  const TIMELINE = [
    { label: 'On Time',       pct: 84, count: '26 students', cls: 'ontime' },
    { label: 'Late',          pct: 6,  count: '2 students',  cls: 'late'   },
    { label: 'Not Submitted', pct: 10, count: '3 students',  cls: 'notsub' },
  ];
  return (
    <>
      <div className="asgd-analytics-section">
        <h3 className="asgd-analytics-title">Average Score</h3>
        <div className="asgd-score-row">
          <Gauge value={100} max={100} color="#1ba8d5" />
          <div className="asgd-score-stats">
            <div className="asgd-score-stat-row">
              <span className="asgd-score-stat-label">Average</span>
              <span className="asgd-score-stat-value">899</span>
            </div>
            <div className="asgd-score-stat-row">
              <span className="asgd-score-stat-label">Highest Score</span>
              <span className="asgd-score-stat-value">98</span>
            </div>
          </div>
        </div>
      </div>

      <div className="asgd-analytics-section">
        <h3 className="asgd-analytics-title">Grade Distribution</h3>
        <div className="asgd-grade-dist">
          {[
            { range: '90-100', count: 32 },
            { range: '75-89',  count: 8  },
            { range: '75-0',   count: 2  },
          ].map(g => (
            <div key={g.range} className="asgd-grade-bucket">
              <div className="asgd-grade-bucket-value">{g.count}</div>
              <div className="asgd-grade-bucket-label">{g.range}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="asgd-analytics-section">
        <h3 className="asgd-analytics-title">Submission Timeline</h3>
        {TIMELINE.map(t => (
          <div key={t.label} className="asgd-timeline-item">
            <span className="asgd-timeline-label">{t.label}</span>
            <div className="asgd-timeline-bar-wrap">
              <div className={`asgd-timeline-bar ${t.cls}`} style={{ width: `${t.pct}%` }} />
            </div>
            <span className="asgd-timeline-count">{t.count}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* â”€â”€ Confirm Close Modal â”€â”€ */
function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <div className="asgd-modal-overlay" onClick={onCancel}>
      <div className="asgd-modal" onClick={e => e.stopPropagation()}>
        <div className="asgd-modal-icon">âš ï¸</div>
        <h3 className="asgd-modal-title">Are you sure?</h3>
        <p className="asgd-modal-sub">
          You're about to delete your account. This action cannot be undone.
        </p>
        <div className="asgd-modal-actions">
          <button className="asgd-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="asgd-modal-confirm" onClick={onConfirm}>Close Assignment</button>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ Main â”€â”€ */
export default function InstructorAssignmentDetail() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showConfirm, setShowConfirm] = useState(false);

  const backPath = classId
    ? `/instructor/dashboard/classes/${classId}`
    : '/instructor/dashboard/assignments';

  return (
    <div className="asgd-page">
      <div className="asgd-header">
        <button className="asgd-back-btn" onClick={() => navigate(backPath)}>
          <BackIcon /> Assignments Details
        </button>
      </div>

      {/* Meta grid */}
      <div className="asgd-meta-grid">
        <div className="asgd-meta-card">
          <div className="asgd-meta-label">Class</div>
          <div className="asgd-meta-value">Grade 7A</div>
        </div>
        <div className="asgd-meta-card">
          <div className="asgd-meta-label">Subject</div>
          <div className="asgd-meta-value">Coding</div>
        </div>
        <div className="asgd-meta-card">
          <div className="asgd-meta-label">Due Date</div>
          <div className="asgd-meta-value">Feb 12, 2026</div>
        </div>
        <div className="asgd-meta-card">
          <div className="asgd-meta-label">Total Marks:</div>
          <div className="asgd-meta-value">100</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="asgd-tabs">
        {['overview', 'submissions', 'analytics'].map(tab => (
          <button
            key={tab}
            className={`asgd-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview'    && (
        <OverviewTab navigate={navigate} onClose={() => setShowConfirm(true)} />
      )}
      {activeTab === 'submissions' && (
        <SubmissionsTab classId={classId} assignmentId={assignmentId} navigate={navigate} />
      )}
      {activeTab === 'analytics'   && <AnalyticsTab />}

      {showConfirm && (
        <ConfirmModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => { setShowConfirm(false); navigate(backPath); }}
        />
      )}
    </div>
  );
}

