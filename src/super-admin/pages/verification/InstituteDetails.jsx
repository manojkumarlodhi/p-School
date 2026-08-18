import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import starwoodLogo from '../../../assets/images/starwoodAcadmey.png';
import RejectModal from './modals/RejectModal';
import './institutedetails.css';

/* ── Step definitions ── */
const STEPS = [
  { id: 1, label: 'Verification Request',      sub: 'Basic Details & Documents' },
  { id: 2, label: 'Contract Document Upload',  sub: 'Contract File' },
  { id: 3, label: 'Review Signed Contract',    sub: 'Signed Document' },
  { id: 4, label: 'Payment Status',            sub: 'Confirm Payment' },
];

/* ── Document status badge ── */
function DocBadge({ status }) {
  const cls =
    status === 'Verified' ? 'id-doc-badge id-doc-badge-verified' :
    status === 'Pending'  ? 'id-doc-badge id-doc-badge-pending'  :
                            'id-doc-badge id-doc-badge-rejected';
  return <span className={cls}>{status}</span>;
}

/* ── Icons ── */
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

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

/* ── Documents data ── */
const DOCUMENTS = [
  { id: 1, name: 'Business License',          status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { id: 2, name: 'Tax Registration',          status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { id: 3, name: 'Accreditation Certificate', status: 'Pending',  date: '2026-01-25', size: '3.2 MB' },
  { id: 4, name: 'Identity Proof (Admin)',     status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

/* ── Additional services ── */
const ADDITIONAL_SERVICES = [
  'Advanced Analytics', 'White-label Branding',
  'API Access',         'Priority Support',
  'Proctored Exams',    'Content Creation Tools',
];

/* ══════════════════════════════════════════
   Step 1 — Verification Request
══════════════════════════════════════════ */
function Step1({ onNext, onReject }) {
  return (
    <>
      {/* Institute header */}
      <div className="id-institute-header">
        <div className="id-institute-info">
          <img src={starwoodLogo} alt="Starwood Academy" className="id-institute-logo" />
          <div>
            <h2 className="id-institute-name">Starwood Academy</h2>
            <p className="id-institute-type">Training Center</p>
          </div>
        </div>
        <span className="id-status-badge">Pending Verification</span>
      </div>

      {/* Basic Details */}
      <section className="id-section">
        <h3 className="id-section-title">Basic Details</h3>
        <div className="id-info-grid id-info-grid-4">
          <div className="id-info-item">
            <span className="id-info-label">Official Email</span>
            <span className="id-info-value">admin@techuniversity.edu</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Official Phone</span>
            <span className="id-info-value">+1 (555) 123-4567</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Country</span>
            <span className="id-info-value">India</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Submitted Date</span>
            <span className="id-info-value">2026-01-25</span>
          </div>
        </div>
        <div className="id-info-grid id-info-grid-1" style={{ marginTop: 12 }}>
          <div className="id-info-item">
            <span className="id-info-label">Address</span>
            <span className="id-info-value">123 Education Street, Boston, MA 02115</span>
          </div>
        </div>
      </section>

      <div className="id-divider" />

      {/* Point of Contact */}
      <section className="id-section">
        <h3 className="id-section-title">Point of Contact</h3>
        <div className="id-info-grid id-info-grid-3">
          <div className="id-info-item">
            <span className="id-info-label">Name (Principal/Director)</span>
            <span className="id-info-value">Dr. John Smith</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Email</span>
            <span className="id-info-value">admin@techuniversity.edu</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Phone</span>
            <span className="id-info-value">+1 (555) 123-4567</span>
          </div>
        </div>
      </section>

      <div className="id-divider" />

      {/* Plan Details — Trial */}
      <section className="id-section">
        <h3 className="id-section-title">Plan Details</h3>
        <div className="id-plan-card">
          <div className="id-plan-type-row">
            <span className="id-plan-type-label">Plan Type</span>
            <span className="id-plan-badge id-plan-badge-trial">Trial Plan</span>
          </div>
          <h4 className="id-trial-title">Trial Details</h4>
          <div className="id-info-grid id-info-grid-4">
            <div className="id-info-item">
              <span className="id-info-label">Trial Duration</span>
              <span className="id-info-value">30 Days</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label">Student Limit</span>
              <span className="id-info-value">Up to 500</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label">Start Date</span>
              <span className="id-info-value">2026-01-25</span>
            </div>
            <div className="id-info-item">
              <span className="id-info-label">End Date</span>
              <span className="id-info-value">2026-01-25</span>
            </div>
          </div>
          <div className="id-trial-warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#d97706" strokeWidth={2} strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Temporary access enabled. Plan will expire automatically after the trial period.</span>
          </div>
        </div>
      </section>

      <div className="id-divider" />

      {/* Submitted Documents */}
      <section className="id-section">
        <h3 className="id-section-title">Submitted Documents</h3>
        <div className="id-doc-table-wrap">
          <table className="id-doc-table">
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
                  <td className="id-doc-name">{doc.name}</td>
                  <td><DocBadge status={doc.status} /></td>
                  <td>{doc.date}</td>
                  <td>{doc.size}</td>
                  <td>
                    <div className="id-doc-actions">
                      <button className="id-doc-btn" title="View"><EyeIcon /></button>
                      <button className="id-doc-btn" title="Download"><DownloadIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <div className="id-footer-actions">
        <button className="id-btn-reject" onClick={onReject}>Reject Application</button>
        <button className="id-btn-approve" onClick={onNext}>Approve Verification</button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   Step 2 — Contract Document Upload
══════════════════════════════════════════ */
function Step2({ onBack, onNext }) {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <>
      {/* Institute Summary */}
      <section className="id-section">
        <h3 className="id-section-title">Institute Summary</h3>
        <div className="id-info-grid id-info-grid-4">
          <div className="id-info-item">
            <span className="id-info-label">Institute Name</span>
            <span className="id-info-value">Starwood Academy</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Plan Type</span>
            <span className="id-plan-badge id-plan-badge-trial" style={{ marginTop: 4 }}>Trial Plan</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Contact Person</span>
            <span className="id-info-value">Dr. John Smith</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Email</span>
            <span className="id-info-value">admin@techuniversity.edu</span>
          </div>
        </div>
      </section>

      <div className="id-divider" />

      {/* Upload Contract File */}
      <section className="id-section">
        <h3 className="id-section-title">Upload Contract File</h3>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx"
          style={{ display: 'none' }} onChange={handleFile} />
        <div
          className="id-upload-area"
          onClick={() => fileRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          role="button" tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current.click()}
        >
          {file ? (
            <div className="id-upload-file-name">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>{file.name}</span>
            </div>
          ) : (
            <>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="#e0f7ff" stroke="none"/>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p className="id-upload-text">
                <span className="id-upload-link">Upload a file</span> or drag and drop
              </p>
              <p className="id-upload-hint">Upload the official agreement document to proceed.</p>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="id-footer-actions">
        <button className="id-btn-back" onClick={onBack}>Back</button>
        <button className="id-btn-approve" onClick={onNext}>Send Contract</button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   Shared waiting illustration (Step 3 pending & Step 4 waiting)
══════════════════════════════════════════ */
function WaitingIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ground shadow */}
      <ellipse cx="100" cy="188" rx="72" ry="8" fill="#e5e7eb" opacity="0.6"/>

      {/* ══ HOURGLASS ══ */}
      <rect x="72" y="28" width="56" height="8" rx="4" fill="#1ba8d5"/>
      <rect x="72" y="156" width="56" height="8" rx="4" fill="#1ba8d5"/>
      <rect x="76" y="36" width="48" height="120" rx="2" fill="#e0f7ff"/>
      <path d="M76 36 L124 36 L100 96 Z" fill="#1ba8d5" opacity="0.35"/>
      <path d="M80 156 L120 156 L100 110 Z" fill="#1ba8d5"/>
      <line x1="76" y1="96" x2="124" y2="96" stroke="#1ba8d5" strokeWidth="2"/>
      <line x1="76" y1="36" x2="76" y2="156" stroke="#1ba8d5" strokeWidth="1.5" opacity="0.4"/>
      <line x1="124" y1="36" x2="124" y2="156" stroke="#1ba8d5" strokeWidth="1.5" opacity="0.4"/>

      {/* ══ PLANT (bottom-right of hourglass) ══ */}
      <path d="M118 158 Q118 144 128 140 Q138 136 138 148 Q138 158 128 162 Z" fill="#86efac" stroke="#16a34a" strokeWidth="1"/>
      <line x1="128" y1="162" x2="128" y2="172" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M128 155 Q122 148 116 150" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" fill="none"/>

      {/* ══ PERSON ══ */}
      {/* Head */}
      <circle cx="56" cy="62" r="14" fill="#fcd9b6"/>
      {/* Hair */}
      <path d="M42 58 Q44 46 56 46 Q68 46 70 58 Q66 52 56 52 Q46 52 42 58 Z" fill="#1e293b"/>
      {/* Neck */}
      <rect x="52" y="74" width="8" height="8" rx="2" fill="#fcd9b6"/>
      {/* Body / shirt */}
      <path d="M36 122 Q36 82 56 82 Q76 82 76 122 Z" fill="#1e293b"/>
      {/* Collar */}
      <path d="M52 82 L56 90 L60 82" fill="#fff" opacity="0.9"/>
      {/* Left arm — raised toward hourglass */}
      <path d="M38 92 Q28 80 34 68" stroke="#fcd9b6" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <circle cx="34" cy="66" r="5" fill="#fcd9b6"/>
      {/* Right arm — down/side */}
      <path d="M74 92 Q84 104 80 118" stroke="#fcd9b6" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <circle cx="80" cy="120" r="5" fill="#fcd9b6"/>
      {/* Trousers */}
      <path d="M36 122 L44 182 L56 182 L56 152 L56 182 L68 182 L76 122 Z" fill="#334155"/>
      {/* Shoes */}
      <ellipse cx="44" cy="184" rx="8" ry="4" fill="#1e293b"/>
      <ellipse cx="68" cy="184" rx="8" ry="4" fill="#1e293b"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   Step 3 — Review Signed Contract
══════════════════════════════════════════ */
function Step3({ onBack, onNext }) {
  return (
    <>
      {/* Institute Summary */}
      <section className="id-section">
        <h3 className="id-section-title">Institute Summary</h3>
        <div className="id-info-grid id-info-grid-4">
          <div className="id-info-item">
            <span className="id-info-label">Institute Name</span>
            <span className="id-info-value">Starwood Academy</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Plan Type</span>
            <span className="id-plan-badge id-plan-badge-trial" style={{ marginTop: 4 }}>Trial Plan</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Contact Person</span>
            <span className="id-info-value">Dr. John Smith</span>
          </div>
          <div className="id-info-item">
            <span className="id-info-label">Email</span>
            <span className="id-info-value">admin@techuniversity.edu</span>
          </div>
        </div>
      </section>

      <div className="id-divider" />

      {/* Submitted Documents */}
      <section className="id-section">
        <h3 className="id-section-title">Submitted Documents</h3>
        <div className="id-signed-doc-row">
          {/* File icon */}
          <div className="id-signed-doc-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          {/* File info */}
          <div className="id-signed-doc-info">
            <span className="id-signed-doc-name">Institute_Service_Agreement_2026.pdf</span>
            <span className="id-signed-doc-meta">Agreement Document · 2.4 MB</span>
          </div>
          {/* Actions */}
          <div className="id-doc-actions">
            <button className="id-doc-btn" title="View">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button className="id-doc-btn" title="Download">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="id-footer-actions">
        <button className="id-btn-back" onClick={onBack}>Back</button>
        <button className="id-btn-approve" onClick={onNext}>Approved Contract</button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   Step 4 — Payment Status
══════════════════════════════════════════ */
function Step4({ onBack }) {
  const [confirmed, setConfirmed] = useState(false);

  if (!confirmed) {
    return (
      <>
        {/* Waiting for Payment — illustration state */}
        <div className="id-contract-sent-wrap">
          <div className="id-contract-sent-illustration">
            <WaitingIllustration />
          </div>

          <h2 className="id-contract-sent-title">Waiting for Payment</h2>

          <div className="id-contract-pending-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#d97706" strokeWidth={2} strokeLinecap="round" aria-hidden="true"
              style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="id-contract-pending-title">Pending Payment</p>
              <p className="id-contract-pending-sub">Waiting payment from institute</p>
            </div>
          </div>
        </div>

        <div className="id-footer-actions">
          <button className="id-btn-back" onClick={onBack}>Back</button>
          <button className="id-btn-approve" onClick={() => setConfirmed(true)}>Confirm Payment</button>
        </div>
      </>
    );
  }

  /* ── Confirmed state ── */
  return (
    <>
      <div className="id-payment-status-section">
        <h3 className="id-section-title">Payment Status</h3>
      </div>

      <div className="id-footer-actions">
        <button className="id-btn-back" onClick={() => setConfirmed(false)}>Back</button>
        <button className="id-btn-approve" onClick={onBack}>Confirm Payment</button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   Paid Plan Details card (used in Step 1 variant)
══════════════════════════════════════════ */
export function PaidPlanCard() {
  return (
    <div className="id-plan-card">
      <div className="id-plan-type-row">
        <span className="id-plan-type-label">Plan Type</span>
        <span className="id-plan-badge id-plan-badge-paid">Paid Plan</span>
      </div>
      <h4 className="id-trial-title">Paid Plan Details</h4>
      <div className="id-info-grid id-info-grid-2" style={{ marginBottom: 20 }}>
        <div className="id-info-item">
          <span className="id-info-label">Student Seats</span>
          <span className="id-info-value">500</span>
        </div>
        <div className="id-info-item">
          <span className="id-info-label">Billing Cycle</span>
          <span className="id-info-value">Monthly / Yearly</span>
        </div>
      </div>
      <h4 className="id-trial-title">Additional Services</h4>
      <div className="id-services-grid">
        {ADDITIONAL_SERVICES.map((s) => (
          <div key={s} className="id-service-item">{s}</div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main page
══════════════════════════════════════════ */
export default function InstituteDetails() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showRejectModal, setShowRejectModal] = useState(false);

  return (
    <div className="id-page">

      {/* ── Page header ── */}
      <div className="id-page-header">
        <div className="id-header-left">
          <button className="id-back-btn"
            onClick={() => currentStep === 1 ? navigate('/dashboard/verification') : setCurrentStep(s => s - 1)}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="id-page-title">Institute details</h1>
        </div>
        <span className="id-breadcrumb">Verification Request &rsaquo; Institution Details</span>
      </div>

      {/* ── Step progress bar ── */}
      <div className="id-steps-bar">
        {/* Progress line */}
        <div className="id-steps-line">
          <div
            className="id-steps-line-fill"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {/* Step dots */}
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`id-step-dot${currentStep >= step.id ? ' id-step-dot-done' : ''}`}
              style={{ left: `${(idx / (STEPS.length - 1)) * 100}%` }}
            >
              {currentStep > step.id && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth={3} strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="id-steps-labels">
          {STEPS.map((step) => (
            <div key={step.id} className={`id-step-label-wrap${currentStep === step.id ? ' id-step-label-active' : ''}`}>
              <div className="id-step-label-text">{step.label}</div>
              <div className="id-step-label-sub">{step.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="id-body">
        {currentStep === 1 && (
          <Step1
            onNext={() => setCurrentStep(2)}
            onReject={() => setShowRejectModal(true)}
          />
        )}
        {currentStep === 2 && (
          <Step2
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}
        {currentStep === 3 && (
          <Step3
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        )}
        {currentStep === 4 && (
          <Step4
            onBack={() => setCurrentStep(3)}
          />
        )}
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

    </div>
  );
}
