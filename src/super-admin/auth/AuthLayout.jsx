import commonImage from '../../assets/images/CommonLoginImage.png';
import './auth.css';

/**
 * Auth layout — two panels each 711 × 1012 px, centered on a gray page.
 * Left  → white form panel
 * Right → dark navy image panel with robot illustration
 */
export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ── LEFT: form ── */}
        <div className="auth-form-panel">
          <div className="auth-form-inner">
            {children}
          </div>
        </div>

        {/* ── RIGHT: image ── */}
        <div className="auth-image-panel">

          <div className="auth-image-top">
            <h2 className="auth-image-title">
              Built for Modern<br />Education Management
            </h2>
            <p className="auth-image-subtitle">
              P-School enables scalable learning operations with role-based access,
              quality control, and performance tracking across individuals and
              institutions.
            </p>
          </div>

          <img
            src={commonImage}
            alt="Robot hand holding glowing atom — education management"
            className="auth-hero-img"
          />

          <div className="auth-image-footer">
            <svg
              className="auth-image-footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75
                   -4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75
                   0 00-1.06-1.06l-3.97 3.97-1.47-1.47a.75.75 0 00-1.06 1.06l2
                   2a.75.75 0 001.06 0l4.5-4.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="auth-image-footer-text">
              A unified ecosystem designed to manage learning, operations, and
              governance at scale.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
