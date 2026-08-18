import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioninstructors.css';
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
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
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

const INSTRUCTORS = Array.from({ length: 9 }, (_, i) => ({
  id: 'INS001',
  name: 'Dr. Kwame Mensah',
  subject: 'Physics',
  classes: ['7A, 8B', '6B', '8A, 8B', '8A, 8B', '8A, 8B', '8A, 8B', '6B', '6B', '6B'][i],
  email: 'rohit@mail.com',
  active: true,
}));

function Toggle({ active, onChange }) {
  return (
    <button className={`iinst-toggle${active ? ' iinst-toggle--on' : ''}`}
      onClick={onChange} type="button" aria-label="Toggle status">
      <span className="iinst-toggle-thumb" />
    </button>
  );
}

export default function InstitutionInstructorList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [instructors, setInstructors] = useState(INSTRUCTORS);
  const [page, setPage] = useState(1);
  const totalPages = 10;

  function toggleStatus(idx) {
    setInstructors(prev => prev.map((s, i) => i === idx ? { ...s, active: !s.active } : s));
  }

  const filtered = instructors.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="iinst-page">

      <div className="iinst-page-header">
        <h1 className="iinst-page-title">Instructor</h1>
        <span className="iinst-breadcrumb">Instructor list</span>
      </div>

      <div className="iinst-body">
        <div className="iinst-table-card">

          {/* toolbar */}
          <div className="iinst-toolbar">
            <h2 className="iinst-table-title">Instructor List</h2>
            <div className="iinst-toolbar-right">
              <div className="iinst-search-wrap">
                <SearchIcon />
                <input className="iinst-search" placeholder="Search"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="iinst-btn iinst-btn--outline">
                <FilterIcon /> Filters
              </button>
              <button className="iinst-btn iinst-btn--primary"
                onClick={() => navigate('/institution/dashboard/instructors/invite')}>
                + Invite new Instructor
              </button>
            </div>
          </div>

          {/* table */}
          <div className="iinst-table-wrap">
            <table className="iinst-table">
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
                    <td className="iinst-td-id">{s.id}</td>
                    <td>
                      <div className="iinst-name-cell">
                        <img src={profileImg} alt={s.name} className="iinst-avatar" />
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td>{s.subject}</td>
                    <td>{s.classes}</td>
                    <td>{s.email}</td>
                    <td><Toggle active={s.active} onChange={() => toggleStatus(i)} /></td>
                    <td>
                      <div className="iinst-actions">
                        <button className="iinst-action-btn" aria-label="View"
                          onClick={() => navigate('/institution/dashboard/instructors/detail')}>
                          <SunIcon />
                        </button>
                        <button className="iinst-action-btn" aria-label="Edit">
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
          <div className="iinst-pagination">
            <button className="iinst-page-btn--nav"
              onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <PrevIcon /> Previous
            </button>
            <div className="iinst-page-numbers">
              {[1, 2, 3].map(n => (
                <button key={n} className={`iinst-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
              <span className="iinst-page-ellipsis">...</span>
              {[8, 9, 10].map(n => (
                <button key={n} className={`iinst-page-num${page === n ? ' active' : ''}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
            <button className="iinst-page-btn--nav"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next <NextIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
