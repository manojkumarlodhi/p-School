import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.jpg';
import './instructorlayout.css';

const Icon = ({ d, d2 }) => (
  <svg className="instr-nav-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
    {d2 && <path d={d2} />}
  </svg>
);

const ICONS = {
  dashboard:   'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  classes:     'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z',
  assignments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  resources:   'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  virtuallab:  'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  messages:    'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  notification:'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  profile:     'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  signout:     'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
};

const NAV = [
  { label: 'Dashboard',    path: '/instructor/dashboard',                icon: 'dashboard'    },
  { label: 'My Classes',   path: '/instructor/dashboard/classes',        icon: 'classes'      },
  { label: 'Assignments',  path: '/instructor/dashboard/assignments',    icon: 'assignments'  },
  { label: 'Resources',    path: '/instructor/dashboard/resources',      icon: 'resources'    },
  { label: 'Virtual Lab',  path: '/instructor/dashboard/virtuallab',     icon: 'virtuallab'   },
  { label: 'Messages',     path: '/instructor/dashboard/messages',       icon: 'messages'     },
  { label: 'Notification', path: '/instructor/dashboard/notification',   icon: 'notification' },
  { label: 'Profile',      path: '/instructor/dashboard/profile',        icon: 'profile'      },
];

export default function InstructorSidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleSignOut() {
    onClose?.();
    navigate('/login');
  }

  return (
    <aside className={`instr-sidebar${open ? ' open' : ''}`}>
      <div className="instr-sidebar-logo">
        <img src={logoImg} alt="Pschool" className="instr-sidebar-logo-img" />
      </div>

      <nav className="instr-sidebar-nav">
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/instructor/dashboard'}
            className={({ isActive }) => `instr-nav-item${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <Icon d={ICONS[item.icon]} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div
          className="instr-nav-item instr-nav-signout"
          onClick={handleSignOut}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleSignOut()}
        >
          <Icon d={ICONS.signout} />
          <span>Sign out</span>
        </div>
      </nav>
    </aside>
  );
}
