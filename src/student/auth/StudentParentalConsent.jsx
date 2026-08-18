import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

/* Step 3 of 3 */
function StepBar({ step = 3, total = 3 }) {
  return (
    <div className="sreg-step-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sreg-step-seg${i < step ? ' active' : ''}`} />
      ))}
    </div>
  );
}

export default function StudentParentalConsent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Age passed from OTP page
  const age = location.state?.age ?? 12;

  const [form, setForm] = useState({
    parentName: 'Aarav Sharma',
    email: 'abhay.Test@gmail.com',
    phone: '99116664497',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handleContinue(e) {
    e.preventDefault();
    if (age <= 12) {
      // 8-12 Junior: Parental Consent → Waiting for Approval
      navigate('/student/register/waiting', { state: { age } });
    } else {
      // 13-15 Middle: Parental Consent → Parent Notification → Free Trial → Welcome
      navigate('/student/register/parent-notification', { state: { age } });
    }
  }

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Parental Consent</h2>
        <p className="inauth-brand-sub">
          {age <= 12
            ? 'For students under 13, we need a parent or guardian\'s approval to create an account.'
            : 'We\'ll notify your parent/guardian about your P-School account and learning progress.'}
        </p>
      </div>

      {/* Right — form */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={3} total={3} />

          <h1 className="inauth-form-title sreg-title">Parental Consent</h1>
          <p className="inauth-form-sub">
            {age <= 12
              ? 'We need your parent/guardian\'s approval to continue'
              : 'Parent will be notified'}
          </p>

          <form onSubmit={handleContinue}>
            <div className="inauth-field">
              <label className="inauth-label">Parent/Guardian Name</label>
              <input className="inauth-input" type="text" placeholder="Parent/Guardian Name"
                value={form.parentName} onChange={e => set('parentName', e.target.value)} required />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Email</label>
              <input className="inauth-input" type="email" placeholder="Parent email"
                value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Phone (optional)</label>
              <input className="inauth-input" type="tel" placeholder="Phone number"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            <div className="sreg-btn-row" style={{ marginTop: 24 }}>
              <button type="button" className="sreg-btn-back"
                onClick={() => navigate('/student/register/verify-otp', { state: { age } })}>
                Back
              </button>
              <button type="submit" className="sreg-btn-continue">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
