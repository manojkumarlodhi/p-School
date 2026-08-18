import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* Step 1 of 3 */
function StepBar({ step = 1, total = 3 }) {
  return (
    <div className="sreg-step-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sreg-step-seg${i < step ? ' active' : ''}`} />
      ))}
    </div>
  );
}

/* Calculate age from date string */
function calcAge(dob) {
  if (!dob) return 20;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function StudentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: 'Aarav Sharma',
    email: 'abhay.Test@gmail.com',
    phone: '99116664497',
    dob: '',
    agree: false,
  });
  const [showDob, setShowDob] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handleContinue(e) {
    e.preventDefault();
    const age = calcAge(form.dob);
    // Pass age to OTP page so it can route correctly after verification
    navigate('/student/register/verify-otp', { state: { age, dob: form.dob } });
  }

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Join P-School</h2>
        <p className="inauth-brand-sub">
          Create your student account and start exploring STEM courses, virtual labs, and smart progress tracking.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">STEM Courses</span>
          <span className="inauth-brand-tag">Virtual Labs</span>
          <span className="inauth-brand-tag">Smart Progress</span>
        </div>
      </div>

      {/* Right — form */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={1} total={3} />

          <h1 className="inauth-form-title sreg-title">
            Create your student account
          </h1>
          <p className="inauth-form-sub">Get started with P-SCHOOL</p>

          <form onSubmit={handleContinue}>
            <div className="inauth-field">
              <label className="inauth-label">Full Name</label>
              <input className="inauth-input" type="text" placeholder="Full Name"
                value={form.fullName} onChange={e => set('fullName', e.target.value)} required />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Email</label>
              <input className="inauth-input" type="email" placeholder="Email"
                value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Phone</label>
              <input className="inauth-input" type="tel" placeholder="Phone number"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Date of birth</label>
              <div className="inauth-input-wrap">
                <input
                  className="inauth-input has-icon"
                  type={showDob ? 'date' : 'text'}
                  placeholder="DD/YY/MM"
                  value={form.dob}
                  onFocus={() => setShowDob(true)}
                  onBlur={() => !form.dob && setShowDob(false)}
                  onChange={e => set('dob', e.target.value)}
                />
                <button type="button" className="inauth-eye-btn" onClick={() => setShowDob(v => !v)}>
                  <EyeIcon open={showDob} />
                </button>
              </div>
            </div>

            <div className="sreg-agree-row">
              <input type="checkbox" id="sreg-agree" checked={form.agree}
                onChange={e => set('agree', e.target.checked)} required />
              <label htmlFor="sreg-agree" className="sreg-agree-label">
                I agree to the{' '}
                <a href="#" className="inauth-link">Terms &amp; Privacy</a>
              </label>
            </div>

            <button type="submit" className="inauth-btn" style={{ marginTop: 20 }}>
              Continue
            </button>
          </form>

          <div className="inauth-footer" style={{ marginTop: 16 }}>
            Already have an account?{' '}
            {/* TODO: point to /student/login when design is provided */}
            <button className="inauth-link" onClick={() => navigate('/instructor')}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
