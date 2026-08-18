import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstitutionAuthLayout from './InstitutionAuthLayout';

export default function InstitutionForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/institution/verify-email');
  }

  return (
    <InstitutionAuthLayout>
      <h1 className="inst-auth-heading">Reset Your Password</h1>
      <p className="inst-auth-subheading">
        Enter your registered email to receive a reset Send OTP.
      </p>

      <form className="inst-auth-form" onSubmit={handleSubmit} noValidate>
        <div className="inst-auth-form-group">
          <label className="inst-auth-label" htmlFor="inst-forgot-email">Email Address</label>
          <input id="inst-forgot-email" className="inst-auth-input" type="email"
            placeholder="admin@pschool.com"
            value={email} onChange={e => setEmail(e.target.value)}
            autoComplete="email" required/>
        </div>

        <button type="submit" className="inst-auth-btn">Send OTP</button>
      </form>

      <p className="inst-auth-footer-text">
        Need help? <Link to="#" className="inst-auth-link">Contact Support</Link>
      </p>
    </InstitutionAuthLayout>
  );
}
