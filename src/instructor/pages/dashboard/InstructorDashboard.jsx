import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructordashboard.css';

/* ── Icons ── */
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const ClassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);
const StudentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const AssignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const PendingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Data ── */
const STATS = [
  { label: 'Total Classes',        value: 4,   icon: <ClassIcon /> },
  { label: 'Total Students',       value: 119, icon: <StudentIcon /> },
  { label: 'Active Assignments',   value: 3,   icon: <AssignIcon /> },
  { label: 'Pending Submissions',  value: 5,   icon: <PendingIcon /> },
];

const CLASSES = [
  { name: 'Grade 6B', subject: 'Robotics',    students: 25 },
  { name: 'Grade 7A', subject: 'Coding',      students: 30 },
  { name: 'Grade 8C', subject: 'Electronics', students: 28 },
  { name: 'Grade 9B', subject: 'Mechanics',   students: 36 },
];

const ACTIVITY = [
  { title: 'Assignment Submitted', sub: 'Priya submitted Math Assignment',    time: '2 hours ago' },
  { title: 'Assignment Graded',    sub: 'Science Project - Grade 7A',         time: '30 minutes ago' },
  { title: 'New Message',          sub: 'Rohan: How do I submit the assignment?', time: '1 day ago' },
  { title: 'Resource Uploaded',    sub: 'Coding Tutorial - Grade 7A',         time: '2 days ago' },
];

const SUBJECT_COLORS = {
  Robotics:    { bg: '#fff7ed', color: '#f59e0b' },
  Coding:      { bg: '#f0f9ff', color: '#1ba8d5' },
  Electronics: { bg: '#f5f3ff', color: '#8b5cf6' },
  Mechanics:   { bg: '#f0fdf4', color: '#22c55e' },
};

/* ── Component ── */
export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div className="indash-page">

      {/* Page header */}
      <div className="indash-page-header">
        <h1 className="indash-page-title">Home</h1>
        <span className="indash-breadcrumb">Home</span>
      </div>

      {/* Greeting banner */}
      <div className="indash-greeting-banner">
        <div className="indash-greeting-text">
          <p className="indash-greeting-hello">Good Morning, Abhay</p>
          <p className="indash-greeting-date">{today}</p>
        </div>
        <button className="indash-greeting-bell" aria-label="Notifications">
          <BellIcon />
        </button>
      </div>

      {/* Stats */}
      <div className="indash-stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="indash-stat-card">
            <div className="indash-stat-icon">{s.icon}</div>
            <div className="indash-stat-label">{s.label}</div>
            <div className="indash-stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* My Classes */}
      <h2 className="indash-section-title">My Classes</h2>
      <div className="indash-classes-scroll">
        {CLASSES.map(cls => {
          const colors = SUBJECT_COLORS[cls.subject] || { bg: '#f3f4f6', color: '#6b7280' };
          return (
            <div key={cls.name} className="indash-class-card">
              <div className="indash-class-card-top">
                <span className="indash-class-name">{cls.name}</span>
                <span className="indash-class-badge"
                  style={{ background: colors.bg, color: colors.color }}>
                  🏆 {cls.subject}
                </span>
              </div>
              <div className="indash-class-students">
                <div className="indash-class-avatars">
                  {['A','B','C'].map(l => (
                    <div key={l} className="indash-class-avatar">{l}</div>
                  ))}
                </div>
                <span>{cls.students} students</span>
                <button className="indash-class-arrow"
                  onClick={() => navigate('/instructor/dashboard/classes')}>
                  <ArrowIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <h2 className="indash-section-title">Recent Activity</h2>
      <div className="indash-activity-list">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="indash-activity-item">
            <div className="indash-activity-icon"><ActivityIcon /></div>
            <div className="indash-activity-body">
              <div className="indash-activity-title">{a.title}</div>
              <div className="indash-activity-sub">{a.sub}</div>
            </div>
            <div className="indash-activity-time">{a.time}</div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div className="indash-fab-wrap">
        {fabOpen && (
          <div className="indash-fab-menu">
            <button className="indash-fab-menu-item"
              onClick={() => { setFabOpen(false); navigate('/instructor/dashboard/assignments/create'); }}>
              <span className="indash-fab-menu-item-left">
                <span className="indash-fab-menu-plus">+</span>
                Create Assignment
              </span>
              <span className="indash-fab-menu-arrow">›</span>
            </button>
            <button className="indash-fab-menu-item"
              onClick={() => { setFabOpen(false); navigate('/instructor/dashboard/resources/upload'); }}>
              <span className="indash-fab-menu-item-left">
                <span className="indash-fab-menu-plus">+</span>
                Upload Resource
              </span>
              <span className="indash-fab-menu-arrow">›</span>
            </button>
            <button className="indash-fab-menu-item"
              onClick={() => { setFabOpen(false); navigate('/instructor/dashboard/classes/create'); }}>
              <span className="indash-fab-menu-item-left">
                <span className="indash-fab-menu-plus">+</span>
                Create Class
              </span>
              <span className="indash-fab-menu-arrow">›</span>
            </button>
          </div>
        )}
        <button
          className={`indash-fab${fabOpen ? ' open' : ''}`}
          onClick={() => setFabOpen(v => !v)}
          aria-label="Quick actions"
        >
          {fabOpen ? <CloseIcon /> : <PlusIcon />}
        </button>
      </div>

    </div>
  );
}
