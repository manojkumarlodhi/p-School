import { useState, useRef } from 'react';
import './individualassignments.css';
import { useNavigate } from 'react-router-dom';

/* ── Icons ── */
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
const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`ica-toggle${checked ? ' on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="ica-toggle-thumb" />
    </button>
  );
}

const COURSES = [
  'Java Full Stack', 'Python Basics', 'Electronics 101',
  'Robotics Pro', 'Web Development', 'Data Science',
];

const STEPS = [
  { num: 1, label: 'Assignment Details', icon: '📝' },
  { num: 2, label: 'Select Course',      icon: '📚' },
];

export default function IndividualCreateAssignment() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [form, setForm] = useState({
    title: '',
    category: '',
    ageGroup: '',
    file: null,
    enableLab: false,
    marks: '',
    dueDate: '',
    dueTime: '',
  });

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function handleFile(f) { if (f) set('file', f); }

  function toggleCourse(c) {
    setSelectedCourses(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  }

  function removeCourse(c) {
    setSelectedCourses(prev => prev.filter(x => x !== c));
  }

  function handleNext() {
    if (step === 1) setStep(2);
    else handlePublish();
  }

  function handlePublish() {
    console.log('Publishing:', { ...form, courses: selectedCourses });
    navigate('/instructor/individual/dashboard/assignments');
  }

  const filteredCourses = COURSES.filter(c =>
    c.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const totalCourses = COURSES.length;

  return (
    <div className="ica-page">
      {/* Page header */}
      <div className="ica-page-header">
        <div className="ica-page-header-left">
          <button className="ica-back-btn" onClick={() => step === 1 ? navigate(-1) : setStep(1)}>
            <BackIcon />
          </button>
          <div>
            <h1 className="ica-page-title">Create Assignment</h1>
            <p className="ica-breadcrumb">Home / Assignments / Create</p>
          </div>
        </div>
        <div className="ica-step-counter">
          Step <strong>{step}</strong> of <strong>{STEPS.length}</strong>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="ica-body">
        {/* Left sidebar steps */}
        <aside className="ica-sidebar">
          <div className="ica-sidebar-title">Steps</div>
          {STEPS.map(s => (
            <button key={s.num}
              className={`ica-sidebar-step${step === s.num ? ' active' : ''}${step > s.num ? ' done' : ''}`}
              onClick={() => step > s.num && setStep(s.num)}>
              <div className="ica-sidebar-step-icon">
                {step > s.num ? <CheckIcon /> : <span>{s.icon}</span>}
              </div>
              <div className="ica-sidebar-step-body">
                <div className="ica-sidebar-step-num">Step {s.num}</div>
                <div className="ica-sidebar-step-label">{s.label}</div>
              </div>
              {step === s.num && <div className="ica-sidebar-step-bar" />}
            </button>
          ))}
          <div className="ica-sidebar-progress">
            <div className="ica-sidebar-progress-label">
              <span>Progress</span>
              <span>{Math.round(((step - 1) / STEPS.length) * 100)}%</span>
            </div>
            <div className="ica-sidebar-progress-track">
              <div className="ica-sidebar-progress-fill"
                style={{ width: `${((step - 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </aside>

        {/* Right content */}
        <div className="ica-content">
          <div className="ica-content-card">

            {/* ── STEP 1: Assignment Details ── */}
            {step === 1 && (
              <>
                <div className="ica-step-heading">
                  <h2 className="ica-step-title">Assignment Details</h2>
                  <p className="ica-step-desc">Fill in the basic information for this assignment.</p>
                </div>

                <div className="ica-two-col">
                  {/* Assignment Title */}
                  <div className="ica-field ica-col-span-2">
                    <label className="ica-label">Assignment Title <span className="ica-required">*</span></label>
                    <input className="ica-input" placeholder="e.g., Variables Quiz"
                      value={form.title} onChange={e => set('title', e.target.value)} />
                  </div>

                  {/* Select Category */}
                  <div className="ica-field">
                    <label className="ica-label">Select Category</label>
                    <div className="ica-select-wrap">
                      <select className="ica-select" value={form.category}
                        onChange={e => set('category', e.target.value)}>
                        <option value="">Coding</option>
                        <option>Coding</option>
                        <option>Robotics</option>
                        <option>Electronics</option>
                        <option>Mechanics</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>

                  {/* Age Group */}
                  <div className="ica-field">
                    <label className="ica-label">Age Group</label>
                    <div className="ica-select-wrap">
                      <select className="ica-select" value={form.ageGroup}
                        onChange={e => set('ageGroup', e.target.value)}>
                        <option value="">Age Group</option>
                        <option>6-8 years</option>
                        <option>9-12 years</option>
                        <option>13-16 years</option>
                        <option>17+ years</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                {/* Upload File */}
                <div className="ica-field">
                  <label className="ica-label">Attach Files (Optional)</label>
                  <div
                    className={`ica-drop-zone${dragging ? ' dragging' : ''}${form.file ? ' has-file' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
                    onClick={() => fileRef.current?.click()}
                  >
                    {form.file ? (
                      <p className="ica-drop-filename">✓ {form.file.name}</p>
                    ) : (
                      <>
                        <div className="ica-drop-icon-wrap"><UploadIcon /></div>
                        <p className="ica-drop-title">Upload a file or drag and drop</p>
                        <p className="ica-drop-sub">PDF, DOC, ZIP (Max 25MB)</p>
                        <button className="ica-drop-btn" type="button">Browse Files</button>
                      </>
                    )}
                    <input ref={fileRef} type="file" style={{ display: 'none' }}
                      onChange={e => handleFile(e.target.files?.[0])} />
                  </div>

                  {form.file && (
                    <div className="ica-file-chip">
                      <div className="ica-file-chip-icon"><FileIcon /></div>
                      <div className="ica-file-chip-body">
                        <div className="ica-file-chip-name">{form.file.name}</div>
                        <div className="ica-file-chip-size">
                          {form.file.size ? `${(form.file.size / 1024).toFixed(1)} KB` : ''}
                        </div>
                      </div>
                      <button className="ica-file-chip-remove" onClick={() => set('file', null)}>
                        <CloseIcon />
                      </button>
                    </div>
                  )}
                </div>

                {/* Enable Lab Task */}
                <div className="ica-toggle-row">
                  <div>
                    <div className="ica-toggle-label">Enable Lab Task</div>
                    <div className="ica-toggle-sub">Students will complete this in virtual lab</div>
                  </div>
                  <Toggle checked={form.enableLab} onChange={v => set('enableLab', v)} />
                </div>

                <div className="ica-two-col">
                  {/* Total Marks */}
                  <div className="ica-field">
                    <label className="ica-label">Total Marks</label>
                    <input className="ica-input" placeholder="100"
                      value={form.marks} onChange={e => set('marks', e.target.value)} />
                  </div>

                  {/* Assignment Time */}
                  <div className="ica-field">
                    <label className="ica-label">Assignment Time</label>
                    <input className="ica-input" type="time"
                      value={form.dueTime} onChange={e => set('dueTime', e.target.value)} />
                  </div>

                  {/* Due Date */}
                  <div className="ica-field">
                    <label className="ica-label">Due Date</label>
                    <input className="ica-input" type="date"
                      value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
                  </div>
                </div>

                <div className="ica-actions">
                  <button className="ica-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                  <div className="ica-actions-right">
                    <button className="ica-btn-next" onClick={handleNext}>
                      Next →
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 2: Select Course ── */}
            {step === 2 && (
              <>
                <div className="ica-step-heading">
                  <div className="ica-step-heading-row">
                    <div>
                      <h2 className="ica-step-title">Select Course</h2>
                      <p className="ica-step-desc">Choose which courses this assignment belongs to.</p>
                    </div>
                    <span className="ica-total-badge">Total Class: {totalCourses}</span>
                  </div>
                </div>

                {/* Search */}
                <div className="ica-search-wrap">
                  <SearchIcon />
                  <input className="ica-search-input" placeholder="Search Class"
                    value={courseSearch} onChange={e => setCourseSearch(e.target.value)} />
                </div>

                {/* Selected chips */}
                {selectedCourses.length > 0 && (
                  <div className="ica-selected-section">
                    <div className="ica-selected-label">Selected Course</div>
                    <div className="ica-chips">
                      {selectedCourses.map(c => (
                        <span key={c} className="ica-chip">
                          {c}
                          <button className="ica-chip-remove" onClick={() => removeCourse(c)}>
                            <CloseIcon />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course list */}
                <div className="ica-course-list-label">Select Course</div>
                <div className="ica-course-list">
                  {filteredCourses.map(c => (
                    <div key={c}
                      className={`ica-course-item${selectedCourses.includes(c) ? ' selected' : ''}`}
                      onClick={() => toggleCourse(c)}>
                      <span className="ica-course-name">{c}</span>
                      {selectedCourses.includes(c) && (
                        <div className="ica-course-check"><CheckIcon /></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="ica-actions">
                  <button className="ica-btn-cancel" onClick={() => setStep(1)}>Back</button>
                  <div className="ica-actions-right">
                    <button className="ica-btn-next"
                      onClick={handlePublish}
                      disabled={selectedCourses.length === 0}>
                      Assign To Course
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
