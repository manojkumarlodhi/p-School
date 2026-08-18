import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './individualcourses.css';

/* ── Step definitions ── */
const STEPS = [
  { id: 0, label: 'Basic Information', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 1, label: 'Content Setup',     icon: 'M4 6h16M4 10h16M4 14h10' },
  { id: 2, label: 'Media & Language',  icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 3, label: 'Pricing & Certificate', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

/* ── Reusable field components ── */
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

function Field({ label, required, children }) {
  return (
    <div className="icc-field">
      <label className="icc-label">{label}{required && <span className="icc-required">*</span>}</label>
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return <input className="icc-input" {...props} />;
}

function Textarea({ ...props }) {
  return <textarea className="icc-textarea" {...props} />;
}

function Select({ value, onChange, children }) {
  return (
    <div className="icc-select-wrap">
      <select className="icc-select" value={value} onChange={onChange}>{children}</select>
      <ChevronDown />
    </div>
  );
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div className="icc-toggle-row">
      <div>
        <div className="icc-toggle-label">{label}</div>
        {sub && <div className="icc-toggle-sub">{sub}</div>}
      </div>
      <button type="button" className={`icc-toggle${checked ? ' on' : ''}`}
        onClick={() => onChange(!checked)}>
        <span className="icc-toggle-thumb" />
      </button>
    </div>
  );
}

/* ── Step 1: Basic Information ── */
function Step1({ data, set }) {
  return (
    <>
      <div className="icc-step-heading">
        <h2 className="icc-step-title">Basic Information</h2>
        <p className="icc-step-desc">Set the core details that define your course.</p>
      </div>

      <div className="icc-divider-label">Course Details</div>

      <Field label="Course Title" required>
        <Input placeholder="Enter course title"
          value={data.title} onChange={e => set('title', e.target.value)} />
      </Field>

      <Field label="Short Description" required>
        <Textarea placeholder="Enter short description...."
          value={data.description} onChange={e => set('description', e.target.value)} />
      </Field>

      <div className="icc-divider-label">Classification</div>

      <div className="icc-two-col">
        <Field label="Discipline / Category" required>
          <Select value={data.category} onChange={e => set('category', e.target.value)}>
            <option value="">Select category</option>
            <option>Coding</option>
            <option>Electronics</option>
            <option>Mechanics</option>
            <option>Robotics</option>
            <option>Circuit Design</option>
          </Select>
        </Field>
        <Field label="Age Group" required>
          <Select value={data.ageGroup} onChange={e => set('ageGroup', e.target.value)}>
            <option value="">Select age group</option>
            <option>8–12 (Junior)</option>
            <option>13–15 (Middle)</option>
            <option>16–19 (Senior)</option>
            <option>20+ (Adult)</option>
          </Select>
        </Field>
      </div>

      <Field label="Difficulty Level" required>
        <Select value={data.difficulty} onChange={e => set('difficulty', e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </Select>
      </Field>
    </>
  );
}

/* ── Step 2: Content Setup ── */
function Step2({ data, set }) {
  const [objInput, setObjInput] = useState('');
  const objectives = data.objectives || [];

  const addObj = () => {
    const v = objInput.trim();
    if (!v) return;
    set('objectives', [...objectives, v]);
    setObjInput('');
  };

  const removeObj = (i) => set('objectives', objectives.filter((_, idx) => idx !== i));

  return (
    <>
      <div className="icc-step-heading">
        <h2 className="icc-step-title">Content Setup</h2>
        <p className="icc-step-desc">Define what students will learn and any prerequisites.</p>
      </div>

      <Field label="Learning Objectives" required>
        <div className="icc-tag-input-wrap">
          <div className="icc-tags">
            {objectives.map((o, i) => (
              <span key={i} className="icc-tag">
                {o}
                <button type="button" className="icc-tag-remove" onClick={() => removeObj(i)}>×</button>
              </span>
            ))}
          </div>
          <div className="icc-tag-row">
            <input className="icc-input" placeholder="Add learning objective"
              value={objInput} onChange={e => setObjInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addObj())} />
            <button type="button" className="icc-tag-add-btn" onClick={addObj}>Add</button>
          </div>
        </div>
      </Field>

      <div className="icc-divider-label">Lab Linkage (Optional)</div>

      <Toggle label="Enable Lab"
        sub="Students will complete this in virtual lab"
        checked={data.enableLab} onChange={v => set('enableLab', v)} />

      {data.enableLab && (
        <Field label="Lab Type">
          <Select value={data.labType || ''} onChange={e => set('labType', e.target.value)}>
            <option value="">Select lab type</option>
            <option>Circuit Simulator</option>
            <option>Code Editor</option>
            <option>Robotics Simulator</option>
            <option>Electronics Workbench</option>
          </Select>
        </Field>
      )}

      <Field label="Prerequisites">
        <Textarea placeholder="• Basic Programming&#10;• HTML & CSS"
          value={data.prerequisites} onChange={e => set('prerequisites', e.target.value)} />
      </Field>
    </>
  );
}

/* ── Step 3: Media & Language ── */
function Step3({ data, set }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

  const LANGUAGES = ['English', 'Hindi', 'French', 'Arabic', 'Spanish', 'Bengali', 'Tamil'];
  const selected = data.languages || [];

  const toggleLang = (lang) => {
    set('languages', selected.includes(lang)
      ? selected.filter(l => l !== lang)
      : [...selected, lang]);
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) { set('thumbnail', f); setPreview(URL.createObjectURL(f)); }
  };

  return (
    <>
      <div className="icc-step-heading">
        <h2 className="icc-step-title">Media &amp; Language</h2>
        <p className="icc-step-desc">Upload a thumbnail and select the course language(s).</p>
      </div>

      {/* Thumbnail upload */}
      <Field label="Course Thumbnail" required>
        <div className="icc-upload-zone" onClick={() => fileRef.current?.click()}>
          {preview ? (
            <img src={preview} alt="thumbnail" className="icc-thumb-preview" />
          ) : (
            <>
              <div className="icc-upload-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
              </div>
              <p className="icc-upload-title">Upload thumbnail image</p>
              <p className="icc-upload-hint">1:4 ratio</p>
              <button type="button" className="icc-browse-btn">
                Browse Files
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
              </button>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*"
            style={{ display: 'none' }} onChange={handleFile} />
        </div>
        {preview && (
          <button type="button" className="icc-remove-thumb"
            onClick={() => { setPreview(null); set('thumbnail', null); }}>
            Remove image
          </button>
        )}
      </Field>

      {/* Language multi-select with chips */}
      <div className="icc-divider-label">Language</div>
      <Field label="Course Language" required>
        <div className="icc-multiselect-wrap">
          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="icc-chips-row">
              {selected.map(l => (
                <span key={l} className="icc-chip">
                  {l}
                  <button type="button" className="icc-chip-remove"
                    onClick={() => toggleLang(l)}>×</button>
                </span>
              ))}
            </div>
          )}
          {/* Dropdown trigger */}
          <div className="icc-select-wrap" onClick={() => setLangOpen(v => !v)}
            style={{ cursor: 'pointer' }}>
            <div className="icc-select" style={{ display: 'flex', alignItems: 'center', userSelect: 'none' }}>
              {selected.length === 0 ? 'Multi-select dropdown with chips' : `${selected.length} selected`}
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          {langOpen && (
            <div className="icc-lang-dropdown">
              {LANGUAGES.map(l => (
                <button key={l} type="button"
                  className={`icc-lang-dropdown-item${selected.includes(l) ? ' selected' : ''}`}
                  onClick={() => toggleLang(l)}>
                  {selected.includes(l) && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </Field>
    </>
  );
}

/* ── Step 4: Pricing & Certificate ── */
function Step4({ data, set }) {
  const PRICING = [
    { id: 'free',         label: 'Free'                    },
    { id: 'subscription', label: 'Subscription Included'   },
    { id: 'one-time',     label: 'One-time Paid'           },
    { id: 'private',      label: 'Institution Only / Private' },
  ];

  return (
    <>
      <div className="icc-step-heading">
        <h2 className="icc-step-title">Pricing &amp; Certificate</h2>
        <p className="icc-step-desc">Choose how students access and complete your course.</p>
      </div>

      <div className="icc-divider-label">Pricing Type</div>
      <div className="icc-lab-linkage-title">Pricing Model</div>

      <div className="icc-pricing-radio-grid">
        {PRICING.map(p => (
          <label key={p.id}
            className={`icc-pricing-radio-item${data.pricing === p.id ? ' selected' : ''}`}
            onClick={() => set('pricing', p.id)}>
            <input
              type="radio"
              name="pricing"
              value={p.id}
              checked={data.pricing === p.id}
              onChange={() => set('pricing', p.id)}
              className="icc-pricing-radio-input"
            />
            {p.label}
          </label>
        ))}
      </div>

      {data.pricing === 'one-time' && (
        <Field label="Course Price (USD)" required>
          <Input type="number" placeholder="e.g. 29.99"
            value={data.price || ''} onChange={e => set('price', e.target.value)} />
        </Field>
      )}

      <div className="icc-divider-label">Lab Linkage (Optional)</div>

      <Toggle label="Certificate Eligibility"
        sub="Students receive a certificate upon completing all course requirements"
        checked={data.certificate} onChange={v => set('certificate', v)} />

      {data.certificate && (
        <Field label="Minimum Completion %">
          <Select value={data.minCompletion || '80'} onChange={e => set('minCompletion', e.target.value)}>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
          </Select>
        </Field>
      )}
    </>
  );
}

/* ── Main wizard ── */
export default function IndividualCreateCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', description: '', category: '', ageGroup: '', difficulty: 'Beginner',
    objectives: [], enableLab: false, labType: '', prerequisites: '',
    thumbnail: null, languages: [], subtitleLang: '',
    pricing: 'subscription', price: '', certificate: false, minCompletion: '80',
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else {
      console.log('Course submitted:', form);
      navigate('/instructor/individual/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else navigate('/instructor/individual/dashboard');
  };

  return (
    <div className="icc-page">
      {/* Page header */}
      <div className="icc-page-header">
        <div className="icc-page-header-left">
          <button className="icc-back-btn" onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div>
            <h1 className="icc-page-title">Create Course</h1>
            <span className="icc-breadcrumb">Dashboard / Courses / Create Course</span>
          </div>
        </div>
        <div className="icc-step-counter">
          Step <strong>{step + 1}</strong> of <strong>{STEPS.length}</strong>
        </div>
      </div>

      {/* Top progress stepper bar */}
      <div className="icc-stepper-bar">
        {STEPS.map((s, i) => (
          <div key={s.id} className="icc-stepper-item">
            <button
              className={`icc-stepper-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
              onClick={() => i <= step && setStep(i)}
              type="button"
            >
              {i < step ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </button>
            <span className={`icc-stepper-label${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`icc-stepper-line${i < step ? ' done' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Body: sidebar + content */}
      <div className="icc-body">

        {/* Left: step sidebar */}
        <aside className="icc-sidebar">
          <div className="icc-sidebar-title">Course Setup</div>
          {STEPS.map((s, i) => (
            <button key={s.id} type="button"
              className={`icc-sidebar-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
              onClick={() => i <= step && setStep(i)}>
              <div className="icc-sidebar-step-icon">
                {i < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon}/>
                  </svg>
                )}
              </div>
              <div className="icc-sidebar-step-body">
                <div className="icc-sidebar-step-num">Step {i + 1}</div>
                <div className="icc-sidebar-step-label">{s.label}</div>
              </div>
              {i === step && <div className="icc-sidebar-step-active-bar" />}
            </button>
          ))}

          {/* Progress */}
          <div className="icc-sidebar-progress">
            <div className="icc-sidebar-progress-label">
              <span>Progress</span>
              <span>{Math.round(((step) / STEPS.length) * 100)}%</span>
            </div>
            <div className="icc-sidebar-progress-track">
              <div className="icc-sidebar-progress-fill"
                style={{ width: `${(step / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </aside>

        {/* Right: step content */}
        <div className="icc-content">
          <div className="icc-content-card">
            {step === 0 && <Step1 data={form} set={set} />}
            {step === 1 && <Step2 data={form} set={set} />}
            {step === 2 && <Step3 data={form} set={set} />}
            {step === 3 && <Step4 data={form} set={set} />}

            {/* Action bar — matches image: Cancel/Back + Next */}
            <div className="icc-actions">
              <button type="button" className="icc-btn-cancel" onClick={handleBack}>
                {step === 0 ? 'Cancel' : 'Back'}
              </button>
              <div className="icc-actions-right">
                <button type="button" className="icc-btn-next" onClick={handleNext}>
                  {step === STEPS.length - 1 ? 'Submit Course' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
