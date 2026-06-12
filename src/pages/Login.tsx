import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../api/authService';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrorMsg('');

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const usuario = formData.get('usuario') as string;
      const contrasena = formData.get('contrasena') as string;

      setLoading(true);
      try {
        const userData = await loginService(usuario, contrasena);
        login(userData);
        navigate('/dashboard');
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setErrorMsg('Usuario o contraseña incorrectos.');
        } else {
          setErrorMsg('Ocurrió un error al intentar iniciar sesión.');
        }
      } finally {
        setLoading(false);
      }
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

            {errorMsg && (
              <div className="alert alert-danger py-2 small" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary fw-semibold py-2" id="btnIngresar" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                )}
                Ingresar
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
