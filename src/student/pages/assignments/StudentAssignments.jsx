import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ASSIGNMENTS = [
  { id: 'a1', title: 'Coding Worksheet 01', subject: 'Coding',      class: 'Grade 7A', due: 'Feb 12, 2026', status: 'graded',    score: '92/100', instructions: 'Complete the coding worksheet on variables. Covers variable declaration, data types, and basic operations.' },
  { id: 'a2', title: 'Variables Quiz',      subject: 'Coding',      class: 'Grade 7A', due: 'Feb 14, 2026', status: 'submitted', score: null,      instructions: 'Answer all questions about Python variables and data types.' },
  { id: 'a3', title: 'Circuit Lab Task',    subject: 'Electronics', class: 'Grade 7A', due: 'Feb 16, 2026', status: 'pending',   score: null,      instructions: 'Build a simple circuit using the virtual lab simulator.' },
  { id: 'a4', title: 'Robotics Project',    subject: 'Robotics',    class: 'Grade 7A', due: 'Feb 10, 2026', status: 'graded',    score: '88/100',  instructions: 'Design and simulate a basic robot movement pattern.' },
];
const TABS = ['All','Pending','Submitted','Graded'];
const pageStyle = { padding:'24px 28px', minHeight:'100%', fontFamily:"system-ui,'Segoe UI',Roboto,sans-serif" };
const statusStyle = (s) => ({ fontSize:11.5, fontWeight:600, padding:'4px 12px', borderRadius:20, whiteSpace:'nowrap', flexShrink:0, background: s==='pending'?'#fef9c3':s==='submitted'?'#dbeafe':'#dcfce7', color: s==='pending'?'#ca8a04':s==='submitted'?'#1d4ed8':'#16a34a' });

function AssignmentDetail({ id }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const a = ASSIGNMENTS.find(x => x.id === id) || ASSIGNMENTS[0];

  return (
    <div style={pageStyle}>
      <button style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', fontSize:18, fontWeight:700, color:'#111827', padding:0, fontFamily:'inherit', marginBottom:20 }}
        onClick={() => navigate('/student/dashboard/assignments')}>← {a.title}</button>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
        {[['Class',a.class],['Subject',a.subject],['Due Date',a.due],['Score',a.score||'—']].map(([k,v]) => (
          <div key={k} style={{ background:'#f0f9ff', borderRadius:12, padding:'12px 16px' }}>
            <div style={{ fontSize:11.5, color:'#6b7280', marginBottom:4 }}>{k}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#111827' }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', borderBottom:'2px solid #f3f4f6', marginBottom:20 }}>
        {['overview','submit'].map(t => (
          <button key={t} style={{ padding:'10px 18px', border:'none', background:'none', fontSize:14, fontWeight:600, color:tab===t?'#1ba8d5':'#6b7280', cursor:'pointer', fontFamily:'inherit', borderBottom:tab===t?'2px solid #1ba8d5':'none', marginBottom:-2 }}
            onClick={() => setTab(t)}>{t==='overview'?'Overview':'Submit Work'}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#111827', margin:'0 0 12px' }}>Instructions</h3>
          <p style={{ fontSize:13.5, color:'#6b7280', lineHeight:1.65, marginBottom:20 }}>{a.instructions}</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f3f4f6', fontSize:13.5 }}>
            <span style={{ color:'#9ca3af' }}>Status</span>
            <span style={statusStyle(a.status)}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
          </div>
        </div>
      )}
      {tab === 'submit' && (
        a.status === 'graded' ? (
          <div style={{ background:'#f0fdf4', borderRadius:16, padding:32, textAlign:'center', border:'1px solid #bbf7d0' }}>
            <div style={{ fontSize:40, fontWeight:800, color:'#16a34a', marginBottom:6 }}>{a.score}</div>
            <div style={{ fontSize:14, fontWeight:600, color:'#374151' }}>Your Score</div>
          </div>
        ) : (
          <>
            <div style={{ border:'2px dashed #bae6fd', borderRadius:14, background:'#f0f9ff', padding:32, textAlign:'center', cursor:'pointer', marginBottom:16 }}
              onClick={() => fileRef.current?.click()}>
              <p style={{ fontSize:14, fontWeight:600, color:'#374151', margin:'0 0 4px' }}>{file ? file.name : 'Click to upload or drag and drop'}</p>
              <p style={{ fontSize:12, color:'#9ca3af', margin:0 }}>PDF, DOC, ZIP (Max 25MB)</p>
              <input ref={fileRef} type="file" style={{ display:'none' }} onChange={e => setFile(e.target.files?.[0])} />
            </div>
            <button style={{ width:'100%', padding:14, border:'none', borderRadius:12, background: file?'#1ba8d5':'#e5e7eb', color: file?'#fff':'#9ca3af', fontSize:15, fontWeight:700, cursor: file?'pointer':'not-allowed', fontFamily:'inherit' }}
              disabled={!file}>Submit Assignment</button>
          </>
        )
      )}
    </div>
  );
}

export default function StudentAssignments() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [activeTab, setActiveTab] = useState('All');
  if (assignmentId) return <AssignmentDetail id={assignmentId} />;

  const filtered = activeTab === 'All' ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === activeTab.toLowerCase());

  return (
    <div style={pageStyle}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#111827', margin:0 }}>Assignments</h1>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:20, overflowX:'auto', scrollbarWidth:'none' }}>
        {TABS.map(t => (
          <button key={t} style={{ padding:'7px 18px', border:`1.5px solid ${activeTab===t?'#1ba8d5':'#e5e7eb'}`, borderRadius:20, background:activeTab===t?'#1ba8d5':'#fff', fontSize:13, fontWeight:600, color:activeTab===t?'#fff':'#6b7280', cursor:'pointer', whiteSpace:'nowrap', fontFamily:'inherit' }}
            onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(a => (
          <div key={a.id} style={{ background:'#fff', borderRadius:14, padding:'16px 18px', border:'1px solid #f0f2f5', boxShadow:'0 1px 6px rgba(0,0,0,0.04)', cursor:'pointer' }}
            onClick={() => navigate(`/student/dashboard/assignments/${a.id}`)}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:'#111827', marginBottom:3 }}>{a.title}</div>
                <div style={{ fontSize:12.5, color:'#9ca3af' }}>{a.subject} · {a.class}</div>
              </div>
              <span style={statusStyle(a.status)}>{a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:12.5, color:'#6b7280' }}>Due {a.due}</span>
              {a.score && <span style={{ fontSize:13, fontWeight:700, color:'#22c55e' }}>{a.score}</span>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign:'center', padding:40, fontSize:14, color:'#9ca3af', background:'#fff', borderRadius:14 }}>No {activeTab.toLowerCase()} assignments.</div>}
      </div>
    </div>
  );
}
