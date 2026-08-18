import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './individualcourses.css';
import courseThumb1 from '../../../../assets/images/mycourseImages1.png';
import courseThumb2 from '../../../../assets/images/mycourseImages2.png';
import courseThumb3 from '../../../../assets/images/javafullstack.png';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
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
const DotIcon = ({ color }) => (
  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
);

const TABS = ['My Courses', 'Drafts', 'Pending Verification'];

/* ── My Courses data ── */
const MY_COURSES = [
  { id: 'c1', title: 'Java Full Stack', rating: 4.7, students: 85, img: courseThumb1 },
  { id: 'c2', title: 'Java Full Stack', rating: 4.7, students: 85, img: courseThumb2 },
  { id: 'c3', title: 'Java Full Stack', rating: 4.7, students: 85, img: courseThumb3 },
  { id: 'c4', title: 'Java Full Stack', rating: 4.7, students: 85, img: courseThumb1 },
];

/* ── Pending Verification data ── */
const PENDING_COURSES = [
  {
    id: 'pv1', title: 'Java Full Stack', img: courseThumb1,
    status: 'changes_required', statusLabel: 'Changes Required',
    progress: 80, approved: true,
    reviewStatus: 'Submitted',
    timeline: [
      { label: 'Submission received',    date: '20 Apr 2026', done: true  },
      { label: 'Admin review complete',  date: '25 Apr 2026', done: true  },
      { label: 'Revision required',      date: '28 Apr 2026', done: true, warning: true },
      { label: 'Awaiting resubmission',  date: '',            done: false },
    ],
    feedback: 'This course requires some improvements before approval. Several sections have incomplete or unclear content, and some videos need better quality and proper titles. Assignments and quizzes are either missing or not aligned with the course material. Please review all chapters carefully, update the necessary content, and resubmit the course for approval.',
  },
  {
    id: 'pv2', title: 'Java Full Stack', img: courseThumb2,
    status: 'under_review', statusLabel: 'Under Review',
    progress: 60, approved: false,
    reviewStatus: 'Under Review',
    timeline: [
      { label: 'Submission received',    date: '20 Apr 2026', done: true  },
      { label: 'Admin review complete',  date: '',            done: false },
      { label: 'Revision required',      date: '',            done: false },
      { label: 'Awaiting resubmission',  date: '',            done: false },
    ],
    feedback: '',
  },
];

/* ── Pending Verification — Course Detail ── */
const PV_SUBJECTS = [
  { id: 's1', name: 'Core Java', totalChapters: 12, approved: 8, rejected: 4, statusOk: true  },
  { id: 's2', name: 'Core Java', totalChapters: 12, approved: 6, rejected: 4, statusOk: false },
  { id: 's3', name: 'Core Java', totalChapters: 12, approved: 9, rejected: 0, statusOk: true  },
];

