import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoImg   from '../../../assets/images/logo.jpg';
import profileImg from '../../../assets/images/profile.png';

/* ── SVG icon helper ── */
const Icon = ({ d, d2, fill }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill={fill || 'none'}
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
    {d2 && <path d={d2} />}
  </svg>
);

const ICONS = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  users:     'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  course:    'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  verify:    'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  role:      'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z',
  settle:    'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2',
  shield:    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  revenue:   'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  sub:       'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  lab:       'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  institute: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z',
  bell:      'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
  signout:   'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
};

const NAV = [
  { label: 'Dashboard',             path: '/dashboard',                    icon: 'dashboard' },
  {
    label: 'User Management', icon: 'users', children: [
      { label: 'Student',      path: '/dashboard/students' },
      { label: 'Instructor',   path: '/dashboard/instructors' },
      { label: 'Institution',  path: '/dashboard/institutions' },
    ],
  },
  { label: 'Course Management',     path: '/dashboard/course-management',  icon: 'course' },
  { label: 'Course Verification',   path: '/dashboard/course-verification',icon: 'verify' },
  { label: 'Role Management',       path: '/dashboard/role-management',    icon: 'role' },
  { label: 'Settlements',           path: '/dashboard/settlement',         icon: 'settle' },
  { label: 'Verification Request',  path: '/dashboard/verification',       icon: 'shield' },
  { label: 'Revenue',               path: '/dashboard/revenue',            icon: 'revenue' },
  { label: 'Subscription plan',     path: '/dashboard/subscription-plan',  icon: 'sub' },
  { label: 'Virtual Lab Management',path: '/dashboard/virtuallab',         icon: 'lab' },
  { label: 'New Institute Requests',path: '/dashboard/institute-request',  icon: 'institute' },
  { label: 'Notifications Center',  path: '/dashboard/notification',       icon: 'bell' },
];

export default function Sidebar({ open, onClose }) {
  const [expanded, setExpanded] = useState({ 'User Management': true });
  const navigate = useNavigate();

  const toggle = (label) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleSignOut = () => { onClose?.(); navigate('/login'); };

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>

      {/* ── Logo ── */}
      <div className="sidebar-logo">
        <img src={logoImg} alt="Pschool" className="sidebar-logo-img" />
      </div>

      {/* ── Nav ── */}
      <nav className="sidebar-nav">
        {NAV.map((item) =>
          item.children ? (
            <div key={item.label}>
              {/* Parent row */}
              <div
                className={`nav-item${expanded[item.label] ? ' nav-parent-open' : ''}`}
                onClick={() => toggle(item.label)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggle(item.label)}
              >
                <Icon d={ICONS[item.icon]} />
                <span>{item.label}</span>
                <svg
                  className={`nav-chevron${expanded[item.label] ? ' open' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Children */}
              {expanded[item.label] && (
                <div className="nav-sub">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `nav-sub-item${isActive ? ' active' : ''}`
                      }
                      onClick={onClose}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <Icon d={ICONS[item.icon]} />
              <span>{item.label}</span>
            </NavLink>
          )
        )}

        {/* Sign out */}
        <div
          className="nav-item"
          onClick={handleSignOut}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSignOut()}
          style={{ marginTop: 4 }}
        >
          <Icon d={ICONS.signout} />
          <span>Sign out</span>
        </div>
      </nav>

      {/* ── Footer: Switch Dashboard ── */}
      <div className="sidebar-footer">
        <div className="sidebar-switch">
          <img src={profileImg} alt="P School" className="sidebar-switch-img" />
          <div className="sidebar-switch-info">
            <div className="sidebar-switch-label">Switch Dashboard</div>
            <div className="sidebar-switch-name">P School</div>
          </div>
          <svg className="sidebar-switch-arrow" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

    </aside>
  );
}
