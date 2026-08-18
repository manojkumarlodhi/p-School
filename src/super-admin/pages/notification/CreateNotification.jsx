import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createnotification.css';

const NOTIF_TYPES = ['Announcement', 'System Alert', 'Billing Update', 'Feature Update'];
const AUDIENCES   = ['All Institutions', 'Institution Admins', 'All Users', 'Selected Institutions'];

/* ── Custom dropdown ── */
function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="cn-dropdown-wrap" ref={ref}>
      <button type="button"
        className={`cn-select-btn${open ? ' cn-select-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}>
        <span className={value ? 'cn-select-val' : 'cn-select-ph'}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          className={`cn-chevron${open ? ' cn-chevron--up' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <ul className="cn-dropdown-list">
          {options.map(opt => (
            <li key={opt}
              className={`cn-dropdown-item${value === opt ? ' cn-dropdown-item--active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Radio ── */
function Radio({ label, checked, onChange }) {
  return (
    <label className="cn-radio-label">
      <span className={`cn-radio-circle${checked ? ' cn-radio-circle--checked' : ''}`} aria-hidden="true">
        {checked && <span className="cn-radio-dot"/>}
      </span>
      <input type="radio" className="cn-radio-input" checked={checked} onChange={onChange} aria-label={label}/>
      <span className="cn-radio-text">{label}</span>
    </label>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function CreateNotification() {
  const navigate = useNavigate();

  const [title, setTitle]           = useState('Platform Maintenance Scheduled');
  const [type, setType]             = useState('Announcement');
  const [message, setMessage]       = useState('');
  const [deliveryMode, setDelivery] = useState('in-app'); // 'in-app' | 'email' | 'both'
  const [audience, setAudience]     = useState('All Institutions');
  const [sendMode, setSendMode]     = useState('later');  // 'now' | 'later'
  const [date, setDate]             = useState('01/02/2026');
  const [time, setTime]             = useState('01:00 pm');

  return (
    <div className="cn-page">

      {/* ── Page header ── */}
      <div className="cn-page-header">
        <div className="cn-header-left">
          <button className="cn-back-btn"
            onClick={() => navigate('/dashboard/notification')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="cn-page-title">Create Notification</h1>
        </div>
        <span className="cn-breadcrumb">
          Notifications Center &rsaquo; Create Notification
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="cn-body">
        <div className="cn-form">

          {/* Notification Title */}
          <div className="cn-field">
            <label className="cn-label">Notification Title</label>
            <input className="cn-input" value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Notification title"/>
          </div>

          {/* Notification Type */}
          <div className="cn-field">
            <label className="cn-label">Notification Type</label>
            <Dropdown value={type} onChange={setType}
              options={NOTIF_TYPES} placeholder="Select type"/>
          </div>

          {/* Message */}
          <div className="cn-field">
            <label className="cn-label">Message</label>
            <textarea className="cn-textarea" rows={5} value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write notification message here..."/>
          </div>

          {/* Delivery Mode */}
          <div className="cn-field">
            <label className="cn-label">Delivery Mode</label>
            <div className="cn-radio-group">
              <Radio label="In-App Notification" checked={deliveryMode === 'in-app'}
                onChange={() => setDelivery('in-app')}/>
              <Radio label="Email" checked={deliveryMode === 'email'}
                onChange={() => setDelivery('email')}/>
              <Radio label="Both" checked={deliveryMode === 'both'}
                onChange={() => setDelivery('both')}/>
            </div>
          </div>

          {/* Audience */}
          <div className="cn-field">
            <label className="cn-label">Audience</label>
            <Dropdown value={audience} onChange={setAudience}
              options={AUDIENCES} placeholder="Select audience"/>
          </div>

          {/* Send */}
          <div className="cn-field">
            <label className="cn-label">Send</label>
            <div className="cn-radio-group">
              <Radio label="Send Now" checked={sendMode === 'now'}
                onChange={() => setSendMode('now')}/>
              <Radio label="Schedule for Later" checked={sendMode === 'later'}
                onChange={() => setSendMode('later')}/>
            </div>
          </div>

          {/* Date + Time — shown when scheduling */}
          {sendMode === 'later' && (
            <div className="cn-datetime-row">
              <div className="cn-field">
                <label className="cn-label">Date</label>
                <input className="cn-input" value={date}
                  onChange={e => setDate(e.target.value)} placeholder="MM/DD/YYYY"/>
              </div>
              <div className="cn-field">
                <label className="cn-label">Time</label>
                <input className="cn-input" value={time}
                  onChange={e => setTime(e.target.value)} placeholder="HH:MM am/pm"/>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="cn-footer">
            <button className="cn-btn-cancel"
              onClick={() => navigate('/dashboard/notification')}>
              Cancel
            </button>
            <button className="cn-btn-draft">Save as Draft</button>
            <button className="cn-btn-send">Send Notification</button>
          </div>

        </div>
      </div>
    </div>
  );
}
