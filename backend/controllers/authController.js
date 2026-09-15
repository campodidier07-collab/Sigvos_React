const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Función auxiliar para firmar JWT
const firmarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @desc    Registrar usuario (Si es trabajador queda PENDIENTE, si es Admin queda APROBADO)
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, telefono, rol } = req.body;

    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ success: false, mensaje: 'El usuario ya existe con este correo' });
    }

    // Crear el usuario
    usuario = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
      rol
    });

    // Crear token (opcional devolverlo en registro si queremos loguear auto, 
    // pero como los trabajadores requieren aprobación, es mejor no devolverlo para ellos).
    if (usuario.estado_aprobacion === 'PENDIENTE') {
      return res.status(201).json({
        success: true,
        mensaje: 'Registro exitoso. Tu cuenta está pendiente de aprobación por el Administrador.',
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          estado_aprobacion: usuario.estado_aprobacion
        }
      });
    }

    // Si no requiere aprobación (ej. admin inicial) devolvemos token
    const token = firmarToken(usuario._id);
    res.status(201).json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estado_aprobacion: usuario.estado_aprobacion
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: 'Error al registrar el usuario', error: error.message });
  }
};

/**
 * @desc    Iniciar sesión de usuario (con bloqueo por intentos fallidos)
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar email y password
    if (!email || !password) {
      return res.status(400).json({ success: false, mensaje: 'Por favor ingresa correo y contraseña' });
    }

    // Comprobar si el usuario existe (pedimos también el password porque por defecto es select: false)
    const usuario = await Usuario.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas' });
    }

    // 1. Verificar si está activo en el sistema general
    if (!usuario.activo) {
      return res.status(403).json({ success: false, mensaje: 'Tu cuenta ha sido desactivada. Contacta al administrador.' });
    }

    // 2. Verificar si está pendiente de aprobación
    if (usuario.estado_aprobacion === 'PENDIENTE') {
      return res.status(403).json({ success: false, mensaje: 'Tu cuenta está pendiente de aprobación.' });
    }
    if (usuario.estado_aprobacion === 'RECHAZADO') {
      return res.status(403).json({ success: false, mensaje: 'Tu solicitud de cuenta ha sido rechazada.' });
    }

    // 3. Verificar si está bloqueado temporalmente
    if (usuario.estaBloqueado()) {
      const tiempoRestante = Math.ceil((usuario.bloqueado_hasta - Date.now()) / 60000);
      return res.status(429).json({ 
        success: false, 
        mensaje: `Cuenta bloqueada temporalmente. Intenta en ${tiempoRestante} minuto(s).` 
      });
    }

    // 4. Verificar contraseña
    const esMatch = await usuario.compararPassword(password);

    if (!esMatch) {
      // Incrementar intentos fallidos
      usuario.intentos_fallidos += 1;
      
      const maxIntentos = process.env.MAX_LOGIN_ATTEMPTS || 5;
      
      if (usuario.intentos_fallidos >= maxIntentos) {
        // Bloquear cuenta
        const lockTime = process.env.LOCK_TIME || 30; // Minutos
        usuario.bloqueado_hasta = new Date(Date.now() + lockTime * 60000);
        await usuario.save();
        
        return res.status(429).json({ 
          success: false, 
          mensaje: `Demasiados intentos fallidos. Cuenta bloqueada por ${lockTime} minutos.` 
        });
      }

      await usuario.save();
      const intentosRestantes = maxIntentos - usuario.intentos_fallidos;
      
      return res.status(401).json({ 
        success: false, 
        mensaje: `Credenciales inválidas. Te quedan ${intentosRestantes} intento(s).` 
      });
    }

    // 5. Login exitoso: Resetear intentos fallidos y actualizar último acceso
    usuario.intentos_fallidos = 0;
    usuario.bloqueado_hasta = null;
    usuario.ultimo_acceso = Date.now();
    await usuario.save();

    // Enviar token
    const token = firmarToken(usuario._id);

    res.status(200).json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        foto_perfil: usuario.foto_perfil
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: 'Error en el servidor al iniciar sesión' });
  }
};

/**
 * @desc    Obtener usuario actual logueado
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
  try {
    // req.usuario es seteado por el middleware de auth
    const usuario = await Usuario.findById(req.usuario.id);

    res.status(200).json({
      success: true,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        foto_perfil: usuario.foto_perfil,
        estado_aprobacion: usuario.estado_aprobacion
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: 'Error al obtener datos del usuario' });
  }
};
