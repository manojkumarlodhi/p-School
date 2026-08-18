import { useState } from 'react';
import './individualassignments.css';
import { useNavigate, useParams } from 'react-router-dom';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
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

export default function IndividualAssignmentView() {
  const { assignmentId, submissionId } = useParams();
  const navigate = useNavigate();
  const [marks, setMarks] = useState('92');
  const [feedback, setFeedback] = useState('');

  function goBack() {
    navigate(`/instructor/individual/dashboard/assignments/${assignmentId}`);
  }

  function handleSave() {
    console.log('Saving grade:', { marks, feedback });
    goBack();
  }

  return (
    <div className="iav-page">
      {/* Header */}
      <div className="iav-page-header">
        <div className="iav-page-header-left">
          <button className="iav-back-btn" onClick={goBack}><BackIcon /></button>
          <div>
            <h1 className="iav-page-title">Assignment View</h1>
            <p className="iav-breadcrumb">Home / Assignments / View Submission</p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="iav-layout">
        {/* Left: submission details */}
        <div className="iav-left">
          <div className="iav-card">
            <h2 className="iav-title">Coding Worksheet 01</h2>
            <p className="iav-date">Feb 14, 2026</p>

            <div className="iav-section-title">File Details</div>
            <div className="iav-detail-list">
              <div className="iav-detail-row">
                <span className="iav-detail-key">File name</span>
                <span className="iav-detail-val">StudentSubmission_BST.pdf</span>
              </div>
              <div className="iav-detail-row">
                <span className="iav-detail-key">File Size</span>
                <span className="iav-detail-val">2.4 MB</span>
              </div>
              <div className="iav-detail-row">
                <span className="iav-detail-key">Upload Time</span>
                <span className="iav-detail-val">Feb 14, 2026 · 10:30 AM</span>
              </div>
            </div>

            <div className="iav-section-title" style={{ marginTop: 20 }}>Submitted Files</div>
            <div className="iav-file-meta">PDF · 2.4 MB</div>
            <div className="iav-file-row">
              <div className="iav-file-icon"><FileIcon /></div>
              <span className="iav-file-name">BST_Template.zip</span>
              <button className="iav-file-dl"><DownloadIcon /></button>
            </div>
          </div>
        </div>

        {/* Right: grade submission */}
        <div className="iav-right">
          <div className="iav-card">
            <div className="iav-section-title">Grade Submission</div>

            <div className="iav-field">
              <label className="iav-label">Marks (Out of 100)</label>
              <input className="iav-input" value={marks}
                onChange={e => setMarks(e.target.value)} placeholder="0" />
            </div>

            <div className="iav-field">
              <label className="iav-label">Feedback</label>
              <textarea className="iav-textarea"
                placeholder="Provide constructive feedback to the student..."
                value={feedback} onChange={e => setFeedback(e.target.value)} />
            </div>

            <div className="iav-actions">
              <button className="iav-btn-cancel" onClick={goBack}>Cancel</button>
              <button className="iav-btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
