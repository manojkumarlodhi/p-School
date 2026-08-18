import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './individualcourses.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const TrendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

/* ── Course action menu ── */
function CourseMenu({ onClose }) {
  const ACTIONS = [
    { label: 'Edit Course',  icon: '✏️' },
    { label: 'Unpublish',    icon: '👁️' },
    { label: 'Share Link',   icon: '🔗' },
    { label: 'Duplicate',    icon: '📋' },
    { label: 'Delete',       icon: '🗑️', danger: true },
  ];
  return (
    <div className="icd-menu-overlay" onClick={onClose}>
      <div className="icd-menu" onClick={e => e.stopPropagation()}>
        {ACTIONS.map(a => (
          <button key={a.label}
            className={`icd-menu-item${a.danger ? ' danger' : ''}`}
            onClick={onClose}>
            <span>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Overview Tab ── */
function OverviewTab({ navigate, categoryId, courseId }) {
  const SUMMARY = [
    { label: 'Category',  value: 'Electronics' },
    { label: 'Level',     value: 'Beginner' },
    { label: 'Duration',  value: '6h 20m' },
    { label: 'Content',   value: '18 lessons • 3 modules' },
    { label: 'Last updated', value: 'Jan 15, 2026' },
  ];
  const ANNOUNCEMENTS = [
    { title: 'Live Q&A this Saturday – 6 PM', date: 'Feb 14, 2026 • 10:30 AM' },
    { title: 'Live Q&A this Saturday – 6 PM', date: 'Feb 14, 2026 • 10:30 AM' },
    { title: 'Live Q&A this Saturday – 6 PM', date: 'Feb 14, 2026 • 10:30 AM' },
    { title: 'Live Q&A this Saturday – 6 PM', date: '2d ago' },
  ];

  return (
    <div className="icd-tab-content">
      <div className="icd-overview-layout">
        {/* Left */}
        <div>
          <div className="icd-overview-card">
            <p className="icd-overview-desc">
              Learn to build complete web applications using Java for backend development and modern
              <button className="icd-learn-more"> Learn more...</button>
            </p>

            {/* Stats grid */}
            <div className="icd-stats-grid">
              <div className="icd-stat-card">
                <div className="icd-stat-label">Status</div>
                <div className="icd-stat-value active">Active</div>
              </div>
              <div className="icd-stat-card">
                <div className="icd-stat-label">Enrollments</div>
                <div className="icd-stat-value">85</div>
              </div>
              <div className="icd-stat-card">
                <div className="icd-stat-label">Rating</div>
                <div className="icd-stat-value"><StarIcon /> 4.7</div>
              </div>
              <div className="icd-stat-card">
                <div className="icd-stat-label">Completion</div>
                <div className="icd-stat-value">72%</div>
              </div>
              <div className="icd-stat-card">
                <div className="icd-stat-label">Course Price</div>
                <div className="icd-stat-value">120$</div>
              </div>
              <div className="icd-stat-card earnings">
                <div className="icd-stat-label">Total Earnings</div>
                <div className="icd-stat-value green">$2,450 <TrendIcon /></div>
              </div>
            </div>

            {/* Course Summary */}
            <h3 className="icd-section-title">Course Summary</h3>
            <div className="icd-summary-table">
              {SUMMARY.map(s => (
                <div key={s.label} className="icd-summary-row">
                  <span className="icd-summary-key">{s.label}:</span>
                  <span className="icd-summary-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Announcements */}
        <div>
          <div className="icd-overview-card">
            <h3 className="icd-section-title">Recent Announcement</h3>
            <div className="icd-announcement-list">
              {ANNOUNCEMENTS.map((a, i) => (
                <div key={i} className="icd-announcement-item">
                  <div className="icd-announcement-body">
                    <div className="icd-announcement-title">{a.title}</div>
                    <div className="icd-announcement-date">{a.date}</div>
                  </div>
                  <button className="icd-announcement-arrow"><ArrowIcon /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Content Tab ── */
const SUBJECTS = [
  { id: 's1', name: 'Core Java', chapters: 12 },
  { id: 's2', name: 'Core Java', chapters: 12 },
  { id: 's3', name: 'Core Java', chapters: 12 },
  { id: 's4', name: 'Core Java', chapters: 12 },
];

function ContentTab({ navigate, categoryId, courseId }) {
  return (
    <div className="icd-tab-content">
      <div className="icd-content-header">
        <span className="icd-content-label">Total Subject — {SUBJECTS.length}</span>
        <button className="icd-add-subject-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Subject
        </button>
      </div>
      <div className="icd-subject-list">
        {SUBJECTS.map(s => (
          <div key={s.id} className="icd-subject-card">
            <div className="icd-subject-left-bar" />
            <div className="icd-subject-body">
              <div className="icd-subject-name">{s.name}</div>
              <div className="icd-subject-chapters">Chapters : {s.chapters}</div>
              <button className="icd-view-chapters-btn"
                onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/chapters/${s.id}`)}>
                View All Chapter →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Student Tab ── */
const STUDENTS = [
  { id: 'st1', name: 'Aarav Patel',  email: 'aarav@school.com', subject: 'Coding', progress: 85, assignments: 12 },
  { id: 'st2', name: 'Priya Sharma', email: 'priya@school.com', subject: 'Coding', progress: 45, assignments: 8  },
  { id: 'st3', name: 'Rohan Mehta',  email: 'rohan@school.com', subject: 'Coding', progress: 90, assignments: 12 },
  { id: 'st4', name: 'Sneha Gupta',  email: 'sneha@school.com', subject: 'Coding', progress: 30, assignments: 5  },
  { id: 'st5', name: 'Arjun Singh',  email: 'arjun@school.com', subject: 'Coding', progress: 72, assignments: 10 },
];

const ExportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

function StudentTab({ navigate, categoryId, courseId }) {
  return (
    <div className="icd-tab-content">
      <div className="icd-student-header">
        <span className="icd-content-label">Total — {STUDENTS.length} Students</span>
        <button className="icd-export-btn"><ExportIcon /> Export List</button>
      </div>
      <div className="icd-student-list">
        {STUDENTS.map(s => (
          <div key={s.id} className="icd-student-row"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/students/${s.id}`)}>
            <div className="icd-student-avatar-wrap">
              <div className="icd-student-avatar">{s.name.charAt(0)}</div>
            </div>
            <div className="icd-student-info">
              <div className="icd-student-name">{s.name}</div>
              <div className="icd-student-email">{s.email}</div>
            </div>
            <button className="icd-student-arrow"><ArrowIcon /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Certificate Tab ── */
function CertificateTab() {
  return (
    <div className="icd-tab-content">
      <div className="icd-cert-card">
        <div className="icd-cert-icon">🏆</div>
        <h3 className="icd-cert-title">Certificate of Completion</h3>
        <p className="icd-cert-desc">
          Students who complete 80% or more of this course will receive a certificate of completion.
        </p>
        <div className="icd-cert-stats">
          <div className="icd-cert-stat">
            <div className="icd-cert-stat-value">61</div>
            <div className="icd-cert-stat-label">Certificates Issued</div>
          </div>
          <div className="icd-cert-stat">
            <div className="icd-cert-stat-value">80%</div>
            <div className="icd-cert-stat-label">Min. Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function IndividualCourseDetail() {
  const { categoryId, courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showMenu, setShowMenu] = useState(false);

  const TABS = ['overview', 'content', 'student', 'certificate'];

  return (
    <div className="icd-page">
      {/* Header */}
      <div className="icd-page-header">
        <div className="icd-header-left">
          <button className="icd-back-btn"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}`)}>
            <BackIcon />
          </button>
          <div>
            <h1 className="icd-page-title">Course Details</h1>
            <p className="icd-breadcrumb">Home / Courses / {categoryId} / Details</p>
          </div>
        </div>
        <button className="icd-dots-btn" onClick={() => setShowMenu(true)}>
          <DotsIcon />
        </button>
      </div>

      {/* Course title */}
      <div className="icd-course-title-bar">
        <h2 className="icd-course-name">Java Full Stack</h2>
      </div>

      {/* Tabs */}
      <div className="icd-tabs">
        {TABS.map(tab => (
          <button key={tab}
            className={`icd-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview'     && <OverviewTab navigate={navigate} categoryId={categoryId} courseId={courseId} />}
      {activeTab === 'content'      && <ContentTab  navigate={navigate} categoryId={categoryId} courseId={courseId} />}
      {activeTab === 'student'      && <StudentTab  navigate={navigate} categoryId={categoryId} courseId={courseId} />}
      {activeTab === 'certificate'  && <CertificateTab />}

      {showMenu && <CourseMenu onClose={() => setShowMenu(false)} />}
    </div>
  );
}
