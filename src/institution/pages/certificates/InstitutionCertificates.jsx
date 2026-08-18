import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioncertificates.css';
import profileImg from '../../../assets/images/profile.png';
import logoImg from '../../../assets/images/logo.jpg';

/* ── Icons ── */
const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const FilterIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const SunIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);

/* ── Shared data ── */
const CERT_ROWS = Array.from({ length: 9 }, (_, i) => ({
  id: 'STU001',
  name: 'Abhay Thakur',
  role: ['Child', 'Student', 'Adult', 'Student', 'Student', 'Student', 'Student', 'Student', 'Student'][i],
  institution: i === 2 ? 'Self Enroll' : 'Tech Academy Accra',
  ageGroup: ['10-14', '15-18', '25-34', '15-18', '15-18', '15-18', '15-18', '15-18', '15-18'][i],
  issuedOn: '12 Aug 2025',
  status: i % 2 === 0 ? 'Active' : 'Revoked',
}));

const REQ_ROWS = Array.from({ length: 9 }, (_, i) => ({
  id: 'STU001',
  name: 'Abhay Thakur',
  role: ['Child', 'Student', 'Adult', 'Student', 'Student', 'Student', 'Student', 'Student', 'Student'][i],
  institution: i === 2 ? 'Self Enroll' : 'Tech Academy Accra',
  ageGroup: ['10-14', '15-18', '25-34', '15-18', '15-18', '15-18', '15-18', '15-18', '15-18'][i],
  completionDate: '12 Aug 2025',
  requestedOn: '12 Aug 2025',
}));

