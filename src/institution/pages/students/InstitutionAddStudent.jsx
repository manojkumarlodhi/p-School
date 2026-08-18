import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './institutionstudents.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2.5} strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const UploadCloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
  </svg>
);

const CATEGORIES = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

export default function InstitutionAddStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);
  const csvRef = useRef(null);

  const isBulkRoute = location.pathname.includes('bulk-upload');
  const [tab, setTab] = useState(isBulkRoute ? 'bulk' : 'single');
  const [photo, setPhoto] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [form, setForm] = useState({
    fullName: 'Aarav Patel',
    email: '',
    phone: '',
    dob: '11/02/2000',
    categories: ['Coding', 'Electronics', 'Mechanics'],
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function toggleCat(cat) {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter(c => c !== cat)
        : [...f.categories, cat],
    }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  }

  function handleCsvChange(e) {
    const file = e.target.files?.[0];
    if (file) setCsvFile(file.name);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setCsvFile(file.name);
  }

  function handleSave(e) {
    e.preventDefault();
    navigate('/institution/dashboard/students');
  }

  return (
    <div className="ist-page">

      {/* ── Page header ── */}
      <div className="ist-page-header">
        <button className="ist-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>{isBulkRoute ? 'Bulk Upload Students' : 'Add New Student'}</span>
        </button>
        <span className="ist-breadcrumb">Student &rsaquo; Add Student</span>
      </div>

      <div className="ist-add-body">

        {/* ── Tabs ── */}
        <div className="ist-tabs">
          <button
            className={`ist-tab${tab === 'bulk' ? ' active' : ''}`}
            onClick={() => setTab('bulk')}
          >Bulk</button>
          <button
            className={`ist-tab${tab === 'single' ? ' active' : ''}`}
            onClick={() => setTab('single')}
          >Single Student</button>
        </div>

        <div className="ist-add-card">
          <form onSubmit={handleSave}>

            {/* ════ BULK TAB ════ */}
            {tab === 'bulk' && (
              <div className="ist-bulk-section">
                <h3 className="ist-bulk-title">Upload CSV</h3>
                <div
                  className={`ist-drop-zone${dragging ? ' dragging' : ''}${csvFile ? ' has-file' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => csvRef.current?.click()}
                >
                  <UploadCloudIcon />
                  {csvFile ? (
                    <p className="ist-drop-filename">{csvFile}</p>
                  ) : (
                    <>
                      <p className="ist-drop-text">
                        <span className="ist-drop-link">Upload a file</span> or drag and drop
                      </p>
                      <p className="ist-drop-hint">CSV files only</p>
                    </>
                  )}
                  <input
                    ref={csvRef}
                    type="file"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={handleCsvChange}
                  />
                </div>

                <div className="ist-form-actions">
                  <button type="button" className="ist-btn-cancel"
                    onClick={() => navigate('/institution/dashboard/students')}>
                    Cancel
                  </button>
                  <button type="submit" className="ist-btn-save">
                    Upload File
                  </button>
                </div>
              </div>
            )}

            {/* ════ SINGLE STUDENT TAB ════ */}
            {tab === 'single' && (
              <div className="ist-single-section">

                {/* Photo upload */}
                <div className="ist-photo-section">
                  <p className="ist-photo-label">Profile Photo Upload (optional)</p>
                  <button
                    type="button"
                    className="ist-photo-btn"
                    onClick={() => fileRef.current?.click()}
                  >
                    {photo
                      ? <img src={photo} alt="profile" className="ist-photo-preview" />
                      : (
                        <div className="ist-photo-placeholder">
                          <PlusIcon />
                          <span>Add Profile</span>
                        </div>
                      )
                    }
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                  />
                </div>

                {/* Form fields */}
                <div className="ist-form-grid">

                  <div className="ist-field">
                    <label className="ist-label">Full Name</label>
                    <input className="ist-input ist-input--active" placeholder="Full Name"
                      value={form.fullName} onChange={set('fullName')} />
                  </div>

                  <div className="ist-field">
                    <label className="ist-label">Email Address</label>
                    <input className="ist-input" type="email" placeholder="Email Address"
                      value={form.email} onChange={set('email')} />
                  </div>

                  <div className="ist-field">
                    <label className="ist-label">Phone Number</label>
                    <input className="ist-input" placeholder="Phone Number"
                      value={form.phone} onChange={set('phone')} />
                  </div>

                  <div className="ist-field">
                    <label className="ist-label">Date Of Birth</label>
                    <input className="ist-input" placeholder="DD/MM/YYYY"
                      value={form.dob} onChange={set('dob')} />
                  </div>

                </div>

                {/* Course categories */}
                <div className="ist-categories-section">
                  <label className="ist-label">
                    Interested Course Categories <span className="ist-required">*</span>
                  </label>
                  <div className="ist-categories-row">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="ist-radio-label">
                        <input
                          type="radio"
                          className="ist-radio"
                          checked={form.categories.includes(cat)}
                          onChange={() => toggleCat(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="ist-form-actions">
                  <button type="button" className="ist-btn-cancel"
                    onClick={() => navigate('/institution/dashboard/students')}>
                    Cancel
                  </button>
                  <button type="submit" className="ist-btn-save">
                    Save Student
                  </button>
                </div>

              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
