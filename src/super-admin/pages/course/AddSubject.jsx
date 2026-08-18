import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './addsubject.css';

/* Custom dropdown */
function Dropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o === value);

  return (
    <div className="as-dropdown" ref={ref}>
      <button
        type="button"
        className={`as-dropdown-trigger${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected ? '' : 'as-placeholder'}>{selected || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round"
          className={`as-chevron${open ? ' up' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="as-dropdown-panel">
          {options.map((opt) => (
            <button key={opt} type="button"
              className={`as-dropdown-option${opt === value ? ' selected' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AddSubject() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/course-management/courses/${courseId}/subjects`);
  };

  return (
    <div className="as-page">

      {/* ── Page header ── */}
      <div className="as-page-header">
        <div className="as-header-left">
          <button className="as-back-btn"
            onClick={() => navigate(`/dashboard/course-management/courses/${courseId}/subjects`)} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="as-page-title">Add New Subject</h1>
        </div>
        <span className="as-breadcrumb">Course Management</span>
      </div>

      {/* ── Card ── */}
      <div className="as-body">
        <div className="as-card">
          <form onSubmit={handleSubmit} noValidate>

            {/* Two-column row */}
            <div className="as-form-row">
              <div className="as-form-group">
                <label className="as-label" htmlFor="as-name">Subject Name</label>
                <input
                  id="as-name"
                  className="as-input"
                  type="text"
                  placeholder="Core Java"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="as-form-group">
                <label className="as-label">Order</label>
                <Dropdown
                  placeholder="Auto / Manual"
                  options={['Auto', 'Manual', 'Auto / Manual']}
                  value={order}
                  onChange={setOrder}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="as-actions">
              <button type="button" className="as-btn-cancel"
                onClick={() => navigate(`/dashboard/course-management/courses/${courseId}/subjects`)}>
                Cancel
              </button>
              <button type="submit" className="as-btn-submit">
                Add Subject
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
