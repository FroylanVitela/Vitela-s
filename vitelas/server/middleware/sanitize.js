// server/middleware/sanitize.js
function clean(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    // elimina claves peligrosas
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      continue;
    }
    if (typeof obj[key] === 'object') clean(obj[key]);
  }
  return obj;
}

module.exports = function sanitize() {
  return (req, _res, next) => {
    if (req.body)  clean(req.body);
    if (req.query) clean(req.query);
    if (req.params) clean(req.params);
    next();
  };
};