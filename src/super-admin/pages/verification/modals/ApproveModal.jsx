import './approvemodal.css';

export default function ApproveModal({ instructorName = 'Sarah Johnson', onClose, onConfirm }) {
  return (
    <div className="am-backdrop" role="dialog" aria-modal="true" aria-labelledby="am-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="am-modal">

        {/* Warning icon */}
        <div className="am-icon-wrap" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>

        {/* Title */}
        <h2 className="am-title" id="am-title">Approve Instructor</h2>

        {/* Body text */}
        <p className="am-body-text">
          Are you sure you want to approve this institute?<br />
          Once approved,{' '}
          <span className="am-name-highlight">{instructorName}</span>
          {' '}will gain access to the instructor dashboard and can start creating and managing courses.
        </p>

        {/* Footer */}
        <div className="am-footer">
          <button className="am-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="am-btn-confirm" onClick={() => { onConfirm?.(); onClose(); }}>
            Yes, Approve Instructor
          </button>
        </div>

      </div>
    </div>
  );
}
