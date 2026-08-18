import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

function StepBar({ step = 2, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < step ? '#1ba8d5' : '#e5e7eb' }} />
      ))}
    </div>
  );
}

export default function IndividualInstructorVerifyEmail() {
  const navigate = useNavigate();
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

  return (
    <div className="inauth-page">
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

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={2} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:24 }}>
            Verify your email
          </h1>
          <p className="inauth-form-sub">We've sent a 6-digit code to your email</p>

          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/individual/create-password'); }}>
            <div className="inauth-field">
              <label className="inauth-label">Verification Code</label>
              <div className="inauth-otp-row">
                {otp.map((v, i) => (
                  <input key={i} ref={el => inputRefs.current[i] = el}
                    className={`inauth-otp-box${v ? ' filled' : ''}`}
                    type="text" inputMode="numeric" maxLength={1} value={v}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)} />
                ))}
              </div>
            </div>

            <div className="inauth-resend-row">
              {timer > 0
                ? <span>Didn't receive the code?{' '}
                    <span style={{ color:'#1ba8d5', fontWeight:600 }}>Resend code ({timer}s)</span>
                  </span>
                : <button type="button" className="inauth-resend-btn" onClick={() => setTimer(59)}>
                    Resend code
                  </button>
              }
            </div>

            <button type="submit" className="inauth-btn">Verify &amp; Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
