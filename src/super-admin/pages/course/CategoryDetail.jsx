import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import javaImg from '../../../assets/images/javafullstack.png';
import './categorydetail.css';

/* ── Empty state illustration ── */
function EmptyIllustration() {
  return (
    <svg
      width="260"
      height="220"
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="130" cy="140" rx="110" ry="70" fill="#e0f7ff" opacity="0.5" />
      <ellipse cx="130" cy="140" rx="85" ry="52" fill="#b3ecff" opacity="0.4" />
      <rect x="72" y="105" width="116" height="80" rx="6" fill="#1ba8d5" opacity="0.85" />
      <rect x="72" y="97" width="48" height="14" rx="4" fill="#1ba8d5" opacity="0.85" />
      <rect x="72" y="115" width="116" height="70" rx="6" fill="#38bdf8" />
      <text x="122" y="160" fontSize="28" fontWeight="800" fill="#fff" textAnchor="middle"
        fontFamily="system-ui, sans-serif">X</text>
      <rect x="155" y="78" width="36" height="44" rx="4" fill="#fff"
        stroke="#b3ecff" strokeWidth="1.5" />
      <line x1="161" y1="90" x2="185" y2="90" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round" />
      <line x1="161" y1="97" x2="185" y2="97" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round" />
      <line x1="161" y1="104" x2="178" y2="104" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round" />
      <rect x="68" y="62" width="30" height="38" rx="4" fill="#fff"
        stroke="#b3ecff" strokeWidth="1.5" />
      <line x1="74" y1="73" x2="92" y2="73" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round" />
      <line x1="74" y1="80" x2="92" y2="80" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round" />
      <text x="148" y="75" fontSize="18" fontWeight="700" fill="#1ba8d5"
        fontFamily="system-ui, sans-serif">?</text>
      <text x="72" y="58" fontSize="14" fontWeight="700" fill="#38bdf8"
        fontFamily="system-ui, sans-serif">?</text>
      <text x="58" y="108" fontSize="14" fontWeight="700" fill="#f87171"
        fontFamily="system-ui, sans-serif">×</text>
      <text x="196" y="108" fontSize="12" fontWeight="700" fill="#94a3b8"
        fontFamily="system-ui, sans-serif">×</text>
      <circle cx="88" cy="96" r="10" fill="#fbbf24" />
      <path d="M78 93 Q88 82 98 93" fill="#1e293b" />
      <rect x="82" y="106" width="12" height="22" rx="3" fill="#1e293b" />
      <path d="M80 128 Q88 140 96 128Z" fill="#1e293b" />
      <line x1="82" y1="112" x2="70" y2="102" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <line x1="94" y1="112" x2="104" y2="118" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <line x1="86" y1="128" x2="84" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="128" x2="92" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="83" cy="149" rx="5" ry="3" fill="#0f172a" />
      <ellipse cx="93" cy="149" rx="5" ry="3" fill="#0f172a" />
      {[[115, 55], [140, 45], [165, 55]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#b3ecff"
          strokeWidth="1.5" strokeDasharray="3 3" />
      ))}
      <path d="M108 52 Q130 38 152 52" fill="none" stroke="#b3ecff"
        strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

/* ── Sample course data ── */
const SAMPLE_COURSES = [
  {
    id: 1,
    title: 'Java Full Stack Development',
    subtitle: 'Master backend and frontend using Java technologies',
    subjects: 8,
    difficulty: 'Beginner',
    type: 'Video',
  },
  {
    id: 2,
    title: 'Python for Data Science',
    subtitle: 'Learn data analysis, visualization and machine learning with Python',
    subjects: 12,
    difficulty: 'Intermediate',
    type: 'Text',
  },
  {
    id: 3,
    title: 'Advanced Algorithms & DSA',
    subtitle: 'Deep dive into data structures and algorithm design patterns',
    subjects: 10,
    difficulty: 'Advanced',
    type: 'Combine',
  },
];

const COURSE_TYPES = ['Text', 'Video', 'Combine'];

function difficultyBadgeClass(level) {
  if (level === 'Beginner') return 'cd-badge cd-badge-beginner';
  if (level === 'Intermediate') return 'cd-badge cd-badge-intermediate';
  return 'cd-badge cd-badge-advanced';
}

/* ── Course card ── */
function CourseCard({ course, onViewSubjects }) {
  return (
    <div className="cd-course-card">
      <img src={javaImg} alt={course.title} className="cd-course-thumb" />
      <div className="cd-course-body">
        <h3 className="cd-course-title">{course.title}</h3>
        <p className="cd-course-subtitle">{course.subtitle}</p>
        <div className="cd-course-meta">
          <span className="cd-course-subjects">Subjects: {course.subjects}</span>
          <span className={difficultyBadgeClass(course.difficulty)}>{course.difficulty}</span>
        </div>
      </div>
      <div className="cd-course-footer">
        <button className="cd-view-link" onClick={() => onViewSubjects(course.id)}>
          View All Subject →
        </button>
      </div>
    </div>
  );
}

/* ── Course Type Dropdown ── */
function CourseTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="cd-filter-panel" ref={ref}>
      <p className="cd-filter-panel-label">Course Type</p>
      <div className="cd-dropdown-wrap">
        <button
          className="cd-dropdown-trigger"
          onClick={() => setOpen((o) => !o)}
          type="button"
        >
          <span>{value || 'Select Course Type'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="cd-dropdown-menu">
            {COURSE_TYPES.map((type) => (
              <button
                key={type}
                className={`cd-dropdown-item ${value === type ? 'cd-dropdown-item-active' : ''}`}
                onClick={() => { onChange(type); setOpen(false); }}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function CategoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const categoryName = id
    ? id.charAt(0).toUpperCase() + id.slice(1)
    : 'Category';

  const [activeTab, setActiveTab] = useState('published');
  const [search, setSearch] = useState('');
  const [courseType, setCourseType] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  // Published tab → empty state; Drafts tab → show courses
  const showCourses = activeTab === 'drafts';

  const filteredCourses = SAMPLE_COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchType = courseType ? c.type === courseType : true;
    return matchSearch && matchType;
  });

  return (
    <div className="cd-page">

      {/* ── Page header ── */}
      <div className="cd-page-header">
        <div className="cd-header-left">
          <button
            className="cd-back-btn"
            onClick={() => navigate('/dashboard/course-management')}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="cd-page-title">{categoryName}</h1>
        </div>
        <span className="cd-breadcrumb">
          Course Management &rsaquo; View Details
        </span>
      </div>

      {/* ── Layout: filter sidebar + main content ── */}
      <div className="cd-layout">

        {/* Filter sidebar — only visible when filter is active */}
        {showFilter && (
          <aside className="cd-sidebar">
            <CourseTypeDropdown value={courseType} onChange={setCourseType} />
          </aside>
        )}

        {/* Main content */}
        <div className="cd-body">

          {/* Toolbar */}
          <div className="cd-toolbar">
            <div className="cd-toolbar-left">
              <h2 className="cd-section-title">All Courses</h2>
            </div>
            <div className="cd-toolbar-actions">
              <div className="cd-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="cd-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className={`cd-filter-btn ${showFilter ? 'cd-filter-btn-active' : ''}`}
                onClick={() => setShowFilter((v) => !v)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>
              <button
                className="cd-add-btn"
                onClick={() => navigate(`/dashboard/course-management/categories/${id}/courses/create`)}
              >
                + Add Course
              </button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="cd-tabs">
            <button
              className={`cd-tab ${activeTab === 'published' ? 'cd-tab-active' : 'cd-tab-inactive'}`}
              onClick={() => setActiveTab('published')}
            >
              Published Courses
            </button>
            <button
              className={`cd-tab ${activeTab === 'drafts' ? 'cd-tab-active' : 'cd-tab-inactive'}`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts
            </button>
          </div>

          {/* Content */}
          {showCourses ? (
            <div className="cd-courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewSubjects={(courseId) =>
                    navigate(`/dashboard/course-management/courses/${courseId}/subjects`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="cd-empty-wrap">
              <div className="cd-empty">
                <EmptyIllustration />
                <h2 className="cd-empty-title">No Content Yet</h2>
                <p className="cd-empty-desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
