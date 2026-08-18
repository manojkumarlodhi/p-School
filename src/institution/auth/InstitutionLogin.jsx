import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstitutionAuthLayout from './InstitutionAuthLayout';

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  );
}

export default function InstitutionLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ 
    email: 'institution@school.com', 
    password: 'inst123', 
    remember: false 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validateForm() {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Validate credentials
    setTimeout(() => {
      if (form.email === 'institution@school.com' && form.password === 'inst123') {
        // Save to localStorage if remember me is checked
        if (form.remember) {
          localStorage.setItem('institutionRememberMe', 'true');
          localStorage.setItem('institutionEmail', form.email);
        }
        
        // Save user session
        localStorage.setItem('user', JSON.stringify({
          email: form.email,
          role: 'institution',
          isAuthenticated: true,
        }));
        
        setIsLoading(false);
        navigate('/institution/dashboard');
      } else {
        // Invalid credentials
        setIsLoading(false);
        setErrors({
          password: 'Invalid email or password. Please check your credentials.',
        });
      }
    }, 1000);
  }

  return (
    <InstitutionAuthLayout>
      <div className="inst-auth-form-box">
        <h1 className="inst-auth-heading">Welcome Back, Admin 👋</h1>
        <p className="inst-auth-subheading">Sign in to manage your institution dashboard.</p>

        <form className="inst-auth-form" onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="inst-auth-form-group">
            <label className="inst-auth-label" htmlFor="inst-email">Email Address</label>
            <input 
              id="inst-email" 
              className={`inst-auth-input ${errors.email ? 'error' : ''}`}
              type="email"
              name="email" 
              placeholder="admin@institution.com"
              value={form.email} 
              onChange={handleChange}
              autoComplete="email" 
              required
            />
            {errors.email && <span className="inst-auth-error">{errors.email}</span>}
            {!errors.email && <span className="inst-auth-hint">Use your registered institution email</span>}
          </div>

          {/* Password */}
          <div className="inst-auth-form-group">
            <label className="inst-auth-label" htmlFor="inst-password">Password</label>
            <div className="inst-auth-input-wrap">
              <input 
                id="inst-password" 
                className={`inst-auth-input ${errors.password ? 'error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password" 
                placeholder="••••••••"
                value={form.password} 
                onChange={handleChange}
                autoComplete="current-password" 
                required
              />
              <button type="button" className="inst-auth-eye-btn"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && <span className="inst-auth-error">{errors.password}</span>}
          </div>

          {/* Remember + Forgot */}
          <div className="inst-auth-row">
            <label className="inst-auth-checkbox-label">
              <input type="checkbox" name="remember"
                checked={form.remember} onChange={handleChange}/>
              Remember Me
            </label>
            <Link to="/institution/forgot-password" className="inst-auth-link">
              Forgot your password?
            </Link>
          </div>

          <button type="submit" className="inst-auth-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="inst-auth-footer-text">
          Need help? <Link to="#" className="inst-auth-link">Contact Support</Link>
        </p>
      </div>
    </InstitutionAuthLayout>
  );
}
