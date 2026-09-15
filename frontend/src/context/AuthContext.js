import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Al cargar la app, revisar si hay token
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.usuario);
          }
        } catch (err) {
          console.error("Token inválido o expirado", err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Función genérica para manejar errores de API
  const handleApiError = (err) => {
    if (err.response && err.response.data && err.response.data.mensaje) {
      setError(err.response.data.mensaje);
    } else {
      setError("Error de conexión al servidor");
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.usuario);
        navigate('/dashboard'); // Redirigir tras login exitoso (crearemos esta ruta luego)
        return true;
      }
    } catch (err) {
      handleApiError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', userData);
      
      if (res.data.success) {
        // Si el usuario es trabajador y requiere aprobación, no hay token
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          setUser(res.data.usuario);
          navigate('/dashboard');
        }
        return res.data; // Retornamos para mostrar mensaje de éxito/aprobación
      }
    } catch (err) {
      handleApiError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
