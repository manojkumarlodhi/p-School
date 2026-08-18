import { useState } from 'react';
import './courseverification.css';

/* ── Category tabs ── */
const CATEGORY_TABS = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

/* ── Table data ── */
const ALL_COURSES = [
  {
    id: 1,
    courseName: 'Java Full Stack',
    ownerName: 'Placement Adda',
    createdBy: 'Institute',
    category: 'Coding',
    level: 'Beginner',
    status: 'Approved',
    ageGroup: '8-12',
  },
  {
    id: 2,
    courseName: 'Java Full Stack',
    ownerName: 'Placement Adda',
    createdBy: 'Institute',
    category: 'Electronic',
    level: 'Intermediate',
    status: 'Requested',
    ageGroup: '13-15',
  },
  {
    id: 3,
    courseName: 'Java Full Stack',
    ownerName: 'Abhay Thakur',
    createdBy: 'Individual Instructor',
    category: 'Electronic',
    level: 'Advanced',
    status: 'Rejected',
    ageGroup: '13-15',
  },
  {
    id: 4,
    courseName: 'Java Full Stack',
    ownerName: 'Abhay Thakur',
    createdBy: 'Individual Instructor',
    category: 'Electronic',
    level: 'Expert',
    status: 'Requested',
    ageGroup: '13-15',
  },
];

/* ── Pagination config ── */
const TOTAL_PAGES = 10;
const PAGE_DISPLAY = [1, 2, 3, 8, 9, 10]; // pages shown (with ellipsis between 3 and 8)

/* ── Status badge helper ── */
function StatusBadge({ status }) {
  const cls =
    status === 'Approved'
      ? 'cv2-badge cv2-badge-approved'
      : status === 'Rejected'
      ? 'cv2-badge cv2-badge-rejected'
      : 'cv2-badge cv2-badge-requested';
  return <span className={cls}>{status}</span>;
}

/* ── Eye icon ── */
function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Search icon ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

/* ── Filter icon ── */
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

/* ── Plus icon ── */
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   Main component
══════════════════════════════════════════════ */
export default function CourseVerification() {
  const [activeCategory, setActiveCategory] = useState('Coding');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* Filter rows by search */
  const filtered = ALL_COURSES.filter((row) => {
    const q = search.toLowerCase();
    return (
      row.courseName.toLowerCase().includes(q) ||
      row.ownerName.toLowerCase().includes(q) ||
      row.createdBy.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="cv2-page">

      {/* ── Page header ── */}
      <div className="cv2-page-header">
        <h1 className="cv2-page-title">Instructor Created Courses</h1>
        <span className="cv2-breadcrumb">Instructor list</span>
      </div>

      {/* ── Category tabs ── */}
      <div className="cv2-category-tabs" role="tablist" aria-label="Course categories">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`cv2-cat-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="cv2-body">

        {/* Toolbar */}
        <div className="cv2-toolbar">
          <h2 className="cv2-section-title">Created Course By Institute &amp; Instructor</h2>
          <div className="cv2-toolbar-actions">
            {/* Search */}
            <div className="cv2-search">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="cv2-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search courses"
              />
            </div>

            {/* Filters */}
            <button className="cv2-filter-btn" aria-label="Open filters">
              <FilterIcon />
              Filters
            </button>

            {/* Add New Instructor */}
            <button className="cv2-add-btn">
              <PlusIcon />
              + Add New Instructor
            </button>
          </div>
        </div>

        {/* ── Table card ── */}
        <div className="cv2-table-card">
          <div className="cv2-table-wrapper">
            <table className="cv2-table" aria-label="Instructor created courses">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Owner Name</th>
                  <th>Created By</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Age Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((row) => (
                    <tr key={row.id}>
                      <td className="cv2-course-name">{row.courseName}</td>
                      <td>{row.ownerName}</td>
                      <td>{row.createdBy}</td>
                      <td>{row.category}</td>
                      <td>{row.level}</td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>{row.ageGroup}</td>
                      <td>
                        <button
                          className="cv2-action-btn"
                          aria-label={`View ${row.courseName}`}
                          title="View"
                        >
                          <EyeIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', color: '#9ca3af', padding: '32px 16px' }}>
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="cv2-pagination" role="navigation" aria-label="Pagination">
            {/* Previous */}
            <button
              className="cv2-page-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Previous
            </button>

            {/* Page numbers */}
            <div className="cv2-page-numbers">
              {/* Pages 1, 2, 3 */}
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`cv2-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={currentPage === n ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}

              {/* Ellipsis */}
              <span className="cv2-page-ellipsis" aria-hidden="true">...</span>

              {/* Pages 8, 9, 10 */}
              {[8, 9, 10].map((n) => (
                <button
                  key={n}
                  className={`cv2-page-num${currentPage === n ? ' active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={currentPage === n ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              className="cv2-page-next"
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
