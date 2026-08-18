import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../../assets/images/profile.png';
import './individualprofile.css';

/* ── Icons ── */
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"
    stroke="#f59e0b" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Logout Modal ── */
function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="ip-modal-overlay" onClick={onCancel}>
      <div className="ip-modal" onClick={e => e.stopPropagation()}>
        <div className="ip-modal-icon logout">
          <LogoutIcon />
        </div>
        <h3 className="ip-modal-title logout">Logout</h3>
        <p className="ip-modal-sub">
          Are you sure want to Logout?<br />
          Thank you and see you again! ❤️
        </p>
        <div className="ip-modal-actions">
          <button className="ip-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="ip-modal-confirm" onClick={onConfirm}>Yes, Logout</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Profile ── */
export default function IndividualProfile() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const PREFERENCES = [
    { label: 'Documents Status', sub: 'All Verified ✓', subColor: '#22c55e', path: 'documents' },
    { label: 'Change Password',      path: 'change-password' },
    { label: 'Notification Settings', path: 'notifications'  },
    { label: 'Language',              path: 'language'        },
    { label: 'View Reports',          path: 'reports'         },
  ];

  const APP_INFO = [
    { label: 'About App',      path: 'about'   },
    { label: 'Privacy Policy', path: 'privacy' },
    { label: 'Terms of Service', path: 'terms' },
    { label: 'Help & Support', path: 'support' },
  ];

  return (
    <div className="ip-page">
      {/* Two-column layout */}
      <div className="ip-layout">

        {/* ── Left: Profile card ── */}
        <div className="ip-left">
          <div className="ip-profile-card">
            {/* Header */}
            <div className="ip-card-header">
              <h1 className="ip-card-title">Profile</h1>
              <button className="ip-upgrade-btn"
                onClick={() => navigate('/instructor/individual/dashboard/profile/upgrade')}>
                <StarIcon /> Upgrade now
              </button>
            </div>

            {/* Avatar */}
            <div className="ip-avatar-section">
              <div className="ip-avatar">
                <img src={profileImg} alt="Aarav Patel" />
              </div>
              <h2 className="ip-name">Aarav Patel</h2>
              <p className="ip-email">aarav@school.com ›</p>
              <button className="ip-edit-btn"
                onClick={() => navigate('/instructor/individual/dashboard/profile/edit')}>
                <EditIcon /> Edit Profile
              </button>
            </div>

            {/* Preferences */}
            <div className="ip-section">
              <h3 className="ip-section-title">Preferences</h3>
              <div className="ip-menu-card">
                {PREFERENCES.map(item => (
                  <button key={item.label} className="ip-menu-item"
                    onClick={() => navigate(`/instructor/individual/dashboard/profile/${item.path}`)}>
                    <div className="ip-menu-item-left">
                      <span className="ip-menu-label">{item.label}</span>
                      {item.sub && (
                        <span className="ip-menu-sub" style={{ color: item.subColor }}>
                          {item.sub}
                        </span>
                      )}
                    </div>
                    <ChevronIcon />
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="ip-section">
              <h3 className="ip-section-title">Language</h3>
              <p className="ip-section-sub">Select Language</p>
              <div className="ip-menu-card">
                <button className="ip-menu-item"
                  onClick={() => navigate('/instructor/individual/dashboard/profile/language')}>
                  <span className="ip-menu-label">English</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* App Information */}
            <div className="ip-section">
              <h3 className="ip-section-title">App Information</h3>
              <div className="ip-menu-card">
                {APP_INFO.map(item => (
                  <button key={item.label} className="ip-menu-item"
                    onClick={() => navigate(`/instructor/individual/dashboard/profile/${item.path}`)}>
                    <span className="ip-menu-label">{item.label}</span>
                    <ChevronIcon />
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <button className="ip-logout-btn" onClick={() => setShowLogout(true)}>
              <LogoutIcon /> Logout
            </button>
          </div>
        </div>

        {/* ── Right: Quick info panel ── */}
        <div className="ip-right">
          <div className="ip-info-card">
            <div className="ip-info-avatar">
              <img src={profileImg} alt="Aarav Patel" />
            </div>
            <h2 className="ip-info-name">Aarav Patel</h2>
            <p className="ip-info-role">Individual Instructor</p>
            <p className="ip-info-email">aarav@school.com</p>

            <div className="ip-info-stats">
              <div className="ip-info-stat">
                <div className="ip-info-stat-value">1,284</div>
                <div className="ip-info-stat-label">Students</div>
              </div>
              <div className="ip-info-stat-divider" />
              <div className="ip-info-stat">
                <div className="ip-info-stat-value">18</div>
                <div className="ip-info-stat-label">Courses</div>
              </div>
              <div className="ip-info-stat-divider" />
              <div className="ip-info-stat">
                <div className="ip-info-stat-value">4.8</div>
                <div className="ip-info-stat-label">Rating</div>
              </div>
            </div>

            <button className="ip-upgrade-card-btn"
              onClick={() => navigate('/instructor/individual/dashboard/profile/upgrade')}>
              <StarIcon /> Upgrade to Pro
            </button>
          </div>
        </div>

      </div>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={() => { setShowLogout(false); navigate('/instructor'); }}
        />
      )}
    </div>
  );
}
