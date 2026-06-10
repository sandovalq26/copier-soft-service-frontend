import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const handleOverlayClick = () => {
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('sidebar-open');
      overlay.classList.remove('show');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="sidebar-overlay" id="sidebarOverlay" onClick={handleOverlayClick}></div>
      <div className="app-main">
        <Header />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
