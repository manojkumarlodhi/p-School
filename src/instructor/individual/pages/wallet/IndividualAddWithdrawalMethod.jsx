import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './individualwallet.css';

function SuccessModal({ title, message, onClose }) {
  return (
    <div className="iwallet-modal-overlay">
      <div className="iwallet-modal">
        <div className="iwallet-modal-check">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="iwallet-modal-title">{title}</h2>
        <p className="iwallet-modal-msg">{message}</p>
        <button className="iwallet-btn-full" style={{ marginTop: 0 }} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

function AddUPIForm({ onSuccess }) {
  const [upiId,    setUpiId]    = useState('');
  const [nickname, setNickname] = useState('');
  return (
    <div className="iwallet-form-card">
      <div className="iwallet-form-card-title">Add UPI ID</div>
      <div className="iwallet-form-group">
        <label className="iwallet-form-label">UPI ID</label>
        <input className="iwallet-form-input" placeholder="e.g. name@ybl"
          value={upiId} onChange={e => setUpiId(e.target.value)} />
      </div>
      <div className="iwallet-form-group">
        <label className="iwallet-form-label">Nickname</label>
        <input className="iwallet-form-input" placeholder="e.g. Abhay Thakur"
          value={nickname} onChange={e => setNickname(e.target.value)} />
      </div>
      <button className="iwallet-btn-full" style={{ marginTop: 8 }}
        onClick={() => upiId.trim() && onSuccess(upiId)}>
        Save UPI ID
      </button>
    </div>
  );
}

function AddBankForm({ onSuccess }) {
  const [form, setForm] = useState({
    holderName: '', bankName: '', accountNumber: '', confirmAccount: '', ifsc: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="iwallet-form-card">
      <div className="iwallet-form-card-title">Add Bank Account</div>
      {[
        { key: 'holderName',     label: 'Account Holder Name',   ph: 'Abhay Thakur'    },
        { key: 'bankName',       label: 'Bank Name',              ph: 'Axis Bank'        },
        { key: 'accountNumber',  label: 'Bank Account Number',    ph: '2165485453131'    },
        { key: 'confirmAccount', label: 'Confirm Account Number', ph: '2165485453131'    },
        { key: 'ifsc',           label: 'IFSC Code',              ph: 'AXIS0002020'      },
      ].map(f => (
        <div key={f.key} className="iwallet-form-group">
          <label className="iwallet-form-label">{f.label}</label>
          <input className="iwallet-form-input" placeholder={f.ph}
            value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
        </div>
      ))}
      <button className="iwallet-btn-full" style={{ marginTop: 8 }}
        onClick={() => form.accountNumber.trim() && onSuccess(form.accountNumber.slice(-4))}>
        Save Bank Account
      </button>
    </div>
  );
}

export default function IndividualAddWithdrawalMethod() {
  const navigate = useNavigate();
  const [view,  setView]  = useState('select'); // 'select' | 'upi' | 'bank'
  const [modal, setModal] = useState(null);

  const handleModalClose = () => {
    setModal(null);
    navigate('/instructor/individual/dashboard/wallet');
  };

  const title = view === 'upi' ? 'Add UPI ID' : view === 'bank' ? 'Add Bank Account' : 'Add Withdrawal Method';

  return (
    <div className="iwallet-subpage">
      {modal && <SuccessModal title={modal.title} message={modal.message} onClose={handleModalClose} />}

      <div className="iwallet-subpage-header">
        <button className="iwallet-back-btn"
          onClick={() => view === 'select' ? navigate(-1) : setView('select')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1 className="iwallet-subpage-title">{title}</h1>
      </div>

      <div className="iwallet-subpage-grid">
        <div>
          {view === 'select' && (
            <div className="iwallet-form-card">
              <div className="iwallet-form-card-title">Select Method Type</div>

              <button className="iwallet-method-option" onClick={() => setView('upi')}>
                <div className="iwallet-method-left">
                  <span className="iwallet-method-badge">UPI</span>
                  <span>Add UPI ID</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>

              <div className="iwallet-form-label" style={{ margin: '16px 0 10px' }}>Withdraw Account</div>

              <button className="iwallet-method-option" onClick={() => setView('bank')}>
                <div className="iwallet-method-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="22" x2="21" y2="22"/>
                    <line x1="6" y1="18" x2="6" y2="11"/>
                    <line x1="10" y1="18" x2="10" y2="11"/>
                    <line x1="14" y1="18" x2="14" y2="11"/>
                    <line x1="18" y1="18" x2="18" y2="11"/>
                    <polygon points="12 2 20 7 4 7"/>
                  </svg>
                  <span>Add Bank Account</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          )}

          {view === 'upi' && (
            <AddUPIForm onSuccess={(id) => setModal({
              title: 'Successfully Saved UPI ID',
              message: `UPI ID ${id} added successfully.`,
            })} />
          )}

          {view === 'bank' && (
            <AddBankForm onSuccess={(last4) => setModal({
              title: 'Successfully Added Bank Account',
              message: `Bank account ending with ****${last4} added successfully.`,
            })} />
          )}
        </div>

        <div className="iwallet-info-panel">
          <div className="iwallet-info-panel-title">Supported Methods</div>
          {[
            'UPI IDs are instantly verified and ready for use.',
            'Bank accounts require 1–2 business days for verification.',
            'You can add multiple UPI IDs and bank accounts.',
            'All payment details are encrypted and secure.',
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
