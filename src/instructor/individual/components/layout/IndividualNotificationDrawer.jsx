import { useState } from 'react';
import './individuallayout.css';

const INIT_TODAY = [
  { id: 1, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 2, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
];

const INIT_YESTERDAY = [
  { id: 3, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 4, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 5, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
  { id: 6, text: 'Lorem ipsum dolor sit amet', link: 'learn more....', from: 'Bright Future Academy', time: '2 hours Ago' },
];

const InstitutionIcon = () => (
  <div className="indiv-nd-icon">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  </div>
);

export default function IndividualNotificationDrawer({ open, onClose }) {
  const [todayList,     setTodayList]     = useState(INIT_TODAY);
  const [yesterdayList, setYesterdayList] = useState(INIT_YESTERDAY);
  const [selectMode,    setSelectMode]    = useState(false);
  const [selected,      setSelected]      = useState(new Set());

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleClearAll = () => {
    setTodayList([]);
    setYesterdayList([]);
    setSelected(new Set());
    setSelectMode(false);
  };

  const handleDeleteSelected = () => {
    setTodayList(prev => prev.filter(n => !selected.has(n.id)));
    setYesterdayList(prev => prev.filter(n => !selected.has(n.id)));
    setSelected(new Set());
    setSelectMode(false);
  };

  const handleSelectToggle = () => {
    setSelectMode(v => !v);
    setSelected(new Set());
  };

  const isEmpty = todayList.length === 0 && yesterdayList.length === 0;

  const renderItem = (n) => (
    <div
      key={n.id}
      className={`indiv-nd-item${selected.has(n.id) ? ' selected' : ''}`}
      onClick={() => selectMode && toggle(n.id)}
    >
      {selectMode && (
        <input
          type="checkbox"
          className="indiv-nd-check"
          checked={selected.has(n.id)}
          onChange={() => toggle(n.id)}
          onClick={e => e.stopPropagation()}
        />
      )}
      <InstitutionIcon />
      <div className="indiv-nd-body">
        <div className="indiv-nd-text">
          {n.text} <span className="indiv-nd-link">{n.link}</span>
        </div>
        <div className="indiv-nd-from">{n.from}</div>
      </div>
      <div className="indiv-nd-time">{n.time}</div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="indiv-nd-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      {/* Drawer panel */}
      <aside className={`indiv-nd-drawer${open ? ' open' : ''}`} aria-label="Notifications">
        {/* Drawer header */}
        <div className="indiv-nd-header">
          <div className="indiv-nd-header-left">
            <button className="indiv-nd-close-btn" onClick={onClose} aria-label="Close notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <h2 className="indiv-nd-title">Notifications</h2>
          </div>

          <div className="indiv-nd-header-actions">
            {selectMode ? (
              <button
                className="indiv-nd-delete-btn"
                onClick={handleDeleteSelected}
                disabled={selected.size === 0}
                aria-label="Delete selected"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
                {selected.size > 0 && <span className="indiv-nd-del-count">{selected.size}</span>}
              </button>
            ) : (
              !isEmpty && (
                <>
                  <button className="indiv-nd-action-btn" onClick={handleSelectToggle}>Select</button>
                  <button className="indiv-nd-action-btn danger" onClick={handleClearAll}>Clear All</button>
                </>
              )
            )}
          </div>
        </div>

        {/* Drawer body */}
        <div className="indiv-nd-body-scroll">
          {isEmpty ? (
            <div className="indiv-nd-empty">
              <div className="indiv-nd-empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
              </div>
              <p className="indiv-nd-empty-text">No notifications yet</p>
            </div>
          ) : (
            <>
              {todayList.length > 0 && (
                <div className="indiv-nd-section">
                  <div className="indiv-nd-section-label">Today</div>
                  {todayList.map(renderItem)}
                </div>
              )}
              {yesterdayList.length > 0 && (
                <div className="indiv-nd-section">
                  <div className="indiv-nd-section-label">Yesterday</div>
                  {yesterdayList.map(renderItem)}
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
