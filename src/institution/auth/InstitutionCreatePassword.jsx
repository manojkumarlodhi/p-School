import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstitutionAuthLayout from '../../institution/auth/InstitutionAuthLayout';

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  );
}

export default function InstitutionCreatePassword() {
  const navigate = useNavigate();
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm]               = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError]             = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    navigate('/institution/login');
  }

  return (
    <InstitutionAuthLayout>
      <div className="inst-auth-form-box">
        <h1 className="inst-auth-heading">Create New Password</h1>
        <p className="inst-auth-subheading">Set a new login password for your account</p>

        <form className="inst-auth-form" onSubmit={handleSubmit} noValidate>

          {/* New Password */}
          <div className="inst-auth-form-group">
            <label className="inst-auth-label" htmlFor="inst-new-pw">New Password</label>
            <div className="inst-auth-input-wrap">
              <input id="inst-new-pw" className="inst-auth-input"
                type={showNew ? 'text' : 'password'}
                name="newPassword" placeholder="New Password"
                value={form.newPassword} onChange={handleChange}
                autoComplete="new-password" required/>
              <button type="button" className="inst-auth-eye-btn"
                onClick={() => setShowNew(v => !v)}
                aria-label={showNew ? 'Hide' : 'Show'}>
                {showNew ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="inst-auth-form-group">
            <label className="inst-auth-label" htmlFor="inst-confirm-pw">Confirm Password</label>
            <div className="inst-auth-input-wrap">
              <input id="inst-confirm-pw" className="inst-auth-input"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword" placeholder="Confirm Password"
                value={form.confirmPassword} onChange={handleChange}
                autoComplete="new-password" required/>
              <button type="button" className="inst-auth-eye-btn"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? 'Hide' : 'Show'}>
                {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: 12, marginTop: -4 }}>{error}</p>
          )}

          <button type="submit" className="inst-auth-btn">Update Password</button>
        </form>

        <p className="inst-auth-footer-text">
          Need help? <Link to="#" className="inst-auth-link">Contact Support</Link>
        </p>
      </div>
    </InstitutionAuthLayout>
  );
}
