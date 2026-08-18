import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionstudents.css';
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
/* Pencil / edit icon */
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
/* Sun / asterisk icon — matches the ☀ in the design action column */
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2"  x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"/>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
    <line x1="2"  y1="12" x2="5"  y2="12"/>
    <line x1="19" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
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

/* ── Stats ── */
const STATS = [
  { label: 'Total Student', value: '2000' },
  { label: 'Age 10-14',     value: '400'  },
  { label: 'Age 15-18',     value: '400'  },
  { label: 'Age 19-24',     value: '600'  },
  { label: 'Age 25-34',     value: '600'  },
];

/* ── Table data ── */
const STUDENTS = Array.from({ length: 8 }, (_, i) => ({
  id: 'INS001',
  name: 'Dr. Kwame Mensah',
  subject: 'Physics',
  classes: ['7A, 8B', '6B', '8A, 8B', '8A, 8B', '8A, 8B', '8A, 8B', '6B', '6B'][i],
  email: 'rohit@mail.com',
  active: true,
}));

/* ── Toggle switch ── */
function Toggle({ active, onChange }) {
  return (
    <button
      className={`ist-toggle${active ? ' ist-toggle--on' : ''}`}
      onClick={onChange}
      aria-label="Toggle status"
      type="button"
    >
      <span className="ist-toggle-thumb" />
    </button>
  );
}

export default function InstitutionStudentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState(STUDENTS);
  const [page, setPage] = useState(1);
  const totalPages = 10;

  function toggleStatus(idx) {
    setStudents(prev => prev.map((s, i) => i === idx ? { ...s, active: !s.active } : s));
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ist-page">

      {/* ── Page header ── */}
      <div className="ist-page-header">
        <h1 className="ist-page-title">Student</h1>
        <span className="ist-breadcrumb">Student</span>
      </div>

      <div className="ist-body">

        {/* ── Stats row ── */}
        <div className="ist-stats-row">
          {STATS.map(s => (
            <div key={s.label} className="ist-stat-card">
              <div className="ist-stat-label">{s.label}</div>
              <div className="ist-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Table card ── */}
        <div className="ist-table-card">

          {/* toolbar */}
          <div className="ist-toolbar">
            <h2 className="ist-table-title">Student List</h2>
            <div className="ist-toolbar-right">
              <div className="ist-search-wrap">
                <SearchIcon />
                <input
                  className="ist-search"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="ist-btn ist-btn--outline">
                <FilterIcon /> Filters
              </button>
              <button
                className="ist-btn ist-btn--outline"
                onClick={() => navigate('/institution/dashboard/students/bulk-upload')}
              >
                + Bulk Upload
              </button>
              <button
                className="ist-btn ist-btn--primary"
                onClick={() => navigate('/institution/dashboard/students/add')}
              >
                + Add New Student
              </button>
            </div>
          </div>

          {/* table */}
          <div className="ist-table-wrap">
            <table className="ist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Classes Assigned</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i}>
                    <td className="ist-td-id">{s.id}</td>
                    <td>
                      <div className="ist-name-cell">
                        <img src={profileImg} alt={s.name} className="ist-avatar" />
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td>{s.subject}</td>
                    <td>{s.classes}</td>
                    <td>{s.email}</td>
                    <td>
                      <Toggle active={s.active} onChange={() => toggleStatus(i)} />
                    </td>
                    <td>
                      <div className="ist-actions">
                        <button className="ist-action-btn" aria-label="Settings">
                          <SunIcon />
                        </button>
                        <button className="ist-action-btn" aria-label="Edit">
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="ist-pagination">
            <button
              className="ist-page-btn ist-page-btn--nav"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <PrevIcon /> Previous
            </button>

            <div className="ist-page-numbers">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`ist-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}
                >{n}</button>
              ))}
              <span className="ist-page-ellipsis">...</span>
              {[8, 9, 10].map(n => (
                <button
                  key={n}
                  className={`ist-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}
                >{n}</button>
              ))}
            </div>

            <button
              className="ist-page-btn ist-page-btn--nav"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next <NextIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
