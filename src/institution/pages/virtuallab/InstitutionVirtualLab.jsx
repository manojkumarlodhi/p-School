import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionvirtuallab.css';

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const LabIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
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

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`ivl-toggle${checked ? ' ivl-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="ivl-toggle-thumb" />
    </button>
  );
}

/* ── Lab data ── */
const STATS = [
  { label: 'Lab Usage Today', value: '148', tag: 'Sessions',         tagColor: '#1ba8d5' },
  { label: 'Active Lab Sessions', value: '32', tag: 'Currently running', tagColor: '#22c55e' },
  { label: 'Most Used Simulator', value: 'Python Sandbox', tag: '64 sessions today', tagColor: '#1ba8d5' },
];

const LAB_ROWS = Array.from({ length: 8 }, (_, i) => ({
  name: 'Python Sandbox',
  type: 'Coding',
  sessions: i === 0 ? 18 : 45,
  usage: 64,
  status: i === 1 ? 'Limited' : 'Active',
}));

const FEATURES = [
  'Python Code Editor',
  'Auto-Run Simulation',
  'Save Projects',
  'Export Files',
  'Advanced Debug Tools',
];

/* ── Lab Access Policy Modal ── */
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
    <div className="ivl-modal-overlay" onClick={onClose}>
      <div className="ivl-modal" onClick={e => e.stopPropagation()}>

        <div className="ivl-modal-header">
          <h3 className="ivl-modal-title">Lab Access Policy</h3>
          <button className="ivl-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="ivl-modal-body">

          {/* Lab Access toggle */}
          <div className="ivl-policy-toggle-row">
            <div>
              <div className="ivl-policy-toggle-label">Lab Access</div>
              <div className="ivl-policy-toggle-desc">Enable or disable lab access for all students</div>
            </div>
            <Toggle checked={labAccess} onChange={setLabAccess} />
          </div>

          {/* Select Class */}
          <div className="ivl-policy-field">
            <label className="ivl-policy-label">Select Class</label>
            <div className="ivl-select-wrap">
              <select className="ivl-select" value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}>
                <option>Grade 7A</option>
                <option>Grade 7B</option>
                <option>Grade 8A</option>
                <option>Grade 8B</option>
                <option>Grade 9A</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Daily Usage Limit */}
          <div className="ivl-policy-field">
            <label className="ivl-policy-label">Daily Usage Limit</label>
            <input className="ivl-policy-input" placeholder="Daily Usage Limit"
              value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} />
            <p className="ivl-policy-hint">Max Sessions Per Student Per Day</p>
          </div>

          {/* Simulator Feature Access */}
          <h4 className="ivl-features-title">Simulator Feature Access</h4>
          <div className="ivl-features-list">
            {FEATURES.map(f => (
              <div key={f} className="ivl-feature-row">
                <span className="ivl-feature-label">{f}</span>
                <Toggle checked={features[f]} onChange={() => toggleFeature(f)} />
              </div>
            ))}
          </div>

          {/* Warning notice */}
          <div className="ivl-policy-notice">
            <WarnIcon />
            <span>Changes will apply to all students assigned to this lab.</span>
          </div>

          {/* Actions */}
          <div className="ivl-policy-actions">
            <button className="ivl-btn-reset" onClick={handleReset}>Reset Changes</button>
            <button className="ivl-btn-save" onClick={onClose}>Save Lab Policy</button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function InstitutionVirtualLab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showPolicy, setShowPolicy] = useState(false);
  const totalPages = 10;

  const filtered = LAB_ROWS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ivl-page">

      <div className="ivl-page-header">
        <h1 className="ivl-page-title">Virtual Labs</h1>
        <span className="ivl-breadcrumb">Virtual Lab</span>
      </div>

      <div className="ivl-body">

        {/* ── Stats cards ── */}
        <div className="ivl-stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="ivl-stat-card">
              <div className="ivl-stat-top">
                <LabIcon />
                <span className="ivl-stat-tag" style={{ color: s.tagColor }}>{s.tag}</span>
              </div>
              <div className="ivl-stat-label">{s.label}</div>
              <div className="ivl-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Lab Usage table ── */}
        <div className="ivl-table-card">

          <div className="ivl-toolbar">
            <h2 className="ivl-table-title">Lab Usage</h2>
            <div className="ivl-toolbar-right">
              <div className="ivl-search-wrap">
                <SearchIcon />
                <input className="ivl-search" placeholder="Search"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="ivl-btn ivl-btn--outline"><FilterIcon /> Filters</button>
              <button className="ivl-btn ivl-btn--text"
                onClick={() => setShowPolicy(true)}>
                Lab Policy
              </button>
            </div>
          </div>

          <div className="ivl-table-wrap">
            <table className="ivl-table">
              <thead>
                <tr>
                  <th>Simulator Name</th>
                  <th>Lab Type</th>
                  <th>Active Sessions</th>
                  <th>Total Usage (Today)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.type}</td>
                    <td>{r.sessions}</td>
                    <td>{r.usage}</td>
                    <td>
                      <span className={`ivl-status ivl-status--${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ivl-pagination">
            <button className="ivl-page-btn--nav"
              onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <PrevIcon /> Previous
            </button>
            <div className="ivl-page-numbers">
              {[1, 2, 3].map(n => (
                <button key={n} className={`ivl-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
              <span className="ivl-page-ellipsis">...</span>
              {[8, 9, 10].map(n => (
                <button key={n} className={`ivl-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
            <button className="ivl-page-btn--nav"
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
