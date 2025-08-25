// server/middleware/requestLogger.js
module.exports = function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const ns = Number(process.hrtime.bigint() - start);
    const ms = (ns / 1e6).toFixed(1);
    const msg = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`;
    // En prod podrías escribir a un archivo; por ahora, consola:
    console.log(msg);
  });

  next();
};