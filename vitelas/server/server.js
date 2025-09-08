// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// === Config básica ===
const app = express();
app.use(cors());
app.use(express.json());

// === Conexión a MongoDB ===
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vitelas';
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('[Mongo] Conectado'))
  .catch((err) => {
    console.error('[Mongo] Error de conexión:', err.message);
    process.exit(1);
  });

// === Rutas ===
// Ajusta los paths si tus archivos están en otra carpeta
app.use('/api/products', require('./routes/products'));
app.use('/api/option-sets', require('./routes/optionSets'));
app.use('/api/size-guides', require('./routes/sizeGuides'));
app.use('/api/garment-packages', require('./routes/garmentPackages'));
app.use('/api/policies', require('./routes/policies'));

// Healthcheck rápido
app.get('/health', (_req, res) => res.json({ ok: true }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Manejo de errores (para ver trazas)
app.use((err, _req, res, _next) => {
  console.error('[Error]', err);
  res.status(500).json({ message: err.message || 'Error interno' });
});

// === Escuchar ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[API] Listening on http://localhost:${PORT}`));
