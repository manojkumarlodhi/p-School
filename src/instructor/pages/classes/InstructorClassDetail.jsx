import { useState } from 'react';
import './classes.css';
import { useNavigate, useParams } from 'react-router-dom';


/* â”€â”€ Icons â”€â”€ */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const ExportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const StudentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const AssignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const ResourceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const AvgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* â”€â”€ Empty illustration â”€â”€ */
const EmptyIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="56" fill="#f0f9ff" />
    <rect x="28" y="38" width="64" height="44" rx="8" fill="#e0f2fe" />
    <rect x="36" y="46" width="48" height="6" rx="3" fill="#bae6fd" />
    <rect x="36" y="58" width="32" height="6" rx="3" fill="#bae6fd" />
    <circle cx="82" cy="76" r="14" fill="#fff" stroke="#1ba8d5" strokeWidth="2" />
    <line x1="78" y1="76" x2="86" y2="76" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
    <line x1="82" y1="72" x2="82" y2="80" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" />
    <circle cx="38" cy="82" r="10" fill="#fee2e2" />
    <line x1="34" y1="78" x2="42" y2="86" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="78" x2="34" y2="86" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* â”€â”€ Data â”€â”€ */
const CLASS_DATA = {
  grade7a: { name: 'Grade 7A', subject: 'Coding',      grade: 'Grade 7', instructor: 'Abhay', students: 31, assignments: 3, resources: 4, avgScore: 85 },
  grade6b: { name: 'Grade 6B', subject: 'Robotics',    grade: 'Grade 6', instructor: 'Abhay', students: 25, assignments: 2, resources: 3, avgScore: 78 },
  grade8c: { name: 'Grade 8C', subject: 'Electronics', grade: 'Grade 8', instructor: 'Abhay', students: 31, assignments: 4, resources: 5, avgScore: 82 },
  grade7d: { name: 'Grade 7D', subject: 'Mechanics',   grade: 'Grade 7', instructor: 'Abhay', students: 31, assignments: 2, resources: 2, avgScore: 76 },
};

const STUDENTS = [
  { id: 's1', name: 'Aarav Patel',   email: 'aarav@school.com',   progress: 85, score: 92 },
  { id: 's2', name: 'Priya Sharma',  email: 'priya@school.com',   progress: 72, score: 78 },
  { id: 's3', name: 'Rohan Verma',   email: 'rohan@school.com',   progress: 90, score: 95 },
  { id: 's4', name: 'Ananya Singh',  email: 'ananya@school.com',  progress: 65, score: 70 },
  { id: 's5', name: 'Arjun Kumar',   email: 'arjun@school.com',   progress: 80, score: 84 },
  { id: 's6', name: 'Diya Gupta',    email: 'diya@school.com',    progress: 55, score: 60 },
  { id: 's7', name: 'Kabir Mehta',   email: 'kabir@school.com',   progress: 95, score: 98 },
  { id: 's8', name: 'Ishita Reddy',  email: 'ishita@school.com',  progress: 70, score: 75 },
];

const ASSIGNMENTS = [
  { id: 'a1', name: 'Coding Worksheet 01', submitted: 28, total: 31, due: 'Feb 12, 2026', status: 'active'  },
  { id: 'a2', name: 'Variables Quiz',      submitted: 28, total: 31, due: 'Feb 14, 2026', status: 'active'  },
  { id: 'a3', name: 'BST Lab Task',        submitted: 28, total: 31, due: 'Feb 16, 2026', status: 'pending' },
];

const RESOURCES = [
  { id: 'r1', name: 'Introduction to Python Variables', meta: 'PDF â€¢ 2.4 MB' },
  { id: 'r2', name: 'BST Code Examples',                meta: 'ZIP â€¢ 758 KB' },
  { id: 'r3', name: 'Python OOP Reference',             meta: 'PDF â€¢ 1.1 MB' },
  { id: 'r4', name: 'Coding Assignment Guide',          meta: 'PDF â€¢ 3.1 MB' },
];

