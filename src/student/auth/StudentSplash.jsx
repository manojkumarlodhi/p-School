import { useNavigate } from 'react-router-dom';
import mobile1 from '../../assets/images/mobile1.png';
import mobile2 from '../../assets/images/mobile2.png';
import mobile3 from '../../assets/images/mobile3.png';
import '../../instructor/auth/instructorauth.css';

export default function StudentSplash() {
  const navigate = useNavigate();
  return (
    <div className="inauth-page">
      <div className="inauth-left">
        <div className="inauth-splash-images">
          <div className="inauth-splash-img-wrap"><img src={mobile1} alt="Learning" /></div>
          <div className="inauth-splash-img-wrap"><img src={mobile2} alt="Study" /></div>
          <div className="inauth-splash-img-wrap"><img src={mobile3} alt="Progress" /></div>
          <div className="inauth-splash-connector" />
        </div>
        <div className="inauth-splash-bottom">
          <h1 className="inauth-splash-title">
            <span className="blue">Learn</span>, Explore &amp; Grow with P-School
          </h1>
          <div className="inauth-splash-tags">
            <span className="inauth-splash-tag">STEM Courses</span>
            <span className="inauth-splash-tag">Virtual Labs</span>
            <span className="inauth-splash-tag">Smart Progress</span>
          </div>
        </div>
      </div>
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <h1 className="inauth-form-title">Welcome to P-School</h1>
          <p className="inauth-form-sub">Your journey into STEM learning starts here.</p>
          <button className="inauth-btn" onClick={() => navigate('/student/login')}>Get Started</button>
          <div className="inauth-footer" style={{ marginTop: 20 }}>
            Already have an account?{' '}
            <button className="inauth-link" onClick={() => navigate('/student/login')}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

