# 🎓 P-School — EdTech Platform

> **STEM Education ke liye ek complete, multi-role online learning platform**
> Built with React + Vite | Role-based Authentication | Virtual Labs | Multi-dashboard

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [User Roles & Features](#user-roles--features)
5. [How to Run](#how-to-run)
6. [Login Credentials](#login-credentials)
7. [Demo Flow](#demo-flow)
8. [Presentation Script](#presentation-script)

---

## 🌟 Project Overview

**P-School** ek modern EdTech platform hai jo STEM (Science, Technology, Engineering & Mathematics) education ko schools, training centers, instructors aur students ke liye ek jagah laata hai.

### Platform Highlight:
- 🏫 **Institutions** apne school ya training center manage kar sakti hain
- 👨‍🏫 **Instructors** classes, assignments aur virtual labs manage kar sakte hain
- 🎓 **Students** apne courses, assignments aur progress track kar sakte hain
- 🛡️ **Super Admin** poori platform ko control karta hai

---

## 🛠️ Tech Stack

| Technology | Use |
|------------|-----|
| **React 18** | Frontend UI framework |
| **Vite** | Fast build tool & dev server |
| **React Router v6** | Client-side routing |
| **Plain CSS** | Custom styling (no CSS framework) |
| **localStorage** | Session management |
| **JavaScript (ES6+)** | Application logic |

---

## 📁 Project Structure

```
PSchool/src/
│
├── pages/
│   ├── landing/          ← Public landing page + Institution request
│   └── auth/             ← Login role selector page
│
├── super-admin/
│   ├── auth/             ← Login, Forgot Password, Verify Email
│   ├── components/       ← Sidebar, Header, Layout
│   └── pages/            ← Dashboard, Users, Courses, Revenue, etc.
│
├── institution/
│   ├── auth/             ← Login, Forgot Password, Verify Email
│   ├── components/       ← Layout components
│   └── pages/            ← Dashboard, Students, Instructors, Classes, etc.
│
├── instructor/
│   ├── auth/             ← Login + Full onboarding flow
│   ├── components/       ← Layout components
│   ├── pages/            ← Dashboard, Classes, Assignments, Resources
│   └── individual/       ← Individual instructor portal
│
├── student/
│   ├── auth/             ← Login + Full registration flow
│   ├── components/       ← Layout components
│   └── pages/            ← Dashboard, Classes, Assignments, Messages
│
└── utils/
    └── authUtils.js      ← Authentication utility functions
```

---

## 👥 User Roles & Features

### 🔷 1. Super Admin (`/login`)
**Email:** `admin@pschool.com` | **Password:** `admin123`

| Feature | Description |
|---------|-------------|
| Dashboard | Platform overview — users, revenue, activity |
| User Management | Manage Students, Instructors, Institutions |
| Course Management | Categories, Courses, Subjects, Chapters |
| Virtual Lab Management | Create & manage virtual labs |
| Subscription Plans | Student, Instructor, Institution plans |
| Verification Requests | Verify instructors & institutions |
| Settlement & Revenue | Financial overview |
| Role Management | Create & assign roles |
| Notification Center | Send platform-wide notifications |
| New Institute Requests | Review & approve institution requests |

---

### 🏫 2. Institution (`/institution/login`)
**Email:** `institution@school.com` | **Password:** `inst123`

| Feature | Description |
|---------|-------------|
| Dashboard | School overview stats |
| Student Management | Add, manage, bulk upload students |
| Instructor Management | Invite & manage instructors |
| Course Management | Assign courses to classes |
| Class Management | Create & manage classes |
| Assignments | View & manage all assignments |
| Virtual Lab | Access virtual labs |
| Role Management | Create institution-level roles |
| Reports | View academic reports |
| Certificates | Manage certificates |
| Subscription | View & manage subscription plan |
| Verification | Submit verification documents |

---

### 👨‍🏫 3. Instructor (`/instructor/login`)
**Email:** `instructor@school.com` | **Password:** `teach123`

**Two Types of Instructors:**
- **Institution Instructor** — Invited by an institution
- **Individual Instructor** — Independent, has own courses & wallet

| Feature | Description |
|---------|-------------|
| Dashboard | Teaching overview |
| My Classes | Manage classes & students |
| Assignments | Create, grade, view submissions |
| Resources | Upload teaching materials |
| Messages | Communicate with students |
| Virtual Lab | Manage lab sessions |
| Profile | Edit profile & certifications |
| Wallet (Individual) | Earnings, withdrawals, bank details |
| Courses (Individual) | Create & sell own courses |

**Instructor Onboarding Flow:**
```
Register → Verify Email → Create Password → 
Tell Us About You → Upload Documents → 
Under Review → Approved ✅
```

---

### 🎓 4. Student (`/student/login`)
**Email:** `student@school.com` | **Password:** `student123`

| Feature | Description |
|---------|-------------|
| Dashboard | Study overview & progress |
| My Classes | View enrolled classes |
| Assignments | Submit & track assignments |
| Messages | Chat with instructors |
| Virtual Lab | Access STEM labs |

**Student Registration Flow:**
```
Register → Verify OTP → Parental Consent (if minor) → 
Waiting for Approval → Free Trial → Welcome ✅
```

---

## 🚀 How to Run

### Prerequisites:
- Node.js 18+ installed
- npm or yarn

### Steps:

```bash
# 1. Project folder mein jaayein
cd PSchool

# 2. Dependencies install karein
npm install

# 3. Development server start karein
npm run dev

# 4. Browser mein open karein
# http://localhost:5173
```

### Build for Production:
```bash
npm run build
```

---

## 🔐 Login Credentials

### Quick Login — `http://localhost:5173/select-login`

| Role | Email | Password | Dashboard URL |
|------|-------|----------|---------------|
| 🔷 Super Admin | admin@pschool.com | admin123 | /dashboard |
| 🏫 Institution | institution@school.com | inst123 | /institution/dashboard |
| 👨‍🏫 Instructor | instructor@school.com | teach123 | /instructor/dashboard |
| 🎓 Student | student@school.com | student123 | /student/dashboard |

> **Note:** Sabhi login pages mein credentials pre-filled hain. Sirf Login button click karein!

---

## 🎬 Demo Flow (Presentation ke liye)

### Step 1 — Landing Page
```
URL: http://localhost:5173
```
- ✅ Hero section — platform ka introduction
- ✅ What is P-School section
- ✅ Virtual Labs showcase
- ✅ Who is it for section
- ✅ CTA Banner
- ✅ Header mein "Login" button click karein

---

### Step 2 — Login Selector
```
URL: http://localhost:5173/select-login
```
- ✅ 4 role cards dikhenge with beautiful UI
- ✅ Har card pe hover effects
- ✅ Click karke respective login pe jaayein

---

### Step 3 — Super Admin Demo
```
Login: http://localhost:5173/login
Dashboard: http://localhost:5173/dashboard
```
Demo karein:
1. Login → Dashboard
2. Users → Student List, Instructor List, Institution List
3. Course Management → Categories → Courses
4. Virtual Lab Management
5. Verification Requests
6. Subscription Plans
7. Revenue & Settlements

---

### Step 4 — Institution Demo
```
Login: http://localhost:5173/institution/login
Dashboard: http://localhost:5173/institution/dashboard
```
Demo karein:
1. Login → Dashboard
2. Students → Add Student
3. Instructors → Invite Instructor
4. Classes → Create Class
5. Assignments
6. Subscription → Plan Details

---

### Step 5 — Instructor Demo
```
Login: http://localhost:5173/instructor/login
Dashboard: http://localhost:5173/instructor/dashboard
```
Demo karein:
1. Login → Dashboard
2. My Classes → Class Detail → Students
3. Assignments → Create Assignment
4. Resources → Upload Resource
5. Profile

---

### Step 6 — Student Demo
```
Login: http://localhost:5173/student/login
Dashboard: http://localhost:5173/student/dashboard
```
Demo karein:
1. Login → Dashboard
2. My Classes
3. Assignments
4. Messages

---

## 🎤 Presentation Script

### Opening (30 seconds):
> "P-School ek complete EdTech platform hai jo STEM education ke liye banaya gaya hai. 
> Yeh platform 4 types ke users ke liye kaam karta hai — Super Admin, Institution, 
> Instructor aur Student. Har ek ke liye alag dashboard aur features hain."

### Tech Highlights:
> "Maine React 18 aur Vite use kiya hai — jo bahut fast development experience deta hai.
> Routing ke liye React Router v6, aur styling ke liye pure CSS use kiya hai.
> Authentication ke liye localStorage-based session management hai."

### Key Features to Show:
1. **Role-based Authentication** — "Galat credentials se login nahi hoga, sirf correct email/password se access milega"
2. **Multi-dashboard** — "Har role ka apna alag dashboard hai apni specific features ke saath"
3. **Complete Onboarding Flows** — "Instructor aur Student ke liye full registration flows hain"
4. **Responsive Design** — "Mobile aur desktop dono par kaam karta hai"
5. **Virtual Lab** — "STEM subjects ke liye interactive virtual labs"

### Closing:
> "Yeh project ek real-world application ka frontend prototype hai. 
> Backend integration ke liye REST APIs ready hain.
> Shukriya!"

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Total Pages | 80+ |
| User Roles | 4 |
| Unique Dashboards | 4 |
| Auth Flows | 6+ |
| CSS Files | 30+ |
| React Components | 80+ |
| Routes | 100+ |

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Landing Page | `http://localhost:5173/` |
| Login Selector | `http://localhost:5173/select-login` |
| Super Admin Login | `http://localhost:5173/login` |
| Super Admin Dashboard | `http://localhost:5173/dashboard` |
| Institution Login | `http://localhost:5173/institution/login` |
| Institution Dashboard | `http://localhost:5173/institution/dashboard` |
| Instructor Login | `http://localhost:5173/instructor/login` |
| Instructor Dashboard | `http://localhost:5173/instructor/dashboard` |
| Individual Instructor Dashboard | `http://localhost:5173/instructor/individual/dashboard` |
| Student Login | `http://localhost:5173/student/login` |
| Student Dashboard | `http://localhost:5173/student/dashboard` |
| Institution Request | `http://localhost:5173/institution/request-demo` |

---

## ⚡ Quick Tips for Presentation

1. **Pehle server start kar lo** — `npm run dev`
2. **Browser fullscreen mein rakhein** — F11 press karein
3. **Ek tab mein saare URLs khol lo** — fast switching ke liye
4. **Login page pe credentials pre-filled hain** — directly Login click karein
5. **Select-Login page se shuru karein** — sabse impressive entry point hai
6. **Mobile view bhi dikhao** — Chrome DevTools mein responsive mode se

---

*Built with ❤️ using React + Vite*
