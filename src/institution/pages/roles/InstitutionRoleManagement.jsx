import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionroles.css';
import profileImg from '../../../assets/images/profile.png';

/* ── Icons ── */
const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const FilterIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const CodeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>);
const ArrowRight = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
const SunIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>);
const EditIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);

/* ── Toggle ── */
function Toggle({ active, onChange }) {
  return (
    <button type="button" className={`irl-toggle${active ? ' irl-toggle--on' : ''}`}
      onClick={() => onChange?.(!active)}>
      <span className="irl-toggle-thumb" />
    </button>
  );
}

/* ── Role cards data ── */
const ROLES = [
  { name: 'Institution Super Admin', desc: 'Full access to all modules and settings',       perms: 'All' },
  { name: 'Academic Coordinator',    desc: 'Manages courses, classes, and academic performance', perms: 'Students, Classes, Courses, Reports' },
  { name: 'Teacher Manager',         desc: 'Handles instructor onboarding and assignments', perms: 'Instructors, Classes' },
  { name: 'Student Administrator',   desc: 'Manages student records and enrollment',        perms: 'Students' },
  { name: 'Finance Officer',         desc: 'Manages billing, invoices, and payments',       perms: 'Billing, Invoices, Reports' },
  { name: 'Tech Support',            desc: 'Handles integrations and system issues',        perms: 'Integrations, Lab Access' },
];

/* ── Sub-admin list data ── */
const ADMINS = [
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Academic Coordinator', lastActive: 'Today',      active: true,  pending: false },
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Finance Officer',       lastActive: 'Yesterday',  active: true,  pending: false },
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Academic Coordinator', lastActive: 'Yesterday',  active: true,  pending: false },
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Academic Coordinator', lastActive: '---',        active: false, pending: true  },
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Academic Coordinator', lastActive: '2 days ago', active: true,  pending: false },
  { name: 'Abhay Thakur', email: 'rohit@mail.com', role: 'Physics',              lastActive: '2 days ago', active: true,  pending: false },
];

const SUB_STATS = [
  { label: 'Total Admins', value: '5' },
  { label: 'Active',       value: '4' },
  { label: 'Pending',      value: '1' },
  { label: 'Disabled',     value: '0' },
];

export default function InstitutionRoleManagement() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('role');
  const [search, setSearch] = useState('');
  const [admins, setAdmins] = useState(ADMINS);
  const [page, setPage] = useState(1);
  const totalPages = 10;

  function toggleAdmin(idx) {
    setAdmins(prev => prev.map((a, i) => i === idx ? { ...a, active: !a.active } : a));
  }

  const filteredAdmins = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="irl-page">
      <div className="irl-page-header">
        <h1 className="irl-page-title">Role Management</h1>
        <span className="irl-breadcrumb">
          Role Management &rsaquo; {tab === 'role' ? 'Role' : 'Sub Admin list'}
        </span>
      </div>

      {/* Tabs */}
      <div className="irl-tabs">
        <button className={`irl-tab${tab === 'role' ? ' active' : ''}`}
          onClick={() => setTab('role')}>Role</button>
        <button className={`irl-tab${tab === 'subadmin' ? ' active' : ''}`}
          onClick={() => setTab('subadmin')}>Sub Admin list</button>
      </div>

      <div className="irl-body">

        {/* ════ ROLE TAB ════ */}
        {tab === 'role' && (
          <>
            <div className="irl-toolbar">
              <h2 className="irl-section-title">Role</h2>
              <div className="irl-toolbar-right">
                <div className="irl-search-wrap">
                  <SearchIcon />
                  <input className="irl-search" placeholder="Search"
                    value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="irl-btn irl-btn--outline"><FilterIcon /> Filters</button>
                <button className="irl-btn irl-btn--primary"
                  onClick={() => navigate('/institution/dashboard/roles/create')}>
                  + Create Role
                </button>
              </div>
            </div>

            <div className="irl-role-grid">
              {ROLES.map((role, i) => (
                <div key={i} className="irl-role-card">
                  <div className="irl-role-icon"><CodeIcon /></div>
                  <h3 className="irl-role-name">{role.name}</h3>
                  <p className="irl-role-desc">{role.desc}</p>
                  <div className="irl-role-perms-row">
                    <div>
                      <div className="irl-perms-label">Permissions</div>
                      <div className="irl-perms-value">{role.perms}</div>
                    </div>
                    <button className="irl-view-perms-btn"
                      onClick={() => navigate('/institution/dashboard/roles/permissions')}>
                      View Permissions <ArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ════ SUB ADMIN LIST TAB ════ */}
        {tab === 'subadmin' && (
          <>
            {/* Stats */}
            <div className="irl-stats-row">
              {SUB_STATS.map(s => (
                <div key={s.label} className="irl-stat-card">
                  <div className="irl-stat-label">{s.label}</div>
                  <div className="irl-stat-value">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="irl-table-card">
              <div className="irl-toolbar">
                <h2 className="irl-section-title">Sub Admin list</h2>
                <div className="irl-toolbar-right">
                  <div className="irl-search-wrap">
                    <SearchIcon />
                    <input className="irl-search" placeholder="Search"
                      value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <button className="irl-btn irl-btn--outline"><FilterIcon /> Filters</button>
                  <button className="irl-btn irl-btn--primary"
                    onClick={() => navigate('/institution/dashboard/roles/create')}>
                    + Create Sub-Admin
                  </button>
                </div>
              </div>

              <div className="irl-table-wrap">
                <table className="irl-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Last Active</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((a, i) => (
                      <tr key={i}>
                        <td>
                          <div className="irl-name-cell">
                            <img src={profileImg} alt={a.name} className="irl-avatar" />
                            <span>{a.name}</span>
                          </div>
                        </td>
                        <td>{a.email}</td>
                        <td>{a.role}</td>
                        <td>{a.lastActive}</td>
                        <td>
                          {a.pending
                            ? <Toggle active={false} />
                            : <Toggle active={a.active} onChange={() => toggleAdmin(i)} />
                          }
                        </td>
                        <td>
                          {a.pending ? (
                            <button className="irl-resend-btn">Resend Invite</button>
                          ) : (
                            <div className="irl-actions">
                              <button className="irl-action-btn"><SunIcon /></button>
                              <button className="irl-action-btn"><EditIcon /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="irl-pagination">
                <button className="irl-page-btn--nav"
                  onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <PrevIcon /> Previous
                </button>
                <div className="irl-page-numbers">
                  {[1,2,3].map(n => <button key={n} className={`irl-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
                  <span className="irl-page-ellipsis">...</span>
                  {[8,9,10].map(n => <button key={n} className={`irl-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
                </div>
                <button className="irl-page-btn--nav"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  Next <NextIcon />
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
