import './sendsetuplinkmodal.css';

export default function SendSetupLinkModal({
  email = 'brightfutureacademy@gmail.com',
  onClose,
  onConfirm,
}) {
  return (
    <div className="ssl-backdrop" role="dialog" aria-modal="true" aria-labelledby="ssl-title"
      onClick={e => e.target === e.currentTarget && onClose()}>

      <div className="ssl-modal">

        {/* Warning icon */}
        <div className="ssl-icon-wrap" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>

        {/* Title */}
        <h2 className="ssl-title" id="ssl-title">Send Profile Setup Link?</h2>

        {/* Body */}
        <p className="ssl-body-text">
          Are you sure you want to send the profile setup link to this institute?
        </p>
        <p className="ssl-body-sub">The access link will be sent to:</p>
        <p className="ssl-email">{email}</p>

        {/* Footer */}
        <div className="ssl-footer">
          <button className="ssl-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ssl-btn-confirm"
            onClick={() => { onConfirm?.(); onClose(); }}>
            Yes, Send Link
          </button>
        </div>

      </div>
    </div>
  );
}
