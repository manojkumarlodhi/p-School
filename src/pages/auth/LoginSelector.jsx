import { useNavigate } from 'react-router-dom';
import './loginselector.css';

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M8 18h.01M12 6h.01" />
  </svg>
);

const TeacherIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const loginRoles = [
  {
    id: 'super-admin',
    title: 'Super Admin',
    description: 'Complete platform management and control',
    icon: <UserIcon />,
    path: '/login',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
  },
  {
    id: 'institution',
    title: 'Institution',
    description: 'Manage your school or training center',
    icon: <BuildingIcon />,
    path: '/institution/login',
    color: '#2563eb',
    bgColor: '#eff6ff',
  },
  {
    id: 'instructor',
    title: 'Instructor',
    description: 'Teach and manage your classes',
    icon: <TeacherIcon />,
    path: '/instructor/login',
    color: '#0891b2',
    bgColor: '#ecfeff',
  },
];

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="login-selector-page">
      <div className="login-selector-container">
        <div className="login-selector-header">
          <div className="login-selector-logo">P</div>
          <h1 className="login-selector-title">Welcome to P-School</h1>
          <p className="login-selector-subtitle">
            Select your role to continue to your dashboard
          </p>
        </div>

        <div className="login-selector-grid">
          {loginRoles.map((role) => (
            <button
              key={role.id}
              className="login-role-card"
              onClick={() => navigate(role.path)}
              style={{
                '--role-color': role.color,
                '--role-bg': role.bgColor,
              }}
            >
              <div className="login-role-icon">{role.icon}</div>
              <h3 className="login-role-title">{role.title}</h3>
              <p className="login-role-description">{role.description}</p>
              <div className="login-role-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="login-selector-footer">
          <p className="login-selector-help">
            Need help? <a href="#">Contact Support</a>
          </p>
          <p className="login-selector-terms">
            By continuing, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
