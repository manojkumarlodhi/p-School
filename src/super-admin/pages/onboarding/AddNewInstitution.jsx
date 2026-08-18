import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import './addnewinstitution.css';

/* ─── constants ─────────────────────────────────────────── */
const STEPS = [
  { label: 'Basic Details',       sub: 'Step 1/5' },
  { label: 'Required Documents',  sub: 'Step 2/5' },
  { label: 'Choose Trial / Paid', sub: 'Step 4/5' },
  { label: 'Contract',            sub: 'Step 3/5' },
  { label: 'Payment',             sub: 'Step 5/5' },
];

const INSTITUTION_TYPES = [
  'Primary School',
  'High School',
  'University',
  'Training Center',
];

const DOCUMENTS = [
  { key: 'ministry',   label: 'Ministry Registration Certificate' },
  { key: 'tax',        label: 'Tax Identification Document' },
  { key: 'signatory',  label: 'Authorized Signatory Proof' },
  { key: 'address',    label: 'Address Proof' },
  { key: 'director',   label: 'Director / Principal ID Proof' },
];

const PAID_PLANS = [
  {
    key: 'per-seat',
    badge: 'Recommended',
    badgeClass: 'ani-badge-recommended',
    name: 'Per-seat model',
    desc: 'Pay per student seat',
    features: [
      '1 seat = 1 student account',
      'Scale seats onytime',
      'Monthly or annual billing',
      'Granular usage tracking',
    ],
    bestFor: 'Small & medium institutions',
  },
  {
    key: 'concurrent',
    badge: 'Large institutions',
    badgeClass: 'ani-badge-large',
    name: 'Concurrent user model',
    desc: 'Pay for active users at a time',
    features: [
      'Set max concurrent limit',
      'Unlimited total accounts',
      'Staggered usage friendly',
      'Real-time seat monitoring',
    ],
    bestFor: 'Large institutions, shift-based usage',
  },
  {
    key: 'enterprise',
    badge: 'Enterprise',
    badgeClass: 'ani-badge-enterprise',
    name: 'Enterprise unlimited',
    desc: 'Unlimited student access, flat fee',
    features: [
      'No seat or user limits',
      'Annual flat contract',
      'Multi-year commitment',
      'Dedicated account manager',
    ],
    bestFor: 'Universities 1000+ students',
  },
];

/* ─── helpers ───────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#1ba8d5" />
      <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function InfoIcon({ color = '#6b7280' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* ─── Step progress bar ─────────────────────────────────── */
