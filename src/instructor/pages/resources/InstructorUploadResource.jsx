import { useState, useRef } from 'react';
import './resources.css';
import { useNavigate } from 'react-router-dom';


const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function InstructorUploadResource() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: '',
    subject: '',
    description: '',
    file: null,
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleFile(f) {
    if (f) set('file', f);
  }

  function handleUpload() {
    console.log('Uploading resource:', form);
    navigate('/instructor/dashboard/resources');
  }

  return (
    <div className="inres-page">
      <div className="inres-page-header">
        <button className="inres-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Upload Resource</span>
        </button>
        <span className="inres-breadcrumb">Home / Upload Resource</span>
      </div>

      <div className="inres-card">
        {/* Resource Name */}
        <div className="inres-field">
          <label className="inres-label">Resource Name</label>
          <input
            className="inres-input"
            placeholder="e.g., Introduction to Python"
            value={form.name}
            onChange={e => set('name', e.target.value)}
          />
        </div>

        {/* Resource Type */}
        <div className="inres-field">
          <label className="inres-label">Resource Type</label>
          <div className="inres-select-wrap">
            <select className="inres-select" value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="">Select type</option>
              <option>PDF</option>
              <option>Video</option>
              <option>Presentation</option>
              <option>Document</option>
              <option>Zip Archive</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Subject */}
        <div className="inres-field">
          <label className="inres-label">Subject</label>
          <div className="inres-select-wrap">
            <select className="inres-select" value={form.subject} onChange={e => set('subject', e.target.value)}>
              <option value="">Select subject</option>
              <option>Coding</option>
              <option>Robotics</option>
              <option>Electronics</option>
              <option>Mechanics</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Description */}
        <div className="inres-field">
          <label className="inres-label">Description (Optional)</label>
          <textarea
            className="inres-textarea"
            placeholder="Enter a brief description of this resource..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>

        {/* Upload Files */}
        <div className="inres-field">
          <div
            className={`inres-drop-zone${dragging ? ' dragging' : ''}${form.file ? ' has-file' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
            onClick={() => fileRef.current?.click()}
          >
            {form.file ? (
              <p className="inres-drop-filename">âœ“ {form.file.name}</p>
            ) : (
              <>
                <p className="inres-drop-title">Upload Files</p>
                <p className="inres-drop-sub">Click to upload or drag and drop</p>
                <button className="inres-drop-btn" type="button">
                  <UploadIcon />
                  Browse Files
                </button>
                <p className="inres-drop-sub" style={{ marginTop: 8 }}>
                  PDF, DOC, DOCX, ZIP, PPT, PPTX, TXT (Max 25MB)
                </p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files?.[0])}
            />
          </div>

          {form.file && (
            <>
              <p className="inres-selected-files-title">Selected Files (1)</p>
              <div className="inres-file-chip">
                <div className="inres-file-chip-icon"><FileIcon /></div>
                <div className="inres-file-chip-body">
                  <div className="inres-file-chip-name">{form.file.name}</div>
                  <div className="inres-file-chip-size">
                    {form.file.size ? `${(form.file.size / 1024).toFixed(1)} KB` : ''}
                  </div>
                </div>
                <button className="inres-file-chip-remove" onClick={() => set('file', null)}>
                  <CloseIcon />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="inres-actions">
          <button className="inres-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="inres-btn-upload" onClick={handleUpload}>
            Upload Resource
          </button>
        </div>
      </div>
    </div>
  );
}

