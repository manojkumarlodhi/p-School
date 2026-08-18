import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './addinstructor.css';

const DOC_TYPES = [
  { id: 'gov-id',    label: 'Government ID',           desc: 'Aadhar card, Pan Card - Client Decision' },
  { id: 'qual',      label: 'Qualification Certificate', desc: 'Aadhar card, Pan Card - Client Decision' },
  { id: 'cv',        label: 'CV/Resume',                desc: 'Aadhar card, Pan Card - Client Decision' },
];

export default function AddInstructor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', dob: '', gender: 'Male',
  });
  const [uploads, setUploads] = useState({});
  const fileRefs = useRef({});

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (docId, file) =>
    setUploads((p) => ({ ...p, [docId]: file }));

  return (
    <div className="add-ins-page">

      {/* ── Page header ── */}
      <div className="add-ins-header">
        <div className="add-ins-header-left">
          <button className="add-ins-back-btn" onClick={() => navigate('/dashboard/instructors')}
            aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="add-ins-title">Add New Instructor</h1>
        </div>
        <span className="add-ins-breadcrumb">
          User Management &rsaquo; Instructors &rsaquo; Add New Instructor
        </span>
      </div>

      {/* ── Card ── */}
      <div className="add-ins-body">
        <div className="add-ins-card">

          {/* Profile photo */}
          <div className="add-ins-section-label">Profile Photo Upload</div>
          <div className="add-ins-profile-upload">
            <div className="add-ins-profile-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#1ba8d5" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Profile</span>
            </div>
          </div>

          {/* Form grid */}
          <div className="add-ins-form-grid">
            <div className="add-ins-form-group">
              <label className="add-ins-label">Full Name</label>
              <input className="add-ins-input" name="fullName" placeholder="Aarav Patel"
                value={form.fullName} onChange={handleChange} />
            </div>
            <div className="add-ins-form-group">
              <label className="add-ins-label">Email Address</label>
              <input className="add-ins-input" name="email" type="email" placeholder="Email Address"
                value={form.email} onChange={handleChange} />
            </div>
            <div className="add-ins-form-group">
              <label className="add-ins-label">Mobile Number</label>
              <input className="add-ins-input" name="mobile" placeholder="Mobile Number"
                value={form.mobile} onChange={handleChange} />
            </div>
            <div className="add-ins-form-group">
              <label className="add-ins-label">Date of Birth</label>
              <input className="add-ins-input" name="dob" placeholder="Date of Birth"
                value={form.dob} onChange={handleChange} />
            </div>
            <div className="add-ins-form-group">
              <label className="add-ins-label">Gender</label>
              <div className="add-ins-select-wrapper">
                <select className="add-ins-input" name="gender" value={form.gender}
                  onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <svg className="add-ins-select-arrow" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Document uploads ── */}
          <div className="add-ins-section-label" style={{ marginTop: 24 }}>Document</div>
          <div className="add-ins-docs-grid">
            {DOC_TYPES.map((docType) => (
              <div key={docType.id} className="add-ins-doc-card">
                <div className="add-ins-doc-card-header">
                  <h4 className="add-ins-doc-card-title">{docType.label}</h4>
                  <p className="add-ins-doc-card-desc">{docType.desc}</p>
                </div>
                <input
                  ref={(el) => (fileRefs.current[docType.id] = el)}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(docType.id, e.target.files[0])}
                />
                <button
                  className={`add-ins-upload-btn ${uploads[docType.id] ? 'uploaded' : ''}`}
                  onClick={() => fileRefs.current[docType.id]?.click()}
                >
                  {uploads[docType.id] ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Uploaded
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <path d="M17 8l-5-5-5 5" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload File
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* ── Actions ── */}
          <div className="add-ins-actions">
            <button className="add-ins-btn-cancel" onClick={() => navigate('/dashboard/instructors')}>
              Cancel
            </button>
            <button className="add-ins-btn-submit">Create & Send Invite</button>
          </div>

        </div>
      </div>
    </div>
  );
}
