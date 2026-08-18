import { useState } from 'react';
import './institutionnotification.css';

/* ── Building icon for notification avatar ── */
const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#ef4444" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

const NOTIF_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more';
const NOTIF_TEXT_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ....more';

const INITIAL_NOTIFS = [
  { id: 1, group: 'Today',     text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 2, group: 'Today',     text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 3, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 4, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 5, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
  { id: 6, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Bright Future Academy' },
];

const SELECTABLE_NOTIFS = [
  { id: 1, group: 'Today',     text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: true  },
  { id: 2, group: 'Today',     text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: false },
  { id: 3, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: true  },
  { id: 4, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: false },
  { id: 5, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: false },
  { id: 6, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Bright Future Academy', checked: true  },
];

/* ── Single notification item ── */
function NotifItem({ item, selectable, checked, onToggle }) {
  return (
    <div className={`inotif-item${checked ? ' inotif-item--checked' : ''}`}>
      {selectable && (
        <input
          type="checkbox"
          className="inotif-checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          aria-label="Select notification"
        />
      )}
      <div className="inotif-avatar">
        <BuildingIcon />
      </div>
      <div className="inotif-content">
        <div className="inotif-text">{item.text}</div>
        <div className="inotif-from">{item.from}</div>
      </div>
      <div className="inotif-time">{item.time}</div>
    </div>
  );
}

/* ── Group of notifications ── */
function NotifGroup({ label, items, selectable, checked, onToggle }) {
  return (
    <div className="inotif-group">
      <div className="inotif-group-label">{label}</div>
      {items.map(item => (
        <NotifItem
          key={item.id}
          item={item}
          selectable={selectable}
          checked={checked?.[item.id] ?? item.checked}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default function InstitutionNotification() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [selectChecked, setSelectChecked] = useState(
    Object.fromEntries(SELECTABLE_NOTIFS.map(n => [n.id, n.checked]))
  );

  function clearAll() { setNotifs([]); }

  function toggleCheck(id) {
    setSelectChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function deleteSelected() {
    const toDelete = Object.entries(selectChecked)
      .filter(([, v]) => v).map(([k]) => Number(k));
    setSelectChecked(prev => {
      const next = { ...prev };
      toDelete.forEach(id => { next[id] = false; });
      return next;
    });
  }

  const todayNotifs     = notifs.filter(n => n.group === 'Today');
  const yesterdayNotifs = notifs.filter(n => n.group === 'Yesterday');

  const selToday     = SELECTABLE_NOTIFS.filter(n => n.group === 'Today');
  const selYesterday = SELECTABLE_NOTIFS.filter(n => n.group === 'Yesterday');

  return (
    <div className="inotif-page">
      <div className="inotif-columns">

        {/* ── Left panel — read-only list ── */}
        <div className="inotif-panel">
          <div className="inotif-panel-header">
            <h2 className="inotif-panel-title">Notification</h2>
            <button className="inotif-clear-btn" onClick={clearAll}>Clear All</button>
          </div>

          {notifs.length === 0 ? (
            <div className="inotif-empty">No notifications</div>
          ) : (
            <>
              {todayNotifs.length > 0 && (
                <NotifGroup label="Today" items={todayNotifs} selectable={false} />
              )}
              {yesterdayNotifs.length > 0 && (
                <NotifGroup label="Yesterday" items={yesterdayNotifs} selectable={false} />
              )}
            </>
          )}
        </div>

        {/* ── Right panel — selectable list ── */}
        <div className="inotif-panel">
          <div className="inotif-panel-header">
            <h2 className="inotif-panel-title">Notification</h2>
            <button className="inotif-delete-btn" onClick={deleteSelected} aria-label="Delete selected">
              <TrashIcon />
            </button>
          </div>

          <NotifGroup
            label="Today"
            items={selToday}
            selectable
            checked={selectChecked}
            onToggle={toggleCheck}
          />
          <NotifGroup
            label="Yesterday"
            items={selYesterday}
            selectable
            checked={selectChecked}
            onToggle={toggleCheck}
          />
        </div>

      </div>
    </div>
  );
}