/* â”€â”€ Overview Tab â”€â”€ */
function OverviewTab({ cls, classId, navigate }) {
  const SUBJECT_COLORS = {
    Coding:      { bg: '#f0f9ff', color: '#1ba8d5' },
    Robotics:    { bg: '#fff7ed', color: '#f59e0b' },
    Electronics: { bg: '#f5f3ff', color: '#8b5cf6' },
    Mechanics:   { bg: '#f0fdf4', color: '#22c55e' },
  };
  const colors = SUBJECT_COLORS[cls.subject] || { bg: '#f3f4f6', color: '#6b7280' };

  return (
    <div className="clsd-overview">
      {/* Class info card */}
      <div className="clsd-overview-card">
        <div className="clsd-overview-row">
          <span className="clsd-overview-key">Class Name</span>
          <span className="clsd-overview-val">{cls.name}</span>
        </div>
        <div className="clsd-overview-row">
          <span className="clsd-overview-key">Grade</span>
          <span className="clsd-overview-val">{cls.grade}</span>
        </div>
        <div className="clsd-overview-row">
          <span className="clsd-overview-key">Subject</span>
          <span className="clsd-overview-val">
            <span className="clsd-subject-badge" style={{ background: colors.bg, color: colors.color }}>
              {cls.subject}
            </span>
          </span>
        </div>
        <div className="clsd-overview-row">
          <span className="clsd-overview-key">Instructor</span>
          <span className="clsd-overview-val">{cls.instructor}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="clsd-overview-stats">
        <div className="clsd-ov-stat" onClick={() => navigate(`/instructor/dashboard/classes/${classId}`)}>
          <div className="clsd-ov-stat-icon"><StudentIcon /></div>
          <div className="clsd-ov-stat-value">{cls.students}</div>
          <div className="clsd-ov-stat-label">Students</div>
        </div>
        <div className="clsd-ov-stat">
          <div className="clsd-ov-stat-icon"><AssignIcon /></div>
          <div className="clsd-ov-stat-value">{cls.assignments}</div>
          <div className="clsd-ov-stat-label">Assignments</div>
        </div>
        <div className="clsd-ov-stat">
          <div className="clsd-ov-stat-icon"><ResourceIcon /></div>
          <div className="clsd-ov-stat-value">{cls.resources}</div>
          <div className="clsd-ov-stat-label">Resources</div>
        </div>
        <div className="clsd-ov-stat">
          <div className="clsd-ov-stat-icon"><AvgIcon /></div>
          <div className="clsd-ov-stat-value">{cls.avgScore}%</div>
          <div className="clsd-ov-stat-label">Avg Score</div>
        </div>
      </div>

      {/* Recent assignments preview */}
      <h3 className="clsd-overview-section-title">Recent Assignments</h3>
      <div className="clsd-assignment-list">
        {ASSIGNMENTS.slice(0, 2).map(a => {
          const pct = Math.round((a.submitted / a.total) * 100);
          return (
            <div key={a.id} className="clsd-assignment-card"
              onClick={() => navigate(`/instructor/dashboard/classes/${classId}/assignments/${a.id}`)}>
              <div className="clsd-assignment-top">
                <span className="clsd-assignment-name">{a.name}</span>
              </div>
              <div className="clsd-submission-row">
                <span className="clsd-submission-label">Submissions</span>
                <div className="clsd-submission-bar">
                  <div className="clsd-submission-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="clsd-submission-count">{a.submitted}/{a.total}</span>
              </div>
              <div className="clsd-assignment-meta">
                <div>
                  <div className="clsd-due-label">Due</div>
                  <div className="clsd-due-date">{a.due}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`clsd-status-badge ${a.status}`}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                  <button className="clsd-assignment-arrow"><ArrowIcon /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* â”€â”€ Students Tab â”€â”€ */
function StudentsTab({ classId, navigate }) {
  return (
    <>
      <div className="clsd-students-bar">
        <span className="clsd-total-label">Total - {STUDENTS.length} Students</span>
        <button className="clsd-export-btn">
          <ExportIcon /> Export List
        </button>
      </div>
      <div className="clsd-student-list">
        {STUDENTS.map(s => (
          <div key={s.id} className="clsd-student-item"
            onClick={() => navigate(`/instructor/dashboard/classes/${classId}/students/${s.id}`)}>
            <div className="clsd-student-avatar">{s.name.charAt(0)}</div>
            <div className="clsd-student-body">
              <div className="clsd-student-name">{s.name}</div>
              <div className="clsd-student-email">{s.email}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* â”€â”€ Assignments Tab â”€â”€ */
function AssignmentsTab({ classId, navigate }) {
  return (
    <>
      <button className="clsd-add-btn"
        onClick={() => navigate('/instructor/dashboard/assignments/create')}>
        + Assignments
      </button>
      {ASSIGNMENTS.length === 0 ? (
        <div className="clsd-empty">
          <div className="clsd-empty-icon"><EmptyIllustration /></div>
          <h2 className="clsd-empty-title">No Assignments Created Yet</h2>
          <p className="clsd-empty-sub">You haven't created any assignments for this class.</p>
          <button className="clsd-empty-btn"
            onClick={() => navigate('/instructor/dashboard/assignments/create')}>
            + Assignments
          </button>
        </div>
      ) : (
        <div className="clsd-assignment-list">
          {ASSIGNMENTS.map(a => {
            const pct = Math.round((a.submitted / a.total) * 100);
            return (
              <div key={a.id} className="clsd-assignment-card"
                onClick={() => navigate(`/instructor/dashboard/classes/${classId}/assignments/${a.id}`)}>
                <div className="clsd-assignment-top">
                  <span className="clsd-assignment-name">{a.name}</span>
                </div>
                <div className="clsd-submission-row">
                  <span className="clsd-submission-label">Submissions</span>
                  <div className="clsd-submission-bar">
                    <div className="clsd-submission-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="clsd-submission-count">{a.submitted}/{a.total}</span>
                </div>
                <div className="clsd-assignment-meta">
                  <div>
                    <div className="clsd-due-label">Due</div>
                    <div className="clsd-due-date">{a.due}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`clsd-status-badge ${a.status}`}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                    <button className="clsd-assignment-arrow"><ArrowIcon /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* â”€â”€ Resources Tab â”€â”€ */
function ResourcesTab({ navigate }) {
  return (
    <>
      <button className="clsd-add-btn"
        onClick={() => navigate('/instructor/dashboard/resources/upload')}>
        + Upload Resources
      </button>
      {RESOURCES.length === 0 ? (
        <div className="clsd-empty">
          <div className="clsd-empty-icon"><EmptyIllustration /></div>
          <h2 className="clsd-empty-title">No Resources Added Yet</h2>
          <p className="clsd-empty-sub">You haven't uploaded any learning resources yet.</p>
          <button className="clsd-empty-btn"
            onClick={() => navigate('/instructor/dashboard/resources/upload')}>
            + Upload Resources
          </button>
        </div>
      ) : (
        <div className="clsd-resource-list">
          {RESOURCES.map(r => (
            <div key={r.id} className="clsd-resource-item">
              <div className="clsd-resource-icon"><FileIcon /></div>
              <div className="clsd-resource-body">
                <div className="clsd-resource-name">{r.name}</div>
                <div className="clsd-resource-meta">{r.meta}</div>
              </div>
              <button className="clsd-resource-dl"><DownloadIcon /></button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* â”€â”€ Progress Tab â”€â”€ */
function ProgressTab({ classId, navigate }) {
  const sorted = [...STUDENTS].sort((a, b) => b.progress - a.progress);

  return (
    <div className="clsd-progress-wrap">
      {/* Summary cards */}
      <div className="clsd-progress-summary">
        <div className="clsd-progress-summary-card">
          <div className="clsd-progress-summary-value">
            {Math.round(STUDENTS.reduce((s, x) => s + x.progress, 0) / STUDENTS.length)}%
          </div>
          <div className="clsd-progress-summary-label">Class Average</div>
        </div>
        <div className="clsd-progress-summary-card">
          <div className="clsd-progress-summary-value" style={{ color: '#22c55e' }}>
            {Math.max(...STUDENTS.map(s => s.progress))}%
          </div>
          <div className="clsd-progress-summary-label">Highest</div>
        </div>
        <div className="clsd-progress-summary-card">
          <div className="clsd-progress-summary-value" style={{ color: '#ef4444' }}>
            {Math.min(...STUDENTS.map(s => s.progress))}%
          </div>
          <div className="clsd-progress-summary-label">Lowest</div>
        </div>
      </div>

      {/* Per-student progress bars */}
      <h3 className="clsd-overview-section-title">Student Progress</h3>
      <div className="clsd-progress-list">
        {sorted.map(s => (
          <div key={s.id} className="clsd-progress-item"
            onClick={() => navigate(`/instructor/dashboard/classes/${classId}/students/${s.id}`)}>
            <div className="clsd-progress-item-top">
              <div className="clsd-progress-avatar">{s.name.charAt(0)}</div>
              <div className="clsd-progress-info">
                <div className="clsd-progress-name">{s.name}</div>
                <div className="clsd-progress-email">{s.email}</div>
              </div>
              <div className="clsd-progress-pct">{s.progress}%</div>
            </div>
            <div className="clsd-progress-bar-wrap">
              <div
                className="clsd-progress-bar-fill"
                style={{
                  width: `${s.progress}%`,
                  background: s.progress >= 80 ? '#22c55e' : s.progress >= 60 ? '#1ba8d5' : '#f59e0b',
                }}
              />
            </div>
            <div className="clsd-progress-score-row">
              <span className="clsd-progress-score-label">Avg Score</span>
              <span className="clsd-progress-score-val">{s.score}/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* â”€â”€ Main â”€â”€ */
export default function InstructorClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const cls = CLASS_DATA[classId] || {
    name: classId, subject: 'Coding', grade: 'Grade 7',
    instructor: 'Abhay', students: 0, assignments: 0, resources: 0, avgScore: 0,
  };

  const TABS = ['overview', 'students', 'assignments', 'resources', 'progress'];

  return (
    <div className="clsd-page">
      <div className="clsd-header">
        <button className="clsd-back-btn" onClick={() => navigate('/instructor/dashboard/classes')}>
          <BackIcon /> {cls.name}
        </button>
      </div>

      <div className="clsd-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`clsd-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview'     && <OverviewTab     cls={cls} classId={classId} navigate={navigate} />}
      {activeTab === 'students'     && <StudentsTab     classId={classId} navigate={navigate} />}
      {activeTab === 'assignments'  && <AssignmentsTab  classId={classId} navigate={navigate} />}
      {activeTab === 'resources'    && <ResourcesTab    navigate={navigate} />}
      {activeTab === 'progress'     && <ProgressTab     classId={classId} navigate={navigate} />}
    </div>
  );
}

