import { useState, useRef, useEffect } from 'react';
import profileImg from '../../../../assets/images/profile.png';
import './individualmessages.css';

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const MicIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const EmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
    stroke="#d1d5db" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

/* ── Data ── */
const CONTACTS = [
  { id: 'c1', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: false },
  { id: 'c2', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: true  },
  { id: 'c3', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: false },
  { id: 'c4', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: false },
  { id: 'c5', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: true  },
  { id: 'c6', name: 'Abhay Thakur',  role: 'UI/Ux Designer', preview: 'I need Some Information a..', time: '24/02/2025', unread: false },
];

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .';

const INITIAL_MESSAGES = [
  { id: 1, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 2, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 3, from: 'them', text: LOREM, time: '10:30 pm' },
  { id: 4, from: 'me',   text: LOREM, time: '10:30 pm' },
  { id: 5, from: 'me',   text: LOREM, time: '10:30 pm' },
];

/* ── Chat Panel ── */
function ChatPanel({ contact, onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, contact]);

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
    <div className="im-chat-panel">
      {/* Chat header */}
      <div className="im-chat-header">
        <button className="im-chat-back" onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <div className="im-chat-avatar">
          <img src={profileImg} alt={contact.name} />
        </div>
        <div className="im-chat-info">
          <div className="im-chat-name">{contact.name}</div>
          <div className="im-chat-role">{contact.role}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="im-chat-body">
        {messages.map(m => (
          <div key={m.id} className={`im-bubble-group ${m.from}`}>
            <div className={`im-bubble ${m.from}`}>{m.text}</div>
            <span className="im-bubble-time">{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="im-chat-input-bar">
        <input
          className="im-chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="im-mic-btn" aria-label="Voice message">
          <MicIcon />
        </button>
        <button className="im-send-btn" onClick={send} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState() {
  return (
    <div className="im-empty-state">
      <EmptyIcon />
      <p className="im-empty-title">Select a conversation</p>
      <p className="im-empty-sub">Choose a contact from the list to start chatting</p>
    </div>
  );
}

/* ── Main ── */
export default function IndividualMessages() {
  const [activeContact, setActiveContact] = useState(null);
  const [search, setSearch] = useState('');
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat'

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.preview.toLowerCase().includes(search.toLowerCase())
  );

  function selectContact(c) {
    setActiveContact(c);
    setMobileView('chat');
  }

  function goBackToList() {
    setMobileView('list');
  }

  return (
    <div className="im-page">
      {/* Page header (desktop only) */}
      <div className="im-page-header">
        <div>
          <h1 className="im-page-title">Messages</h1>
          <p className="im-page-breadcrumb">Home / Messages</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="im-layout">

        {/* ── Left: Contact list ── */}
        <aside className={`im-sidebar${mobileView === 'chat' ? ' im-sidebar--hidden' : ''}`}>
          <div className="im-sidebar-header">
            <h2 className="im-sidebar-title">Chat</h2>
          </div>

          {/* Search */}
          <div className="im-search-wrap">
            <SearchIcon />
            <input
              className="im-search-input"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Contact list */}
          <div className="im-contact-list">
            {filtered.length === 0 ? (
              <p className="im-no-results">No contacts found</p>
            ) : (
              filtered.map(c => (
                <div
                  key={c.id}
                  className={`im-contact-item${activeContact?.id === c.id ? ' active' : ''}${c.unread ? ' unread' : ''}`}
                  onClick={() => selectContact(c)}
                >
                  <div className="im-contact-avatar-wrap">
                    <div className="im-contact-avatar">
                      <img src={profileImg} alt={c.name} />
                    </div>
                    {c.unread && <span className="im-contact-unread-dot" />}
                  </div>
                  <div className="im-contact-body">
                    <div className="im-contact-name">{c.name}</div>
                    <div className={`im-contact-preview${c.unread ? ' unread' : ''}`}>
                      {c.preview}
                    </div>
                  </div>
                  <div className="im-contact-meta">
                    <span className="im-contact-time">{c.time}</span>
                    {c.unread && <span className="im-contact-badge" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ── Right: Chat panel ── */}
        <main className={`im-main${mobileView === 'list' ? ' im-main--hidden' : ''}`}>
          {activeContact ? (
            <ChatPanel
              key={activeContact.id}
              contact={activeContact}
              onBack={goBackToList}
            />
          ) : (
            <EmptyState />
          )}
        </main>

      </div>
    </div>
  );
}
