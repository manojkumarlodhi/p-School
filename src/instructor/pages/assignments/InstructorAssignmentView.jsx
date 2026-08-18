import { useState } from 'react';
import './assignments.css';
import { useNavigate, useParams } from 'react-router-dom';



const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export default function InstructorAssignmentView() {
  const { classId, assignmentId, submissionId, studentId } = useParams();
  const navigate = useNavigate();
  const [marks, setMarks] = useState('92');
  const [feedback, setFeedback] = useState('');

  function goBack() {
    if (submissionId && classId && assignmentId) {
      navigate(`/instructor/dashboard/classes/${classId}/assignments/${assignmentId}`);
    } else if (studentId && classId) {
      navigate(`/instructor/dashboard/classes/${classId}/students/${studentId}`);
    } else {
      navigate(-1);
    }
  }

  function handleSave() {
    console.log('Saving grade:', { marks, feedback });
    goBack();
  }

  return (
    <div className="asgv-page">
      <div className="asgv-header">
        <button className="asgv-back-btn" onClick={goBack}>
          <BackIcon /> Assignment View
        </button>
      </div>

      <div className="asgv-card">
        {/* Title */}
        <h2 className="asgv-title">Coding Worksheet 01</h2>
        <p className="asgv-date">Feb 14, 2026</p>

        {/* File Details */}
        <div className="asgv-section-title">File Details</div>
        <div className="asgv-detail-row">
          <span className="asgv-detail-key">File name</span>
          <span className="asgv-detail-val">StudentSubmission_BST.pdf</span>
        </div>
        <div className="asgv-detail-row">
          <span className="asgv-detail-key">File Size</span>
          <span className="asgv-detail-val">2.4 MB</span>
        </div>
        <div className="asgv-detail-row">
          <span className="asgv-detail-key">Upload Time</span>
          <span className="asgv-detail-val">Feb 14, 2026 â€¢ 10:30 AM</span>
        </div>

        {/* Submitted Files */}
        <div className="asgv-section-title" style={{ marginTop: 20 }}>Submitted Files</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>PDF â€¢ 2.4 MB</span>
        </div>
        <div className="asgv-file-row">
          <div className="asgv-file-icon"><FileIcon /></div>
          <span className="asgv-file-name">BST_Template.zip</span>
          <button className="asgv-file-dl"><DownloadIcon /></button>
        </div>

        {/* Grade Submission */}
        <div className="asgv-section-title" style={{ marginTop: 20 }}>Grade Submission</div>

        <div className="asgv-field">
          <label className="asgv-label">Marks (Out of 100)</label>
          <input
            className="asgv-input"
            value={marks}
            onChange={e => setMarks(e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="asgv-field">
          <label className="asgv-label">Feedback</label>
          <textarea
            className="asgv-textarea"
            placeholder="Provide constructive feedback to the student..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="asgv-actions">
          <button className="asgv-btn-cancel" onClick={goBack}>Cancel</button>
          <button className="asgv-btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

