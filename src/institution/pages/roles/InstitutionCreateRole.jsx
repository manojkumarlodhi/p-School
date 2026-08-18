import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionroles.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const ChevronDown = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>);
const ChevronUp = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>);

const ROLE_OPTIONS = [
  'Academic Coordinator',
  'Teacher Manager',
  'Student Administrator',
  'Finance Officer',
  'Tech Support',
];

export default function InstitutionCreateRole() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dropOpen, setDropOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/institution/dashboard/roles');
  }

  return (
    <div className="irl-page">
      <div className="irl-page-header">
        <button className="irl-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Create Role</span>
        </button>
        <span className="irl-breadcrumb">Role Management &rsaquo; Create Role</span>
      </div>

      <div className="irl-body">
        <div className="irl-create-card">
          <form onSubmit={handleSubmit}>

            {/* Full Name + Email */}
            <div className="irl-form-grid">
              <div className="irl-field">
                <label className="irl-label">Full Name</label>
                <input className="irl-input irl-input--active" placeholder="Full Name"
                  value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="irl-field">
                <label className="irl-label">Email Address</label>
                <input className="irl-input" type="email" placeholder="Email Address"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Select Role — custom dropdown */}
            <div className="irl-field" style={{ maxWidth: 400 }}>
              <label className="irl-label">Select Role</label>
              <div className="irl-custom-select" style={{ position: 'relative' }}>
                <button type="button" className="irl-select-btn"
                  onClick={() => setDropOpen(o => !o)}>
                  <span className={role ? '' : 'irl-placeholder'}>
                    {role || 'Select Role'}
                  </span>
                  {dropOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {dropOpen && (
                  <div className="irl-dropdown-list">
                    {ROLE_OPTIONS.map(opt => (
                      <div key={opt}
                        className={`irl-dropdown-item${role === opt ? ' selected' : ''}`}
                        onClick={() => { setRole(opt); setDropOpen(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="irl-form-actions">
              <button type="button" className="irl-btn-cancel"
                onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="irl-btn-save">Send Invite</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
