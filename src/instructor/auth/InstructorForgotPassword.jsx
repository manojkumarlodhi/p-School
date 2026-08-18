import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

export default function InstructorForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('Abhaytests@gmail.com');

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Reset Password</h2>
        <p className="inauth-brand-sub">
          We'll send a verification code to your email to reset your password securely.
        </p>
      </div>

      {/* Right — form */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <button className="inauth-back-btn" onClick={() => navigate('/instructor/login')}>
            <BackIcon /> Back to Login
          </button>
          <h1 className="inauth-form-title">Reset your password</h1>
          <p className="inauth-form-sub">
            Enter your email and we'll send you a link to reset your password
          </p>
          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/verify-otp'); }}>
            <div className="inauth-field">
              <label className="inauth-label">Email</label>
              <input className="inauth-input" type="email" placeholder="Enter your email"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="inauth-btn">Send OTP</button>
          </form>
          <div className="inauth-terms-footer">
            <a href="#">Terms &amp; Condition</a> • <a href="#">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
