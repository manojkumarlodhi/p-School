import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioninstructors.css';
import profileImg from '../../../assets/images/profile.png';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
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
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const DownloadIconBlue = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Documents data ── */
const DOCUMENTS = [
  { name: 'Business License',        status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { name: 'Tax Registration',        status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { name: 'Accreditation Certificate', status: 'Pending', date: '2026-01-25', size: '3.2 MB' },
  { name: 'Identity Proof (Admin)',   status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

/* ── Document View Modal ── */
function DocumentModal({ doc, onClose }) {
  if (!doc) return null;
  return (
    <div className="iinst-modal-overlay" onClick={onClose}>
      <div className="iinst-modal" onClick={e => e.stopPropagation()}>
        <div className="iinst-modal-header">
          <h3 className="iinst-modal-title">Document View</h3>
          <button className="iinst-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="iinst-modal-body">
          <div className="iinst-modal-doc-header">
            <span className="iinst-modal-doc-name">{doc.name}</span>
            <button className="iinst-modal-download" aria-label="Download">
              <DownloadIconBlue />
            </button>
          </div>
          <div className="iinst-modal-img-wrap">
            {/* Placeholder document image */}
            <div className="iinst-modal-doc-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none"
                stroke="#d1d5db" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <p className="iinst-modal-doc-hint">{doc.name}</p>
              <p className="iinst-modal-doc-size">{doc.size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle ── */
function Toggle({ active }) {
  return (
    <button className={`iinst-toggle${active ? ' iinst-toggle--on' : ''}`} type="button">
      <span className="iinst-toggle-thumb" />
    </button>
  );
}

export default function InstitutionInstructorDetail() {
  const navigate = useNavigate();
  const [viewDoc, setViewDoc] = useState(null);

  return (
    <div className="iinst-page">

      <div className="iinst-page-header">
        <button className="iinst-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Institutions Instructor Details</span>
        </button>
        <span className="iinst-breadcrumb">
          User Management &rsaquo; Instructors &rsaquo; Instructors Details
        </span>
      </div>

      <div className="iinst-body">
        <div className="iinst-detail-card">

          {/* ── Profile header ── */}
          <div className="iinst-profile-header">
            <div className="iinst-profile-left">
              <img src={profileImg} alt="Dr. Kwame Mensah" className="iinst-profile-avatar" />
              <div>
                <h2 className="iinst-profile-name">Dr. Kwame Mensah</h2>
                <p className="iinst-profile-role">Professional</p>
              </div>
            </div>
            <span className="iinst-verified-badge">Verified</span>
          </div>

          {/* ── Info grid ── */}
          <div className="iinst-info-grid">
            <div className="iinst-info-item">
              <div className="iinst-info-label">Mobile</div>
              <div className="iinst-info-value">+91 6416845451</div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">Email</div>
              <div className="iinst-info-value">Abhay@gmail.com</div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">Country</div>
              <div className="iinst-info-value">India</div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">Subject</div>
              <div className="iinst-info-value">Coding</div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">Status</div>
              <div className="iinst-info-value"><Toggle active={true} /></div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">Avg Rating</div>
              <div className="iinst-info-value iinst-rating">
                <StarIcon /> 5.0
              </div>
            </div>
            <div className="iinst-info-item iinst-info-item--wide">
              <div className="iinst-info-label">Address</div>
              <div className="iinst-info-value">123 Education Street, Boston, MA 02115</div>
            </div>
          </div>

          {/* ── Bank details ── */}
          <div className="iinst-section-title">Bank Details</div>
          <div className="iinst-bank-grid">
            <div className="iinst-info-item">
              <div className="iinst-info-label">Bank Account</div>
              <div className="iinst-info-value">****4321</div>
            </div>
            <div className="iinst-info-item">
              <div className="iinst-info-label">IFSC</div>
              <div className="iinst-info-value">HDFC0001234</div>
            </div>
          </div>

          {/* ── Stats cards ── */}
          <div className="iinst-stat-cards">
            <div className="iinst-stat-card iinst-stat-card--blue">
              <div className="iinst-stat-label">Classes</div>
              <div className="iinst-stat-value">8</div>
              <button className="iinst-stat-arrow iinst-stat-arrow--blue">
                <ArrowIcon />
              </button>
            </div>
            <div className="iinst-stat-card iinst-stat-card--green">
              <div className="iinst-stat-label">Salary</div>
              <div className="iinst-stat-value iinst-stat-value--green">120K FCFA</div>
              <button className="iinst-stat-arrow iinst-stat-arrow--green">
                <ArrowIcon />
              </button>
            </div>
          </div>

          {/* ── Submitted Documents ── */}
          <div className="iinst-section-title" style={{ marginTop: 24 }}>
            Submitted Documents
          </div>
          <div className="iinst-docs-table-wrap">
            <table className="iinst-docs-table">
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
                    <td>
                      <span className={`iinst-doc-status iinst-doc-status--${doc.status.toLowerCase()}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.date}</td>
                    <td>{doc.size}</td>
                    <td>
                      <div className="iinst-actions">
                        <button className="iinst-action-btn" aria-label="View"
                          onClick={() => setViewDoc(doc)}>
                          <SunIcon />
                        </button>
                        <button className="iinst-action-btn" aria-label="Download">
                          <DownloadIcon />
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

      {/* Document View Modal */}
      {viewDoc && <DocumentModal doc={viewDoc} onClose={() => setViewDoc(null)} />}

    </div>
  );
}
