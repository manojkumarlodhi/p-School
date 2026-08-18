import { useState, useRef, useEffect } from 'react';
import profileImg from '../../../assets/images/profile.png';

const CONTACTS = [
  { id: 'c1', name: 'Abhay Verma',  role: 'Coding Instructor',      online: true,  unread: true  },
  { id: 'c2', name: 'Priya Sharma', role: 'Robotics Instructor',     online: true,  unread: false },
  { id: 'c3', name: 'Amit Patel',   role: 'Electronics Instructor',  online: false, unread: false },
  { id: 'c4', name: 'Rahul Singh',  role: 'Class Coordinator',       online: false, unread: false },
];
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .Lorem ipsum dolor sit amet.';
const INITIAL_MESSAGES = [
  { id: 1, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 2, from: 'them', text: LOREM, time: '10:31 pm' },
  { id: 3, from: 'me',   text: 'How do I submit the assignment?', time: '10:32 pm' },
  { id: 4, from: 'them', text: 'You can submit it from the Assignments section.', time: '10:33 pm' },
];

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

function ChatView({ contact, onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { id: Date.now(), from: 'me', text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }]);
    setInput('');
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'#fff' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px 20px', borderBottom:'1px solid #f3f4f6', flexShrink:0 }}>
        <button style={{ background:'none', border:'none', cursor:'pointer', color:'#374151', display:'flex', alignItems:'center', padding:4, borderRadius:8 }} onClick={onBack}><BackIcon /></button>
        <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#1ba8d5,#38bdf8)', overflow:'hidden', flexShrink:0 }}>
          <img src={profileImg} alt={contact.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:700, color:'#111827' }}>{contact.name}</div>
          <div style={{ fontSize:12, color:'#9ca3af' }}>{contact.role}</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:16, background:'#f9fafb' }}>
        {messages.map(m => (
          <div key={m.id} style={{ display:'flex', flexDirection:'column', alignItems: m.from==='me'?'flex-end':'flex-start', gap:4 }}>
            <div style={{ maxWidth:'75%', padding:'12px 16px', borderRadius: m.from==='me'?'18px 18px 4px 18px':'4px 18px 18px 18px', fontSize:13.5, lineHeight:1.55, background: m.from==='me'?'#e0f2fe':'#fff', color: m.from==='me'?'#0c4a6e':'#111827', boxShadow: m.from==='them'?'0 1px 4px rgba(0,0,0,0.06)':'none' }}>
              {m.text}
            </div>
            <span style={{ fontSize:11, color:'#9ca3af', padding:'0 4px' }}>{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 20px', borderTop:'1px solid #f3f4f6', background:'#fff', flexShrink:0 }}>
        <input style={{ flex:1, padding:'10px 16px', border:'1.5px solid #e5e7eb', borderRadius:24, fontSize:14, color:'#111827', background:'#f9fafb', outline:'none', fontFamily:'inherit' }}
          placeholder="Type.." value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <button style={{ width:42, height:42, borderRadius:'50%', background:'#1ba8d5', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff', flexShrink:0 }} onClick={send}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default function StudentMessages() {
  const [activeContact, setActiveContact] = useState(null);
  if (activeContact) return <ChatView contact={activeContact} onBack={() => setActiveContact(null)} />;

  return (
    <div style={{ padding:'24px 28px', minHeight:'100%', background:'#fff', fontFamily:"system-ui,'Segoe UI',Roboto,sans-serif" }}>
      <h1 style={{ fontSize:22, fontWeight:700, color:'#111827', margin:'0 0 20px' }}>Messages</h1>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {CONTACTS.map(c => (
          <div key={c.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid #f3f4f6', cursor:'pointer', transition:'background 0.12s', borderRadius:8 }}
            onClick={() => setActiveContact(c)}>
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#1ba8d5,#38bdf8)', overflow:'hidden' }}>
                <img src={profileImg} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              {c.online && !c.unread && <span style={{ position:'absolute', bottom:2, right:2, width:11, height:11, borderRadius:'50%', background:'#22c55e', border:'2px solid #fff' }} />}
              {c.unread && <span style={{ position:'absolute', bottom:2, right:2, width:11, height:11, borderRadius:'50%', background:'#1ba8d5', border:'2px solid #fff' }} />}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14.5, fontWeight:700, color:'#111827', marginBottom:3 }}>{c.name}</div>
              <div style={{ fontSize:13, color: c.unread?'#374151':'#9ca3af', fontWeight: c.unread?600:400, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.role}</div>
            </div>
            {c.unread && <span style={{ width:8, height:8, borderRadius:'50%', background:'#1ba8d5', flexShrink:0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
