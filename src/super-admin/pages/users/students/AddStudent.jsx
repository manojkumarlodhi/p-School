import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './addstudent.css';

/* ── Bulk Upload Tab ── */
function BulkTab() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="tab-content">
      <h3 className="upload-label">Upload CSV</h3>
      <div
        className={`drop-zone${dragging ? ' dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current.click()}
        aria-label="Upload CSV file"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="drop-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        {file ? (
          <p className="drop-text"><strong>{file.name}</strong></p>
        ) : (
          <>
            <p className="drop-text">
              <span className="drop-link">Upload a file</span> or drag and drop
            </p>
            <p className="drop-hint">CSV files only</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Single Student Tab ── */
function SingleTab() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', dob: '11/02/2000',
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="tab-content">
      {/* Profile photo */}
      <div className="form-section-label">Profile Photo Upload (optional)</div>
      <div className="profile-upload">
        <div className="profile-upload-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#1ba8d5" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Profile</span>
        </div>
      </div>

      {/* Fields grid */}
      <div className="student-form-grid">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="form-input" name="fullName" placeholder="Aarav Patel"
            value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" name="email" type="email" placeholder="Email Address"
            value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Date Of Birth</label>
          <div className="form-input-wrapper">
            <input className="form-input" name="dob" placeholder="DD/MM/YYYY"
              value={form.dob} onChange={handleChange} />
            <svg className="input-suffix-icon" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="#9ca3af" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function AddStudent() {
  const [tab, setTab] = useState('bulk');
  const navigate = useNavigate();

  return (
    <div className="add-student-page">
      {/* Page header */}
      <div className="inner-page-header">
        <div className="inner-page-title-row">
          <button className="back-btn" onClick={() => navigate('/dashboard/students')} aria-label="Go back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="inner-page-title">Add New Student</h1>
        </div>
        <span className="inner-breadcrumb">Dashboard &rsaquo; Add Student</span>
      </div>

      {/* Card */}
      <div className="inner-card">
        {/* Tabs */}
        <div className="tabs-row">
          <button
            className={`tab-btn${tab === 'bulk' ? ' active' : ''}`}
            onClick={() => setTab('bulk')}
          >
            Bulk
          </button>
          <button
            className={`tab-btn${tab === 'single' ? ' active' : ''}`}
            onClick={() => setTab('single')}
          >
            Single Student
          </button>
        </div>

        {/* Tab content */}
        {tab === 'bulk' ? <BulkTab /> : <SingleTab />}

        {/* Actions */}
        <div className="form-actions">
          <button className="btn-cancel" onClick={() => navigate('/dashboard/students')}>Cancel</button>
          <button className="btn-save">Save Student</button>
        </div>
      </div>
    </div>
  );
}
