import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionverification.css';
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
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const DOCUMENTS = [
  { name: 'Government ID',             status: 'Verified', date: '2026-01-25', size: '2.4 MB' },
  { name: 'Educational Certificates',  status: 'Verified', date: '2026-01-25', size: '1.8 MB' },
  { name: 'Resume / CV upload',        status: 'Verified', date: '2026-01-25', size: '3.2 MB' },
  { name: 'Portfolio Link',            status: 'Verified', date: '2026-01-25', size: '1.5 MB' },
];

const REJECT_REASONS = [
  'Incomplete documentation',
  'Invalid business license',
  'Unverified accreditation',
  'Suspicious activity detected',
  'Does not meet eligibility criteria',
];

/* ── Reject Modal ── */
function RejectModal({ onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState('Basic tools for instructors to get started');

  function toggle(r) {
    setSelected(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  return (
    <div className="ivr-modal-overlay" onClick={onClose}>
      <div className="ivr-modal" onClick={e => e.stopPropagation()}>
        <div className="ivr-modal-header">
          <h3 className="ivr-modal-title">Reject Application</h3>
          <button className="ivr-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="ivr-modal-body">
          <p className="ivr-modal-subtitle">Select Rejection Reason(s)</p>
          <div className="ivr-reject-reasons">
            {REJECT_REASONS.map(r => (
              <label key={r} className="ivr-reason-item">
                <input type="checkbox" className="ivr-reason-check"
                  checked={selected.includes(r)} onChange={() => toggle(r)} />
                <span>{r}</span>
              </label>
            ))}
          </div>
          <p className="ivr-modal-subtitle" style={{ marginTop: 20 }}>
            Additional Notes (Optional)
          </p>
          <textarea className="ivr-notes-textarea" rows={4}
            value={notes} onChange={e => setNotes(e.target.value)} />
          <div className="ivr-modal-actions">
            <button className="ivr-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="ivr-btn-reject" onClick={onConfirm}>Reject Application</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Approve Modal ── */
function ApproveModal({ onClose, onConfirm }) {
  return (
    <div className="ivr-modal-overlay" onClick={onClose}>
      <div className="ivr-modal ivr-modal--approve" onClick={e => e.stopPropagation()}>
        <div className="ivr-approve-icon-wrap">
          <AlertIcon />
        </div>
        <h3 className="ivr-approve-title">Approve Instructor</h3>
        <p className="ivr-approve-text">
          Are you sure you want to approve this institute?<br />
          Once approved, <span className="ivr-approve-name">Sarah Johnson</span> will gain
          access to the instructor dashboard and can start creating and managing courses.
        </p>
        <div className="ivr-approve-actions">
          <button className="ivr-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ivr-btn-approve" onClick={onConfirm}>Yes, Approve Instructor</button>
        </div>
      </div>
    </div>
  );
}

/* ── Schedule Interview Modal ── */
function ScheduleModal({ onClose, onGenerate }) {
  const [date, setDate] = useState('01/08/20026');
  const [time, setTime] = useState('12:30 pm');
  const [platform, setPlatform] = useState('');
  const [notes, setNotes] = useState('Basic tools for instructors to get started');

  return (
    <div className="ivr-modal-overlay" onClick={onClose}>
      <div className="ivr-modal" onClick={e => e.stopPropagation()}>
        <div className="ivr-modal-header">
          <h3 className="ivr-modal-title">Schedule Interview</h3>
          <button className="ivr-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="ivr-modal-body">
          <p className="ivr-schedule-subtitle">Schedule an interview with Sarah Johnson</p>

          <div className="ivr-schedule-field">
            <label className="ivr-schedule-label">Interview Date</label>
            <input className="ivr-schedule-input ivr-schedule-input--active"
              value={date} onChange={e => setDate(e.target.value)} />
          </div>

          <div className="ivr-schedule-field">
            <label className="ivr-schedule-label">Interview Time</label>
            <input className="ivr-schedule-input"
              value={time} onChange={e => setTime(e.target.value)} />
          </div>

          <div className="ivr-schedule-field">
            <label className="ivr-schedule-label">Meeting Platform</label>
            <div className="ivr-select-wrap">
              <select className="ivr-select" value={platform}
                onChange={e => setPlatform(e.target.value)}>
                <option value="">Select Platform</option>
                <option>Google meet</option>
                <option>Zoom</option>
                <option>Microsoft Teams</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          <div className="ivr-schedule-field">
            <label className="ivr-schedule-label">Interview Notes (Optional)</label>
            <textarea className="ivr-notes-textarea" rows={4}
              value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <div className="ivr-modal-actions">
            <button className="ivr-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="ivr-btn-primary" onClick={() => onGenerate(platform)}>
              Generate Secure Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Secure Interview Link Modal ── */
function SecureInterviewModal({ platform, onClose }) {
  const [copied, setCopied] = useState(false);
  const link = 'https://appname.com/secure-invite/8XH7K2LM9P';

  function copyLink() {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="ivr-modal-overlay" onClick={onClose}>
      <div className="ivr-modal" onClick={e => e.stopPropagation()}>
        <div className="ivr-modal-header">
          <h3 className="ivr-modal-title">Secure Interview Link Generated</h3>
          <button className="ivr-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="ivr-modal-body">
          <div className="ivr-secure-info-row">
            <div className="ivr-secure-info-item">
              <div className="ivr-secure-label">Email</div>
              <div className="ivr-secure-value">Abhay@ gmail.com</div>
            </div>
            <div className="ivr-secure-info-item">
              <div className="ivr-secure-label">Meeting Platform</div>
              <div className="ivr-secure-value">{platform || 'Microsoft Teams'}</div>
            </div>
          </div>
          <div className="ivr-secure-link-section">
            <div className="ivr-secure-label">Link</div>
            <div className="ivr-secure-link-row">
              <input className="ivr-secure-link-input" value={link} readOnly />
              <button className={`ivr-copy-btn${copied ? ' copied' : ''}`} onClick={copyLink}>
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>
          <div className="ivr-modal-actions">
            <button className="ivr-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="ivr-btn-primary">Send Invitation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstitutionVerificationDetail() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null); // 'reject' | 'approve' | 'schedule' | 'secure'
  const [schedulePlatform, setSchedulePlatform] = useState('');

  return (
    <div className="ivr-page">
      <div className="ivr-page-header">
        <button className="ivr-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Instructor details</span>
        </button>
        <span className="ivr-breadcrumb">
          Verification Request &rsaquo; Institution Details
        </span>
      </div>

      <div className="ivr-body">
        <div className="ivr-detail-card">

          {/* Profile header */}
          <div className="ivr-profile-header">
            <div className="ivr-profile-left">
              <img src={profileImg} alt="Dr. Kwame Mensah" className="ivr-profile-avatar" />
              <div>
                <h2 className="ivr-profile-name">Dr. Kwame Mensah</h2>
                <p className="ivr-profile-sub">Application #1</p>
              </div>
            </div>
            <span className="ivr-pending-badge">Pending Verification</span>
          </div>

          {/* Info grid */}
          <div className="ivr-info-grid">
            <div className="ivr-info-item">
              <div className="ivr-info-label">Email</div>
              <div className="ivr-info-value">admin@techuniversity.edu</div>
            </div>
            <div className="ivr-info-item">
              <div className="ivr-info-label">Phone</div>
              <div className="ivr-info-value">+1 (555) 123-4567</div>
            </div>
            <div className="ivr-info-item">
              <div className="ivr-info-label">Subject</div>
              <div className="ivr-info-value">Coding</div>
            </div>
            <div className="ivr-info-item">
              <div className="ivr-info-label">Phone Number</div>
              <div className="ivr-info-value">5 years</div>
            </div>
            <div className="ivr-info-item">
              <div className="ivr-info-label">Application Date</div>
              <div className="ivr-info-value">1/15/2024</div>
            </div>
          </div>

          {/* About */}
          <div className="ivr-about-box">
            <div className="ivr-about-title">About</div>
            <p className="ivr-about-text">
              Passionate mathematics educator with 5 years of experience teaching high school
              and college-level courses. Specialized in algebra, calculus, and statistics.
              Looking to share knowledge through online platform.
            </p>
          </div>

          {/* Submitted Documents */}
          <div className="ivr-section-title">Submitted Documents</div>
          <div className="ivr-docs-table-wrap">
            <table className="ivr-docs-table">
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
                      <span className={`ivr-doc-status ivr-doc-status--${doc.status.toLowerCase()}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.date}</td>
                    <td>{doc.size}</td>
                    <td>
                      <div className="ivr-actions">
                        <button className="ivr-action-btn" aria-label="View">
                          <SunIcon />
                        </button>
                        <button className="ivr-action-btn" aria-label="Download">
                          <DownloadIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom action buttons */}
          <div className="ivr-detail-actions">
            <button className="ivr-btn-reject-outline"
              onClick={() => setModal('reject')}>
              Reject Application
            </button>
            <button className="ivr-btn-schedule"
              onClick={() => setModal('schedule')}>
              Schedule Interview
            </button>
            <button className="ivr-btn-approve-solid"
              onClick={() => setModal('approve')}>
              Approved
            </button>
          </div>

        </div>
      </div>

      {/* Modals */}
      {modal === 'reject' && (
        <RejectModal
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}
      {modal === 'approve' && (
        <ApproveModal
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}
      {modal === 'schedule' && (
        <ScheduleModal
          onClose={() => setModal(null)}
          onGenerate={(p) => { setSchedulePlatform(p); setModal('secure'); }}
        />
      )}
      {modal === 'secure' && (
        <SecureInterviewModal
          platform={schedulePlatform}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
