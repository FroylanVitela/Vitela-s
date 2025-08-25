// server/middleware/error.js
module.exports = function errorHandler(err, req, res, _next) {
  if (res.headersSent) return; // ya se envió algo

  const status = err.status || err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  const payload = {
    error: true,
    message: err.message || 'Internal Server Error'
  };

  if (!isProd) {
    payload.stack = err.stack;
    if (err.details) payload.details = err.details; // p.ej. validaciones
  }

  console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${status}\n`, err);
  res.status(status).json(payload);
};