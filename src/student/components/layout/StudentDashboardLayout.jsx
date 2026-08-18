import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentHeader  from './StudentHeader';
import './studentlayout.css';

export default function StudentDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="stdnt-app-shell">
      {sidebarOpen && <div className="stdnt-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="stdnt-main-area">
        <StudentHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="stdnt-page-content"><Outlet /></main>
      </div>
    </div>
  );
}
