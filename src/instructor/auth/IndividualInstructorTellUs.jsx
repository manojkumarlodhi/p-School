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
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const DOMAINS = ['Coding', 'Electronic', 'Mechanical', 'Robotics'];
const EXPERIENCE = ['0-1 year', '0-2 year', '0-3 year', '0-4 year', '5+ years'];

export default function IndividualInstructorTellUs() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    fullName: 'Aarav Sharma',
    phone: '99116664497',
    email: 'abhay.Test@gmail.com',
    domain: '',
    experience: '',
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
        <h2 className="inauth-brand-title">Tell Us About You</h2>
        <p className="inauth-brand-sub">
          Complete your instructor profile so students can learn more about your expertise and teaching style.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner">
          <StepBar step={4} total={5} />

          <h1 className="inauth-form-title" style={{ color:'#1ba8d5', fontSize:24 }}>
            Tell us about you
          </h1>
          <p className="inauth-form-sub">Complete your instructor profile</p>

          <form onSubmit={e => { e.preventDefault(); navigate('/instructor/individual/upload-documents'); }}>
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
              <label className="inauth-label">Phone</label>
              <input className="inauth-input" type="tel" placeholder="Phone number"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            <div className="inauth-field">
              <label className="inauth-label">Email</label>
              <input className="inauth-input" type="email" placeholder="Email"
                value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>

            {/* Teaching Domain */}
            <div className="inauth-field">
              <label className="inauth-label">Teaching Domain / Category</label>
              <div style={{ position:'relative' }}>
                <select className="inauth-input" value={form.domain}
                  onChange={e => set('domain', e.target.value)}
                  style={{ appearance:'none', paddingRight:36, cursor:'pointer' }}>
                  <option value="">Select Category</option>
                  {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                  <ChevronDown />
                </span>
              </div>
            </div>

            {/* Years of Experience */}
            <div className="inauth-field">
              <label className="inauth-label">Years of Experience</label>
              <div style={{ position:'relative' }}>
                <select className="inauth-input" value={form.experience}
                  onChange={e => set('experience', e.target.value)}
                  style={{ appearance:'none', paddingRight:36, cursor:'pointer' }}>
                  <option value="">Select Your Experience Level</option>
                  {EXPERIENCE.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                  <ChevronDown />
                </span>
              </div>
            </div>

            {/* Short Bio */}
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
