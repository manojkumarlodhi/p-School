import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../../../assets/images/profile.png';
import DocumentViewModal from './DocumentViewModal';
import './instructordetail.css';

const DOCUMENTS = [
  { name: 'Business License',        status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { name: 'Tax Registration',        status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { name: 'Accreditation Certificate',status: 'Pending', date: '2026-01-25', size: '3.2 MB' },
  { name: 'Identity Proof (Admin)',   status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

function StatusBadge({ status }) {
  return (
    <span className={`idet-doc-badge idet-doc-badge--${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

export default function InstructorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewDoc, setViewDoc] = useState(null);

  return (
    <div className="idet-page">

      {/* ── Page header ── */}
      <div className="idet-page-header">
        <div className="idet-header-left">
          <button className="idet-back-btn" onClick={() => navigate('/dashboard/instructors')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="idet-page-title">Institutions Instructor Details</h1>
        </div>
        <span className="idet-breadcrumb">
          User Management &rsaquo; Instructors &rsaquo; Instructors Details
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="idet-body">
        <div className="idet-card">

          {/* ── Profile row ── */}
          <div className="idet-profile-row">
            <img src={profileImg} alt="Dr. Kwame Mensah" className="idet-avatar" />
            <div className="idet-profile-info">
              <h2 className="idet-name">Dr. Kwame Mensah</h2>
              <p className="idet-role">Professional</p>
            </div>
            <span className="idet-verified-badge">Verified</span>
          </div>

          <div className="idet-divider" />

          {/* ── Info grid row 1 ── */}
          <div className="idet-info-grid">
            <div className="idet-info-item">
              <div className="idet-info-label">Mobile</div>
              <div className="idet-info-value">+91 6416845451</div>
            </div>
            <div className="idet-info-item">
              <div className="idet-info-label">Email</div>
              <div className="idet-info-value">Abhay@gmail.com</div>
            </div>
            <div className="idet-info-item">
              <div className="idet-info-label">Country</div>
              <div className="idet-info-value">India</div>
            </div>
            <div className="idet-info-item">
              <div className="idet-info-label">Subject</div>
              <div className="idet-info-value">Coding</div>
            </div>
          </div>

          {/* ── Info grid row 2 ── */}
          <div className="idet-info-grid idet-info-grid--row2">
            {/* Status toggle */}
            <div className="idet-info-item">
              <div className="idet-info-label">Status</div>
              <label className="idet-toggle">
                <input type="checkbox" defaultChecked />
                <span className="idet-toggle-slider" />
              </label>
            </div>

            {/* Avg Rating */}
            <div className="idet-info-item">
              <div className="idet-info-label">Avg Rating</div>
              <div className="idet-rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>5.0</span>
              </div>
            </div>

            {/* Address — spans remaining */}
            <div className="idet-info-item idet-info-item--wide">
              <div className="idet-info-label">Address</div>
              <div className="idet-info-value">123 Education Street, Boston, MA 02115</div>
            </div>
          </div>

          {/* ── Bank Details ── */}
          <div className="idet-bank-section">
            <div className="idet-bank-title">Bank Details</div>
            <div className="idet-bank-grid">
              <div className="idet-info-item">
                <div className="idet-info-label">Bank Account</div>
                <div className="idet-info-value">****4321</div>
              </div>
              <div className="idet-info-item">
                <div className="idet-info-label">IFSC</div>
                <div className="idet-info-value">HDFC0001234</div>
              </div>
            </div>
          </div>

          {/* ── Stats cards ── */}
          <div className="idet-stats-row">
            {/* Courses Created */}
            <div className="idet-stat-card idet-stat-card--blue">
              <div className="idet-stat-label">Courses Created</div>
              <div className="idet-stat-value">8</div>
              <button
                className="idet-stat-arrow idet-stat-arrow--blue"
                aria-label="View courses"
                onClick={() => navigate(`/dashboard/instructors/${id}/courses`)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Revenue */}
            <div className="idet-stat-card idet-stat-card--green">
              <div className="idet-stat-label">Revenue</div>
              <div className="idet-stat-value idet-stat-value--green">120K FCFA</div>
              <button
                className="idet-stat-arrow idet-stat-arrow--green"
                aria-label="View revenue"
                onClick={() => navigate(`/dashboard/instructors/${id}/revenue`)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Current Plan */}
            <div className="idet-stat-card idet-stat-card--yellow">
              <div className="idet-stat-label">Current plan</div>
              <div className="idet-stat-value">Premium</div>
              <button className="idet-stat-arrow idet-stat-arrow--yellow" aria-label="View plan">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Submitted Documents ── */}
          <div className="idet-docs-section">
            <h3 className="idet-docs-title">Submitted Documents</h3>
            <div className="idet-docs-table-wrap">
              <table className="idet-docs-table">
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
                      <td><StatusBadge status={doc.status} /></td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <div className="idet-doc-actions">
                          {/* Eye — view document */}
                          <button className="idet-doc-btn" aria-label="View document"
                            onClick={() => setViewDoc(doc)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          {/* Download */}
                          <button className="idet-doc-btn" aria-label="Download">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
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

      {/* ── Document View Modal ── */}
      {viewDoc && (
        <DocumentViewModal doc={viewDoc} onClose={() => setViewDoc(null)} />
      )}
    </div>
  );
}
