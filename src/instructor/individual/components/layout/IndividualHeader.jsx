import logoImg from '../../../../assets/images/logo.jpg';
import './individuallayout.css';

export default function IndividualHeader({ onMenuClick, onNotifClick, hasUnread }) {
  return (
    <header className="indiv-header">
      <button className="indiv-header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div className="indiv-header-logo-mobile">
        <img src={logoImg} alt="Pschool" className="indiv-header-logo-img" />
      </div>

      <div className="indiv-header-spacer" />

      {/* Bell — opens notification drawer */}
      <button
        className="indiv-header-icon-btn"    
        aria-label="Notifications"
        onClick={onNotifClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
        {hasUnread && <span className="indiv-notif-badge" />}
      </button>

      <div className="indiv-header-user">
        <div className="indiv-header-avatar">
          <span className="indiv-header-avatar-letter">A</span>
        </div>
        <div className="indiv-header-user-info">
          <div className="indiv-header-user-name">Abhay</div>
          <div className="indiv-header-user-role">Individual Instructor</div>
        </div>
      </div>
    </header>
  );
}
