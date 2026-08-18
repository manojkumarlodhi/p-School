import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './notificationscenter.css';

/* ── Table data ── */
const ROWS = [
  { id: 1, title: 'TechRise', audience: 'All Institutions',   type: 'Announcement', status: 'Scheduled', date: '14 Jan 2026' },
  { id: 2, title: 'TechRise', audience: 'Institution Admins', type: 'Neha Sharma',  status: 'Draft',      date: '14 Jan 2026' },
  { id: 3, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 4, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 5, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 6, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 7, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 8, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
  { id: 9, title: 'TechRise', audience: 'All Institutions',   type: 'Neha Sharma',  status: 'Sent',       date: '14 Jan 2026' },
];

const TOTAL_PAGES = 10;

/* ── Status badge ── */
function StatusBadge({ status }) {
  const cls =
    status === 'Scheduled' ? 'nc-badge nc-badge--scheduled' :
    status === 'Draft'     ? 'nc-badge nc-badge--draft'     :
    status === 'Sent'      ? 'nc-badge nc-badge--sent'      :
                             'nc-badge';
  return <span className={cls}>{status}</span>;
}

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
    </svg>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div className="nc-pagination">
      <button className="nc-page-prev"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}>← Previous</button>
      <div className="nc-page-numbers">
        {[1, 2, 3].map(n => (
          <button key={n} className={`nc-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>{n}</button>
        ))}
        <span className="nc-page-ellipsis">...</span>
        {[8, 9, 10].map(n => (
          <button key={n} className={`nc-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>{n}</button>
        ))}
      </div>
      <button className="nc-page-next"
        onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
        disabled={currentPage === TOTAL_PAGES}>Next →</button>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ROWS.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.audience.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nc-page">

      {/* ── Page header ── */}
      <div className="nc-page-header">
        <h1 className="nc-page-title">Notifications Center</h1>
        <span className="nc-breadcrumb">Notifications Center</span>
      </div>

      {/* ── Body ── */}
      <div className="nc-body">
        <div className="nc-table-card">

          {/* Toolbar */}
          <div className="nc-toolbar">
            <h2 className="nc-section-title">Pending Approvals</h2>
            <div className="nc-toolbar-actions">
              <div className="nc-search">
                <SearchIcon />
                <input type="text" placeholder="Search" className="nc-search-input"
                  value={search} onChange={e => setSearch(e.target.value)} aria-label="Search"/>
              </div>
              <button className="nc-filter-btn"><FilterIcon /> Filters</button>
              <button className="nc-create-btn"
                onClick={() => navigate('/dashboard/notification/create')}>
                + Create Notification
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="nc-table-wrap">
            <table className="nc-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Audience</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map(row => (
                  <tr key={row.id}>
                    <td className="nc-td-title">{row.title}</td>
                    <td>{row.audience}</td>
                    <td>{row.type}</td>
                    <td><StatusBadge status={row.status}/></td>
                    <td>{row.date}</td>
                    <td>
                      <div className="nc-action-btns">
                        <button className="nc-action-btn nc-action-btn--view" title="View">
                          <EyeIcon/>
                        </button>
                        <button className="nc-action-btn nc-action-btn--edit" title="Edit">
                          <EditIcon/>
                        </button>
                        <button className="nc-action-btn nc-action-btn--delete" title="Delete">
                          <DeleteIcon/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="nc-empty">No notifications found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
      </div>
    </div>
  );
}
