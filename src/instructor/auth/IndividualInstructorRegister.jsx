import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

function StepBar({ step = 1, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < step ? '#1ba8d5' : '#e5e7eb' }} />
      ))}
    </div>
  );
}

export default function IndividualInstructorRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('abhay.Test@gmail.com');
  const [agree, setAgree] = useState(false);

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Individual Instructor</h2>
        <p className="inauth-brand-sub">
          Join P-SCHOOL as an independent instructor. Create courses, manage students, and earn on your own terms.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">Create Courses</span>
          <span className="inauth-brand-tag">Earn Revenue</span>
          <span className="inauth-brand-tag">Grow Students</span>
        </div>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={1} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:26, lineHeight:1.2 }}>
            Create your instructor account
          </h1>
          <p className="inauth-form-sub">Join P-SCHOOL as an independent instructor</p>

          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/individual/verify-email'); }}>
            <div className="inauth-field">
              <label className="inauth-label">Email/Phone</label>
              <input className="inauth-input" type="text" placeholder="Email or Phone"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
              <input type="checkbox" id="ind-agree" checked={agree}
                onChange={e => setAgree(e.target.checked)} required
                style={{ width:16, height:16, accentColor:'#1ba8d5', cursor:'pointer', flexShrink:0 }} />
              <label htmlFor="ind-agree" style={{ fontSize:13, color:'#374151', cursor:'pointer' }}>
                I agree to the{' '}
                <a href="#" className="inauth-link">Terms &amp; Privacy</a>
              </label>
            </div>

            <button type="submit" className="inauth-btn">Continue</button>
          </form>

          <div className="inauth-footer" style={{ marginTop:16 }}>
            Already have an account?{' '}
            <button className="inauth-link" onClick={() => navigate('/instructor/login')}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
