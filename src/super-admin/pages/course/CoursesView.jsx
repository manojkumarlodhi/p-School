import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import javaImg from '../../../assets/images/javafullstack.png';
import './coursesview.css';

const CATEGORY_TABS = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

const FILTER_TABS = ['Platform Courses', 'My Courses', 'Drafts'];

const COURSES = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: 'Java Full Stack Development',
  subtitle: 'Master backend and frontend using Java technologies',
  subjects: 8,
  difficulty: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
}));

function difficultyClass(d) {
  if (d === 'Beginner')     return 'cv-badge cv-badge-beginner';
  if (d === 'Intermediate') return 'cv-badge cv-badge-intermediate';
  return 'cv-badge cv-badge-advanced';
}

export default function CoursesView() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Coding');
  const [activeFilter, setActiveFilter]     = useState('My Courses');
  const [search, setSearch]                 = useState('');

  return (
    <div className="cv-page">

      {/* ── Page header ── */}
      <div className="cv-page-header">
        <h1 className="cv-page-title">Courses Management</h1>
        <span className="cv-breadcrumb">Course Management</span>
      </div>

      {/* ── Category tabs ── */}
      <div className="cv-category-tabs">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat}
            className={`cv-cat-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="cv-body">

        {/* Toolbar */}
        <div className="cv-toolbar">
          <h2 className="cv-section-title">All Courses</h2>
          <div className="cv-toolbar-actions">
            <div className="cv-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="cv-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="cv-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
            </button>
            <button
              className="cv-add-btn"
              onClick={() => navigate(`/dashboard/course-management/categories/${activeCategory.toLowerCase()}/courses/create`)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              + Add Course
            </button>
          </div>
        </div>

        {/* Filter sub-tabs */}
        <div className="cv-filter-tabs">
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              className={`cv-filter-tab${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Course cards grid */}
        <div className="cv-grid">
          {COURSES.map((course) => (
            <div key={course.id} className="cv-card">
              <img src={javaImg} alt={course.title} className="cv-card-thumb" />
              <div className="cv-card-body">
                <h3 className="cv-card-title">{course.title}</h3>
                <p className="cv-card-subtitle">{course.subtitle}</p>
                <div className="cv-card-meta">
                  <span className="cv-card-subjects">Subjects : {course.subjects}</span>
                  <span className={difficultyClass(course.difficulty)}>{course.difficulty}</span>
                </div>
              </div>
              <div className="cv-card-footer">
                <button className="cv-view-link"
                  onClick={() => navigate(`/dashboard/course-management/courses/${course.id}/subjects`)}>                  View All Subject →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
