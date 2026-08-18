import { useState, useRef, useEffect } from 'react';
import './scheduleinterviewmodal.css';

const PLATFORMS = ['Google meet', 'Zoom', 'Microsoft Teams'];

export default function ScheduleInterviewModal({
  instructorName = 'Sarah Johnson',
  onClose,
  onGenerate,
}) {
  const [date, setDate]           = useState('01/08/20026');
  const [time, setTime]           = useState('12:30 pm');
  const [platform, setPlatform]   = useState('');
  const [dropOpen, setDropOpen]   = useState(false);
  const [notes, setNotes]         = useState('');
  const dropRef                   = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleGenerate() {
    onGenerate?.({ date, time, platform, notes });
  }

  return (
    <div className="si-backdrop" role="dialog" aria-modal="true" aria-labelledby="si-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="si-modal">

        {/* ── Header ── */}
        <div className="si-header">
          <h2 className="si-title" id="si-title">Schedule Interview</h2>
          <button className="si-close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="si-divider"/>

        {/* ── Body ── */}
        <div className="si-body">

          <p className="si-subtitle">Schedule an interview with {instructorName}</p>

          {/* Interview Date */}
          <div className="si-field">
            <label className="si-label" htmlFor="si-date">Interview Date</label>
            <input
              id="si-date"
              type="text"
              className="si-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="MM/DD/YYYY"
            />
          </div>

          {/* Interview Time */}
          <div className="si-field">
            <label className="si-label" htmlFor="si-time">Interview Time</label>
            <input
              id="si-time"
              type="text"
              className="si-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="HH:MM am/pm"
            />
          </div>

          {/* Meeting Platform — custom dropdown */}
          <div className="si-field" ref={dropRef}>
            <label className="si-label">Meeting Platform</label>
            <button
              type="button"
              className={`si-select-btn${dropOpen ? ' si-select-btn--open' : ''}`}
              onClick={() => setDropOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropOpen}
            >
              <span className={platform ? 'si-select-value' : 'si-select-placeholder'}>
                {platform || 'Select Platform'}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
                className={`si-chevron${dropOpen ? ' si-chevron--up' : ''}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {dropOpen && (
              <ul className="si-dropdown" role="listbox" aria-label="Meeting platform options">
                {PLATFORMS.map((p) => (
                  <li
                    key={p}
                    role="option"
                    aria-selected={platform === p}
                    className={`si-dropdown-item${platform === p ? ' si-dropdown-item--active' : ''}`}
                    onClick={() => { setPlatform(p); setDropOpen(false); }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Interview Notes */}
          <div className="si-field">
            <label className="si-label" htmlFor="si-notes">Interview Notes (Optional)</label>
            <textarea
              id="si-notes"
              className="si-textarea"
              placeholder="Basic tools for instructors to get started"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

        </div>

        <div className="si-divider"/>

        {/* ── Footer ── */}
        <div className="si-footer">
          <button className="si-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="si-btn-generate" onClick={handleGenerate}>
            Generate Secure Link
          </button>
        </div>

      </div>
    </div>
  );
}
