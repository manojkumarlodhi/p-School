import { useNavigate, useParams } from 'react-router-dom';
import './individualcourses.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CHAPTERS = [
  { id: 'ch1', title: 'Section 03: Introduction to Programming', items: 3, videos: 3, pdfs: 2, texts: 2, quizzes: 2 },
  { id: 'ch2', title: 'Section 03: Introduction to Programming', items: 3, videos: 3, pdfs: 2, texts: 2, quizzes: 2 },
  { id: 'ch3', title: 'Section 03: Introduction to Programming', items: 3, videos: 3, pdfs: 2, texts: 2, quizzes: 2 },
  { id: 'ch4', title: 'Section 03: Introduction to Programming', items: 3, videos: 3, pdfs: 2, texts: 2, quizzes: 2 },
];

function ContentBadge({ color, label }) {
  return (
    <span className="ich-badge" style={{ background: color + '22', color }}>{label}</span>
  );
}

export default function IndividualChapters() {
  const { categoryId, courseId, subjectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="ich-page">
      {/* Header */}
      <div className="ich-page-header">
        <div className="ich-header-left">
          <button className="ich-back-btn"
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}`)}>
            <BackIcon />
          </button>
          <div>
            <h1 className="ich-page-title">Subject</h1>
            <p className="ich-breadcrumb">Home / Courses / Subject</p>
          </div>
        </div>
        <button className="ich-add-btn">
          <PlusIcon /> Add Chapter
        </button>
      </div>

      {/* Sub-header */}
      <div className="ich-sub-header">
        <span className="ich-sub-label">Java Full Stack All Subject</span>
        <span className="ich-sub-total">Total — {CHAPTERS.length}</span>
      </div>

      {/* Chapter list — 2-column grid on web */}
      <div className="ich-chapter-grid">
        {CHAPTERS.map(ch => (
          <div key={ch.id} className="ich-chapter-card">
            <div className="ich-chapter-header">
              <h3 className="ich-chapter-title">{ch.title}</h3>
              <span className="ich-chapter-items">Content Items: {ch.items}</span>
            </div>
            <div className="ich-chapter-badges">
              <ContentBadge color="#3b82f6" label={`${ch.videos} Videos`} />
              <ContentBadge color="#ef4444" label={`${ch.pdfs} PDF`} />
              <ContentBadge color="#f59e0b" label={`${ch.texts} Text Content`} />
              <ContentBadge color="#8b5cf6" label={`${ch.quizzes} Quiz Test`} />
            </div>
            <button className="ich-view-btn"
              onClick={() => navigate(`/instructor/individual/dashboard/courses/${categoryId}/${courseId}/chapters/${subjectId}/${ch.id}`)}>
              <ArrowIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
