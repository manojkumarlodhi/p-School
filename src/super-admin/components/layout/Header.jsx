import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg    from '../../../assets/images/logo.jpg';
import profileImg  from '../../../assets/images/profile.png';

/* â”€â”€ US Flag SVG â”€â”€ */
function USFlag() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block' }}>
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x="0" y={i * (15 / 13)} width="22"
          height={15 / 13 + 0.2}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
      ))}
      <rect x="0" y="0" width="9" height={15 * 7 / 13} fill="#3C3B6E" />
      {[0,1,2,3,4,5].map(col =>
        [0,1,2,3,4].map(row => (
          <circle key={`a${col}${row}`}
            cx={0.75 + col * 1.35} cy={0.55 + row * 1.1} r="0.28" fill="#fff" />
        ))
      )}
      {[0,1,2,3,4].map(col =>
        [0,1,2,3].map(row => (
          <circle key={`b${col}${row}`}
            cx={1.42 + col * 1.35} cy={1.1 + row * 1.1} r="0.28" fill="#fff" />
        ))
      )}
    </svg>
  );
}

function FrenchFlag() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block' }}>
      <rect x="0"    y="0" width="7.33" height="15" fill="#002395" />
      <rect x="7.33" y="0" width="7.34" height="15" fill="#FFFFFF" />
      <rect x="14.67" y="0" width="7.33" height="15" fill="#ED2939" />
    </svg>
  );
}

const LANGUAGES = [
  { code: 'en', label: 'English', Flag: USFlag },
  { code: 'fr', label: 'French',  Flag: FrenchFlag },
];

