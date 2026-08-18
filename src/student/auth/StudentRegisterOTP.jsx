import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

/* Step 2 of 3 */
function StepBar({ step = 2, total = 3 }) {
  return (
    <div className="sreg-step-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sreg-step-seg${i < step ? ' active' : ''}`} />
      ))}
    </div>
  );
}

/*
  Age-based routing after OTP verification:
  ┌─────────────┬──────────────────────────────────────────────────────────────────┐
  │ Age         │ Route                                                            │
  ├─────────────┼──────────────────────────────────────────────────────────────────┤
  │ 8–12 Junior │ parental-consent → waiting                                      │
  │ 13–15 Middle│ parental-consent → parent-notification → free-trial → welcome   │
  │ 16–19 Senior│ free-trial → welcome                                            │
  │ 20+ Adult   │ free-trial → welcome                                            │
  └─────────────┴──────────────────────────────────────────────────────────────────┘
*/
function getNextRoute(age) {
  if (age <= 12) return '/student/register/parental-consent';   // 8-12 Junior
  if (age <= 15) return '/student/register/parental-consent';   // 13-15 Middle (same consent, different next step)
  return '/student/register/free-trial';                        // 16+ Senior / Adult
}

export default function StudentRegisterOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // Age passed from StudentRegister via navigate state
  const age = location.state?.age ?? 20;

  const [otp, setOtp] = useState(['6', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  function handleChange(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  }

  function handleVerify(e) {
    e.preventDefault();
    const nextRoute = getNextRoute(age);
    // Pass age forward so parental-consent knows which next step to take
    navigate(nextRoute, { state: { age } });
  }

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Verify Your Email</h2>
        <p className="inauth-brand-sub">
          We've sent a 6-digit verification code to your email. Enter it to continue.
        </p>
      </div>

      {/* Right — OTP form */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={2} total={3} />

          <h1 className="inauth-form-title sreg-title">Verify your email</h1>
          <p className="inauth-form-sub">We've sent a 6-digit code to your email</p>

          <form onSubmit={handleVerify}>
            <div className="inauth-field">
              <label className="inauth-label">Verification Code</label>
              <div className="inauth-otp-row">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    className={`inauth-otp-box${v ? ' filled' : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                  />
                ))}
              </div>
            </div>

            <div className="inauth-resend-row">
              {timer > 0 ? (
                <span>
                  Didn't receive the code?{' '}
                  <span style={{ color: '#1ba8d5', fontWeight: 600 }}>
                    Resend code ({timer}s)
                  </span>
                </span>
              ) : (
                <button type="button" className="inauth-resend-btn"
                  onClick={() => setTimer(59)}>
                  Resend code
                </button>
              )}
            </div>

            <div className="sreg-btn-row" style={{ marginTop: 24 }}>
              <button type="button" className="sreg-btn-back"
                onClick={() => navigate('/student/register')}>
                Back
              </button>
              <button type="submit" className="sreg-btn-continue">Verify</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
