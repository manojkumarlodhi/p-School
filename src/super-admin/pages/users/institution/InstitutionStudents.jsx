import { useNavigate, useParams } from 'react-router-dom';
import starwoodLogo from '../../../../assets/images/StarWoodAcadmeyTranningCenterLogo.png';
import './institutionstudents.css';

const STATS = [
  { label: 'Total Student', value: '2000' },
  { label: 'Age 10-14',     value: '400'  },
  { label: 'Age 15-18',     value: '400'  },
  { label: 'Age 19-24',     value: '600'  },
  { label: 'Age 25-34',     value: '600'  },
];

const STUDENTS = Array.from({ length: 6 }, (_, i) => ({
  id: 'STU001',
  name: 'Abhay Thakur',
  role: i === 0 ? 'Child' : i === 2 ? 'Adult' : 'Student',
  institution: i === 2 ? 'Self Enroll' : 'Tech Academy Accra',
  country: 'India',
  ageGroup: i === 0 ? '10-14' : i === 2 ? '25-34' : '15-18',
  status: true,
  subscription: i === 0 || i === 2 ? 'Premium' : 'Standard',
}));

export default function InstitutionStudents() {
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
          User Management &rsaquo; Institutions &rsaquo; Institutions Details &rsaquo; Total Students
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

        {/* ── Stats row ── */}
        <div className="inststu-stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="inststu-stat-card">
              <div className="inststu-stat-label">{s.label}</div>
              <div className="inststu-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Table card ── */}
        <div className="inststu-table-card">
          <div className="inststu-toolbar">
            <h2 className="inststu-table-title">Institutions Student List</h2>
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
                  <th>ID</th><th>Name</th><th>Role</th><th>Institution</th>
                  <th>Country</th><th>Age Group</th><th>Status</th>
                  <th>Subscription</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s, i) => (
                  <tr key={i}>
                    <td className="inststu-id">{s.id}</td>
                    <td>
                      <div className="inststu-name-cell">
                        <div className="inststu-avatar">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#1ba8d5" strokeWidth={2}>
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        {s.name}
                      </div>
                    </td>
                    <td>{s.role}</td>
                    <td>{s.institution}</td>
                    <td>{s.country}</td>
                    <td>{s.ageGroup}</td>
                    <td>
                      <label className="inststu-toggle">
                        <input type="checkbox" defaultChecked={s.status} />
                        <span className="inststu-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <span className={`inststu-badge ${s.subscription.toLowerCase()}`}>
                        {s.subscription}
                      </span>
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
