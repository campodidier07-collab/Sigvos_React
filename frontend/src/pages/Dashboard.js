import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Proteger ruta
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--agro-50)' }}>
        <h2 style={{ color: 'var(--agro-600)' }}>Cargando...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--agro-50)' }}>
      <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ color: 'var(--agro-600)', margin: 0 }}>SIGVOS Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '500' }}>{user.nombre} ({user.rol})</span>
          <button 
            onClick={logout}
            style={{ padding: '0.5rem 1rem', background: 'var(--gray-200)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '600' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
      
      <main style={{ padding: '2rem', maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h2>Bienvenido al panel de control</h2>
          <p style={{ color: 'var(--gray-600)' }}>Has iniciado sesión exitosamente.</p>
          
          <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
              <strong>Estado de tu cuenta:</strong> {user.estado_aprobacion || 'APROBADO'}
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
