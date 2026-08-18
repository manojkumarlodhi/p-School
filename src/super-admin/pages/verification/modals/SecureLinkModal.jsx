import { useState } from 'react';
import './securelinkmodal.css';

const GENERATED_LINK = 'https://appname.com/secure-invite/8XH7K2LM9P';

export default function SecureLinkModal({
  email = 'Abhay@ gmail.com',
  platform = 'Microsoft Teams',
  onClose,
  onSend,
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(GENERATED_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="sl-backdrop" role="dialog" aria-modal="true" aria-labelledby="sl-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="sl-modal">

        {/* ── Header ── */}
        <div className="sl-header">
          <h2 className="sl-title" id="sl-title">Secure Interview Link Generated</h2>
          <button className="sl-close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="sl-divider"/>

        {/* ── Body ── */}
        <div className="sl-body">

          {/* Email + Platform row */}
          <div className="sl-info-row">
            <div className="sl-info-item">
              <span className="sl-info-label">Email</span>
              <span className="sl-info-value">{email}</span>
            </div>
            <div className="sl-info-item">
              <span className="sl-info-label">Meeting Platform</span>
              <span className="sl-info-value">{platform}</span>
            </div>
          </div>

          {/* Link row */}
          <div className="sl-link-section">
            <span className="sl-info-label">Link</span>
            <div className="sl-link-row">
              <div className="sl-link-box">
                <span className="sl-link-text">{GENERATED_LINK}</span>
              </div>
              <button
                className={`sl-copy-btn${copied ? ' sl-copy-btn--copied' : ''}`}
                onClick={handleCopy}
                aria-label="Copy link"
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>

        </div>

        <div className="sl-divider"/>

        {/* ── Footer ── */}
        <div className="sl-footer">
          <button className="sl-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="sl-btn-send" onClick={() => { onSend?.(); onClose(); }}>
            Send Invitation
          </button>
        </div>

      </div>
    </div>
  );
}
