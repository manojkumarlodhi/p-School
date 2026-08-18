import { useState } from 'react';

const LABS = [
  { id:'l1', name:'Python Sandbox',    type:'Coding',      desc:'Write and run Python code safely.', status:'available' },
  { id:'l2', name:'Circuit Simulator', type:'Electronics', desc:'Build and test circuits virtually.', status:'available' },
  { id:'l3', name:'Robotics Lab',      type:'Robotics',    desc:'Program and simulate robots.',       status:'limited'   },
  { id:'l4', name:'Mechanics Sim',     type:'Mechanics',   desc:'Explore mechanical systems.',        status:'available' },
];
const HISTORY = [
  { lab:'Python Sandbox',    date:'Feb 12, 2026', duration:'45 min', score:92 },
  { lab:'Circuit Simulator', date:'Feb 10, 2026', duration:'30 min', score:78 },
];
const SUBJECT_COLORS = { Coding:{bg:'#f0f9ff',color:'#1ba8d5'}, Electronics:{bg:'#f5f3ff',color:'#8b5cf6'}, Robotics:{bg:'#fff7ed',color:'#f59e0b'}, Mechanics:{bg:'#f0fdf4',color:'#22c55e'} };
const pageStyle = { minHeight:'100%', background:'#f4f6f9', fontFamily:"system-ui,'Segoe UI',Roboto,sans-serif" };

export default function StudentVirtualLab() {
  const [tab, setTab] = useState('labs');
  return (
    <div style={pageStyle}>
      <div style={{ padding:'14px 24px', background:'#fff', borderBottom:'1px solid #e8eaf0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#111827', margin:0 }}>Virtual Lab</h1>
        <span style={{ fontSize:12, color:'#9ca3af' }}>Home / Virtual Lab</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, padding:'20px 24px 0' }}>
        {[['8','Total Sessions'],['4','Labs Available'],['86%','Avg Score']].map(([v,l]) => (
          <div key={l} style={{ background:'#fff', borderRadius:12, border:'1px solid #e8eaf0', padding:'18px 16px', textAlign:'center' }}>
            <div style={{ fontSize:24, fontWeight:800, color:'#111827', marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, color:'#6b7280' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', borderBottom:'2px solid #f3f4f6', padding:'0 24px', marginTop:20, background:'#fff' }}>
        {['labs','history'].map(t => (
          <button key={t} style={{ padding:'12px 18px', border:'none', background:'none', fontSize:14, fontWeight:600, color:tab===t?'#1ba8d5':'#6b7280', cursor:'pointer', fontFamily:'inherit', borderBottom:tab===t?'2px solid #1ba8d5':'none', marginBottom:-2 }}
            onClick={() => setTab(t)}>{t==='labs'?'Available Labs':'My History'}</button>
        ))}
      </div>

      {tab === 'labs' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, padding:'20px 24px' }}>
          {LABS.map(lab => {
            const colors = SUBJECT_COLORS[lab.type] || { bg:'#f3f4f6', color:'#6b7280' };
            return (
              <div key={lab.id} style={{ background:'#fff', borderRadius:14, padding:18, border:'1px solid #f0f2f5', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontSize:11.5, fontWeight:600, padding:'3px 10px', borderRadius:20, background:colors.bg, color:colors.color }}>{lab.type}</span>
                  <span style={{ fontSize:11.5, fontWeight:600, padding:'3px 10px', borderRadius:20, background:lab.status==='available'?'#dcfce7':'#fef3c7', color:lab.status==='available'?'#16a34a':'#d97706' }}>{lab.status.charAt(0).toUpperCase()+lab.status.slice(1)}</span>
                </div>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#111827', margin:'0 0 6px' }}>{lab.name}</h3>
                <p style={{ fontSize:13, color:'#6b7280', lineHeight:1.5, margin:'0 0 14px' }}>{lab.desc}</p>
                <button style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'8px 16px', border:'none', borderRadius:8, background:'#1ba8d5', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  ▶ Launch
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'history' && (
        <div style={{ display:'flex', flexDirection:'column', gap:2, padding:'16px 24px' }}>
          {HISTORY.map((h,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 0', borderBottom:'1px solid #f3f4f6' }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#f0f9ff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:18 }}>🧪</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#111827', marginBottom:3 }}>{h.lab}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>{h.date} · {h.duration}</div>
              </div>
              <div style={{ fontSize:16, fontWeight:800, color:'#22c55e' }}>{h.score}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
