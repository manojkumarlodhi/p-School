import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg   from '../../../assets/images/logo.jpg';
import './institutionlayout.css';

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
      <rect x="0"     y="0" width="7.33" height="15" fill="#002395" />
      <rect x="7.33"  y="0" width="7.34" height="15" fill="#FFFFFF" />
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

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  });

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="inst-header-lang" role="button" tabIndex={0}
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
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
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
];

/* â”€â”€ Shared notification list renderer â”€â”€ */
function NotifPanel({ notifs, onClear, onMarkRead, selectable, checked, onToggle, onDelete }) {
  const todayNotifs     = notifs.filter(n => n.group === 'Today');
  const yesterdayNotifs = notifs.filter(n => n.group === 'Yesterday');

  const renderGroup = (label, items) => items.length === 0 ? null : (
    <div key={label}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', padding: '10px 16px 4px' }}>{label}</div>
      {items.map(n => {
        const isChecked = checked?.[n.id] ?? false;
        return (
          <div key={n.id}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: isChecked ? '#e0f2fe' : '#fff', transition: 'background 0.12s' }}
            onClick={() => selectable ? onToggle?.(n.id) : onMarkRead?.(n.id)}>
            {selectable && (
              <input type="checkbox" style={{ marginTop: 4, accentColor: '#1ba8d5', flexShrink: 0, width: 15, height: 15 }}
                checked={isChecked}
                onChange={() => onToggle?.(n.id)}
                onClick={e => e.stopPropagation()} />
            )}
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BuildingIcon />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.5, marginBottom: 3 }}>{n.text}</div>
              <div style={{ fontSize: 11.5, color: '#1ba8d5', fontWeight: 600 }}>{n.from}</div>
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}>{n.time}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8eaf0', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid #f0f2f5', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1ba8d5' }}>Notification</span>
        {selectable ? (
          <button onClick={onDelete}
            style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #fecaca', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
            </svg>
          </button>
        ) : (
          <button onClick={onClear} style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', background: 'none', border: 'none', cursor: 'pointer' }}>Clear All</button>
        )}
      </div>
      {/* Panel body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {notifs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', color: '#9ca3af', fontSize: 13, gap: 8 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            No notifications
          </div>
        ) : (
          <>
            {renderGroup('Today', todayNotifs)}
            {renderGroup('Yesterday', yesterdayNotifs)}
          </>
        )}
      </div>
    </div>
  );
}

/* â”€â”€ Notification Drawer â€” two panels side by side â”€â”€ */
function NotificationDrawer({ open, onClose }) {
  const INIT = [
    { id: 1, group: 'Today',     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
    { id: 2, group: 'Today',     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
    { id: 3, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
    { id: 4, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
    { id: 5, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
    { id: 6, group: 'Yesterday', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', time: '2 hours Ago', from: 'Bright Future Academy' },
  ];
  const [notifs,  setNotifs]  = useState(INIT);
  const [checked, setChecked] = useState({ 1: true, 3: true, 6: true });

  function clearAll()    { setNotifs([]); }
  function markRead(id)  { /* read-only panel â€” no action needed */ }
  function toggleCheck(id) { setChecked(prev => ({ ...prev, [id]: !prev[id] })); }
  function deleteSelected() {
    const toDelete = new Set(Object.entries(checked).filter(([,v]) => v).map(([k]) => Number(k)));
    setChecked({});
    setNotifs(prev => prev.filter(n => !toDelete.has(n.id)));
  }

  return (
    <>
      {/* Overlay */}
      <div className={`inst-notif-overlay${open ? ' open' : ''}`} onClick={onClose} />

      {/* Wide drawer for two panels */}
      <div className={`inst-notif-drawer inst-notif-drawer--wide${open ? ' open' : ''}`}>

        {/* Drawer top bar with X */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', flexShrink: 0 }}>
          <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>Notification</span>
          <button onClick={onClose}
            style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
            <CloseIcon />
          </button>
        </div>

        {/* Two panels */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 12px 12px', overflow: 'hidden', minHeight: 0 }}>
          <NotifPanel notifs={notifs} onClear={clearAll} onMarkRead={markRead} />
          <NotifPanel notifs={notifs} selectable checked={checked} onToggle={toggleCheck} onDelete={deleteSelected} />
        </div>

      </div>
    </>
  );
}


function InstitutionUserMenu() {
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
      icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
      label: 'My Profile',
      action: () => { navigate('/institution/dashboard/profile'); setOpen(false); },
    },
    {
      icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>),
      label: 'Settings',
      action: () => { navigate('/institution/dashboard'); setOpen(false); },
    },
    {
      icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
      label: 'Logout',
      color: '#ef4444',
      action: () => { navigate('/institution/login'); setOpen(false); },
    },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="inst-header-user" role="button" tabIndex={0} onClick={() => setOpen(o => !o)}>
        <div className="inst-header-avatar">
          <span className="inst-header-avatar-letter">P</span>
        </div>
        <div className="inst-header-user-info">
          <div className="inst-header-user-name">Institution</div>
          <div className="inst-header-user-role">Admin</div>
        </div>
      </div>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', zIndex: 500, minWidth: 200, overflow: 'hidden' }}>
          {/* Profile header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #f0f2f5', background: '#fafbfc' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#1ba8d5,#38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>P</span>
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>Institution</div>
              <div style={{ fontSize: 11.5, color: '#6b7280' }}>Admin</div>
            </div>
          </div>
          {/* Menu items */}
          {MENU_ITEMS.map((item, i) => (
            <div key={i}
              onMouseDown={e => { e.preventDefault(); item.action(); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', cursor: 'pointer', color: item.color || '#374151', fontSize: 13.5, borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid #f3f4f6' : 'none', transition: 'background 0.12s' }}
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

export default function InstitutionHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <header className="inst-header">

        {/* Mobile logo */}
        <div className="inst-header-logo-mobile">
          <img src={logoImg} alt="Pschool" className="inst-header-logo-img"/>
        </div>

        {/* Mobile hamburger */}
        <button className="inst-header-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        <div className="inst-header-spacer"/>

        {/* Language dropdown */}
        <LanguageSelector />

        <div className="inst-header-divider"/>

        {/* Settings */}
        <button className="inst-header-icon-btn" aria-label="Settings">
          <SettingsIcon/>
        </button>

        {/* Bell â€” opens notification drawer */}
        <button
          className="inst-header-icon-btn"
          aria-label="Notifications"
          onClick={() => setNotifOpen(true)}
        >
          <BellIcon/>
          <span className="inst-notif-badge" aria-hidden="true"/>
        </button>

        <div className="inst-header-divider"/>

        <InstitutionUserMenu />

      </header>

      {/* Notification Drawer */}
      <NotificationDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}

