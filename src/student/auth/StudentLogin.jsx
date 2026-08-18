import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../instructor/auth/instructorauth.css';

const EyeIcon = ({ open }) => open
  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

const AppleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const GoogleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;

export default function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@school.com');
  const [password, setPassword] = useState('student123');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Validate credentials
    setTimeout(() => {
      if (email === 'student@school.com' && password === 'student123') {
        // Save user session
        localStorage.setItem('user', JSON.stringify({
          email,
          role: 'student',
          isAuthenticated: true,
        }));
        
        setIsLoading(false);
        navigate('/student/dashboard');
      } else {
        // Invalid credentials
        setIsLoading(false);
        setErrors({
          password: 'Invalid email or password. Please check your credentials.',
        });
      }
    }, 1000);
  };

  return (
    <div className="inauth-page">
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">P-School Student</h2>
        <p className="inauth-brand-sub">Access your classes, assignments, and virtual labs.</p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">STEM Courses</span>
          <span className="inauth-brand-tag">Virtual Labs</span>
          <span className="inauth-brand-tag">Smart Progress</span>
        </div>
      </div>
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <h1 className="inauth-form-title">Welcome back</h1>
          <p className="inauth-form-sub">Sign in to your account to continue</p>
          <form onSubmit={handleSubmit}>
            <div className="inauth-field">
              <label className="inauth-label">Email</label>
              <input 
                className={`inauth-input ${errors.email ? 'error' : ''}`}
                type="email" 
                placeholder="Email"
                value={email} 
                onChange={e => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }} 
              />
              {errors.email && <span className="inauth-error">{errors.email}</span>}
            </div>
            <div className="inauth-field">
              <label className="inauth-label">Password</label>
              <div className="inauth-input-wrap">
                <input 
                  className={`inauth-input has-icon ${errors.password ? 'error' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Password" 
                  value={password} 
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }} 
                />
                <button type="button" className="inauth-eye-btn" onClick={() => setShowPwd(v => !v)}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
              {errors.password && <span className="inauth-error">{errors.password}</span>}
            </div>
            <div className="inauth-forgot-link">
              <button type="button" className="inauth-link" onClick={() => navigate('/student/forgot-password')}>
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="inauth-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="inauth-footer" style={{ marginTop: 16 }}>
            <button className="inauth-link" onClick={() => navigate('/student/register')}>Create an account</button>
          </div>
          <div className="inauth-footer-divider">or continue with</div>
          <div className="inauth-social-row">
            <button className="inauth-social-btn"><AppleIcon /> Apple</button>
            <button className="inauth-social-btn"><GoogleIcon /> Google</button>
          </div>
          <div className="inauth-terms-footer">
            <a href="#">Terms &amp; Condition</a> â€¢ <a href="#">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

