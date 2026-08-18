import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RejectModal from './modals/RejectModal';
import './verificationrequest.css';

/* ── Tabs ── */
const TABS = ['Institute', 'Instructor', 'Student'];

/* ── Institute data ── */
const INSTITUTE_DATA = [
  { id: 1,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Pending Verification', email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 2,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Send Contract',         email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 3,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Received Contract',     email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 4,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Reject',                email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 5,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Active',                email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 6,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Send Contract',         email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 7,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Send Contract',         email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 8,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Send Contract',         email: 'aisha@techrise.edu', phone: '+226 789 234' },
  { id: 9,  name: 'TechRise', contact: 'Aisha Kamara', status: 'Submitted',             email: 'aisha@techrise.edu', phone: '+226 789 234' },
];

/* ── Instructor data ── */
const INSTRUCTOR_DATA = [
  { id: 1,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Coding',      experience: '5 years', date: '28 Feb 2026', docStatus: 'Reject' },
  { id: 2,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Interview Scheduled' },
  { id: 3,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Robotic',     experience: '5 years', date: '28 Feb 2026', docStatus: 'Approved' },
  { id: 4,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Pending Review' },
  { id: 5,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Submitted' },
  { id: 6,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Submitted' },
  { id: 7,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Submitted' },
  { id: 8,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Submitted' },
  { id: 9,  name: 'TechRise', email: 'aisha@techrise.edu', subject: 'Electronic',  experience: '5 years', date: '28 Feb 2026', docStatus: 'Submitted' },
];

const TOTAL_PAGES = 10;

/* ── Institute status badge ── */
function InstStatusBadge({ status }) {
  const map = {
    'Pending Verification': 'vr-badge-pending',
    'Send Contract':        'vr-badge-send-contract',
    'Received Contract':    'vr-badge-received-contract',
    'Reject':               'vr-badge-reject',
    'Active':               'vr-badge-active',
    'Submitted':            'vr-badge-submitted',
  };
  return <span className={`vr-badge ${map[status] || ''}`}>{status}</span>;
}

/* ── Instructor doc status badge ── */
function InstrDocBadge({ status }) {
  const map = {
    'Reject':               'vr-badge-reject',
    'Interview Scheduled':  'vr-badge-interview',
    'Approved':             'vr-badge-active',
    'Pending Review':       'vr-badge-pending-review',
    'Submitted':            'vr-badge-submitted',
  };
  return <span className={`vr-badge ${map[status] || ''}`}>{status}</span>;
}

/* ── Eye icon ── */
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Search icon ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

/* ── Filter icon ── */
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div className="vr-pagination" role="navigation" aria-label="Pagination">
      <button
        className="vr-page-prev"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <div className="vr-page-numbers">
        {[1, 2, 3].map((n) => (
          <button key={n}
            className={`vr-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}
            aria-label={`Page ${n}`}
            aria-current={currentPage === n ? 'page' : undefined}
          >{n}</button>
        ))}
        <span className="vr-page-ellipsis" aria-hidden="true">...</span>
        {[8, 9, 10].map((n) => (
          <button key={n}
            className={`vr-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}
            aria-label={`Page ${n}`}
            aria-current={currentPage === n ? 'page' : undefined}
          >{n}</button>
        ))}
      </div>
      <button
        className="vr-page-next"
        onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
        disabled={currentPage === TOTAL_PAGES}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function VerificationRequest() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('Institute');
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null); // row being rejected

  /* ── Institute filter ── */
  const filteredInstitute = INSTITUTE_DATA.filter((row) => {
    const q = search.toLowerCase();
    return (
      row.name.toLowerCase().includes(q)    ||
      row.contact.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q)   ||
      row.phone.toLowerCase().includes(q)   ||
      row.status.toLowerCase().includes(q)
    );
  });

  /* ── Instructor filter ── */
  const filteredInstructor = INSTRUCTOR_DATA.filter((row) => {
    const q = search.toLowerCase();
    return (
      row.name.toLowerCase().includes(q)       ||
      row.email.toLowerCase().includes(q)      ||
      row.subject.toLowerCase().includes(q)    ||
      row.docStatus.toLowerCase().includes(q)
    );
  });

  /* Reset search when tab changes */
  function handleTabChange(tab) {
    setActiveTab(tab);
    setSearch('');
    setCurrentPage(1);
  }

  return (
    <div className="vr-page">

      {/* ── Page header ── */}
      <div className="vr-page-header">
        <h1 className="vr-page-title">Verification Request</h1>
        <span className="vr-breadcrumb">Verification Request</span>
      </div>

      {/* ── Tabs ── */}
      <div className="vr-tabs" role="tablist" aria-label="Verification request tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`vr-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="vr-body">

        {/* Toolbar */}
        <div className="vr-toolbar">
          <h2 className="vr-section-title">
            {activeTab === 'Institute'   && 'Institute Pending Approvals (12)'}
            {activeTab === 'Instructor'  && 'Instructor Pending Approvals (12)'}
            {activeTab === 'Student'     && 'Student Pending Approvals (12)'}
          </h2>
          <div className="vr-toolbar-actions">
            <div className="vr-search">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="vr-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search"
              />
            </div>
            <button className="vr-filter-btn" aria-label="Open filters">
              <FilterIcon />
              Filters
            </button>
          </div>
        </div>

        {/* ── Institute tab ── */}
        {activeTab === 'Institute' && (
          <div className="vr-table-card">
            <div className="vr-table-wrapper">
              <table className="vr-table" aria-label="Institute pending approvals">
                <thead>
                  <tr>
                    <th>Institute Name</th>
                    <th>Contact Person</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstitute.length > 0 ? (
                    filteredInstitute.map((row) => (
                      <tr key={row.id}>
                        <td className="vr-td-name">{row.name}</td>
                        <td>{row.contact}</td>
                        <td><InstStatusBadge status={row.status} /></td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>
                          <button
                            className="vr-action-btn"
                            title="View"
                            aria-label={`View ${row.name}`}
                            onClick={() => navigate(`/dashboard/verification/${row.id}`)}
                          >
                            <EyeIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={6} className="vr-empty">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* ── Instructor tab ── */}
        {activeTab === 'Instructor' && (
          <div className="vr-table-card">
            <div className="vr-table-wrapper">
              <table className="vr-table" aria-label="Instructor pending approvals">
                <thead>
                  <tr>
                    <th>Institute Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Experience</th>
                    <th>Application Date</th>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstructor.length > 0 ? (
                    filteredInstructor.map((row) => (
                      <tr key={row.id}>
                        <td className="vr-td-name">{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.subject}</td>
                        <td>{row.experience}</td>
                        <td>{row.date}</td>
                        <td><InstrDocBadge status={row.docStatus} /></td>
                        <td>
                          <button
                            className="vr-action-btn"
                            title="View"
                            aria-label={`View ${row.name}`}
                            onClick={() => navigate(`/dashboard/verification/instructor/${row.id}`)}
                          >
                            <EyeIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="vr-empty">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* ── Student tab ── */}
        {activeTab === 'Student' && (
          <div className="vr-table-card">
            <div className="vr-table-wrapper">
              <table className="vr-table" aria-label="Student pending approvals">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="vr-empty">No student records found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ── Reject modal ── */}
      {rejectTarget && (
        <RejectModal
          onClose={() => setRejectTarget(null)}
          onConfirm={({ reasons, notes }) => {
            console.log('Rejected:', rejectTarget, reasons, notes);
            setRejectTarget(null);
          }}
        />
      )}

    </div>
  );
}
