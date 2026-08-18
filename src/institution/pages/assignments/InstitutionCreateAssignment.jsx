import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionassignments.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const ChevronDown = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>);
const CloseIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>);
const UploadCloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
  </svg>
);
const SearchIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const ModalCloseIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>);
const CheckIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

const STEPS = [
  { key: 'create', label: 'Create' },
  { key: 'assign', label: 'Assign Assignment' },
];

const ALL_CLASSES = ['Java Class 1','Java Class 2','Java Class 3','Java Class 4','Java Class 5',
  'Java Class 6','Java Class 7','Java Class 8','Java Class 9','Java Class 10',
  'Java Class 11','Java Class 12','Java Class 13'];

const COURSES = ['Java Full Stack Development','MERN Stack','Advance Java','React Advanced'];

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button" className={`iasn-toggle${checked?' iasn-toggle--on':''}`} onClick={() => onChange(!checked)}>
      <span className="iasn-toggle-thumb" />
    </button>
  );
}

/* ── Step indicator ── */
function StepIndicator({ steps, current }) {
  const idx = steps.findIndex(s => s.key === current);
  return (
    <div className="iasn-steps">
      {steps.map((step, i) => {
        const done = i < idx; const active = step.key === current;
        return (
          <div key={step.key} className="iasn-step-item">
            {i > 0 && <div className={`iasn-step-line${done||active?' done':''}`} />}
            <div className={`iasn-step-dot${active?' active':done?' done':''}`} />
            <span className={`iasn-step-label${active?' active':''}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Select Course Modal ── */
function SelectCourseModal({ onClose, onConfirm }) {
  const [selected, setSelected] = useState(['Java Full Stack Development']);
  function toggle(c) {
    setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }
  return (
    <div className="iasn-modal-overlay" onClick={onClose}>
      <div className="iasn-modal" onClick={e => e.stopPropagation()}>
        <div className="iasn-modal-header">
          <div>
            <h3 className="iasn-modal-title">Select Course</h3>
            <p className="iasn-modal-subtitle">Choose which Course this assignment is for</p>
          </div>
          <button className="iasn-modal-close" onClick={onClose}><ModalCloseIcon /></button>
        </div>
        <div className="iasn-modal-body">
          {COURSES.map(c => (
            <label key={c} className={`iasn-course-option${selected.includes(c)?' selected':''}`}
              onClick={() => toggle(c)}>
              <div className={`iasn-course-checkbox${selected.includes(c)?' checked':''}`}>
                {selected.includes(c) && <CheckIcon />}
              </div>
              <span>{c}</span>
            </label>
          ))}
          <div className="iasn-modal-actions">
            <button className="iasn-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="iasn-btn-confirm" onClick={() => { onConfirm(selected); onClose(); }}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Create ── */
function Step1({ data, onChange, onShowCourseModal }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  function handleFile(f) { if (f) { setFile(f.name); onChange('file', f.name); } }

  return (
    <div className="iasn-step-content">
      <div className="iasn-field">
        <label className="iasn-label">Assignment Title</label>
        <input className="iasn-input iasn-input--active" placeholder="Assignment Title"
          value={data.title} onChange={e => onChange('title', e.target.value)} />
      </div>
      <div className="iasn-field">
        <label className="iasn-label">Assignment Category</label>
        <div className="iasn-select-wrap">
          <select className="iasn-select" value={data.category} onChange={e => onChange('category', e.target.value)}>
            <option>Coding</option><option>Electronics</option><option>Mechanics</option><option>Robotics</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="iasn-field">
        <label className="iasn-label">Age Group</label>
        <div className="iasn-select-wrap">
          <select className="iasn-select" value={data.ageGroup} onChange={e => onChange('ageGroup', e.target.value)}>
            <option value="">Age Group</option>
            <option>Youth (10-14)</option><option>Teen (15-18)</option>
            <option>Young Adult (19-24)</option><option>Adult (25-34)</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="iasn-field">
        <label className="iasn-label">Attach Assignment Files</label>
        <div className={`iasn-drop-zone${dragging?' dragging':''}${file?' has-file':''}`}
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files?.[0]);}}
          onClick={()=>fileRef.current?.click()}>
          <UploadCloudIcon />
          {file
            ? <p className="iasn-drop-filename">{file}</p>
            : <><p className="iasn-drop-text"><span className="iasn-drop-link">Upload a file</span> or drag and drop</p>
                <p className="iasn-drop-hint">PDF, DOC, ZIP (Max 10MB)</p></>
          }
          <input ref={fileRef} type="file" style={{display:'none'}} onChange={e=>handleFile(e.target.files?.[0])} />
        </div>
      </div>
      <div className="iasn-field">
        <label className="iasn-label">Total Marks</label>
        <input className="iasn-input" placeholder="100"
          value={data.marks} onChange={e => onChange('marks', e.target.value)} />
      </div>
      <div className="iasn-toggle-row">
        <span className="iasn-toggle-label">Assignment Time</span>
        <Toggle checked={data.timed} onChange={v => onChange('timed', v)} />
      </div>

      {/* Time scheduling fields — shown when toggle is ON */}
      {data.timed && (
        <div className="iasn-time-section">
          {/* Schedule type options */}
          {[
            { key: 'deadline', label: 'Scheduled (Deadline date Only)', sub: 'Set a due date' },
            { key: 'window',   label: 'Scheduled (Date + Time Window)', sub: 'Available only in time window' },
            { key: 'limited',  label: 'Scheduled (Time Limited)',       sub: 'Fixed duration for each student' },
          ].map(opt => (
            <div key={opt.key}
              className={`iasn-schedule-option${data.scheduleType === opt.key ? ' selected' : ''}`}
              onClick={() => onChange('scheduleType', opt.key)}>
              <div className="iasn-schedule-radio-wrap">
                <div className={`iasn-schedule-radio${data.scheduleType === opt.key ? ' checked' : ''}`} />
              </div>
              <div>
                <div className="iasn-schedule-label">{opt.label}</div>
                <div className="iasn-schedule-sub">{opt.sub}</div>
              </div>
            </div>
          ))}

          {/* Deadline only */}
          {data.scheduleType === 'deadline' && (
            <div className="iasn-date-row">
              <div className="iasn-field">
                <label className="iasn-label">Start Date</label>
                <input className="iasn-input" type="date" placeholder="mm/dd/yyyy"
                  value={data.startDate || ''} onChange={e => onChange('startDate', e.target.value)} />
              </div>
              <div className="iasn-field">
                <label className="iasn-label">Due Date</label>
                <input className="iasn-input" type="date" placeholder="mm/dd/yyyy"
                  value={data.dueDate || ''} onChange={e => onChange('dueDate', e.target.value)} />
              </div>
            </div>
          )}

          {/* Date + Time Window */}
          {data.scheduleType === 'window' && (
            <>
              <div className="iasn-date-row">
                <div className="iasn-field">
                  <label className="iasn-label">Start Date &amp; Time — Date</label>
                  <input className="iasn-input" type="date"
                    value={data.startDate || ''} onChange={e => onChange('startDate', e.target.value)} />
                </div>
                <div className="iasn-field">
                  <label className="iasn-label">Time</label>
                  <input className="iasn-input" type="time"
                    value={data.startTime || ''} onChange={e => onChange('startTime', e.target.value)} />
                </div>
              </div>
              <div className="iasn-date-row">
                <div className="iasn-field">
                  <label className="iasn-label">End Date &amp; Time — Date</label>
                  <input className="iasn-input" type="date"
                    value={data.endDate || ''} onChange={e => onChange('endDate', e.target.value)} />
                </div>
                <div className="iasn-field">
                  <label className="iasn-label">Time</label>
                  <input className="iasn-input" type="time"
                    value={data.endTime || ''} onChange={e => onChange('endTime', e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* Time Limited */}
          {data.scheduleType === 'limited' && (
            <>
              <div className="iasn-date-row">
                <div className="iasn-field">
                  <label className="iasn-label">Start date</label>
                  <input className="iasn-input" type="date"
                    value={data.startDate || ''} onChange={e => onChange('startDate', e.target.value)} />
                </div>
                <div className="iasn-field">
                  <label className="iasn-label">Start Time</label>
                  <input className="iasn-input" type="time"
                    value={data.startTime || ''} onChange={e => onChange('startTime', e.target.value)} />
                </div>
              </div>
              <div className="iasn-date-row">
                <div className="iasn-field">
                  <label className="iasn-label">Time Duration</label>
                  <input className="iasn-input" placeholder="e.g. 60"
                    value={data.duration || ''} onChange={e => onChange('duration', e.target.value)} />
                </div>
                <div className="iasn-field">
                  <label className="iasn-label">Unit</label>
                  <div className="iasn-select-wrap">
                    <select className="iasn-select"
                      value={data.durationUnit || 'Minutes'}
                      onChange={e => onChange('durationUnit', e.target.value)}>
                      <option>Minutes</option>
                      <option>Hours</option>
                    </select>
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Step 2: Assign to Class ── */
function Step2({ data, onChange }) {
  const [search, setSearch] = useState('');
  const filtered = ALL_CLASSES.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  const selected = data.selectedClasses || [];

  function toggle(c) {
    onChange('selectedClasses', selected.includes(c) ? selected.filter(x=>x!==c) : [...selected, c]);
  }
  function remove(c) { onChange('selectedClasses', selected.filter(x=>x!==c)); }

  return (
    <div className="iasn-step-content">
      <h3 className="iasn-section-title">Select Class</h3>
      <div className="iasn-class-search-row">
        <div className="iasn-search-wrap">
          <SearchIcon />
          <input className="iasn-search" placeholder="Search Class"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="iasn-total-label">Total Class: 20</span>
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="iasn-selected-section">
          <p className="iasn-selected-label">Selected Class</p>
          <div className="iasn-chips">
            {selected.map(c => (
              <span key={c} className="iasn-chip">
                {c}
                <button className="iasn-chip-remove" onClick={() => remove(c)}><CloseIcon /></button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available classes */}
      <div className="iasn-available-section">
        <p className="iasn-selected-label">Select Class</p>
        <div className="iasn-class-pills">
          {filtered.filter(c => !selected.includes(c)).map(c => (
            <button key={c} className="iasn-class-pill" onClick={() => toggle(c)}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InstitutionCreateAssignment() {
  const navigate = useNavigate();
  const [step, setStep] = useState('create');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'Coding', ageGroup: '', file: '',
    marks: '100', timed: false, scheduleType: 'deadline',
    startDate: '', dueDate: '', startTime: '', endDate: '', endTime: '',
    duration: '', durationUnit: 'Minutes',
    selectedClasses: ['Java Class 2','Java Class 6','Java Class 10'],
    courses: [],
  });

  function set(key, val) { setForm(f => ({...f, [key]: val})); }
  const stepIdx = STEPS.findIndex(s => s.key === step);

  function goNext() {
    if (step === 'create') { setShowCourseModal(true); return; }
    navigate('/institution/dashboard/assignments');
  }
  function goBack() {
    if (stepIdx > 0) setStep(STEPS[stepIdx-1].key);
    else navigate(-1);
  }

  return (
    <div className="iasn-page">
      <div className="iasn-page-header">
        <button className="iasn-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Create Assignment</span>
        </button>
        <span className="iasn-breadcrumb">Assignments &rsaquo; Create Assignment</span>
      </div>

      <div className="iasn-body">
        <div className="iasn-wizard-card">
          <div className="iasn-wizard-left">
            <StepIndicator steps={STEPS} current={step} />
          </div>
          <div className="iasn-wizard-right">
            {step === 'create' && <Step1 data={form} onChange={set} onShowCourseModal={() => setShowCourseModal(true)} />}
            {step === 'assign' && <Step2 data={form} onChange={set} />}

            <div className="iasn-wizard-actions">
              <button className="iasn-btn-cancel" onClick={goBack}>
                {step === 'create' ? 'Cancel' : 'Back'}
              </button>
              <button className="iasn-btn-confirm" onClick={goNext}>
                {step === 'create' ? 'Assign To Class' : 'Assign To Class'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCourseModal && (
        <SelectCourseModal
          onClose={() => setShowCourseModal(false)}
          onConfirm={courses => { set('courses', courses); setStep('assign'); }}
        />
      )}
    </div>
  );
}