function PendingCourseDetail({ course, onBack, navigate, categoryId }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="ipv-detail-page">
      {/* Header */}
      <div className="ipv-detail-header">
        <button className="icc2-back-btn" onClick={onBack}><BackIcon /></button>
        <div>
          <h1 className="icc2-page-title">Course Details</h1>
          <p className="icc2-breadcrumb">Courses / Pending Verification</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          style={{ marginLeft: 'auto', cursor: 'pointer' }}>
          <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
        </svg>
      </div>

      {/* Tabs */}
      <div className="icc2-tabs" style={{ marginBottom: 20 }}>
        {['overview', 'content'].map(t => (
          <button key={t}
            className={`icc2-tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === 'overview' && (
        <div className="ipv-overview-layout">
          {/* Left: Review Progress */}
          <div className="ipv-card">
            <div className="ipv-section-header">
              <h3 className="ipv-section-title">Section 01: Introduction to Programming</h3>
              <span className="ipv-review-status-badge submitted">
                Review Status: {course.reviewStatus}
              </span>
            </div>

            <h4 className="ipv-sub-title">Review Progress</h4>
            <div className="ipv-timeline">
              {course.timeline.map((t, i) => (
                <div key={i} className="ipv-timeline-item">
                  <div className={`ipv-timeline-dot${t.done ? (t.warning ? ' warning' : ' done') : ''}`} />
                  {i < course.timeline.length - 1 && (
                    <div className={`ipv-timeline-line${t.done ? ' done' : ''}`} />
                  )}
                  <div className="ipv-timeline-body">
                    <span className={`ipv-timeline-label${t.warning ? ' warning' : ''}`}>{t.label}</span>
                    {t.date && <span className="ipv-timeline-date">{t.date}</span>}
                  </div>
                </div>
              ))}
            </div>

            {course.feedback && (
              <>
                <h4 className="ipv-sub-title" style={{ marginTop: 20 }}>Admin Feedback</h4>
                <p className="ipv-feedback-text">{course.feedback}</p>
              </>
            )}
          </div>

          {/* Right: Actions */}
          <div className="ipv-actions-panel">
            <div className="ipv-progress-card">
              <div className="ipv-progress-label">Course Completion</div>
              <div className="ipv-progress-bar-wrap">
                <div className="ipv-progress-bar">
                  <div className="ipv-progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
                <span className="ipv-progress-pct">{course.progress}%</span>
              </div>
            </div>
            {course.status === 'changes_required' && (
              <button className="ipv-fix-btn">Fix Content &amp; Resubmit →</button>
            )}
            {course.status === 'under_review' && (
              <button className="ipv-view-btn">View Details →</button>
            )}
          </div>
        </div>
      )}

      {/* Content tab */}
      {activeTab === 'content' && (
        <div>
          <p className="ipv-total-label">Total Subject — {PV_SUBJECTS.length}</p>
          <div className="ipv-subject-list">
            {PV_SUBJECTS.map(s => (
              <div key={s.id} className="ipv-subject-card">
                <div className="ipv-subject-header">
                  <div>
                    <div className="ipv-subject-name">{s.name}</div>
                    <div className="ipv-subject-chapters">Total Chapters: {s.totalChapters}</div>
                  </div>
                </div>
                <div className="ipv-subject-stats">
                  <span className="ipv-stat-badge approved">{s.approved} Approved Chapter</span>
                  <span className="ipv-stat-badge rejected">{s.rejected} Reject Chapter</span>
                </div>
                <button className="ipv-fix-chapter-btn">Fix Chapter →</button>
                <div className={`ipv-subject-status-bar${s.statusOk ? ' ok' : ' warn'}`}>
                  {s.statusOk ? 'Approved No changes required' : 'Changes required, Update & resubmit'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export default function IndividualCreatedCourse() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My Courses');
  const [selectedPV, setSelectedPV] = useState(null);

  const label = categoryId
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
    : 'Coding';

  // Show pending verification detail
  if (selectedPV) {
    return (
      <PendingCourseDetail
        course={selectedPV}
        onBack={() => setSelectedPV(null)}
        navigate={navigate}
        categoryId={categoryId}
      />
    );
  }

  return (
    <div className="icc2-page">
      {/* Header */}
      <div className="icc2-page-header">
        <div className="icc2-header-left">
          <button className="icc2-back-btn"
            onClick={() => navigate('/instructor/individual/dashboard/courses')}>
            <BackIcon />
          </button>
          <div>
            <h1 className="icc2-page-title">Created Course</h1>
            <p className="icc2-breadcrumb">Home / Courses / {label}</p>
          </div>
        </div>
        <button className="icc2-add-btn"
          onClick={() => navigate('/instructor/individual/dashboard/courses/create')}>
          <PlusIcon /> Add Course
        </button>
      </div>

      {/* Tabs */}
      <div className="icc2-tabs">
        {TABS.map(t => (
          <button key={t}
            className={`icc2-tab${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── My Courses tab ── */}
      {activeTab === 'My Courses' && (
        <>
          <div className="icc2-sub-header">
            <span className="icc2-sub-label">All Created {label} Courses</span>
            <span className="icc2-sub-total">Total — {MY_COURSES.length}</span>
          </div>
          <div className="icc2-course-grid">
            {MY_COURSES.map(course => (
              <div key={course.id} className="icc2-course-card"
                onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${course.id}`)}>
                <div className="icc2-course-thumb-wrap">
                  <img src={course.img} alt={course.title} className="icc2-course-thumb" />
                  <span className="icc2-enrol-badge">ENROL NOW</span>
                </div>
                <div className="icc2-course-info">
                  <h3 className="icc2-course-title">{course.title}</h3>
                  <div className="icc2-course-meta">
                    <div className="icc2-course-rating"><StarIcon /><span>{course.rating}</span></div>
                    <div className="icc2-course-students">
                      <span className="icc2-meta-label">Students</span>
                      <span className="icc2-meta-value">{course.students}</span>
                    </div>
                    <button className="icc2-course-arrow"><ArrowIcon /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Drafts tab ── */}
      {activeTab === 'Drafts' && (
        <div className="icc2-empty-tab">
          <div className="icc2-empty-icon">📝</div>
          <p className="icc2-empty-title">No Drafts Yet</p>
          <p className="icc2-empty-sub">Courses you save as draft will appear here.</p>
          <button className="icc2-empty-btn"
            onClick={() => navigate('/instructor/individual/dashboard/courses/create')}>
            + Create Course
          </button>
        </div>
      )}

      {/* ── Pending Verification tab ── */}
      {activeTab === 'Pending Verification' && (
        <>
          <div className="icc2-sub-header">
            <span className="icc2-sub-label">Pending Verification Courses</span>
            <span className="icc2-sub-total">Total — {PENDING_COURSES.length}</span>
          </div>
          <div className="ipv-course-list">
            {PENDING_COURSES.map(course => (
              <div key={course.id} className="ipv-course-card">
                <div className="ipv-course-thumb-wrap">
                  <img src={course.img} alt={course.title} className="ipv-course-thumb" />
                  <span className="icc2-enrol-badge">ENROL NOW</span>
                </div>
                <div className="ipv-course-body">
                  <div className="ipv-course-top">
                    <h3 className="ipv-course-title">{course.title}</h3>
                    <span className={`ipv-status-badge ${course.status}`}>{course.statusLabel}</span>
                  </div>
                  <div className="ipv-course-progress-row">
                    <span className="ipv-approved-label">Approved</span>
                    <div className="ipv-mini-bar">
                      <div className="ipv-mini-fill" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="ipv-mini-pct">{course.progress}%</span>
                  </div>
                  <button className="ipv-view-details-btn"
                    onClick={() => setSelectedPV(course)}>
                    {course.status === 'changes_required'
                      ? 'Fix Content & Resubmit →'
                      : 'View Details →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
