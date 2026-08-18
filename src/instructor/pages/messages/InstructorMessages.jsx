import { useState, useRef, useEffect } from 'react';
import profileImg from '../../../assets/images/profile.png';
import './messages.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CONTACTS = [
  { id: 'c1', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: true,  unread: false },
  { id: 'c2', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: true,  unread: true  },
  { id: 'c3', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: false, unread: false },
  { id: 'c4', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: false, unread: false },
  { id: 'c5', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: true,  unread: false },
  { id: 'c6', name: 'Abhay Thakur', role: 'Ui/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', online: false, unread: false },
];

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .';

const INITIAL_MESSAGES = [
  { id: 1, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 2, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 3, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 4, from: 'me',   text: LOREM, time: '10:30 pm' },
  { id: 5, from: 'me',   text: LOREM, time: '10:30 pm' },
];

/* ── Chat View ── */
function ChatView({ contact, onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, {
      id: Date.now(), from: 'me', text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    }]);
    setInput('');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="msg-chat-page">
      <div className="msg-chat-header">
        <button className="msg-chat-back" onClick={onBack}><BackIcon /></button>
        <div className="msg-chat-avatar">
          <img src={profileImg} alt={contact.name} />
        </div>
        <div className="msg-chat-info">
          <div className="msg-chat-name">{contact.name}</div>
          <div className="msg-chat-role">{contact.role}</div>
        </div>
      </div>

      <div className="msg-chat-body">
        {messages.map(m => (
          <div key={m.id} className={`msg-bubble-group ${m.from}`}>
            <div className={`msg-bubble ${m.from}`}>{m.text}</div>
            <span className="msg-bubble-time">{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="msg-chat-input-bar">
        <input
          className="msg-chat-input"
          placeholder="Type.."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="msg-send-btn" onClick={send}><SendIcon /></button>
      </div>
    </div>
  );
}

/* ── Messages List ── */
export default function InstructorMessages() {
  const [activeContact, setActiveContact] = useState(null);

  if (activeContact) {
    return <ChatView contact={activeContact} onBack={() => setActiveContact(null)} />;
  }

  return (
    <div className="msg-list-page">
      <h1 className="msg-list-title">Chat</h1>
      <div className="msg-list">
        {CONTACTS.map(c => (
          <div key={c.id} className="msg-list-item" onClick={() => setActiveContact(c)}>
            <div className="msg-avatar-wrap">
              <div className="msg-avatar">
                <img src={profileImg} alt={c.name} />
              </div>
              {c.online  && !c.unread && <span className="msg-online-dot" />}
              {c.unread  && <span className="msg-unread-dot" />}
            </div>
            <div className="msg-list-body">
              <div className="msg-list-name">{c.name}</div>
              <div className={`msg-list-preview${c.unread ? ' unread' : ''}`}>{c.preview}</div>
            </div>
            <div className="msg-list-meta">
              <span className="msg-list-time">{c.time}</span>
              {c.unread && <span className="msg-unread-badge" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
