import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionsubscription.css';

/* ── Icons ── */
const CloseIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>);
const InfoIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const WarnIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const DangerIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const FilterIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const SunIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>);
const PrevIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const NextIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
const ModalCloseIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>);

/* ── Invoice data ── */
const INVOICES = Array.from({ length: 6 }, (_, i) => ({
  id: `INV-2025-00${i + 1}`,
  start: '01 Jan 2025',
  end: '31 Dec 2025',
  amount: '₹2,50,000',
  status: i % 3 === 2 ? 'Pending' : 'Paid',
}));

const PAYMENTS = Array.from({ length: 4 }, (_, i) => ({
  id: `PAY-2025-00${i + 1}`,
  date: '12 Aug 2025',
  amount: '₹2,50,000',
  method: 'UPI',
  status: 'Success',
}));

/* ── Add Seats Modal ── */
function AddSeatsModal({ onClose }) {
  const [seats, setSeats] = useState('2');
  const costPerSeat = 200;
  const total = Number(seats || 0) * costPerSeat;

  return (
    <div className="isub-modal-overlay" onClick={onClose}>
      <div className="isub-modal" onClick={e => e.stopPropagation()}>
        <div className="isub-modal-header">
          <h3 className="isub-modal-title">Add Seats</h3>
          <button className="isub-modal-close" onClick={onClose}><ModalCloseIcon /></button>
        </div>
        <div className="isub-modal-body">
          <div className="isub-modal-field">
            <label className="isub-modal-label">Current Seats</label>
            <input className="isub-modal-input" value="1,200" readOnly />
          </div>
          <div className="isub-modal-field">
            <label className="isub-modal-label">Add Seats</label>
            <input className="isub-modal-input isub-modal-input--active"
              type="number" min="1" value={seats}
              onChange={e => setSeats(e.target.value)} />
          </div>
          <div className="isub-cost-summary">
            <div className="isub-cost-row">
              <span className="isub-cost-label">Cost per Seat</span>
              <span className="isub-cost-value">₹{costPerSeat}</span>
            </div>
            <div className="isub-cost-row">
              <span className="isub-cost-label">Seats Added</span>
              <span className="isub-cost-value">{seats || 0}</span>
            </div>
            <div className="isub-cost-divider" />
            <div className="isub-cost-row isub-cost-row--total">
              <span className="isub-cost-label">Allow Overage</span>
              <span className="isub-cost-value isub-cost-value--total">₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div className="isub-modal-actions">
            <button className="isub-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="isub-btn-pay" onClick={onClose}>Process to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstitutionSubscription() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info',   msg: 'Renewal reminder – 30 days remaining' },
    { id: 2, type: 'warn',   msg: 'Seat usage near limit – 90% used' },
    { id: 3, type: 'danger', msg: 'Payment pending notification' },
  ]);
  const [tab, setTab] = useState('invoice');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showAddSeats, setShowAddSeats] = useState(false);
  const totalPages = 5;

  function dismissAlert(id) {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  const SEATS_PURCHASED = 1200;
  const SEATS_USED = 1100;
  const usedPct = Math.round((SEATS_USED / SEATS_PURCHASED) * 100);

  return (
    <div className="isub-page">
      <div className="isub-page-header">
        <h1 className="isub-page-title">Billing &amp; Subscription</h1>
        <span className="isub-breadcrumb">Subscription plan</span>
      </div>

      <div className="isub-body">

        {/* ── Alert banners ── */}
        {alerts.map(a => (
          <div key={a.id} className={`isub-alert isub-alert--${a.type}`}>
            <div className="isub-alert-left">
              {a.type === 'info'   && <InfoIcon />}
              {a.type === 'warn'   && <WarnIcon />}
              {a.type === 'danger' && <DangerIcon />}
              <span>{a.msg}</span>
            </div>
            <button className="isub-alert-close" onClick={() => dismissAlert(a.id)}>
              <CloseIcon />
            </button>
          </div>
        ))}

        {/* ── Current Plan card ── */}
        <div>
          <h2 className="isub-section-title">Your Current Plan</h2>
          <div className="isub-plan-card">
            {/* Decorative wave */}
            <div className="isub-plan-wave" />

            <div className="isub-plan-top">
              <div>
                <h3 className="isub-plan-name">Institute Annual Plan</h3>
                <span className="isub-plan-badge">Active</span>
              </div>
              <div className="isub-plan-price">
                <span className="isub-plan-amount">₹2,50,000</span>
                <span className="isub-plan-period">/ year</span>
              </div>
            </div>

            <div className="isub-plan-meta">
              {[
                { label: 'Seats Purchased', value: '1,200' },
                { label: 'Seats Used',      value: '1,100' },
                { label: 'Seats Available', value: '100'   },
                { label: 'Billing Cycle',   value: 'Annual' },
              ].map(m => (
                <div key={m.label} className="isub-plan-meta-item">
                  <div className="isub-plan-meta-label">{m.label}</div>
                  <div className="isub-plan-meta-value">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="isub-progress-row">
              <span className="isub-progress-label">Total Seats: {SEATS_PURCHASED.toLocaleString()}</span>
              <span className="isub-progress-label">Used Seats: {SEATS_USED.toLocaleString()}</span>
            </div>
            <div className="isub-progress-track">
              <div className="isub-progress-fill" style={{ width: `${usedPct}%` }} />
            </div>

            {/* Actions */}
            <div className="isub-plan-actions">
              <div>
                <button className="isub-btn-add-seats" onClick={() => setShowAddSeats(true)}>
                  + Add Seats
                </button>
                <p className="isub-add-seats-hint">
                  Additional seats will be billed proportionally for the remaining period.
                </p>
              </div>
              <div className="isub-plan-action-btns">
                <button className="isub-btn-download">
                  <DownloadIcon /> Download Invoice
                </button>
                <button className="isub-btn-change"
                  onClick={() => navigate('/institution/dashboard/subscription/plans')}>
                  + Change Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Invoice / Payment History tabs ── */}
        <div className="isub-invoice-card">
          <div className="isub-invoice-tabs">
            <button className={`isub-invoice-tab${tab === 'invoice' ? ' active' : ''}`}
              onClick={() => setTab('invoice')}>Invoice</button>
            <button className={`isub-invoice-tab${tab === 'payment' ? ' active' : ''}`}
              onClick={() => setTab('payment')}>Payment History</button>
          </div>

          <div className="isub-invoice-toolbar">
            <h3 className="isub-invoice-title">
              {tab === 'invoice' ? 'Invoice List' : 'Payment History'}
            </h3>
            <div className="isub-toolbar-right">
              <div className="isub-search-wrap">
                <SearchIcon />
                <input className="isub-search" placeholder="Search"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="isub-btn-filter"><FilterIcon /> Filters</button>
            </div>
          </div>

          {/* Invoice table */}
          {tab === 'invoice' && (
            <div className="isub-table-wrap">
              <table className="isub-table">
                <thead>
                  <tr><th>Invoice ID</th><th>Start plan</th><th>End Plan</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv, i) => (
                    <tr key={i}>
                      <td>{inv.id}</td>
                      <td>{inv.start}</td>
                      <td>{inv.end}</td>
                      <td>{inv.amount}</td>
                      <td>
                        <span className={`isub-status isub-status--${inv.status.toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        <button className="isub-action-btn"><SunIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payment History table */}
          {tab === 'payment' && (
            <div className="isub-table-wrap">
              <table className="isub-table">
                <thead>
                  <tr><th>Payment ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {PAYMENTS.map((p, i) => (
                    <tr key={i}>
                      <td>{p.id}</td>
                      <td>{p.date}</td>
                      <td>{p.amount}</td>
                      <td>{p.method}</td>
                      <td>
                        <span className="isub-status isub-status--paid">{p.status}</span>
                      </td>
                      <td>
                        <button className="isub-action-btn"><SunIcon /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="isub-pagination">
            <button className="isub-page-btn--nav" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <PrevIcon /> Previous
            </button>
            <div className="isub-page-numbers">
              {[1,2,3].map(n => <button key={n} className={`isub-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
              <span className="isub-page-ellipsis">...</span>
              {[8,9,10].map(n => <button key={n} className={`isub-page-num${page===n?' active':''}`} onClick={() => setPage(n)}>{n}</button>)}
            </div>
            <button className="isub-page-btn--nav" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next <NextIcon />
            </button>
          </div>
        </div>

      </div>

      {showAddSeats && <AddSeatsModal onClose={() => setShowAddSeats(false)} />}
    </div>
  );
}
