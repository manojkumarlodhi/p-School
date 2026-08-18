import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './createnewcourse.css';

/* ─────────────────────────────────────────
   Custom Dropdown component
───────────────────────────────────────── */
function CustomDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find((o) => (o.value ?? o) === value);
  const displayLabel = selected ? (selected.label ?? selected) : null;

  return (
    <div className="cnc-dropdown" ref={ref}>
      <button
        type="button"
        className={`cnc-dropdown-trigger${open ? ' cnc-dropdown-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {displayLabel ? (
          <span>{displayLabel}</span>
        ) : (
          <span className="cnc-dropdown-placeholder">{placeholder}</span>
        )}
        <svg
          className={`cnc-dropdown-chevron${open ? ' cnc-chevron-up' : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
 
      {open && (
        <div className="cnc-dropdown-panel" role="listbox">
          {options.map((opt) => {
            const optValue = opt.value ?? opt;
            const optLabel = opt.label ?? opt;
            const isSelected = optValue === value;
            return (
              <button
                key={optValue}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`cnc-dropdown-option${isSelected ? ' cnc-option-selected' : ''}`}
                onClick={() => { onChange(optValue); setOpen(false); }}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Hierarchy dropdown — "Select Chapter Type" floating panel style */
function HierarchyDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    { value: 'course-subject-chapter-content', label: 'Course  >  Subject  >  Chapter  >  Content' },
    { value: 'course-chapter-content',          label: 'Course  >  Chapter  >  Content' },
  ];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="cnc-dropdown" ref={ref}>
      <button
        type="button"
        className={`cnc-dropdown-trigger${open ? ' cnc-dropdown-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className="cnc-dropdown-placeholder">Select hierarchy</span>
        )}
        <svg
          className={`cnc-dropdown-chevron${open ? ' cnc-chevron-up' : ''}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="cnc-hierarchy-panel">
          <div className="cnc-hierarchy-panel-title">Select Chapter Type</div>
          {/* Trigger mirror */}
          <div className="cnc-hierarchy-trigger-mirror">
            <span className="cnc-dropdown-placeholder">Select hierarchy</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`cnc-hierarchy-option${isSelected ? ' cnc-hierarchy-option-selected' : ''}`}
                onClick={() => { onChange(opt.value); setOpen(false); }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Stepper sidebar
───────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Basic Information' },
  { id: 2, label: 'Content Setup' },
  { id: 3, label: 'Media & Language' },
  { id: 4, label: 'Pricing & Certificate' },
];

function Stepper({ current }) {
  return (
    <div className="cnc-stepper" aria-label="Wizard steps">
      {STEPS.map((step) => {
        const isDone    = step.id < current;
        const isActive  = step.id === current;
        const isUpcoming = step.id > current;

        let circleClass = 'cnc-step-circle ';
        if (isDone)    circleClass += 'cnc-step-circle-done';
        else if (isActive) circleClass += 'cnc-step-circle-active';
        else           circleClass += 'cnc-step-circle-upcoming';

        let itemClass = 'cnc-step-item';
        if (isDone) itemClass += ' cnc-step-done';

        return (
          <div key={step.id} className={itemClass}>
            <div className={circleClass}>
              {isDone ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : isActive ? (
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="4" fill="#fff" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <div className="cnc-step-info">
              <div className={`cnc-step-label${isUpcoming ? ' cnc-step-label-upcoming' : ''}`}>
                {step.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   Step 1 — Basic Information
───────────────────────────────────────── */
function Step1({ data, onChange, onNext }) {
  return (
    <>
      <h2 className="cnc-content-title">Course Details</h2>

      <div className="cnc-form-group">
        <label className="cnc-label" htmlFor="cnc-title">Title</label>
        <input
          id="cnc-title"
          className="cnc-input"
          type="text"
          placeholder="Enter course title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div className="cnc-form-group">
        <label className="cnc-label" htmlFor="cnc-shortdesc">Short Description</label>
        <textarea
          id="cnc-shortdesc"
          className="cnc-textarea"
          placeholder="Enter short description"
          value={data.shortDesc}
          onChange={(e) => onChange('shortDesc', e.target.value)}
          rows={3}
        />
      </div>

      <div className="cnc-section-label">Classification</div>

      <div className="cnc-form-group">
        <label className="cnc-label">Discipline / Category</label>
        <CustomDropdown
          placeholder="Select category"
          options={['Coding', 'Electronics', 'Mechanics', 'Robotics']}
          value={data.category}
          onChange={(v) => onChange('category', v)}
        />
      </div>

      <div className="cnc-form-group">
        <label className="cnc-label">Course Hierarchy</label>
        <HierarchyDropdown
          value={data.hierarchy}
          onChange={(v) => onChange('hierarchy', v)}
        />
      </div>

      <div className="cnc-form-group">
        <label className="cnc-label">Age Group</label>
        <CustomDropdown
          placeholder="Select age group"
          options={['8-12', '13-15', '16-19', '20+']}
          value={data.ageGroup}
          onChange={(v) => onChange('ageGroup', v)}
        />
      </div>

      <div className="cnc-form-group">
        <label className="cnc-label">Difficulty Level</label>
        <CustomDropdown
          placeholder="Beginner"
          options={['Beginner', 'Intermediate', 'Advanced']}
          value={data.difficulty}
          onChange={(v) => onChange('difficulty', v)}
        />
      </div>

      <div className="cnc-actions">
        <button className="cnc-btn-back" disabled style={{ opacity: 0.4 }}>Back</button>
        <button className="cnc-btn-next" onClick={onNext}>Next</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Step 2 — Content Setup
───────────────────────────────────────── */
function Step2({ data, onChange, onBack, onNext }) {
  return (
    <>
      <h2 className="cnc-content-title">Content Setup</h2>

      <div className="cnc-form-group">
        <label className="cnc-label" htmlFor="cnc-objectives">Learning Objectives</label>
        <textarea
          id="cnc-objectives"
          className="cnc-textarea"
          placeholder="Add learning objective"
          value={data.objectives}
          onChange={(e) => onChange('objectives', e.target.value)}
          rows={4}
        />
      </div>

      {/* Lab Linkage section */}
      <div className="cnc-lab-section">
        <div className="cnc-lab-section-title">
          Lab Linkage <span className="cnc-lab-optional">(Optional)</span>
        </div>
        <div className="cnc-lab-toggle-row">
          <span className="cnc-lab-toggle-label">Enable Lab</span>
          <label className="cnc-toggle" aria-label="Enable Lab">
            <input
              type="checkbox"
              checked={data.labEnabled}
              onChange={(e) => onChange('labEnabled', e.target.checked)}
            />
            <span className="cnc-toggle-slider" />
          </label>
        </div>
      </div>

      <div className="cnc-form-group">
        <label className="cnc-label" htmlFor="cnc-prereqs">Prerequisites</label>
        <textarea
          id="cnc-prereqs"
          className="cnc-textarea"
          value={data.prerequisites}
          onChange={(e) => onChange('prerequisites', e.target.value)}
          rows={4}
        />
      </div>

      <div className="cnc-actions">
        <button className="cnc-btn-back" onClick={onBack}>Back</button>
        <button className="cnc-btn-next" onClick={onNext}>Next</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Step 3 — Media & Language
───────────────────────────────────────── */
function Step3({ data, onChange, onBack, onNext }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange('thumbnail', URL.createObjectURL(file));
  };

  return (
    <>
      <h2 className="cnc-content-title">Media &amp; Language</h2>

      <div className="cnc-section-label">Upload Media</div>

      <div className="cnc-form-group">
        <label className="cnc-label">Thumbnail</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div
          className="cnc-upload-area"
          onClick={() => fileRef.current.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current.click()}
          aria-label="Upload thumbnail image"
        >
          {data.thumbnail ? (
            <img
              src={data.thumbnail}
              alt="Thumbnail preview"
              style={{ maxHeight: 120, borderRadius: 8, objectFit: 'cover' }}
            />
          ) : (
            <>
              {/* Cyan upload arrow icon */}
              <svg className="cnc-upload-icon" width="36" height="36" viewBox="0 0 24 24"
                fill="none" stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="cnc-upload-text-row">
                <span className="cnc-upload-link">Upload</span>
                <span className="cnc-upload-text-plain"> thumbnail image</span>
              </div>
              <span className="cnc-upload-hint">1:4 ratio</span>
            </>
          )}
        </div>
      </div>

      <div className="cnc-section-label">Language</div>

      <div className="cnc-form-group">
        <label className="cnc-label">Course Language</label>
        <CustomDropdown
          placeholder="Multi-select dropdown with chips"
          options={['English', 'Arabic', 'French', 'Spanish', 'German']}
          value={data.language}
          onChange={(v) => onChange('language', v)}
        />
      </div>

      <div className="cnc-actions">
        <button className="cnc-btn-back" onClick={onBack}>Back</button>
        <button className="cnc-btn-next" onClick={onNext}>Next</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Step 4 — Pricing & Certificate
───────────────────────────────────────── */
const PRICING_OPTIONS = [
  { value: 'free',         label: 'Free' },
  { value: 'subscription', label: 'Subscription Included' },
  { value: 'one-time',     label: 'One-time Paid' },
  { value: 'institution',  label: 'Institution Only / Private' },
];

function Step4({ data, onChange, onBack, onSave, onPublish }) {
  return (
    <>
      <h2 className="cnc-content-title">Pricing Type</h2>

      <div className="cnc-form-group">
        <label className="cnc-label">Pricing Model</label>
        <div className="cnc-radio-group-inline">
          {PRICING_OPTIONS.map((opt) => (
            <label key={opt.value} className="cnc-radio-option">
              <input
                type="radio"
                name="pricing"
                value={opt.value}
                checked={data.pricing === opt.value}
                onChange={() => onChange('pricing', opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="cnc-section-label">Certificate</div>

      <div className="cnc-lab-toggle-row" style={{ marginBottom: 0 }}>
        <span className="cnc-lab-toggle-label">Certificate Eligibility</span>
        <label className="cnc-toggle" aria-label="Certificate Eligibility">
          <input
            type="checkbox"
            checked={data.certificate}
            onChange={(e) => onChange('certificate', e.target.checked)}
          />
          <span className="cnc-toggle-slider" />
        </label>
      </div>

      <div className="cnc-actions">
        <button className="cnc-btn-back" onClick={onBack}>Back</button>
        <button className="cnc-btn-next" onClick={onSave}>Save as Draft</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   Main wizard page
───────────────────────────────────────── */
export default function CreateNewCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(1);

  /* Step 1 state */
  const [step1, setStep1] = useState({
    title: '',
    shortDesc: '',
    category: '',
    hierarchy: '',
    ageGroup: '',
    difficulty: 'Beginner',
  });

  /* Step 2 state */
  const [step2, setStep2] = useState({
    objectives: '',
    labEnabled: false,
    prerequisites: '• Basic Programming\n• HTML & CSS',
  });

  /* Step 3 state */
  const [step3, setStep3] = useState({
    thumbnail: '',
    language: '',
  });

  /* Step 4 state */
  const [step4, setStep4] = useState({
    pricing: 'subscription',
    certificate: false,
  });

  const updateStep1 = (key, val) => setStep1((p) => ({ ...p, [key]: val }));
  const updateStep2 = (key, val) => setStep2((p) => ({ ...p, [key]: val }));
  const updateStep3 = (key, val) => setStep3((p) => ({ ...p, [key]: val }));
  const updateStep4 = (key, val) => setStep4((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    if (step1.hierarchy === 'course-chapter-content') {
      // Flow 2: Course → Chapter → Content
      navigate(`/dashboard/course-management/courses/${id}/chapters`);
    } else {
      // Flow 1: Course → Subject → Chapter → Content
      navigate(`/dashboard/course-management/courses/${id}/subjects`);
    }
  };

  const handlePublish = () => {
    if (step1.hierarchy === 'course-chapter-content') {
      navigate(`/dashboard/course-management/courses/${id}/chapters`);
    } else {
      navigate(`/dashboard/course-management/courses/${id}/subjects`);
    }
  };

  return (
    <div className="cnc-page">

      {/* ── Page header ── */}
      <div className="cnc-page-header">
        <div className="cnc-header-left">
          <button
            className="cnc-back-btn"
            onClick={() => navigate(`/dashboard/course-management/categories/${id}`)}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="cnc-page-title">Create New Course</h1>
        </div>
        <span className="cnc-breadcrumb">Course Management</span>
      </div>

      {/* ── Two-column layout ── */}
      <div className="cnc-body">

        {/* LEFT: Stepper */}
        <Stepper current={step} />

        {/* RIGHT: Step content */}
        <div className="cnc-content">
          {step === 1 && (
            <Step1
              data={step1}
              onChange={updateStep1}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2
              data={step2}
              onChange={updateStep2}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3
              data={step3}
              onChange={updateStep3}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <Step4
              data={step4}
              onChange={updateStep4}
              onBack={() => setStep(3)}
              onSave={handleSave}
              onPublish={handlePublish}
            />
          )}
        </div>

      </div>
    </div>
  );
}
