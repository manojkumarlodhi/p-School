import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import starwoodImg from '../../../../assets/images/starwoodAcadmey.png';
import './institutionlist.css';

const INSTITUTIONS = Array.from({ length: 9 }, (_, i) => ({
  id: 'INS001',
  name: 'Starwood Academy',
  country: 'India',
  plan: i === 4 || i === 7 ? '30-day trial' : i % 3 === 0 ? 'Monthly' : i % 3 === 1 ? 'Annual' : 'Lifetime',
  badge: i === 4 || i === 7 ? null : 'Premium',
  renewalDate: '28 Feb 2026',
  status: true,
}));

export default function InstitutionList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = INSTITUTIONS.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inst-page">

      {/* ── Page header ── */}
      <div className="inst-page-header">
        <h1 className="inst-page-title">Institutions</h1>
        <span className="inst-breadcrumb">User Management &rsaquo; Institutions</span>
      </div>

      <div className="inst-body">
        <div className="inst-table-card">

          {/* Toolbar */}
          <div className="inst-toolbar">
            <h2 className="inst-table-title">Institutions List</h2>
            <div className="inst-toolbar-actions">
              {/* Search */}
              <div className="inst-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="inst-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filters */}
              <button className="inst-filter-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>

              {/* Add */}
              <button
                className="inst-add-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Institute
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="inst-table-wrap">
            <table className="inst-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Institution Name</th>
                  <th>Country</th>
                  <th>Subscription Plan</th>
                  <th>Renewal Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inst, i) => (
                  <tr key={i}>
                    <td className="inst-id">{inst.id}</td>

                    {/* Name + logo image */}
                    <td>
                      <div className="inst-name-cell">
                        <img
                          src={starwoodImg}
                          alt="Starwood Academy"
                          className="inst-logo-img"
                        />
                        <span className="inst-name">{inst.name}</span>
                      </div>
                    </td>

                    <td>{inst.country}</td>

                    {/* Subscription plan + badge */}
                    <td>
                      <div className="inst-plan-cell">
                        <span>{inst.plan}</span>
                        {inst.badge && (
                          <span className="inst-plan-badge">{inst.badge}</span>
                        )}
                      </div>
                    </td>

                    <td>{inst.renewalDate}</td>

                    {/* Toggle */}
                    <td>
                      <label className="inst-toggle">
                        <input type="checkbox" defaultChecked={inst.status} />
                        <span className="inst-toggle-slider" />
                      </label>
                    </td>

                    {/* Action — eye + settings */}
                    <td>
                      <div className="inst-action-group">
                        <button
                          className="inst-action-btn"
                          aria-label="View details"
                          onClick={() => navigate(`/dashboard/institutions/${inst.id}-${i}`)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          className="inst-action-btn"
                          aria-label="Settings"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83
                                     2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33
                                     1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0
                                     009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83
                                     -2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51
                                     -1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0
                                     00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65
                                     0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65
                                     1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0
                                     012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0
                                     001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
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
          <div className="inst-pagination">
            <button className="inst-page-btn" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </button>

            <div className="inst-page-numbers">
              {[1, 2, 3].map((n) => (
                <button key={n} className={`inst-page-num${n === 1 ? ' active' : ''}`}>
                  {n}
                </button>
              ))}
              <span className="inst-page-dots">...</span>
              {[8, 9, 10].map((n) => (
                <button key={n} className="inst-page-num">{n}</button>
              ))}
            </div>

            <button className="inst-page-btn">
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
