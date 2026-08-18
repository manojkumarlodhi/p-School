import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../../../assets/images/logo.jpg';
import './individuallayout.css';

const Icon = ({ d }) => (
  <svg className="indiv-nav-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard:    'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  courses:      'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  assignments:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  announcements:'M3 11l19-9-9 19-2-8-8-2z',
  messages:     'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  wallet:       'M21 12V7H5a2 2 0 010-4h14v4M21 12a2 2 0 010 4H5a2 2 0 010-4h16z',
  profile:      'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  signout:      'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
};

const NAV = [
  { label: 'Dashboard',     path: '/instructor/individual/dashboard',                     icon: 'dashboard'     },
  { label: 'Courses',       path: '/instructor/individual/dashboard/courses',             icon: 'courses'       },
  { label: 'Assignments',   path: '/instructor/individual/dashboard/assignments',         icon: 'assignments'   },
  { label: 'Announcements', path: '/instructor/individual/dashboard/announcements',       icon: 'announcements' },
  { label: 'Messages',      path: '/instructor/individual/dashboard/messages',            icon: 'messages'      },
  { label: 'Wallet',        path: '/instructor/individual/dashboard/wallet',              icon: 'wallet'        },
  { label: 'Profile',       path: '/instructor/individual/dashboard/profile',             icon: 'profile'       },
];

export default function IndividualSidebar({ open, onClose }) {
  const navigate = useNavigate();
  return (
    <aside className={`indiv-sidebar${open ? ' open' : ''}`}>
      <div className="indiv-sidebar-logo">
        <img src={logoImg} alt="Pschool" className="indiv-sidebar-logo-img" />
      </div>
      <nav className="indiv-sidebar-nav">
        {NAV.map(item => (
          <NavLink key={item.path} to={item.path}
            end={item.path === '/instructor/individual/dashboard'}
            className={({ isActive }) => `indiv-nav-item${isActive ? ' active' : ''}`}
            onClick={onClose}>
            <Icon d={ICONS[item.icon]} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <div className="indiv-nav-item indiv-nav-signout"
          onClick={() => { onClose?.(); navigate('/instructor'); }}
          role="button" tabIndex={0}>
          <Icon d={ICONS.signout} />
          <span>Sign out</span>
        </div>
      </nav>
    </aside>
  );
}
