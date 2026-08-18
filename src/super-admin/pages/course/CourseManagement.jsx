import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './coursemanagement.css';

/* ── Category icons as inline SVGs ── */
function MechanicsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#e0f7ff" />
      <path d="M16 20c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
        stroke="#1ba8d5" strokeWidth="2" fill="none" />
      <path d="M28 28c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
        stroke="#1ba8d5" strokeWidth="2" fill="none" />
      <path d="M24 20h4M20 24v4" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 32l4-4M30 16l4-4" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="#1ba8d5" />
      <circle cx="32" cy="28" r="2" fill="#1ba8d5" />
    </svg>
  );
}

function RoboticsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#e0f7ff" />
      <rect x="16" y="20" width="16" height="14" rx="3" stroke="#1ba8d5" strokeWidth="2" fill="none" />
      <rect x="20" y="24" width="3" height="3" rx="1" fill="#1ba8d5" />
      <rect x="25" y="24" width="3" height="3" rx="1" fill="#1ba8d5" />
      <path d="M22 30h4" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20v-4" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="15" r="2" fill="#1ba8d5" />
      <path d="M16 26h-3M35 26h-3" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CodingIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#e0f7ff" />
      <path d="M19 18l-6 6 6 6" stroke="#1ba8d5" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 18l6 6-6 6" stroke="#1ba8d5" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 15l-4 18" stroke="#1ba8d5" strokeWidth="2"
        strokeLinecap="round" />
    </svg>
  );
}

function ElectronicsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#e0f7ff" />
      <path d="M14 24h4M30 24h4" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18v12M30 18v12" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 20v8M26 20v8" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="#1ba8d5" />
    </svg>
  );
}

const CATEGORIES = [
  { id: 'mechanics',   label: 'Mechanics',   Icon: MechanicsIcon,   courses: 24, institutions: 16, instructors: 10, status: true  },
  { id: 'robotics',    label: 'Robotics',    Icon: RoboticsIcon,    courses: 24, institutions: 16, instructors: 10, status: true  },
  { id: 'coding',      label: 'Coding',      Icon: CodingIcon,      courses: 24, institutions: 16, instructors: 10, status: true  },
  { id: 'electronics', label: 'Electronics', Icon: ElectronicsIcon, courses: 24, institutions: 16, instructors: 10, status: false },
];

export default function CourseManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState(
    Object.fromEntries(CATEGORIES.map((c) => [c.id, c.status]))
  );

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) =>
    setStatuses((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="cm-page">

      {/* ── Page header ── */}
      <div className="cm-page-header">
        <h1 className="cm-page-title">Course Management</h1>
        <span className="cm-breadcrumb">Course Management</span>
      </div>

      <div className="cm-body">

        {/* ── Toolbar ── */}
        <div className="cm-toolbar">
          <div className="cm-toolbar-left">
            <h2 className="cm-section-title">Course Categories List</h2>
          </div>
          <div className="cm-toolbar-actions">
            <div className="cm-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search courses by name or category"
                className="cm-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="cm-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
            </button>
            <button className="cm-add-btn" onClick={() => navigate('/dashboard/course-management/categories/create')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add New Categories
            </button>
          </div>
        </div>

        {/* System note */}
        <p className="cm-system-note">
          This category is system-defined and cannot be edited or deleted.
        </p>

        {/* ── Category cards grid ── */}
        <div className="cm-cards-grid">
          {filtered.map((cat) => (
            <div key={cat.id} className="cm-card">
              {/* Top row: icon + status */}
              <div className="cm-card-top">
                <cat.Icon />
                <div className="cm-card-status">
                  <span className="cm-status-label">Status</span>
                  <label className="cm-toggle">
                    <input
                      type="checkbox"
                      checked={statuses[cat.id]}
                      onChange={() => toggleStatus(cat.id)}
                    />
                    <span className="cm-toggle-slider" />
                  </label>
                </div>
              </div>

              {/* Category name */}
              <h3 className="cm-card-title">{cat.label}</h3>

              {/* Stats row */}
              <div className="cm-card-stats">
                <div className="cm-card-stat">
                  <div className="cm-card-stat-label">Courses</div>
                  <div className="cm-card-stat-value">{cat.courses}</div>
                </div>
                <div className="cm-card-stat">
                  <div className="cm-card-stat-label">Institutions</div>
                  <div className="cm-card-stat-value">{cat.institutions}</div>
                </div>
                <div className="cm-card-stat">
                  <div className="cm-card-stat-label">Instructor</div>
                  <div className="cm-card-stat-value">{cat.instructors}</div>
                </div>
              </div>

              {/* View Details button */}
              <div className="cm-card-footer">
                <button
                  className="cm-view-btn"
                  onClick={() => navigate(`/dashboard/course-management/categories/${cat.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
