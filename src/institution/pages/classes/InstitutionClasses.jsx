import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionclasses.css';
import profileImg from '../../../assets/images/profile.png';

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
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

/* ── Demo data ── */
const CLASSES = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: `Class 7A — Grade ${7 + i}`,
  category: 'Coding',
  courses: 'Java Full Stack, MERN Stack',
  students: '28 / 30',
  ageGroup: 'Youth',
  schedule: 'Mon–Fri | 9:00 AM',
  totalStudents: 31,
  instructor: 'Rahul Verma',
  coursesAssigned: 'Coding Basics',
}));

const DEMO_STUDENTS = [
  { id: 'STU001', name: 'Aman Sharma',  email: 'rohit@mail.com' },
  { id: 'STU001', name: 'Riya Verma',   email: 'Student' },
  { id: 'STU001', name: 'Arjun Singh',  email: 'Adult' },
];

const DEMO_TEACHERS = [
  { id: 'INS001', name: 'Mr. Rohit', subject: 'Physics', number: '3215462616', email: 'rohit@mail.com' },
];

const DEMO_COURSES_ASSIGNED = ['Coding Basics'];

/* ── Class Detail Modal ── */
function ClassDetailModal({ cls, onClose }) {
  const [tab, setTab] = useState('info');
  const TABS = ['Class Info', 'Students', 'Teachers', 'Courses'];

  return (
    <div className="icls-modal-overlay" onClick={onClose}>
      <div className="icls-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="icls-modal-header">
          <div className="icls-modal-tabs">
            {TABS.map(t => (
              <button key={t}
                className={`icls-modal-tab${tab === t.toLowerCase().replace(' ', '') ? ' active' : ''}`}
                onClick={() => setTab(t.toLowerCase().replace(' ', ''))}>
                {t}
              </button>
            ))}
          </div>
          <button className="icls-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="icls-modal-body">

          {/* ── Class Info Tab ── */}
          {tab === 'classinfo' && (
            <div>
              <h3 className="icls-modal-class-name">{cls.name}</h3>
              <div className="icls-modal-assign-row">
                <span className="icls-modal-summary-label">Summary</span>
                <button className="icls-modal-assign-btn"><PlusIcon /> Assign Course</button>
              </div>
              <div className="icls-modal-summary-grid">
                <div className="icls-modal-summary-item">
                  <div className="icls-modal-summary-key">Total Students</div>
                  <div className="icls-modal-summary-val">{cls.totalStudents}</div>
                </div>
                <div className="icls-modal-summary-item">
                  <div className="icls-modal-summary-key">Instructor</div>
                  <div className="icls-modal-summary-val">{cls.instructor}</div>
                </div>
                <div className="icls-modal-summary-item">
                  <div className="icls-modal-summary-key">Courses Assigned</div>
                  <div className="icls-modal-summary-val">{cls.coursesAssigned}</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Students Tab ── */}
          {tab === 'students' && (
            <div>
              <div className="icls-modal-tab-header">
                <h4 className="icls-modal-tab-title">Students</h4>
                <button className="icls-modal-assign-btn"><PlusIcon /> Add Student</button>
              </div>
              <table className="icls-modal-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_STUDENTS.map((s, i) => (
                    <tr key={i}>
                      <td className="icls-modal-id">{s.id}</td>
                      <td>
                        <div className="icls-modal-name-cell">
                          <img src={profileImg} alt={s.name} className="icls-modal-avatar" />
                          <span>{s.name}</span>
                        </div>
                      </td>
                      <td>{s.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Teachers Tab ── */}
          {tab === 'teachers' && (
            <div>
              <div className="icls-modal-tab-header">
                <h4 className="icls-modal-tab-title">Instructor</h4>
                <button className="icls-modal-assign-btn"><PlusIcon /> Add Instructor</button>
              </div>
              <table className="icls-modal-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Number</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_TEACHERS.map((t, i) => (
                    <tr key={i}>
                      <td className="icls-modal-id">{t.id}</td>
                      <td>
                        <div className="icls-modal-name-cell">
                          <img src={profileImg} alt={t.name} className="icls-modal-avatar" />
                          <span>{t.name}</span>
                        </div>
                      </td>
                      <td>{t.subject}</td>
                      <td>{t.number}</td>
                      <td>{t.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Courses Tab ── */}
          {tab === 'courses' && (
            <div>
              <div className="icls-modal-tab-header">
                <h4 className="icls-modal-tab-title">Courses List</h4>
                <button className="icls-modal-assign-btn"><PlusIcon /> Assign Course</button>
              </div>
              <div className="icls-modal-courses-list">
                {DEMO_COURSES_ASSIGNED.map((c, i) => (
                  <div key={i} className="icls-modal-course-row">
                    <span className="icls-modal-course-label">Courses Assigned</span>
                    <span className="icls-modal-course-name">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function InstitutionClasses() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('created');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const totalPages = 10;

  const filtered = CLASSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="icls-page">
      <div className="icls-page-header">
        <h1 className="icls-page-title">Classes</h1>
        <span className="icls-breadcrumb">Classes</span>
      </div>

      {/* Tabs */}
      <div className="icls-tabs">
        <button className={`icls-tab${tab === 'created' ? ' active' : ''}`}
          onClick={() => setTab('created')}>Created Classes</button>
        <button className={`icls-tab${tab === 'draft' ? ' active' : ''}`}
          onClick={() => setTab('draft')}>Draft Classes</button>
      </div>

      <div className="icls-body">
        {/* Toolbar */}
        <div className="icls-toolbar">
          <h2 className="icls-section-title">Class List</h2>
          <div className="icls-toolbar-right">
            <div className="icls-search-wrap">
              <SearchIcon />
              <input className="icls-search" placeholder="Search"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="icls-btn icls-btn--outline"><FilterIcon /> Filters</button>
            <button className="icls-btn icls-btn--primary"
              onClick={() => navigate('/institution/dashboard/classes/create')}>
              + Create Class
            </button>
          </div>
        </div>

        {/* 2-column class card grid */}
        <div className="icls-grid">
          {filtered.map((cls, i) => (
            <div key={i} className="icls-card">
              <div className="icls-card-header">
                <h3 className="icls-card-name">{cls.name}</h3>
                <span className="icls-category-badge">
                  <CodeIcon /> {cls.category}
                </span>
              </div>

              <div className="icls-card-courses-label">Courses</div>
              <div className="icls-card-courses">{cls.courses}</div>

              <div className="icls-card-meta">
                <div className="icls-meta-item">
                  <div className="icls-meta-label">Students</div>
                  <div className="icls-meta-value">{cls.students}</div>
                </div>
                <div className="icls-meta-item">
                  <div className="icls-meta-label">Age Group</div>
                  <div className="icls-meta-value icls-meta-value--amber">{cls.ageGroup}</div>
                </div>
                <div className="icls-meta-item">
                  <div className="icls-meta-label">Schedule</div>
                  <div className="icls-meta-value">{cls.schedule}</div>
                </div>
              </div>

              <div className="icls-card-actions">
                <button className="icls-edit-btn"
                  onClick={() => navigate('/institution/dashboard/classes/create')}>
                  <EditIcon /> Edit Class
                </button>
                <button className="icls-view-btn"
                  onClick={() => setSelectedClass(cls)}>
                  View Class <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="icls-pagination">
          <button className="icls-page-btn--nav"
            onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <PrevIcon /> Previous
          </button>
          <div className="icls-page-numbers">
            {[1, 2, 3].map(n => (
              <button key={n} className={`icls-page-num${page === n ? ' active' : ''}`}
                onClick={() => setPage(n)}>{n}</button>
            ))}
            <span className="icls-page-ellipsis">...</span>
            {[8, 9, 10].map(n => (
              <button key={n} className={`icls-page-num${page === n ? ' active' : ''}`}
                onClick={() => setPage(n)}>{n}</button>
            ))}
          </div>
          <button className="icls-page-btn--nav"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next <NextIcon />
          </button>
        </div>
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <ClassDetailModal
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}


