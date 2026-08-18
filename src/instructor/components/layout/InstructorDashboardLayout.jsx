import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InstructorSidebar from './InstructorSidebar';
import InstructorHeader  from './InstructorHeader';
import './instructorlayout.css';

export default function InstructorDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="instr-app-shell">
      {sidebarOpen && (
        <div className="instr-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <InstructorSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="instr-main-area">
        <InstructorHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="instr-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
