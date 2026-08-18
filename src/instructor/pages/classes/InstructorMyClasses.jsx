import './classes.css';
import { useNavigate } from 'react-router-dom';


const CLASSES = [
  { id: 'grade7a', name: 'Grade 7A', subject: 'Coding',      students: 31 },
  { id: 'grade6b', name: 'Grade 6B', subject: 'Robotics',    students: 25 },
  { id: 'grade8c', name: 'Grade 8C', subject: 'Electronics', students: 31 },
  { id: 'grade7d', name: 'Grade 7D', subject: 'Mechanics',   students: 31 },
];

const SUBJECT_COLORS = {
  Coding:      { bg: '#f0f9ff', color: '#1ba8d5' },
  Robotics:    { bg: '#fff7ed', color: '#f59e0b' },
  Electronics: { bg: '#f5f3ff', color: '#8b5cf6' },
  Mechanics:   { bg: '#f0fdf4', color: '#22c55e' },
};

const SUBJECT_EMOJI = {
  Coding: 'ðŸ’»', Robotics: 'ðŸ†', Electronics: 'âš¡', Mechanics: 'ðŸ”§',
};

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* Empty state SVG illustration */
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

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function InstructorMyClasses() {
  const navigate = useNavigate();
  const hasClasses = CLASSES.length > 0;

  return (
    <div className="incls-list-page">
      <div className="incls-list-header">
        <h1 className="incls-list-title">My Classes</h1>
        <button className="incls-create-class-btn"
          onClick={() => navigate('/instructor/dashboard/classes/create')}>
          <PlusIcon /> Create Class
        </button>
      </div>

      {!hasClasses ? (
        <div className="incls-empty">
          <div className="incls-empty-icon"><EmptyIllustration /></div>
          <h2 className="incls-empty-title">No Students Added Yet</h2>
          <p className="incls-empty-sub">There are currently no students in Grade 7A.</p>
          <button className="incls-empty-btn"
            onClick={() => navigate('/instructor/dashboard/classes/create')}>
            + Create Class
          </button>
        </div>
      ) : (
        <>
          <p className="incls-total-label">Total - {CLASSES.length} Classes</p>
          <div className="incls-grid">
            {CLASSES.map(cls => {
              const colors = SUBJECT_COLORS[cls.subject] || { bg: '#f3f4f6', color: '#6b7280' };
              return (
                <div key={cls.id} className="incls-class-card"
                  onClick={() => navigate(`/instructor/dashboard/classes/${cls.id}`)}>
                  <div className="incls-class-card-top">
                    <span className="incls-class-name">{cls.name}</span>
                    <span className="incls-class-badge"
                      style={{ background: colors.bg, color: colors.color }}>
                      {SUBJECT_EMOJI[cls.subject]} {cls.subject}
                    </span>
                  </div>
                  <div className="incls-class-students">
                    <div className="incls-class-avatars">
                      {['A','B','C'].map(l => (
                        <div key={l} className="incls-class-avatar">{l}</div>
                      ))}
                    </div>
                    <span>{cls.students} Students</span>
                    <button className="incls-class-arrow"
                      onClick={e => { e.stopPropagation(); navigate(`/instructor/dashboard/classes/${cls.id}`); }}>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

