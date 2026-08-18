import { useState, useRef, useEffect } from 'react';
import './classes.css';
import { useNavigate } from 'react-router-dom';


const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ALL_STUDENTS = [
  'Aarav Sharma', 'Priya Patel', 'Rohan Verma', 'Ananya Singh', 'Arjun Kumar',
  'Diya Gupta', 'Kabir Mehta', 'Ishita Reddy', 'Vihaan Joshi', 'Saanvi Nair',
  'Aditya Rao', 'Myra Desai', 'Reyansh Iyer', 'Kiara Kapoor', 'Arnav Bhat',
];

function MultiSelect({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef(null);

  const filtered = ALL_STUDENTS.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(s) {
    onChange(selected.includes(s) ? selected.filter(x => x !== s) : [...selected, s]);
  }

  function remove(s) {
    onChange(selected.filter(x => x !== s));
  }

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="incls-multi-wrap" ref={wrapRef}>
      <div
        className={`incls-multi-box${open ? ' open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        {selected.length === 0 ? (
          <span className="incls-multi-placeholder">Multi- Students Select</span>
        ) : (
          selected.map(s => (
            <span key={s} className="incls-student-chip">
              {s}
              <button
                className="incls-student-chip-remove"
                onClick={e => { e.stopPropagation(); remove(s); }}
              >
                <CloseIcon />
              </button>
            </span>
          ))
        )}
      </div>

      {open && (
        <div className="incls-dropdown">
          <div className="incls-dropdown-search">
            <input
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          {filtered.map(s => (
            <div
              key={s}
              className={`incls-dropdown-option${selected.includes(s) ? ' selected' : ''}`}
              onClick={e => { e.stopPropagation(); toggle(s); }}
            >
              {s}
              {selected.includes(s) && <span>âœ“</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InstructorCreateClass() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    grade: '',
    course: '',
    instructor: '',
    students: [],
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleCreate() {
    console.log('Creating class:', form);
    navigate('/instructor/dashboard/classes');
  }

  return (
    <div className="incls-page">
      <div className="incls-page-header">
        <button className="incls-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Create Class</span>
        </button>
        <span className="incls-breadcrumb">Home / Create Class</span>
      </div>

      <div className="incls-card">
        {/* Class / Section Name */}
        <div className="incls-field">
          <label className="incls-label">Class / Section Name</label>
          <input
            className="incls-input"
            placeholder="7A"
            value={form.name}
            onChange={e => set('name', e.target.value)}
          />
        </div>

        {/* Grade */}
        <div className="incls-field">
          <label className="incls-label">Grade</label>
          <input
            className="incls-input"
            placeholder="Grade 6"
            value={form.grade}
            onChange={e => set('grade', e.target.value)}
          />
        </div>

        {/* Course */}
        <div className="incls-field">
          <label className="incls-label">Course</label>
          <div className="incls-select-wrap">
            <select className="incls-select" value={form.course} onChange={e => set('course', e.target.value)}>
              <option value="">Coding</option>
              <option>Robotics</option>
              <option>Electronics</option>
              <option>Mechanics</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Assign Instructor */}
        <div className="incls-field">
          <label className="incls-label">Assign Instructor</label>
          <div className="incls-select-wrap">
            <select className="incls-select" value={form.instructor} onChange={e => set('instructor', e.target.value)}>
              <option value="">Rahul Verma</option>
              <option>Priya Sharma</option>
              <option>Amit Patel</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Select Students */}
        <div className="incls-field">
          <label className="incls-label">Select Students</label>
          <MultiSelect selected={form.students} onChange={v => set('students', v)} />
        </div>

        {/* Actions */}
        <div className="incls-actions">
          <button className="incls-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="incls-btn-create" onClick={handleCreate}>
            Create Class
          </button>
        </div>
      </div>
    </div>
  );
}

