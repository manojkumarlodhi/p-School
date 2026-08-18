import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import IndividualSidebar             from './IndividualSidebar';
import IndividualHeader              from './IndividualHeader';
import IndividualNotificationDrawer  from './IndividualNotificationDrawer';
import './individuallayout.css';

export default function IndividualDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen,   setNotifOpen]   = useState(false);
  const navigate = useNavigate();

  function handleNotifClick() {
    navigate('/instructor/individual/dashboard/notification');
  }

  return (
    <div className="indiv-app-shell">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="indiv-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <IndividualSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="indiv-main-area">
        <IndividualHeader
          onMenuClick={() => setSidebarOpen(true)}
          onNotifClick={handleNotifClick}
          hasUnread={true}
        />
        <main className="indiv-page-content">
          <Outlet />
        </main>
      </div>

      {/* Notification drawer — kept for mobile quick-peek, but bell navigates to full page */}
      <IndividualNotificationDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </div>
  );
}
