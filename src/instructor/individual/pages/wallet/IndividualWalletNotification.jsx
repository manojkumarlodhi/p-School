import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './individualwallet.css';

const TODAY_NOTIFS = [
  { id: 1, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 2, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
];

const YESTERDAY_NOTIFS = [
  { id: 3, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 4, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 5, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 6, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
];

const InstitutionIcon = () => (
  <div className="iwallet-notif-icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  </div>
);

export default function IndividualWalletNotification() {
  const navigate = useNavigate();
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected]     = useState(new Set());

  const allIds = [...TODAY_NOTIFS, ...YESTERDAY_NOTIFS].map(n => n.id);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleClearAll = () => {
    setSelected(new Set());
    setSelectMode(false);
  };

  const handleDeleteSelected = () => {
    setSelected(new Set());
    setSelectMode(false);
  };

  const renderNotif = (n) => (
    <div key={n.id}
      className={`iwallet-notif-item${selected.has(n.id) ? ' selected' : ''}`}
      onClick={() => selectMode && toggle(n.id)}>
      {selectMode && (
        <input type="checkbox" className="iwallet-notif-check"
          checked={selected.has(n.id)}
          onChange={() => toggle(n.id)}
          onClick={e => e.stopPropagation()} />
      )}
      <InstitutionIcon />
      <div className="iwallet-notif-body">
        <div className="iwallet-notif-text">
          {n.text} <span className="iwallet-notif-link">{n.link}</span>
        </div>
        <div className="iwallet-notif-from">{n.from}</div>
      </div>
      <div className="iwallet-notif-time">{n.time}</div>
    </div>
  );

  return (
    <div className="iwallet-page">
      <div className="iwallet-page-header">
        <div>
          <h1 className="iwallet-page-title">Wallet Notifications</h1>
          <span className="iwallet-breadcrumb">Home / Wallet / Notifications</span>
        </div>
        <div className="iwallet-notif-header-actions">
          {selectMode ? (
            <button className="iwallet-notif-delete-btn" onClick={handleDeleteSelected}
              disabled={selected.size === 0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </button>
          ) : (
            <>
              <button className="iwallet-notif-action-btn" onClick={() => setSelectMode(true)}>Select</button>
              <button className="iwallet-notif-action-btn" onClick={handleClearAll}>Clear All</button>
            </>
          )}
        </div>
      </div>

      <div className="iwallet-notif-content-card">
        <div className="iwallet-notif-section-label">Today</div>
        {TODAY_NOTIFS.map(renderNotif)}
        <div className="iwallet-notif-section-label">Yesterday</div>
        {YESTERDAY_NOTIFS.map(renderNotif)}
      </div>
    </div>
  );
}
