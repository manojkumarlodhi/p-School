import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstitutionAuthLayout from './InstitutionAuthLayout';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function InstitutionVerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp]           = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer]       = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs               = useRef([]);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const fmt = s => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  function handleChange(idx, val) {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
  }

  function handleKeyDown(idx, e) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      inputRefs.current[idx - 1]?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = [...otp];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  function handleResend() {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/institution/create-password');
  }

  return (
    <InstitutionAuthLayout>
      <h1 className="inst-auth-heading">Verify Your Email</h1>
      <p className="inst-auth-subheading">
        Enter the Six digit one time password to complete your registration and
        secure your account sent to
      </p>

      <form className="inst-auth-form" onSubmit={handleSubmit} noValidate>

        {/* OTP boxes */}
        <div className="inst-auth-otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input key={i}
              ref={el => (inputRefs.current[i] = el)}
              className={`inst-auth-otp-input${digit ? ' filled' : ''}`}
              type="text" inputMode="numeric" maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}/>
          ))}
        </div>

        {/* Resend */}
        <div className="inst-auth-resend-row">
          <div className="inst-auth-resend-timer">
            Didn&apos;t receive OTP ?{' '}
            <span>{fmt(timer)}</span>
          </div>
          <div>
            Didn&apos;t receive OTP ?{' '}
            <button type="button" className="inst-auth-resend-btn"
              onClick={handleResend} disabled={!canResend}>
              Resend
            </button>
          </div>
        </div>

        <button type="submit" className="inst-auth-btn">Verify</button>
      </form>
    </InstitutionAuthLayout>
  );
}
