import { useNavigate, useParams } from 'react-router-dom';
import starwoodLogo from '../../../../assets/images/StarWoodAcadmeyTranningCenterLogo.png';
import './institutionstudents.css'; /* reuse shared styles */

const INSTRUCTORS = Array.from({ length: 6 }, (_, i) => ({
  id: 'INS001',
  name: 'Dr. Kwame Mensah',
  state: i === 3 ? 'Suspended' : 'Verified',
  country: 'India',
  rating: 4.6,
  status: true,
}));

export default function InstitutionInstructors() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="inststu-page">
      {/* ── Header ── */}
      <div className="inststu-page-header">
        <div className="inststu-header-left">
          <button className="inststu-back-btn"
            onClick={() => navigate(`/dashboard/institutions/${id}`)} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="inststu-page-title">Institutions Student Details</h1>
        </div>
        <span className="inststu-breadcrumb">
          User Management &rsaquo; Institutions &rsaquo; Institutions Details &rsaquo; Total Instructors
        </span>
      </div>

      <div className="inststu-body">
        {/* ── Institution info bar ── */}
        <div className="inststu-info-bar">
          <div className="inststu-info-left">
            <img src={starwoodLogo} alt="Starwood Academy" className="inststu-logo" />
            <div>
              <div className="inststu-inst-name">Starwood Academy</div>
              <div className="inststu-inst-sub">Training Center</div>
            </div>
          </div>
          <div className="inststu-info-mid">
            <div className="inststu-info-item">
              <div className="inststu-info-label">Mobile</div>
              <div className="inststu-info-value">+91 6416845451</div>
            </div>
            <div className="inststu-info-item">
              <div className="inststu-info-label">Email</div>
              <div className="inststu-info-value">Abhay@gmail.com</div>
            </div>
          </div>
          <div className="inststu-plan-card">
            <div className="inststu-plan-label">Current plan</div>
            <div className="inststu-plan-value">Monthly</div>
            <button className="inststu-plan-arrow" aria-label="View plan">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Instructors table ── */}
        <div className="inststu-table-card">
          <div className="inststu-toolbar">
            <h2 className="inststu-table-title">Institute Instructors List</h2>
            <div className="inststu-toolbar-actions">
              <div className="inststu-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Search" className="inststu-search-input" />
              </div>
              <button className="inststu-filter-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          <div className="inststu-table-wrap">
            <table className="inststu-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Current State</th>
                  <th>Country</th><th>Avg Rating</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {INSTRUCTORS.map((ins, i) => (
                  <tr key={i}>
                    <td className="inststu-id">{ins.id}</td>
                    <td>
                      <div className="inststu-name-cell">
                        <div className="inststu-avatar" style={{ background: '#f3f4f6' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#6b7280" strokeWidth={1.8}>
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        {ins.name}
                      </div>
                    </td>
                    <td>
                      <span className={`ins-state-badge ${ins.state.toLowerCase()}`}>
                        {ins.state}
                      </span>
                    </td>
                    <td>{ins.country}</td>
                    <td>{ins.rating}</td>
                    <td>
                      <label className="inststu-toggle">
                        <input type="checkbox" defaultChecked={ins.status} />
                        <span className="inststu-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <div className="inststu-action-group">
                        <button className="inststu-action-btn" aria-label="View">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button className="inststu-action-btn" aria-label="Settings">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="inststu-pagination">
            <button className="inststu-page-btn" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </button>
            <div className="inststu-page-numbers">
              {[1,2,3].map(n => (
                <button key={n} className={`inststu-page-num${n===1?' active':''}`}>{n}</button>
              ))}
              <span className="inststu-page-dots">...</span>
              {[8,9,10].map(n => (
                <button key={n} className="inststu-page-num">{n}</button>
              ))}
            </div>
            <button className="inststu-page-btn">
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
