import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
           a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243
           M9.878 9.878l4.242 4.242M3 3l18 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
           -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: 'admin@pschool.com',
    password: 'admin123',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
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
      // Check if credentials match
      if (form.email === 'admin@pschool.com' && form.password === 'admin123') {
        // Save to localStorage if remember me is checked
        if (form.remember) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', form.email);
        }
        
        // Save user session
        localStorage.setItem('user', JSON.stringify({
          email: form.email,
          role: 'super-admin',
          isAuthenticated: true,
        }));
        
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        // Invalid credentials
        setIsLoading(false);
        setErrors({
          password: 'Invalid email or password. Please try again.',
        });
      }
    }, 1000);
  };

  return (
    <AuthLayout>
      <h1 className="auth-heading">Welcome Back, Admin 👋</h1>
      <p className="auth-subheading">Manage your platform with full control</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            Email Address
          </label>
          <input
            id="login-email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            type="email"
            name="email"
            placeholder="admin@pschool.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <div className="form-input-wrapper">
            <input
              id="login-password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="input-icon-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Remember me + Forgot */}
        <div className="form-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <Link to="/forgot-password" className="form-link">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className="auth-note">Authorized access only. All activities are logged</p>
    </AuthLayout>
  );
}
