import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './individualprofile.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const EyeIcon = ({ show }) => show ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const BoltIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="#f59e0b"
    stroke="#f59e0b" strokeWidth={1}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`ip-toggle${checked ? ' on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="ip-toggle-thumb" />
    </button>
  );
}

/* ── Legal content ── */
const LEGAL_SECTIONS = [
  { title: '1. Acceptance of Terms', text: 'By accessing and using P-SCHOOL, you accept and agree to be bound by the terms and provision of this agreement.' },
  { title: '2. Use License', text: 'Permission is granted to temporarily download one copy of the materials on P-SCHOOL for personal, non-commercial transitory viewing only.' },
  { title: '3. Disclaimer', text: "The materials on P-SCHOOL are provided on an 'as is' basis. P-SCHOOL makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights." },
  { title: '4. Limitations', text: 'In no event shall P-SCHOOL or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on P-SCHOOL.' },
  { title: '5. Accuracy of Materials', text: 'The materials appearing on P-SCHOOL could include technical, typographical, or photographic errors. P-SCHOOL does not warrant that any of the materials on P-SCHOOL are accurate, complete, or current.' },
];

const PAGE_TITLES = { about: 'About App', privacy: 'Privacy Policy', terms: 'Terms of Service' };

/* ── Static Page (About / Privacy / Terms) ── */
function StaticPage({ title }) {
  const navigate = useNavigate();
  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">{title}</h1>
      </div>
      <div className="ip-sub-card">
        {LEGAL_SECTIONS.map(s => (
          <div key={s.title} className="ip-legal-section">
            <h3 className="ip-legal-title">{s.title}</h3>
            <p className="ip-legal-text">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Notification Settings ── */
function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    push:        true,
    email:       true,
    assignment1: true,
    assignment2: true,
    assignment3: true,
    assignment4: true,
  });
  const toggle = key => setSettings(s => ({ ...s, [key]: !s[key] }));

  const ITEMS = [
    { key: 'push',        label: 'Push Notifications',   sub: 'Receive push notifications' },
    { key: 'email',       label: 'Email Notifications',  sub: 'Get updates via email' },
    { key: 'assignment1', label: 'Assignment Reminders',  sub: 'Deadline reminders' },
    { key: 'assignment2', label: 'Assignment Reminders',  sub: 'Deadline reminders' },
    { key: 'assignment3', label: 'Assignment Reminders',  sub: 'Deadline reminders' },
    { key: 'assignment4', label: 'Assignment Reminders',  sub: 'Deadline reminders' },
  ];

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Notification Settings</h1>
      </div>
      <div className="ip-sub-card">
        {ITEMS.map(item => (
          <div key={item.key} className="ip-notif-row">
            <div>
              <div className="ip-notif-label">{item.label}</div>
              <div className="ip-notif-sub">{item.sub}</div>
            </div>
            <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Language ── */
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
];

function LanguagePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('en');

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Select Language</h1>
      </div>
      <div className="ip-sub-card">
        {LANGUAGES.map(lang => (
          <button key={lang.code}
            className={`ip-lang-item${selected === lang.code ? ' selected' : ''}`}
            onClick={() => setSelected(lang.code)}>
            <span>{lang.label}</span>
            {selected === lang.code && (
              <div className="ip-lang-check"><CheckIcon /></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Change Password ── */
function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleShow = k => setShow(s => ({ ...s, [k]: !s[k] }));

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Change Password</h1>
      </div>
      <div className="ip-sub-card">
        <div className="ip-pw-field">
          <label className="ip-pw-label">Current Password</label>
          <div className="ip-pw-input-wrap">
            <input className="ip-pw-input"
              type={show.current ? 'text' : 'password'}
              placeholder="Current Password"
              value={form.current} onChange={e => set('current', e.target.value)} />
            <button className="ip-pw-eye" onClick={() => toggleShow('current')}>
              <EyeIcon show={show.current} />
            </button>
          </div>
        </div>
        <div className="ip-pw-field">
          <label className="ip-pw-label">New Password</label>
          <div className="ip-pw-input-wrap">
            <input className="ip-pw-input"
              type={show.newPass ? 'text' : 'password'}
              placeholder="New Password"
              value={form.newPass} onChange={e => set('newPass', e.target.value)} />
            <button className="ip-pw-eye" onClick={() => toggleShow('newPass')}>
              <EyeIcon show={show.newPass} />
            </button>
          </div>
        </div>
        <div className="ip-pw-field">
          <label className="ip-pw-label">Confirm New Password</label>
          <div className="ip-pw-input-wrap">
            <input className="ip-pw-input"
              type={show.confirm ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={form.confirm} onChange={e => set('confirm', e.target.value)} />
            <button className="ip-pw-eye" onClick={() => toggleShow('confirm')}>
              <EyeIcon show={show.confirm} />
            </button>
          </div>
        </div>
        <button className="ip-pw-forgot"
          onClick={() => navigate('/instructor/individual/dashboard/profile/forgot-password')}>
          Forgot Password?
        </button>
        <button className="ip-pw-submit-btn" onClick={() => navigate(-1)}>
          Update Password
        </button>
      </div>
    </div>
  );
}

/* ── Forgot Password ── */
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('Abhaytest@gmail.com');

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Forgot Password</h1>
      </div>
      <div className="ip-sub-card">
        <div className="ip-pw-field">
          <label className="ip-pw-label">Enter Email / Mobile</label>
          <input className="ip-pw-input focused"
            placeholder="Enter Email / Mobile"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button className="ip-pw-submit-btn"
          onClick={() => navigate('/instructor/individual/dashboard/profile/verify-otp')}>
          Send OTP
        </button>
      </div>
    </div>
  );
}

/* ── Receive OTP ── */
function ReceiveOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['6', '', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  function handleChange(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 4) refs[i + 1].current?.focus();
  }
  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus();
  }

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Receive OTP</h1>
      </div>
      <div className="ip-sub-card">
        <div className="ip-pw-field">
          <label className="ip-pw-label">Verification Code</label>
          <div className="ip-otp-row">
            {otp.map((v, i) => (
              <input key={i} ref={refs[i]}
                className="ip-otp-box"
                maxLength={1} value={v}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)} />
            ))}
          </div>
        </div>
        <button className="ip-pw-submit-btn"
          onClick={() => navigate('/instructor/individual/dashboard/profile/create-password')}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

/* ── Create New Password ── */
function CreateNewPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPass: '', confirm: '' });
  const [show, setShow] = useState({ newPass: false, confirm: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleShow = k => setShow(s => ({ ...s, [k]: !s[k] }));

  return (
    <div className="ip-sub-page">
      <div className="ip-sub-header">
        <button className="ip-sub-back" onClick={() => navigate(-1)}><BackIcon /></button>
        <h1 className="ip-sub-title">Create New Password</h1>
      </div>
      <div className="ip-sub-card">
        <div className="ip-pw-field">
          <label className="ip-pw-label">New Password</label>
          <div className="ip-pw-input-wrap">
            <input className="ip-pw-input"
              type={show.newPass ? 'text' : 'password'}
              placeholder="New Password"
              value={form.newPass} onChange={e => set('newPass', e.target.value)} />
            <button className="ip-pw-eye" onClick={() => toggleShow('newPass')}>
              <EyeIcon show={show.newPass} />
            </button>
          </div>
        </div>
        <div className="ip-pw-field">
          <label className="ip-pw-label">Confirm New Password</label>
          <div className="ip-pw-input-wrap">
            <input className="ip-pw-input"
              type={show.confirm ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={form.confirm} onChange={e => set('confirm', e.target.value)} />
            <button className="ip-pw-eye" onClick={() => toggleShow('confirm')}>
              <EyeIcon show={show.confirm} />
            </button>
          </div>
        </div>
        <div className="ip-pw-actions">
          <button className="ip-pw-cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
          <button className="ip-pw-submit-btn flex1"
            onClick={() => navigate('/instructor/individual/dashboard/profile')}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Pro Instructor Plan (Upgrade) ── */
const PRO_FEATURES = [
  'Unlimited courses',
  'Basic analytics',
  'Standard support (72h)',
  'Everything in Free',
  'Engagement & drop-off analytics',
  'Demographic insights',
  'Marketing tools',
  'Priority support',
  'Early access tools',
];

function UpgradePage() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="ip-sub-page ip-upgrade-page">
      <div className="ip-upgrade-hero">
        <div className="ip-upgrade-bolt"><BoltIcon /></div>
        <h1 className="ip-upgrade-title">Pro Instructor Plan</h1>
        <p className="ip-upgrade-sub">Choose the plan that supports your teaching goals.</p>
      </div>

      <div className="ip-upgrade-card">
        <h3 className="ip-upgrade-features-title">What you get</h3>
        <ul className="ip-upgrade-features">
          {PRO_FEATURES.map(f => (
            <li key={f} className="ip-upgrade-feature">
              <span className="ip-upgrade-feature-dot" />
              {f}
            </li>
          ))}
        </ul>

        {/* Billing toggle */}
        <div className="ip-billing-row">
          <button
            className={`ip-billing-option${billing === 'monthly' ? ' selected' : ''}`}
            onClick={() => setBilling('monthly')}>
            <div className="ip-billing-radio">
              <div className={`ip-billing-radio-inner${billing === 'monthly' ? ' on' : ''}`} />
            </div>
            <div>
              <div className="ip-billing-label">Monthly</div>
              <div className="ip-billing-price">$100 <span>/ month</span></div>
            </div>
          </button>
          <button
            className={`ip-billing-option${billing === 'yearly' ? ' selected' : ''}`}
            onClick={() => setBilling('yearly')}>
            <div className="ip-billing-radio">
              <div className={`ip-billing-radio-inner${billing === 'yearly' ? ' on' : ''}`} />
            </div>
            <div>
              <div className="ip-billing-label">Yearly</div>
              <div className="ip-billing-price">$800 <span>/ year</span></div>
            </div>
          </button>
        </div>

        <button className="ip-upgrade-submit-btn">Upgrade to Pro</button>
      </div>
    </div>
  );
}

/* ── Router ── */
export default function IndividualProfileSubPages() {
  const { subPage } = useParams();

  if (subPage === 'notifications')    return <NotificationSettings />;
  if (subPage === 'language')         return <LanguagePage />;
  if (subPage === 'change-password')  return <ChangePassword />;
  if (subPage === 'forgot-password')  return <ForgotPassword />;
  if (subPage === 'verify-otp')       return <ReceiveOTP />;
  if (subPage === 'create-password')  return <CreateNewPassword />;
  if (subPage === 'upgrade')          return <UpgradePage />;
  if (PAGE_TITLES[subPage])           return <StaticPage title={PAGE_TITLES[subPage]} />;

  // fallback
  return <StaticPage title="About App" />;
}
