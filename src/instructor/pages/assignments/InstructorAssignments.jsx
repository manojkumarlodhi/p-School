import { useState } from 'react';
import './assignments.css';
import { useNavigate } from 'react-router-dom';



const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ASSIGNMENTS = [
  { id: 'a1', name: 'Coding Worksheet 01', class: 'Grade 7A', subject: 'Coding',      submitted: 28, total: 31, due: 'Feb 12, 2026', status: 'active'  },
  { id: 'a2', name: 'Variables Quiz',      class: 'Grade 6B', subject: 'Robotics',    submitted: 20, total: 25, due: 'Feb 14, 2026', status: 'active'  },
  { id: 'a3', name: 'Circuit Lab Task',    class: 'Grade 8C', subject: 'Electronics', submitted: 10, total: 31, due: 'Feb 10, 2026', status: 'pending' },
  { id: 'a4', name: 'Mechanics Project',   class: 'Grade 7D', subject: 'Mechanics',   submitted: 31, total: 31, due: 'Feb 08, 2026', status: 'closed'  },
];

const TABS = ['All', 'Active', 'Pending', 'Closed'];

export default function InstructorAssignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ASSIGNMENTS
    : ASSIGNMENTS.filter(a => a.status === activeTab.toLowerCase());

  return (
    <div className="asglist-page">
      <div className="asglist-header">
        <h1 className="asglist-title">Assignments</h1>
        <button className="asglist-create-btn"
          onClick={() => navigate('/instructor/dashboard/assignments/create')}>
          <PlusIcon /> Create
        </button>
      </div>

      {/* Filter tabs */}
      <div className="asglist-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`asglist-tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="asglist-empty">
          <p className="asglist-empty-text">No {activeTab.toLowerCase()} assignments.</p>
          <button className="asglist-empty-btn"
            onClick={() => navigate('/instructor/dashboard/assignments/create')}>
            + Create Assignment
          </button>
        </div>
      ) : (
        <div className="asglist-list">
          {filtered.map(a => {
            const pct = Math.round((a.submitted / a.total) * 100);
            return (
              <div key={a.id} className="asglist-card"
                onClick={() => navigate(`/instructor/dashboard/assignments/${a.id}`)}>
                <div className="asglist-card-top">
                  <div>
                    <div className="asglist-card-name">{a.name}</div>
                    <div className="asglist-card-class">{a.class} Â· {a.subject}</div>
                  </div>
                  <span className={`asglist-status ${a.status}`}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                </div>
                <div className="asglist-sub-row">
                  <span className="asglist-sub-label">Submissions</span>
                  <div className="asglist-sub-bar">
                    <div className="asglist-sub-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="asglist-sub-count">{a.submitted}/{a.total}</span>
                </div>
                <div className="asglist-card-footer">
                  <div>
                    <div className="asglist-due-label">Due</div>
                    <div className="asglist-due-date">{a.due}</div>
                  </div>
                  <button className="asglist-arrow"><ArrowIcon /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

