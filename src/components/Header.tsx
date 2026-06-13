import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user ? `${user.nombres} ${user.apellidos}` : "Usuario";
  const userRole = user ? user.cargo : "Administrador";

  // Calculate initials (e.g., "Juan Perez" -> "JP")
  const getInitials = () => {
    if (!user) return "US";
    const firstInitial = user.nombres ? user.nombres.charAt(0) : "";
    const lastInitial = user.apellidos ? user.apellidos.charAt(0) : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
  const userInitials = getInitials();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const handleToggleSidebar = () => {
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
      if (sidebar.classList.contains('sidebar-open')) {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('show');
      } else {
        sidebar.classList.add('sidebar-open');
        overlay.classList.add('show');
      }
    }
  };

  return (
    <header className="app-header" id="appHeader">
      <button className="sidebar-toggler" id="sidebarToggler" aria-label="Abrir menú" onClick={handleToggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      <div className="d-flex align-items-center gap-2">
        <h1 className="header-page-title mb-0">Panel</h1>
      </div>

      <div className="header-right">
        <a href="#" className="header-icon-btn" title="Notificaciones">
          <i className="bi bi-bell"></i>
        </a>

        <div className="dropdown">
          <button className="user-menu-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="userDropdown">
            <div className="user-avatar">{userInitials}</div>
            <div className="d-none d-sm-block text-start">
              <span className="user-name-text">{userName}</span>
              <span className="user-role-text">{userRole}</span>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm border mt-1" style={{ minWidth: '190px' }}>
            <li>
              <a className="dropdown-item py-2 text-danger" href="#" onClick={handleLogout}>
                <i className="bi bi-box-arrow-left me-2"></i>Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
