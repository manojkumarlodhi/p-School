import { useNavigate } from 'react-router-dom';
import './institutionassignments.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);

export default function InstitutionSubmissionView() {
  const navigate = useNavigate();

  return (
    <div className="iasn-page">
      <div className="iasn-page-header">
        <button className="iasn-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Assignment Details</span>
        </button>
        <span className="iasn-breadcrumb">
          Assignments &rsaquo; Assignments Details &rsaquo; Submission &rsaquo; Submission View
        </span>
      </div>

      <div className="iasn-body">
        <div className="iasn-detail-card">

          <h2 className="iasn-detail-title">Rohan Mehta</h2>

          <h3 className="iasn-section-title" style={{ marginTop: 16 }}>Overview</h3>
          <div className="iasn-meta-row iasn-meta-row--4">
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">Student ID</div>
              <div className="iasn-meta-value">STU001</div>
            </div>
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">Submitted On</div>
              <div className="iasn-meta-value">2024-01-24 10:30 AM</div>
            </div>
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">Institution Name</div>
              <div className="iasn-meta-value">
                <span className="iasn-status iasn-status--submitted">Submitted</span>
              </div>
            </div>
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">Marks Awarded</div>
              <div className="iasn-meta-value">95</div>
            </div>
          </div>

          <div className="iasn-sub-file-header">
            <span className="iasn-section-title">Student Submission File</span>
            <span className="iasn-file-size-label">PDF • 2.4 MB</span>
          </div>
          <div className="iasn-attachments">
            <div className="iasn-attachment-row">
              <div className="iasn-attachment-left">
                <FileIcon />
                <span className="iasn-attachment-name">BST_Template.zip</span>
              </div>
              <button className="iasn-download-btn" aria-label="Download">
                <DownloadIcon />
              </button>
            </div>
          </div>

          <h3 className="iasn-section-title" style={{ marginTop: 20 }}>File Details</h3>
          <div className="iasn-meta-row iasn-meta-row--3">
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">File name</div>
              <div className="iasn-meta-value">StudentSubmission_BST.pdf</div>
            </div>
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">File Size</div>
              <div className="iasn-meta-value">2.4 MB</div>
            </div>
            <div className="iasn-meta-item">
              <div className="iasn-meta-label">Upload Time</div>
              <div className="iasn-meta-value">2024-01-24 10:30 AM</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
