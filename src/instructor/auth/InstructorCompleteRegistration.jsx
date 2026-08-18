import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

function StepBar({ step = 4, total = 5 }) {
  return (
    <div style={{ display:'flex', gap:6, marginBottom:28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i < step ? '#1ba8d5' : '#e5e7eb' }} />
      ))}
    </div>
  );
}

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

export default function InstructorCompleteRegistration() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    fullName: 'Aarav Sharma',
    email: 'abhay.Test@gmail.com',
    phone: '914252424752',
    bio: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Complete Your Registration</h2>
        <p className="inauth-brand-sub">
          Create your instructor account to join the institute. Fill in your details to get started.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={4} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:22 }}>
            Complete Your Registration
          </h1>
          <p className="inauth-form-sub">Create your instructor account to join the institute.</p>

          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/invite/upload-documents'); }}>
            {/* Profile Photo */}
            <div className="inauth-field">
              <label className="inauth-label">Profile Photo</label>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{
                  width:64, height:64, borderRadius:'50%',
                  border:'2px dashed #bae6fd', background:'#f0f9ff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', overflow:'hidden', flexShrink:0,
                }} onClick={() => fileRef.current?.click()}>
                  {photo
                    ? <img src={URL.createObjectURL(photo)} alt="profile"
                        style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <CameraIcon />
                  }
                </div>
                <button type="button" className="inauth-link"
                  onClick={() => fileRef.current?.click()}>
                  Upload photo
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }}
                  onChange={e => setPhoto(e.target.files?.[0])} />
              </div>
            </div>

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
              <label className="inauth-label" style={{ display:'flex', justifyContent:'space-between' }}>
                <span>Short Bio</span>
                <span style={{ color:'#9ca3af', fontWeight:400 }}>{form.bio.length}/120 characters</span>
              </label>
              <textarea className="inauth-input" rows={3}
                placeholder="Tell student your experience and teaching style"
                maxLength={120}
                value={form.bio} onChange={e => set('bio', e.target.value)}
                style={{ resize:'none', height:'auto', paddingTop:10 }} />
            </div>

            <button type="submit" className="inauth-btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
