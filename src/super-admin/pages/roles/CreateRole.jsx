import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './rolemanagement.css';

/* ── Permissions list ── */
const PERMISSIONS = [
  { key: 'view-courses',    label: 'View Courses',    default: true  },
  { key: 'manage-students', label: 'Manage Students', default: true  },
  { key: 'access-billing',  label: 'Access Billing',  default: false },
  { key: 'access-labs',     label: 'Access Labs',     default: true  },
  { key: 'view-analytics',  label: 'View Analytics',  default: true  },
  { key: 'system-settings', label: 'System Settings', default: true  },
];

const ROLE_OPTIONS = ['Super Admin', 'Institute Admin', 'Instructor', 'Parent', 'Support'];

/* ── Custom Dropdown ── */
function RoleDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="cr-dropdown" ref={ref}>
      <button
        type="button"
        className={`cr-dropdown-trigger${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? '' : 'cr-placeholder'}>{value || 'Role'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round"
          className={`cr-chevron${open ? ' up' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="cr-dropdown-panel">
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`cr-dropdown-option${value === opt ? ' selected' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Toggle ── */
function Toggle({ checked, onChange, label }) {
  return (
    <label className="rm-toggle" aria-label={label}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="rm-toggle-slider" />
    </label>
  );
}

/* ── Main page ── */
export default function CreateRole() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('Instructor');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [perms, setPerms] = useState(
    Object.fromEntries(PERMISSIONS.map((p) => [p.key, p.default]))
  );

  const togglePerm = (key) =>
    setPerms((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    navigate('/dashboard/role-management');
  };

  return (
    <div className="cr-page">

      {/* ── Page header ── */}
      <div className="cr-page-header">
        <div className="cr-header-left">
          <button
            className="cr-back-btn"
            onClick={() => navigate('/dashboard/role-management')}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="cr-page-title">Create Role</h1>
        </div>
        <span className="cr-breadcrumb">Role Management &rsaquo; Create Role</span>
      </div>

      {/* ── Body ── */}
      <div className="cr-body">
        <form onSubmit={handleSubmit} noValidate>

          {/* Two-column row: Full Name + Email */}
          <div className="cr-form-row">
            <div className="cr-form-group">
              <label className="cr-label" htmlFor="cr-fullname">Full Name</label>
              <input
                id="cr-fullname"
                className="cr-input"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="cr-form-group">
              <label className="cr-label" htmlFor="cr-email">Email Address</label>
              <input
                id="cr-email"
                className="cr-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Role dropdown */}
          <div className="cr-form-group cr-form-group-half">
            <label className="cr-label">Role</label>
            <RoleDropdown value={role} onChange={setRole} />
          </div>

          {/* Give Permission section */}
          <div className="cr-permissions-section">
            <h2 className="cr-permissions-title">Give Permission</h2>

            <div className="cr-permissions-table">
              {/* Header */}
              <div className="cr-perm-header">
                <span className="cr-perm-col-label">Permission</span>
                <span className="cr-perm-col-status">Status</span>
              </div>

              {/* Rows */}
              {PERMISSIONS.map((perm) => (
                <div key={perm.key} className="cr-perm-row">
                  <span className="cr-perm-name">{perm.label}</span>
                  <Toggle
                    checked={perms[perm.key]}
                    onChange={() => togglePerm(perm.key)}
                    label={perm.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="cr-actions">
            <button
              type="button"
              className="cr-btn-cancel"
              onClick={() => navigate('/dashboard/role-management')}
            >
              Cancel
            </button>
            <button type="submit" className="cr-btn-submit">
              Send Login Credentials
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
