import { useState } from 'react';
import './resources.css';
import { useNavigate } from 'react-router-dom';


const UploadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const RESOURCES = [
  { id: 'r1', name: 'Introduction to Python Variables', type: 'Class Notes',        subject: 'Coding',      size: '2.4 MB', format: 'PDF' },
  { id: 'r2', name: 'Robotics Circuit Diagrams',        type: 'Reference Material', subject: 'Robotics',    size: '1.8 MB', format: 'PDF' },
  { id: 'r3', name: 'BST Code Examples',                type: 'Code Examples',      subject: 'Coding',      size: '758 KB', format: 'ZIP' },
  { id: 'r4', name: 'Electronics Assignment Guide',     type: 'Assignment Material',subject: 'Electronics', size: '3.1 MB', format: 'PDF' },
  { id: 'r5', name: 'Mechanics Lab Manual',             type: 'Class Notes',        subject: 'Mechanics',   size: '5.2 MB', format: 'PDF' },
  { id: 'r6', name: 'Python OOP Reference',             type: 'Reference Material', subject: 'Coding',      size: '1.1 MB', format: 'PDF' },
];

const FILTERS = ['All', 'Class Notes', 'Reference Material', 'Code Examples', 'Assignment Material'];

export default function InstructorResources() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = RESOURCES.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || r.type === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="reslist-page">
      <div className="reslist-header">
        <h1 className="reslist-title">Resources</h1>
        <button className="reslist-upload-btn"
          onClick={() => navigate('/instructor/dashboard/resources/upload')}>
          <UploadIcon /> Upload
        </button>
      </div>

      {/* Search */}
      <div className="reslist-search-wrap">
        <span className="reslist-search-icon"><SearchIcon /></span>
        <input
          className="reslist-search"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filter chips */}
      <div className="reslist-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`reslist-filter-chip${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="reslist-empty">
          <p className="reslist-empty-text">No resources found.</p>
          <button className="reslist-empty-btn"
            onClick={() => navigate('/instructor/dashboard/resources/upload')}>
            + Upload Resource
          </button>
        </div>
      ) : (
        <div className="reslist-list">
          {filtered.map(r => (
            <div key={r.id} className="reslist-item">
              <div className="reslist-item-icon"><FileIcon /></div>
              <div className="reslist-item-body">
                <div className="reslist-item-name">{r.name}</div>
                <div className="reslist-item-meta">
                  <span className="reslist-item-type-badge">{r.type}</span>
                  <span>{r.format} â€¢ {r.size}</span>
                  <span>{r.subject}</span>
                </div>
              </div>
              <button className="reslist-item-dl" onClick={e => e.stopPropagation()}>
                <DownloadIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

