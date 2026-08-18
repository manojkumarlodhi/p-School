import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './rolemanagement.css';

/* ── Permission rows ── */
const PERMISSIONS = [
  'Manage Institutions',
  'Manage Courses',
  'View Billing',
  'Access Labs',
  'View Analytics',
  'System Settings',
];

/* ── Role columns ── */
const ROLES = ['Super Admin', 'Institute Admin', 'Instructor', 'Parent', 'Support'];

/* ── Initial toggle state — all ON ── */
function buildInitialState() {
  const state = {};
  PERMISSIONS.forEach((perm) => {
    state[perm] = {};
    ROLES.forEach((role) => {
      state[perm][role] = true;
    });
  });
  return state;
}

/* ── Toggle component ── */
function Toggle({ checked, onChange, label }) {
  return (
    <label className="rm-toggle" aria-label={label}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="rm-toggle-slider" />
    </label>
  );
}

/* ── Pagination ── */
const TOTAL_PAGES = 10;

export default function RoleManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [permissions, setPermissions] = useState(buildInitialState);
  const [currentPage, setCurrentPage] = useState(1);

  const togglePermission = (perm, role) => {
    setPermissions((prev) => ({
      ...prev,
      [perm]: {
        ...prev[perm],
        [role]: !prev[perm][role],
      },
    }));
  };

  const filtered = PERMISSIONS.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rm-page">

      {/* ── Page header ── */}
      <div className="rm-page-header">
        <h1 className="rm-page-title">Role Management</h1>
        <span className="rm-breadcrumb">Role Management</span>
      </div>

      {/* ── Body ── */}
      <div className="rm-body">

        {/* Toolbar */}
        <div className="rm-toolbar">
          <h2 className="rm-section-title">Role Management</h2>
          <div className="rm-toolbar-actions">
            {/* Search */}
            <div className="rm-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="rm-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search permissions"
              />
            </div>

            {/* Filters */}
            <button className="rm-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
            </button>

            {/* Create Role */}
            <button className="rm-create-btn" onClick={() => navigate('/dashboard/role-management/create')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              + Create Role
            </button>
          </div>
        </div>

        {/* ── Permissions table ── */}
        <div className="rm-table-card">
          <div className="rm-table-wrapper">
            <table className="rm-table" aria-label="Role permissions">
              <thead>
                <tr>
                  <th className="rm-th-permission">Permission</th>
                  {ROLES.map((role) => (
                    <th key={role}>{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((perm) => (
                    <tr key={perm}>
                      <td className="rm-td-permission">{perm}</td>
                      {ROLES.map((role) => (
                        <td key={role} className="rm-td-toggle">
                          <Toggle
                            checked={permissions[perm][role]}
                            onChange={() => togglePermission(perm, role)}
                            label={`${perm} - ${role}`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={ROLES.length + 1} className="rm-empty">
                      No permissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="rm-pagination">
            <button
              className="rm-page-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className="rm-page-numbers">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`rm-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
              <span className="rm-page-ellipsis">...</span>
              {[8, 9, 10].map((n) => (
                <button
                  key={n}
                  className={`rm-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              className="rm-page-next"
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
