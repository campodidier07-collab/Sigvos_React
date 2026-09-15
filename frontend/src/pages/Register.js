import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    rol: "TRABAJADOR", 
  });
  
  const [successMsg, setSuccessMsg] = useState("");
  const { register, error, loading, setError } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    
    if (!formData.nombre || !formData.email || !formData.password) {
      setError("Nombre, correo y contraseña son obligatorios.");
      return;
    }
    
    const result = await register(formData);
    
    if (result && result.success && formData.rol === "TRABAJADOR") {
      setSuccessMsg(result.mensaje);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        rol: "TRABAJADOR",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper} style={{ maxWidth: '32rem' }}>
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <i className="fas fa-seedling"></i>
            </div>
            <span className={styles.logoText}>
              SIG<span className={styles.logoAccent}>VOS</span>
            </span>
          </Link>
          <h1 className={styles.title}>Crear una cuenta</h1>
          <p className={styles.subtitle}>Únete a la plataforma de gestión agrícola</p>
        </div>

        {error && (
          <div className={styles.alertError}>
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className={styles.alertError} style={{ background: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>
            <i className="fas fa-check-circle"></i>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">Nombre Completo</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-user ${styles.inputIcon}`}></i>
              <input
                id="nombre"
                type="text"
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
              <input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telefono">Teléfono (Opcional)</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-phone ${styles.inputIcon}`}></i>
              <input
                id="telefono"
                type="text"
                placeholder="+57 300 000 0000"
                value={formData.telefono}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-lock ${styles.inputIcon}`}></i>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                minLength="6"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="rol">Tipo de Cuenta</label>
            <div className={styles.inputWrapper}>
              <i className={`fas fa-briefcase ${styles.inputIcon}`}></i>
              <select
                id="rol"
                value={formData.rol}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.75rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.9375rem',
                  color: 'var(--gray-900)',
                  outline: 'none',
                  appearance: 'none',
                  background: 'white'
                }}
              >
                <option value="TRABAJADOR">Trabajador (Requiere Aprobación)</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '1rem', color: 'var(--gray-400)', pointerEvents: 'none' }}></i>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Registrando...</>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.link}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
