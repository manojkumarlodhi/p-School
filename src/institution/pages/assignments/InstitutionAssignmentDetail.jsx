import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionassignments.css';
import profileImg from '../../../assets/images/profile.png';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const FilterIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const SunIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);

const ATTACHMENTS = ['BST_Template.zip', 'BST_Template.zip'];

const SUBMISSIONS = [
  { name: 'Abhay Thakur', submitted: '2024-01-24 10:30 AM', type: 'file', marks: 95, status: 'Submitted' },
  { name: 'Abhay Thakur', submitted: '2024-01-24 10:30 AM', type: 'file', marks: 95, status: 'Late' },
  { name: 'Abhay Thakur', submitted: '2024-01-24 10:30 AM', type: 'file', marks: 95, status: 'Pending' },
];

const SUB_STATS = [
  { label: 'Total Students', value: '32' },
  { label: 'Submitted',      value: '28' },
  { label: 'Late',           value: '2'  },
  { label: 'Pending',        value: '2'  },
  { label: 'Due Date',       value: '2024-01-25' },
];

export default function InstitutionAssignmentDetail() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="iasn-page">
      <div className="iasn-page-header">
        <button className="iasn-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Assignment Details</span>
        </button>
        <span className="iasn-breadcrumb">Assignments &rsaquo; Assignments Details</span>
      </div>

      <div className="iasn-body">
        <div className="iasn-detail-card">

          {/* Title */}
          <h2 className="iasn-detail-title">Data Structures - Binary Search Trees</h2>
          <p className="iasn-detail-subject">Computer Science</p>

          {/* Meta row */}
          <div className="iasn-meta-row">
            {[
              { label: 'Class',       value: 'Grade 10 - A' },
              { label: 'Subject',     value: 'Computer Science' },
              { label: 'Instructor',  value: 'Ms. Sharma' },
              { label: 'Assigned',    value: '2024-01-10' },
              { label: 'Due Date',    value: '2024-01-25' },
              { label: 'Total Marks', value: '100' },
            ].map(m => (
              <div key={m.label} className="iasn-meta-item">
                <div className="iasn-meta-label">{m.label}</div>
                <div className="iasn-meta-value">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="iasn-detail-tabs">
            <button className={`iasn-detail-tab${tab==='overview'?' active':''}`} onClick={() => setTab('overview')}>Overview</button>
            <button className={`iasn-detail-tab${tab==='submission'?' active':''}`} onClick={() => setTab('submission')}>Submission</button>
          </div>

          {/* ── OVERVIEW TAB ── */}
          {tab === 'overview' && (
            <div className="iasn-overview">
              <h3 className="iasn-section-title">Description</h3>
              <p className="iasn-description">
                Students must implement a complete Binary Search Tree with insert, delete, and search operations.
                The implementation should support in-order, pre-order, and post-order traversals.
              </p>

              <h3 className="iasn-section-title">Attachments</h3>
              <div className="iasn-attachments">
                {ATTACHMENTS.map((f, i) => (
                  <div key={i} className="iasn-attachment-row">
                    <div className="iasn-attachment-left">
                      <FileIcon />
                      <span className="iasn-attachment-name">{f}</span>
                    </div>
                    <button className="iasn-download-btn" aria-label="Download">
                      <DownloadIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SUBMISSION TAB ── */}
          {tab === 'submission' && (
            <div className="iasn-submission">
              {/* Stats */}
              <div className="iasn-sub-stats">
                {SUB_STATS.map(s => (
                  <div key={s.label} className="iasn-sub-stat-card">
                    <div className="iasn-sub-stat-label">{s.label}</div>
                    <div className="iasn-sub-stat-value">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="iasn-toolbar" style={{ marginTop: 20 }}>
                <h3 className="iasn-table-title">Assignments</h3>
                <div className="iasn-toolbar-right">
                  <div className="iasn-search-wrap">
                    <SearchIcon />
                    <input className="iasn-search" placeholder="Search"
                      value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <button className="iasn-btn iasn-btn--outline"><FilterIcon /> Filters</button>
                </div>
              </div>

              <div className="iasn-table-wrap">
                <table className="iasn-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Submitted</th>
                      <th>Type</th>
                      <th>Marks</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBMISSIONS.map((s, i) => (
                      <tr key={i}>
                        <td>
                          <div className="iasn-name-cell">
                            <img src={profileImg} alt={s.name} className="iasn-avatar" />
                            <span>{s.name}</span>
                          </div>
                        </td>
                        <td>{s.submitted}</td>
                        <td>{s.type}</td>
                        <td>{s.marks}</td>
                        <td>
                          <span className={`iasn-status iasn-status--${s.status.toLowerCase()}`}>
                            {s.status}
                          </span>
                        </td>
                        <td>
                          <button className="iasn-action-btn"
                            onClick={() => navigate('/institution/dashboard/assignments/submission')}>
                            <SunIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="iasn-pagination">
                <button className="iasn-page-btn--nav" onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}><PrevIcon /> Previous</button>
                <div className="iasn-page-numbers">
                  {[1,2,3].map(n=><button key={n} className={`iasn-page-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>)}
                  <span className="iasn-page-ellipsis">...</span>
                  {[8,9,10].map(n=><button key={n} className={`iasn-page-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>)}
                </div>
                <button className="iasn-page-btn--nav" onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}>Next <NextIcon /></button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
