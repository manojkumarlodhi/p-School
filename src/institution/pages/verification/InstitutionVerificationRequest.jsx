import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionverification.css';
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

const ROWS = Array.from({ length: 9 }, () => ({
  id: 'INS001',
  name: 'Dr. Kwame Mensah',
  email: 'rohit@mail.com',
  phone: '21654651455',
}));

function TableSection({ title, rows, onView }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ivr-table-card">
      <div className="ivr-toolbar">
        <h2 className="ivr-table-title">{title}</h2>
        <div className="ivr-toolbar-right">
          <div className="ivr-search-wrap">
            <SearchIcon />
            <input className="ivr-search" placeholder="Search"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="ivr-btn ivr-btn--outline">
            <FilterIcon /> Filters
          </button>
        </div>
      </div>

      <div className="ivr-table-wrap">
        <table className="ivr-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td className="ivr-td-id">{r.id}</td>
                <td>
                  <div className="ivr-name-cell">
                    <img src={profileImg} alt={r.name} className="ivr-avatar" />
                    <span>{r.name}</span>
                  </div>
                </td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>
                  <button className="ivr-action-btn" aria-label="View" onClick={() => onView()}>
                    <SunIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ivr-pagination">
        <button className="ivr-page-btn--nav"
          onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          <PrevIcon /> Previous
        </button>
        <div className="ivr-page-numbers">
          {[1, 2, 3].map(n => (
            <button key={n} className={`ivr-page-num${page === n ? ' active' : ''}`}
              onClick={() => setPage(n)}>{n}</button>
          ))}
          <span className="ivr-page-ellipsis">...</span>
          {[8, 9, 10].map(n => (
            <button key={n} className={`ivr-page-num${page === n ? ' active' : ''}`}
              onClick={() => setPage(n)}>{n}</button>
          ))}
        </div>
        <button className="ivr-page-btn--nav"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next <NextIcon />
        </button>
      </div>
    </div>
  );
}

export default function InstitutionVerificationRequest() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('instructor');

  return (
    <div className="ivr-page">
      <div className="ivr-page-header">
        <h1 className="ivr-page-title">Verification Request</h1>
        <span className="ivr-breadcrumb">Instructor list</span>
      </div>

      {/* Tabs */}
      <div className="ivr-tabs">
        <button className={`ivr-tab${tab === 'instructor' ? ' active' : ''}`}
          onClick={() => setTab('instructor')}>Instructor</button>
        <button className={`ivr-tab${tab === 'student' ? ' active' : ''}`}
          onClick={() => setTab('student')}>Student</button>
      </div>

      <div className="ivr-body">
        {tab === 'instructor' && (
          <TableSection
            title="Instructor Verification Request"
            rows={ROWS}
            onView={() => navigate('/institution/dashboard/verification/detail')}
          />
        )}
        {tab === 'student' && (
          <TableSection
            title="Student Verification Request"
            rows={ROWS}
            onView={() => navigate('/institution/dashboard/verification/detail')}
          />
        )}
      </div>
    </div>
  );
}
