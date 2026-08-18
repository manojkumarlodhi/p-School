import { useNavigate } from 'react-router-dom';
import './studentdashboard.css';

const STATS = [
  { label: 'My Classes',       value: 3,  color: '#1ba8d5' },
  { label: 'Assignments Due',  value: 4,  color: '#f59e0b' },
  { label: 'Completed',        value: 12, color: '#22c55e' },
  { label: 'Lab Sessions',     value: 8,  color: '#8b5cf6' },
];
const CLASSES = [
  { id: 'c1', name: 'Grade 7A', subject: 'Coding',      instructor: 'Abhay Verma'  },
  { id: 'c2', name: 'Grade 7A', subject: 'Robotics',    instructor: 'Priya Sharma' },
  { id: 'c3', name: 'Grade 7A', subject: 'Electronics', instructor: 'Amit Patel'   },
];
const ASSIGNMENTS = [
  { id: 'a1', title: 'Coding Worksheet 01', subject: 'Coding',      due: 'Feb 12, 2026', status: 'pending'   },
  { id: 'a2', title: 'Variables Quiz',      subject: 'Coding',      due: 'Feb 14, 2026', status: 'submitted' },
  { id: 'a3', title: 'Circuit Lab Task',    subject: 'Electronics', due: 'Feb 16, 2026', status: 'graded'    },
];
const SUBJECT_COLORS = {
  Coding:      { bg: '#f0f9ff', color: '#1ba8d5' },
  Robotics:    { bg: '#fff7ed', color: '#f59e0b' },
  Electronics: { bg: '#f5f3ff', color: '#8b5cf6' },
};
const PROGRESS = [
  { label: 'Overall Progress',  pct: 72 },
  { label: 'Assignment Score',  pct: 85 },
  { label: 'Lab Participation', pct: 60 },
  { label: 'Attendance',        pct: 94 },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="stdash-page">
      <div className="stdash-page-header">
        <h1 className="stdash-page-title">Home</h1>
        <span className="stdash-breadcrumb">Home</span>
      </div>

      <div className="stdash-greeting">
        <div>
          <p className="stdash-greeting-hello">Good Morning, Aarav 👋</p>
          <p className="stdash-greeting-date">{today}</p>
        </div>
        <button className="stdash-greeting-bell" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </div>

      <div className="stdash-stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="stdash-stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div className="stdash-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stdash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="stdash-section-header">
        <h2 className="stdash-section-title">My Classes</h2>
        <button className="stdash-see-all" onClick={() => navigate('/student/dashboard/classes')}>See All</button>
      </div>
      <div className="stdash-classes-scroll">
        {CLASSES.map(cls => {
          const colors = SUBJECT_COLORS[cls.subject] || { bg: '#f3f4f6', color: '#6b7280' };
          return (
            <div key={cls.id} className="stdash-class-card"
              onClick={() => navigate(`/student/dashboard/classes/${cls.id}`)}>
              <div className="stdash-class-subject-badge" style={{ background: colors.bg, color: colors.color }}>{cls.subject}</div>
              <div className="stdash-class-name">{cls.name}</div>
              <div className="stdash-class-instructor">{cls.instructor}</div>
            </div>
          );
        })}
      </div>

      <div className="stdash-section-header">
        <h2 className="stdash-section-title">Upcoming Assignments</h2>
        <button className="stdash-see-all" onClick={() => navigate('/student/dashboard/assignments')}>See All</button>
      </div>
      <div className="stdash-assignment-list">
        {ASSIGNMENTS.map(a => (
          <div key={a.id} className="stdash-assignment-card"
            onClick={() => navigate(`/student/dashboard/assignments/${a.id}`)}>
            <div className="stdash-assignment-left">
              <div className="stdash-assignment-title">{a.title}</div>
              <div className="stdash-assignment-meta">{a.subject} · Due {a.due}</div>
            </div>
            <span className={`stdash-assignment-status ${a.status}`}>
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <h2 className="stdash-section-title" style={{ marginTop: 24 }}>My Progress</h2>
      <div className="stdash-progress-card">
        {PROGRESS.map(p => (
          <div key={p.label} className="stdash-progress-item">
            <div className="stdash-progress-row">
              <span className="stdash-progress-label">{p.label}</span>
              <span className="stdash-progress-pct">{p.pct}%</span>
            </div>
            <div className="stdash-progress-bar">
              <div className="stdash-progress-fill" style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
