import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    desc: 'Select the role that best describes you',
    comingSoon: false,
  },
  {
    id: 'instructor',
    label: 'Individual Instructor',
    desc: 'Select the role that best describes you',
    comingSoon: false,
  },
  {
    id: 'parent',
    label: 'Parent',
    desc: 'Select the role that best describes you',
    comingSoon: true,
  },
];

export default function InstructorChooseRole() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('student');

  function handleContinue() {
    if (selected === 'student') navigate('/student/register');      // Student → Create account
    else if (selected === 'instructor') navigate('/instructor/individual/register'); // Individual Instructor
    else navigate('/instructor/login');
  }

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Who are you?</h2>
        <p className="inauth-brand-sub">
          Select your role so we can personalise your P-School experience.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">Students</span>
          <span className="inauth-brand-tag">Instructors</span>
          <span className="inauth-brand-tag">Parents</span>
        </div>
      </div>

      {/* Right — role picker */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <h1 className="inauth-form-title">Choose your role</h1>
          <p className="inauth-form-sub">Select the role that best describes you</p>

          <div className="inauth-role-list">
            {ROLES.map(role => (
              <button
                key={role.id}
                type="button"
                className={`inauth-role-item${selected === role.id ? ' selected' : ''}${role.comingSoon ? ' disabled' : ''}`}
                onClick={() => !role.comingSoon && setSelected(role.id)}
                disabled={role.comingSoon}
              >
                <div className="inauth-role-icon">
                  <PersonIcon />
                </div>
                <div className="inauth-role-body">
                  <div className="inauth-role-label">
                    {role.label}
                    {role.comingSoon && (
                      <span className="inauth-role-soon">Coming Soon</span>
                    )}
                  </div>
                  <div className="inauth-role-desc">{role.desc}</div>
                </div>
                <span className={`inauth-lang-radio${selected === role.id ? ' checked' : ''}`} />
              </button>
            ))}
          </div>

          <button
            className="inauth-btn"
            style={{ marginTop: 24 }}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
