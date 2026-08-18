import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

const ApprovedIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width:'100%', maxWidth:200, height:'auto' }}>
    <text x="20"  y="50"  fontSize="16" fill="#22c55e">✦</text>
    <text x="160" y="40"  fontSize="12" fill="#22c55e">✦</text>
    <text x="170" y="90"  fontSize="10" fill="#22c55e">✦</text>
    <text x="15"  y="130" fontSize="10" fill="#22c55e">✦</text>
    <text x="155" y="155" fontSize="14" fill="#22c55e">✦</text>
    <text x="30"  y="165" fontSize="10" fill="#22c55e">✦</text>
    <text x="80"  y="25"  fontSize="10" fill="#22c55e">✦</text>
    <text x="130" y="170" fontSize="10" fill="#22c55e">✦</text>
    {/* Badge */}
    <circle cx="100" cy="100" r="52" fill="#22c55e"/>
    <circle cx="100" cy="100" r="44" fill="#16a34a"/>
    <path d="M78 100 L92 114 L122 84"
      stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function IndividualInstructorApproved() {
  const navigate = useNavigate();

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">You're Approved!</h2>
        <p className="inauth-brand-sub">
          Congratulations! You can now create courses, manage students, and start earning on P-SCHOOL.
        </p>
      </div>

      <div className="inauth-right">
        <div className="inauth-form-inner" style={{ textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center', margin:'20px 0 28px' }}>
            <ApprovedIllustration />
          </div>

          <h1 style={{ fontSize:26, fontWeight:800, color:'#22c55e', margin:'0 0 8px' }}>
            You're approved!
          </h1>
          <p style={{ fontSize:15, fontWeight:600, color:'#1ba8d5', margin:'0 0 6px' }}>
            Welcome, Alex.
          </p>
          <p style={{ fontSize:14, color:'#6b7280', margin:'0 0 36px', lineHeight:1.5 }}>
            Your application has been approved! You're now ready to create courses and start earning on P-SCHOOL.
          </p>

          <button className="inauth-btn"
            onClick={() => navigate('/instructor/individual/dashboard')}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
