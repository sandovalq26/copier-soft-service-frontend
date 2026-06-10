import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="app-sidebar" id="appSidebar">
      <NavLink to="/" className="sidebar-brand text-decoration-none">
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">Copier Soft Service</span>
          <span className="sidebar-brand-subtitle">Service Manager</span>
        </div>
      </NavLink>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Principal</span>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-speedometer2 nav-icon"></i>
          <span>Inicio</span>
        </NavLink>

        <span className="sidebar-section-label">Gestión</span>
        <NavLink to="/employees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-people-fill nav-icon"></i>
          <span>Empleados</span>
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-person-lines-fill nav-icon"></i>
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/suppliers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-truck nav-icon"></i>
          <span>Proveedores</span>
        </NavLink>
        <NavLink to="/photocopiers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-printer nav-icon"></i>
          <span>Fotocopiadoras</span>
        </NavLink>

        <span className="sidebar-section-label">Operaciones</span>
        <NavLink to="/rentals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-file-earmark-text-fill nav-icon"></i>
          <span>Alquileres</span>
        </NavLink>
        <NavLink to="/payments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-credit-card-fill nav-icon"></i>
          <span>Pagos</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/login" className="nav-link text-danger">
          <i className="bi bi-box-arrow-left nav-icon"></i>
          <span>Cerrar Sesión</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
