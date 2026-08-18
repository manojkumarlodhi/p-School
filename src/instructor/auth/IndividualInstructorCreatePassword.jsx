import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

function StepBar({ step = 3, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < step ? '#1ba8d5' : '#e5e7eb' }} />
      ))}
    </div>
  );
}

const EyeIcon = ({ open }) => open
  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

export default function IndividualInstructorCreatePassword() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Create Your Password</h2>
        <p className="inauth-brand-sub">Set a secure password for your instructor account.</p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={3} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:24 }}>
            Create Your Password
          </h1>
          <p className="inauth-form-sub">Please Create Your Password</p>

          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/individual/tell-us-about-you'); }}>
            <div className="inauth-field">
              <label className="inauth-label">Create Password</label>
              <div className="inauth-input-wrap">
                <input className="inauth-input has-icon" type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••" value={pwd} onChange={e => setPwd(e.target.value)} required />
                <button type="button" className="inauth-eye-btn" onClick={() => setShowPwd(v => !v)}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Confirm Password</label>
              <div className="inauth-input-wrap">
                <input className="inauth-input has-icon" type={showConf ? 'text' : 'password'}
                  placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} required />
                <button type="button" className="inauth-eye-btn" onClick={() => setShowConf(v => !v)}>
                  <EyeIcon open={showConf} />
                </button>
              </div>
            </div>

            <button type="submit" className="inauth-btn" style={{ marginTop:24 }}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
