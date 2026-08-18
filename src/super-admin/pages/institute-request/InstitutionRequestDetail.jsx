import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RejectModal from '../verification/modals/RejectModal';
import SendSetupLinkModal from './modals/SendSetupLinkModal';
import './institutionrequestdetail.css';

/* ── Info item ── */
function InfoItem({ label, value, fullWidth }) {
  return (
    <div className={`ird-info-item${fullWidth ? ' ird-info-item--full' : ''}`}>
      <span className="ird-info-label">{label}</span>
      <span className="ird-info-value">{value}</span>
    </div>
  );
}

export default function InstitutionRequestDetail() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const [showRejectModal,   setShowRejectModal]   = useState(false);
  const [showSetupModal,    setShowSetupModal]     = useState(false);

  return (
    <div className="ird-page">

      {/* ── Page header ── */}
      <div className="ird-page-header">
        <div className="ird-header-left">
          <button className="ird-back-btn"
            onClick={() => navigate('/dashboard/institute-request')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="ird-page-title">Institutions Details</h1>
        </div>
        <span className="ird-breadcrumb">
          User Management &rsaquo; Institutions &rsaquo; Institutions Details
        </span>
      </div>

      {/* ── Body ── */}
      <div className="ird-body">
        <div className="ird-card">

          <h2 className="ird-section-title">Institute Applications Details</h2>

          {/* Info grid — 3 cols */}
          <div className="ird-info-grid">
            <InfoItem label="Institution Name *"        value="Starwood Academy"/>
            <InfoItem label="Institution Type *"        value="University"/>
            <InfoItem label="Contact Person Name *"     value="Contact Person Name"/>
            <InfoItem label="Role / Designation *"      value="CEO"/>
            <InfoItem label="Email"                     value="admin@techuniversity.edu"/>
            <InfoItem label="Phone"                     value="+1 (555) 123-4567"/>
            <InfoItem label="Approximate Number of Students *" value="200"/>
            <InfoItem label="Interested Course Categories *"   value="Coding, Electronics"/>
            <InfoItem label="Submitted Date"            value="2026-01-25"/>
          </div>

          {/* Address — full width */}
          <div className="ird-info-item ird-info-item--full" style={{ marginTop: 16 }}>
            <span className="ird-info-label">Address</span>
            <span className="ird-info-value">123 Education Street, Boston, MA 02115</span>
          </div>

          {/* Message — full width */}
          <div className="ird-info-item ird-info-item--full" style={{ marginTop: 16 }}>
            <span className="ird-info-label">Message (Optional)</span>
            <span className="ird-info-value">Massage From Institution Side</span>
          </div>

          {/* Footer actions */}
          <div className="ird-footer-actions">
            <button className="ird-btn-reject"
              onClick={() => setShowRejectModal(true)}>
              Reject Application
            </button>
            <button className="ird-btn-setup"
              onClick={() => setShowSetupModal(true)}>
              Send Setup Link
            </button>
          </div>

        </div>
      </div>

      {/* ── Reject modal ── */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={({ reasons, notes }) => {
            console.log('Rejected:', reasons, notes);
            navigate('/dashboard/institute-request');
          }}
        />
      )}

      {/* ── Send Setup Link modal ── */}
      {showSetupModal && (
        <SendSetupLinkModal
          email="brightfutureacademy@gmail.com"
          onClose={() => setShowSetupModal(false)}
          onConfirm={() => {
            console.log('Setup link sent');
            navigate('/dashboard/institute-request');
          }}
        />
      )}

    </div>
  );
}
