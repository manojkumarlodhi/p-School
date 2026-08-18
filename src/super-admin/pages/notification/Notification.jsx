import './notification.css';

const NOTIFS = [
  {
    group: 'Today',
    items: [
      { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
      { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
    ],
  },
  {
    group: 'Yesterday',
    items: [
      { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
      { id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
      { id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
      { id: 6, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor eiusmod....more', org: 'Bright Future Academy', time: '2 hours Ago' },
    ],
  },
];

/* Building icon */
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="#1ba8d5" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z" />
    </svg>
  );
}

export default function Notification() {
  return (
    <div className="notif-page">
      <div className="notif-card">
        {/* Header */}
        <div className="notif-header">
          <h2 className="notif-title">Notification</h2>
          <button className="notif-clear">Clear All</button>
        </div>

        {/* List */}
        <div className="notif-list">
          {NOTIFS.map((group) => (
            <div key={group.group}>
              <div className="notif-group-label">{group.group}</div>
              <div className="notif-group-items">
                {group.items.map((item) => (
                  <div key={item.id} className="notif-item">
                    <div className="notif-item-icon">
                      <BuildingIcon />
                    </div>
                    <div className="notif-item-body">
                      <p className="notif-item-text">{item.text}</p>
                      <span className="notif-item-org">{item.org}</span>
                    </div>
                    <span className="notif-item-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
