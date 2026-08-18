import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionsubscription.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const CheckIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

const FEATURES = [
  'Student Management',
  'Instructor Management',
  'Course Assignment',
  'LMS Integrations (Google Classroom, Moodle)',
  'Reports & Analytics',
  'Email Support',
];

const PLANS = [
  {
    name: 'Starter Plan',
    price: '₹15,000',
    period: '/ year',
    seats: '500',
    tag: null,
    current: false,
  },
  {
    name: 'Starter Plan',
    price: '₹15,000',
    period: '/ year',
    seats: '500',
    tag: 'Current Plan',
    tagColor: '#22c55e',
    current: true,
  },
  {
    name: 'Enterprise Plan',
    price: '₹450,000',
    period: '/ year',
    seats: 'Unlimited',
    tag: 'Best for Large Institutes',
    tagColor: '#6366f1',
    current: false,
  },
];

export default function InstitutionExplorePlans() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('annual');

  return (
    <div className="isub-page">
      <div className="isub-page-header">
        <button className="isub-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Explore More Plan</span>
        </button>
        <span className="isub-breadcrumb">Subscription plan &rsaquo; Change Plan</span>
      </div>

      <div className="isub-body">

        {/* Billing toggle */}
        <div className="isub-billing-toggle-wrap">
          <div className="isub-billing-toggle">
            <button
              className={`isub-billing-btn${billing === 'monthly' ? ' active' : ''}`}
              onClick={() => setBilling('monthly')}>
              Monthly
            </button>
            <button
              className={`isub-billing-btn${billing === 'annual' ? ' active' : ''}`}
              onClick={() => setBilling('annual')}>
              Annual
            </button>
          </div>
          <p className="isub-billing-save">Save 20% with annual billing</p>
        </div>

        {/* Plans grid */}
        <div className="isub-plans-grid">
          {PLANS.map((plan, i) => (
            <div key={i} className={`isub-plan-option${plan.current ? ' isub-plan-option--current' : ''}`}>
              <div className="isub-plan-option-header">
                <h3 className="isub-plan-option-name">{plan.name}</h3>
                {plan.tag && (
                  <span className="isub-plan-option-tag"
                    style={{ background: plan.tagColor === '#22c55e' ? '#dcfce7' : '#ede9fe',
                             color: plan.tagColor }}>
                    {plan.tag}
                  </span>
                )}
              </div>
              <div className="isub-plan-option-price">
                <span className="isub-plan-option-amount">{plan.price}</span>
              </div>
              <div className="isub-plan-option-period">{plan.period}</div>
              <div className="isub-plan-option-seats-row">
                <span className="isub-plan-option-seats-label">Seats Included</span>
                <span className="isub-plan-option-seats-value">{plan.seats}</span>
              </div>
              <div className="isub-plan-option-features-title">Features</div>
              <ul className="isub-plan-option-features">
                {FEATURES.map(f => (
                  <li key={f} className="isub-plan-option-feature">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="isub-plan-select-btn"
                onClick={() => navigate('/institution/dashboard/subscription')}>
                Select Plan
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
