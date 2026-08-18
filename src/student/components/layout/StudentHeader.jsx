import logoImg from '../../../assets/images/logo.jpg';
import './studentlayout.css';

export default function StudentHeader({ onMenuClick }) {
  return (
    <header className="stdnt-header">
      <button className="stdnt-header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div className="stdnt-header-logo-mobile">
        <img src={logoImg} alt="Pschool" className="stdnt-header-logo-img" />
      </div>
      <div className="stdnt-header-spacer" />
      <button className="stdnt-header-icon-btn" aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
        <span className="stdnt-notif-badge" />
      </button>
      <div className="stdnt-header-user">
        <div className="stdnt-header-avatar">
          <span className="stdnt-header-avatar-letter">A</span>
        </div>
        <div className="stdnt-header-user-info">
          <div className="stdnt-header-user-name">Aarav Patel</div>
          <div className="stdnt-header-user-role">Student</div>
        </div>
      </div>
    </header>
  );
}
