import { useState } from 'react';
import './individualassignments.css';
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

const ASSIGNMENTS = [
  { id: 'a1', name: 'Coding Worksheet 01', course: 'Java Full Stack', category: 'Coding', submitted: 28, total: 31, due: 'Feb 12, 2026', status: 'active'  },
  { id: 'a2', name: 'Variables Quiz',      course: 'Python Basics',   category: 'Coding', submitted: 20, total: 25, due: 'Feb 14, 2026', status: 'active'  },
  { id: 'a3', name: 'Circuit Lab Task',    course: 'Electronics 101', category: 'Electronics', submitted: 10, total: 31, due: 'Feb 10, 2026', status: 'pending' },
  { id: 'a4', name: 'Mechanics Project',   course: 'Robotics Pro',    category: 'Robotics', submitted: 31, total: 31, due: 'Feb 08, 2026', status: 'closed'  },
];

const TABS = ['All', 'Active', 'Pending', 'Closed'];

export default function IndividualAssignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ASSIGNMENTS
    : ASSIGNMENTS.filter(a => a.status === activeTab.toLowerCase());

  return (
    <div className="iasg-page">
      {/* Page header */}
      <div className="iasg-page-header">
        <div>
          <h1 className="iasg-page-title">Assignments</h1>
          <p className="iasg-breadcrumb">Home / Assignments</p>
        </div>
        <button className="iasg-create-btn"
          onClick={() => navigate('/instructor/individual/dashboard/assignments/create')}>
          <PlusIcon /> Create Assignment
        </button>
      </div>

      {/* Filter tabs */}
      <div className="iasg-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`iasg-tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="iasg-stats-row">
        <div className="iasg-stat-card">
          <div className="iasg-stat-value">{ASSIGNMENTS.length}</div>
          <div className="iasg-stat-label">Total</div>
        </div>
        <div className="iasg-stat-card">
          <div className="iasg-stat-value active">{ASSIGNMENTS.filter(a => a.status === 'active').length}</div>
          <div className="iasg-stat-label">Active</div>
        </div>
        <div className="iasg-stat-card">
          <div className="iasg-stat-value pending">{ASSIGNMENTS.filter(a => a.status === 'pending').length}</div>
          <div className="iasg-stat-label">Pending</div>
        </div>
        <div className="iasg-stat-card">
          <div className="iasg-stat-value closed">{ASSIGNMENTS.filter(a => a.status === 'closed').length}</div>
          <div className="iasg-stat-label">Closed</div>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="iasg-empty">
          <div className="iasg-empty-icon">📋</div>
          <p className="iasg-empty-title">No Assignments Created Yet</p>
          <p className="iasg-empty-sub">You haven't created any assignments yet.</p>
          <button className="iasg-empty-btn"
            onClick={() => navigate('/instructor/individual/dashboard/assignments/create')}>
            + Create Assignment
          </button>
        </div>
      ) : (
        <div className="iasg-table-wrap">
          <table className="iasg-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Course</th>
                <th>Submissions</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const pct = Math.round((a.submitted / a.total) * 100);
                return (
                  <tr key={a.id} className="iasg-row"
                    onClick={() => navigate(`/instructor/individual/dashboard/assignments/${a.id}`)}>
                    <td>
                      <div className="iasg-asg-name">{a.name}</div>
                      <div className="iasg-asg-cat">{a.category}</div>
                    </td>
                    <td className="iasg-course">{a.course}</td>
                    <td>
                      <div className="iasg-sub-wrap">
                        <div className="iasg-sub-bar">
                          <div className="iasg-sub-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="iasg-sub-count">{a.submitted}/{a.total}</span>
                      </div>
                    </td>
                    <td className="iasg-due">{a.due}</td>
                    <td>
                      <span className={`iasg-status ${a.status}`}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="iasg-arrow"><ArrowIcon /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
