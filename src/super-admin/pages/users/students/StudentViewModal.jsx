import { useEffect } from 'react';
import profileImg from '../../../../assets/images/profile.png';
import './studentviewmodal.css';

export default function StudentViewModal({ student, onClose }) {
  /* Close on Escape key */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!student) return null;

  return (
    /* Backdrop */
    <div className="svm-backdrop" onClick={onClose} role="dialog" aria-modal="true"
      aria-label="Student details">
      <div className="svm-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Close button ── */}
        <button className="svm-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ── Profile header ── */}
        <div className="svm-profile-row">
          <img src={profileImg} alt={student.name} className="svm-avatar" />
          <div className="svm-profile-info">
            <h2 className="svm-name">{student.name}</h2>
            <p className="svm-institution">{student.institution}</p>
          </div>
        </div>

        <div className="svm-divider" />

        {/* ── Badges + Enrollment ── */}
        <div className="svm-badges-row">
          <div className="svm-badges">
            <span className="svm-badge svm-badge-role">{student.role}</span>
            <span className={`svm-badge svm-badge-sub ${student.subscription.toLowerCase()}`}>
              {student.subscription}
            </span>
          </div>
          <div className="svm-enrollment">
            <span className="svm-enrollment-label">Enrollment Date</span>
            <span className="svm-enrollment-date">1/10/2023</span>
          </div>
        </div>

        {/* ── Info cards row ── */}
        <div className="svm-info-cards">
          <div className="svm-info-card">
            <div className="svm-info-label">Age Group</div>
            <div className="svm-info-value">{student.ageGroup}</div>
          </div>
          <div className="svm-info-card">
            <div className="svm-info-label">Institution</div>
            <div className="svm-info-value">{student.institution}</div>
          </div>
          <div className="svm-info-card">
            <div className="svm-info-label">Role Type</div>
            <div className="svm-info-value">{student.role}</div>
          </div>
        </div>

        {/* ── Contact row ── */}
        <div className="svm-contact-row">
          <div className="svm-contact-item">
            <div className="svm-contact-label">Mobile</div>
            <div className="svm-contact-value">+91 6416845451</div>
          </div>
          <div className="svm-contact-item">
            <div className="svm-contact-label">Email</div>
            <div className="svm-contact-value">Abhay@gmail.com</div>
          </div>
          <div className="svm-contact-item">
            <div className="svm-contact-label">Status</div>
            <label className="svm-toggle">
              <input type="checkbox" defaultChecked={student.status} readOnly />
              <span className="svm-toggle-slider" />
            </label>
          </div>
        </div>

        {/* ── Parent Details ── */}
        <h3 className="svm-section-title">Parent Details</h3>
        <div className="svm-contact-row">
          <div className="svm-contact-item">
            <div className="svm-contact-label">Mobile</div>
            <div className="svm-contact-value">+91 6416845451</div>
          </div>
          <div className="svm-contact-item">
            <div className="svm-contact-label">Email</div>
            <div className="svm-contact-value">Parent@gmail.com</div>
          </div>
        </div>

        <div className="svm-divider" />

        {/* ── Actions ── */}
        <div className="svm-actions">
          <button className="svm-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="svm-btn-suspend">Suspend</button>
        </div>

      </div>
    </div>
  );
}
