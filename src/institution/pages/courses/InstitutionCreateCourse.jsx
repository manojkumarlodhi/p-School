import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioncourses.css';

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
const UploadCloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
  </svg>
);

/* ── Steps config ── */
const STEPS = [
  { key: 'basic',   label: 'Basic Information' },
  { key: 'content', label: 'Content Setup' },
  { key: 'media',   label: 'Media & Language' },
  { key: 'pricing', label: 'Pricing & Certificate' },
];

/* ── Step indicator ── */
function StepIndicator({ steps, current }) {
  return (
    <div className="icc-steps">
      {steps.map((step, i) => {
        const idx = steps.findIndex(s => s.key === current);
        const done = i < idx;
        const active = step.key === current;
        return (
          <div key={step.key} className="icc-step-item">
            {i > 0 && (
              <div className={`icc-step-line${done || active ? ' done' : ''}`} />
            )}
            <div className={`icc-step-dot${active ? ' active' : done ? ' done' : ''}`} />
            <span className={`icc-step-label${active ? ' active' : ''}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Toggle switch ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button"
      className={`icc-toggle${checked ? ' icc-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="icc-toggle-thumb" />
    </button>
  );
}

/* ── Hierarchy dropdown with custom options ── */
function HierarchySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const OPTIONS = [
    { key: 'subject', label: 'Course  »  Subject  »  Chapter  »  Content' },
    { key: 'chapter', label: 'Course  »  Chapter  »  Content' },
  ];
  const selected = OPTIONS.find(o => o.key === value);

  return (
    <div className="icc-hierarchy-wrap" style={{ position: 'relative' }}>
      <button type="button" className="icc-hierarchy-btn"
        onClick={() => setOpen(o => !o)}>
        <span style={{ color: value ? '#111827' : '#9ca3af' }}>
          {selected ? selected.label : 'Select hierarchy'}
        </span>
        <ChevronDown />
      </button>
      {open && (
        <div className="icc-hierarchy-dropdown">
          {OPTIONS.map(opt => (
            <div key={opt.key}
              className={`icc-hierarchy-option${value === opt.key ? ' selected' : ''}`}
              onClick={() => { onChange(opt.key); setOpen(false); }}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Step 1: Basic Information ── */
function Step1({ data, onChange }) {
  return (
    <div className="icc-step-content">
      <h3 className="icc-section-title">Course Details</h3>

      <div className="icc-field">
        <label className="icc-label">Title</label>
        <input className="icc-input icc-input--active" placeholder="Enter course title"
          value={data.title} onChange={e => onChange('title', e.target.value)} />
      </div>

      <div className="icc-field">
        <label className="icc-label">Short Description</label>
        <textarea className="icc-textarea" rows={4} placeholder="Enter short description"
          value={data.desc} onChange={e => onChange('desc', e.target.value)} />
      </div>

      <h3 className="icc-section-title" style={{ marginTop: 24 }}>Classification</h3>

      <div className="icc-field">
        <label className="icc-label">Discipline / Category</label>
        <div className="icc-select-wrap">
          <select className="icc-select" value={data.category}
            onChange={e => onChange('category', e.target.value)}>
            <option value="">Select category</option>
            <option>Coding</option>
            <option>Electronics</option>
            <option>Mechanics</option>
            <option>Robotics</option>
          </select>
          <ChevronDown />
        </div>
      </div>

      <div className="icc-field">
        <label className="icc-label">Course hierarchy</label>
        <HierarchySelect value={data.hierarchy} onChange={v => onChange('hierarchy', v)} />
      </div>

      <div className="icc-field">
        <label className="icc-label">Age Group</label>
        <div className="icc-select-wrap">
          <select className="icc-select" value={data.ageGroup}
            onChange={e => onChange('ageGroup', e.target.value)}>
            <option value="">Select age group</option>
            <option>10-14</option>
            <option>15-18</option>
            <option>19-24</option>
            <option>25-34</option>
          </select>
          <ChevronDown />
        </div>
      </div>

      <div className="icc-field">
        <label className="icc-label">Difficulty Level</label>
        <div className="icc-select-wrap">
          <select className="icc-select" value={data.level}
            onChange={e => onChange('level', e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Content Setup ── */
function Step2({ data, onChange }) {
  return (
    <div className="icc-step-content">
      <h3 className="icc-section-title">Learning Objectives</h3>
      <div className="icc-field">
        <label className="icc-label">Learning Objectives</label>
        <textarea className="icc-textarea" rows={4} placeholder="Add learning objective"
          value={data.objectives} onChange={e => onChange('objectives', e.target.value)} />
      </div>

      <h3 className="icc-section-title" style={{ marginTop: 24 }}>Lab Linkage (Optional)</h3>
      <div className="icc-toggle-row">
        <span className="icc-toggle-label">Enable Lab</span>
        <Toggle checked={data.enableLab} onChange={v => onChange('enableLab', v)} />
      </div>

      <h3 className="icc-section-title" style={{ marginTop: 24 }}>Prerequisites</h3>
      <div className="icc-field">
        <label className="icc-label">Prerequisites</label>
        <textarea className="icc-textarea" rows={4}
          placeholder="• Basic Programming&#10;• HTML &amp; CSS"
          value={data.prerequisites} onChange={e => onChange('prerequisites', e.target.value)} />
      </div>
    </div>
  );
}

/* ── Step 3: Media & Language ── */
function Step3({ data, onChange }) {
  const thumbRef = useRef(null);
  const [thumb, setThumb] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleThumb(file) {
    if (file) {
      setThumb(URL.createObjectURL(file));
      onChange('thumbnail', file.name);
    }
  }

  return (
    <div className="icc-step-content">
      <h3 className="icc-section-title">Upload Media</h3>
      <div className="icc-field">
        <label className="icc-label">Thumbnail</label>
        <div
          className={`icc-thumb-drop${dragging ? ' dragging' : ''}${thumb ? ' has-file' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleThumb(e.dataTransfer.files?.[0]); }}
          onClick={() => thumbRef.current?.click()}
        >
          {thumb
            ? <img src={thumb} alt="thumbnail" className="icc-thumb-preview" />
            : <>
                <UploadCloudIcon />
                <p className="icc-thumb-text">
                  <span className="icc-thumb-link">Upload</span> thumbnail image
                </p>
                <p className="icc-thumb-hint">1:4 ratio</p>
              </>
          }
          <input ref={thumbRef} type="file" accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleThumb(e.target.files?.[0])} />
        </div>
      </div>

      <h3 className="icc-section-title" style={{ marginTop: 24 }}>Language</h3>
      <div className="icc-field">
        <label className="icc-label">Course Language</label>
        <div className="icc-select-wrap">
          <select className="icc-select" value={data.language}
            onChange={e => onChange('language', e.target.value)}>
            <option value="">Multi-select dropdown with chips</option>
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
          <ChevronDown />
        </div>
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
    <div className="icc-step-content">
      <h3 className="icc-section-title">Pricing Type</h3>
      <div className="icc-field">
        <label className="icc-label">Pricing Model</label>
        <div className="icc-pricing-row">
          {PRICING.map(p => (
            <label key={p.key} className="icc-pricing-label">
              <input type="radio" className="icc-q-radio"
                checked={data.pricing === p.key}
                onChange={() => onChange('pricing', p.key)} />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      <h3 className="icc-section-title" style={{ marginTop: 24 }}>Certificate</h3>
      <div className="icc-toggle-row">
        <span className="icc-toggle-label">Certificate Eligibility</span>
        <Toggle checked={data.certificate} onChange={v => onChange('certificate', v)} />
      </div>
    </div>
  );
}

/* ── Main wizard ── */
export default function InstitutionCreateCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState('basic');

  const [form, setForm] = useState({
    // step 1
    title: '', desc: '', category: '', hierarchy: '', ageGroup: '', level: 'Beginner',
    // step 2
    objectives: '', enableLab: false, prerequisites: '• Basic Programming\n• HTML & CSS',
    // step 3
    thumbnail: '', language: '',
    // step 4
    pricing: 'subscription', certificate: false,
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  const stepIdx = STEPS.findIndex(s => s.key === step);

  function goNext() {
    if (stepIdx < STEPS.length - 1) setStep(STEPS[stepIdx + 1].key);
    else navigate('/institution/dashboard/courses');
  }
  function goBack() {
    if (stepIdx > 0) setStep(STEPS[stepIdx - 1].key);
    else navigate(-1);
  }

  return (
    <div className="icc-page">
      <div className="icc-page-header">
        <button className="icc-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Create New Course</span>
        </button>
        <span className="icc-breadcrumb">Course Management</span>
      </div>

      <div className="icc-body">
        <div className="icc-wizard-card">
          {/* Left: step indicator */}
          <div className="icc-wizard-left">
            <StepIndicator steps={STEPS} current={step} />
          </div>

          {/* Right: step content */}
          <div className="icc-wizard-right">
            {step === 'basic'   && <Step1 data={form} onChange={set} />}
            {step === 'content' && <Step2 data={form} onChange={set} />}
            {step === 'media'   && <Step3 data={form} onChange={set} />}
            {step === 'pricing' && <Step4 data={form} onChange={set} />}

            {/* Actions */}
            <div className="icc-wizard-actions">
              <button className="icc-btn-back" onClick={goBack}>Back</button>
              <button className="icc-btn-next" onClick={goNext}>
                {stepIdx === STEPS.length - 1 ? 'Save as Draft' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
