import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createinstructorplan.css';

const CATEGORIES      = ['Free Plan', 'Basic Plan', 'Premium Plan', 'Enterprise Plan'];
const COURSE_LIMITS   = ['1', '5', '10', '25', '50', 'Unlimited'];

const INITIAL_FEATURES = [
  'Create 1 course',
  'Basic analytics',
  'Standard revenue share',
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
      className={`cip2-toggle${checked ? ' cip2-toggle--on' : ''}`}>
      <span className="cip2-toggle-thumb" />
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
    <div className="cip2-dropdown-wrap" ref={ref}>
      <button type="button"
        className={`cip2-select-btn${open ? ' cip2-select-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}>
        <span className={value ? 'cip2-select-val' : 'cip2-select-ph'}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          className={`cip2-chevron${open ? ' cip2-chevron--up' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <ul className="cip2-dropdown-list">
          {options.map(opt => (
            <li key={opt}
              className={`cip2-dropdown-item${value === opt ? ' cip2-dropdown-item--active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function CreateInstructorPlan() {
  const navigate = useNavigate();

  const [planName, setPlanName]         = useState('Free Instructor');
  const [category, setCategory]         = useState('Free Plan');
  const [description, setDescription]  = useState('Basic tools for instructors to get started');
  const [monthlyOn, setMonthlyOn]       = useState(true);
  const [annualOn, setAnnualOn]         = useState(true);
  const [monthlyPrice, setMonthlyPrice] = useState('10');
  const [annualPrice, setAnnualPrice]   = useState('10');
  const [revenueShare, setRevenueShare] = useState(70);
  const [courseLimit, setCourseLimit]   = useState('1');
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
    <div className="cip2-page">

      {/* ── Page header ── */}
      <div className="cip2-page-header">
        <div className="cip2-header-left">
          <button className="cip2-back-btn"
            onClick={() => navigate('/dashboard/subscription-plan')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="cip2-page-title">Create Instructor plan</h1>
        </div>
        <span className="cip2-breadcrumb">
          Subscription plan &rsaquo; Instructor &rsaquo; Create Instructor Plan
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="cip2-body">
        <div className="cip2-form">

          {/* Plan Name */}
          <div className="cip2-field">
            <label className="cip2-label">Plan Name</label>
            <input className="cip2-input" value={planName}
              onChange={e => setPlanName(e.target.value)} placeholder="Plan Name"/>
          </div>

          {/* Plan Category */}
          <div className="cip2-field">
            <label className="cip2-label">Plan Category</label>
            <Dropdown value={category} onChange={setCategory}
              options={CATEGORIES} placeholder="Select category"/>
          </div>

          {/* Plan Description */}
          <div className="cip2-field">
            <label className="cip2-label">Plan Description</label>
            <textarea className="cip2-textarea" rows={4} value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Plan description"/>
          </div>

          {/* Pricing row — 2 cols (Monthly + Annual only) */}
          <div className="cip2-pricing-row">
            {/* Monthly */}
            <div className="cip2-price-col">
              <div className="cip2-price-header">
                <span className="cip2-label">Monthly Price</span>
                <Toggle checked={monthlyOn} onChange={setMonthlyOn}/>
              </div>
              <div className="cip2-price-input-wrap">
                <span className="cip2-currency">$</span>
                <input className="cip2-price-input" value={monthlyPrice}
                  onChange={e => setMonthlyPrice(e.target.value)}
                  disabled={!monthlyOn} placeholder="0"/>
              </div>
            </div>
            {/* Annual */}
            <div className="cip2-price-col">
              <div className="cip2-price-header">
                <span className="cip2-label">Annual Price</span>
                <Toggle checked={annualOn} onChange={setAnnualOn}/>
              </div>
              <div className="cip2-price-input-wrap">
                <span className="cip2-currency">$</span>
                <input className="cip2-price-input" value={annualPrice}
                  onChange={e => setAnnualPrice(e.target.value)}
                  disabled={!annualOn} placeholder="0"/>
              </div>
            </div>
          </div>

          {/* Revenue Share Percentage — slider */}
          <div className="cip2-field">
            <label className="cip2-label">Revenue Share Percentage</label>
            <div className="cip2-slider-row">
              <input
                type="range"
                min={0} max={100} step={1}
                value={revenueShare}
                onChange={e => setRevenueShare(Number(e.target.value))}
                className="cip2-slider"
                aria-label="Revenue share percentage"
                style={{ '--pct': `${revenueShare}%` }}
              />
              <span className="cip2-slider-value">{revenueShare}%</span>
            </div>
            <p className="cip2-slider-hint">Instructor's share of course revenue</p>
          </div>

          {/* Course Creation Limit */}
          <div className="cip2-field">
            <label className="cip2-label">Course Creation Limit</label>
            <Dropdown value={courseLimit} onChange={setCourseLimit}
              options={COURSE_LIMITS} placeholder="Select limit"/>
          </div>

          {/* Features list */}
          <div className="cip2-field">
            <div className="cip2-features-header">
              <label className="cip2-label">Features list Point</label>
              <button type="button" className="cip2-add-feature-btn" onClick={addFeature}>
                + Add Feature
              </button>
            </div>
            <div className="cip2-features-list">
              {features.map((feat, idx) => (
                <div key={idx} className="cip2-feature-row">
                  <input className="cip2-feature-input" value={feat}
                    onChange={e => updateFeature(idx, e.target.value)}
                    placeholder="Feature name"/>
                  <button type="button" className="cip2-feature-del"
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
          <div className="cip2-field">
            <label className="cip2-label">Administrative Features</label>
            <div className="cip2-admin-list">
              {ADMIN_FEATURES.map(af => (
                <div key={af.key} className="cip2-admin-row">
                  <div className="cip2-admin-info">
                    <span className="cip2-admin-label">{af.label}</span>
                    <span className="cip2-admin-sub">{af.sub}</span>
                  </div>
                  <Toggle checked={adminFeatures[af.key]}
                    onChange={() => toggleAdmin(af.key)}/>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="cip2-footer">
            <button className="cip2-btn-cancel"
              onClick={() => navigate('/dashboard/subscription-plan')}>
              Cancel
            </button>
            <button className="cip2-btn-save">Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}
