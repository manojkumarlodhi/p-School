import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioncourses.css';
import javaImg from '../../../assets/images/javafullstack.png';

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const TABS = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

const LEVEL_COLORS = {
  Beginner:     { bg: '#dcfce7', color: '#16a34a' },
  Intermediate: { bg: '#ede9fe', color: '#7c3aed' },
  Advanced:     { bg: '#fef3c7', color: '#d97706' },
};

const COURSES = [
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Beginner' },
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Intermediate' },
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Advanced' },
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Beginner' },
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Intermediate' },
  { title: 'Java Full Stack Development', desc: 'Master backend and frontend using Java technologies', subjects: 8, level: 'Advanced' },
];

/* ── No Content Empty State ── */
function EmptyState({ message }) {
  return (
    <div className="icm-empty-state">
      <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="#e0f4fb" opacity="0.5"/>
        <rect x="60" y="70" width="80" height="70" rx="8" fill="#b3e5f7"/>
        <rect x="72" y="85" width="56" height="8" rx="4" fill="#fff"/>
        <rect x="72" y="100" width="40" height="8" rx="4" fill="#fff"/>
        <circle cx="140" cy="65" r="18" fill="#fff" stroke="#1ba8d5" strokeWidth="3"/>
        <path d="M133 65h14M140 58v14" stroke="#1ba8d5" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <h3 className="icm-empty-title">No Content Yet</h3>
      <p className="icm-empty-desc">{message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed'}</p>
    </div>
  );
}

export default function InstitutionCourseManagement() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Coding');
  const [subTab, setSubTab] = useState('Platform Courses');
  const [search, setSearch] = useState('');

  const SUB_TABS = ['Platform Courses', 'My Courses', 'Drafts'];

  // Platform Courses data
  const PLATFORM_COURSES = COURSES;
  // My Courses — same data for demo; in real app this would be institution's own courses
  const MY_COURSES = COURSES.slice(0, 3);
  // Drafts — empty for demo
  const DRAFT_COURSES = [];

  function getActiveCourses() {
    if (subTab === 'Platform Courses') return PLATFORM_COURSES;
    if (subTab === 'My Courses') return MY_COURSES;
    return DRAFT_COURSES;
  }

  const filtered = getActiveCourses().filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="icm-page">
      <div className="icm-page-header">
        <h1 className="icm-page-title">Courses Management</h1>
        <span className="icm-breadcrumb">Course Management</span>
      </div>

      {/* Category tabs */}
      <div className="icm-tabs">
        {TABS.map(t => (
          <button key={t} className={`icm-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="icm-body">
        {/* Toolbar */}
        <div className="icm-toolbar">
          <h2 className="icm-section-title">All Courses</h2>
          <div className="icm-toolbar-right">
            <div className="icm-search-wrap">
              <SearchIcon />
              <input className="icm-search" placeholder="Search"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="icm-btn icm-btn--outline"><FilterIcon /> Filters</button>
            {/* My Courses tab pe "Add My Courses", baaki pe "+ Add Course" */}
            <button className="icm-btn icm-btn--primary"
              onClick={() => navigate('/institution/dashboard/courses/create')}>
              {subTab === 'My Courses' ? '+ Add My Courses' : '+ Add Course'}
            </button>
          </div>
        </div>

        {/* Sub-tabs: Platform Courses / My Courses / Drafts */}
        <div className="icm-subtabs">
          {SUB_TABS.map(st => (
            <button key={st}
              className={`icm-subtab${subTab === st ? ' active' : ''}`}
              onClick={() => { setSubTab(st); setSearch(''); }}>
              {st}
            </button>
          ))}
        </div>

        {/* Course grid or empty state */}
        {filtered.length === 0 ? (
          <EmptyState message={
            subTab === 'Drafts'
              ? 'No draft courses yet. Create a course and save as draft.'
              : subTab === 'My Courses'
              ? 'No courses added yet. Click "+ Add My Courses" to get started.'
              : 'No courses available in this category.'
          } />
        ) : (
          <div className="icm-course-grid">
            {filtered.map((course, i) => {
              const lc = LEVEL_COLORS[course.level] || LEVEL_COLORS.Beginner;
              return (
                <div key={i} className="icm-course-card">
                  <div className="icm-course-img-wrap">
                    <img src={javaImg} alt={course.title} className="icm-course-img" />
                  </div>
                  <div className="icm-course-body">
                    <h3 className="icm-course-title">{course.title}</h3>
                    <p className="icm-course-desc">{course.desc}</p>
                    <div className="icm-course-meta">
                      <span className="icm-course-subjects">Subjects : {course.subjects}</span>
                      <span className="icm-level-badge"
                        style={{ background: lc.bg, color: lc.color }}>
                        {course.level}
                      </span>
                    </div>
                    <button className="icm-view-btn"
                      onClick={() => navigate('/institution/dashboard/courses/subjects')}>
                      View All Subject <ArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
