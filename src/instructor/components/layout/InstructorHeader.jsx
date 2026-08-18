import logoImg from '../../../assets/images/logo.jpg';
import './instructorlayout.css';

export default function InstructorHeader({ onMenuClick }) {
  return (
    <header className="instr-header">
      {/* Mobile menu button */}
      <button className="instr-header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <line x1="3" y1="6"  x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile logo */}
      <div className="instr-header-logo-mobile">
        <img src={logoImg} alt="Pschool" className="instr-header-logo-img" />
      </div>

      <div className="instr-header-spacer" />

      {/* Notification bell */}
      <button className="instr-header-icon-btn" aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        <span className="instr-notif-badge" />
      </button>

      {/* User chip */}
      <div className="instr-header-user">
        <div className="instr-header-avatar">
          <span className="instr-header-avatar-letter">A</span>
        </div>
        <div className="instr-header-user-info">
          <div className="instr-header-user-name">Abhay</div>
          <div className="instr-header-user-role">Instructor</div>
        </div>
      </div>
    </header>
  );
}
