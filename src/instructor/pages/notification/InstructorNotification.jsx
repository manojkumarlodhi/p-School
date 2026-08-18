import { useState } from 'react';
import './instructornotification.css';

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
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
  { id: 1, group: 'Today',     text: NOTIF_TEXT,       time: '2 hours Ago', from: 'Grade 7A — Assignment Submitted' },
  { id: 2, group: 'Today',     text: NOTIF_TEXT,       time: '3 hours Ago', from: 'Grade 6B — New Student Added'    },
  { id: 3, group: 'Yesterday', text: NOTIF_TEXT,       time: '1 day Ago',   from: 'Grade 8C — Resource Uploaded'   },
  { id: 4, group: 'Yesterday', text: NOTIF_TEXT,       time: '1 day Ago',   from: 'Grade 7D — Assignment Graded'   },
  { id: 5, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 days Ago',  from: 'Grade 7A — Lab Task Completed'  },
  { id: 6, group: 'Yesterday', text: NOTIF_TEXT,       time: '2 days Ago',  from: 'Grade 6B — Message Received'    },
];

const SELECTABLE_NOTIFS = [
  { id: 1, group: 'Today',     text: NOTIF_TEXT_SHORT, time: '2 hours Ago', from: 'Grade 7A — Assignment Submitted', checked: true  },
  { id: 2, group: 'Today',     text: NOTIF_TEXT_SHORT, time: '3 hours Ago', from: 'Grade 6B — New Student Added',    checked: false },
  { id: 3, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '1 day Ago',   from: 'Grade 8C — Resource Uploaded',   checked: true  },
  { id: 4, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '1 day Ago',   from: 'Grade 7D — Assignment Graded',   checked: false },
  { id: 5, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 days Ago',  from: 'Grade 7A — Lab Task Completed',  checked: false },
  { id: 6, group: 'Yesterday', text: NOTIF_TEXT_SHORT, time: '2 days Ago',  from: 'Grade 6B — Message Received',    checked: true  },
];

function NotifItem({ item, selectable, checked, onToggle }) {
  return (
    <div className={`innotif-item${checked ? ' innotif-item--checked' : ''}`}>
      {selectable && (
        <input
          type="checkbox"
          className="innotif-checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          aria-label="Select notification"
        />
      )}
      <div className="innotif-avatar"><BellIcon /></div>
      <div className="innotif-content">
        <div className="innotif-text">{item.text}</div>
        <div className="innotif-from">{item.from}</div>
      </div>
      <div className="innotif-time">{item.time}</div>
    </div>
  );
}

function NotifGroup({ label, items, selectable, checked, onToggle }) {
  return (
    <div className="innotif-group">
      <div className="innotif-group-label">{label}</div>
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

export default function InstructorNotification() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [selectChecked, setSelectChecked] = useState(
    Object.fromEntries(SELECTABLE_NOTIFS.map(n => [n.id, n.checked]))
  );

  function clearAll() { setNotifs([]); }

  function toggleCheck(id) {
    setSelectChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function deleteSelected() {
    setSelectChecked(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (next[k]) next[k] = false; });
      return next;
    });
  }

  const todayNotifs     = notifs.filter(n => n.group === 'Today');
  const yesterdayNotifs = notifs.filter(n => n.group === 'Yesterday');
  const selToday        = SELECTABLE_NOTIFS.filter(n => n.group === 'Today');
  const selYesterday    = SELECTABLE_NOTIFS.filter(n => n.group === 'Yesterday');

  return (
    <div className="innotif-page">
      <div className="innotif-page-header">
        <h1 className="innotif-page-title">Notifications</h1>
        <span className="innotif-breadcrumb">Dashboard / Notifications</span>
      </div>

      <div className="innotif-columns">
        {/* Left — read-only list */}
        <div className="innotif-panel">
          <div className="innotif-panel-header">
            <h2 className="innotif-panel-title">Notification</h2>
            <button className="innotif-clear-btn" onClick={clearAll}>Clear All</button>
          </div>
          {notifs.length === 0 ? (
            <div className="innotif-empty">No notifications</div>
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

        {/* Right — selectable list */}
        <div className="innotif-panel">
          <div className="innotif-panel-header">
            <h2 className="innotif-panel-title">Notification</h2>
            <button className="innotif-delete-btn" onClick={deleteSelected} aria-label="Delete selected">
              <TrashIcon />
            </button>
          </div>
          <NotifGroup label="Today"     items={selToday}     selectable checked={selectChecked} onToggle={toggleCheck} />
          <NotifGroup label="Yesterday" items={selYesterday} selectable checked={selectChecked} onToggle={toggleCheck} />
        </div>
      </div>
    </div>
  );
}
