import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionroles.css';

const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const WarnIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const ChevronDown = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>);
const ChevronUp = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>);

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button type="button" className={`irl-toggle${checked ? ' irl-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}>
      <span className="irl-toggle-thumb" />
    </button>
  );
}

/* ── Permission sections ── */
const PERMISSION_SECTIONS = [
  {
    title: 'Student Management',
    perms: ['View Students', 'Add / Edit Students', 'Delete Students'],
    defaults: [true, true, false],
  },
  {
    title: 'Instructor Management',
    perms: ['View Students', 'Add / Edit Students', 'Delete Students'],
    defaults: [true, true, false],
  },
  {
    title: 'Class Management',
    perms: ['View Classes', 'Create / Edit Classes', 'Delete Classes'],
    defaults: [true, false, false],
  },
  {
    title: 'Course Management',
    perms: ['View Courses', 'Create / Edit Courses', 'Delete Courses'],
    defaults: [true, false, false],
  },
];

/* ── Accordion section ── */
function PermSection({ section, perms, onChange }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="irl-perm-section">
      <button type="button" className="irl-perm-section-header"
        onClick={() => setOpen(o => !o)}>
        <span className="irl-perm-section-title">{section.title}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="irl-perm-table">
          <div className="irl-perm-table-header">
            <span>Permission</span>
            <span>Status</span>
          </div>
          {section.perms.map((perm, i) => (
            <div key={perm} className="irl-perm-row">
              <span className="irl-perm-name">{perm}</span>
              <Toggle
                checked={perms[i]}
                onChange={v => onChange(i, v)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InstitutionViewPermissions() {
  const navigate = useNavigate();

  // State: array of arrays matching PERMISSION_SECTIONS
  const [perms, setPerms] = useState(
    PERMISSION_SECTIONS.map(s => [...s.defaults])
  );

  function setPermValue(sectionIdx, permIdx, val) {
    setPerms(prev => prev.map((s, si) =>
      si === sectionIdx ? s.map((p, pi) => pi === permIdx ? val : p) : s
    ));
  }

  return (
    <div className="irl-page">
      <div className="irl-page-header">
        <button className="irl-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Academic Coordinator</span>
        </button>
        <span className="irl-breadcrumb">Role Management &rsaquo; Permissions</span>
      </div>

      <div className="irl-body">

        {/* Info notice */}
        <div className="irl-info-notice">
          <WarnIcon />
          <span>
            <strong>Info Text:</strong> An invitation email will be sent to the instructor to complete onboarding.
          </span>
        </div>

        {/* Permission sections */}
        <div className="irl-perms-card">
          {PERMISSION_SECTIONS.map((section, si) => (
            <PermSection
              key={section.title}
              section={section}
              perms={perms[si]}
              onChange={(pi, val) => setPermValue(si, pi, val)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
