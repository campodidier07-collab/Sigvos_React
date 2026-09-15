const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear el body como JSON

// Rutas base
app.use('/api/auth', require('./routes/authRoutes'));

// Ruta por defecto para verificar que el servidor corre
app.app = app.get('/', (req, res) => {
  res.send('API de SIGVOS funcionando...');
});

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor de backend corriendo en puerto ${PORT}`);
});
