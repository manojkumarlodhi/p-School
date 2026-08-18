import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionassignments.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
  </svg>
);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);

const ASSIGNMENTS = [
  { title: 'Data Structures - Binary Search Trees', class: 'Class A', instructor: 'Ms. Sharma', due: '2024-01-25', submissions: 28, status: 'Active' },
  { title: 'Data Structures - Binary Search Trees', class: 'Class A', instructor: 'Ms. Sharma', due: '2024-01-25', submissions: 64, status: 'Closed' },
  { title: 'Data Structures - Binary Search Trees', class: 'Class A', instructor: 'Ms. Sharma', due: '2024-01-25', submissions: 64, status: 'Active' },
];

export default function InstitutionAssignments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const filtered = ASSIGNMENTS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="iasn-page">
      <div className="iasn-page-header">
        <button className="iasn-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Assignments</span>
        </button>
        <span className="iasn-breadcrumb">Assignments</span>
      </div>

      <div className="iasn-body">
        <div className="iasn-table-card">
          <div className="iasn-toolbar">
            <h2 className="iasn-table-title">Assignments</h2>
            <div className="iasn-toolbar-right">
              <div className="iasn-search-wrap">
                <SearchIcon />
                <input className="iasn-search" placeholder="Search"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="iasn-btn iasn-btn--outline"><FilterIcon /> Filters</button>
              <button className="iasn-btn iasn-btn--primary"
                onClick={() => navigate('/institution/dashboard/assignments/create')}>
                + Create Assignment
              </button>
            </div>
          </div>

          <div className="iasn-table-wrap">
            <table className="iasn-table">
              <thead>
                <tr>
                  <th>Assignment Title</th>
                  <th>Class</th>
                  <th>Instructor</th>
                  <th>Due Date</th>
                  <th>Submissions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={i}>
                    <td>{a.title}</td>
                    <td>{a.class}</td>
                    <td>{a.instructor}</td>
                    <td>{a.due}</td>
                    <td>{a.submissions}</td>
                    <td>
                      <span className={`iasn-status iasn-status--${a.status.toLowerCase()}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <button className="iasn-action-btn"
                        onClick={() => navigate('/institution/dashboard/assignments/detail')}>
                        <SunIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="iasn-pagination">
            <button className="iasn-page-btn--nav" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <PrevIcon /> Previous
            </button>
            <div className="iasn-page-numbers">
              {[1,2,3].map(n => <button key={n} className={`iasn-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
              <span className="iasn-page-ellipsis">...</span>
              {[8,9,10].map(n => <button key={n} className={`iasn-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
            </div>
            <button className="iasn-page-btn--nav" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
