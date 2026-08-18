import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CLASSES = [
  { id: 'c1', name: 'Grade 7A', subject: 'Coding',      instructor: 'Abhay Verma',  progress: 72 },
  { id: 'c2', name: 'Grade 7A', subject: 'Robotics',    instructor: 'Priya Sharma', progress: 58 },
  { id: 'c3', name: 'Grade 7A', subject: 'Electronics', instructor: 'Amit Patel',   progress: 85 },
];
const SUBJECT_COLORS = {
  Coding:      { bg: '#f0f9ff', color: '#1ba8d5' },
  Robotics:    { bg: '#fff7ed', color: '#f59e0b' },
  Electronics: { bg: '#f5f3ff', color: '#8b5cf6' },
};
const RESOURCES = [
  { id: 'r1', name: 'Introduction to Python Variables', meta: 'PDF • 2.4 MB' },
  { id: 'r2', name: 'BST Code Examples',                meta: 'ZIP • 758 KB' },
];
const ASSIGNMENTS = [
  { id: 'a1', title: 'Coding Worksheet 01', due: 'Feb 12, 2026', status: 'pending'   },
  { id: 'a2', title: 'Variables Quiz',      due: 'Feb 14, 2026', status: 'submitted' },
];

const pageStyle = { padding: '24px 28px', minHeight: '100%', fontFamily: "system-ui,'Segoe UI',Roboto,sans-serif" };
const backBtn = { display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', fontSize:18, fontWeight:700, color:'#111827', padding:0, fontFamily:'inherit', marginBottom:20 };
const tabsStyle = { display:'flex', borderBottom:'2px solid #f3f4f6', marginBottom:20 };
const tabStyle = (active) => ({ padding:'10px 18px', border:'none', background:'none', fontSize:14, fontWeight:600, color: active ? '#1ba8d5' : '#6b7280', cursor:'pointer', fontFamily:'inherit', borderBottom: active ? '2px solid #1ba8d5' : 'none', marginBottom:-2 });

function ClassDetail({ classId }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const cls = CLASSES.find(c => c.id === classId) || CLASSES[0];
  const colors = SUBJECT_COLORS[cls.subject] || { bg: '#f3f4f6', color: '#6b7280' };

  return (
    <div style={pageStyle}>
      <button style={backBtn} onClick={() => navigate('/student/dashboard/classes')}>
        ← {cls.name}
      </button>
      <div style={tabsStyle}>
        {['overview','assignments','resources'].map(t => (
          <button key={t} style={tabStyle(tab===t)} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'overview' && (
        <div>
          <div style={{ background:'#fff', borderRadius:14, padding:18, border:'1px solid #f0f2f5', marginBottom:20 }}>
            {[['Subject', <span style={{ padding:'3px 10px', borderRadius:20, background:colors.bg, color:colors.color, fontSize:12, fontWeight:600 }}>{cls.subject}</span>],
              ['Instructor', cls.instructor], ['Progress', `${cls.progress}%`]].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f3f4f6', fontSize:13.5 }}>
                <span style={{ color:'#9ca3af' }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ height:8, background:'#e5e7eb', borderRadius:4, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${cls.progress}%`, background:'#1ba8d5', borderRadius:4 }} />
          </div>
          <p style={{ fontSize:13, color:'#6b7280', marginTop:6 }}>{cls.progress}% completed</p>
        </div>
      )}
      {tab === 'assignments' && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {ASSIGNMENTS.map(a => (
            <div key={a.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', borderRadius:12, padding:'14px 16px', border:'1px solid #f0f2f5', cursor:'pointer' }}
              onClick={() => navigate(`/student/dashboard/assignments/${a.id}`)}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'#111827', marginBottom:3 }}>{a.title}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>Due {a.due}</div>
              </div>
              <span style={{ fontSize:11.5, fontWeight:600, padding:'4px 12px', borderRadius:20, background: a.status==='pending'?'#fef9c3':a.status==='submitted'?'#dbeafe':'#dcfce7', color: a.status==='pending'?'#ca8a04':a.status==='submitted'?'#1d4ed8':'#16a34a' }}>
                {a.status.charAt(0).toUpperCase()+a.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
      {tab === 'resources' && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {RESOURCES.map(r => (
            <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'#fff', borderRadius:12, border:'1px solid #f0f2f5' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'#e0f2fe', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#1ba8d5', fontSize:18 }}>📄</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13.5, fontWeight:600, color:'#111827' }}>{r.name}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>{r.meta}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentClasses() {
  const navigate = useNavigate();
  const { classId } = useParams();
  if (classId) return <ClassDetail classId={classId} />;

  return (
    <div style={pageStyle}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#111827', margin:0 }}>My Classes</h1>
        <span style={{ fontSize:12.5, color:'#9ca3af' }}>Total - {CLASSES.length} Classes</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
        {CLASSES.map(cls => {
          const colors = SUBJECT_COLORS[cls.subject] || { bg:'#f3f4f6', color:'#6b7280' };
          return (
            <div key={cls.id} style={{ background:'#fff', borderRadius:14, padding:18, border:'1px solid #f0f2f5', boxShadow:'0 1px 6px rgba(0,0,0,0.04)', cursor:'pointer', transition:'box-shadow 0.15s' }}
              onClick={() => navigate(`/student/dashboard/classes/${cls.id}`)}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:16, fontWeight:700, color:'#111827' }}>{cls.name}</span>
                <span style={{ fontSize:11.5, fontWeight:600, padding:'3px 10px', borderRadius:20, background:colors.bg, color:colors.color }}>{cls.subject}</span>
              </div>
              <div style={{ fontSize:12.5, color:'#9ca3af', marginBottom:12 }}>{cls.instructor}</div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, height:6, background:'#e5e7eb', borderRadius:3, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${cls.progress}%`, background:'#1ba8d5', borderRadius:3 }} />
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:'#374151' }}>{cls.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
