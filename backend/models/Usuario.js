const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor añade un correo válido',
    ],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6,
    select: false, // No devolver la contraseña en las consultas por defecto
  },
  telefono: {
    type: String,
    trim: true,
  },
  foto_perfil: {
    type: String,
    default: 'default.jpg',
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'TRABAJADOR'],
    default: 'TRABAJADOR',
  },
  // Estado de aprobación (para trabajadores que se registran solos)
  estado_aprobacion: {
    type: String,
    enum: ['PENDIENTE', 'APROBADO', 'RECHAZADO'],
    default: function() {
      // Si el rol es admin, asumimos que se aprueba directo 
      // (aunque idealmente el primer admin se crea por script y los demás por invitación)
      // Pero si es trabajador, queda pendiente.
      return this.rol === 'ADMIN' ? 'APROBADO' : 'PENDIENTE';
    }
  },
  activo: {
    type: Boolean,
    default: true, // Si false, el usuario no puede entrar aunque esté aprobado
  },
  // Bloqueos por intentos fallidos
  intentos_fallidos: {
    type: Number,
    default: 0,
  },
  bloqueado_hasta: {
    type: Date,
    default: null,
  },
  ultimo_acceso: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true // Crea createdAt y updatedAt
});

// Encriptar contraseña usando bcrypt antes de guardar
usuarioSchema.pre('save', async function (next) {
  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la hasheada
usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

// Verificar si la cuenta está bloqueada actualmente
usuarioSchema.methods.estaBloqueado = function () {
  if (this.bloqueado_hasta && this.bloqueado_hasta > Date.now()) {
    return true;
  }
  return false;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
