import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InstitutionSidebar from './InstitutionSidebar';
import InstitutionHeader  from './InstitutionHeader';
import './institutionlayout.css';

export default function InstitutionDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="inst-app-shell">
      {sidebarOpen && (
        <div className="inst-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}/>
      )}

      <InstitutionSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}/>

      <div className="inst-main-area">
        <InstitutionHeader onMenuClick={() => setSidebarOpen(true)}/>
        <main className="inst-page-content">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
