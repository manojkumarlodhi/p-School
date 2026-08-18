import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../../../assets/images/profile.png';
import './individualcourses.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const MessageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const ContactIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);
const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

/* ── Student data ── */
const STUDENT = {
  name: 'Aarav Patel',
  email: 'aarav@school.com',
  subject: 'Coding',
  progress: 85,
  assignments: 12,
  phone: '+91 98765 43210',
  enrolled: 'Jan 15, 2026',
};

/* ── Overview Tab ── */
function OverviewTab() {
  const PERFORMANCE = [
    { label: 'Overall Progress',   value: 80 },
    { label: 'Assignment Score',   value: 88 },
    { label: 'Quiz Average',       value: 82 },
    { label: 'Lab Participation',  value: 82 },
  ];

  return (
    <div className="isd-tab-content">
      <div className="isd-overview-layout">
        {/* Left: Student Info */}
        <div className="isd-overview-card">
          <h3 className="isd-section-title">Student Information</h3>
          <div className="isd-info-table">
            <div className="isd-info-row">
              <span className="isd-info-key">Email:</span>
              <span className="isd-info-val">{STUDENT.email}</span>
            </div>
            <div className="isd-info-row">
              <span className="isd-info-key">Phone:</span>
              <span className="isd-info-val">{STUDENT.phone}</span>
            </div>
            <div className="isd-info-row">
              <span className="isd-info-key">Subject:</span>
              <span className="isd-info-val">{STUDENT.subject}</span>
            </div>
            <div className="isd-info-row">
              <span className="isd-info-key">Enrolled:</span>
              <span className="isd-info-val">{STUDENT.enrolled}</span>
            </div>
          </div>
        </div>

        {/* Right: Performance */}
        <div className="isd-overview-card">
          <h3 className="isd-section-title">Performance Overview</h3>
          <div className="isd-performance-list">
            {PERFORMANCE.map(p => (
              <div key={p.label} className="isd-perf-item">
                <div className="isd-perf-header">
                  <span className="isd-perf-label">{p.label}</span>
                  <span className="isd-perf-pct">{p.value}%</span>
                </div>
                <div className="isd-perf-bar">
                  <div className="isd-perf-fill" style={{ width: `${p.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Assignments Tab ── */
const ASSIGNMENTS = [
  { id: 'a1', title: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'Feb 11, 2026', score: null,     status: 'submitted' },
  { id: 'a2', title: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'Feb 11, 2026', score: '92/100', status: 'graded'    },
  { id: 'a3', title: 'Coding Worksheet 01', due: 'Feb 12, 2026', submitted: 'No',            score: null,     status: 'pending'   },
];

function AssignmentsTab({ navigate, categoryId, courseId, studentId }) {
  return (
    <div className="isd-tab-content">
      <p className="isd-total-label">Total — {ASSIGNMENTS.length}</p>
      <div className="isd-assignment-list">
        {ASSIGNMENTS.map(a => (
          <div key={a.id} className="isd-assignment-card"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/students/${studentId}/assignments/${a.id}`)}>
            <div className="isd-assignment-body">
              <div className="isd-assignment-title">{a.title}</div>
              <div className="isd-assignment-meta">
                <div className="isd-assignment-meta-item">
                  <span className="isd-meta-key">Due</span>
                  <span className="isd-meta-val">{a.due}</span>
                </div>
                <div className="isd-assignment-meta-item">
                  <span className="isd-meta-key">Submitted:</span>
                  <span className="isd-meta-val">{a.submitted}</span>
                </div>
                <div className="isd-assignment-meta-item">
                  <span className="isd-meta-key">Score</span>
                  <span className="isd-meta-val">{a.score || '------'}</span>
                </div>
              </div>
              <span className={`isd-assignment-badge ${a.status}`}>
                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
              </span>
            </div>
            <button className="isd-assignment-arrow"><ArrowIcon /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Progress Report Tab ── */
function ProgressReportTab() {
  const MODULES = [
    { name: 'Introduction to Java',    completed: 8,  total: 8,  score: 92 },
    { name: 'OOP Concepts',            completed: 6,  total: 8,  score: 85 },
    { name: 'Data Structures',         completed: 4,  total: 8,  score: 78 },
    { name: 'Spring Framework',        completed: 2,  total: 8,  score: null },
  ];

  return (
    <div className="isd-tab-content">
      <div className="isd-report-layout">
        {/* Summary cards */}
        <div className="isd-report-stats">
          {[
            { label: 'Overall Progress', value: '85%',  color: '#1ba8d5' },
            { label: 'Assignments Done', value: '10/12', color: '#22c55e' },
            { label: 'Avg. Score',       value: '88%',  color: '#f59e0b' },
            { label: 'Time Spent',       value: '42h',  color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} className="isd-report-stat-card">
              <div className="isd-report-stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="isd-report-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Module progress table */}
        <div className="isd-report-card">
          <h3 className="isd-section-title">Module Progress</h3>
          <div className="isd-module-table-wrap">
            <table className="isd-module-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Completed</th>
                  <th>Progress</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {MODULES.map(m => {
                  const pct = Math.round((m.completed / m.total) * 100);
                  return (
                    <tr key={m.name}>
                      <td className="isd-module-name">{m.name}</td>
                      <td className="isd-module-completed">{m.completed}/{m.total}</td>
                      <td>
                        <div className="isd-progress-wrap">
                          <div className="isd-progress-bar">
                            <div className="isd-progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="isd-progress-pct">{pct}%</span>
                        </div>
                      </td>
                      <td className="isd-module-score">
                        {m.score ? `${m.score}%` : <span className="isd-score-na">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Assignment View (grade submission) ── */
function AssignmentView({ assignmentId, onBack }) {
  const [marks, setMarks] = useState('92');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="isd-asgv-wrap">
      <div className="isd-asgv-layout">
        {/* Left: file details */}
        <div className="isd-asgv-card">
          <h2 className="isd-asgv-title">Coding Worksheet 01</h2>
          <p className="isd-asgv-date">Feb 14, 2026</p>

          <div className="isd-section-title">File Details</div>
          <div className="isd-info-table">
            <div className="isd-info-row">
              <span className="isd-info-key">File name</span>
              <span className="isd-info-val">StudentSubmission_BST.pdf</span>
            </div>
            <div className="isd-info-row">
              <span className="isd-info-key">File Size</span>
              <span className="isd-info-val">2.4 MB</span>
            </div>
            <div className="isd-info-row">
              <span className="isd-info-key">Upload Time</span>
              <span className="isd-info-val">Feb 14, 2026 · 10:30 AM</span>
            </div>
          </div>

          <div className="isd-section-title" style={{ marginTop: 20 }}>Submitted Files</div>
          <div className="isd-file-meta">PDF · 2.4 MB</div>
          <div className="isd-file-row">
            <div className="isd-file-icon"><FileIcon /></div>
            <span className="isd-file-name">BST_Template.zip</span>
            <button className="isd-file-dl"><DownloadIcon /></button>
          </div>
        </div>

        {/* Right: grade */}
        <div className="isd-asgv-card">
          <div className="isd-section-title">Grade Submission</div>
          <div className="isd-asgv-field">
            <label className="isd-asgv-label">Marks (Out of 100)</label>
            <input className="isd-asgv-input" value={marks}
              onChange={e => setMarks(e.target.value)} placeholder="0" />
          </div>
          <div className="isd-asgv-field">
            <label className="isd-asgv-label">Feedback</label>
            <textarea className="isd-asgv-textarea"
              placeholder="Provide constructive feedback to the student..."
              value={feedback} onChange={e => setFeedback(e.target.value)} />
          </div>
          <div className="isd-asgv-actions">
            <button className="isd-asgv-cancel" onClick={onBack}>Cancel</button>
            <button className="isd-asgv-save" onClick={onBack}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function IndividualStudentDetail() {
  const { categoryId, courseId, studentId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If assignmentId in URL → show assignment view
  if (assignmentId) {
    return (
      <div className="isd-page">
        <div className="isd-page-header">
          <div className="isd-header-left">
            <button className="isd-back-btn"
              onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/students/${studentId}`)}>
              <BackIcon />
            </button>
            <div>
              <h1 className="isd-page-title">Assignment View</h1>
              <p className="isd-breadcrumb">Courses / Students / Assignment</p>
            </div>
          </div>
        </div>
        <AssignmentView
          assignmentId={assignmentId}
          onBack={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/students/${studentId}`)}
        />
      </div>
    );
  }

  const TABS = ['overview', 'assignments', 'progress report'];

  return (
    <div className="isd-page">
      {/* Header */}
      <div className="isd-page-header">
        <div className="isd-header-left">
          <button className="isd-back-btn"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}`)}>
            <BackIcon />
          </button>
          <div>
            <h1 className="isd-page-title">Details</h1>
            <p className="isd-breadcrumb">Courses / {categoryId} / Students</p>
          </div>
        </div>
      </div>

      {/* Student profile card */}
      <div className="isd-profile-card">
        <div className="isd-profile-left">
          <div className="isd-profile-avatar">
            <img src={profileImg} alt={STUDENT.name} />
          </div>
          <div className="isd-profile-info">
            <h2 className="isd-profile-name">{STUDENT.name}</h2>
            <p className="isd-profile-email">{STUDENT.email} ›</p>
            <div className="isd-profile-stats">
              <div className="isd-profile-stat">
                <div className="isd-profile-stat-label">Subject</div>
                <div className="isd-profile-stat-value">{STUDENT.subject}</div>
              </div>
              <div className="isd-profile-stat">
                <div className="isd-profile-stat-label">Progress</div>
                <div className="isd-profile-stat-value">{STUDENT.progress}%</div>
              </div>
              <div className="isd-profile-stat">
                <div className="isd-profile-stat-label">Assignments</div>
                <div className="isd-profile-stat-value">{STUDENT.assignments}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="isd-profile-actions">
          <button className="isd-action-btn"
            onClick={() => navigate('/instructor/individual/dashboard/messages')}>
            <MessageIcon /> Message
          </button>
          <button className="isd-action-btn">
            <ContactIcon /> Contact
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="isd-tabs">
        {TABS.map(tab => (
          <button key={tab}
            className={`isd-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {activeTab === 'overview'         && <OverviewTab />}
      {activeTab === 'assignments'      && (
        <AssignmentsTab navigate={navigate} categoryId={categoryId}
          courseId={courseId} studentId={studentId} />
      )}
      {activeTab === 'progress report'  && <ProgressReportTab />}
    </div>
  );
}
