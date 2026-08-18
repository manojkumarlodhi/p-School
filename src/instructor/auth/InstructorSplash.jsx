import { useNavigate } from 'react-router-dom';
import mobile1 from '../../assets/images/mobile1.png';
import mobile2 from '../../assets/images/mobile2.png';
import mobile3 from '../../assets/images/mobile3.png';
import './instructorauth.css';

export default function InstructorSplash() {
  const navigate = useNavigate();
  return (
    <div className="inauth-page">
      {/* Left — photo collage */}
      <div className="inauth-left">
        <div className="inauth-splash-images">
          <div className="inauth-splash-img-wrap"><img src={mobile1} alt="Learning" /></div>
          <div className="inauth-splash-img-wrap"><img src={mobile2} alt="Teaching" /></div>
          <div className="inauth-splash-img-wrap"><img src={mobile3} alt="Innovation" /></div>
          <div className="inauth-splash-connector" />
        </div>
        <div className="inauth-splash-bottom">
          <h1 className="inauth-splash-title">
            Where <span className="yellow">Learning</span>,{' '}
            <span className="blue">Teaching</span> &amp; Innovation Come Together
          </h1>
          <div className="inauth-splash-tags">
            <span className="inauth-splash-tag">STEM Courses</span>
            <span className="inauth-splash-tag">Virtual Labs</span>
            <span className="inauth-splash-tag">Smart Progress</span>
          </div>
        </div>
      </div>

      {/* Right — CTA */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <h1 className="inauth-form-title">Welcome to P-School</h1>
          <p className="inauth-form-sub">
            The all-in-one platform for instructors to manage classes, assignments, and virtual labs.
          </p>
          <button className="inauth-btn" onClick={() => navigate('/instructor/login')}>
            Get Started
          </button>
          <div className="inauth-footer" style={{ marginTop: 20 }}>
            Already have an account?{' '}
            <button className="inauth-link" onClick={() => navigate('/instructor/login')}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