function StepBar({ current }) {
  const pct = (current / (STEPS.length - 1)) * 100;
  return (
    <div className="ani-steps-wrap">
      <div className="ani-steps-track">
        <div className="ani-steps-line-bg" />
        <div className="ani-steps-line-fill" style={{ width: `${pct}%` }} />
        {STEPS.map((_, i) => {
          const left = `${(i / (STEPS.length - 1)) * 100}%`;
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="ani-step-dot-wrap" style={{ left }}>
              <div className={`ani-step-dot ${done ? 'ani-step-dot-active' : active ? 'ani-step-dot-current' : ''}`}>
                {done
                  ? <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 8l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : <span className="ani-step-dot-num">{i + 1}</span>
                }
              </div>
            </div>
          );
        })}
      </div>
      <div className="ani-steps-labels">
        {STEPS.map((s, i) => (
          <div key={i} className={`ani-step-label ${i === current ? 'ani-step-label-active' : ''}`}>
            <span className="ani-step-label-name">{s.label}</span>
            <span className="ani-step-label-sub">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Custom dropdown ───────────────────────────────────── */
function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  const handleBlur = (e) => {
    if (ref.current && !ref.current.contains(e.relatedTarget)) setOpen(false);
  };

  return (
    <div className="ani-field-relative" ref={ref} onBlur={handleBlur} tabIndex={-1}>
      <button
        type="button"
        className="ani-select"
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ color: value ? '#374151' : '#9ca3af' }}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="ani-dropdown">
          {options.map(opt => (
            <li
              key={opt}
              className={`ani-dropdown-item ${value === opt ? 'ani-dropdown-item-active' : ''}`}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP 1 — Basic Details
══════════════════════════════════════════════════════════ */
function Step1({ data, onChange }) {
  const logoRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange('logoPreview', url);
    onChange('logoFile', file);
  };

  return (
    <div className="ani-step-body">
      <h2 className="ani-section-title">Basic Details</h2>

      {/* Logo upload */}
      <div className="ani-field-group">
        <label className="ani-label">Institute Logo</label>
        <div
          className="ani-logo-upload"
          onClick={() => logoRef.current.click()}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && logoRef.current.click()}
        >
          {data.logoPreview
            ? <img src={data.logoPreview} alt="logo preview" className="ani-logo-preview" />
            : <>
                <span className="ani-logo-plus">+</span>
                <span className="ani-logo-text">Add Logo</span>
              </>
          }
        </div>
        <input ref={logoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
      </div>

      {/* Institution Name + Type */}
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">Institution Name</label>
          <input
            className="ani-input"
            placeholder="Institution Name"
            value={data.name}
            onChange={e => onChange('name', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">Institution Type</label>
          <CustomSelect
            value={data.type}
            onChange={v => onChange('type', v)}
            options={INSTITUTION_TYPES}
            placeholder="Select Type"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">Official Email</label>
          <input
            className="ani-input"
            placeholder="Official Email"
            type="email"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">Official Phone</label>
          <input
            className="ani-input"
            placeholder="Official Phone"
            type="tel"
            value={data.phone}
            onChange={e => onChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Address + Country */}
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">Address Line</label>
          <input
            className="ani-input"
            placeholder="Address Line"
            value={data.address}
            onChange={e => onChange('address', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">Country</label>
          <input
            className="ani-input"
            placeholder="Country"
            value={data.country}
            onChange={e => onChange('country', e.target.value)}
          />
        </div>
      </div>

      {/* State + City */}
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">State</label>
          <input
            className="ani-input"
            placeholder="State"
            value={data.state}
            onChange={e => onChange('state', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">City</label>
          <input
            className="ani-input"
            placeholder="City"
            value={data.city}
            onChange={e => onChange('city', e.target.value)}
          />
        </div>
      </div>

      {/* District + Pincode */}
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">District</label>
          <input
            className="ani-input"
            placeholder="District"
            value={data.district}
            onChange={e => onChange('district', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">Pincode</label>
          <input
            className="ani-input"
            placeholder="Pincode"
            value={data.pincode}
            onChange={e => onChange('pincode', e.target.value)}
          />
        </div>
      </div>

      {/* Point of Contact */}
      <h3 className="ani-section-title" style={{ marginTop: 8 }}>Point of Contact</h3>
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">Name (Principal/Director)</label>
          <input
            className="ani-input"
            placeholder="Name"
            value={data.pocName}
            onChange={e => onChange('pocName', e.target.value)}
          />
        </div>
        <div className="ani-field">
          <label className="ani-label">Email</label>
          <input
            className="ani-input"
            placeholder="Email"
            type="email"
            value={data.pocEmail}
            onChange={e => onChange('pocEmail', e.target.value)}
          />
        </div>
      </div>
      <div className="ani-row">
        <div className="ani-field">
          <label className="ani-label">Phone</label>
          <input
            className="ani-input"
            placeholder="Phone"
            type="tel"
            value={data.pocPhone}
            onChange={e => onChange('pocPhone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP 2 — Required Documents
══════════════════════════════════════════════════════════ */
function Step2({ docs, onDocChange }) {
  const refs = useRef({});

  const handleFile = (key, e) => {
    const file = e.target.files[0];
    if (file) onDocChange(key, file);
  };

  return (
    <div className="ani-step-body">
      <h2 className="ani-section-title">Document</h2>

      <div className="ani-docs-grid">
        {DOCUMENTS.map(doc => {
          const file = docs[doc.key];
          return (
            <div key={doc.key} className="ani-doc-card">
              <p className="ani-doc-card-label">{doc.label}</p>
              <p className="ani-doc-card-filename">{file ? file.name : 'No File Chosen'}</p>
              <button
                type="button"
                className={`ani-doc-upload-btn ${file ? 'ani-doc-upload-btn-done' : ''}`}
                onClick={() => refs.current[doc.key].click()}
              >
                <UploadIcon />
                Upload File
              </button>
              <input
                ref={el => refs.current[doc.key] = el}
                type="file"
                style={{ display: 'none' }}
                onChange={e => handleFile(doc.key, e)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Slider with floating bubble ── */
function SliderField({ label, value, min, max, step, hint, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="ani-slider-wrap">
      <p className="ani-slider-label">{label}</p>
      <div className="ani-slider-track-wrap">
        <div className="ani-slider-bubble" style={{ left: `calc(${pct}% - 20px)` }}>
          {value}
        </div>
        <input
          type="range"
          className="ani-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ '--pct': `${pct}%` }}
        />
      </div>
      {hint && <p className="ani-slider-hint">{hint}</p>}
    </div>
  );
}

/* ── Billing summary table ── */
function BillingSummary({ seats, ratePerSeat = 499 }) {
  const annual = seats * ratePerSeat;
  const gst = Math.round(annual * 0.18);
  const total = annual + gst;
  const fmt = n => '₹' + n.toLocaleString('en-IN');
  return (
    <div className="ani-billing-summary">
      <p className="ani-billing-title">Summery</p>
      <div className="ani-billing-row">
        <span>Seats selected</span><span>{seats}</span>
      </div>
      <div className="ani-billing-row">
        <span>Rate per seat / year</span><span>{fmt(ratePerSeat)}</span>
      </div>
      <div className="ani-billing-row">
        <span>Annual subtotal</span><span>{fmt(annual)}</span>
      </div>
      <div className="ani-billing-row">
        <span>GST (18%)</span><span>{fmt(gst)}</span>
      </div>
      <div className="ani-billing-row ani-billing-total">
        <span>Total annual billing</span><span>{fmt(total)}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP 3 — Choose Trial / Paid
══════════════════════════════════════════════════════════ */
function Step3({ data, onChange, tab, paidView, activePlan, onTabChange, onSelectPlan }) {
  // per-seat slider
  const [seats, setSeats] = useState(500);
  // concurrent sliders
  const [concSeats, setConcSeats] = useState(600);
  const [maxOnline, setMaxOnline] = useState(300);
  // enterprise fields
  const [estCount, setEstCount] = useState('2000');
  const [contractDuration, setContractDuration] = useState('2 Year');

  return (
    <div className="ani-step-body">
      {/* Tabs */}
      <div className="ani-tabs">
        <button type="button" className={`ani-tab ${tab === 'trial' ? 'ani-tab-active' : ''}`} onClick={() => onTabChange('trial')}>Trial</button>
        <button type="button" className={`ani-tab ${tab === 'paid' ? 'ani-tab-active' : ''}`} onClick={() => onTabChange('paid')}>Paid Plan</button>
      </div>

      {/* ── TRIAL TAB ── */}
      {tab === 'trial' && (
        <div>
          <h2 className="ani-section-title" style={{ marginBottom: 16 }}>Trial Setup</h2>
          <div className="ani-toggle-row">
            <span className="ani-toggle-label">Enable 30-day Trial (up to 50 seats)</span>
            <button
              type="button"
              className={`ani-toggle ${data.trialEnabled ? 'ani-toggle-on' : ''}`}
              onClick={() => onChange('trialEnabled', !data.trialEnabled)}
              aria-pressed={data.trialEnabled}
            >
              <span className="ani-toggle-thumb" />
            </button>
          </div>
          <div className="ani-row" style={{ marginTop: 20 }}>
            <div className="ani-field">
              <label className="ani-label">Start Date</label>
              <input className="ani-input" type="date" value={data.trialStart} onChange={e => onChange('trialStart', e.target.value)} />
            </div>
            <div className="ani-field">
              <label className="ani-label">End Date</label>
              <input className="ani-input" type="date" value={data.trialEnd} onChange={e => onChange('trialEnd', e.target.value)} />
            </div>
          </div>
          <div className="ani-info-banner">
            <WarnIcon />
            <span>If enabled, a temporary trial license is created and expires automatically on the end date.</span>
          </div>
        </div>
      )}

      {/* ── PAID TAB — plan selection cards ── */}
      {tab === 'paid' && paidView === 'select' && (
        <div className="ani-paid-plans">
          {PAID_PLANS.map(plan => (
            <div
              key={plan.key}
              className="ani-plan-card"
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelectPlan(plan.key)}
            >
              <div className="ani-plan-card-top">
                <span className={`ani-plan-badge ${plan.badgeClass}`}>{plan.badge}</span>
                <InfoIcon color="#9ca3af" />
              </div>
              <h3 className="ani-plan-name">{plan.name}</h3>
              <p className="ani-plan-desc">{plan.desc}</p>
              <button
                type="button"
                className="ani-plan-select-btn"
                onClick={() => onSelectPlan(plan.key)}
              >
                Select Plan
              </button>
              <div className="ani-plan-features">
                <p className="ani-plan-features-title">Features</p>
                {plan.features.map(f => (
                  <div key={f} className="ani-plan-feature-row"><CheckIcon /><span>{f}</span></div>
                ))}
              </div>
              <p className="ani-plan-best-for">Best for: {plan.bestFor}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── PAID TAB — configure per-seat ── */}
      {tab === 'paid' && paidView === 'configure' && activePlan === 'per-seat' && (
        <div>
          <h2 className="ani-section-title">Configure per-seat plan</h2>
          <p className="ani-section-sub">Set your seat count — you can scale up anytime after activation</p>
          <div className="ani-configure-box">
            <SliderField label="Student seats" value={seats} min={10} max={2000} step={10} hint="Minimum 10 seats" onChange={setSeats} />
          </div>
          <BillingSummary seats={seats} />
        </div>
      )}

      {/* ── PAID TAB — configure concurrent ── */}
      {tab === 'paid' && paidView === 'configure' && activePlan === 'concurrent' && (
        <div>
          <h2 className="ani-section-title">Concurrent user model</h2>
          <p className="ani-section-sub">Set your seat count — you can scale up anytime after activation</p>
          <div className="ani-configure-box">
            <SliderField label="Student seats" value={concSeats} min={10} max={2000} step={10} hint="Unlimited total student accounts. Only simultaneous logins are capped." onChange={setConcSeats} />
            <SliderField label="Max Online user" value={maxOnline} min={10} max={1000} step={10} hint="Unlimited total student accounts. Only simultaneous logins are capped." onChange={setMaxOnline} />
          </div>
          <BillingSummary seats={concSeats} />
        </div>
      )}

      {/* ── PAID TAB — configure enterprise ── */}
      {tab === 'paid' && paidView === 'configure' && activePlan === 'enterprise' && (
        <div>
          <h2 className="ani-section-title">Enterprise consultation</h2>
          <p className="ani-section-sub">Our sales team will prepare a custom contract for your institution</p>
          <div className="ani-row" style={{ marginTop: 16 }}>
            <div className="ani-field">
              <label className="ani-label">Estimated student count</label>
              <input className="ani-input" type="number" value={estCount} onChange={e => setEstCount(e.target.value)} placeholder="e.g. 2000" />
            </div>
            <div className="ani-field">
              <label className="ani-label">Preferred contract duration</label>
              <CustomSelect value={contractDuration} onChange={setContractDuration} options={['1 Year', '2 Year', '3 Year', '5 Year']} placeholder="Select duration" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP 4 — Contract (Service Partnership Agreement)
══════════════════════════════════════════════════════════ */
function Step4({ data, onChange }) {
  const fileRef = useRef(null);
  const [agreed, setAgreed] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onChange('contractFile', file);
  };

  return (
    <div className="ani-step-body">
      <h2 className="ani-section-title">Service Partnership Agreement</h2>
      <p className="ani-section-sub" style={{ marginBottom: 4 }}>
        This agreement outlines the terms and conditions between your institute and our platform regarding course listing, student management, payments, and platform usage.
      </p>
      <p className="ani-section-sub">Please review the document carefully before signing.</p>

      <div className="ani-contract-grid">
        {/* Left — Download */}
        <div className="ani-contract-col">
          <p className="ani-contract-col-title">Download Agreement Document</p>
          <div className="ani-contract-file-row">
            <div className="ani-contract-file-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div>
                <p className="ani-contract-filename">Institute_Service_Agreement_2026.pdf</p>
                <p className="ani-contract-filesize">Agreement Document • 2.4 MB</p>
              </div>
            </div>
            <button type="button" className="ani-download-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          </div>
          <div className="ani-info-banner" style={{ marginTop: 12 }}>
            <WarnIcon />
            <span>Make sure to sign all required pages before uploading.</span>
          </div>

          <p className="ani-contract-col-title" style={{ marginTop: 20 }}>How to Complete</p>
          <ul className="ani-contract-steps-list">
            <li>Download the agreement PDF</li>
            <li>Review all terms and conditions</li>
            <li>Sign the document (Digital or Printed &amp; Scanned)</li>
            <li>Upload the signed copy below</li>
          </ul>
        </div>

        {/* Right — Upload */}
        <div className="ani-contract-col">
          <p className="ani-contract-col-title">Upload Signed Agreement</p>
          <div
            className={`ani-upload-area ${data.contractFile ? 'ani-upload-area-done' : ''}`}
            onClick={() => fileRef.current.click()}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && fileRef.current.click()}
          >
            {data.contractFile ? (
              <div className="ani-upload-file-name">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>{data.contractFile.name}</span>
              </div>
            ) : (
              <>
                <div className="ani-upload-icon-wrap">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="ani-upload-text">
                  <span className="ani-upload-link">Upload a file</span> or drag and drop
                </p>
                <p className="ani-upload-hint">Agreement Document PDF</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFile} />

          {/* Agree checkbox */}
          <label className="ani-agree-row">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="ani-agree-checkbox"
            />
            <span className="ani-agree-text">
              I confirm that I have read and agree to the terms mentioned in the agreement.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SHARED — Hourglass illustration SVG
══════════════════════════════════════════════════════════ */
function HourglassIllustration() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      {/* Shadow ellipse */}
      <ellipse cx="70" cy="128" rx="38" ry="7" fill="#e5e7eb" />
      {/* Person body */}
      <circle cx="70" cy="22" r="12" fill="#1ba8d5" />
      <rect x="56" y="36" width="28" height="34" rx="7" fill="#1a1a2e" />
      {/* Arms */}
      <rect x="40" y="38" width="16" height="7" rx="3.5" fill="#1a1a2e" />
      <rect x="84" y="38" width="16" height="7" rx="3.5" fill="#1a1a2e" />
      {/* Hourglass top */}
      <path d="M42 76 L98 76 L98 80 Q98 96 70 106 Q42 96 42 80 Z" fill="#1ba8d5" opacity="0.85" />
      {/* Hourglass bottom */}
      <path d="M42 122 L98 122 L98 118 Q98 104 70 94 Q42 104 42 118 Z" fill="#1ba8d5" opacity="0.45" />
      {/* Hourglass bars */}
      <rect x="40" y="74" width="60" height="5" rx="2.5" fill="#0e8bb8" />
      <rect x="40" y="120" width="60" height="5" rx="2.5" fill="#0e8bb8" />
      {/* Plant */}
      <ellipse cx="112" cy="126" rx="10" ry="5" fill="#16a34a" opacity="0.55" />
      <path d="M112 126 Q106 110 112 98 Q118 110 112 126" fill="#16a34a" opacity="0.7" />
      <path d="M112 118 Q120 112 124 104" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   VERIFICATION PENDING SCREEN (after Trial submit)
══════════════════════════════════════════════════════════ */
function VerificationPending() {
  const navigate = useNavigate();
  return (
    <div className="ani-pending-wrap">
      <HourglassIllustration />
      <h2 className="ani-pending-title">Document Verification Request Sent</h2>
      <div className="ani-pending-banner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div>
          <p className="ani-pending-banner-title">Pending Review</p>
          <p className="ani-pending-banner-sub">Your documents are under review. We'll notify you once verification is complete.</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP 5 — Payment (minimal, matches screenshot)
══════════════════════════════════════════════════════════ */
function Step5() {
  return (
    <div className="ani-step-body">
      <h2 className="ani-section-title">Payment</h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUBMISSION STATUS SCREEN (after Contract Submit)
   — no hero / no step bar
══════════════════════════════════════════════════════════ */
function SubmissionStatus({ onDashboard }) {
  return (
    <div className="ani-fullscreen-status">
      <div className="ani-logo-bar">
        <img src={logo} alt="P.school" className="ani-logo-img" />
      </div>
      <div className="ani-status-body">
        <HourglassIllustration />
        <h2 className="ani-pending-title" style={{ marginTop: 20 }}>Submission Status</h2>
        <div className="ani-pending-banner ani-pending-banner-centered">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div>
            <p className="ani-pending-banner-title">Pending Review</p>
            <p className="ani-pending-banner-sub">Your signed agreement has been successfully submitted and is now under review.</p>
          </div>
        </div>
        <button type="button" className="ani-btn-next" style={{ marginTop: 28 }} onClick={onDashboard}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUCCESS SCREEN (after Contract Submit)
   — no hero / no step bar
══════════════════════════════════════════════════════════ */
function SuccessScreen({ onContinue, onDone }) {
  return (
    <div className="ani-fullscreen-status">
      <div className="ani-logo-bar">
        <img src={logo} alt="P.school" className="ani-logo-img" />
      </div>
      <div className="ani-status-body">
        {/* Green badge illustration */}
        <div className="ani-success-badge-wrap">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Sparkles */}
            <line x1="50" y1="5" x2="50" y2="12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="88" x2="50" y2="95" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="50" x2="12" y2="50" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="88" y1="50" x2="95" y2="50" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="18" y1="18" x2="23" y2="23" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="77" y1="77" x2="82" y2="82" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="82" y1="18" x2="77" y2="23" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="82" x2="23" y2="77" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            {/* Badge circle */}
            <circle cx="50" cy="50" r="28" fill="#22c55e" />
            {/* Check */}
            <path d="M37 50l9 9 17-18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="ani-success-title">Document &amp; Agreement Submitted<br />Successfully</h2>
        <p className="ani-success-sub">Our team will verify your signed agreement. Once approved, your institute dashboard will be fully activated.</p>

        <div className="ani-next-steps">
          <p className="ani-next-steps-heading">What Happens Next?</p>
          <div className="ani-next-step-card">
            <p className="ani-next-step-title">Verification</p>
            <p className="ani-next-step-desc">Our team will review and verify your signed agreement (typically within 24–48 hours).</p>
          </div>
          <div className="ani-next-step-card">
            <p className="ani-next-step-title">Email Confirmation</p>
            <p className="ani-next-step-desc">You'll receive an email notification once your agreement has been approved.</p>
          </div>
          <div className="ani-next-step-card">
            <p className="ani-next-step-title">Full Access</p>
            <p className="ani-next-step-desc">Access your complete institute dashboard with all features enabled.</p>
          </div>
        </div>

        <button type="button" className="ani-btn-next" style={{ marginTop: 28 }} onClick={onDone}>
          Okay, I'll Wait
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════════ */
export default function AddNewInstitution() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  // 'form' | 'pending' | 'submission' | 'success'
  const [screenState, setScreenState] = useState('form');

  // Step 3 state lifted to root for footer control
  const [step3Tab, setStep3Tab]           = useState('trial');          // 'trial' | 'paid'
  const [step3PaidView, setStep3PaidView] = useState('select');         // 'select' | 'configure'
  const [step3ActivePlan, setStep3ActivePlan] = useState('per-seat');   // which plan is configured

  /* Step 1 state */
  const [basic, setBasic] = useState({
    logoFile: null, logoPreview: '',
    name: '', type: '', email: '', phone: '',
    address: '', country: '', state: '', city: '', district: '', pincode: '',
    pocName: '', pocEmail: '', pocPhone: '',
  });

  /* Step 2 state */
  const [docs, setDocs] = useState({
    ministry: null, tax: null, signatory: null, address: null, director: null,
  });

  /* Step 3 data */
  const [plan, setPlan] = useState({
    trialEnabled: true,
    trialStart: '2026-10-10',
    trialEnd: '2027-10-03',
    selectedPlan: 'per-seat',
  });

  /* Step 4 state */
  const [contract, setContract] = useState({ contractFile: null });

  const handleBasicChange    = (key, val) => setBasic(p => ({ ...p, [key]: val }));
  const handleDocChange      = (key, val) => setDocs(p => ({ ...p, [key]: val }));
  const handlePlanChange     = (key, val) => setPlan(p => ({ ...p, [key]: val }));
  const handleContractChange = (key, val) => setContract(p => ({ ...p, [key]: val }));

  const isLastStep = step === STEPS.length - 1;

  /* ── Footer button label ── */
  const nextLabel = () => {
    if (step === 2) {
      if (step3Tab === 'trial') return 'Request for verification';
      if (step3Tab === 'paid' && step3PaidView === 'configure') return 'Continue';
      return null; // cards view — no next button
    }
    if (step === 3) return 'Submit';
    if (isLastStep) return 'Submit';
    return 'Next';
  };

  /* ── Footer back label ── */
  const backLabel = () => {
    if (step === 0) return 'Cancel';
    return 'Back';
  };

  /* ── Next handler ── */
  const handleNext = () => {
    if (step === 2) {
      if (step3Tab === 'trial') {
        setScreenState('pending');
        return;
      }
      if (step3Tab === 'paid' && step3PaidView === 'configure') {
        setStep(s => s + 1); // → Contract (step 3)
        return;
      }
      return;
    }
    if (step === 3) {
      // Contract Submit → Success screen ("Document & Agreement Submitted Successfully")
      setScreenState('success');
      return;
    }
    if (isLastStep) {
      // Payment Submit → Submission Status ("Go To Dashboard")
      setScreenState('submission');
      return;
    }
    setStep(s => s + 1);
  };

  /* ── Back handler ── */
  const handleBack = () => {
    // On step 3 paid configure view → go back to plan cards
    if (step === 2 && step3Tab === 'paid' && step3PaidView === 'configure') {
      setStep3PaidView('select');
      return;
    }
    if (step === 0) { navigate(-1); return; }
    setStep(s => s - 1);
  };

  /* ── Standalone screens ── */
  if (screenState === 'submission') {
    return <SubmissionStatus onDashboard={() => navigate('/dashboard/institutions')} />;
  }
  if (screenState === 'success') {
    return (
      <SuccessScreen
        onDone={() => {
          // "Okay I'll Wait" → go to Payment step
          setScreenState('form');
          setStep(4);
        }}
      />
    );
  }

  /* ── Shared page shell ── */
  const PageShell = ({ children, stepCurrent }) => (
    <div className="ani-page">
      <div className="ani-logo-bar">
        <img src={logo} alt="P.school" className="ani-logo-img" />
      </div>
      <div className="ani-hero-banner">
        <div className="ani-hero-text">
          <h1 className="ani-hero-title">Complete Your Institute Profile</h1>
          <p className="ani-hero-sub">Let's start with basic details to build your institute's digital presence on our platform.</p>
        </div>
        <svg className="ani-hero-deco" width="180" height="120" viewBox="0 0 180 120" fill="none">
          <polygon points="60,0 180,0 180,120" fill="rgba(255,255,255,0.15)" />
          <polygon points="100,0 180,0 180,80" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
      <StepBar current={stepCurrent} />
      {children}
    </div>
  );

  /* ── Verification pending ── */
  if (screenState === 'pending') {
    return (
      <PageShell stepCurrent={3}>
        <div className="ani-pending-page">
          <VerificationPending />
        </div>
      </PageShell>
    );
  }

  const label = nextLabel();

  /* ── Normal multi-step form ── */
  return (
    <PageShell stepCurrent={step}>
      <div className="ani-card">
        {step === 0 && <Step1 data={basic} onChange={handleBasicChange} />}
        {step === 1 && <Step2 docs={docs} onDocChange={handleDocChange} />}
        {step === 2 && (
          <Step3
            data={plan}
            onChange={handlePlanChange}
            tab={step3Tab}
            paidView={step3PaidView}
            activePlan={step3ActivePlan}
            onTabChange={(t) => {
              setStep3Tab(t);
              if (t === 'trial') setStep3PaidView('select');
            }}
            onSelectPlan={(key) => {
              setStep3ActivePlan(key);
              handlePlanChange('selectedPlan', key);
              setStep3PaidView('configure');
            }}
          />
        )}
        {step === 3 && <Step4 data={contract} onChange={handleContractChange} />}
        {step === 4 && <Step5 />}

        <div className="ani-footer">
          <button type="button" className="ani-btn-cancel" onClick={handleBack}>
            {backLabel()}
          </button>
          {label && (
            <button type="button" className="ani-btn-next" onClick={handleNext}>
              {label}
            </button>
          )}
        </div>
      </div>
    </PageShell>
  );
}
