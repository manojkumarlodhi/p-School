import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
           a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243
           M9.878 9.878l4.242 4.242M3 3l18 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
           -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export default function CreateNewPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    console.log('Password updated:', form.newPassword);
  };

  return (
    <AuthLayout>
      <h1 className="auth-heading">Create New Password</h1>
      <p className="auth-subheading">
        Set a new login password for your account
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* New Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="new-password">
            New Password
          </label>
          <div className="form-input-wrapper">
            <input
              id="new-password"
              className="form-input"
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="input-icon-btn"
              onClick={() => setShowNew((v) => !v)}
              aria-label={showNew ? 'Hide password' : 'Show password'}
            >
              {showNew ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="form-input-wrapper">
            <input
              id="confirm-password"
              className="form-input"
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="input-icon-btn"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontSize: 12, marginTop: -4 }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>

      <p className="auth-footer-text">
        Need help?{' '}
        <Link to="#" className="form-link">Contact Support</Link>
      </p>
    </AuthLayout>
  );
}
