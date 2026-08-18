import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';

const BackIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;

export default function StudentVerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
        <p className="inauth-brand-sub">Enter the 6-digit code we sent to your email address.</p>
      </div>
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <button className="inauth-back-btn" onClick={() => navigate('/student/forgot-password')}><BackIcon /> Back</button>
          <h1 className="inauth-form-title">Verify your email</h1>
          <p className="inauth-form-sub">We've sent a 6-digit code to your email</p>
          <form onSubmit={e => { e.preventDefault(); navigate('/student/create-password'); }}>
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
                ? <span>Don't receive the code? <span style={{ color: '#1ba8d5', fontWeight: 600 }}>Resend code ({timer}s)</span></span>
                : <button type="button" className="inauth-resend-btn" onClick={() => setTimer(59)}>Resend code</button>
              }
            </div>
            <button type="submit" className="inauth-btn">Verify &amp; Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

