import { useNavigate } from 'react-router-dom';
import './institutionreports.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);

export default function InstitutionReportView() {
  const navigate = useNavigate();

  return (
    <div className="irpt-page">
      <div className="irpt-page-header">
        <button className="irpt-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Reports</span>
        </button>
        <span className="irpt-breadcrumb">Reports &rsaquo; Reports View</span>
      </div>

      <div className="irpt-body">
        <div className="irpt-view-card">
          {/* Coming Soon illustration */}
          <div className="irpt-coming-soon">
            <div className="irpt-cs-graphic">
              <div className="irpt-cs-bubble irpt-cs-bubble--dark">
                <span className="irpt-cs-line1">COMING</span>
                <span className="irpt-cs-line2">SOON</span>
              </div>
              <div className="irpt-cs-stripe irpt-cs-stripe--top" />
              <div className="irpt-cs-stripe irpt-cs-stripe--bottom" />
            </div>
            <p className="irpt-cs-label">No Content Yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
