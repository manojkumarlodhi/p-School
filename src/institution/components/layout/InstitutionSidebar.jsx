import { NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.jpg';
import './institutionlayout.css';

/* ── Icon helper ── */
const Icon = ({ d, d2 }) => (
  <svg className="inst-nav-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
    {d2 && <path d={d2}/>}
  </svg>
);

/* ── Certificate icon (special) ── */
function CertIcon() {
  return (
    <svg className="inst-nav-icon" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <circle cx="12" cy="15" r="2"/>
      <path d="M10 20l2-2 2 2"/>
    </svg>
  );
}

const ICONS = {
  dashboard:    'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  student:      'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  instructor:   'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z',
  verify:       'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  course:       'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  classes:      'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  assignments:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  lab:          'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  roles:        'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z',
  reports:      'M18 20V10M12 20V4M6 20v-6',
  sub:          'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  profile:      'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  bell:         'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  signout:      'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
};

const NAV = [
  { label: 'Dashboard',            path: '/institution/dashboard',              icon: 'dashboard'   },
  { label: 'Student',              path: '/institution/dashboard/students',     icon: 'student'     },
  { label: 'Instructor',           path: '/institution/dashboard/instructors',  icon: 'instructor'  },
  { label: 'Verification Request', path: '/institution/dashboard/verification', icon: 'verify'      },
  { label: 'Course Management',    path: '/institution/dashboard/courses',      icon: 'course'      },
  { label: 'Classes',              path: '/institution/dashboard/classes',      icon: 'classes'     },
  { label: 'Assignments',          path: '/institution/dashboard/assignments',  icon: 'assignments' },
  { label: 'Virtual Lab',          path: '/institution/dashboard/virtuallab',   icon: 'lab'         },
  { label: 'Sub-Admin Roles',      path: '/institution/dashboard/roles',        icon: 'roles'       },
  { label: 'Subscription plan',    path: '/institution/dashboard/subscription', icon: 'sub'         },
  { label: 'Reports',              path: '/institution/dashboard/reports',      icon: 'reports'     },
  { label: 'Certificates',         path: '/institution/dashboard/certificates', icon: 'cert'        },
];

export default function InstitutionSidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleSignOut() {
    onClose?.();
    navigate('/login');
  }

  return (
    <aside className={`inst-sidebar${open ? ' open' : ''}`}>

      {/* Logo */}
      <div className="inst-sidebar-logo">
        <img src={logoImg} alt="Pschool" className="inst-sidebar-logo-img"/>
      </div>

      {/* Nav */}
      <nav className="inst-sidebar-nav">
        {NAV.map((item) =>
          item.icon === 'cert' ? (
            <NavLink key={item.path} to={item.path}
              className={({ isActive }) => `inst-nav-item${isActive ? ' active' : ''}`}
              onClick={onClose}>
              <CertIcon/>
              <span>{item.label}</span>
            </NavLink>
          ) : (
            <NavLink key={item.path} to={item.path}
              end={item.path === '/institution/dashboard'}
              className={({ isActive }) => `inst-nav-item${isActive ? ' active' : ''}`}
              onClick={onClose}>
              <Icon d={ICONS[item.icon]}/>
              <span>{item.label}</span>
            </NavLink>
          )
        )}

        {/* Sign out */}
        <div className="inst-nav-item inst-nav-signout"
          onClick={handleSignOut} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleSignOut()}>
          <Icon d={ICONS.signout}/>
          <span>Sign out</span>
        </div>
      </nav>

    </aside>
  );
}
