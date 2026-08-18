import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import starwoodLogo from '../../../../assets/images/starwoodAcadmey.png';
import DocumentViewModal from '../instructor/DocumentViewModal';
import './institutiondetail.css';

const DOCUMENTS = [
  { name: 'Business License',          status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { name: 'Tax Registration',          status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { name: 'Accreditation Certificate', status: 'Pending',  date: '2026-01-25', size: '3.2 MB' },
  { name: 'Identity Proof (Admin)',     status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

const SEAT_USED  = 412;
const SEAT_TOTAL = 500;
const SEAT_PCT   = Math.round((SEAT_USED / SEAT_TOTAL) * 100); // 82%

function DocBadge({ status }) {
  return (
    <span className={`instdet-doc-badge instdet-doc-badge--${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

export default function InstitutionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewDoc, setViewDoc] = useState(null);

  return (
    <div className="instdet-page">

      {/* ── Page header ── */}
      <div className="instdet-page-header">
        <div className="instdet-header-left">
          <button className="instdet-back-btn"
            onClick={() => navigate('/dashboard/institutions')} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="instdet-page-title">Institutions Details</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="instdet-dashboard-btn"
            onClick={() => navigate('/institution/dashboard')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1ba8d5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Go to Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className="instdet-breadcrumb">
            User Management &rsaquo; Institutions &rsaquo; Institutions Details
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="instdet-body">
        <div className="instdet-card">

          {/* ── Profile row ── */}
          <div className="instdet-profile-row">
            <img src={starwoodLogo} alt="Starwood Academy" className="instdet-logo" />
            <div className="instdet-profile-info">
              <h2 className="instdet-name">Starwood Academy</h2>
              <p className="instdet-sub">Training Center</p>
            </div>
            <span className="instdet-verified-badge">Verified</span>
          </div>

          {/* ── Info grid ── */}
          <div className="instdet-info-grid">
            <div className="instdet-info-item">
              <div className="instdet-info-label">Email</div>
              <div className="instdet-info-value">admin@techuniversity.edu</div>
            </div>
            <div className="instdet-info-item">
              <div className="instdet-info-label">Contact Person</div>
              <div className="instdet-info-value">Abhay Thakur</div>
            </div>
            <div className="instdet-info-item">
              <div className="instdet-info-label">Phone</div>
              <div className="instdet-info-value">+1 (555) 123-4567</div>
            </div>
            <div className="instdet-info-item">
              <div className="instdet-info-label">Submitted Date</div>
              <div className="instdet-info-value">2026-01-25</div>
            </div>
          </div>

          {/* Address */}
          <div className="instdet-info-item" style={{ marginBottom: 24 }}>
            <div className="instdet-info-label">Address</div>
            <div className="instdet-info-value">123 Education Street, Boston, MA 02115</div>
          </div>

          {/* ── Seat Usage ── */}
          <div className="instdet-seat-section">
            <div className="instdet-seat-header">
              <span className="instdet-seat-title">Seat Usage</span>
              <span className="instdet-seat-count">{SEAT_USED} of {SEAT_TOTAL} seats in use</span>
            </div>
            <div className="instdet-progress-track">
              <div
                className="instdet-progress-fill"
                style={{ width: `${SEAT_PCT}%` }}
              />
            </div>
            {/* Alert */}
            <div className="instdet-seat-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#d97706" strokeWidth={2} strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Alert at 80% &amp; 90% capacity — currently {SEAT_PCT}%</span>
            </div>
          </div>

          {/* ── Stats cards ── */}
          <div className="instdet-stats-row">
            <div className="instdet-stat-card instdet-stat-card--blue">
              <div className="instdet-stat-label">Total Students</div>
              <div className="instdet-stat-value">400</div>
              <button className="instdet-stat-arrow instdet-stat-arrow--blue"
                aria-label="View students"
                onClick={() => navigate(`/dashboard/institutions/${id}/students`)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="instdet-stat-card instdet-stat-card--blue">
              <div className="instdet-stat-label">Total Instructors</div>
              <div className="instdet-stat-value">30</div>
              <button className="instdet-stat-arrow instdet-stat-arrow--blue"
                aria-label="View instructors"
                onClick={() => navigate(`/dashboard/institutions/${id}/instructors`)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="instdet-stat-card instdet-stat-card--blue">
              <div className="instdet-stat-label">Sub-Admins</div>
              <div className="instdet-stat-value">5</div>
              <button className="instdet-stat-arrow instdet-stat-arrow--blue" aria-label="View sub-admins">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="instdet-stat-card instdet-stat-card--yellow">
              <div className="instdet-stat-label">Current plan</div>
              <div className="instdet-stat-value">Monthly</div>
              <button className="instdet-stat-arrow instdet-stat-arrow--yellow" aria-label="View plan">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Submitted Documents ── */}
          <div className="instdet-docs-section">
            <h3 className="instdet-docs-title">Submitted Documents</h3>
            <div className="instdet-docs-table-wrap">
              <table className="instdet-docs-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Status</th>
                    <th>Uploaded Date</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCUMENTS.map((doc, i) => (
                    <tr key={i}>
                      <td>{doc.name}</td>
                      <td><DocBadge status={doc.status} /></td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <div className="instdet-doc-actions">
                          {/* Eye — view document */}
                          <button className="instdet-doc-btn" aria-label="View document"
                            onClick={() => setViewDoc(doc)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          {/* Download */}
                          <button className="instdet-doc-btn" aria-label="Download">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Document View Modal */}
      {viewDoc && (
        <DocumentViewModal doc={viewDoc} onClose={() => setViewDoc(null)} />
      )}
    </div>
  );
}
