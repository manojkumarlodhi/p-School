import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './individualwallet.css';

const ACCOUNTS = [
  { id: 1, label: 'xxxxxxxx3088' },
  { id: 2, label: 'xxxxxxxx4321' },
];

const BankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22"/>
    <line x1="6" y1="18" x2="6" y2="11"/>
    <line x1="10" y1="18" x2="10" y2="11"/>
    <line x1="14" y1="18" x2="14" y2="11"/>
    <line x1="18" y1="18" x2="18" y2="11"/>
    <polygon points="12 2 20 7 4 7"/>
  </svg>
);

export default function IndividualWithdraw() {
  const navigate = useNavigate();
  const [amount,   setAmount]   = useState('');
  const [selected, setSelected] = useState(1);

  return (
    <div className="iwallet-subpage">
      <div className="iwallet-subpage-header">
        <button className="iwallet-back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1 className="iwallet-subpage-title">Withdraw</h1>
      </div>

      <div className="iwallet-subpage-grid">
        {/* Form */}
        <div className="iwallet-form-card">
          <div className="iwallet-form-card-title">Withdrawal Details</div>

          <div className="iwallet-form-group">
            <label className="iwallet-form-label">Withdraw Amount</label>
            <input className="iwallet-form-input" type="number"
              placeholder="Enter amount (e.g. ₹800)"
              value={amount} onChange={e => setAmount(e.target.value)} />
          </div>

          <div className="iwallet-form-group">
            <label className="iwallet-form-label">Withdraw Account</label>
            <div className="iwallet-select-wrap">
              <span className="iwallet-select-bank-icon"><BankIcon /></span>
              <select className="iwallet-form-select"
                value={selected} onChange={e => setSelected(Number(e.target.value))}>
                {ACCOUNTS.map(a => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <button className="iwallet-add-bank-btn"
              onClick={() => navigate('/instructor/individual/dashboard/wallet/add-method')}>
              + Add New Withdrawal Method
            </button>
          </div>

          <button className="iwallet-btn-full">Withdraw</button>
        </div>

        {/* Info panel */}
        <div className="iwallet-info-panel">
          <div className="iwallet-info-panel-title">Withdrawal Information</div>
          {[
            'Withdrawals are processed within 2–3 business days.',
            'Minimum withdrawal amount is ₹100.',
            'Ensure your bank account details are correct before submitting.',
            'You will receive a confirmation email once processed.',
          ].map((t, i) => (
            <div key={i} className="iwallet-info-item">
              <span className="iwallet-info-dot" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
