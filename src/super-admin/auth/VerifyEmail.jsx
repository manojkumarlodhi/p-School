import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyEmail() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    const next = [...otp];
    pasted.split('').forEach((char, i) => {
      next[i] = char;
    });
    setOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    console.log('OTP resent');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP submitted:', otp.join(''));
  };

  return (
    <AuthLayout>
      <h1 className="auth-heading">Verify Your Email</h1>
      <p className="auth-subheading">
        Enter the Six digit one time password to complete your registration and
        secure your account sent to
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* 6-digit OTP boxes */}
        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              className={`otp-input${digit ? ' filled' : ''}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Timer + Resend */}
        <div className="resend-row">
          <div className="resend-timer">
            Didn&apos;t receive OTP ?{' '}
            <span>{formatTime(timer)}</span>
          </div>
          <div className="resend-btn-row">
            Didn&apos;t receive OTP ?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              style={{ opacity: canResend ? 1 : 0.5, cursor: canResend ? 'pointer' : 'default' }}
            >
              Resend
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>
    </AuthLayout>
  );
}
