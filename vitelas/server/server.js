// server/server.js (o app.js, el archivo de arranque de tu API)
const express = require('express');
const app = express();

// 1) Logs primero
app.use(require('./middleware/requestLogger'));

// 2) CORS configurado
app.use(require('./middleware/cors'));

// 3) Body parser
app.use(express.json({ limit: '2mb' }));

// 4) Sanitizar entradas (opcional recomendado)
app.use(require('./middleware/sanitize')());

// 5) Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/option-sets', require('./routes/optionSets'));
app.use('/api/size-guides', require('./routes/sizeGuides'));
app.use('/api/garment-packages', require('./routes/garmentPackages'));
app.use('/api/policies', require('./routes/policies'));

// 6) 404 y errores (siempre al final)
app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

module.exports = app;
