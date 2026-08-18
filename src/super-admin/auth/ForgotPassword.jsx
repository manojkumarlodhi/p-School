import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Send OTP to:', email);
  };

  return (
    <AuthLayout>
      <h1 className="auth-heading">Reset Your Password</h1>
      <p className="auth-subheading">
        Enter your registered email to receive a reset Send OTP.
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="forgot-email">
            Email Address
          </label>
          <input
            id="forgot-email"
            className="form-input"
            type="email"
            placeholder="admin@pschool.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Send OTP
        </button>
      </form>

      <p className="auth-footer-text">
        Need help?{' '}
        <Link to="#" className="form-link">Contact Support</Link>
      </p>
    </AuthLayout>
  );
}
