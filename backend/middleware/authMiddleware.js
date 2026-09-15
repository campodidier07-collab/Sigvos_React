const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

/**
 * Middleware para proteger rutas. 
 * Verifica si hay un JWT válido en los headers y adjunta el usuario a req.
 */
exports.proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Comprobar si el token existe
  if (!token) {
    return res.status(401).json({ success: false, mensaje: 'No autorizado para acceder a esta ruta' });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener usuario del token
    req.usuario = await Usuario.findById(decoded.id);
    
    // Verificar si sigue activo
    if (!req.usuario.activo) {
      return res.status(401).json({ success: false, mensaje: 'Usuario desactivado' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, mensaje: 'No autorizado, token fallido o expirado' });
  }
};

/**
 * Middleware para autorizar roles específicos
 * @param  {...string} roles - Roles permitidos (ej. 'ADMIN', 'TRABAJADOR')
 */
exports.autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        mensaje: `El rol ${req.usuario.rol} no está autorizado para acceder a esta ruta`
      });
    }
    next();
  };
};
