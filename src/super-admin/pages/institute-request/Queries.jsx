import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './queries.css';

const TABS = ['Institute', 'Instructor', 'Student'];

/* ── Sample data ── */
const INSTITUTE_ROWS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: 'TechRise',
  contact: 'Abhay Thakur',
  email: 'admin@techuniversity.edu',
  phone: '+1 (555) 123-4567',
  date: '14 Jan 2026',
}));

const INSTRUCTOR_ROWS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: 'TechRise',
  contact: 'Abhay Thakur',
  email: 'admin@techuniversity.edu',
  phone: '+1 (555) 123-4567',
  date: '14 Jan 2026',
}));

const STUDENT_ROWS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: 'TechRise',
  contact: 'Abhay Thakur',
  email: 'admin@techuniversity.edu',
  phone: '+1 (555) 123-4567',
  date: '14 Jan 2026',
}));

const TOTAL_PAGES = 10;

/* ── Icons ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div className="qr-pagination">
      <button className="qr-page-prev"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}>
        ← Previous
      </button>
      <div className="qr-page-numbers">
        {[1, 2, 3].map(n => (
          <button key={n} className={`qr-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>{n}</button>
        ))}
        <span className="qr-page-ellipsis">...</span>
        {[8, 9, 10].map(n => (
          <button key={n} className={`qr-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>{n}</button>
        ))}
      </div>
      <button className="qr-page-next"
        onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
        disabled={currentPage === TOTAL_PAGES}>
        Next →
      </button>
    </div>
  );
}

/* ── Generic table ── */
function QueryTable({ rows, onView }) {
  return (
    <div className="qr-table-wrap">
      <table className="qr-table">
        <thead>
          <tr>
            <th>Institute Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map(row => (
            <tr key={row.id}>
              <td className="qr-td-name">{row.name}</td>
              <td>{row.contact}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.date}</td>
              <td>
                <button className="qr-action-btn" title="View"
                  onClick={() => onView(row.id)}>
                  <EyeIcon />
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={6} className="qr-empty">No records found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function Queries() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('Institute');
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSearch('');
    setCurrentPage(1);
  }

  function filterRows(rows) {
    const q = search.toLowerCase();
    return rows.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.contact.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  }

  const breadcrumbSub = activeTab;

  return (
    <div className="qr-page">

      {/* ── Page header ── */}
      <div className="qr-page-header">
        <h1 className="qr-page-title">Queries</h1>
        <span className="qr-breadcrumb">Queries &rsaquo; {breadcrumbSub}</span>
      </div>

      {/* ── Tabs ── */}
      <div className="qr-tabs">
        {TABS.map(tab => (
          <button key={tab} role="tab" aria-selected={activeTab === tab}
            className={`qr-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => handleTabChange(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="qr-body">
        <div className="qr-table-card">

          {/* Toolbar */}
          <div className="qr-toolbar">
            <h2 className="qr-section-title">Registration Inquiries</h2>
            <div className="qr-toolbar-actions">
              <div className="qr-search">
                <SearchIcon />
                <input type="text" placeholder="Search" className="qr-search-input"
                  value={search} onChange={e => setSearch(e.target.value)} aria-label="Search"/>
              </div>
              <button className="qr-filter-btn"><FilterIcon /> Filters</button>
            </div>
          </div>

          {/* Table */}
          {activeTab === 'Institute' && (
            <QueryTable
              rows={filterRows(INSTITUTE_ROWS)}
              onView={id => navigate(`/dashboard/institute-request/${id}`)}
            />
          )}
          {activeTab === 'Instructor' && (
            <QueryTable
              rows={filterRows(INSTRUCTOR_ROWS)}
              onView={id => navigate(`/dashboard/institute-request/instructor/${id}`)}
            />
          )}
          {activeTab === 'Student' && (
            <QueryTable
              rows={filterRows(STUDENT_ROWS)}
              onView={id => navigate(`/dashboard/institute-request/student/${id}`)}
            />
          )}

          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
      </div>
    </div>
  );
}
