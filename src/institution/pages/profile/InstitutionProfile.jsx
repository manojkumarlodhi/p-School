import { useNavigate } from 'react-router-dom';
import highSchoolImg from '../../../assets/images/High-School.png';
import './institutionprofile.css';

/* ── Icons ── */
const BuildingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>
  </svg>
);
const UserCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const VerifiedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

export default function InstitutionProfile() {
  const navigate = useNavigate();

  return (
    <div className="iprof-page">

      {/* ── Page header ── */}
      <div className="iprof-page-header">
        <button className="iprof-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Profile</span>
        </button>
        <span className="iprof-breadcrumb">Dashboard &rsaquo; Profile</span>
      </div>

      <div className="iprof-body">

        {/* ── Profile card ── */}
        <div className="iprof-card">

          {/* Blue banner */}
          <div className="iprof-banner">
            <div className="iprof-logo-wrap">
              <img src={highSchoolImg} alt="Bright Future Academy" className="iprof-logo-img" />
            </div>
          </div>

          {/* Edit button */}
          <div className="iprof-edit-row">
            <button
              className="iprof-edit-btn"
              onClick={() => navigate('/institution/dashboard/profile/edit')}
            >
              <EditIcon />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Name + verified */}
          <div className="iprof-name-row">
            <h2 className="iprof-name">Bright Future Academy</h2>
            <span className="iprof-verified">
              <VerifiedIcon />
              <span>Verified</span>
            </span>
          </div>
          <div className="iprof-code-id">BFA-1023</div>

          {/* Info grid */}
          <div className="iprof-info-grid">

            <div className="iprof-info-item">
              <div className="iprof-info-icon"><BuildingIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Institution Name</div>
                <div className="iprof-info-value">Bright Future Academy</div>
              </div>
            </div>

            <div className="iprof-info-item">
              <div className="iprof-info-icon"><CodeIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Institute Code</div>
                <div className="iprof-info-value">BFA-1023</div>
              </div>
            </div>

            <div className="iprof-info-item">
              <div className="iprof-info-icon"><UserCheckIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Status</div>
                <div className="iprof-info-value">
                  <span className="iprof-status-badge">Active</span>
                </div>
              </div>
            </div>

            <div className="iprof-info-item">
              <div className="iprof-info-icon"><MailIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Email</div>
                <div className="iprof-info-value">admin@brightfuture.edu</div>
              </div>
            </div>

            <div className="iprof-info-item">
              <div className="iprof-info-icon"><PhoneIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Phone</div>
                <div className="iprof-info-value">+91 98765 43210</div>
              </div>
            </div>

            <div className="iprof-info-item iprof-info-item--wide">
              <div className="iprof-info-icon"><MapPinIcon /></div>
              <div className="iprof-info-content">
                <div className="iprof-info-label">Address</div>
                <div className="iprof-info-value">
                  2nd Floor, Knowledge Park, MG Road, Indore, MP – 452001
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
