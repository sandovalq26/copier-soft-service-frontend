import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Simulate successful login
      navigate('/dashboard');
    } else {
      form.classList.add('was-validated');
    }
  };

  return (
    <main className="login-page">
      <div className="login-box">
        <div className="text-center mb-4">
          <h1 className="text-white fw-bold fs-4 mb-1">Copier Soft Service</h1>
          <p className="text-white-50 small mb-0">Sistema de Gestión de Servicios de Alquiler de Fotocopiadoras</p>
        </div>

        <div className="login-card">
          <h2 className="text-white fw-semibold fs-6 mb-4">Iniciar Sesión</h2>

          <form onSubmit={handleLogin} id="loginForm" noValidate>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  placeholder="Ingresa tu usuario"
                  required
                  autoComplete="username"
                />
                <div className="invalid-feedback">El usuario es obligatorio.</div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="contrasena" className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="contrasena"
                  name="contrasena"
                  placeholder="Ingresa tu contraseña"
                  required
                  autoComplete="current-password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="togglePassword"
                  aria-label="Mostrar contraseña"
                  onClick={handleTogglePassword}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} id="toggleIcon"></i>
                </button>
                <div className="invalid-feedback">La contraseña es obligatoria.</div>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary fw-semibold py-2" id="btnIngresar">
                <i className="bi bi-box-arrow-in-right me-2"></i>Ingresar
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-white-50 small mt-4 mb-0">
          &copy; 2026 Copier Soft Service &mdash; Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
};

export default Login;
