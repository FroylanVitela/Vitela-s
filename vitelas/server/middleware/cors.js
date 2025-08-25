// server/middleware/cors.js
const cors = require('cors');

function parseOrigins() {
  const raw = process.env.CORS_ORIGINS || '';
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

const allowlist = parseOrigins();

const corsOptions = {
  origin(origin, cb) {
    // peticiones sin origin (curl, apps nativas): permite
    if (!origin) return cb(null, true);
    // si no hay lista definida: permite todo
    if (allowlist.length === 0) return cb(null, true);
    // valida contra lista
    if (allowlist.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
module.exports.corsOptions = corsOptions; // por si quieres reutilizar