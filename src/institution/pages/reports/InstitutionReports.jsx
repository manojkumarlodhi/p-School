import { useNavigate } from 'react-router-dom';
import './institutionreports.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const CodeIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>);
const ArrowRight = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
const WarnIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);

const REPORTS = [
  { title: 'Student Progress Report',   desc: 'Track course completion and learning progress',      comingSoon: false },
  { title: 'Instructor Activity Report', desc: 'Monitor instructor engagement and class activity',   comingSoon: false },
  { title: 'Course Completion Report',  desc: 'Analyze course-wise completion rates',               comingSoon: false },
  { title: 'Lab Usage Report',          desc: 'View lab engagement and simulator usage',            comingSoon: false },
  { title: 'Attendance Report',         desc: 'Coming soon',                                        comingSoon: true  },
];

export default function InstitutionReports() {
  const navigate = useNavigate();

  return (
    <div className="irpt-page">
      <div className="irpt-page-header">
        <button className="irpt-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Reports</span>
        </button>
        <span className="irpt-breadcrumb">Reports</span>
      </div>

      <div className="irpt-body">

        {/* Report cards grid */}
        <div className="irpt-grid">
          {REPORTS.map((r, i) => (
            <div key={i} className="irpt-card">
              <div className="irpt-card-icon"><CodeIcon /></div>
              <h3 className="irpt-card-title">{r.title}</h3>
              <p className="irpt-card-desc">{r.desc}</p>
              <button className="irpt-view-btn"
                onClick={() => navigate('/institution/dashboard/reports/view')}>
                View Reports <ArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* Info notice */}
        <div className="irpt-notice">
          <WarnIcon />
          <div>
            <div className="irpt-notice-title">Report for: Admin (Product / Leadership)</div>
            <div className="irpt-notice-desc">
              All reports are generated in real-time and reflect the latest data from your platform.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
