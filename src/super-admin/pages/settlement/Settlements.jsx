import { useState } from 'react';
import './settlements.css';

/* ── Sample data ── */
const SETTLEMENTS = [
  { id: 1,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Requested' },
  { id: 2,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Approved'  },
  { id: 3,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Dec 2025', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Approved'  },
  { id: 4,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Rejected'  },
  { id: 5,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Rejected'  },
  { id: 6,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Approved'  },
  { id: 7,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Approved'  },
  { id: 8,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Rejected'  },
  { id: 9,  name: 'Abhay Thakur', instId: 'INST-I-002', month: 'Jan 2026', total: '₹120,000', instructor: '₹84,000', admin: '₹36,000', status: 'Approved'  },
];

const TOTAL_PAGES = 10;

/* ── Status badge ── */
function StatusBadge({ status }) {
  const cls =
    status === 'Approved'  ? 'st-badge st-badge-approved'  :
    status === 'Rejected'  ? 'st-badge st-badge-rejected'  :
                             'st-badge st-badge-requested';
  return <span className={cls}>{status}</span>;
}

/* ── Eye icon ── */
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Download icon ── */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Confirm Approval Modal
══════════════════════════════════════════ */
function ConfirmApprovalModal({ onClose, onConfirm }) {
  return (
    <div className="st-modal-backdrop" onClick={onClose}>
      <div className="st-confirm-modal st-confirm-modal-approve" onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className="st-confirm-icon st-confirm-icon-approve">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#1ba8d5" strokeWidth={2.5} strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h2 className="st-confirm-title">Confirm Settlement Approval</h2>
        <p className="st-confirm-desc">
          Are you sure you want to approve this settlement?<br />
          Once approved, you can proceed to complete the payment.
        </p>
        <div className="st-confirm-actions-approve">
          <button className="st-btn-cancel-approve" onClick={onClose}>Cancel</button>
          <button className="st-btn-confirm-approve" onClick={onConfirm}>Confirm Approval</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Reject Settlement Modal
══════════════════════════════════════════ */
const REJECT_REASONS = [
  'Incorrect Bank Details',
  'Earnings Mismatch Detected',
  'Minimum Payout Criteria Not Met',
  'Duplicate Settlement Request',
  'Custom Note',
];

function RejectSettlementModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState(REJECT_REASONS[0]);
  const [open, setOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');

  const isCustom = reason === 'Custom Note';
  const finalReason = isCustom ? customNote : reason;

  return (
    <div className="st-modal-backdrop" onClick={onClose}>
      <div className="st-confirm-modal st-confirm-modal-reject" onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className="st-confirm-icon st-confirm-icon-reject">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth={2.5} strokeLinecap="round">
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 className="st-confirm-title">Reject Settlement</h2>
        <p className="st-confirm-desc">
          Please provide a reason for rejecting this settlement request.
        </p>

        {/* Reason — dropdown or textarea */}
        <div className="st-reject-dropdown-wrap">
          <label className="st-reject-label">Rejection Reason (Required)</label>

          {!isCustom ? (
            /* Dropdown */
            <div className="st-reject-dropdown" style={{ position: 'relative' }}>
              <button
                type="button"
                className="st-reject-trigger"
                onClick={() => setOpen((v) => !v)}
              >
                <span>{reason}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {open && (
                <div className="st-reject-panel">
                  {REJECT_REASONS.map((r) => (
                    <button key={r} type="button"
                      className={`st-reject-option${reason === r ? ' selected' : ''}`}
                      onClick={() => { setReason(r); setOpen(false); }}>
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Custom Note textarea */
            <textarea
              className="st-reject-textarea"
              placeholder="Bank details are incorrect or earnings mismatch."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              rows={4}
            />
          )}
        </div>

        <div className="st-confirm-actions-reject">
          <button className="st-btn-reject-confirm" onClick={() => onConfirm(finalReason)}>
            Reject Settlement
          </button>
          <button className="st-btn-cancel-reject" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Settlement Details Modal
══════════════════════════════════════════ */
function SettlementModal({ row, onClose, onApprove, onReject }) {
  if (!row) return null;

  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm]   = useState(false);

  const isApproved  = row.status === 'Approved';
  const isRejected  = row.status === 'Rejected';
  const isRequested = row.status === 'Requested';

  return (
    <div className="st-modal-backdrop" onClick={onClose}>
      <div className="st-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="st-modal-header">
          <h2 className="st-modal-title">Settlement Details</h2>
          <button className="st-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="st-modal-divider" />

        {/* Instructor Info */}
        <div className="st-modal-body">
          <h3 className="st-modal-section-title">Instructor Info</h3>
          <div className="st-modal-info-grid">
            <div className="st-modal-info-item">
              <span className="st-modal-info-label">Name</span>
              <span className="st-modal-info-value">Rahul Sharma</span>
            </div>
            <div className="st-modal-info-item">
              <span className="st-modal-info-label">Instructor ID</span>
              <span className="st-modal-info-value">INST-I-001</span>
            </div>
            <div className="st-modal-info-item">
              <span className="st-modal-info-label">Settlement Month</span>
              <span className="st-modal-info-value">January 2026</span>
            </div>
            <div className="st-modal-info-item">
              <span className="st-modal-info-label">Current Status</span>
              <StatusBadge status={row.status} />
            </div>
          </div>

          {/* Earnings Breakdown */}
          <h3 className="st-modal-section-title" style={{ marginTop: 20 }}>Earnings Breakdown</h3>
          <div className="st-modal-earnings-grid">
            <div className="st-modal-earning-card">
              <span className="st-modal-earning-label">Total Earning</span>
              <span className="st-modal-earning-value">₹120,000</span>
            </div>
            <div className="st-modal-earning-card">
              <span className="st-modal-earning-label">Platform Share 30%</span>
              <span className="st-modal-earning-value">₹36,000</span>
            </div>
            <div className="st-modal-earning-card">
              <span className="st-modal-earning-label">Instructor Payable 70%</span>
              <span className="st-modal-earning-value">₹84,000</span>
            </div>
          </div>

          {/* Bank Details — shown for Approved only */}
          {isApproved && (
            <>
              <h3 className="st-modal-section-title" style={{ marginTop: 20 }}>Bank Details</h3>
              <div className="st-modal-info-grid">
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">Bank Account</span>
                  <span className="st-modal-info-value">****4321</span>
                </div>
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">IFSC</span>
                  <span className="st-modal-info-value">HDFC0001234</span>
                </div>
              </div>
            </>
          )}

          {/* Payment Details — shown for Approved only */}
          {isApproved && (
            <>
              <h3 className="st-modal-section-title" style={{ marginTop: 20 }}>Payment Details</h3>
              <div className="st-modal-info-grid">
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">Transaction ID</span>
                  <span className="st-modal-info-value">TXN-PS-2026-001245</span>
                </div>
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">Payment Date</span>
                  <span className="st-modal-info-value">15 Jan 2026</span>
                </div>
              </div>
            </>
          )}

          {/* Payment Details — shown for Rejected/Requested */}
          {(isRejected || isRequested) && (
            <>
              <h3 className="st-modal-section-title" style={{ marginTop: 20 }}>Payment Details</h3>
              <div className="st-modal-info-grid">
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">Bank Account</span>
                  <span className="st-modal-info-value">****4321</span>
                </div>
                <div className="st-modal-info-item">
                  <span className="st-modal-info-label">IFSC</span>
                  <span className="st-modal-info-value">HDFC0001234</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="st-modal-divider" />

        {/* Footer actions */}
        <div className="st-modal-footer">
          {/* Approved state → Download Summary */}
          {isApproved && (
            <button className="st-btn-download">
              <DownloadIcon />
              Download Summary
            </button>
          )}

          {/* Rejected state → Cancel + Approved */}
          {isRejected && (
            <>
              <button className="st-btn-cancel" onClick={onClose}>Cancel</button>
              <button className="st-btn-approve" onClick={() => setShowApproveConfirm(true)}>
                Approved
              </button>
            </>
          )}

          {/* Requested state → Cancel + Reject + Approved */}
          {isRequested && (
            <>
              <button className="st-btn-cancel" onClick={onClose}>Cancel</button>
              <button className="st-btn-reject" onClick={() => setShowRejectConfirm(true)}>
                Reject
              </button>
              <button className="st-btn-approve" onClick={() => setShowApproveConfirm(true)}>
                Approved
              </button>
            </>
          )}
        </div>

      </div>

      {/* Confirm Approval Modal */}
      {showApproveConfirm && (
        <ConfirmApprovalModal
          onClose={() => setShowApproveConfirm(false)}
          onConfirm={() => { onApprove(row.id); setShowApproveConfirm(false); onClose(); }}
        />
      )}

      {/* Reject Settlement Modal */}
      {showRejectConfirm && (
        <RejectSettlementModal
          onClose={() => setShowRejectConfirm(false)}
          onConfirm={() => { onReject(row.id); setShowRejectConfirm(false); onClose(); }}
        />
      )}

    </div>
  );
}

/* ══════════════════════════════════════════
   Main page
══════════════════════════════════════════ */
export default function Settlements() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState(SETTLEMENTS);

  const filtered = data.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.instId.toLowerCase().includes(search.toLowerCase()) ||
    s.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id) =>
    setData((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Approved' } : r));

  const handleReject = (id) =>
    setData((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Rejected' } : r));

  return (
    <div className="st-page">

      {/* ── Page header ── */}
      <div className="st-page-header">
        <h1 className="st-page-title">Settlements</h1>
        <span className="st-breadcrumb">Settlements</span>
      </div>

      {/* ── Body ── */}
      <div className="st-body">

        {/* Toolbar */}
        <div className="st-toolbar">
          <h2 className="st-section-title">Instructor Payment Settlement List</h2>
          <div className="st-toolbar-actions">
            <div className="st-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="st-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="st-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* ── Table card ── */}
        <div className="st-table-card">
          <div className="st-table-wrapper">
            <table className="st-table">
              <thead>
                <tr>
                  <th>Instructor Name</th>
                  <th>Instructor ID</th>
                  <th>Month</th>
                  <th>Total Earning</th>
                  <th>Instructor Amount 70%</th>
                  <th>Admin Share 30%</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((row) => (
                    <tr key={row.id}>
                      <td className="st-td-name">{row.name}</td>
                      <td>{row.instId}</td>
                      <td>{row.month}</td>
                      <td>{row.total}</td>
                      <td>{row.instructor}</td>
                      <td>{row.admin}</td>
                      <td><StatusBadge status={row.status} /></td>
                      <td>
                        <button
                          className="st-action-btn"
                          title="View"
                          aria-label={`View ${row.name}`}
                          onClick={() => setSelectedRow(row)}
                        >
                          <EyeIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="st-empty">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="st-pagination">
            <button
              className="st-page-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className="st-page-numbers">
              {[1, 2, 3].map((n) => (
                <button key={n}
                  className={`st-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}>{n}</button>
              ))}
              <span className="st-page-ellipsis">...</span>
              {[8, 9, 10].map((n) => (
                <button key={n}
                  className={`st-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}>{n}</button>
              ))}
            </div>
            <button
              className="st-page-next"
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
            >
              Next →
            </button>
          </div>
        </div>

      </div>

      {/* ── Settlement Details Modal ── */}
      {selectedRow && (
        <SettlementModal
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

    </div>
  );
}
