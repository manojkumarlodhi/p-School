import { useState } from 'react';
import './rejectmodal.css';

const REASONS = [
  'Incomplete documentation',
  'Invalid business license',
  'Unverified accreditation',
  'Suspicious activity detected',
  'Does not meet eligibility criteria',
];

export default function RejectModal({ onClose, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const [notes, setNotes]       = useState('');

  function toggle(reason) {
    setSelected((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  }

  function handleConfirm() {
    onConfirm?.({ reasons: selected, notes });
    onClose();
  }

  return (
    /* Backdrop */
    <div className="rm-backdrop" role="dialog" aria-modal="true" aria-labelledby="rm-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="rm-modal">

        {/* ── Header ── */}
        <div className="rm-header">
          <h2 className="rm-title" id="rm-title">Reject Application</h2>
          <button className="rm-close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="rm-divider"/>

        {/* ── Body ── */}
        <div className="rm-body">

          {/* Reasons */}
          <p className="rm-section-label">Select Rejection Reason(s)</p>
          <div className="rm-reasons-list">
            {REASONS.map((reason) => {
              const checked = selected.includes(reason);
              return (
                <label key={reason} className={`rm-reason-row${checked ? ' rm-reason-row--checked' : ''}`}>
                  <span className={`rm-checkbox${checked ? ' rm-checkbox--checked' : ''}`} aria-hidden="true">
                    {checked && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="#fff" strokeWidth={3} strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="rm-checkbox-input"
                    checked={checked}
                    onChange={() => toggle(reason)}
                    aria-label={reason}
                  />
                  <span className="rm-reason-text">{reason}</span>
                </label>
              );
            })}
          </div>

          {/* Notes */}
          <p className="rm-section-label" style={{ marginTop: 24 }}>Additional Notes (Optional)</p>
          <textarea
            className="rm-textarea"
            placeholder="Basic tools for instructors to get started"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            aria-label="Additional notes"
          />
        </div>

        <div className="rm-divider"/>

        {/* ── Footer ── */}
        <div className="rm-footer">
          <button className="rm-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="rm-btn-reject" onClick={handleConfirm}>Reject Application</button>
        </div>

      </div>
    </div>
  );
}
