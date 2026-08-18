import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './individualwallet.css';

const ACCOUNTS = [
  { id: 1, label: 'xxxxxxxx3088', bank: 'Axis Bank' },
  { id: 2, label: 'xxxxxxxx4321', bank: 'HDFC Bank' },
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

export default function IndividualWithdrawAccount() {
  const navigate = useNavigate();
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
        <h1 className="iwallet-subpage-title">Bank Details</h1>
      </div>

      <div className="iwallet-subpage-grid">
        <div className="iwallet-form-card">
          <div className="iwallet-form-card-title">Saved Accounts</div>

          {ACCOUNTS.map(a => (
            <label key={a.id} className="iwallet-account-option">
              <div className="iwallet-account-left">
                <BankIcon />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{a.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{a.bank}</div>
                </div>
              </div>
              <input type="radio" name="account" className="iwallet-radio"
                checked={selected === a.id} onChange={() => setSelected(a.id)} />
            </label>
          ))}

          <button className="iwallet-add-bank-btn"
            onClick={() => navigate('/instructor/individual/dashboard/wallet/add-method')}>
            + Add Another Bank
          </button>
        </div>

        <div className="iwallet-info-panel">
          <div className="iwallet-info-panel-title">About Bank Accounts</div>
          {[
            'You can save multiple bank accounts for withdrawals.',
            'Only verified accounts can receive payouts.',
            'Account verification may take up to 24 hours.',
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
