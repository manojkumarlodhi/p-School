import { useState, useRef } from 'react';
import './assignments.css';
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

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`inca-toggle${checked ? ' inca-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="inca-toggle-thumb" />
    </button>
  );
}

export default function InstructorCreateAssignment() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    title: '',
    class: '',
    subject: '',
    type: '',
    instructions: '',
    file: null,
    enableLab: false,
    marks: '',
    dueDate: '',
    dueTime: '',
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleFile(f) {
    if (f) set('file', f);
  }

  function handlePublish() {
    console.log('Publishing assignment:', form);
    navigate('/instructor/dashboard/assignments');
  }

  return (
    <div className="inca-page">
      <div className="inca-page-header">
        <button className="inca-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Create Assignment</span>
        </button>
        <span className="inca-breadcrumb">Home / edit Assignment</span>
      </div>

      <div className="inca-card">
        {/* Assignment Title */}
        <div className="inca-field">
          <label className="inca-label">Assignment Title</label>
          <input
            className="inca-input"
            placeholder="e.g., Variables Quiz"
            value={form.title}
            onChange={e => set('title', e.target.value)}
          />
        </div>

        {/* Select Class */}
        <div className="inca-field">
          <label className="inca-label">Select Class</label>
          <div className="inca-select-wrap">
            <select className="inca-select" value={form.class} onChange={e => set('class', e.target.value)}>
              <option value="">Choose a class</option>
              <option>Grade 6B</option>
              <option>Grade 7A</option>
              <option>Grade 8C</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Subject */}
        <div className="inca-field">
          <label className="inca-label">Subject</label>
          <div className="inca-select-wrap">
            <select className="inca-select" value={form.subject} onChange={e => set('subject', e.target.value)}>
              <option value="">Select subject</option>
              <option>Coding</option>
              <option>Robotics</option>
              <option>Electronics</option>
              <option>Mechanics</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Assignment Type */}
        <div className="inca-field">
          <label className="inca-label">Assignment Type</label>
          <div className="inca-select-wrap">
            <select className="inca-select" value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="">Select type</option>
              <option>Quiz</option>
              <option>Project</option>
              <option>Lab</option>
              <option>Homework</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Instructions */}
        <div className="inca-field">
          <label className="inca-label">Instructions</label>
          <textarea
            className="inca-textarea"
            placeholder="Enter detailed instructions for students..."
            value={form.instructions}
            onChange={e => set('instructions', e.target.value)}
          />
        </div>

        {/* Attach Files */}
        <div className="inca-field">
          <label className="inca-label">Attach Files (Optional)</label>
          <div
            className={`inca-drop-zone${dragging ? ' dragging' : ''}${form.file ? ' has-file' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
            onClick={() => fileRef.current?.click()}
          >
            {form.file ? (
              <p className="inca-drop-filename">âœ“ {form.file.name}</p>
            ) : (
              <>
                <p className="inca-drop-title">Upload Files</p>
                <p className="inca-drop-sub">Click to upload or drag and drop</p>
                <button className="inca-drop-btn" type="button">
                  <UploadIcon />
                  Browse Files
                </button>
                <p className="inca-drop-sub" style={{ marginTop: 8 }}>
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
              <p className="inca-selected-files-title">Selected Files (1)</p>
              <div className="inca-file-chip">
                <div className="inca-file-chip-icon"><FileIcon /></div>
                <div className="inca-file-chip-body">
                  <div className="inca-file-chip-name">{form.file.name}</div>
                  <div className="inca-file-chip-size">
                    {form.file.size ? `${(form.file.size / 1024).toFixed(1)} KB` : ''}
                  </div>
                </div>
                <button className="inca-file-chip-remove" onClick={() => set('file', null)}>
                  <CloseIcon />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Enable Lab Task */}
        <div className="inca-toggle-row">
          <div>
            <div className="inca-toggle-label">Enable Lab Task</div>
            <div className="inca-toggle-sub">Students will complete this in virtual lab</div>
          </div>
          <Toggle checked={form.enableLab} onChange={v => set('enableLab', v)} />
        </div>

        {/* Total Marks */}
        <div className="inca-field">
          <label className="inca-label">Total Marks</label>
          <input
            className="inca-input"
            placeholder="100"
            value={form.marks}
            onChange={e => set('marks', e.target.value)}
          />
        </div>

        {/* Due Date & Time */}
        <div className="inca-date-row">
          <div className="inca-field">
            <label className="inca-label">Due Date</label>
            <input
              className="inca-input"
              type="date"
              placeholder="mm/dd/yyyy"
              value={form.dueDate}
              onChange={e => set('dueDate', e.target.value)}
            />
          </div>
          <div className="inca-field">
            <label className="inca-label">Due Time</label>
            <input
              className="inca-input"
              type="time"
              placeholder="--:--:--"
              value={form.dueTime}
              onChange={e => set('dueTime', e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="inca-actions">
          <button className="inca-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="inca-btn-publish" onClick={handlePublish}>
            Publish Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