function LanguageSelector() {
  const [open, setOpen]         = useState(false);
  const [selected, setSelected] = useState('en');
  const ref = useRef(null);
  const current = LANGUAGES.find(l => l.code === selected);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="header-lang" role="button" tabIndex={0}
        onClick={() => setOpen(o => !o)}>
        <current.Flag />
        <span>{current.label}</span>
        <ChevronDown />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          background: '#fff', border: '1.5px solid #e5e7eb',
          borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 500, minWidth: 150, overflow: 'hidden',
        }}>
          {LANGUAGES.map(lang => (
            <div key={lang.code}
              onMouseDown={e => { e.preventDefault(); setSelected(lang.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', cursor: 'pointer',
                background: selected === lang.code ? '#f0f9ff' : '#fff',
                borderBottom: '1px solid #f3f4f6',
                fontSize: 13, fontWeight: selected === lang.code ? 600 : 400,
                color: selected === lang.code ? '#1ba8d5' : '#374151',
              }}>
              <lang.Flag />
              <span>{lang.label}</span>
              {selected === lang.code && (
                <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83
               2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33
               1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0
               009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83
               l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2
               2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82
               l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68
               a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0
               001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83
               2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51
               1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z"/>
    </svg>
  );
}

const NOTIF_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....';

const NOTIFICATIONS = [
  { id: 1, group: 'Today',     text: NOTIF_TEXT, time: '2 hours ago', from: 'Bright Future Academy', unread: true  },
  { id: 2, group: 'Today',     text: NOTIF_TEXT, time: '4 hours ago', from: 'Bright Future Academy', unread: true  },
  { id: 3, group: 'Yesterday', text: NOTIF_TEXT, time: '1 day ago',   from: 'Bright Future Academy', unread: false },
  { id: 4, group: 'Yesterday', text: NOTIF_TEXT, time: '1 day ago',   from: 'Bright Future Academy', unread: false },
  { id: 5, group: 'Yesterday', text: NOTIF_TEXT, time: '2 days ago',  from: 'Bright Future Academy', unread: false },
  { id: 6, group: 'Yesterday', text: NOTIF_TEXT, time: '2 days ago',  from: 'Bright Future Academy', unread: false },
];


/* -- Notification Drawer -- */

const NOTIF_INIT = [
  { id: 1, group: 'Today',     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 2, group: 'Today',     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 3, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 4, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 5, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 6, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
];

function NotificationDrawer({ open, onClose }) {
  const [notifs, setNotifs] = useState(NOTIF_INIT);

  const todayNotifs     = notifs.filter(n => n.group === 'Today');
  const yesterdayNotifs = notifs.filter(n => n.group === 'Yesterday');

  function clearAll()   { setNotifs([]); }
  function markRead(id) { setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n)); }

  const renderGroup = (label, items) => items.length === 0 ? null : (
    <div key={label}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', padding: '10px 20px 4px' }}>{label}</div>
      {items.map(n => (
        <div key={n.id}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 20px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: '#fff', transition: 'background 0.12s' }}
          onClick={() => markRead(n.id)}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BuildingIcon />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, marginBottom: 3 }}>{n.text}</div>
            <div style={{ fontSize: 12, color: '#1ba8d5', fontWeight: 600 }}>{n.from}</div>
          </div>
          <div style={{ fontSize: 11.5, color: '#9ca3af', whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}>{n.time}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 400, opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity 0.25s ease' }} onClick={onClose} />
      <div style={{ position: 'fixed', top: 0, right: 0, width: 380, maxWidth: '100vw', height: '100vh', background: '#fff', boxShadow: '-4px 0 32px rgba(0,0,0,0.14)', zIndex: 401, display: 'flex', flexDirection: 'column', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)' }}>
        {/* Header: Notification title + Clear All + X */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '1px solid #f0f2f5', flexShrink: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1ba8d5', margin: 0 }}>Notification</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={clearAll} style={{ fontSize: 13, fontWeight: 600, color: '#374151', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}>Clear All</button>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifs.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: '#9ca3af', fontSize: 13, gap: 10 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              No notifications
            </div>
          ) : (
            <>{renderGroup('Today', todayNotifs)}{renderGroup('Yesterday', yesterdayNotifs)}</>
          )}
        </div>
      </div>
    </>
  );
}




function UserMenu({ profileImg }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  const MENU_ITEMS = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      label: 'My Profile',
      action: () => { navigate('/dashboard/profile'); setOpen(false); },
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      ),
      label: 'Settings',
      action: () => { navigate('/dashboard'); setOpen(false); },
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      ),
      label: 'Logout',
      color: '#ef4444',
      action: () => { navigate('/login'); setOpen(false); },
    },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="header-user" role="button" tabIndex={0} onClick={() => setOpen(o => !o)}>
        <img src={profileImg} alt="Abhay Thakur" className="header-avatar-img" />
        <div className="header-user-info">
          <div className="header-user-name">Abhay Thakur</div>
          <div className="header-user-role">Admin</div>
        </div>
        <ChevronDown />
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#fff', border: '1.5px solid #e5e7eb',
          borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          zIndex: 500, minWidth: 200, overflow: 'hidden',
        }}>
          {/* Profile header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #f0f2f5', background: '#fafbfc' }}>
            <img src={profileImg} alt="Abhay Thakur" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>Abhay Thakur</div>
              <div style={{ fontSize: 11.5, color: '#6b7280' }}>Super Admin</div>
            </div>
          </div>

          {/* Menu items */}
          {MENU_ITEMS.map((item, i) => (
            <div key={i}
              onMouseDown={e => { e.preventDefault(); item.action(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 16px', cursor: 'pointer',
                color: item.color || '#374151', fontSize: 13.5,
                borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid #f3f4f6' : 'none',
                transition: 'background 0.12s',
              }}
              onMouseOver={e => e.currentTarget.style.background = item.color ? '#fff5f5' : '#f9fafb'}
              onMouseOut={e => e.currentTarget.style.background = '#fff'}>
              <span style={{ color: item.color || '#6b7280', display: 'flex' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-logo-mobile">
          <img src={logoImg} alt="Pschool" className="header-logo-img" />
        </div>
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className="header-spacer" />
        <LanguageSelector />
        <div className="header-divider" />
        <button className="header-icon-btn" aria-label="Settings"><SettingsIcon /></button>
        <button className="header-icon-btn" aria-label="Notifications" onClick={() => setNotifOpen(true)}>
          <BellIcon />
          <span className="notif-badge" aria-hidden="true" />
        </button>
        <div className="header-divider" />
        <UserMenu profileImg={profileImg} />
      </header>
      <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}

