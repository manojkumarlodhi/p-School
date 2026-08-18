import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorlist.css';

const INSTRUCTORS = Array.from({ length: 9 }, (_, i) => ({
  id: 'INS001',
  name: 'Dr. Kwame Mensah',
  state: i === 3 ? 'Suspended' : 'Verified',
  country: 'India',
  courses: 8,
  rating: 4.6,
  revenue: '1,240,000 FCFA',
  status: true,
}));

export default function InstructorList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = INSTRUCTORS.filter((ins) =>
    ins.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ins-page">

      {/* ── Page header ── */}
      <div className="ins-page-header">
        <h1 className="ins-page-title">Instructors</h1>
        <span className="ins-breadcrumb">User Management &rsaquo; Instructors</span>
      </div>

      <div className="ins-body">
        <div className="ins-table-card">

          {/* Toolbar */}
          <div className="ins-toolbar">
            <h2 className="ins-table-title">Instructors List</h2>
            <div className="ins-toolbar-actions">
              {/* Search */}
              <div className="ins-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="ins-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filters */}
              <button className="ins-filter-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>

              {/* Add */}
              <button
                className="ins-add-btn"
                onClick={() => navigate('/dashboard/instructors/add')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Instructor
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="ins-table-wrap">
            <table className="ins-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Current State</th>
                  <th>Country</th>
                  <th>Courses Created</th>
                  <th>Avg Rating</th>
                  <th>Revenue Share (YTD)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ins, i) => (
                  <tr key={i}>
                    <td className="ins-id">{ins.id}</td>

                    {/* Name + avatar */}
                    <td>
                      <div className="ins-name-cell">
                        <div className="ins-avatar">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="#6b7280" strokeWidth={1.8}>
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <span className="ins-name">{ins.name}</span>
                      </div>
                    </td>

                    {/* State badge */}
                    <td>
                      <span className={`ins-state-badge ${ins.state.toLowerCase()}`}>
                        {ins.state}
                      </span>
                    </td>

                    <td>{ins.country}</td>
                    <td>{ins.courses}</td>
                    <td>{ins.rating}</td>
                    <td>{ins.revenue}</td>

                    {/* Toggle */}
                    <td>
                      <label className="ins-toggle">
                        <input type="checkbox" defaultChecked={ins.status} />
                        <span className="ins-toggle-slider" />
                      </label>
                    </td>

                    {/* Action — eye + settings */}
                    <td>
                      <div className="ins-action-group">
                        <button
                          className="ins-action-btn"
                          aria-label="View details"
                          onClick={() => navigate(`/dashboard/instructors/${ins.id}-${i}`)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          className="ins-action-btn"
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
          <div className="ins-pagination">
            <button className="ins-page-btn" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </button>

            <div className="ins-page-numbers">
              {[1, 2, 3].map((n) => (
                <button key={n} className={`ins-page-num${n === 1 ? ' active' : ''}`}>
                  {n}
                </button>
              ))}
              <span className="ins-page-dots">...</span>
              {[8, 9, 10].map((n) => (
                <button key={n} className="ins-page-num">{n}</button>
              ))}
            </div>

            <button className="ins-page-btn">
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
