import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionclasses.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

/* ── Steps ── */
const STEPS = [
  { key: 'info',     label: 'Class Information' },
  { key: 'courses',  label: 'Assign Courses' },
  { key: 'students', label: 'Assign Students' },
  { key: 'pricing',  label: 'Pricing & Certificate' },
];

/* ── Step indicator (reuse same pattern as course wizard) ── */
function StepIndicator({ steps, current }) {
  const idx = steps.findIndex(s => s.key === current);
  return (
    <div className="icls-steps">
      {steps.map((step, i) => {
        const done   = i < idx;
        const active = step.key === current;
        return (
          <div key={step.key} className="icls-step-item">
            {i > 0 && <div className={`icls-step-line${done || active ? ' done' : ''}`} />}
            <div className={`icls-step-dot${active ? ' active' : done ? ' done' : ''}`} />
            <span className={`icls-step-label${active ? ' active' : ''}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`icls-toggle${checked ? ' icls-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="icls-toggle-thumb" />
    </button>
  );
}

/* ── Custom dropdown ── */
function CustomDropdown({ value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="icls-custom-select" style={{ position: 'relative' }}>
      <button type="button" className="icls-select-btn"
        onClick={() => setOpen(o => !o)}>
        <span className={value ? '' : 'icls-placeholder'}>
          {value || placeholder}
        </span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="icls-dropdown-list">
          {options.map(opt => (
            <div key={opt.value}
              className={`icls-dropdown-item${value === opt.value ? ' selected' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}>
              {value === opt.value && (
                <span className="icls-dropdown-check"><CheckIcon /></span>
              )}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Available courses ── */
const AVAILABLE_COURSES = [
  { id: 1, name: 'Java Full Stack', level: 'Beginner', instructors: 3 },
  { id: 2, name: 'Java Full Stack', level: 'Beginner', instructors: 3 },
];

const INSTRUCTORS = [
  { value: 'amit',  label: 'Amit Jain (Java Full Stack | 4 yrs exp)' },
  { value: 'priya', label: 'Priya Singh (Java Full Stack, Python Django | 3 yrs exp)' },
  { value: 'rahul', label: 'Rahul Sharma (Java Full Stack, MERN Stack, React Advanced | 5 yrs exp)' },
];

/* ── Step 1: Class Information ── */
function Step1({ data, onChange }) {
  return (
    <div className="icls-step-content">
      <div className="icls-field">
        <label className="icls-label">Class Name</label>
        <input className="icls-input icls-input--active" placeholder="Class Name"
          value={data.name} onChange={e => onChange('name', e.target.value)} />
      </div>
      <div className="icls-field">
        <label className="icls-label">Class Category</label>
        <div className="icls-select-wrap">
          <select className="icls-select" value={data.category}
            onChange={e => onChange('category', e.target.value)}>
            <option>Coding</option>
            <option>Electronics</option>
            <option>Mechanics</option>
            <option>Robotics</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="icls-field">
        <label className="icls-label">Age Group</label>
        <div className="icls-select-wrap">
          <select className="icls-select" value={data.ageGroup}
            onChange={e => onChange('ageGroup', e.target.value)}>
            <option value="">Age Group</option>
            <option>Youth (10-14)</option>
            <option>Teen (15-18)</option>
            <option>Young Adult (19-24)</option>
            <option>Adult (25-34)</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="icls-field">
        <label className="icls-label">Max Students</label>
        <input className="icls-input" placeholder="30"
          value={data.maxStudents} onChange={e => onChange('maxStudents', e.target.value)} />
      </div>
      <div className="icls-field">
        <label className="icls-label">Schedule Day</label>
        <div className="icls-select-wrap">
          <select className="icls-select" value={data.scheduleDay}
            onChange={e => onChange('scheduleDay', e.target.value)}>
            <option>Mon to Fri</option>
            <option>Mon, Wed, Fri</option>
            <option>Tue, Thu</option>
            <option>Sat, Sun</option>
          </select>
          <ChevronDown />
        </div>
      </div>
      <div className="icls-field">
        <label className="icls-label">Time</label>
        <input className="icls-input" placeholder="--:--" type="time"
          value={data.time} onChange={e => onChange('time', e.target.value)} />
      </div>
    </div>
  );
}

/* ── Step 2: Assign Courses ── */
function Step2({ data, onChange }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  function toggleCourse(id) {
    const sel = data.selectedCourses.includes(id)
      ? data.selectedCourses.filter(c => c !== id)
      : [...data.selectedCourses, id];
    onChange('selectedCourses', sel);
  }

  function setInstructor(courseId, val) {
    onChange('instructors', { ...data.instructors, [courseId]: val });
  }

  return (
    <div className="icls-step-content">
      <h3 className="icls-section-title">Select Course</h3>
      {AVAILABLE_COURSES.map(course => {
        const selected = data.selectedCourses.includes(course.id);
        const instrOpen = openDropdown === course.id;
        const instrVal  = data.instructors[course.id] || '';

        return (
          <div key={course.id} className="icls-course-select-block">
            {/* Course card */}
            <div className={`icls-course-card${selected ? ' selected' : ''}`}
              onClick={() => toggleCourse(course.id)}>
              <div className="icls-course-card-top">
                <div className={`icls-course-checkbox${selected ? ' checked' : ''}`}>
                  {selected && <CheckIcon />}
                </div>
                <span className="icls-course-card-name">{course.name}</span>
              </div>
              <div className="icls-course-card-meta">
                <div>
                  <div className="icls-meta-label">Level</div>
                  <div className="icls-meta-value">{course.level}</div>
                </div>
                <div>
                  <div className="icls-meta-label">Available Instructors</div>
                  <div className="icls-meta-value">{course.instructors}</div>
                </div>
              </div>
            </div>

            {/* Instructor dropdown */}
            <div className="icls-instructor-select">
              <label className="icls-label">Select Instructor : {course.name}</label>
              <div className="icls-custom-select" style={{ position: 'relative' }}>
                <button type="button" className="icls-select-btn"
                  onClick={() => setOpenDropdown(instrOpen ? null : course.id)}>
                  <span className={instrVal ? '' : 'icls-placeholder'}>
                    {instrVal
                      ? INSTRUCTORS.find(i => i.value === instrVal)?.label
                      : `Select Instructor : ${course.name}`}
                  </span>
                  {instrOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {instrOpen && (
                  <div className="icls-dropdown-list">
                    {INSTRUCTORS.map(opt => (
                      <div key={opt.value}
                        className={`icls-dropdown-item${instrVal === opt.value ? ' selected' : ''}`}
                        onClick={() => { setInstructor(course.id, opt.value); setOpenDropdown(null); }}>
                        {instrVal === opt.value && (
                          <span className="icls-dropdown-check"><CheckIcon /></span>
                        )}
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Step 3: Assign Students ── */
function Step3({ data, onChange }) {
  const [search, setSearch] = useState('');
  return (
    <div className="icls-step-content">
      {/* Class summary card */}
      <div className="icls-class-summary">
        <div className="icls-summary-name">{data.name || 'Evening Batch'}</div>
        <div className="icls-summary-meta">
          <div>
            <div className="icls-meta-label">Capacity</div>
            <div className="icls-meta-value">0 / {data.maxStudents || 30} Students</div>
          </div>
          <div>
            <div className="icls-meta-label">Courses</div>
            <div className="icls-meta-value">Java Full Stack, MERN Stack, API Development</div>
          </div>
        </div>
      </div>

      <h3 className="icls-section-title" style={{ marginTop: 20 }}>Add Students to Class</h3>
      <div className="icls-student-search-row">
        <div className="icls-student-search-wrap">
          <SearchIcon />
          <input className="icls-student-search" placeholder="Search Student"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="icls-total-students">Total Student: 200</span>
      </div>
    </div>
  );
}

/* ── Step 4: Pricing & Certificate ── */
function Step4({ data, onChange }) {
  const PRICING = [
    { key: 'free',         label: 'Free' },
    { key: 'subscription', label: 'Subscription Included' },
    { key: 'onetime',      label: 'One-time Paid' },
    { key: 'private',      label: 'Institution Only / Private' },
  ];
  return (
    <div className="icls-step-content">
      <h3 className="icls-section-title">Pricing Type</h3>
      <div className="icls-field">
        <label className="icls-label">Pricing Model</label>
        <div className="icls-pricing-row">
          {PRICING.map(p => (
            <label key={p.key} className="icls-pricing-label">
              <input type="radio" className="icls-radio"
                checked={data.pricing === p.key}
                onChange={() => onChange('pricing', p.key)} />
              {p.label}
            </label>
          ))}
        </div>
      </div>
      <h3 className="icls-section-title" style={{ marginTop: 24 }}>Certificate</h3>
      <div className="icls-toggle-row">
        <span className="icls-toggle-label">Certificate Eligibility</span>
        <Toggle checked={data.certificate} onChange={v => onChange('certificate', v)} />
      </div>
    </div>
  );
}

/* ── Main wizard ── */
export default function InstitutionCreateClass() {
  const navigate = useNavigate();
  const [step, setStep] = useState('info');
  const [form, setForm] = useState({
    name: '', category: 'Coding', ageGroup: '', maxStudents: '30',
    scheduleDay: 'Mon to Fri', time: '',
    selectedCourses: [], instructors: {},
    pricing: 'subscription', certificate: false,
  });

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  const stepIdx = STEPS.findIndex(s => s.key === step);

  function goNext() {
    if (stepIdx < STEPS.length - 1) setStep(STEPS[stepIdx + 1].key);
    else navigate('/institution/dashboard/classes');
  }
  function goBack() {
    if (stepIdx > 0) setStep(STEPS[stepIdx - 1].key);
    else navigate(-1);
  }

  return (
    <div className="icls-page">
      <div className="icls-page-header">
        <button className="icls-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Create Class</span>
        </button>
        <span className="icls-breadcrumb">Classes &rsaquo; Create Class</span>
      </div>

      <div className="icls-body">
        <div className="icls-wizard-card">
          {/* Left step indicator */}
          <div className="icls-wizard-left">
            <StepIndicator steps={STEPS} current={step} />
          </div>

          {/* Right content */}
          <div className="icls-wizard-right">
            {step === 'info'     && <Step1 data={form} onChange={set} />}
            {step === 'courses'  && <Step2 data={form} onChange={set} />}
            {step === 'students' && <Step3 data={form} onChange={set} />}
            {step === 'pricing'  && <Step4 data={form} onChange={set} />}

            <div className="icls-wizard-actions">
              <button className="icls-btn-back" onClick={goBack}>Back</button>
              <button className="icls-btn-next" onClick={goNext}>
                {stepIdx === STEPS.length - 1 ? 'Save as Draft' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
