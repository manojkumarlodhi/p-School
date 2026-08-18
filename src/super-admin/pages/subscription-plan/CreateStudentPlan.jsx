import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createstudentplan.css';

const CATEGORIES   = ['Free Plan', 'Basic Plan', 'Premium Plan', 'Family', 'Enterprise Plan'];
const AGE_OPTIONS  = ['No restriction', '13+ Year', '16+ Year', '18+ Year'];
const TRIAL_OPTIONS = ['7 Days', '16 Days', '30 Days'];

const INITIAL_FEATURES = [
  'Single discipline',
  'Standard labs',
  'Certificates included',
  'Community support',
];

const ADMIN_FEATURES = [
  { key: 'analytics', label: 'Advanced Analytics',  sub: 'Detailed insights and reporting' },
  { key: 'marketing', label: 'Marketing Tools',      sub: 'Email campaigns and promotions' },
  { key: 'support',   label: 'Priority Support',     sub: '24/7 dedicated support team' },
];

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button role="switch" aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`csp-toggle${checked ? ' csp-toggle--on' : ''}`}>
      <span className="csp-toggle-thumb" />
    </button>
  );
}

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
    <div className="csp-dropdown-wrap" ref={ref}>
      <button type="button"
        className={`csp-select-btn${open ? ' csp-select-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}>
        <span className={value ? 'csp-select-val' : 'csp-select-ph'}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          className={`csp-chevron${open ? ' csp-chevron--up' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <ul className="csp-dropdown-list">
          {options.map(opt => (
            <li key={opt}
              className={`csp-dropdown-item${value === opt ? ' csp-dropdown-item--active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Radio button ── */
function Radio({ label, checked, onChange }) {
  return (
    <label className="csp-radio-label">
      <span className={`csp-radio-circle${checked ? ' csp-radio-circle--checked' : ''}`}
        aria-hidden="true">
        {checked && <span className="csp-radio-dot"/>}
      </span>
      <input type="radio" className="csp-radio-input"
        checked={checked} onChange={onChange} aria-label={label}/>
      <span className="csp-radio-text">{label}</span>
    </label>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function CreateStudentPlan() {
  const navigate = useNavigate();

  const [planName, setPlanName]         = useState('Free Instructor');
  const [category, setCategory]         = useState('Family');
  const [description, setDescription]  = useState('Basic access for students to get started');
  const [monthlyOn, setMonthlyOn]       = useState(true);
  const [annualOn, setAnnualOn]         = useState(true);
  const [lifetimeOn, setLifetimeOn]     = useState(true);
  const [monthlyPrice, setMonthlyPrice] = useState('10');
  const [annualPrice, setAnnualPrice]   = useState('10');
  const [lifetimePrice, setLifetimePrice] = useState('10');
  const [courseAccess, setCourseAccess] = useState('all'); // 'all' | 'single'
  const [ageRestriction, setAgeRestriction] = useState('No restriction');
  const [trialEnabled, setTrialEnabled] = useState(true);
  const [trialDays, setTrialDays]       = useState('7 Days');
  const [features, setFeatures]         = useState(INITIAL_FEATURES);
  const [adminFeatures, setAdminFeatures] = useState({
    analytics: true, marketing: true, support: true,
  });

  function addFeature() { setFeatures(prev => [...prev, '']); }
  function updateFeature(idx, val) {
    setFeatures(prev => prev.map((f, i) => i === idx ? val : f));
  }
  function removeFeature(idx) {
    setFeatures(prev => prev.filter((_, i) => i !== idx));
  }
  function toggleAdmin(key) {
    setAdminFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="csp-page">

      {/* ── Page header ── */}
      <div className="csp-page-header">
        <div className="csp-header-left">
          <button className="csp-back-btn"
            onClick={() => navigate('/dashboard/subscription-plan')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="csp-page-title">Create Student plan</h1>
        </div>
        <span className="csp-breadcrumb">
          Subscription plan &rsaquo; Student &rsaquo; Create Student plan
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="csp-body">
        <div className="csp-form">

          {/* Plan Name */}
          <div className="csp-field">
            <label className="csp-label">Plan Name</label>
            <input className="csp-input" value={planName}
              onChange={e => setPlanName(e.target.value)} placeholder="Plan Name"/>
          </div>

          {/* Plan Category */}
          <div className="csp-field">
            <label className="csp-label">Plan Category</label>
            <Dropdown value={category} onChange={setCategory}
              options={CATEGORIES} placeholder="Select category"/>
          </div>

          {/* Plan Description */}
          <div className="csp-field">
            <label className="csp-label">Plan Description</label>
            <textarea className="csp-textarea" rows={4} value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Plan description"/>
          </div>

          {/* Pricing row — 3 cols */}
          <div className="csp-pricing-row">
            {/* Monthly */}
            <div className="csp-price-col">
              <div className="csp-price-header">
                <span className="csp-label">Monthly Price</span>
                <Toggle checked={monthlyOn} onChange={setMonthlyOn}/>
              </div>
              <div className="csp-price-input-wrap">
                <span className="csp-currency">$</span>
                <input className="csp-price-input" value={monthlyPrice}
                  onChange={e => setMonthlyPrice(e.target.value)}
                  disabled={!monthlyOn} placeholder="0"/>
              </div>
            </div>
            {/* Annual */}
            <div className="csp-price-col">
              <div className="csp-price-header">
                <span className="csp-label">Annual Price</span>
                <Toggle checked={annualOn} onChange={setAnnualOn}/>
              </div>
              <div className="csp-price-input-wrap">
                <span className="csp-currency">$</span>
                <input className="csp-price-input" value={annualPrice}
                  onChange={e => setAnnualPrice(e.target.value)}
                  disabled={!annualOn} placeholder="0"/>
              </div>
            </div>
            {/* Lifetime */}
            <div className="csp-price-col">
              <div className="csp-price-header">
                <span className="csp-label">Life Time Price</span>
                <Toggle checked={lifetimeOn} onChange={setLifetimeOn}/>
              </div>
              <div className="csp-price-input-wrap">
                <span className="csp-currency">$</span>
                <input className="csp-price-input" value={lifetimePrice}
                  onChange={e => setLifetimePrice(e.target.value)}
                  disabled={!lifetimeOn} placeholder="0"/>
              </div>
            </div>
          </div>

          {/* Course Access — radio */}
          <div className="csp-field">
            <label className="csp-label">Course Access</label>
            <div className="csp-radio-group">
              <Radio label="All Courses"   checked={courseAccess === 'all'}
                onChange={() => setCourseAccess('all')}/>
              <Radio label="Single Course" checked={courseAccess === 'single'}
                onChange={() => setCourseAccess('single')}/>
            </div>
          </div>

          {/* Minimum Age Restriction */}
          <div className="csp-field">
            <label className="csp-label">Minimum Age Restriction</label>
            <Dropdown value={ageRestriction} onChange={setAgeRestriction}
              options={AGE_OPTIONS} placeholder="Select age restriction"/>
          </div>

          {/* Trial Period */}
          <div className="csp-field">
            <label className="csp-label">Trial Period</label>
            <div className="csp-trial-card">
              <div className="csp-trial-header">
                <div>
                  <p className="csp-trial-title">Enable Trial</p>
                  <p className="csp-trial-sub">Offer a free trial period</p>
                </div>
                <Toggle checked={trialEnabled} onChange={setTrialEnabled}/>
              </div>
              {trialEnabled && (
                <div style={{ marginTop: 12 }}>
                  <Dropdown value={trialDays} onChange={setTrialDays}
                    options={TRIAL_OPTIONS} placeholder="Select duration"/>
                </div>
              )}
            </div>
          </div>

          {/* Features list */}
          <div className="csp-field">
            <div className="csp-features-header">
              <label className="csp-label">Features list Point</label>
              <button type="button" className="csp-add-feature-btn" onClick={addFeature}>
                + Add Feature
              </button>
            </div>
            <div className="csp-features-list">
              {features.map((feat, idx) => (
                <div key={idx} className="csp-feature-row">
                  <input className="csp-feature-input" value={feat}
                    onChange={e => updateFeature(idx, e.target.value)}
                    placeholder="Feature name"/>
                  <button type="button" className="csp-feature-del"
                    onClick={() => removeFeature(idx)} aria-label="Remove feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Administrative Features */}
          <div className="csp-field">
            <label className="csp-label">Administrative Features</label>
            <div className="csp-admin-list">
              {ADMIN_FEATURES.map(af => (
                <div key={af.key} className="csp-admin-row">
                  <div className="csp-admin-info">
                    <span className="csp-admin-label">{af.label}</span>
                    <span className="csp-admin-sub">{af.sub}</span>
                  </div>
                  <Toggle checked={adminFeatures[af.key]}
                    onChange={() => toggleAdmin(af.key)}/>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="csp-footer">
            <button className="csp-btn-cancel"
              onClick={() => navigate('/dashboard/subscription-plan')}>
              Cancel
            </button>
            <button className="csp-btn-save">Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}
