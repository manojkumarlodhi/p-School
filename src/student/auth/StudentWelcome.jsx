import { useNavigate } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';
import './studentregister.css';

const BENEFITS = [
  'Access to 7-day intro courses',
  'Limited lab credits for hands-on projects',
  'Personalized learning recommendations',
];

const CourseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const LabIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

export default function StudentWelcome() {
  const navigate = useNavigate();

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">You're All Set!</h2>
        <p className="inauth-brand-sub">
          Your P-School account is ready. Start exploring courses, virtual labs, and track your progress.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">STEM Courses</span>
          <span className="inauth-brand-tag">Virtual Labs</span>
          <span className="inauth-brand-tag">Smart Progress</span>
        </div>
      </div>

      {/* Right */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          {/* Welcome header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>
              Welcome!
            </h1>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1ba8d5', margin: '0 0 4px' }}>
              Welcome Aarav
            </p>
            <p style={{ fontSize: 13.5, color: '#6b7280', margin: 0 }}>
              Your learning journey starts now
            </p>
          </div>

          {/* Trial Benefits */}
          <div style={{
            background: '#f9fafb', borderRadius: 14,
            padding: '18px 20px', marginBottom: 24,
            border: '1px solid #f0f2f5',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>
              Your Trial Benefits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BENEFITS.map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#dcfce7', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, fontSize: 12, color: '#16a34a',
                  }}>✓</div>
                  <span style={{ fontSize: 13.5, color: '#374151' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick action cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', border: '1.5px solid #e5e7eb', borderRadius: 12,
              background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
              onClick={() => navigate('/student/dashboard/classes')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1ba8d5' }}>
                  <CourseIcon />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Browse Courses</span>
              </div>
              <ArrowIcon />
            </button>

            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', border: '1.5px solid #e5e7eb', borderRadius: 12,
              background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
              onClick={() => navigate('/student/dashboard/virtuallab')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                  <LabIcon />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Enter Virtual Lab</span>
              </div>
              <ArrowIcon />
            </button>
          </div>

          <button className="inauth-btn"
            onClick={() => navigate('/student/dashboard')}>
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}
