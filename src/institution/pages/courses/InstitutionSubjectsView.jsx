import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioncourses.css';

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
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SUBJECTS = Array.from({ length: 9 }, () => ({
  name: 'Core Java',
  chapters: 12,
}));

export default function InstitutionSubjectsView() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const filtered = SUBJECTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="icm-page">
      <div className="icm-page-header">
        <button className="icm-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Java Full Stack Development</span>
        </button>
        <span className="icm-breadcrumb">Course Management</span>
      </div>

      <div className="icm-body">
        <div className="icm-toolbar">
          <p className="icm-browse-text">Browse subjects included in this course</p>
          <div className="icm-toolbar-right">
            <div className="icm-search-wrap">
              <SearchIcon />
              <input className="icm-search" placeholder="Search"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="icm-btn icm-btn--outline"><FilterIcon /> Filters</button>
            <button className="icm-btn icm-btn--primary"
              onClick={() => setShowAddSubject(true)}>+ Add Subject</button>
          </div>
        </div>

        <div className="icm-subject-grid">
          {filtered.map((s, i) => (
            <div key={i} className="icm-subject-card">
              <div className="icm-subject-accent" />
              <div className="icm-subject-body">
                <h3 className="icm-subject-name">{s.name}</h3>
                <p className="icm-subject-chapters">Chapters : {s.chapters}</p>
                <button className="icm-view-btn icm-view-btn--subject"
                  onClick={() => navigate('/institution/dashboard/courses/chapters')}>
                  View All Chapter <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Subject Modal */}
      {showAddSubject && (
        <div className="icm-modal-overlay" onClick={() => setShowAddSubject(false)}>
          <div className="icm-modal" onClick={e => e.stopPropagation()}>
            <div className="icm-modal-header">
              <h3 className="icm-modal-title">Add Subject</h3>
              <button className="icm-modal-close" onClick={() => setShowAddSubject(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="icm-modal-body">
              <div className="icm-form-field">
                <label className="icm-form-label">Subject Name</label>
                <input className="icm-form-input" placeholder="Enter subject name"
                  value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)} />
              </div>
              <div className="icm-modal-actions">
                <button className="icm-btn-primary"
                  onClick={() => { setNewSubjectName(''); setShowAddSubject(false); }}>
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
