import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './individualcourses.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

const TYPE_COLORS = {
  Videos:         '#3b82f6',
  PDF:            '#ef4444',
  'Text Content': '#f59e0b',
  'Quiz Test':    '#8b5cf6',
};

const CONTENT_ITEMS = [
  { id: 'ci1', title: 'What is Programming', type: 'Videos',       desc: 'Learn the basics of programming and get started with your first program.' },
  { id: 'ci2', title: 'What is Programming', type: 'PDF',          desc: 'Learn the basics of programming and get started with your first program.' },
  { id: 'ci3', title: 'What is Programming', type: 'Text Content', desc: 'Learn the basics of programming and get started with your first program.' },
  { id: 'ci4', title: 'What is Programming', type: 'Quiz Test',    desc: 'Learn the basics of programming and get started with your first program.' },
];

function ContentMenu({ onClose }) {
  return (
    <div className="icc3-menu-overlay" onClick={onClose}>
      <div className="icc3-menu" onClick={e => e.stopPropagation()}>
        <button className="icc3-menu-item" onClick={onClose}>✏️ Edit</button>
        <button className="icc3-menu-item" onClick={onClose}>👁️ Unpublish</button>
        <button className="icc3-menu-item" style={{ color: '#ef4444' }} onClick={onClose}>🗑️ Delete</button>
      </div>
    </div>
  );
}

export default function IndividualChapterContent() {
  const { categoryId, courseId, subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="icc3-page">
      {/* Header */}
      <div className="icc3-page-header">
        <div className="icc3-header-left">
          <button className="icc3-back-btn"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/chapters/${subjectId}`)}>
            <BackIcon />
          </button>
          <div>
            <h1 className="icc3-page-title">Chapters Content</h1>
            <p className="icc3-breadcrumb">Home / Courses / Chapters / Content</p>
          </div>
        </div>
      </div>

      {/* Section info */}
      <div className="icc3-section-info">
        <h2 className="icc3-section-title">Section 1: Introduction to Programming</h2>
        <span className="icc3-section-total">Total Content Items: {CONTENT_ITEMS.length}</span>
      </div>

      {/* Content list */}
      <div className="icc3-content-list">
        {CONTENT_ITEMS.map(item => (
          <div key={item.id} className="icc3-content-card">
            <div className="icc3-content-left">
              <div className="icc3-content-body">
                <div className="icc3-content-title">{item.title}</div>
                <div className="icc3-content-type-badge"
                  style={{ background: TYPE_COLORS[item.type] + '22', color: TYPE_COLORS[item.type] }}>
                  {item.type}
                </div>
                <div className="icc3-content-desc">{item.desc}</div>
              </div>
            </div>
            <div className="icc3-content-actions">
              <button className="icc3-eye-btn" title="Preview"><EyeIcon /></button>
              <button className="icc3-eye-btn" title="Edit"><EditIcon /></button>
              <button className="icc3-dots-btn" onClick={() => setOpenMenu(item.id)}>
                <DotsIcon />
              </button>
            </div>
            {openMenu === item.id && (
              <ContentMenu onClose={() => setOpenMenu(null)} />
            )}
          </div>
        ))}
      </div>

      {/* Bottom action bar */}
      <div className="icc3-bottom-bar">
        <button className="icc3-delete-chapter-btn">
          <TrashIcon /> Delete Chapter
        </button>
        <button className="icc3-add-section-btn">
          <PlusIcon /> Add Section
        </button>
      </div>

      {/* Save / Cancel */}
      <div className="icc3-save-bar">
        <button className="icc3-cancel-btn"
          onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/chapters/${subjectId}`)}>
          Cancel
        </button>
        <button className="icc3-save-btn">Save Content</button>
      </div>
    </div>
  );
}
