import { useState } from 'react';
import './instructorvirtuallab.css';

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const LabIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
  </svg>
);
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);

function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`invl-toggle${checked ? ' invl-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="invl-toggle-thumb" />
    </button>
  );
}

/* ── Data ── */
const STATS = [
  { label: 'Lab Sessions Today',   value: '24',            tag: 'My Students',       tagColor: '#1ba8d5' },
  { label: 'Active Lab Sessions',  value: '8',             tag: 'Currently running', tagColor: '#22c55e' },
  { label: 'Most Used Simulator',  value: 'Python Sandbox',tag: '14 sessions today', tagColor: '#1ba8d5' },
];

const LAB_ROWS = [
  { name: 'Python Sandbox',    type: 'Coding',      class: 'Grade 7A', sessions: 14, usage: 58, status: 'Active'   },
  { name: 'Circuit Simulator', type: 'Electronics', class: 'Grade 8C', sessions: 6,  usage: 25, status: 'Active'   },
  { name: 'Robotics Lab',      type: 'Robotics',    class: 'Grade 6B', sessions: 3,  usage: 12, status: 'Limited'  },
  { name: 'Mechanics Sim',     type: 'Mechanics',   class: 'Grade 7D', sessions: 1,  usage: 5,  status: 'Active'   },
  { name: 'Python Sandbox',    type: 'Coding',      class: 'Grade 7A', sessions: 0,  usage: 0,  status: 'Offline'  },
  { name: 'Circuit Simulator', type: 'Electronics', class: 'Grade 8C', sessions: 2,  usage: 8,  status: 'Active'   },
];

const FEATURES = [
  'Python Code Editor',
  'Auto-Run Simulation',
  'Save Projects',
  'Export Files',
  'Advanced Debug Tools',
];

/* ── Lab Policy Modal ── */
function LabPolicyModal({ onClose }) {
  const [labAccess, setLabAccess] = useState(true);
  const [selectedClass, setSelectedClass] = useState('Grade 7A');
  const [dailyLimit, setDailyLimit] = useState('');
  const [features, setFeatures] = useState(
    Object.fromEntries(FEATURES.map(f => [f, true]))
  );

  function toggleFeature(f) {
    setFeatures(prev => ({ ...prev, [f]: !prev[f] }));
  }
  function handleReset() {
    setLabAccess(true);
    setSelectedClass('Grade 7A');
    setDailyLimit('');
    setFeatures(Object.fromEntries(FEATURES.map(f => [f, true])));
  }

  return (
    <div className="invl-modal-overlay" onClick={onClose}>
      <div className="invl-modal" onClick={e => e.stopPropagation()}>
        <div className="invl-modal-header">
          <h3 className="invl-modal-title">Lab Access Policy</h3>
          <button className="invl-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="invl-modal-body">
          <div className="invl-policy-toggle-row">
            <div>
              <div className="invl-policy-toggle-label">Lab Access</div>
              <div className="invl-policy-toggle-desc">Enable or disable lab access for your students</div>
            </div>
            <Toggle checked={labAccess} onChange={setLabAccess} />
          </div>

          <div className="invl-policy-field">
            <label className="invl-policy-label">Select Class</label>
            <div className="invl-select-wrap">
              <select className="invl-select" value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}>
                <option>Grade 7A</option>
                <option>Grade 6B</option>
                <option>Grade 8C</option>
                <option>Grade 7D</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          <div className="invl-policy-field">
            <label className="invl-policy-label">Daily Usage Limit</label>
            <input className="invl-policy-input" placeholder="e.g. 3"
              value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} />
            <p className="invl-policy-hint">Max Sessions Per Student Per Day</p>
          </div>

          <h4 className="invl-features-title">Simulator Feature Access</h4>
          <div className="invl-features-list">
            {FEATURES.map(f => (
              <div key={f} className="invl-feature-row">
                <span className="invl-feature-label">{f}</span>
                <Toggle checked={features[f]} onChange={() => toggleFeature(f)} />
              </div>
            ))}
          </div>

          <div className="invl-policy-notice">
            <WarnIcon />
            <span>Changes will apply to all students assigned to this lab.</span>
          </div>

          <div className="invl-policy-actions">
            <button className="invl-btn-reset" onClick={handleReset}>Reset Changes</button>
            <button className="invl-btn-save" onClick={onClose}>Save Lab Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function InstructorVirtualLab() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showPolicy, setShowPolicy] = useState(false);
  const totalPages = 3;

  const filtered = LAB_ROWS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="invl-page">
      <div className="invl-page-header">
        <h1 className="invl-page-title">Virtual Labs</h1>
        <span className="invl-breadcrumb">Virtual Lab</span>
      </div>

      <div className="invl-body">
        {/* Stats */}
        <div className="invl-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="invl-stat-card">
              <div className="invl-stat-top">
                <LabIcon />
                <span className="invl-stat-tag" style={{ color: s.tagColor }}>{s.tag}</span>
              </div>
              <div className="invl-stat-label">{s.label}</div>
              <div className="invl-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="invl-table-card">
          <div className="invl-toolbar">
            <h2 className="invl-table-title">Lab Usage — My Classes</h2>
            <div className="invl-toolbar-right">
              <div className="invl-search-wrap">
                <SearchIcon />
                <input className="invl-search" placeholder="Search"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="invl-btn invl-btn--text"
                onClick={() => setShowPolicy(true)}>
                Lab Policy
              </button>
            </div>
          </div>

          <div className="invl-table-wrap">
            <table className="invl-table">
              <thead>
                <tr>
                  <th>Simulator Name</th>
                  <th>Lab Type</th>
                  <th>Class</th>
                  <th>Active Sessions</th>
                  <th>Total Usage (Today)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.type}</td>
                    <td>{r.class}</td>
                    <td>{r.sessions}</td>
                    <td>{r.usage}</td>
                    <td>
                      <span className={`invl-status invl-status--${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <button className="invl-launch-btn">
                        <PlayIcon /> Launch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invl-pagination">
            <button className="invl-page-btn--nav"
              onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <PrevIcon /> Previous
            </button>
            <div className="invl-page-numbers">
              {[1, 2, 3].map(n => (
                <button key={n}
                  className={`invl-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
            <button className="invl-page-btn--nav"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next <NextIcon />
            </button>
          </div>
        </div>
      </div>

      {showPolicy && <LabPolicyModal onClose={() => setShowPolicy(false)} />}
    </div>
  );
}
