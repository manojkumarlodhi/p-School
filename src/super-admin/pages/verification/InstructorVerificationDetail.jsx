import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';
import RejectModal            from './modals/RejectModal';
import ApproveModal           from './modals/ApproveModal';
import ScheduleInterviewModal from './modals/ScheduleInterviewModal';
import SecureLinkModal        from './modals/SecureLinkModal';
import './instructorverificationdetail.css';

/* ── Documents ── */
const DOCUMENTS = [
  { id: 1, name: 'Government ID',           status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { id: 2, name: 'Educational Certificates', status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { id: 3, name: 'Resume / CV upload',       status: 'Verified', date: '2026-01-25', size: '3.2 MB' },
  { id: 4, name: 'Portfolio Link',           status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

/* ── Doc badge ── */
function DocBadge({ status }) {
  const cls =
    status === 'Verified' ? 'ivd-doc-badge ivd-doc-badge--verified' :
    status === 'Pending'  ? 'ivd-doc-badge ivd-doc-badge--pending'  :
                            'ivd-doc-badge ivd-doc-badge--rejected';
  return <span className={cls}>{status}</span>;
}

/* ── Icons ── */
function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function InstructorVerificationDetail() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const [showRejectModal,    setShowRejectModal]    = useState(false);
  const [showApproveModal,   setShowApproveModal]   = useState(false);
  const [showScheduleModal,  setShowScheduleModal]  = useState(false);
  const [showSecureLinkModal, setShowSecureLinkModal] = useState(false);
  const [scheduleData,       setScheduleData]       = useState(null);

  return (
    <div className="ivd-page">

      {/* ── Page header ── */}
      <div className="ivd-page-header">
        <div className="ivd-header-left">
          <button className="ivd-back-btn"
            onClick={() => navigate('/dashboard/verification')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="ivd-page-title">Instructor details</h1>
        </div>
        <span className="ivd-breadcrumb">
          Verification Request &rsaquo; Institution Details
        </span>
      </div>

      {/* ── Body ── */}
      <div className="ivd-body">

        {/* ── Profile card ── */}
        <div className="ivd-card">

          {/* Profile row */}
          <div className="ivd-profile-row">
            <img src={profileImg} alt="Dr. Kwame Mensah" className="ivd-avatar"/>
            <div className="ivd-profile-info">
              <h2 className="ivd-name">Dr. Kwame Mensah</h2>
              <p className="ivd-sub">Application #1</p>
            </div>
            <span className="ivd-status-badge">Pending Verification</span>
          </div>

          {/* Info grid */}
          <div className="ivd-info-grid">
            <div className="ivd-info-item">
              <span className="ivd-info-label">Email</span>
              <span className="ivd-info-value">admin@techuniversity.edu</span>
            </div>
            <div className="ivd-info-item">
              <span className="ivd-info-label">Phone</span>
              <span className="ivd-info-value">+1 (555) 123-4567</span>
            </div>
            <div className="ivd-info-item">
              <span className="ivd-info-label">Subject</span>
              <span className="ivd-info-value">Coding</span>
            </div>
            <div className="ivd-info-item">
              <span className="ivd-info-label">Phone Number</span>
              <span className="ivd-info-value">5 years</span>
            </div>
          </div>

          {/* Application date */}
          <div className="ivd-info-item" style={{ marginBottom: 20 }}>
            <span className="ivd-info-label">Application Date</span>
            <span className="ivd-info-value">1/15/2024</span>
          </div>

          {/* About */}
          <div className="ivd-about-box">
            <p className="ivd-about-label">About</p>
            <p className="ivd-about-text">
              Passionate mathematics educator with 5 years of experience teaching high school and
              college-level courses. Specialized in algebra, calculus, and statistics. Looking to
              share knowledge through online platform.
            </p>
          </div>

          {/* Submitted Documents */}
          <section style={{ marginTop: 24 }}>
            <h3 className="ivd-docs-title">Submitted Documents</h3>
            <div className="ivd-doc-table-wrap">
              <table className="ivd-doc-table">
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
                  {DOCUMENTS.map((doc) => (
                    <tr key={doc.id}>
                      <td className="ivd-doc-name">{doc.name}</td>
                      <td><DocBadge status={doc.status} /></td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <div className="ivd-doc-actions">
                          <button className="ivd-doc-btn" title="View"><EyeIcon /></button>
                          <button className="ivd-doc-btn" title="Download"><DownloadIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div className="ivd-footer-actions">
        <button className="ivd-btn-reject"
          onClick={() => setShowRejectModal(true)}>
          Reject Application
        </button>
        <button className="ivd-btn-schedule"
          onClick={() => setShowScheduleModal(true)}>
          Schedule Interview
        </button>
        <button className="ivd-btn-approve"
          onClick={() => setShowApproveModal(true)}>
          Approved &amp; Continue
        </button>
      </div>

      {/* ── Reject modal ── */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={({ reasons, notes }) => {
            console.log('Rejected:', reasons, notes);
            navigate('/dashboard/verification');
          }}
        />
      )}

      {/* ── Approve modal ── */}
      {showApproveModal && (
        <ApproveModal
          instructorName="Sarah Johnson"
          onClose={() => setShowApproveModal(false)}
          onConfirm={() => {
            console.log('Approved');
            navigate('/dashboard/verification');
          }}
        />
      )}

      {/* ── Schedule Interview modal ── */}
      {showScheduleModal && (
        <ScheduleInterviewModal
          instructorName="Sarah Johnson"
          onClose={() => setShowScheduleModal(false)}
          onGenerate={(data) => {
            setScheduleData(data);
            setShowScheduleModal(false);
            setShowSecureLinkModal(true);
          }}
        />
      )}

      {/* ── Secure Link modal ── */}
      {showSecureLinkModal && (
        <SecureLinkModal
          email="Abhay@ gmail.com"
          platform={scheduleData?.platform || 'Microsoft Teams'}
          onClose={() => setShowSecureLinkModal(false)}
          onSend={() => {
            console.log('Invitation sent');
            navigate('/dashboard/verification');
          }}
        />
      )}

    </div>
  );
}
