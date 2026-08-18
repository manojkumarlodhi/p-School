import { useState } from 'react';
import './classes.css';
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';


/* â”€â”€ Icons â”€â”€ */
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const MessageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const ContactIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);
const ActivityIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* â”€â”€ Data â”€â”€ */
const STUDENT_ASSIGNMENTS = [
  { id: 'a1', name: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'Feb 11, 2026', score: '92/100', status: 'submitted' },
  { id: 'a2', name: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'Feb 11, 2026', score: '92/100', status: 'graded'    },
  { id: 'a3', name: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'Feb 11, 2026', score: '92/100', status: 'pending'   },
];

const ACTIVITIES = [
  { title: 'Submitted Functions Lab Task',    time: 'Feb 14, 2026 â€¢ 10:30 AM' },
  { title: 'Received grade for Variables Quiz', time: 'Feb 14, 2026 â€¢ 10:30 AM' },
  { title: 'Submitted Coding Worksheet 01',   time: 'Feb 16, 2026 â€¢ 10:30 AM' },
  { title: 'Sent a message about assig...',   time: 'Feb 14, 2026 â€¢ 10:30 AM' },
];

const PROGRESS = [
  { label: 'Overall Progress',    pct: 80 },
  { label: 'Assignment Score',    pct: 88 },
  { label: 'Quiz Average',        pct: 82 },
  { label: 'Lab Participation',   pct: 82 },
];

/* â”€â”€ Overview Tab â”€â”€ */
function OverviewTab() {
  return (
    <div className="stud-body">
      <h3 className="stud-section-title">Student Information</h3>
      <div className="stud-info-list">
        {[
          { key: 'Email:',    val: 'aarav@school.com' },
          { key: 'Phone:',    val: '+91 98765 43210' },
          { key: 'Grade:',    val: '7A' },
          { key: 'Subject:',  val: 'Coding' },
          { key: 'Enrolled:', val: 'Jan 15, 2026' },
        ].map(r => (
          <div key={r.key} className="stud-info-row">
            <span className="stud-info-key">{r.key}</span>
            <span className="stud-info-value">{r.val}</span>
          </div>
        ))}
      </div>

      <h3 className="stud-section-title">Performance Overview</h3>
      {PROGRESS.map(p => (
        <div key={p.label} className="stud-progress-item">
          <div className="stud-progress-row">
            <span className="stud-progress-label">{p.label}</span>
            <span className="stud-progress-pct">{p.pct}%</span>
          </div>
          <div className="stud-progress-bar">
            <div className="stud-progress-fill" style={{ width: `${p.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* â”€â”€ Assignments Tab â”€â”€ */
function AssignmentsTab({ classId, studentId, navigate }) {
  return (
    <div className="stud-body">
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 14 }}>
        Total - {STUDENT_ASSIGNMENTS.length}
      </p>
      <div className="stud-assignment-list">
        {STUDENT_ASSIGNMENTS.map(a => (
          <div key={a.id} className="stud-assignment-card"
            onClick={() => navigate(`/instructor/dashboard/classes/${classId}/students/${studentId}/assignments/${a.id}`)}>
            <div className="stud-assignment-name">{a.name}</div>
            <div className="stud-assignment-meta-row">
              <div className="stud-assignment-meta-item">Due <span>{a.due}</span></div>
              <div className="stud-assignment-meta-item">Submitted: <span>{a.submitted}</span></div>
              <div className="stud-assignment-meta-item">Score <span style={{ color: '#1ba8d5' }}>{a.score}</span></div>
            </div>
            <div className="stud-assignment-footer">
              <span className={`stud-status-badge ${a.status}`}>
                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
              </span>
              <button className="stud-arrow-btn"><ArrowIcon /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* â”€â”€ Activity Tab â”€â”€ */
function ActivityTab() {
  return (
    <div className="stud-body">
      <h3 className="stud-section-title">Recent Activities</h3>
      <div className="stud-activity-list">
        {ACTIVITIES.map((a, i) => (
          <div key={i} className="stud-activity-item">
            <div className="stud-activity-icon"><ActivityIcon /></div>
            <div className="stud-activity-body">
              <div className="stud-activity-title">{a.title}</div>
              <div className="stud-activity-time">{a.time}</div>
            </div>
            <button className="stud-activity-arrow"><ArrowIcon /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* â”€â”€ Main â”€â”€ */
export default function InstructorStudentDetail() {
  const { classId, studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const backPath = classId
    ? `/instructor/dashboard/classes/${classId}`
    : '/instructor/dashboard/classes';

  return (
    <div className="stud-page">
      {/* Hero */}
      <div className="stud-hero">
        <button className="stud-hero-back" onClick={() => navigate(backPath)}>
          <BackIcon /> Details
        </button>

        <div className="stud-avatar-wrap">
          <img src={profileImg} alt="Aarav Patel" />
        </div>
        <h2 className="stud-name">Aarav Patel</h2>
        <p className="stud-class">Grade 7A â€¢ Coding</p>
        <p className="stud-email">aarav@school.com &rsaquo;</p>

        <div className="stud-stats-row">
          <div className="stud-stat">
            <div className="stud-stat-label">Progress</div>
            <div className="stud-stat-value">85%</div>
          </div>
          <div className="stud-stat">
            <div className="stud-stat-label">Attendance</div>
            <div className="stud-stat-value">94</div>
          </div>
          <div className="stud-stat">
            <div className="stud-stat-label">Assignments</div>
            <div className="stud-stat-value">12</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="stud-action-row">
        <button className="stud-action-btn">
          <MessageIcon /> Massage
        </button>
        <button className="stud-action-btn">
          <ContactIcon /> Contact
        </button>
      </div>

      {/* Tabs */}
      <div className="stud-tabs">
        {['overview', 'assignments', 'activity'].map(tab => (
          <button
            key={tab}
            className={`stud-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview'    && <OverviewTab />}
      {activeTab === 'assignments' && (
        <AssignmentsTab classId={classId} studentId={studentId} navigate={navigate} />
      )}
      {activeTab === 'activity'    && <ActivityTab />}
    </div>
  );
}

