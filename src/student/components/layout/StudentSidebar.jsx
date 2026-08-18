import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.jpg';
import './studentlayout.css';

const Icon = ({ d }) => (
  <svg className="stdnt-nav-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard:   'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  classes:     'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  assignments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  virtuallab:  'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  messages:    'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  profile:     'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  signout:     'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
};

const NAV = [
  { label: 'Dashboard',   path: '/student/dashboard',             icon: 'dashboard'   },
  { label: 'My Classes',  path: '/student/dashboard/classes',     icon: 'classes'     },
  { label: 'Assignments', path: '/student/dashboard/assignments', icon: 'assignments' },
  { label: 'Virtual Lab', path: '/student/dashboard/virtuallab',  icon: 'virtuallab'  },
  { label: 'Messages',    path: '/student/dashboard/messages',    icon: 'messages'    },
  { label: 'Profile',     path: '/student/dashboard/profile',     icon: 'profile'     },
];

export default function StudentSidebar({ open, onClose }) {
  const navigate = useNavigate();
  return (
    <aside className={`stdnt-sidebar${open ? ' open' : ''}`}>
      <div className="stdnt-sidebar-logo">
        <img src={logoImg} alt="Pschool" className="stdnt-sidebar-logo-img" />
      </div>
      <nav className="stdnt-sidebar-nav">
        {NAV.map(item => (
          <NavLink key={item.path} to={item.path}
            end={item.path === '/student/dashboard'}
            className={({ isActive }) => `stdnt-nav-item${isActive ? ' active' : ''}`}
            onClick={onClose}>
            <Icon d={ICONS[item.icon]} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <div className="stdnt-nav-item stdnt-nav-signout"
          onClick={() => { onClose?.(); navigate('/student/login'); }}
          role="button" tabIndex={0}>
          <Icon d={ICONS.signout} />
          <span>Sign out</span>
        </div>
      </nav>
    </aside>
  );
}
