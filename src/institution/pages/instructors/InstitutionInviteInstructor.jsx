import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioninstructors.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

/* ── Secure Link Modal ── */
function SecureLinkModal({ email, expiry, onClose }) {
  const [copied, setCopied] = useState(false);
  const link = 'https://appname.com/secure-invite/8XH7K2LM9P';

  function copyLink() {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="iinst-modal-overlay" onClick={onClose}>
      <div className="iinst-modal iinst-modal--invite" onClick={e => e.stopPropagation()}>
        <div className="iinst-modal-header">
          <h3 className="iinst-modal-title">Secure Invitation Link Generated</h3>
          <button className="iinst-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="iinst-invite-modal-body">
          <div className="iinst-invite-info-row">
            <div className="iinst-invite-info-item">
              <div className="iinst-invite-info-label">Email</div>
              <div className="iinst-invite-info-value">{email}</div>
            </div>
            <div className="iinst-invite-info-item">
              <div className="iinst-invite-info-label">Expires In</div>
              <div className="iinst-invite-info-value">{expiry}</div>
            </div>
          </div>

          <div className="iinst-invite-link-section">
            <div className="iinst-invite-info-label">Link</div>
            <div className="iinst-invite-link-row">
              <input
                className="iinst-invite-link-input"
                value={link}
                readOnly
              />
              <button
                className={`iinst-copy-btn${copied ? ' copied' : ''}`}
                onClick={copyLink}
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>

          <div className="iinst-invite-modal-actions">
            <button className="iinst-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="iinst-btn-save">Send Invitation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstitutionInviteInstructor() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('Abhay@gmail.com');
  const [expiry, setExpiry] = useState('24 Hours');
  const [showModal, setShowModal] = useState(false);

  function handleGenerate(e) {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <div className="iinst-page">

      <div className="iinst-page-header">
        <button className="iinst-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Send Secure Instructor Invitation</span>
        </button>
        <span className="iinst-breadcrumb">
          Instructor list &rsaquo; Invite Instructor
        </span>
      </div>

      <div className="iinst-body">
        <div className="iinst-invite-card">
          <form onSubmit={handleGenerate}>

            <div className="iinst-invite-form-grid">

              <div className="iinst-field">
                <label className="iinst-label">Instructor Email</label>
                <input
                  className="iinst-input"
                  type="email"
                  placeholder="Instructor Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <p className="iinst-invite-hint">
                  The invitation will only work for this email address.
                </p>
              </div>

              <div className="iinst-field">
                <label className="iinst-label">Invite Expiry</label>
                <div className="iinst-select-wrap">
                  <select className="iinst-select" value={expiry}
                    onChange={e => setExpiry(e.target.value)}>
                    <option>24 Hours</option>
                    <option>48 Hours</option>
                    <option>72 Hours</option>
                    <option>7 Days</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

            </div>

            <div className="iinst-form-actions">
              <button type="button" className="iinst-btn-cancel"
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="iinst-btn-save">
                Generate Secure Link
              </button>
            </div>

          </form>
        </div>
      </div>

      {showModal && (
        <SecureLinkModal
          email={email}
          expiry={expiry}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}
