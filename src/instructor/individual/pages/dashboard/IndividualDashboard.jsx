import { useNavigate } from 'react-router-dom';
import './individualdashboard.css';

const STATS = [
  { label: 'Total Students',   value: '1,284', color: '#3b82f6', bg: '#eff6ff',  icon: '👥' },
  { label: 'Active Courses',   value: '18',    color: '#f59e0b', bg: '#fffbeb',  icon: '📚' },
  { label: 'Monthly Earnings', value: '₹84k',  color: '#22c55e', bg: '#f0fdf4',  icon: '💰' },
  { label: 'Pending Course',   value: '3',     color: '#8b5cf6', bg: '#f5f3ff',  icon: '⏳' },
];

const QUICK_ACTIONS = [
  { label: 'Create Course',  icon: '➕', path: '/instructor/individual/dashboard/courses/create'   },
  { label: 'Assignments',    icon: '📋', path: '/instructor/individual/dashboard/assignments'       },
  { label: 'Announcement',   icon: '📢', path: '/instructor/individual/dashboard/announcements'     },
  { label: 'Messages',       icon: '💬', path: '/instructor/individual/dashboard/messages'          },
  { label: 'Wallet',         icon: '💳', path: '/instructor/individual/dashboard/wallet'            },
];

const ACTIVITY = [
  { title: 'Assignment Submitted', sub: 'Priya submitted Math Assignment',       time: '2 hours ago' },
  { title: 'Assignment Graded',    sub: 'Science Project - Grade 7A',            time: '30 minutes ago' },
  { title: 'New Message',          sub: 'Rohan: How do I submit the assignment?', time: '1 day ago' },
  { title: 'Resource Uploaded',    sub: 'Coding Tutorial - Grade 7A',            time: '2 days ago' },
];

const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function IndividualDashboard() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="idash-page">
      {/* Page header */}
      <div className="idash-page-header">
        <h1 className="idash-page-title">Home</h1>
        <span className="idash-breadcrumb">Home</span>
      </div>

      {/* Greeting */}
      <div className="idash-greeting">
        <div>
          <p className="idash-greeting-hello">Good Morning, Abhay</p>
          <p className="idash-greeting-date">{today}</p>
        </div>
        <button className="idash-greeting-bell" aria-label="Notifications"
          onClick={() => navigate('/instructor/individual/dashboard/notification')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </div>

      {/* Stats grid — 4 colored cards */}
      <div className="idash-stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="idash-stat-card" style={{ background: s.bg }}>
            <div className="idash-stat-icon-wrap" style={{ background: s.color + '22' }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div className="idash-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="idash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="idash-quick-actions">
        {QUICK_ACTIONS.map(a => (
          <button key={a.label} className="idash-quick-btn"
            onClick={() => navigate(a.path)}>
            <span className="idash-quick-icon">{a.icon}</span>
            <span className="idash-quick-label">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom: Activity + Info */}
      <div className="idash-bottom-grid">
        {/* Recent Activity */}
        <div>
          <h2 className="idash-section-title">Recent Activity</h2>
          <div className="idash-activity-card">
            <div className="idash-activity-list">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="idash-activity-item">
                  <div className="idash-activity-icon"><ActivityIcon /></div>
                  <div className="idash-activity-body">
                    <div className="idash-activity-title">{a.title}</div>
                    <div className="idash-activity-sub">{a.sub}</div>
                  </div>
                  <div className="idash-activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div>
          <h2 className="idash-section-title">Overview</h2>
          <div className="idash-info-card">
            <div className="idash-info-row">
              <span className="idash-info-key">Total Revenue</span>
              <span className="idash-info-value green">₹2,45,000</span>
            </div>
            <div className="idash-info-row">
              <span className="idash-info-key">This Month</span>
              <span className="idash-info-value">₹84,000</span>
            </div>
            <div className="idash-info-row">
              <span className="idash-info-key">Pending Payout</span>
              <span className="idash-info-value">₹12,500</span>
            </div>
            <div className="idash-info-row">
              <span className="idash-info-key">Avg. Rating</span>
              <span className="idash-info-value">⭐ 4.8</span>
            </div>
            <div className="idash-info-row">
              <span className="idash-info-key">Completion Rate</span>
              <span className="idash-info-value">72%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
