import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './announcements.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ThreeDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="19" r="1" fill="currentColor"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const MegaphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

/* ── Data ── */
const ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'Midterm Exams Schedule',
    preview: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly....',
    category: 'Mechanics',
    date: 'Feb 10, 2026',
    time: '10:30 AM',
    body: `Dear students,

Please note that our coding class scheduled for Monday, Feb 10th has been moved to Wednesday, Feb 12th at 2:00 PM. The topic remains the same - Introduction to Functions.

Make sure to complete the previous assignment before the class. If you have any questions, feel free to reach out.

Best regards,
Mr. Sharma`,
    fullTitle: 'Important: Class Schedule Change',
  },
  {
    id: 'a2',
    title: 'Midterm Exams Schedule',
    preview: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly....',
    category: 'Mechanics',
    date: 'Feb 10, 2026',
    time: '10:30 AM',
    body: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly.',
    fullTitle: 'Midterm Exams Schedule',
  },
  {
    id: 'a3',
    title: 'Midterm Exams Schedule',
    preview: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly....',
    category: 'Mechanics',
    date: 'Feb 10, 2026',
    time: '10:30 AM',
    body: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly.',
    fullTitle: 'Midterm Exams Schedule',
  },
  {
    id: 'a4',
    title: 'Midterm Exams Schedule',
    preview: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly....',
    category: 'Mechanics',
    date: 'Feb 10, 2026',
    time: '10:30 AM',
    body: 'Midterm exams will be held from Feb 15-20. Please prepare accordingly.',
    fullTitle: 'Midterm Exams Schedule',
  },
];

/* ── 3-dot popup menu ── */
function ThreeDotMenu({ onEdit, onShare, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="ann-menu-wrap" ref={ref}>
      <button className="ann-menu-btn" onClick={() => setOpen(v => !v)}>
        <ThreeDotsIcon />
      </button>
      {open && (
        <div className="ann-menu-popup">
          <button className="ann-menu-item" onClick={() => { setOpen(false); onEdit?.(); }}>
            <span>✏️</span> Edit
          </button>
          <button className="ann-menu-item" onClick={() => { setOpen(false); onShare?.(); }}>
            <span>🔗</span> Share Link
          </button>
          <button className="ann-menu-item ann-menu-item--danger"
            onClick={() => { setOpen(false); onDelete?.(); }}>
            <span>🗑️</span> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Announcement Detail ── */
function AnnouncementDetail({ id }) {
  const navigate = useNavigate();
  const ann = ANNOUNCEMENTS.find(a => a.id === id) || ANNOUNCEMENTS[0];

  return (
    <div className="ann-page">
      <div className="ann-web-header">
        <div className="ann-web-header-left">
          <button className="ann-back-icon-btn"
            onClick={() => navigate('/instructor/individual/dashboard/announcements')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <div>
            <h1 className="ann-web-title">Announcement</h1>
            <p className="ann-web-breadcrumb">Home / Announcements / Detail</p>
          </div>
        </div>
        <ThreeDotMenu
          onEdit={() => navigate(`/instructor/individual/dashboard/announcements/create`)}
          onShare={() => {}}
          onDelete={() => navigate('/instructor/individual/dashboard/announcements')}
        />
      </div>

      <div className="ann-detail-layout">
        <div className="ann-detail-card">
          <h1 className="ann-detail-title">{ann.fullTitle}</h1>
          <p className="ann-detail-body">{ann.body}</p>
          <div className="ann-detail-meta">
            <span>Submitted: {ann.date}</span>
            <span>Time: {ann.time}</span>
          </div>
        </div>
        <div className="ann-detail-side">
          <button className="ann-edit-btn"
            onClick={() => navigate('/instructor/individual/dashboard/announcements/create')}>
            ✏️ Edit Announcement
          </button>
          <button className="ann-delete-btn"
            onClick={() => navigate('/instructor/individual/dashboard/announcements')}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Announcement List ── */
export default function IndividualAnnouncements() {
  const navigate = useNavigate();
  const { announcementId } = useParams();

  if (announcementId) return <AnnouncementDetail id={announcementId} />;

  return (
    <div className="ann-page">
      {/* Web page header */}
      <div className="ann-web-header">
        <div>
          <h1 className="ann-web-title">Announcements</h1>
          <p className="ann-web-breadcrumb">Home / Announcements</p>
        </div>
        <button className="ann-create-btn"
          onClick={() => navigate('/instructor/individual/dashboard/announcements/create')}>
          <PlusIcon /> Create Announcement
        </button>
      </div>

      <div className="ann-sub-header">
        <span className="ann-total">Total — {ANNOUNCEMENTS.length}</span>
        <ThreeDotMenu />
      </div>

      <div className="ann-list">
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} className="ann-card"
            onClick={() => navigate(`/instructor/individual/dashboard/announcements/${a.id}`)}>
            <div className="ann-card-left">
              <div className="ann-card-icon"><MegaphoneIcon /></div>
            </div>
            <div className="ann-card-body">
              <div className="ann-card-top">
                <span className="ann-card-title">{a.title}</span>
                <span className="ann-card-time">{a.time}</span>
              </div>
              <p className="ann-card-preview">{a.preview}</p>
              <div className="ann-card-footer">
                <span className="ann-card-badge">{a.category}</span>
                <span className="ann-card-date">{a.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
