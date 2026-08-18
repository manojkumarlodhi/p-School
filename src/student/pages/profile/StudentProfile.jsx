import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';

const LEGAL_SECTIONS = [
  { title: '1. Acceptance of Terms', text: 'By accessing and using P-SCHOOL, you accept and agree to be bound by the terms and provision of this agreement.' },
  { title: '2. Use License', text: 'Permission is granted to temporarily download one copy of the materials on P-SCHOOL for personal, non-commercial transitory viewing only.' },
  { title: '3. Disclaimer', text: "The materials on P-SCHOOL are provided on an 'as is' basis. P-SCHOOL makes no warranties, expressed or implied." },
  { title: '4. Limitations', text: 'In no event shall P-SCHOOL or its suppliers be liable for any damages arising out of the use or inability to use the materials on P-SCHOOL.' },
  { title: '5. Accuracy of Materials', text: 'The materials appearing on P-SCHOOL could include technical, typographical, or photographic errors.' },
];

const pageStyle = { padding:'24px 28px', minHeight:'100%', background:'#f4f6f9', fontFamily:"system-ui,'Segoe UI',Roboto,sans-serif" };
const menuCardStyle = { background:'#fff', borderRadius:14, overflow:'hidden', boxShadow:'0 1px 6px rgba(0,0,0,0.05)' };
const menuItemStyle = { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'15px 18px', borderBottom:'1px solid #f3f4f6', cursor:'pointer', fontSize:14, fontWeight:500, color:'#111827', background:'none', borderLeft:'none', borderRight:'none', borderTop:'none', width:'100%', textAlign:'left', fontFamily:'inherit', transition:'background 0.12s' };

function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#fff', borderRadius:20, padding:'32px 28px 24px', width:'100%', maxWidth:360, textAlign:'center' }}>
        <div style={{ width:56, height:56, borderRadius:'50%', background:'#fee2e2', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', color:'#ef4444', fontSize:24 }}>⏻</div>
        <h3 style={{ fontSize:20, fontWeight:800, color:'#ef4444', margin:'0 0 8px' }}>Logout</h3>
        <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 24px' }}>Are you sure want to Logout?<br />Thank you and see you again! ❤️</p>
        <div style={{ display:'flex', gap:12 }}>
          <button style={{ flex:1, padding:12, border:'1.5px solid #e5e7eb', borderRadius:10, background:'#fff', fontSize:14, fontWeight:600, color:'#374151', cursor:'pointer', fontFamily:'inherit' }} onClick={onCancel}>Cancel</button>
          <button style={{ flex:1, padding:12, border:'none', borderRadius:10, background:'#ef4444', fontSize:14, fontWeight:700, color:'#fff', cursor:'pointer', fontFamily:'inherit' }} onClick={onConfirm}>Yes, Logout</button>
        </div>
      </div>
    </div>
  );
}

function StaticPage({ title, onBack }) {
  return (
    <div style={{ padding:'24px 28px', minHeight:'100%', background:'#fff', fontFamily:"system-ui,'Segoe UI',Roboto,sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, paddingBottom:16, borderBottom:'2px dashed #bae6fd' }}>
        <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, fontWeight:700, color:'#374151', fontFamily:'inherit' }} onClick={onBack}>←</button>
        <h1 style={{ fontSize:18, fontWeight:700, color:'#111827', margin:0 }}>{title}</h1>
      </div>
      {LEGAL_SECTIONS.map(s => (
        <div key={s.title} style={{ marginBottom:20 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:'#111827', margin:'0 0 6px' }}>{s.title}</h3>
          <p style={{ fontSize:13.5, color:'#6b7280', lineHeight:1.65, margin:0 }}>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function StudentProfile() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [staticPage, setStaticPage] = useState(null);

  if (staticPage) return <StaticPage title={staticPage} onBack={() => setStaticPage(null)} />;

  return (
    <div style={pageStyle}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <span />
        <span style={{ fontSize:16, fontWeight:700, color:'#111827' }}>Profile</span>
        <span />
      </div>

      {/* Avatar */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:24 }}>
        <div style={{ width:90, height:90, borderRadius:'50%', overflow:'hidden', border:'3px solid #fff', boxShadow:'0 4px 14px rgba(27,168,213,0.25)', marginBottom:12 }}>
          <img src={profileImg} alt="Aarav Patel" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
        <h2 style={{ fontSize:20, fontWeight:800, color:'#111827', margin:'0 0 4px' }}>Aarav Patel</h2>
        <p style={{ fontSize:13, color:'#6b7280', margin:'0 0 4px' }}>Grade 7A · Coding</p>
        <p style={{ fontSize:13, color:'#1ba8d5', margin:'0 0 10px', cursor:'pointer' }}>aarav@school.com ›</p>
        <button style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 16px', border:'1.5px solid #e5e7eb', borderRadius:8, background:'#fff', fontSize:13, fontWeight:600, color:'#374151', cursor:'pointer', fontFamily:'inherit' }}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Academic Info */}
      <div style={{ marginBottom:16 }}>
        <h3 style={{ fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8, padding:'0 4px' }}>Academic Info</h3>
        <div style={menuCardStyle}>
          {[['Grade','7A'],['Institution','Bright Future Academy'],['Enrolled','Jan 15, 2026'],['Student ID','STU-2026-001']].map(([k,v]) => (
            <div key={k} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 18px', borderBottom:'1px solid #f3f4f6', fontSize:13.5 }}>
              <span style={{ color:'#9ca3af' }}>{k}</span>
              <span style={{ color:'#111827', fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div style={{ marginBottom:16 }}>
        <h3 style={{ fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8, padding:'0 4px' }}>Preferences</h3>
        <div style={menuCardStyle}>
          {['Change Password','Notification Settings','Language'].map(item => (
            <button key={item} style={menuItemStyle}>{item} <span style={{ color:'#9ca3af', fontSize:18 }}>›</span></button>
          ))}
        </div>
      </div>

      {/* App Information */}
      <div style={{ marginBottom:16 }}>
        <h3 style={{ fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8, padding:'0 4px' }}>App Information</h3>
        <div style={menuCardStyle}>
          {[['About App','About App'],['Privacy Policy','Privacy Policy'],['Terms of Service','Terms of Service'],['Help & Support',null]].map(([label,page]) => (
            <button key={label} style={menuItemStyle} onClick={() => page && setStaticPage(page)}>
              {label} <span style={{ color:'#9ca3af', fontSize:18 }}>›</span>
            </button>
          ))}
        </div>
      </div>

      <button style={{ width:'100%', padding:14, border:'none', borderRadius:12, background:'#ef4444', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:8 }}
        onClick={() => setShowLogout(true)}>
        ⏻ Logout
      </button>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={() => { setShowLogout(false); navigate('/student/login'); }}
        />
      )}
    </div>
  );
}
