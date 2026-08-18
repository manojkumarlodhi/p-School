/**
 * Authentication Utility Functions
 * 
 * Demo credentials for testing:
 * - Super Admin: admin@pschool.com / admin123
 * - Institution: institution@school.com / inst123
 * - Instructor: instructor@school.com / teach123
 * - Student: student@school.com / student123
 */

export const DEMO_CREDENTIALS = {
  'admin@pschool.com': { password: 'admin123', role: 'super-admin', redirect: '/dashboard' },
  'institution@school.com': { password: 'inst123', role: 'institution', redirect: '/institution/dashboard' },
  'instructor@school.com': { password: 'teach123', role: 'instructor', redirect: '/instructor/dashboard' },
  'student@school.com': { password: 'student123', role: 'student', redirect: '/student/dashboard' },
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password (minimum 6 characters)
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Authenticate user with demo credentials
 * In production, this would be an API call
 */
export const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DEMO_CREDENTIALS[email.toLowerCase()];
      
      if (user && user.password === password) {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify({
          email,
          role: user.role,
          isAuthenticated: true,
        }));
        resolve(user);
      } else {
        // For testing, allow any valid email/password combination
        localStorage.setItem('user', JSON.stringify({
          email,
          role: 'guest',
          isAuthenticated: true,
        }));
        resolve({ redirect: '/dashboard' });
      }
    }, 800); // Simulate network delay
  });
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('institutionRememberMe');
  localStorage.removeItem('institutionEmail');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.isAuthenticated === true;
  } catch {
    return false;
  }
};

/**
 * Get current user data
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};