/* ── Pagination ── */
function Pagination({ page, setPage, total = 10 }) {
  return (
    <div className="icrt-pagination">
      <button className="icrt-page-btn--nav" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
        <PrevIcon /> Previous
      </button>
      <div className="icrt-page-numbers">
        {[1,2,3].map(n => <button key={n} className={`icrt-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
        <span className="icrt-page-ellipsis">...</span>
        {[8,9,10].map(n => <button key={n} className={`icrt-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
      </div>
      <button className="icrt-page-btn--nav" onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total}>
        Next <NextIcon />
      </button>
    </div>
  );
}

/* ── Tab 1: Certificate ── */
function CertificateTab() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = CERT_ROWS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="icrt-table-card">
      <div className="icrt-toolbar">
        <h2 className="icrt-table-title">Issued Certificate List</h2>
        <div className="icrt-toolbar-right">
          <div className="icrt-search-wrap"><SearchIcon /><input className="icrt-search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="icrt-btn icrt-btn--outline"><FilterIcon /> Filters</button>
        </div>
      </div>
      <div className="icrt-table-wrap">
        <table className="icrt-table">
          <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Institution</th><th>Age Group</th><th>Issued On</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td className="icrt-td-id">{r.id}</td>
                <td><div className="icrt-name-cell"><img src={profileImg} alt={r.name} className="icrt-avatar" /><span>{r.name}</span></div></td>
                <td>{r.role}</td>
                <td>{r.institution}</td>
                <td>{r.ageGroup}</td>
                <td>{r.issuedOn}</td>
                <td><span className={`icrt-status icrt-status--${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td>
                  <div className="icrt-actions">
                    <button className="icrt-action-btn"><SunIcon /></button>
                    {r.status === 'Active'
                      ? <button className="icrt-text-btn icrt-text-btn--red">Revoke</button>
                      : <button className="icrt-text-btn icrt-text-btn--green">Reissue</button>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

/* ── Tab 2: Certificate Request ── */
function CertificateRequestTab() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = REQ_ROWS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="icrt-table-card">
      <div className="icrt-toolbar">
        <h2 className="icrt-table-title">Student List</h2>
        <div className="icrt-toolbar-right">
          <div className="icrt-search-wrap"><SearchIcon /><input className="icrt-search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="icrt-btn icrt-btn--outline"><FilterIcon /> Filters</button>
        </div>
      </div>
      <div className="icrt-table-wrap">
        <table className="icrt-table">
          <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Institution</th><th>Age Group</th><th>Completion Date</th><th>Requested On</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td className="icrt-td-id">{r.id}</td>
                <td><div className="icrt-name-cell"><img src={profileImg} alt={r.name} className="icrt-avatar" /><span>{r.name}</span></div></td>
                <td>{r.role}</td>
                <td>{r.institution}</td>
                <td>{r.ageGroup}</td>
                <td>{r.completionDate}</td>
                <td>{r.requestedOn}</td>
                <td>
                  <div className="icrt-actions">
                    <button className="icrt-action-btn"><SunIcon /></button>
                    <button className="icrt-text-btn icrt-text-btn--red">Revoke</button>
                    <button className="icrt-text-btn icrt-text-btn--green">Approve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

/* ── Tab 3: Certificate Template ── */
function CertificateTemplateTab() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className="icrt-toolbar" style={{ marginBottom: 16 }}>
        <h2 className="icrt-table-title">Template</h2>
        <div className="icrt-toolbar-right">
          <div className="icrt-search-wrap"><SearchIcon /><input className="icrt-search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="icrt-btn icrt-btn--outline"><FilterIcon /> Filters</button>
          <button className="icrt-btn icrt-btn--primary">+ Add New Template</button>
        </div>
      </div>

      {/* Certificate preview */}
      <div className="icrt-template-preview">
        <div className="icrt-cert">
          {/* Decorative shapes */}
          <div className="icrt-cert-deco icrt-cert-deco--tl" />
          <div className="icrt-cert-deco icrt-cert-deco--tr" />
          <div className="icrt-cert-deco icrt-cert-deco--bl" />
          <div className="icrt-cert-deco icrt-cert-deco--br" />
          <div className="icrt-cert-hex icrt-cert-hex--left" />
          <div className="icrt-cert-hex icrt-cert-hex--right" />

          {/* Content */}
          <div className="icrt-cert-content">
            <img src={logoImg} alt="Pschool" className="icrt-cert-logo" />
            <h1 className="icrt-cert-heading">CERTIFICATE</h1>
            <h2 className="icrt-cert-subheading">Of Achievement</h2>
            <p className="icrt-cert-presented">This Certificate is Proudly Presented to</p>
            <p className="icrt-cert-name">Aditya Dale</p>
            <p className="icrt-cert-body">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
            </p>
            <div className="icrt-cert-footer">
              <div className="icrt-cert-footer-item">
                <div className="icrt-cert-footer-line" />
                <span>date</span>
              </div>
              <div className="icrt-cert-footer-arch" />
              <div className="icrt-cert-footer-item">
                <div className="icrt-cert-footer-line" />
                <span>signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function InstitutionCertificates() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('certificate');

  const breadcrumb = tab === 'certificate'
    ? 'Certificate \u203a Course List'
    : tab === 'request'
    ? 'Course Management \u203a Course List'
    : 'Course Management \u203a Course List';

  return (
    <div className="icrt-page">
      <div className="icrt-page-header">
        <h1 className="icrt-page-title">Certificates</h1>
        <span className="icrt-breadcrumb">{breadcrumb}</span>
      </div>

      {/* Tabs */}
      <div className="icrt-tabs">
        <button className={`icrt-tab${tab === 'certificate' ? ' active' : ''}`} onClick={() => setTab('certificate')}>Certificate</button>
        <button className={`icrt-tab${tab === 'request' ? ' active' : ''}`} onClick={() => setTab('request')}>Certificate Request</button>
        <button className={`icrt-tab${tab === 'template' ? ' active' : ''}`} onClick={() => setTab('template')}>Certificate Template</button>
      </div>

      <div className="icrt-body">
        {tab === 'certificate' && <CertificateTab />}
        {tab === 'request'     && <CertificateRequestTab />}
        {tab === 'template'    && <CertificateTemplateTab />}
      </div>
    </div>
  );
}
