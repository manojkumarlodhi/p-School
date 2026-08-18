import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createinstitutionsplan.css';

const CATEGORIES = ['Free Plan', 'Basic Plan', 'Premium Plan', 'Enterprise Plan'];
const SEAT_OPTIONS = ['50', '100', '200', '500', 'Unlimited'];

const INITIAL_FEATURES = [
  'Fixed seat count',
  'Named users',
  'Predictable costs',
  'Fixed seat count',
];

const ADMIN_FEATURES = [
  { key: 'subAdmin',    label: 'Sub-Admin Roles',      sub: 'Allow delegation of admin permissions' },
  { key: 'trial',       label: '30-Day Trial',          sub: 'Offer trial period for institutions' },
  { key: 'invoices',    label: 'Consolidated Invoices', sub: 'Single invoice for all services.' },
];

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button role="switch" aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`cip-toggle${checked ? ' cip-toggle--on' : ''}`}>
      <span className="cip-toggle-thumb"/>
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
    <div className="cip-dropdown-wrap" ref={ref}>
      <button type="button"
        className={`cip-select-btn${open ? ' cip-select-btn--open' : ''}`}
        onClick={() => setOpen(o => !o)}>
        <span className={value ? 'cip-select-val' : 'cip-select-ph'}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          className={`cip-chevron${open ? ' cip-chevron--up' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <ul className="cip-dropdown-list">
          {options.map(opt => (
            <li key={opt}
              className={`cip-dropdown-item${value === opt ? ' cip-dropdown-item--active' : ''}`}
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
export default function CreateInstitutionsPlan() {
  const navigate = useNavigate();

  const [planName, setPlanName]         = useState('Per-Seat Licensing');
  const [description, setDescription]  = useState('Pay for each individual user seat');
  const [category, setCategory]         = useState('Free Plan');
  const [monthlyOn, setMonthlyOn]       = useState(true);
  const [annualOn, setAnnualOn]         = useState(true);
  const [lifetimeOn, setLifetimeOn]     = useState(true);
  const [monthlyPrice, setMonthlyPrice] = useState('10');
  const [annualPrice, setAnnualPrice]   = useState('10');
  const [lifetimePrice, setLifetimePrice] = useState('10');
  const [seats, setSeats]               = useState('50');
  const [allowOverage, setAllowOverage] = useState(true);
  const [overagePrice, setOveragePrice] = useState('10');
  const [features, setFeatures]         = useState(INITIAL_FEATURES);
  const [adminFeatures, setAdminFeatures] = useState({
    subAdmin: true, trial: true, invoices: true,
  });

  function addFeature() {
    setFeatures(prev => [...prev, '']);
  }

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
    <div className="cip-page">

      {/* ── Page header ── */}
      <div className="cip-page-header">
        <div className="cip-header-left">
          <button className="cip-back-btn"
            onClick={() => navigate('/dashboard/subscription-plan')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="cip-page-title">Create Institutions Plan</h1>
        </div>
        <span className="cip-breadcrumb">
          Subscription plan &rsaquo; Institute &rsaquo; Create Institutions Plan
        </span>
      </div>

      {/* ── Form body ── */}
      <div className="cip-body">
        <div className="cip-form">

          {/* Plan Name */}
          <div className="cip-field">
            <label className="cip-label">Plan Name</label>
            <input className="cip-input" value={planName}
              onChange={e => setPlanName(e.target.value)} placeholder="Plan Name"/>
          </div>

          {/* Plan Description */}
          <div className="cip-field">
            <label className="cip-label">Plan Description</label>
            <textarea className="cip-textarea" rows={3} value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Plan description"/>
          </div>

          {/* Plan Category */}
          <div className="cip-field">
            <label className="cip-label">Plan Category</label>
            <Dropdown value={category} onChange={setCategory}
              options={CATEGORIES} placeholder="Select category"/>
          </div>

          {/* Pricing row */}
          <div className="cip-pricing-row">
            {/* Monthly */}
            <div className="cip-price-col">
              <div className="cip-price-header">
                <span className="cip-label">Monthly Price</span>
                <Toggle checked={monthlyOn} onChange={setMonthlyOn}/>
              </div>
              <div className="cip-price-input-wrap">
                <span className="cip-currency">$</span>
                <input className="cip-price-input" value={monthlyPrice}
                  onChange={e => setMonthlyPrice(e.target.value)}
                  disabled={!monthlyOn} placeholder="0"/>
              </div>
            </div>
            {/* Annual */}
            <div className="cip-price-col">
              <div className="cip-price-header">
                <span className="cip-label">Annual Price</span>
                <Toggle checked={annualOn} onChange={setAnnualOn}/>
              </div>
              <div className="cip-price-input-wrap">
                <span className="cip-currency">$</span>
                <input className="cip-price-input" value={annualPrice}
                  onChange={e => setAnnualPrice(e.target.value)}
                  disabled={!annualOn} placeholder="0"/>
              </div>
            </div>
            {/* Lifetime */}
            <div className="cip-price-col">
              <div className="cip-price-header">
                <span className="cip-label">Life Time Price</span>
                <Toggle checked={lifetimeOn} onChange={setLifetimeOn}/>
              </div>
              <div className="cip-price-input-wrap">
                <span className="cip-currency">$</span>
                <input className="cip-price-input" value={lifetimePrice}
                  onChange={e => setLifetimePrice(e.target.value)}
                  disabled={!lifetimeOn} placeholder="0"/>
              </div>
            </div>
          </div>

          {/* Number of Seats */}
          <div className="cip-field">
            <label className="cip-label">Number of Seats</label>
            <Dropdown value={seats} onChange={setSeats}
              options={SEAT_OPTIONS} placeholder="Select seats"/>
          </div>

          {/* Allow Overage */}
          <div className="cip-overage-card">
            <div className="cip-overage-header">
              <div>
                <p className="cip-overage-title">Allow Overage</p>
                <p className="cip-overage-sub">Permit usage beyond seat limit with additional charges</p>
              </div>
              <Toggle checked={allowOverage} onChange={setAllowOverage}/>
            </div>
            {allowOverage && (
              <div className="cip-price-input-wrap" style={{ marginTop: 12 }}>
                <span className="cip-currency">$</span>
                <input className="cip-price-input" value={overagePrice}
                  onChange={e => setOveragePrice(e.target.value)} placeholder="0"/>
              </div>
            )}
          </div>

          {/* Features list */}
          <div className="cip-field">
            <div className="cip-features-header">
              <label className="cip-label">Features list Point</label>
              <button type="button" className="cip-add-feature-btn" onClick={addFeature}>
                + Add Feature
              </button>
            </div>
            <div className="cip-features-list">
              {features.map((feat, idx) => (
                <div key={idx} className="cip-feature-row">
                  <input className="cip-feature-input" value={feat}
                    onChange={e => updateFeature(idx, e.target.value)}
                    placeholder="Feature name"/>
                  <button type="button" className="cip-feature-del"
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
          <div className="cip-field">
            <label className="cip-label">Administrative Features</label>
            <div className="cip-admin-list">
              {ADMIN_FEATURES.map(af => (
                <div key={af.key} className="cip-admin-row">
                  <div className="cip-admin-info">
                    <span className="cip-admin-label">{af.label}</span>
                    <span className="cip-admin-sub">{af.sub}</span>
                  </div>
                  <Toggle checked={adminFeatures[af.key]}
                    onChange={() => toggleAdmin(af.key)}/>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="cip-footer">
            <button className="cip-btn-cancel"
              onClick={() => navigate('/dashboard/subscription-plan')}>
              Cancel
            </button>
            <button className="cip-btn-save">Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}
