import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';
import './profile.css';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="prof-modal-overlay" onClick={onCancel}>
      <div className="prof-modal" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </div>
        <h3 className="prof-modal-title">Logout</h3>
        <p className="prof-modal-sub">
          Are you sure want to Logout?<br />
          Thank you and see you again! ❤️
        </p>
        <div className="prof-modal-actions">
          <button className="prof-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="prof-modal-confirm" onClick={onConfirm}>Yes, Logout</button>
        </div>
      </div>
    </div>
  );
}

export default function InstructorProfile() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
    setShowLogout(false);
    navigate('/login');
  }

  return (
    <div className="prof-page">
      <div className="prof-page-header">
        <span />
        <span className="prof-page-title">Profile</span>
        <span />
      </div>

      {/* Avatar */}
      <div className="prof-avatar-section">
        <div className="prof-avatar">
          <img src={profileImg} alt="Aarav Patel" />
        </div>
        <h2 className="prof-name">Aarav Patel</h2>
        <p className="prof-email">aarav@school.com &rsaquo;</p>
        <button className="prof-edit-btn">
          <EditIcon /> Edit Profile
        </button>
      </div>

      {/* Preferences */}
      <div className="prof-section">
        <h3 className="prof-section-title">Preferences</h3>
        <div className="prof-menu-card">
          <button className="prof-menu-item">
            Change Password
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item">
            Notification Settings
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item">
            Language
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item">
            View Reports
            <span className="prof-menu-chevron">›</span>
          </button>
        </div>
      </div>

      {/* App Information */}
      <div className="prof-section">
        <h3 className="prof-section-title">App Information</h3>
        <div className="prof-menu-card">
          <button className="prof-menu-item"
            onClick={() => navigate('/instructor/dashboard/profile/about')}>
            About App
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item"
            onClick={() => navigate('/instructor/dashboard/profile/privacy')}>
            Privacy Policy
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item"
            onClick={() => navigate('/instructor/dashboard/profile/terms')}>
            Terms of Service
            <span className="prof-menu-chevron">›</span>
          </button>
          <button className="prof-menu-item">
            Help & Support
            <span className="prof-menu-chevron">›</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <button className="prof-logout-btn" onClick={() => setShowLogout(true)}>
        <LogoutIcon /> Logout
      </button>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
