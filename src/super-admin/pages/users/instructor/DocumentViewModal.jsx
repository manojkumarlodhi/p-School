import { useEffect } from 'react';
import './documentviewmodal.css';

/* ── Clipboard + document preview SVG ── */
function DocumentPreviewSVG() {
  return (
    <svg
      width="100%"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 8 }}
    >
      {/* Page background */}
      <rect width="600" height="400" fill="#eeede9" rx="8" />

      {/* ── Clipboard board (rotated) ── */}
      <g transform="translate(300,200) rotate(-16) translate(-200,-190)">
        {/* Blue board */}
        <rect x="30" y="40" width="340" height="400" rx="10" fill="#1a3fa8" />
        {/* White paper */}
        <rect x="48" y="72" width="304" height="348" rx="4" fill="#ffffff" />

        {/* Clip top bar */}
        <rect x="158" y="28" width="84" height="26" rx="6" fill="#222" />
        {/* Clip ring */}
        <rect x="174" y="16" width="52" height="48" rx="5" fill="none"
          stroke="#777" strokeWidth="5" />
        {/* Clip inner bar */}
        <rect x="188" y="22" width="24" height="36" rx="3" fill="#b0b0b0" />
        <rect x="192" y="22" width="4"  height="36" rx="2" fill="#d8d8d8" />
        <rect x="200" y="22" width="4"  height="36" rx="2" fill="#d8d8d8" />

        {/* Document heading */}
        <text x="200" y="118" fontSize="10" fontWeight="700" fill="#1e293b"
          textAnchor="middle" fontFamily="Georgia, serif">
          Dealer/Sub-Dealer Agreement Form
        </text>
        <line x1="65" y1="122" x2="335" y2="122" stroke="#374151" strokeWidth="0.7" />
        <text x="200" y="138" fontSize="8.5" fill="#6b7280" textAnchor="middle"
          fontFamily="Georgia, serif">
          Dealership Agreement
        </text>

        {/* Body text lines — left column */}
        {[155,167,179,191,203,215,227,239,251,263,275,287,299,311,323,335,347,359,371,383].map((y, i) => (
          <rect key={`l${i}`} x="65" y={y}
            width={i % 5 === 4 ? 90 : i % 3 === 0 ? 130 : 115}
            height="4.5" rx="2" fill="#d1d5db" />
        ))}

        {/* Body text lines — right column */}
        {[155,167,179,191,203,215,227,239,251,263,275,287,299,311,323,335].map((y, i) => (
          <rect key={`r${i}`} x="215" y={y}
            width={i % 4 === 3 ? 70 : 105}
            height="4.5" rx="2" fill="#d1d5db" />
        ))}
      </g>
    </svg>
  );
}

export default function DocumentViewModal({ doc, onClose }) {
  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!doc) return null;

  return (
    <div
      className="dvm-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Document View"
    >
      <div className="dvm-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="dvm-header">
          <h2 className="dvm-title">Document View</h2>
          <button className="dvm-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="dvm-divider" />

        {/* ── Document name + download ── */}
        <div className="dvm-doc-row">
          <h3 className="dvm-doc-name">{doc.name}</h3>
          <button className="dvm-download-btn" aria-label="Download document">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        {/* ── Document preview ── */}
        <div className="dvm-preview">
          <DocumentPreviewSVG />
        </div>

      </div>
    </div>
  );
}
