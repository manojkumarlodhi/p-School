import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';
import './adminprofile.css';

const ADMIN = {
  name: 'Abhay Thakur',
  email: 'admin@pschool.com',
  phone: '+91 98765 43210',
  role: 'Super Admin',
  joinDate: 'January 2023',
  location: 'New Delhi, India',
  bio: 'Experienced platform administrator managing the P-School EdTech ecosystem. Responsible for overseeing institutions, instructors, students, and overall platform operations.',
};

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

const STATS = [
  { label: 'Total Institutions', value: '24', color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Total Instructors',  value: '186', color: '#2563eb', bg: '#eff6ff' },
  { label: 'Total Students',     value: '3,420', color: '#059669', bg: '#f0fdf4' },
  { label: 'Active Courses',     value: '72', color: '#d97706', bg: '#fffbeb' },
];

export default function AdminProfile() {
  const navigate = useNavigate();
  const fileRef  = useRef();
  const [avatar, setAvatar]   = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({ ...ADMIN });
  const [saved, setSaved]     = useState({ ...ADMIN });

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    setSaved({ ...form });
    setEditing(false);
  }

  function handleCancel() {
    setForm({ ...saved });
    setEditing(false);
  }

  const info = editing ? form : saved;

  return (
    <div className="ap-page">

      {/* ── Page Header ── */}
      <div className="ap-page-header">
        <div className="ap-header-left">
          <button className="ap-back-btn" onClick={() => navigate(-1)} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="ap-page-title">My Profile</h1>
        </div>
        {!editing && (
          <button className="ap-edit-btn" onClick={() => setEditing(true)}>
            <EditIcon /> Edit Profile
          </button>
        )}
      </div>

      <div className="ap-body">

        {/* ── Left Column ── */}
        <div className="ap-left">

          {/* Avatar Card */}
          <div className="ap-avatar-card">
            <div className="ap-avatar-wrap">
              <img
                src={avatar || profileImg}
                alt={saved.name}
                className="ap-avatar-img"
              />
              <button
                className="ap-avatar-edit"
                onClick={() => fileRef.current.click()}
                title="Change photo"
              >
                <EditIcon />
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>
            <h2 className="ap-name">{saved.name}</h2>
            <span className="ap-role-badge">
              <ShieldIcon /> {saved.role}
            </span>
            <p className="ap-bio">{saved.bio}</p>
          </div>

          {/* Stats Card */}
          <div className="ap-stats-card">
            <h3 className="ap-stats-title">Platform Overview</h3>
            <div className="ap-stats-grid">
              {STATS.map(s => (
                <div key={s.label} className="ap-stat-item" style={{ '--stat-color': s.color, '--stat-bg': s.bg }}>
                  <div className="ap-stat-value">{s.value}</div>
                  <div className="ap-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Right Column ── */}
        <div className="ap-right">

          {/* Info Card */}
          <div className="ap-info-card">
            <h3 className="ap-info-title">Personal Information</h3>

            {editing ? (
              /* ── Edit Form ── */
              <div className="ap-form">
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label className="ap-form-label">Full Name</label>
                    <input className="ap-form-input" name="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="ap-form-group">
                    <label className="ap-form-label">Role</label>
                    <input className="ap-form-input" name="role" value={form.role} disabled />
                  </div>
                </div>
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label className="ap-form-label">Email Address</label>
                    <input className="ap-form-input" name="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="ap-form-group">
                    <label className="ap-form-label">Phone Number</label>
                    <input className="ap-form-input" name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label className="ap-form-label">Location</label>
                    <input className="ap-form-input" name="location" value={form.location} onChange={handleChange} />
                  </div>
                  <div className="ap-form-group">
                    <label className="ap-form-label">Joined</label>
                    <input className="ap-form-input" name="joinDate" value={form.joinDate} disabled />
                  </div>
                </div>
                <div className="ap-form-group">
                  <label className="ap-form-label">Bio</label>
                  <textarea className="ap-form-textarea" name="bio" value={form.bio} onChange={handleChange} rows={4} />
                </div>
                <div className="ap-form-actions">
                  <button className="ap-btn-cancel" onClick={handleCancel}>Cancel</button>
                  <button className="ap-btn-save" onClick={handleSave}>Save Changes</button>
                </div>
              </div>
            ) : (
              /* ── View Mode ── */
              <div className="ap-info-list">
                <div className="ap-info-item">
                  <span className="ap-info-icon"><UserIcon /></span>
                  <div>
                    <div className="ap-info-key">Full Name</div>
                    <div className="ap-info-val">{info.name}</div>
                  </div>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-icon"><MailIcon /></span>
                  <div>
                    <div className="ap-info-key">Email Address</div>
                    <div className="ap-info-val">{info.email}</div>
                  </div>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-icon"><PhoneIcon /></span>
                  <div>
                    <div className="ap-info-key">Phone Number</div>
                    <div className="ap-info-val">{info.phone}</div>
                  </div>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-icon"><LocationIcon /></span>
                  <div>
                    <div className="ap-info-key">Location</div>
                    <div className="ap-info-val">{info.location}</div>
                  </div>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-icon"><CalendarIcon /></span>
                  <div>
                    <div className="ap-info-key">Member Since</div>
                    <div className="ap-info-val">{info.joinDate}</div>
                  </div>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-icon"><ShieldIcon /></span>
                  <div>
                    <div className="ap-info-key">Role</div>
                    <div className="ap-info-val">{info.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Card */}
          <div className="ap-activity-card">
            <h3 className="ap-info-title">Recent Activity</h3>
            <div className="ap-activity-list">
              {[
                { text: 'Approved institution — Bright Future Academy', time: '2 hours ago', color: '#059669' },
                { text: 'Added new subscription plan — Institution Premium', time: '5 hours ago', color: '#2563eb' },
                { text: 'Verified instructor — Aarav Sharma', time: '1 day ago', color: '#7c3aed' },
                { text: 'Created new course category — Robotics', time: '2 days ago', color: '#d97706' },
                { text: 'Updated platform virtual lab settings', time: '3 days ago', color: '#0891b2' },
              ].map((a, i) => (
                <div key={i} className="ap-activity-item">
                  <span className="ap-activity-dot" style={{ background: a.color }} />
                  <div className="ap-activity-text">{a.text}</div>
                  <div className="ap-activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
