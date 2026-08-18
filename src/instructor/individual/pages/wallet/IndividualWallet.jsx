import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./individualwallet.css";

const TRANSACTIONS = [
  { label: "Payout",      date: "Jan 21, 2026", amount: "+$120",   status: "Completed", type: "payout"  },
  { label: "Course Sale", date: "Jan 15, 2026", amount: "-$14.99", status: "Failed",    type: "failed"  },
  { label: "Course Sale", date: "Jan 15, 2026", amount: "-$19.99", status: "Pending",   type: "pending" },
  { label: "Payout",      date: "Jan 15, 2026", amount: "+$95",    status: "Completed", type: "payout"  },
  { label: "Course Sale", date: "Jan 05, 2026", amount: "-$13.99", status: "Pending",   type: "pending" },
  { label: "Payout",      date: "Dec 28, 2025", amount: "+$200",   status: "Completed", type: "payout"  },
  { label: "Course Sale", date: "Dec 20, 2025", amount: "+$29.99", status: "Completed", type: "payout"  },
];

const FILTERS = ["All", "Completed", "Pending", "Reject"];

const TrendUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
  </svg>
);

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const WithdrawIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);

const BankIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22"/>
    <line x1="6" y1="18" x2="6" y2="11"/>
    <line x1="10" y1="18" x2="10" y2="11"/>
    <line x1="14" y1="18" x2="14" y2="11"/>
    <line x1="18" y1="18" x2="18" y2="11"/>
    <polygon points="12 2 20 7 4 7"/>
  </svg>
);

export default function IndividualWallet() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? TRANSACTIONS
    : TRANSACTIONS.filter(t => t.status === activeFilter);

  return (
    <div className="iwallet-page">
      <div className="iwallet-page-header">
        <div>
          <h1 className="iwallet-page-title">Wallet</h1>
          <span className="iwallet-breadcrumb">Home / Wallet</span>
        </div>
        <button className="iwallet-add-method-btn"
          onClick={() => navigate("/instructor/individual/dashboard/wallet/add-method")}>
          + Add Withdrawal Method
        </button>
      </div>

      <div className="iwallet-top-grid">
        <div className="iwallet-balance-card">
          <div className="iwallet-balance-inner">
            <div>
              <div className="iwallet-balance-label">Wallet Balance</div>
              <div className="iwallet-balance-amount">$2,450</div>
              <div className="iwallet-balance-sub">Available for withdrawal</div>
            </div>
            <div className="iwallet-balance-icon-wrap"><CardIcon /></div>
          </div>
          <div className="iwallet-balance-actions">
            <button className="iwallet-btn-outline"
              onClick={() => navigate("/instructor/individual/dashboard/wallet/bank-details")}>
              <BankIcon /> Bank Details
            </button>
            <button className="iwallet-btn-white"
              onClick={() => navigate("/instructor/individual/dashboard/wallet/withdraw")}>
              <WithdrawIcon /> Withdraw
            </button>
          </div>
        </div>

        <div className="iwallet-stats-col">
          <div className="iwallet-stat-card green">
            <div className="iwallet-stat-top"><span className="iwallet-stat-label">Total Earnings</span><TrendUp /></div>
            <div className="iwallet-stat-value">$2,450</div>
            <div className="iwallet-stat-sub">All time</div>
          </div>
          <div className="iwallet-stat-card blue">
            <div className="iwallet-stat-top"><span className="iwallet-stat-label">This Month</span><TrendUp /></div>
            <div className="iwallet-stat-value">$420</div>
            <div className="iwallet-stat-sub">January 2026</div>
          </div>
          <div className="iwallet-stat-card purple">
            <div className="iwallet-stat-top"><span className="iwallet-stat-label">Pending</span></div>
            <div className="iwallet-stat-value">$33.98</div>
            <div className="iwallet-stat-sub">2 transactions</div>
          </div>
        </div>
      </div>

      <div className="iwallet-txn-section">
        <div className="iwallet-txn-header">
          <h2 className="iwallet-txn-title">Transaction History</h2>
          <div className="iwallet-filters">
            {FILTERS.map(f => (
              <button key={f}
                className={"iwallet-filter-btn" + (activeFilter === f ? " active" : "")}
                onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="iwallet-table-head">
          <span>Transaction</span><span>Date</span><span>Amount</span><span>Status</span>
        </div>
        <div className="iwallet-txn-list">
          {filtered.length === 0 ? (
            <div className="iwallet-empty">No transactions found</div>
          ) : filtered.map((t, i) => (
            <div key={i} className="iwallet-txn-row">
              <div className="iwallet-txn-info">
                <div className="iwallet-txn-icon"><CardIcon /></div>
                <div className="iwallet-txn-label">{t.label}</div>
              </div>
              <div className="iwallet-txn-date">{t.date}</div>
              <div className={"iwallet-txn-amount " + t.type}>{t.amount}</div>
              <div className={"iwallet-txn-badge " + t.type}>{t.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
